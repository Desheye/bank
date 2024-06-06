/*document.addEventListener("DOMContentLoaded", function(){
  // Get references to the button and grid container
  const loginButton = document.getElementById('loginButton');
  const gridContainer = document.getElementById('grid-container');

  // Add an event listener to the button
  loginButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent click event from propagating to the document
    console.log("Script Loaded");
    // Toggle the visibility of the grid container
    gridContainer.style.visibility = gridContainer.style.visibility === 'visible' ? 'hidden' : 'visible';
  });
  console.log("Script Loaded Successfully");

  // Add an event listener to the document to detect clicks outside the grid container
  document.addEventListener('click', (event) => {
    if (gridContainer.style.visibility === 'visible' && !gridContainer.contains(event.target)) {
      gridContainer.style.visibility = 'hidden';
    }
  });

  document.getElementById('signup-form').addEventListener('submit', function() {
    document.getElementById('response-iframe').style.display = 'block';
  });
});*/


document.addEventListener("DOMContentLoaded", function(){
  // Get references to the button and grid container
  const loginButton = document.getElementById('loginButton');
  const gridContainer = document.getElementById('grid-container');

  // Add an event listener to the button
  loginButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent click event from propagating to the document
    console.log("Script Loaded");
    // Toggle the 'visible' class on the grid container
    gridContainer.classList.toggle('visible');
  });
  console.log("Script Loaded Successfully");

  // Add an event listener to the document to detect clicks outside the grid container
  document.addEventListener('click', (event) => {
    if (gridContainer.classList.contains('visible') && !gridContainer.contains(event.target)) {
      gridContainer.classList.remove('visible');
    }
  });

  document.getElementById('signup-form').addEventListener('submit', function() {
    document.getElementById('response-iframe').style.display = 'block';
  });
});
