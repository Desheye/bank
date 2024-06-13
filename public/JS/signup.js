document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const signupButton = document.getElementById('signupForm');

    signupForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting immediately

        // You can add additional logic here if needed (e.g., form validation)

        // Clear the form fields
        signupForm.reset();

        // Manually submit the form
        signupForm.submit();
    });
});
