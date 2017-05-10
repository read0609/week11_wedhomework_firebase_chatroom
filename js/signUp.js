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
  const $btn_signUp = $('#btn_signUp');

  $btn_signUp.click(function(e) {
    const email = $email.val();
    const password = $password.val();
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(function(e) {
      console.log(e.message);
    });
    promise.then(function(user) {
      const dbUserid = dbUser.child(user.uid);
      dbUserid.push({
        email: user.email
      });
      window.location.href = "./personInfo.html";
    });
  });
});
