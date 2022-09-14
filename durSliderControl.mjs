const sliderRef = document.querySelector('.duration-slider');
const sliderFillRef = document.querySelector('.durSliderFill');
const audioRef = document.querySelector('audio');
const prevBtnRef = document.querySelector('.prev');
const nextBtnRef = document.querySelector('.next');
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
  audioDuration = audioRef.duration;
  sliderRef.max = audioDuration;
  widthIncrement = ((sliderWidth - thumbWidth) / sliderRef.max);  
  
  iniRemMinutes = Math.floor(audioDuration / 60);
  iniRemTotalSeconds = audioDuration;
  remainingTimeRef.textContent = `${iniRemMinutes}:${Math.round(iniRemTotalSeconds % 60) < 10 ? "0": ""}${Math.floor(iniRemTotalSeconds % 60)}`;
}

function manualSliderControl() {
  let currSliderValue = parseFloat(sliderRef.value);
  
  if(currSliderValue !== prevSliderValue) {
    currSliderValue === 0 ? currSliderFillWidth = 0 
                          : currSliderValue === sliderRef.max ? currSliderFillWidth = sliderWidth - thumbWidth
                          : currSliderFillWidth = (prevSliderFillWidth + (widthIncrement * (currSliderValue - prevSliderValue)));  
    // lhs = rhs is an assignment expression and is a valid expression for ? in JS [NOT in C though]
    sliderFillRef.style.width = `${currSliderFillWidth}px`
    
    audioRef.pause();
    audioRef.currentTime = sliderRef.value;
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

export function sliderOnSongEnd() {
  clearInterval(autoIntervalRef);
  hasSongEnded = true;
}

function songChangeReset() {
  clearInterval(autoIntervalRef);
  resetSliderValues();
}

sliderRef.addEventListener('input', manualSliderControl);
sliderRef.addEventListener('mouseup', () => {
  audioRef.play();
})
if(audioRef.readyState > 0) { metaLoadingSong(); } 
else { audioRef.addEventListener('loadedmetadata', metaLoadingSong); }
audioRef.addEventListener('playing', autoSliderControl);
audioRef.addEventListener('pause', () => { clearInterval(autoIntervalRef) });
prevBtnRef.addEventListener('click', songChangeReset);
nextBtnRef.addEventListener('click', songChangeReset);


//TODO:
//- Fix slight bug in remaining time  
//- Manual seek audio Time change (Full compatibility when the audio is already running too)
//- Fix pause-sliderFill reset bug and seek-sliderFill reset bug