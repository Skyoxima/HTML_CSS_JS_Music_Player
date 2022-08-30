function changeVolume(newValue) {
  newValue = parseInt(newValue);
  const audioRef = document.querySelector('audio');
  const spanRef = document.querySelector('.volume .sliderIcon');
  audioRef.volume = parseFloat(newValue / 100);

  if(newValue === 0) {
    spanRef.innerHTML = '<ion-icon name="volume-mute-outline"></ion-icon>';
  } else if(newValue > 0 && newValue <= 25) {
    spanRef.innerHTML = '<ion-icon name="volume-off-outline"></ion-icon>';
  } else if(newValue > 25 && newValue <= 50) {
    spanRef.innerHTML = '<ion-icon name="volume-low-outline"></ion-icon>';
  } else if(newValue > 50 && newValue <= 75) {
    spanRef.innerHTML = '<ion-icon name="volume-medium-outline"></ion-icon>';
  } else if(newValue > 75 && newValue <= 100) {
    spanRef.innerHTML = '<ion-icon name="volume-high-outline"></ion-icon>';
  }
}

function volSliderControl() {
  const sliderRef = document.querySelector('.volume-slider');
  const sliderFillRef = document.querySelector('.volSliderFill');  
  const sliderWidth = parseFloat(window.getComputedStyle(sliderRef).getPropertyValue('width'));

  const thumbWidth = parseInt(window.getComputedStyle(sliderRef).getPropertyValue('--thumb-width'));
  const widthIncrement = (sliderWidth - thumbWidth) / sliderRef.max;
  let prevSliderValue = sliderRef.value; // initial which later acts as previous
  sliderFillRef.style.width = `${parseFloat(window.getComputedStyle(sliderFillRef).getPropertyValue('width')) + (widthIncrement * (prevSliderValue))}px`;
  console.log(prevSliderValue);

  sliderRef.addEventListener('input', function() {
    changeVolume(sliderRef.value)
    console.log(sliderRef.value)
    sliderFillRef.style.width = `${parseFloat(window.getComputedStyle(sliderFillRef).getPropertyValue('width')) + (widthIncrement * (sliderRef.value - prevSliderValue))}px`;
    prevSliderValue = sliderRef.value; 
  })
}

volSliderControl();