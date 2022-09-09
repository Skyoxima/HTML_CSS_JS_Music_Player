const sliderRef = document.querySelector('.duration-slider');
const sliderFillRef = document.querySelector('.durSliderFill');
const audioRef = document.querySelector('audio');
const prevBtnRef = document.querySelector('.prev');
const nextBtnRef = document.querySelector('.next');
const playPauseBtnRef = document.querySelector('.playPause');
const elapsedTimeRef = document.querySelector('.elapsedTime');
const remainingTimeRef = document.querySelector('.remainingTime');

let intervalSpan = 100;
let hasEnded = false;
let sliderWidth = parseFloat(window.getComputedStyle(sliderRef).getPropertyValue('width'));
let thumbWidth = parseInt(window.getComputedStyle(sliderRef).getPropertyValue('--thumb-dimension'));
let prevSliderValue = parseFloat(sliderRef.value);
let prevSliderFillWidth = parseFloat(window.getComputedStyle(sliderFillRef).getPropertyValue('width'));
let currSliderFillWidth = 0;
let audioDuration = 0;
let autoIntervalRef = null;

let iniRemMinutes = 0;
let iniRemSeconds = 0;
let iniElaMinutes = 0;
let iniElaSeconds = 0;
let elaMinutes = 0;
let elaSeconds = 0;
elapsedTimeRef.textContent = `${iniElaMinutes}:0${iniElaSeconds}`;

function manualControl() {
  let widthIncrement = (sliderWidth - thumbWidth) / sliderRef.max;
  let currSliderValue = parseFloat(sliderRef.value);
  console.log(currSliderValue);
  if(currSliderValue !== prevSliderValue) {
    currSliderValue === 0 ? currSliderFillWidth = 0 
                          : currSliderValue === sliderRef.max ? currSliderFillWidth = sliderWidth - thumbWidth
                          : currSliderFillWidth = (prevSliderFillWidth + (widthIncrement * (currSliderValue - prevSliderValue)));  
    
                          // lhs = rhs is an assignment expression and is a valid expression for ? in JS [NOT in C though]
    sliderFillRef.style.width = `${currSliderFillWidth}px`
    prevSliderValue = currSliderValue;
    prevSliderFillWidth = currSliderFillWidth;
  }
  // The multiplier approach allows for width reduction as well, as well as tapped events along with drag events!
}

function autoControl() {
  let widthIncrement = ((sliderWidth - thumbWidth) / sliderRef.max) * (intervalSpan / 1000);
  
  //only let this happen when song had ended once
  if(hasEnded === true) {
    remainingTimeRef.textContent = `${iniRemMinutes}:${iniRemSeconds}`;
    hasEnded = false;
  }

  autoIntervalRef = setInterval(() => {
    sliderRef.value = audioRef.currentTime;
    console.log(sliderRef.value);
    elaMinutes = Math.floor(parseFloat(sliderRef.value) / 60);
    elaSeconds = Math.round(parseFloat(sliderRef.value) % 60);
    elapsedTimeRef.textContent = `${elaMinutes}:${elaSeconds < 10 ? "0" : ""}${elaSeconds}`;
    remainingTimeRef.textContent = `${iniRemMinutes - elaMinutes}:${elaSeconds > (iniRemSeconds - 10) ? "0" : ""}${iniRemSeconds - elaSeconds}`

    prevSliderValue = sliderRef.value;  // this is done to keep the manual control in check
    currSliderFillWidth = prevSliderFillWidth + widthIncrement;
    sliderFillRef.style.width = `${currSliderFillWidth}px`;
    prevSliderFillWidth = currSliderFillWidth;
  }, intervalSpan);
}

audioRef.addEventListener('ended', () => {
  hasEnded = true;
  console.log('Ended Fired')
  clearInterval(autoIntervalRef);
  sliderRef.value = audioDuration;
  sliderFillRef.style.width = `${sliderWidth - thumbWidth}px`
});

audioRef.addEventListener('pause', () => { clearInterval(autoIntervalRef) });

// on a change song action, delete the previous interval and reset the width of the durSliderFill and value of the durSlider
function songChangeReset() {
  clearInterval(autoIntervalRef);
  sliderRef.value = 0; sliderFillRef.style.width = '0px';
  prevSliderFillWidth = 0;
}

sliderRef.addEventListener('input', manualControl);
audioRef.addEventListener('loadedmetadata', () => {
  console.log('LMD');
  audioDuration = audioRef.duration;
  sliderRef.max = audioDuration;
  iniRemMinutes = Math.floor(audioDuration / 60);
  iniRemSeconds = Math.round(audioDuration % 60);
  remainingTimeRef.textContent = `${iniRemMinutes}:${iniRemSeconds}`;
});
audioRef.addEventListener('playing', autoControl);

prevBtnRef.addEventListener('click', songChangeReset);
nextBtnRef.addEventListener('click', songChangeReset);


//TODO:
// Elapsed Time and Remaining Time (Formatting <10 secs)
// Manual seek audio Time change (Full compatibility when the audio is already running too)
// New button -> Play type (repeat, cycle, etc)