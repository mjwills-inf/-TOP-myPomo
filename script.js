// Globals and events
const allInputs = document.querySelectorAll('input');
const valueChangeInoputs = document.querySelectorAll('.value-change')
let sessionValue = document.getElementById('session-text');
let breakValue = document.getElementById('break-text');
let timerValue = document.getElementById('timer');

let counter = sessionValue.innerText * 60;
let state = "stop";
let breakTime = "off"

addEvents = () => {
  for (i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener('click', buttonFunction)
  }
};

// Button Functions
buttonFunction = (event) => {
  switch (event.target.name) {
    case "session-plus":
      valueUpdate(+1, sessionValue);
      break;
    case "session-minus":
      valueUpdate(-1, sessionValue);
      break;
    case "break-plus":
      valueUpdate(+ 1, breakValue);
      break;
    case "break-minus":
      valueUpdate(-1, breakValue);
      break;
    case "stop":
      timerStop();
      break;
    case "play":
      state == "live" ? timerPause() : timerStart()
      break;
    case "refresh":      
      sessionValue.innerText = 25;
      breakValue.innerText = 5;
      timerStop();     
      break;
  }
  buttonCheck();
}

// Button Check Function
buttonCheck = () => {
  if (state == "live" || state == "paused") {
    for (i = 0; i < valueChangeInoputs.length; i++) {
      valueChangeInoputs[i].disabled = true;
    }
  } else {
    for (i = 0; i < valueChangeInoputs.length; i++) {
      valueChangeInoputs[i].disabled = false;
    }
  }
}

// Timer functions
timerStart = () => {
  secondLess = () => {
    if (counter == 0 && breakTime == "on") {
      timerStop();
      buttonCheck();
      alert("Pomodoro Complete.");
      clearInterval(setIntVar);
      return;
    } 
    if (counter == 0) {
      breakTime = "on";
      counter = breakValue.innerText * 60;      
      return;
    }
    counter--;
    display()    
  }
  setIntVar = setInterval(secondLess, 100);
  state = "live";
}

timerPause = () => {
  clearInterval(setIntVar);
  state = "paused";
}

timerStop = () => {
  clearInterval(setIntVar);
  counter = sessionValue.innerText * 60;
  display();
  state = "stop";
}

// Display Timer Funtion
display = () => {
  let mins = Math.floor(counter / 60);
  mins < 10 ? mins = "0" + mins : mins = mins;
  
  let secs = counter % 60;
  secs < 10 ? secs = "0" + secs : secs = secs;
  timerValue.innerText = mins + ":" + secs;  
}

// Display Session/Break Functions
valueUpdate = (plusMinus, whichValue) => {
  if (Number(whichValue.innerText == 1) && plusMinus == -1) {
    return;
  } else {
    whichValue.innerText = Number(whichValue.innerText) + plusMinus;
    counter = sessionValue.innerText * 60;
    display()
  }
}

// run 
addEvents();

