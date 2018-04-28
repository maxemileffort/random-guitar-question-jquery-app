
let count = 0; //used only for rendering questions
let numCorrect = 0;
let chosenAnswer = '';
let index = 0; //used for retrieving indexed items
let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


//button behaviors
$('#start').on('click', ()=>{
    //should hide the start page and then render 
    //the question box, answers, and footer
    count = 0;
    hideEverything();
    startQuiz();
    resetButtons();
});

$('#check').on('click', (event)=>{
    event.preventDefault();
    count++;
    //should check answerchoice vs correct answer and then display feedback
    //should also add to correct counter if appropriate
    checkAnswer();
    showFeedback();
    drawProgressBar();
});

$('label').on('click', (event)=>{
    chosenAnswer = `${event.target.value}`;
});

$('#close').on('click', (event) => {
    event.preventDefault();
    //should hide feedback and enable next button
    closeFeedback();
    index++;
});

$('#next').on('click', (event) => {
    event.preventDefault();
    //should re-render question box with next question and disable itself
    //should also reflect progress in progress bar at bottom
    if (count > 9 && numCorrect > 5) {
        $('#not-awesome-pic').addClass('hide');
        count++;
        $('.answers').addClass('hide');
        $('.question').addClass('hide');
        $('.results').removeClass('hide');
        $('div.results p').text("Party on, Garth! You got " + numCorrect + " correct!" )
    } else if (count > 9 && numCorrect <= 5) {
        $('#did-awesome-pic').addClass('hide');
        count++;
        $('.answers').addClass('hide');
        $('.question').addClass('hide');
        $('.results').removeClass('hide');
        $('div.results p').text("Try again, loser! You got " +numCorrect+" correct!" )
    } else {
        renderNextQuestion();
        $('#next').prop('disabled', true);
        $('#check').removeAttr('disabled');
    }
    resetButtons();
});

$('#reset').on('click', (event) => {
    event.preventDefault();
    count = 0;
    index = 0;
    numCorrect = 0;
    //should take us back to start page
    hideEverything();
    landOnPage();
    resetButtons();
});

function hideEverything(){
    //use this as a baseline to make sure that nothing is showing,
    //and then add what pieces need to show, one at a time
    $('div').addClass('hide');
};

function landOnPage() {
    //add pieces that render start page
    $('.logo').removeClass('hide');
    $('.start-page').removeClass('hide');
    $('.credits').removeClass('hide');
};

function startQuiz() {
    //render question box, answer choices, footer and reset header
    $('.logo').removeClass('hide');
    $('.counter').removeClass('hide');
    $('.correct-counter').removeClass('hide');
    $('.question').removeClass('hide');
    $('.answers').removeClass('hide');
    $('.credits').removeClass('hide');
    $('.progress-bar').removeClass('hide');
    renderNextQuestion();
    arr = [0,0,0,0,0,0,0,0,0,0]
    drawProgressBar();
        
};

function checkAnswer(){
    //store answer choice as a value and then check against correct answer in
    //object. if answers match, add 1 to numCorrect. afterwards, render feedback
    if (chosenAnswer == quiz[index].correctAnswer) {
        $('#correct-pic').removeClass('hide');
        numCorrect++;
    } else {
        $('#incorrect-pic').removeClass('hide');
    }
    //for rendering feedback, page should darken a little 
    //and feedback modal should appear with grpahic depending 
    //on if they got it right or wrong
    document.querySelector('#rendered-feedback').innerHTML = quiz[index].feedback;
};

function showFeedback(){
    //incorrect answers render a different message that tells what the right answer was.
    if (chosenAnswer !== quiz[index].correctAnswer) {
        document.querySelector('#rendered-feedback').innerHTML = `Nope. The correct answer is ${quiz[index].correctAnswer}`;
    }
    $('.feedback').removeClass('hide');
    $('#check').prop('disabled', true);
    $('.answers').addClass('hide');
    $('.question').addClass('hide');
};

function closeFeedback(){
    //when user clicks close button on feedback modal, feedback should disappear
    //and page lighten up
    $('.feedback').addClass('hide');
    $('#next').removeAttr('disabled');
    $('.answers').removeClass('hide');
    $('.question').removeClass('hide');
};

function resetButtons (){
    //puts buttons back to state where the users are ready to answer question
    $('#check').removeAttr('disabled');
    $('#next').prop('disabled', true);
    $('#incorrect-pic').addClass('hide');
    $('#correct-pic').addClass('hide');
};

function renderNextQuestion(){
    //change inner html to reflect question with index === count
    //in question box and answer choices. 
    //also redraws preogress bar
    document.querySelector('.question').innerHTML = '<p>' + quiz[count].question+'</p>';
    for(let i = 0;i < 4; i++){
        document.querySelector(`#answer${i+1}`).innerHTML = quiz[count].answerChoices[i] + "<input value='" + quiz[count].answerChoices[i] + "' name='answer' type='radio'><span class='checkmark'></span>";    
    }
};

const progBarDict = {
    0: "black",
    1: "green",
    2: "red"
}

function drawProgressBar(){
    //based on outcome of check answer, if question was answered correctly, then add a green box to progress bar.
    //if question was answered incorrectly, add a red box to progress bar.
    let output = 'Progress: ';
    if (chosenAnswer === quiz[index].correctAnswer) {
        arr[index] = 1;
    } else if (chosenAnswer !== quiz[index].correctAnswer && count >=1){
        arr[index] = 2;
    }
    for (let x = 0; x < arr.length; x++) {
        output += `<div class='box ${progBarDict[arr[x]]}'></div>`
    }
    if (output !== null || output !== undefined) {
        document.querySelector('.progress-bar').innerHTML = output;
    }
    
}

function initiateApp(){
    //hide everything and load all the functions
    //then render start page
    // drawProgressBar();
    // startQuiz();
    // checkAnswer();
    // showFeedback();
    // closeFeedback();
    // renderNextQuestion();
    hideEverything();
    landOnPage();
    // resetButtons();
};

$(initiateApp);