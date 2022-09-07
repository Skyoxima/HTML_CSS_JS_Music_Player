const sliderRef = document.querySelector('.duration-slider');
const sliderFillRef = document.querySelector('.durSliderFill');
const audioRef = document.querySelector('audio');
const prevBtnRef = document.querySelector('.prev');
const nextBtnRef = document.querySelector('.next');

let sliderWidth = parseFloat(window.getComputedStyle(sliderRef).getPropertyValue('width'));
let thumbWidth = parseInt(window.getComputedStyle(sliderRef).getPropertyValue('--thumb-dimension'));
let prevSliderValue = parseFloat(sliderRef.value);
let prevSliderFillWidth = parseFloat(window.getComputedStyle(sliderFillRef).getPropertyValue('width'));
let currSliderFillWidth = 0;
let audioDuration = 0;
let intervalRef = null;

function manualControl() {
  let widthIncrement = (sliderWidth - thumbWidth) / sliderRef.max;
  let currSliderValue = parseFloat(sliderRef.value);
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
  sliderRef.max = audioDuration;
  console.log(`\x1b[32m${sliderRef.max}\x1b[0m`);
  let widthIncrement = (sliderWidth - thumbWidth) / sliderRef.max;
  
  intervalRef = setInterval(() => {
    sliderRef.value = audioRef.currentTime;
    prevSliderValue = sliderRef.value;  // this is done to keep the manual control in check
    currSliderFillWidth = prevSliderFillWidth + widthIncrement;
    sliderFillRef.style.width = `${currSliderFillWidth}px`;
    prevSliderFillWidth = currSliderFillWidth;

    audioRef.onended = () => { clearInterval(intervalRef) }
    audioRef.onpause = () => { clearInterval(intervalRef) }
  }, 1000);
} 

// on a change song action, delete the previous interval and reset the width of the durSliderFill and value of the durSlider
function songChangeReset() {
  clearInterval(intervalRef);
  sliderRef.value = 0; sliderFillRef.style.width = '0px';
  prevSliderFillWidth = 0;
}

sliderRef.addEventListener('input', manualControl);
audioRef.addEventListener('loadedmetadata', () => {
  audioDuration = audioRef.duration;
});
audioRef.addEventListener('playing', autoControl);

prevBtnRef.addEventListener('click', songChangeReset);
nextBtnRef.addEventListener('click', songChangeReset);