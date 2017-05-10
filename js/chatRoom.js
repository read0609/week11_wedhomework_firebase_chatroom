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
  //var dbUser = firebase.database().ref();

  var $messageField = $('#inputMessage');
  const $inputname = $('#inputname');
  const $messagesList = $('#messagesList');

  $messageField.keypress(function(e) {
    if (e.keyCode == 13) {
      const message = $messageField.val();
      const inputname = $inputname.val();
      const messagesList = $messagesList.val();

      dbchat.push({
        name: inputname,
        text: message
      });
      $messageField.val('');
    };
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      user.providerData.forEach(function(profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("provider-specific UID: " + profile.uid);
        console.log("userName: " + profile.displayName);
        console.log("imageURL: " + profile.photoURL);
      });
      dbchat.limitToLast(10).on('child_added', function(snapshot) {
        var data = snapshot.val();
        var username = data.name || "anonymous";
        var message = data.text;

        var $messageElement = $("<li>");
        var $nameElement = $("<strong class='chat_username'></strong>")
        $nameElement.text(username);
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
