if (window.attachEvent && !window.addEventListener) {
    alert('Please upgrade your browser. We do not support < IE9.');
}

var app = {
    fn: {
        ajax: function (method, apiURL, headerObject, data, callback) {
            var xmlhttp;

            // Checking for browser compatibility
            if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            }
            else {
                // code for <IE7
                xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
            }

            //console.log(xmlhttp.withCredentials);
            //// Enabling CORS
            //if ('withCredentials' in xmlhttp) {
            //    xmlhttp.open(method, apiURL, true);
            //}
            //else
            //// enable CORS for MSFT IE
            //if (typeof XDomainRequest != 'undefined') {
            //    xmlhttp = new XDomainRequest();
            //    xmlhttp.open(method, apiURL, true);
            //}
            //else {
            //    alert('Your browser doesn\'t support CORS.');
            //}

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                    if (xmlhttp.status == 200) {
                        document.getElementById('myDiv').innerHTML = xmlhttp.responseText;
                    }
                    else
                    if (xmlhttp.status == 400) {
                        alert('Error 400, bro.');
                    }
                    else {
                        alert('Something went wrong.');
                    }
                }
            };

            xmlhttp.open(method, apiURL, true);
            xmlhttp.setRequestHeader(headerObject.title, headerObject.value);
            method == 'POST' ? xmlhttp.send(data) : xmlhttp.send();
        },
        fbPostToWall: function () {
            var data = document.querySelectorAll('#toBePosted')[0].value;
            var callback = function (response) {
                // update the UI to state that the update has been a success
                if (!response || response.error) {
                    console.log(response.error);
                    app.fn.toast('Your update failed for some reason.' + JSON.stringify(response.error));
                }
                else {
                    app.fn.toast('Your wall has been successfully updated with: ' + data);
                }
            };
            // we do not use app.fn.ajax here but we use FB.api right away
            FB.api('/me/feed', 'post', { message: data }, callback);
            console.log('You updated your wall with: ' + data);
        },
        toast: function (message) {
            toastElement = document.getElementById('toast');
            toastElement.innerHTML = message;
            toastElement.classList.add('show');
            var disappear = function () {
                toastElement.classList.remove('show');
            };
            setTimeout(disappear, 4000);
        }
    },
    apiURLList: {
        graphApi: function () { return 'https://graph.facebook.com' },
        postToWall: function () { return '/v2.3/geoyws' },
        postToPage: function () { return '/v2.3/' }
    },
    userFbInfo: {
        name: 'George Yong',
        userId: 439492348238,
        pages: [
          {
              pageName: 'likesbeforelove',
              pageId: 0239393493
          },
          {
              pageName: 'carsoTest',
              pageId: 3932934939
          }
        ]
    }
}
