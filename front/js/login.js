let play = document.getElementById('play');

let username = document.getElementById('username');
let password = document.getElementById('password');

let logErr = document.getElementById('logError');

let p = document.createElement('p');
logErr.appendChild(p);

function logError(err) {

    p.innerHTML = err;
    logErr.classList.remove('hidden');

}

play.addEventListener('click', () => {

    if (username.value !== "" && password.value !== ""){

        console.log("event")
        logger.sendLogin(username.value, password.value);
        }
    
    logError("Username or password incorect.");
});

