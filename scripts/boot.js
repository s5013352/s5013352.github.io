

var boot = {

    fitbitAccessToken : "empty",

    login:function() {
        window.location.replace('https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22CG2K&redirect_uri=http%3A%2F%2Fs5013352.github.io%2Fcandyboxf&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight');
    }

}
