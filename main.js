

let count = 0; //used to render question with id === count
let numCorrect = 0;
let chosenAnswer = '';


//button behaviors
$('#start').on('click', ()=>{
    //should hide the start page and then render 
    //the question box, answers, and footer
    count = 1;
    hideEverything();
    startQuiz();
});

$('#check').on('click', (event)=>{
    event.preventDefault();
    //should check answerchoice vs correct answer and then display feedback
    //should also add to correct counter if appropriate
    checkAnswer();
    $('.feedback').removeClass('hide');
    $('#check').prop('disabled', true);
    $('.answers').addClass('hide');
    $('.question').addClass('hide');
    
});

$('#close').on('click', (event) => {
    event.preventDefault();
    //should hide feedback and enable next button
    $('.feedback').addClass('hide');
    $('#next').removeAttr('disabled');
    $('.answers').removeClass('hide');
    $('.question').removeClass('hide');
    
});

$('#next').on('click', (event) => {
    event.preventDefault();
    count++;
    //should re-render question box with next question and disable itself
    //should also reflect progress in progress bar at bottom and counter
    //at top
    if (count > 2) {
        $('.answers').addClass('hide');
        $('.question').addClass('hide');
        $('.results').removeClass('hide');
    } else {
        renderNextQuestion();
        $('#next').prop('disabled', true);
        $('#check').removeAttr('disabled');
    }
    
});

$('#reset').on('click', (event) => {
    event.preventDefault();
    count = 0;
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

    //for rendering feedback, page should darken a little 
    //and feedback modal should appear with grpahic depending 
    //on if they got it right or wrong
    
};

function closeFeedback(){
    //when user clicks close button on feedback modal, feedback should disappear
    //and page lighten up
};

function renderNextQuestion(){
    //change inner html to reflect question with id === count
    //in question box and answer choices. 
    //also make sure counters are working
};

function initiateApp(){
    //hide everything and load all the functions
    //not sure if this step in necessary
    startQuiz();
    checkAnswer();
    closeFeedback();
    renderNextQuestion();
    hideEverything();
    landOnPage();
};

$(initiateApp);