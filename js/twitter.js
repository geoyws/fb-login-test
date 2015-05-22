// https://dev.twitter.com/web/sign-in/implementing
function twitterLogin() {
    var apiUrl = 'https://api.twitter.com/oauth/request_token';
    var headerObject;
    var data = null;
    var callback = function () {
        alert('Called Twitter API to login.');
    };

    var consumerKey = 'yWRLoVOVziOEhtacRSATnoMib',
        nonce = Math.random().toString(36).slice(2), // generates random string
        signature = '', // https://dev.twitter.com/oauth/overview/creating-signatures
        signature_method = 'HMAC-SHA1',
        timestamp = (new Date).getTime(),
        token = '22602751-HBgGEH2rWUXlGbfvUuELmhHTQ28tAWTrFO9fXwAUz',
        version = '1.0';

    var oauthParameters = {
        oauth_consumer_key: encodeURI(consumerKey),
        oauth_nonce: encodeURI(nonce),
        oauth_signature: encodeURI(signature),
        oauth_signature_method: encodeURI(signature_method),
        oauth_timestamp: timestamp,
        oauth_token: encodeURI(token),
        oauth_version: version
    };

    var keysArray = Object.keys(oauthParameters);

    headerObject = (function () {
        var string = "OAuth ";
        for (i in oauthParameters) {
            // if not yet the last parameter, add a comma to the end of the string
            if (i < oauthParameters.length) {
                string += keysArray[i] + '="' + oauthParameters[i] + '", ';
            }
            else {
                string += keysArray[i] + '="' + oauthParameters[i] + '"';
            }
        };

        var obj = {
            title: "Authorization",
            value: string
        };

        return obj;
    })();

    app.fn.ajax('POST', apiUrl, headerObject, data, callback);
};

twitterLogin();
