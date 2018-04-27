

let count = 0; //used to render question with id === count
let numCorrect = 0;
let chosenAnswer = '';
let feedbackIndex = 0;

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
});

$('label').on('click', (event)=>{
    chosenAnswer = event.target.value;
});

$('#close').on('click', (event) => {
    event.preventDefault();
    //should hide feedback and enable next button
    closeFeedback();
    feedbackIndex++;
    
});

$('#next').on('click', (event) => {
    event.preventDefault();
    //should re-render question box with next question and disable itself
    //should also reflect progress in progress bar at bottom and counter
    //at top
    if (count > 9 && numCorrect > 5) {
        $('#not-awesome-pic').addClass('hide');
        count++;
        $('.answers').addClass('hide');
        $('.question').addClass('hide');
        $('.results').removeClass('hide');
        $('div.results p').text("Party on, Garth!")
    } else if (count > 9 && numCorrect <= 5) {
        $('#did-awesome-pic').addClass('hide');
        count++;
        $('.answers').addClass('hide');
        $('.question').addClass('hide');
        $('.results').removeClass('hide');
        $('div.results p').text("Try again, loser!")
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
    feedbackIndex = 0;
    numCorrect = 0;
    //should take us back to start page
    hideEverything();
    landOnPage();
    $('#check').removeAttr('disabled');
    $('#next').prop('disabled', true);

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
    renderNextQuestion();

};

function checkAnswer(){
    //store answer choice as a value and then check against correct answer in
    //object. if answers match, add 1 to numCorrect. afterwards, render feedback
    if (chosenAnswer == quiz[feedbackIndex].correctAnswer) {
        numCorrect++;
        document.querySelector('#num-correct').innerHTML = numCorrect;
        $('#correct-pic').removeClass('hide');
    } else {
        $('#incorrect-pic').removeClass('hide');
    }
    //for rendering feedback, page should darken a little 
    //and feedback modal should appear with grpahic depending 
    //on if they got it right or wrong
    document.querySelector('#rendered-feedback').innerHTML = quiz[feedbackIndex].feedback;
};

function showFeedback(){
    
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
    $('#check').removeAttr('disabled');
    $('#next').prop('disabled', true);
    $('#incorrect-pic').addClass('hide');
    $('#correct-pic').addClass('hide');
};

function renderNextQuestion(){
    //change inner html to reflect question with index === count
    //in question box and answer choices. 
    //also make sure counters are working
    document.querySelector('.question').innerHTML = '<p>' + quiz[count].question+'</p>';
    document.querySelector('#answer1').innerHTML = quiz[count].answerChoices[0] + "<input value='"+quiz[count].answerChoices[0]+"' name='answer' type='radio'><span class='checkmark'></span>";
    document.querySelector('#answer2').innerHTML = quiz[count].answerChoices[1] + "<input value='"+quiz[count].answerChoices[1]+"' name='answer' type='radio'><span class='checkmark'></span>";
    document.querySelector('#answer3').innerHTML = quiz[count].answerChoices[2] + "<input value='"+quiz[count].answerChoices[2]+"' name='answer' type='radio'><span class='checkmark'></span>";
    document.querySelector('#answer4').innerHTML = quiz[count].answerChoices[3] + "<input value='"+quiz[count].answerChoices[3]+"' name='answer' type='radio'><span class='checkmark'></span>";
    document.querySelector('#counter').innerHTML = count+1;
    document.querySelector('#total').innerHTML = quiz.length;
    document.querySelector('#total-asked').innerHTML = count+1;
    document.querySelector('#num-correct').innerHTML = numCorrect;
};

function initiateApp(){
    //hide everything and load all the functions
    //then render start page
    startQuiz();
    checkAnswer();
    showFeedback();
    closeFeedback();
    renderNextQuestion();
    hideEverything();
    landOnPage();
    resetButtons();
};

$(initiateApp);