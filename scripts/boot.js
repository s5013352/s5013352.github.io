

var boot = {

    fitbitAccessToken : "empty",

    login:function() {
        window.location.replace('https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22CG2K&redirect_uri=https%3A%2F%2Fs5013352.github.io%2Fcandyboxf&expires_in=2592000&scope=activity');
    }

}