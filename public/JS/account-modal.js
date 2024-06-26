document.addEventListener("DOMContentLoaded", function(){
  // Get the modal
  const paymentPortalButton = document.querySelector('.payment-portal');
  const loginContainer = document.querySelector('.login-container');
  
  paymentPortalButton.addEventListener('click', () => {
    loginContainer.classList.toggle('open');
  });

  console.log('Modal Loaded');


/*$(document).ready(function() {
console.log('Ready To Serve');
  $('#accountNumber').on('change', function() {
    const accountNumber = $(this).val();
    $.get(`/getUserName?accountNumber=${accountNumber}`, function(data) {
      if (data.userName) {
        $('#receiver span').text(data.userName);
      } else {
        $('#receiver span').text('User not found');
      }
    });
  });
});*/

console.log('Modal Fired Up - Ready To Serve');


//Retrieveing Account Details In Json Format

// Handle the login form submission
const loginForm = document.getElementById('loginForm');
/*loginForm.addEventListener('submit', async (event) => {
console.log('Login Form Up.....');
event.preventDefault();

const formData = new FormData(loginForm);
const response = await fetch('/login', {
  method: 'POST',
  body: formData
});

const data = await response.json();

if (response.ok) {
  // Update the UI with the user data
  const userNameElement = document.getElementById('userName');
  const balanceElement = document.getElementById('balance');

  userNameElement.textContent = data.userName;
  balanceElement.textContent = `N${data.balance}`;

  // Show the account details section
  const accountDetailsSection = document.getElementById('accountDetails');
  accountDetailsSection.style.display = 'block';
} else {
  // Handle errors
  console.error('Error:', data.error);
}
});*/


//Fetching Full Name With Acc Number

//const accountNumberInput = document.getElementById('accountNumber');
//const receiverNameElement = document.getElementById('receiverName');

/*accountNumberInput.addEventListener('input', async () => {
const accountNumber = accountNumberInput.value;

try {
  const response = await fetch(`/accounts/${accountNumber}`);
  const data = await response.json();

  if (response.ok) {
    receiverNameElement.textContent = data.fullName;
    console.log('Full name received:', data.fullName); // Debug statement
  } else {
    receiverNameElement.textContent = 'User not found';
    console.error('Error:', data.error);
  }
} catch (error) {
  receiverNameElement.textContent = 'An error occurred';
  console.error('Error:', error);
}
});*/

$(document).ready(function() {
console.log('JQuery on the Go.....');
$('#fetchReceiverName').click(function() {
  const accountNumber = $('#accountNumber').val();
  if (accountNumber) {
    $.get(`/users/${accountNumber}`, function(data) {
      if (data.name) {
        $('#receiverNamePlaceholder').text(data.name);
        $('#finalReceiverAccountNumber').val(accountNumber);
      } else {
        $('#receiverNamePlaceholder').text('Account Number not found');
        $('#finalReceiverAccountNumber').val('');
      }
    });
  }
});
});

//JQuery for NEWS API
$(document).ready(function() {
console.log('Fetch News API');
// Fetch financial news headlines from server
$.get('/financial-news', function(data) {
  // Check if headlines are available
  if (data.headlines && data.headlines.length > 0) {
    // Iterate through headlines and populate <li> tags
    data.headlines.forEach(function(headline) {
      $('.news-grid').append(`<li>${headline}</li>`);
    });
  } else {
    // If no headlines available, display a message
    $('.news-grid').append('<li>No headlines available</li>');
  }
});
});

});