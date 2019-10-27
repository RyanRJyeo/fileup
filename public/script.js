

var responseHandler = function() {
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);

  let counter = 0;
  let something = JSON.parse(this.responseText);
  somethingElse = something.results;
  console.log(somethingElse);
  for (let i=0; i<somethingElse.length; i++){
    counter ++;
  };
  if (counter>0){
    let invitesSent = document.querySelector(".invitesSent");
    invitesSent.innerHTML = counter;
  };

};


// make a new request
var request = new XMLHttpRequest();

// listen for the request response
request.addEventListener("load", responseHandler);

// ready the system by calling open, and specifying the url
var url = "/invitesSentAjax";
request.open("GET", url);

// send the request
request.send();











var password = document.getElementById("password")
  , confirm_password = document.getElementById("confirm_password");

function validatePassword(){
  if(password.value != null){
    confirm_password.classList.remove("d-none");
  }


  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}


password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;