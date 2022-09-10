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
let iniRemTotalSeconds = 0;
elapsedTimeRef.textContent = '0:00';

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
    remainingTimeRef.textContent = `${iniRemMinutes}:${iniRemTotalSeconds}`;
    hasEnded = false;
  }

  autoIntervalRef = setInterval(() => {
    sliderRef.value = audioRef.currentTime;
    console.log(sliderRef.value);
    
    handleDurationTexts(); 
  
    prevSliderValue = sliderRef.value;  // this is done to keep the manual control in check
    currSliderFillWidth = prevSliderFillWidth + widthIncrement;
    sliderFillRef.style.width = `${currSliderFillWidth}px`;
    prevSliderFillWidth = currSliderFillWidth;
  }, intervalSpan);
}

function handleDurationTexts() {
  //* elapsedText
  let elaMinutes = Math.floor(parseFloat(sliderRef.value) / 60);
  let elaTotalSeconds = Math.floor(parseFloat(sliderRef.value));
  let elaSeconds = Math.floor(parseFloat(sliderRef.value)) % 60;
  elapsedTimeRef.textContent = `${elaMinutes}:${elaSeconds < 10 ? "0" : ""}${elaSeconds}`;
  
  //* RemainingText
  let remMinutes = Math.floor((iniRemTotalSeconds - elaTotalSeconds) / 60);
  let remSeconds = Math.floor((iniRemTotalSeconds - elaTotalSeconds) % 60);
  remainingTimeRef.textContent = `${remMinutes}:${(iniRemTotalSeconds - elaTotalSeconds) % 60 < 10 ? "0":""}${remSeconds}`;
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
  iniRemTotalSeconds = Math.round(audioDuration);
  remainingTimeRef.textContent = `${iniRemMinutes}:${Math.round(iniRemTotalSeconds % 60) < 10 ? "0": ""}${Math.round(iniRemTotalSeconds % 60)}`;
});
audioRef.addEventListener('playing', autoControl);

prevBtnRef.addEventListener('click', songChangeReset);
nextBtnRef.addEventListener('click', songChangeReset);


//TODO:
//Fix slight bug in remaining time  
//Fix pause-sliderFill reset bug
// Manual seek audio Time change (Full compatibility when the audio is already running too)
// New button -> Play type (repeat, cycle, etc)