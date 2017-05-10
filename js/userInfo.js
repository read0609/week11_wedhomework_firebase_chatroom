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
  var dbUser = firebase.database().ref().child('user');
  //var dbUser = firebase.database().ref();

  var $userInfo = $('#userInfo');

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      user.providerData.forEach(function(profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("provider-specific UID: " + profile.uid);
        console.log("userName: " + profile.displayName);
        console.log("imageURL: " + profile.photoURL);
      });
      dbUser.child(firebase.auth().currentUser.uid).on('value', function(snapshot) {
        photoURL = user.photoURL;
        //console.log(photoURL);
        //console.log(user.displayName);
        //console.log(snapshot.val().description);
        //console.log(snapshot.val().age);
        //console.log(snapshot.val().occupotion);
        $("#nametext").html("name: " + user.displayName);
        $("#user_img").attr({
          "style": "background: url('" + photoURL + "');"
        });
        $("#userInfo").html(function() {
          var text = "<li><b>description</b>:" + snapshot.val().description + "</li>"
          text += "<li><b>age</b>:" + snapshot.val().age + "</li>"
          text += "<li><b>occupotion</b>:" + snapshot.val().occupotion + "</li>"
          return text;
        });
      });
    } else {
      console.log("not logged in");
      window.location.href = "index.html";
    };
  });

});
