let logger = (function(){

    function postLog(username, password) {
        $.ajax({
            type: "POST",
            url: "/register/",
            data: {
                login: username,
                psd: password
            },
            success: () => { 
                window.location.href = "/";            },
        });
    }

    return {
        sendLogin(username, password) {
            postLog(username, password);
        }
    }
})();