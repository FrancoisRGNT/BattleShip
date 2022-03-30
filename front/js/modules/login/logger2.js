let logger = (function(){

    function postLog(username, password) {
        $.ajax({
            type: "POST",
            url: "/",
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