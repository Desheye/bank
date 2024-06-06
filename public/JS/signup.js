/** document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('signup-form').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form submission
    
        const name = document.getElementById('full_name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirm_password = document.getElementById('confirm_password').value;
        const csrf_token = document.querySelector('input[name="_csrf"]').value;
    
        // Create an object with the collected data
        const userData = {
            full_name: name,
            phone: phone,
            email: email,
            password: password,
            confirm_password: confirm_password,
            _csrf: csrf_token
        };
    
        try {
            const response = await fetch('/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            if (response.ok) {
                console.log("Successful");
            } else {
                console.log("Something's wrong!!!");
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    });
    
});**/

//const axios = require('axios');

document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById('full_name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;
    const csrf_token = document.querySelector('input[name="_csrf"]').value;

    // Create an object with the collected data
    const userData = {
        full_name: name,
        phone: phone,
        email: email,
        password: password,
        confirm_password: confirm_password,
        _csrf: csrf_token
    };

    try {
        const response = await axios.post('/signup', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            console.log("Successful");
        } else {
            console.log("Something's wrong!!!");
        }
    } catch (error) {
        console.error('Error sending data:', error);
    }
});

