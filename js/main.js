const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Youtube",
  "Linkedin",
  "Testing",
  "Mind",
  "Destructuring",
  "Monopoloy",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Internet",
  "Scada",
  "Instruction",
  "Dynamic",
  "Working",
  "Playing",
  "Typing",
  "Default",
  "Total",
];

const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

let startBtn = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let newAddition = document.querySelector(".chooselvl");
let pickedlvls = document.querySelectorAll(".chooselvl input");
let defaultLvlName, defaultLvlSeconds;

//change level from here

pickedlvls.forEach((lvl) => {
  lvl.onclick = function () {
    input.value = "";
    scoreGot.innerHTML = 0 ;
    startBtn.innerHTML = "Click To Start";
    defaultLvlName = lvl.dataset.lvl;
    defaultLvlSeconds = lvls[defaultLvlName];
    lvlNameSpan.innerHTML = defaultLvlName;
    secondsSpan.innerHTML = defaultLvlSeconds;
    timeLeftSpan.innerHTML = defaultLvlSeconds;
  };
});

scoreTotal.innerHTML = words.length;

//disable paste event
input.onpaste = function () {
  return false;
};

//start game
startBtn.onclick = function () {
  if (
    lvlNameSpan.innerHTML == "Easy" ||
    lvlNameSpan.innerHTML == "Normal" ||
    lvlNameSpan.innerHTML == "Hard"
  ) {
    this.remove();
    newAddition.remove();
    input.focus();
    // generate word function
    genWords();
  }else {
    startBtn.innerHTML = "Please Choose A Level To Start With";
  }
};

function genWords() {
  //get random word from array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // get word index
  let wordIndex = words.indexOf(randomWord);
  //remove word from array
  words.splice(wordIndex, 1);
  // show the random word
  theWord.innerHTML = randomWord;
  //empty upcoming words
  upcomingWords.innerHTML = "";
  // generate upcoming words
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // call start play function
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLvlSeconds;
  let starting = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(starting);
      //compare Words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        //empty input field
        input.value = "";
        scoreGot.innerHTML++;
        
        if (words.length === 1) {
          // remove upcoming box
          upcomingWords.remove();
        }
        if (words.length > 0) {
          genWords();
        } else {
          //incase of winnig
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congratulations You Win");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          localStorage.setItem(new Date(),scoreGot.innerHTML);
        }
      } else {
        //incase of losing
        localStorage.setItem(new Date(),scoreGot.innerHTML);
        let x = localStorage.getItem(new Date());
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode(`Game Over Your Score Is ${x}`);
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      
      }
    }
  }, 1000);
}

finishMessage.onclick = function() {
  location.reload();
}

