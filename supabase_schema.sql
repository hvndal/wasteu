-- ========================================================
-- WASTE UNIVERSE - SUPABASE SCHEMA & RLS POLICIES
-- ========================================================
-- Run this entire script in the Supabase SQL Editor.

-- 1. Create Core Tables
CREATE TABLE public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    billing_address TEXT NOT NULL,
    customer_segment TEXT,
    billing_group TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.customer_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    auth_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    linked_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(auth_user_id), -- A user can only link one customer record
    UNIQUE(customer_id)   -- A customer record can only be linked to one user
);

CREATE TABLE public.metrics (
    customer_id UUID PRIMARY KEY REFERENCES public.customers(id) ON DELETE CASCADE,
    invoice_count INTEGER DEFAULT 0,
    order_count INTEGER DEFAULT 0,
    payment_method_count INTEGER DEFAULT 0
);


-- 2. Row Level Security (RLS)
-- Enable RLS so the frontend cannot query random customers.
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;

-- Customers Table Policy: You can only select a customer if you are linked to it.
CREATE POLICY "Users can read their own customer data"
    ON public.customers
    FOR SELECT
    USING (
        id IN (
            SELECT customer_id 
            FROM public.customer_users 
            WHERE auth_user_id = auth.uid()
        )
    );

-- Customer Users Table Policy: You can only read your own linking.
CREATE POLICY "Users can read their own linking record"
    ON public.customer_users
    FOR SELECT
    USING (auth_user_id = auth.uid());

-- Metrics Table Policy: You can only read metrics for your linked customer.
CREATE POLICY "Users can read their own metrics"
    ON public.metrics
    FOR SELECT
    USING (
        customer_id IN (
            SELECT customer_id 
            FROM public.customer_users 
            WHERE auth_user_id = auth.uid()
        )
    );


-- 3. Secure Account Linking RPC Function
-- This function allows a user to "claim" an account by providing an email or phone number.
-- It bypasses RLS because it's executed as SECURITY DEFINER (like sudo).
CREATE OR REPLACE FUNCTION link_customer_account(contact_identifier TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    found_customer_id UUID;
BEGIN
    -- Ensure the user is logged in
    IF auth.uid() IS NULL THEN
        RAISE EXCEPTION 'You must be logged in to link an account.';
    END IF;

    -- Ensure the user hasn't already linked an account
    IF EXISTS (SELECT 1 FROM public.customer_users WHERE auth_user_id = auth.uid()) THEN
        RAISE EXCEPTION 'You have already linked a customer account.';
    END IF;

    -- Look up the customer by email OR phone (ignoring case)
    SELECT id INTO found_customer_id
    FROM public.customers
    WHERE (LOWER(email) = LOWER(contact_identifier) OR phone = contact_identifier)
    LIMIT 1;

    IF found_customer_id IS NULL THEN
        RAISE EXCEPTION 'No unlinked customer record found matching that email or phone number.';
    END IF;

    -- Ensure this customer record isn't already claimed by someone else
    IF EXISTS (SELECT 1 FROM public.customer_users WHERE customer_id = found_customer_id) THEN
        RAISE EXCEPTION 'This customer account has already been claimed.';
    END IF;

    -- Link the account
    INSERT INTO public.customer_users (customer_id, auth_user_id)
    VALUES (found_customer_id, auth.uid());

    RETURN TRUE;
END;
$$;


-- 4. Insert Synthetic Test Data
-- This simulates what the TrashLab import will look like later, but with fake data for testing.
INSERT INTO public.customers (id, name, email, phone, billing_address, customer_segment, billing_group)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'John Doe (Test)', 'test1@wasteuniverse.com', '+14015551001', '123 Test Ave, Providence RI', 'Residential', 'Monthly Residential'),
    ('22222222-2222-2222-2222-222222222222', 'Jane Smith (Test)', 'test2@wasteuniverse.com', '+14015551002', '456 Fake St, Warwick RI', 'Commercial', 'Bill Upfront');

INSERT INTO public.metrics (customer_id, invoice_count, order_count, payment_method_count)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 12, 1, 1),
    ('22222222-2222-2222-2222-222222222222', 4, 3, 2);
