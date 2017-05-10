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
  const $email = $('#email');
  const $password = $('#pw');
  const $btn_signin = $('#btn_signin');

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
    } else {
      console.log("not logged in");
    }
  });

  $btn_signin.click(function(e) {
    const email = $email.val();
    const password = $password.val();
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(function(e) {
      console.log(e.message);
    });
    promise.then(function(e) {
      window.location.href = "./chatRoom.html";
    });
  });
});
