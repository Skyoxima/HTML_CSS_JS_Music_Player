let slider = document.querySelector('.duration-slider');
let filled = document.querySelector('.filled');
let prevValue = document.querySelector('.duration-slider').value;
let filledWidth = parseInt(document.querySelector('.filled').style.width.slice(0, -2));

let durationSliderMaxWidth = parseInt(window.getComputedStyle(slider).getPropertyValue('width').slice(0, -2));
let widthIncrement = (durationSliderMaxWidth - 14.5 - 14.5) / slider.max;

slider.addEventListener('change', function() {
  if(this.value > prevValue) {
    //increase
    for(let i = prevValue; i < this.value; i++) {
      filled.style.width = `${filledWidth + widthIncrement}px`;
      filledWidth = parseInt(filled.style.width.slice(0, -2));
      prevValue = this.value;
    }
  } else if(this.value < prevValue) {
    //decrease
  }
}); 


//!NOT WORKING!!!!!!!!