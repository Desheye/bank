// Validate form on submission
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Validate form fields
    if (validateForm()) {
        // If form is valid, submit it
        this.submit();
    }
});

// Function to validate form fields
function validateForm() {
    // Get form fields
    var fullName = document.getElementById('full_name').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();
    var confirmPassword = document.getElementById('confirm_password').value.trim();

    // Perform validation (you can add more validation logic here)
    if (fullName === '' || phone === '' || email === '' || password === '' || confirmPassword === '') {
        alert('All fields are required');
        return false; // Form is invalid
    }

    // Password and confirm password must match
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false; // Form is invalid
    }

    // Additional validation logic can be added here (e.g., email format validation)

    return true; // Form is valid
}
