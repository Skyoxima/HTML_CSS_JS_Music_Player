const sliderRef = document.querySelector('.duration-slider');
const sliderFillRef = document.querySelector('.durSliderFill');
const audioRef = document.querySelector('audio');
const prevBtnRef = document.querySelector('.prev');
const nextBtnRef = document.querySelector('.next');
const playPauseBtnRef = document.querySelector('.playPause');
const elapsedTimeRef = document.querySelector('.elapsedTime');
const remainingTimeRef = document.querySelector('.remainingTime');

let sliderWidth = parseFloat(window.getComputedStyle(sliderRef).getPropertyValue('width'));
let thumbWidth = parseInt(window.getComputedStyle(sliderRef).getPropertyValue('--thumb-dimension'));
let prevSliderValue = parseFloat(sliderRef.value);
let prevSliderFillWidth = parseFloat(window.getComputedStyle(sliderFillRef).getPropertyValue('width'));
let currSliderFillWidth = 0;
let audioDuration = 0;
let autoDurationIntervalRef = null;
let durMinutes = 0;
let durSeconds = 0;

elapsedTimeRef.textContent = '0:00';
function manualControl() {
  let widthIncrement = (sliderWidth - thumbWidth) / sliderRef.max;
  let currSliderValue = parseFloat(sliderRef.value);
  // console.log(currSliderValue);
  if(currSliderValue !== prevSliderValue) {
    // volume slider control has if-else so thought of using '?' nest here for practice
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
  console.log(`\x1b[32m${sliderRef.max}\x1b[0m`);
  let widthIncrement = (sliderWidth - thumbWidth) / sliderRef.max;
  autoDurationIntervalRef = setInterval(() => {
    sliderRef.value = audioRef.currentTime;
    console.log(sliderRef.value);
    handleRemainingTimeText();
    prevSliderValue = sliderRef.value;  // this is done to keep the manual control in check
    currSliderFillWidth = prevSliderFillWidth + widthIncrement;
    sliderFillRef.style.width = `${currSliderFillWidth}px`;
    prevSliderFillWidth = currSliderFillWidth;

    
  }, 1000);
} 
audioRef.addEventListener('ended', () => {
  clearInterval(autoDurationIntervalRef);
})
audioRef.addEventListener('pause', () => { clearInterval(autoDurationIntervalRef) });

function handleRemainingTimeText() {
  if(durSeconds > 0) {
    durSeconds--;
  } else {
    if(durMinutes > 0) {
      durMinutes--;
      durSeconds += 59;
    } else {
      durMinutes = 0; durSeconds = 0;
    }
  }
  remainingTimeRef.textContent = `${durMinutes}:${durSeconds}`;
}

// on a change song action, delete the previous interval and reset the width of the durSliderFill and value of the durSlider
function songChangeReset() {
  clearInterval(autoDurationIntervalRef);
  sliderRef.value = 0; sliderFillRef.style.width = '0px';
  prevSliderFillWidth = 0;
}

sliderRef.addEventListener('input', manualControl);
audioRef.addEventListener('loadedmetadata', () => {
  console.log('LMD');
  audioDuration = audioRef.duration;
  sliderRef.max = audioDuration;
  durMinutes = Math.floor(audioDuration / 60);
  durSeconds = audioDuration % 60;
  remainingTimeRef.textContent = `${durMinutes}:${durSeconds}`;
});
audioRef.addEventListener('playing', autoControl);

prevBtnRef.addEventListener('click', songChangeReset);
nextBtnRef.addEventListener('click', songChangeReset);


//TODO:
// Elapsed Time and Remaining Time (Formatting <10 secs)
// Manual seek audio Time change (Full compatibility when the audio is already running too)
// New button -> Play type (repeat, cycle, etc)