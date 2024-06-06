document.addEventListener("DOMContentLoaded", function () {
  const userNameInput = document.getElementById("full_name");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm_password");

  userNameInput.addEventListener("input", function () {
    const inputValue = userNameInput.value.trim();
    const names = inputValue.split(" ");

    if (
      names.length === 2 &&
      /^[a-zA-Z]+$/.test(names[0]) &&
      /^[a-zA-Z]+$/.test(names[1])
    ) {
      userNameInput.classList.add("valid");
      userNameInput.classList.remove("invalid");
      console.log("Valid name format");
    } else {
      userNameInput.classList.add("invalid");
      userNameInput.classList.remove("valid");
      console.log("Invalid name format");
    }
  });

  phoneInput.addEventListener("input", function () {
    const phoneNumber = phoneInput.value;

    if (phoneNumber.length !== 11 || !/^\d{11}$/.test(phoneNumber)) {
      phoneInput.setCustomValidity("Phone number must be exactly 11 digits.");
      phoneInput.classList.add("invalid");
      phoneInput.classList.remove("valid");
      console.log("Invalid phone number");
    } else {
      phoneInput.setCustomValidity("");
      phoneInput.classList.add("valid");
      phoneInput.classList.remove("invalid");
      console.log("Valid phone number");
    }
  });

  emailInput.addEventListener("input", function () {
    const email = emailInput.value.trim();

    if (emailRegex.test(email)) {
      emailInput.setCustomValidity("");
      emailInput.classList.add("valid");
      emailInput.classList.remove("invalid");
      console.log("Valid email address");
    } else {
      emailInput.setCustomValidity("Please enter a valid email address.");
      emailInput.classList.add("invalid");
      emailInput.classList.remove("valid");
      console.log("Invalid email address");
    }
  });

  function validatePasswordMatch() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password === confirmPassword) {
      passwordInput.setCustomValidity("");
      confirmPasswordInput.setCustomValidity("");
      passwordInput.classList.add("valid");
      passwordInput.classList.remove("invalid");
      confirmPasswordInput.classList.add("valid");
      confirmPasswordInput.classList.remove("invalid");
      console.log("Passwords match");
    } else {
      passwordInput.setCustomValidity("Passwords do not match");
      confirmPasswordInput.setCustomValidity("Passwords do not match");
      passwordInput.classList.add("invalid");
      passwordInput.classList.remove("valid");
      confirmPasswordInput.classList.add("invalid");
      confirmPasswordInput.classList.remove("valid");
      console.log("Passwords do not match");
    }
  }

  passwordInput.addEventListener("input", validatePasswordMatch);
  confirmPasswordInput.addEventListener("input", validatePasswordMatch);

  console.log("DOM content is loaded and parsed");
});
