function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyColor = document.querySelector('body')
const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')
let startId = null;
let startFlag = false;

startBtn.addEventListener('click', onStartClick)
stopBtn.addEventListener('click', onStopClick)

function onStartClick() {
  if (startFlag) {
    return;
  } else {
    startFlag = true;
    startId = setInterval(() => { 
    bodyColor.style.backgroundColor = getRandomHexColor()
  }, 1000) }
  
}

function onStopClick() { 
  clearInterval(startId)
  startFlag = false;
  bodyColor.style.backgroundColor = '#FFFFFF';
}