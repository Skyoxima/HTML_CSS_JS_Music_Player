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
  const volumeRef = document.querySelector('.volume');
  const sliderRef = document.querySelector('.volume-slider');
  const sliderFillRef = document.querySelector('.volSliderFill');  
  const sliderIconRef = document.querySelector('.volume .sliderIcon')

  const sliderWidth = parseFloat(window.getComputedStyle(sliderRef).getPropertyValue('width'));
  const thumbWidth = parseInt(window.getComputedStyle(sliderRef).getPropertyValue('--thumb-dimension'));
  const widthIncrement = (sliderWidth - thumbWidth) / 100;
  let prevSliderValue = sliderRef.value; // initial which later acts as previous
  sliderFillRef.style.width = `${parseFloat(window.getComputedStyle(sliderFillRef).getPropertyValue('width')) + (widthIncrement * (prevSliderValue))}px`;
  let prevSliderFillWidth =  parseFloat(window.getComputedStyle(sliderFillRef).getPropertyValue('width'));

  sliderRef.addEventListener('input', function() {
    sliderFillRef.style.width = `${prevSliderFillWidth + (widthIncrement * (sliderRef.value - prevSliderValue))}px`;
    prevSliderFillWidth = parseFloat(sliderFillRef.style.width);
    // console.log(prevSliderFillWidth);
    changeVolume(sliderRef.value);
    prevSliderValue = sliderRef.value; 
  })

  sliderIconRef.addEventListener('click', () => {
    sliderIconRef.classList.add('active');
    volumeRef.style.setProperty('--after-width', '0%');

    volumeRef.addEventListener('mouseleave', () => {
      setTimeout(() => {
        sliderIconRef.classList.remove('active');
        volumeRef.style.setProperty('--after-width', '100%');
      }, 5000);
    }) // remember the difference between mouseout and mouseleave
  });
}

volSliderControl();