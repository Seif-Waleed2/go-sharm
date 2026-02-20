const form = document.getElementById('signupForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        // Check password match
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity("Passwords do not match");
        } else {
            confirmPassword.setCustomValidity("");
        }

        if (form.checkValidity()) {

            // Save user to localStorage (Fake DB)
            const user = {
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                password: password.value
            };

            localStorage.setItem("goSharmUser", JSON.stringify(user));

            alert("Account created successfully!");
            window.location.href = "login.html";
        }

        form.classList.add('was-validated');
    });

    function togglePassword(id) {
        const input = document.getElementById(id);
        input.type = input.type === "password" ? "text" : "password";
    }