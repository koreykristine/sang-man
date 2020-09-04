console.log("chill");

// When the page loads, a random song and image are selected from the answers array
    // the correct number of blank spaces will populate
    // the title will be "stored" into memory
    // the image will populate but be masked?

// When a button is clicked it will become lighter
    // if it matches a letter in the stored variable, the letter will appear in the right place

// select an image that will populate piece by piece when incorrect letters are guessed

// create an array of answers

// create a loser screen when the picture is complete

// create a field for the letters to populate

// when a user clicks begin, the game page will appear with a random song title and picture but the letters and picture will not be visible
    // if (letter entered in input box) matches any of the letters in the array below, change their color to black 
    

    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
    
    const answers = [
        {title: 'these boots are made for walkin', image: "https://i.imgur.com/XVodN8J.jpg"}, 
        {title: 'bitch better have my money', image: "https://i.imgur.com/fyRgY98.jpg" },
        {title: 'the boys are back in town', image: "https://i.imgur.com/PGjKwk1.jpg"}, 
        {title: 'back that azz up', image: "https://i.imgur.com/XuOyEqw.jpg" },
        {title: 'dont bring me down', image: "https://i.imgur.com/q0hmVLf.jpg"},
        {title: 'whats your fantasy', image: "https://i.imgur.com/G86AFe2.jpg"},
        {title: 'get your freak on', image: "https://i.imgur.com/ERlwIF9.jpg"},
        {title: 'watermelon sugar', image: "https://i.imgur.com/SyYlwTD.jpg"},
        {title: 'steal my sunshine', image: "https://i.imgur.com/2aNUevX.jpg"},
        {title: 'good vibrations', image: "https://i.imgur.com/XDb8vge.jpg"},
        {title: 'country grammar', image: "https://i.imgur.com/jB82tLw.jpg"},
        {title: 'bennie and the jets', image: "https://i.imgur.com/hthXBws.jpg"},
        {title: 'you make my dreams come true', image: "https://i.imgur.com/6PEG5PR.jpg"},
        {title: 'second hand news', image: "https://i.imgur.com/4s8bP5p.jpg"},
        {title: 'we didnt start the fire', image: "https://i.imgur.com/bwmED8F.jpg"},
        {title: 'blitzkrieg bop', image: "https://i.imgur.com/tVj04XV.jpg"},
        {title: 'search and destroy', image: "https://i.imgur.com/yjai7Rz.png"},
        {title: 'space oddity', image: "https://i.imgur.com/l1GaGCj.jpg"},
        {title: 'heart shaped box', image: "https://i.imgur.com/eMUeKhq.jpg"},
        {title: 'have you ever seen the rain', image: "https://i.imgur.com/rbgnXS9.jpg"},
        {title: 'takin care of business', image: "https://i.imgur.com/D0aZmMR.jpg"},
        {title: 'aint no sunshine', image: "https://i.imgur.com/Llj1dVc.jpg"},
        {title: 'fuck tha police', image: "https://i.imgur.com/S2rFfho.jpg"},
        {title: 'fake plastic trees', image: "https://i.imgur.com/LD4EsXe.jpg"},
        {title: 'hot girl summer', image: "https://i.imgur.com/sLbHbsZ.jpg"}
    ];

    /* picks random answer on page load */
const answer = answers[Math.floor(Math.random() * answers.length)];
console.log(answer);

const blankArray = [];

const $guessesLeft = $('#guesses');

/* const letterBabies = $('.letters') */

let currentLetter = "";

window.onload = function () { 

// create alphabet ul

    const $myButtons = $('#button');
    $myButtons.append('<ul id = "alpha"></ul>');

    for (var i = 0; i < alphabet.length; i++) {
        const $listLetters = $('ul')
        $listLetters.append(`<li id="${alphabet[i]}" class="letters">${alphabet[i]}</li>`)
    
}


/* populates random title and image based on randomizer above */
const $popImage = $('.photo-box img');
$popImage.attr('src', answer.image);

const $popAnswer = $('#correct-letters');
$popAnswer.text(answer.title);


/* separates title into individual letters */
answerString = answer.title.split("");
console.log(answerString);

/* blank spaces based on number of letters in the title */
for(let i = 0; i < answerString.length; i++) {
    if(answerString[i] === " "){
        blankArray[i] = '\xa0'; // creates white spaces in between words
    } else {
    blankArray[i] = "_";
    }
}

/* udates answer letters to blank spaces */
$popAnswer.text(blankArray.join(' '));
    

// shows number of guesses remaining
let guesses = 6;
// makes letter appear in place of blanks if correct letter is clicked
const checkLetter = function (str,letter) {
    let correct = false;
    for(let i = 0; i < str.length; i++){
        if(letter === str[i]){
            console.log("is a match");
            correct = true;
            blankArray[i] = letter;
            $popAnswer.text(blankArray.join(' '));
        } 
    }
    if(!correct){
        console.log("not a match");
        guesses --
        $guessesLeft.text(`You have ${guesses} incorrect guesses left.`);
    }
    if(guesses < 6){
        $('.photo-box img').css('filter', 'blur(40px)');
    }
    if(guesses < 5){
        $('.photo-box img').css('filter', 'blur(30px)');
    }
    if(guesses < 4){
        $('.photo-box img').css('filter', 'blur(20px)');
    }
    if(guesses < 3){
        $('.photo-box img').css('filter', 'blur(10px)');
    }
    if(guesses < 2){
        $('.photo-box img').css('filter', 'blur(5px)');
    }
    if(guesses < 1){
        $('#guesses').text("You Lose!");
        $('.photo-box img').css('filter', 'blur(0px)');
    }
    if(blankArray.indexOf("_") === -1){ // checking to see if there are any blank spaces left
        $('#guesses').text("You Win!");
        $('.photo-box img').css('filter', 'blur(0px)');
    }
}


/* makes letters clickable */
const letterBabies = $('.letters')
letterBabies.on('click', function(event){
    console.log(event.target.id)
    currentLetter = event.target.id;
    checkLetter(answer.title, currentLetter)  
});

// changes opacity of letters
const handleClick = function(event){
    const beenClicked = $(event.target).hasClass("clicked"); 
    if(!beenClicked){
        console.log(event.target);
        $(event.target).addClass("clicked").css("opacity", "0.25");
    }
}
$('.letters').on("click", handleClick);



} // end of on load function

// reloads page when restart button is clicked
$(".top button").click(function(){
    location.reload(true);
});