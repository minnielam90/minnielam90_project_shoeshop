function registerUser() {
  const registrationForm = document.getElementById("registrationForm");
  const emailInput = registrationForm.querySelector("#email");
  const passwordInput = registrationForm.querySelector("#password");
  const repeatPasswordInput = registrationForm.querySelector("#repeatPassword");
  const nameInput = registrationForm.querySelector("#name");
  const genderInput = registrationForm.querySelector("#gender");
  const phoneInput = registrationForm.querySelector("#phone");

  // Validate input presence
  if (
    !isInputPresent(emailInput) ||
    !isInputPresent(passwordInput) ||
    !isInputPresent(repeatPasswordInput) ||
    !isInputPresent(nameInput) ||
    !isInputPresent(phoneInput)
  ) {
    showModal("Please fill in all fields.");
    return;
  }

  const email = emailInput.value;
  const password = passwordInput.value;
  const repeatPassword = repeatPasswordInput.value;
  const name = nameInput.value;
  const gender = genderInput.value === "true";
  const phone = phoneInput.value;

  // Perform validation
  if (!validateEmail(email)) {
    showModal("Invalid email");
    return;
  }

  if (!validateName(name)) {
    showModal("Invalid name - Name must contain at least 5 characters");
    return;
  }

  if (!validatePassword(password)) {
    showModal("Invalid password - Password must contain at least 6 characters");
    return;
  }

  if (password !== repeatPassword) {
    showModal("Passwords do not match. Please enter matching passwords.");
    return;
  }

  if (!validatePhone(phone)) {
    showModal("Invalid phone number - Phone number must contain only numbers");
    return;
  }

  const userData = {
    email,
    password,
    name,
    gender,
    phone,
  };

  var promise = axios({
    method: "POST",
    responseType: "json",
    url: "https://shop.cyberlearn.vn/api/Users/signup",
    data: userData,
  });

  promise
    .then(function (result) {
      const responseMessage = document.getElementById("responseMessage");
      responseMessage.textContent = ""; // Clear existing content

      if (result.status === 200) {
        // Registration was successful
        showModal("Registration successful!");
        console.log(result);

        // Reset the form fields
        registrationForm.reset();

        // Redirect or perform other actions here
      } else {
        // Handle other status codes if needed
        console.error("Unexpected status code:", result.status);
      }
    })
    .catch(function (error) {
      // Handle errors
      console.error("Registration error:", error.response.data);
      const responseMessage = document.getElementById("responseMessage");
      responseMessage.textContent = ""; // Clear existing content

      if (error.response && error.response.data) {
        const { statusCode, message } = error.response.data;

        // Example: Display specific error messages based on server response
        if (statusCode === 400 && message === "Email đã được sử dụng!") {
          // Email is already in use
          showModal(
            "Email has already been used. Please use a different email."
          );
        } else {
          // Other registration failure
          // showModal(`Registration failed: ${message}`);
          // For non-email-in-use errors, do not show the error modal
        }
      } else {
        // General registration failure
        showModal("Registration failed. Please try again.");
      }

      console.error("Registration error:", error.response.data);
    });
}

// Helper function to check if an input element has a value
function isInputPresent(input) {
  return input.value.trim() !== "";
}

function validateEmail(email) {
  // Basic email validation using a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateName(name) {
  // Basic name validation: must contain at least 5 characters
  return name.length >= 5;
}

function validatePassword(password) {
  // Basic password validation: must contain at least 6 characters
  return password.length >= 6;
}

function validatePhone(phone) {
  // Basic phone number validation: must contain only digits
  const phoneRegex = /^\d+$/;
  return phoneRegex.test(phone);
}

function showModal(message) {
  // Show a Bootstrap pop-up modal with the validation message
  const modal = document.getElementById("validationModal");
  const modalBody = modal.querySelector(".modal-body");
  modalBody.textContent = message;
  $(modal).modal("show");
}

document.querySelector(".btn-sqr").addEventListener("click", registerUser);
