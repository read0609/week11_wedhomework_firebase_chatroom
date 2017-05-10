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


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      user.providerData.forEach(function(profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("provider-specific UID: " + profile.uid);
        console.log("userName: " + profile.displayName);
        console.log("imageURL: " + profile.photoURL);
      });

    } else {
      console.log("not logged in");
      window.location.href = "./index.html";
    }
  });

  const $submit = $('#submit');
  const $imageURL = $('#imageURL').val();
  const $file = $('#file');
  $file.change(handleFileSelect);
  var storageRef = firebase.storage().ref();
  var photoURL;

  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];

    var metadata = {
      'contentType': file.type
    }

    storageRef.child('image/' + file.name).put(file, metadata).then(
      function(snapshot) {
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
        console.log(snapshot.metadata);
        photoURL = snapshot.metadata.downloadURLs[0];
        console.log('File available at', photoURL);
      }).catch(function(error) {
      console.error('Upload failed:', error);
    });
  }

  $submit.click(function(e) {
    const user = firebase.auth().currentUser;
    const $userName = $('#userName').val();
    const $occupotion = $('#occupotion').val();
    const $age = $('#age').val();
    const $description = $('#description').val();

    //console.log($userName);
    //console.log($occupotion);
    //console.log($age);
    //console.log($description);
    //console.log($imageURL);
    if (user) {
      const promise = user.updateProfile({
        displayName: $userName,
        photoURL: photoURL
      });
      promise.then(function(e) {
        const dbUserid = dbUser.child(user.uid);
        dbUserid.update({
          'age': $age,
          'occupotion': $occupotion,
          'description': $description
        })
        console.log("Update successful");
        window.location.href = "./index.html";
      });
    };
  });


});
