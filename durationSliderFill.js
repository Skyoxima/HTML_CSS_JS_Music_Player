const slider = document.querySelector('.duration-range');
const sliderWidth = window.getComputedStyle(slider).getPropertyValue('width').slice(0, -2);
const filled = document.querySelector('.filled');

slider.oninput = () => {
  let currVal = ((parseInt(sliderWidth)) * (slider.value / slider.max));
  filled.style.width = `${currVal}px`;
}