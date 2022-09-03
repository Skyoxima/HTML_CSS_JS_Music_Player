let sliderRef = document.querySelector('.duration-slider');
let sliderFillRef = document.querySelector('.durSliderFill');

let sliderWidth = parseFloat(window.getComputedStyle(sliderRef).getPropertyValue('width'));
let thumbWidth = parseInt(window.getComputedStyle(sliderRef).getPropertyValue('--thumb-dimension'));
let widthIncrement = (sliderWidth - thumbWidth) / sliderRef.max;
let prevSliderValue = parseFloat(sliderRef.value);
let prevSliderFillWidth = parseFloat(window.getComputedStyle(sliderFillRef).getPropertyValue('width'));
let currSliderFillWidth = 0;

sliderRef.addEventListener('input', function() {
  let currSliderValue = parseFloat(sliderRef.value);
  if(currSliderValue !== prevSliderValue) {
    // volume slider control has if-else so thought of using '?' nest here for practice
    currSliderValue === 0 ? currSliderFillWidth = 0 
                          : currSliderValue === sliderRef.max ? currSliderFillWidth = sliderWidth - thumbWidth
                                                              : currSliderFillWidth = (prevSliderFillWidth + (widthIncrement * (currSliderValue - prevSliderValue)));  
    
    sliderFillRef.style.width = `${currSliderFillWidth}px`
    prevSliderValue = currSliderValue;
    prevSliderFillWidth = currSliderFillWidth;
  }
  // The multiplier approach allows for width reduction as well, as well as tapped events along with drag events!
})