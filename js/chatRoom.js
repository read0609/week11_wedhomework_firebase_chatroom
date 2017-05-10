$(document).ready(function() {
  var config = {
    apiKey: "AIzaSyDtkYKxQsHnfdZbipNowi_1AU23fgXMmks",
    authDomain: "read0609-b8124.firebaseapp.com",
    databaseURL: "https://read0609-b8124.firebaseio.com",
    projectId: "read0609-b8124",
    storageBucket: "read0609-b8124.appspot.com",
    messagingSenderId: "1889994683"
  };

  firebase.initializeApp(config);
  var dbchat = firebase.database().ref().child('chatroom');
  var dbUser = firebase.database().ref().child('user');

  var $messageField = $('#inputMessage');
  const $inputname = $('#inputname');
  const $messagesList = $('#messagesList');



  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      user.providerData.forEach(function(profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("provider-specific UID: " + profile.uid);
        console.log("userName: " + profile.displayName);
        console.log("imageURL: " + profile.photoURL);
      });

      name = user.displayName;

      $messageField.keypress(function(e) {
        if (e.keyCode == 13) {
          const message = $messageField.val();
          const inputname = name;
          console.log("user " + name);

          dbchat.push({
            name: inputname,
            text: message
          });
          $messageField.val('');
        };
      });

      dbchat.limitToLast(10).on('child_added', function(snapshot) {
        var data = snapshot.val();
        var username = data.name || "anonymous";
        var message = data.text;
        var photoURL = user.photoURL || "#";

        var $messageElement = $("<li>");
        var $photo = $("<img>");

        var $nameElement = $("<strong class='chat_username'></strong>")
        $photo.attr({
          "src": photoURL
        });
        $nameElement.text(username).prepend($photo);
        $messageElement.text(message).prepend($nameElement);

        $messagesList.append($messageElement);

        $messagesList[0].scrollTop = $messagesList[0].scrollHeight;
      });
    } else {
      console.log("not logged in");
      window.location.href = "index.html";
    };
  });

});
