document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on a portal page that requires Supabase
    if (!window.supabaseClient) return;

    const supabase = window.supabaseClient;

    // ----- UI Elements -----
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const linkForm = document.getElementById('linkForm');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // ----- AUTH STATE LISTENER -----
    supabase.auth.onAuthStateChange((event, session) => {
        const path = window.location.pathname;
        const isAuthPage = path.includes('login.html') || path.includes('signup.html');
        
        if (session) {
            // User is logged in
            if (isAuthPage) {
                window.location.href = 'dashboard.html';
            }
            if (path.includes('dashboard.html')) {
                loadDashboardData(session.user);
            }
        } else {
            // User is logged out
            if (path.includes('dashboard.html') || path.includes('link-account.html')) {
                window.location.href = 'login.html';
            }
        }
    });

    // ----- SIGNUP FLOW -----
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const errorDiv = document.getElementById('signupError');
            
            errorDiv.style.display = 'none';
            const { data, error } = await supabase.auth.signUp({ email, password });
            
            if (error) {
                errorDiv.textContent = error.message;
                errorDiv.style.display = 'block';
            } else {
                // Check if email confirmation is required, otherwise redirect
                if (data.user && data.user.identities && data.user.identities.length === 0) {
                    errorDiv.textContent = "Email already in use or confirm your email.";
                    errorDiv.style.display = 'block';
                } else {
                    window.location.href = 'dashboard.html';
                }
            }
        });
    }

    // ----- LOGIN FLOW -----
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const errorDiv = document.getElementById('loginError');
            
            errorDiv.style.display = 'none';
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            
            if (error) {
                errorDiv.textContent = error.message;
                errorDiv.style.display = 'block';
            } else {
                window.location.href = 'dashboard.html';
            }
        });
    }

    // ----- LOGOUT FLOW -----
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await supabase.auth.signOut();
            window.location.href = 'login.html';
        });
    }

    // ----- LINK ACCOUNT FLOW -----
    if (linkForm) {
        linkForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const identifier = document.getElementById('linkIdentifier').value;
            const msgDiv = document.getElementById('linkMessage');
            const btn = document.getElementById('linkBtn');
            
            btn.disabled = true;
            btn.textContent = 'Searching...';
            msgDiv.style.display = 'none';

            // Call secure RPC function to link account
            const { data, error } = await supabase.rpc('link_customer_account', {
                contact_identifier: identifier
            });

            btn.disabled = false;
            btn.textContent = 'Find Account';

            if (error) {
                msgDiv.style.display = 'block';
                msgDiv.style.color = 'red';
                msgDiv.style.backgroundColor = '#ffe5e5';
                msgDiv.textContent = error.message || 'Could not find an account with that information.';
            } else {
                msgDiv.style.display = 'block';
                msgDiv.style.color = 'green';
                msgDiv.style.backgroundColor = '#e5ffe5';
                msgDiv.textContent = 'Account successfully linked! Redirecting...';
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }
        });
    }

    // ----- DASHBOARD LOGIC -----
    async function loadDashboardData(user) {
        const unlinkedState = document.getElementById('unlinkedState');
        const linkedState = document.getElementById('linkedState');
        
        document.getElementById('dashboardGreeting').textContent = \`Welcome back, \${user.email}\`;

        // Query the customer_users table to see if this auth user is linked
        const { data: linkage, error: linkError } = await supabase
            .from('customer_users')
            .select('customer_id')
            .eq('auth_user_id', user.id)
            .single();

        if (linkError || !linkage) {
            // Not linked
            unlinkedState.style.display = 'block';
            linkedState.style.display = 'none';
            return;
        }

        // Fetch customer details using RLS (RLS guarantees they can only fetch their own)
        const { data: customer, error: custError } = await supabase
            .from('customers')
            .select('*')
            .eq('id', linkage.customer_id)
            .single();

        if (customer) {
            unlinkedState.style.display = 'none';
            linkedState.style.display = 'block';
            
            document.getElementById('customerName').textContent = customer.name || 'N/A';
            document.getElementById('customerEmail').textContent = customer.email || 'N/A';
            document.getElementById('customerPhone').textContent = customer.phone || 'N/A';
            document.getElementById('customerSegment').textContent = customer.customer_segment || 'N/A';
            document.getElementById('billingGroup').textContent = customer.billing_group || 'N/A';
            document.getElementById('serviceAddress').textContent = customer.billing_address || 'N/A';
        }
    }
});
