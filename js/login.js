// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.querySelector('.eye-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = '👁️‍🗨️';
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️';
    }
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Real-time email validation
    emailInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError(emailError, 'Email is required');
        } else if (!validateEmail(this.value)) {
            showError(emailError, 'Please enter a valid email');
        } else {
            hideError(emailError);
        }
    });

    // Real-time password validation
    passwordInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError(passwordError, 'Password is required');
        } else if (this.value.length < 6) {
            showError(passwordError, 'Password must be at least 6 characters');
        } else {
            hideError(passwordError);
        }
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        let isValid = true;

        // Clear previous errors
        hideError(emailError);
        hideError(passwordError);

        // Validate email
        if (email === '') {
            showError(emailError, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailError, 'Please enter a valid email');
            isValid = false;
        }

        // Validate password
        if (password === '') {
            showError(passwordError, 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError(passwordError, 'Password must be at least 6 characters');
            isValid = false;
        }

        if (isValid) {
            // Disable button to prevent multiple submissions
            const loginBtn = loginForm.querySelector('.login-btn');
            loginBtn.disabled = true;
            loginBtn.textContent = 'Signing in...';

            // Simulate API call
            setTimeout(() => {
                showSuccessMessage();
                
                // Clear form
                loginForm.reset();
                
                // Redirect after 2 seconds
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 2000);
            }, 1500);
        }
    });

    // Social login buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const provider = this.textContent.trim();
            console.log(`Logging in with ${provider}`);
            // Add your social login logic here
            showSuccessMessage(`Redirecting to ${provider}...`);
        });
    });
});

function showError(element, message) {
    element.textContent = message;
    element.classList.add('show');
}

function hideError(element) {
    element.textContent = '';
    element.classList.remove('show');
}

function showSuccessMessage(message = 'Login successful! Redirecting...') {
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = message;
    successMessage.classList.add('show');
}

// Prevent form submission on Enter in social buttons
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.closest('.social-btn')) {
        e.preventDefault();
    }
});
