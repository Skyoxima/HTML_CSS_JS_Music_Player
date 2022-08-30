let slider = document.querySelector('.duration-slider');
let sliderFill = document.querySelector('.durSliderFill');

let sliderWidth = parseFloat(window.getComputedStyle(slider).getPropertyValue('width'))
let thumbWidth = 25;
let widthIncrement = (sliderWidth - thumbWidth) / slider.max;
let prevSliderValue = slider.value;

slider.addEventListener('input', function() {
  console.log(slider.value)
  sliderFill.style.width = `${parseFloat(window.getComputedStyle(sliderFill).getPropertyValue('width')) + (widthIncrement * (slider.value - prevSliderValue))}px`;
  prevSliderValue = slider.value;
  // The multiplier approach allows for width reduction as well, as well as tapped events along with drag events!
})