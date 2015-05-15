var app = {
  fn: {
    ajax: function (method, apiUrl, data, callback) {
      var xmlhttp;
      if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
      } else {
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
      }

      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
          if (xmlhttp.status == 200) {
            document.getElementById('myDiv').innerHTML = xmlhttp.responseText;
          }
          else
          if (xmlhttp.status == 400) {
            alert('Error 400, bro.')
          }
          else (
            alert(xmlhttp.status.toString)
          )
        }
      };

      xmlhttp.open(method, apiUrl, true);

      method == 'POST' ? xmlhttp.send(data) : xmlhttp.send();
    },
    postToWall: function () {
      var data = document.querySelectorAll('#toBePosted').value;
      var params = {};
      params.message = data;
      var callback = function (response) {
        // update the UI to state that the update has been a success
        if (!response || response.error) {
          console.log(response.error);
          app.fn.toast('Your update failed for some reason.' + JSON.stringify(response.error));
        }
        else {
          app.fn.toast('Your wall has been successfully updated.');
        }
      };
      FB.api('/me/feed', 'POST', JSON.stringify(params), callback);
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
  apiUrlList: {
    graphApi: function () { return 'https://graph.facebook.com'},
    postToWall: function () { return '/v2.3/geoyws'},
    postToPage: function () { return '/v2.3/'}
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
