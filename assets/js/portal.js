document.addEventListener('DOMContentLoaded', () => {
    if (typeof supabase === 'undefined' || !window.supabaseClient) {
        console.error('[Portal] Supabase client not loaded. Check supabaseClient.js and CDN script.');
        return;
    }

    const sb = window.supabaseClient;
    console.log('[Portal] Supabase client initialized.');

    // ----- Mobile Menu Toggle (since we removed main.js from portal pages) -----
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    // ----- Signup -----
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        console.log('[Portal] Signup form found.');
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('signupEmail').value.trim();
            const password = document.getElementById('signupPassword').value;
            const errorDiv = document.getElementById('signupError');
            const successDiv = document.getElementById('signupSuccess');
            const btn = document.getElementById('signupBtn');

            errorDiv.style.display = 'none';
            if (successDiv) successDiv.style.display = 'none';
            btn.disabled = true;
            btn.textContent = 'Creating account...';

            console.log('[Portal] Attempting signup for:', email);

            try {
                const siteOrigin = window.location.origin;
                const { data, error } = await sb.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: siteOrigin + '/dashboard.html'
                    }
                });

                if (error) {
                    console.error('[Portal] Signup error:', error.message);
                    errorDiv.textContent = error.message;
                    errorDiv.style.display = 'block';
                    btn.disabled = false;
                    btn.textContent = 'Create Account';
                    return;
                }

                console.log('[Portal] Signup response:', data);

                // Check if email confirmation is needed
                if (data.user && data.user.identities && data.user.identities.length === 0) {
                    errorDiv.textContent = 'This email is already registered. Try logging in instead.';
                    errorDiv.style.display = 'block';
                    btn.disabled = false;
                    btn.textContent = 'Create Account';
                } else if (data.session) {
                    // Logged in immediately (email confirmation disabled)
                    console.log('[Portal] Session created, redirecting to dashboard...');
                    window.location.href = 'dashboard.html';
                } else {
                    // Email confirmation required
                    if (successDiv) {
                        successDiv.textContent = 'Check your email for a confirmation link! You can close this page.';
                        successDiv.style.display = 'block';
                    }
                    btn.disabled = false;
                    btn.textContent = 'Create Account';
                }
            } catch (err) {
                console.error('[Portal] Unexpected signup error:', err);
                errorDiv.textContent = 'An unexpected error occurred. Please try again.';
                errorDiv.style.display = 'block';
                btn.disabled = false;
                btn.textContent = 'Create Account';
            }
        });
    }

    // ----- Login -----
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        console.log('[Portal] Login form found.');
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            const errorDiv = document.getElementById('loginError');
            const btn = document.getElementById('loginBtn');

            errorDiv.style.display = 'none';
            btn.disabled = true;
            btn.textContent = 'Logging in...';

            console.log('[Portal] Attempting login for:', email);

            try {
                const { data, error } = await sb.auth.signInWithPassword({ email, password });

                if (error) {
                    console.error('[Portal] Login error:', error.message);
                    errorDiv.textContent = error.message;
                    errorDiv.style.display = 'block';
                    btn.disabled = false;
                    btn.textContent = 'Log In';
                    return;
                }

                console.log('[Portal] Login success, redirecting...');
                window.location.href = 'dashboard.html';
            } catch (err) {
                console.error('[Portal] Unexpected login error:', err);
                errorDiv.textContent = 'An unexpected error occurred. Please try again.';
                errorDiv.style.display = 'block';
                btn.disabled = false;
                btn.textContent = 'Log In';
            }
        });
    }

    // ----- Logout -----
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            console.log('[Portal] Logging out...');
            await sb.auth.signOut();
            window.location.href = 'login.html';
        });
    }

    // ----- Link Account -----
    const linkForm = document.getElementById('linkForm');
    if (linkForm) {
        console.log('[Portal] Link form found.');
        linkForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const identifier = document.getElementById('linkIdentifier').value.trim();
            const msgDiv = document.getElementById('linkMessage');
            const btn = document.getElementById('linkBtn');

            msgDiv.style.display = 'none';
            btn.disabled = true;
            btn.textContent = 'Searching...';

            console.log('[Portal] Attempting to link account with:', identifier);

            try {
                const { data, error } = await sb.rpc('link_customer_account', {
                    contact_identifier: identifier
                });

                if (error) {
                    console.error('[Portal] Link error:', error.message);
                    msgDiv.textContent = error.message || 'Could not find a matching account.';
                    msgDiv.className = 'portal-error';
                    msgDiv.style.display = 'block';
                    btn.disabled = false;
                    btn.textContent = 'Find My Account';
                    return;
                }

                console.log('[Portal] Account linked successfully!');
                msgDiv.textContent = 'Account linked successfully! Redirecting to dashboard...';
                msgDiv.className = 'portal-success';
                msgDiv.style.display = 'block';
                setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
            } catch (err) {
                console.error('[Portal] Unexpected link error:', err);
                msgDiv.textContent = 'An unexpected error occurred.';
                msgDiv.className = 'portal-error';
                msgDiv.style.display = 'block';
                btn.disabled = false;
                btn.textContent = 'Find My Account';
            }
        });
    }

    // ----- Dashboard -----
    const dashboardGreeting = document.getElementById('dashboardGreeting');
    if (dashboardGreeting) {
        console.log('[Portal] Dashboard page detected. Checking auth...');
        const loadingState = document.getElementById('loadingState');
        const unlinkedState = document.getElementById('unlinkedState');
        const linkedState = document.getElementById('linkedState');

        (async () => {
            const { data: { session } } = await sb.auth.getSession();

            if (!session) {
                console.log('[Portal] No session found, redirecting to login.');
                window.location.href = 'login.html';
                return;
            }

            const user = session.user;
            console.log('[Portal] User authenticated:', user.email);
            dashboardGreeting.textContent = `Welcome back, ${user.email}`;

            // Check if linked
            const { data: linkage, error: linkError } = await sb
                .from('customer_users')
                .select('customer_id')
                .eq('auth_user_id', user.id)
                .single();

            if (loadingState) loadingState.style.display = 'none';

            if (linkError || !linkage) {
                console.log('[Portal] User not linked to a customer record.');
                unlinkedState.style.display = 'block';
                linkedState.style.display = 'none';
                return;
            }

            console.log('[Portal] User linked to customer:', linkage.customer_id);

            // Fetch customer details
            const { data: customer } = await sb
                .from('customers')
                .select('*')
                .eq('id', linkage.customer_id)
                .single();

            if (customer) {
                unlinkedState.style.display = 'none';
                linkedState.style.display = 'block';
                document.getElementById('customerName').textContent = customer.name || '—';
                document.getElementById('customerEmail').textContent = customer.email || '—';
                document.getElementById('customerPhone').textContent = customer.phone || '—';
                document.getElementById('customerSegment').textContent = customer.customer_segment || '—';
                document.getElementById('billingGroup').textContent = customer.billing_group || '—';
                document.getElementById('serviceAddress').textContent = customer.billing_address || '—';
                console.log('[Portal] Dashboard populated.');
            }
        })();
    }
});
