// All Twitter functions will be placed here

// https://dev.twitter.com/web/sign-in/implementing
function twitterLogin() {
    // STEP 1 - Obtaining a request token https://dev.twitter.com/oauth/overview/authorizing-requests
    //   Building an authorization header
    //     Basic variables
    var baseURL = 'https://api.twitter.com';
    var apiURL = baseURL + '/oauth/request_token';
    var headerObject;
    var data = null;
    var callback = function () {
        alert('Called Twitter API to login.');
    };

    //     Parameters
    var consumerKey = 'yWRLoVOVziOEhtacRSATnoMib';
    var nonce = Math.random().toString(36).slice(2); // generates random string

    var signature_method = 'HMAC-SHA1';
    var timestamp = (new Date).getTime();
    var token = '22602751-HBgGEH2rWUXlGbfvUuELmhHTQ28tAWTrFO9fXwAUz';
    var version = '1.0';

    // Creating the signature base string
    var buildSignatureString = function () { // we will build the Signature string after all variables are instantiated
        // https://dev.twitter.com/oauth/overview/creating-signatures
        // Collecting the request method and URL
        var httpMethod = 'POST';
        var URL = apiURL;

        // Collecting parameters
        var loopObj = {
            oauth_consumer_key: consumerKey,
            oauth_nonce: nonce,
            oauth_signature_method: signature_method,
            oauth_timestamp: timestamp,
            oauth_token: token,
            oauth_version: version
        };
        var loopObjKeysList = Object.keys(loopObj);
        var parametersString;
        for (i in loopObj) {
            if (i < loopObj.length) {
                parametersString += (loopObjKeysList[i] + '=' + loopObj[i] + '&');
            }
            else {
                parametersString += (loopObjKeysList[i] + '=' + loopObj[i]);
            }
        }
        var signatureBaseString = httpMethod + '&' + encodeURI(apiUrl) + '&' + encodeURI(parametersString); // remember to encode it
        var consumerSecret = 'pZQwtQZRxqgO86rf6AGgVUudIWPcqiQ5RD1WUtQ1No2NQzcR0m';
        var signingKey = encodeURI(consumerSecret) + '&';


        return signingKey;
    };

    var buildOauthParametersObj = function () {
        return {
            oauth_consumer_key: encodeURI(consumerKey),
            oauth_nonce: encodeURI(nonce),
            oauth_signature: encodeURI(buildSignatureString()), // here we encode it
            oauth_signature_method: encodeURI(signature_method),
            oauth_timestamp: timestamp,
            oauth_token: encodeURI(token),
            oauth_version: version
        };
    };

    var oauthParametersObj = buildOauthParametersObj(); // building it only after all variables are properly instantiated
    var keysArray = Object.keys(oauthParametersObj); // build an array of the keys of the oauthParameters to iterate over later

    headerObject = (function () {
        var string = "OAuth ";
        for (i in oauthParametersObj) {
            // if not yet the last parameter, add a comma to the end of the string
            if (i < oauthParametersObj.length) {
                string += keysArray[i] + '="' + oauthParametersObj[i] + '", ';
            }
            else {
                string += keysArray[i] + '="' + oauthParametersObj[i] + '"';
            }
        };

        var finalObj = {
            title: "Authorization",
            value: string
        };

        return finalObj;
    })();

    app.fn.ajax('POST', apiURL, headerObject, data, callback);
};

twitterLogin();
