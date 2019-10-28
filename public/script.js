
let counterOne = 0;
let counterTwo = 0;


//========================================================
//          Ajax request for all invites sent
//========================================================
var responseHandler = function() {
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);


  let something = JSON.parse(this.responseText);
  somethingElse = something.results;

  for (let i=0; i<somethingElse.length; i++){
    counterOne ++;
  };
  if (counterOne>0){
    let invitesSent = document.querySelector(".invitesSent");
    invitesSent.innerHTML = counterOne;
  };



    let counterAll = counterOne + counterTwo;
    if(counterAll>0){
        document.querySelector(".invitesStuff").innerHTML = counterAll;
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
//========================================================
//========================================================




//========================================================
//          Ajax request for all invites received
//========================================================
var responseHandlerTwo = function() {
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);


  let something = JSON.parse(this.responseText);
  somethingElse = something.results;

  for (let i=0; i<somethingElse.length; i++){
    counterTwo ++;
  };
  if (counterTwo>0){
    let invitesSent = document.querySelector(".invitesReceived");
    invitesSent.innerHTML = counterTwo;
  };



    let counterAll = counterOne + counterTwo;
    if(counterAll>0){
        document.querySelector(".invitesStuff").innerHTML = counterAll;
    };
};


// make a new request
var requestTwo = new XMLHttpRequest();

// listen for the request response
requestTwo.addEventListener("load", responseHandlerTwo);

// ready the system by calling open, and specifying the url
var url = "/invitesReceivedAjax";
requestTwo.open("GET", url);

// send the request
requestTwo.send();
//========================================================
//========================================================


    console.log(counterOne)
    console.log(counterTwo)








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