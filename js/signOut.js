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
  const $btn_signOut = $('#btn_signOut');

  $btn_signOut.click(function() {
    console.log("log out!!");
    firebase.auth().signOut();
    window.location.href = "index.html";
    console.log("log out!!");
  });
});
