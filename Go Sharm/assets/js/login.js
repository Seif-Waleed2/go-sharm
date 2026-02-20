const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMe = document.getElementById('rememberMe');

    // Bootstrap Validation
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {

            // Save email if Remember Me checked
            if (rememberMe.checked) {
                localStorage.setItem("rememberedEmail", emailInput.value);
            } else {
                localStorage.removeItem("rememberedEmail");
            }

            // Fake login success
            localStorage.setItem("isLoggedIn", "true");

            // Redirect to Home
            window.location.href = "index.html";
        }

        form.classList.add('was-validated');
    });

    // Show / Hide Password
    function togglePassword() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    }

    // Load Remembered Email
    window.onload = function () {
        const savedEmail = localStorage.getItem("rememberedEmail");
        if (savedEmail) {
            emailInput.value = savedEmail;
            rememberMe.checked = true;
        }
    }