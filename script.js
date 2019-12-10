//Globals and events
const allInputs = document.querySelectorAll('input');
let sessionValue = document.getElementById('session-text');
let breakValue = document.getElementById('break-text');
let timerValue = document.getElementById('timer');

let counter = sessionValue.innerText * 60;
let state = "stop";

addEvents = () => {
  for (i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener('click', buttonFunction)
  }
};

// Button Function Map
buttonFunction = (event) => {
  switch (event.target.name) {
    case "session-plus":
      sessionValueUpdate(+1);
      break;
    case "session-minus":
      sessionValueUpdate(-1);
      break;
    case "break-plus":
      breakValueUpdate(+ 1);
      break;
    case "break-minus":
      breakValueUpdate(-1);
      break;
    case "stop":
      console.log("placeholder");
      break;


    case "play":
      if (state == "live") {
        timerPause();
      } else {
        timerStart();
      }
      break;


    case "refresh":
      // sessionValue.innerText = 25;
      // breakValue.innerText = 5;
      break;
  }
}

// Break/Session change functions
sessionValueUpdate = (plusMinus) => {
  if (Number(sessionValue.innerText == 1) && plusMinus == -1) {
    return;
  } else {
    sessionValue.innerText = Number(sessionValue.innerText) + plusMinus;
    counter = sessionValue.innerText * 60;
    timerValue.innerText = sessionValue.innerText + ":00"
  }
}

breakValueUpdate = (plusMinus) => {
  if (Number(breakValue.innerText == 1) && plusMinus == -1) {
    return;
  } else {
    breakValue.innerText = Number(breakValue.innerText) + plusMinus;
  }
}

//Timer functions
timerStart = () => {
  secondLess = () => {
    counter--;
    display()
  }
  setIntVar = setInterval(secondLess, 10);
  state = "live";
}

timerPause = () => {
  clearInterval(setIntVar);
  state = "paused";
}

//Display Funtion
display = () => {
  let mins = Math.floor(counter / 60);
  if (mins < 10) {
    mins = "0" + mins;
  }
  let secs = counter % 60;
  if (secs < 10) {
    secs = "0" + secs;
  }
  timerValue.innerText = mins + ":" + secs;
}

//run 
addEvents();

