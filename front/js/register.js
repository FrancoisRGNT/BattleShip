let saving = document.getElementById('saving');
let username = document.getElementById('username');
let password = document.getElementById('password');
let cpassword = document.getElementById('cpassword');
let logErr = document.getElementById('logError');

let p = document.createElement('p');
logErr.appendChild(p);

function verifPassword(){

    if (password.value == cpassword.value){
        return true;
    }
    else return false;

};


function logError(err){

    

    p.innerHTML = err;
    logErr.classList.remove('hidden');

}



saving.addEventListener('click', () => {

    if (verifPassword() == true && password.value !== "" && username.value !== "" && username.value.indexOf(" ") === -1){

         logger.sendLogin(username.value, password.value);
         logError("Username already taken");

    }
    else {

        logError("Incorrect login or password error");

    }

});