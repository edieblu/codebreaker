let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');

    // only execute setHiddenFields if either answer or attemp value is empty
    if (answer.value == "" || attempt.value == "") {
        setHiddenFields();
    };

    // validate input, plus increment no. of attempts
    if (!validateInput(input.value)){
        return ;
    } 
    attempt.value++;

    if (getResults(input.value)) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    } else if (attempt.value >= 10){
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    } else {
        setMessage("Incorrect, try again.");
    }
};

// respond to input
function getResults(input){
    let html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    for (var i = 0; i < input.length; i++){
        //1. digit and position match
        if (input.charAt(i) === answer.value.charAt(i)){
            html += '<span class="glyphicon glyphicon-ok"></span>';
        //2. digit match
        } else if (answer.value.indexOf(input.chartAt(i)) > -1){
            html += '<span class="glyphicon glyphicon-transfer"></span>';
        //3. no match
        } else {
            html += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    html += '</div></div>';
    document.getElementById("results").innerHtml += html;

    // check if guess is correct
    if (input == answer.value) {
        return true;
    }
    return false;
}

// set hidden values (4 digits)
function setHiddenFields() {
      answer.value = Math.floor(Math.random()*10000).toString();
      while (answer.value.length < 4) {
        answer.value = "0" + answer.value;
      }
        attempt.value = "0";
};

// set message
function setMessage(message){
    document.getElementById('message').innerHtml = message;
}

function showAnswer(success){
    let code = document.getElementById("code");
    if (success){
        code.className += " success";
    } else {
        code.className += " failure"
    }
    code.innerHtml = answer.value;
}

function showReplay(){
    document.getElementById("guessing-div").style.display = "none";
    document.getElementById("replay-div").style.display = "block";

}
//check that input is 4 digits
function validateInput(input){
    if (input.lenght != 4){
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
    return true;
};




