document.addEventListener('DOMContentLoaded', function(){
    var grid1 = document.getElementById('grid1');
    var grid2 = document.getElementById('grid2');
    var btn1 = document.getElementById('btn1');
    var btn2 = document.getElementById('btn2');
    var createAccount = document.getElementById('loginIn');
    var signInAccount = document.getElementById('signIn');

    btn1.addEventListener('click', function(){
        console.log('clicked 1');
        grid1.style.transform = 'translateY(-100%)';
        grid2.style.transform = 'translateY(0%)';
        createAccount.style.transform = 'translateX(100%)'; // Slide createAccount out
        setTimeout(function(){
            createAccount.style.width = '0';// Hide createAccount
            signInAccount.style.transform = 'translateX(0)'; // Slide signInAccount in
            signInAccount.style.width = '100%'; // Show signInAccount
        }, 100);
    });

    btn2.addEventListener('click', function(){
        console.log('clicked 2');
        grid2.style.transform = 'translateY(-100%)';
        grid1.style.transform = 'translateY(0)';
        signInAccount.style.transform = 'translateX(100%)'; // Slide signInAccount out
        setTimeout(() => {
            signInAccount.style.width = '0'; // Hide signInAccount
            createAccount.style.transform = 'translateX(0)'; // Slide createAccount in
            createAccount.style.width = '100%'; // Show createAccount
        }, 100);
    });

});
