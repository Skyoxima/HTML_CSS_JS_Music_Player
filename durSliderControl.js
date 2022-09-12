const sliderRef = document.querySelector('.duration-slider');
const sliderFillRef = document.querySelector('.durSliderFill');
const audioRef = document.querySelector('audio');
const prevBtnRef = document.querySelector('.prev');
const nextBtnRef = document.querySelector('.next');
const playPauseBtnRef = document.querySelector('.playPause');
const elapsedTimeRef = document.querySelector('.elapsedTime');
const remainingTimeRef = document.querySelector('.remainingTime');

let intervalSpan = 100;
let hasSongEnded = false;
let audioDuration = 0;
let autoIntervalRef = null;

let sliderWidth = parseFloat(window.getComputedStyle(sliderRef).getPropertyValue('width'));
let thumbWidth = parseInt(window.getComputedStyle(sliderRef).getPropertyValue('--thumb-dimension'));
let widthIncrement = 0;
let prevSliderValue = 0;
let prevSliderFillWidth = 0;
let currSliderFillWidth = 0;

let iniRemMinutes = 0;
let iniRemTotalSeconds = 0;
elapsedTimeRef.textContent = '0:00';

function metaLoadingSong() {
  console.log('LMD');
  audioDuration = audioRef.duration;
  sliderRef.max = audioDuration;
  widthIncrement = ((sliderWidth - thumbWidth) / sliderRef.max);  
  console.log(widthIncrement);
  iniRemMinutes = Math.floor(audioDuration / 60);
  iniRemTotalSeconds = audioDuration;
  remainingTimeRef.textContent = `${iniRemMinutes}:${Math.round(iniRemTotalSeconds % 60) < 10 ? "0": ""}${Math.round(iniRemTotalSeconds % 60)}`;
}

function manualSliderControl() {
  let currSliderValue = parseFloat(sliderRef.value);
  
  if(currSliderValue !== prevSliderValue) {
    currSliderValue === 0 ? currSliderFillWidth = 0 
                          : currSliderValue === sliderRef.max ? currSliderFillWidth = sliderWidth - thumbWidth
                          : currSliderFillWidth = (prevSliderFillWidth + (widthIncrement * (currSliderValue - prevSliderValue)));  
    // lhs = rhs is an assignment expression and is a valid expression for ? in JS [NOT in C though]
    
    sliderFillRef.style.width = `${currSliderFillWidth}px`
    audioRef.currentTime = sliderRef.value;
    clearInterval(autoIntervalRef);
    handleDurationTexts();
    prevSliderValue = currSliderValue;
    prevSliderFillWidth = currSliderFillWidth;
  }
  // The multiplier approach allows for width reduction as well, as well as tapped events along with drag events!
}

function autoSliderControl() {
  if(hasSongEnded === true) {
    resetSliderValues();
    hasSongEnded = false;
  }

  autoIntervalRef = setInterval(() => {
    sliderRef.value = audioRef.currentTime;
    handleDurationTexts(); 
    prevSliderValue = sliderRef.value;               // this is done to keep the manual control in check
    currSliderFillWidth = prevSliderFillWidth + ((widthIncrement) * (intervalSpan/1000));
    sliderFillRef.style.width = `${currSliderFillWidth}px`;
    prevSliderFillWidth = currSliderFillWidth;
  }, intervalSpan);
}
// Since the interval is 1/10th of a second, widthIncrement has to be lowered in proportion to it

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

function resetSliderValues() {
  sliderRef.value = 0; sliderFillRef.style.width = '0px';
  prevSliderFillWidth = 0;
}

// function sliderResetManual() {
//   // This is written to reset the slider on MANUAL replay of the same song
//   if(hasSongEnded === true) {
//     resetSliderValues()
//   }
// }

function sliderMaxedOnEnd() {
  // This function ensures no minor visual error on the slider when the song has Ended
  clearInterval(autoIntervalRef);
  sliderRef.value = audioDuration;
  sliderFillRef.style.width = `${sliderWidth - thumbWidth}px`;

  hasSongEnded = true;
}

function songChangeReset() {
  clearInterval(autoIntervalRef);
  resetSliderValues();
}

sliderRef.addEventListener('input', manualSliderControl);
audioRef.addEventListener('loadedmetadata', metaLoadingSong);
audioRef.addEventListener('playing', autoSliderControl);
audioRef.addEventListener('pause', () => { clearInterval(autoIntervalRef) });
audioRef.addEventListener('ended', sliderMaxedOnEnd);
prevBtnRef.addEventListener('click', songChangeReset);
nextBtnRef.addEventListener('click', songChangeReset);


//TODO:
//- Fix slight bug in remaining time  
//- Manual seek audio Time change (Full compatibility when the audio is already running too)
//- Fix pause-sliderFill reset bug and seek-sliderFill reset bug