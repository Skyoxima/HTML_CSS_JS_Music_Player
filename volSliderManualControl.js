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

  const sliderWidth = parseInt(window.getComputedStyle(sliderRef).getPropertyValue('width'));
  const thumbWidth = parseInt(window.getComputedStyle(sliderRef).getPropertyValue('--thumb-dimension'));
  const widthIncrement = (sliderWidth - thumbWidth) / 100;
  let prevSliderValue = parseFloat(sliderRef.value); // initial which later acts as previous
  sliderFillRef.style.width = `${parseFloat(window.getComputedStyle(sliderFillRef).getPropertyValue('width')) + (widthIncrement * (prevSliderValue))}px`;  // to get it to correspond 80% volume value initially
  let prevSliderFillWidth =  parseFloat(window.getComputedStyle(sliderFillRef).getPropertyValue('width'));

  sliderRef.addEventListener('input', function() {
    let currSliderValue = parseFloat(sliderRef.value);  // not relying on implicit type conversion
    if(prevSliderValue !== currSliderValue) { // this condition was added to only trigger width change on value change as same values were most likely causing the bug
      if(currSliderValue === 100) {
        sliderFillRef.style.width = `${sliderWidth - thumbWidth}px`;
      } else if(currSliderValue === 0) {
        sliderFillRef.style.width = '0px';
      } else {
        sliderFillRef.style.width = `${prevSliderFillWidth + (widthIncrement * (currSliderValue - prevSliderValue))}px`;
      }
      prevSliderFillWidth = parseFloat(sliderFillRef.style.width);
      // console.log(prevSliderFillWidth);
      prevSliderValue = currSliderValue; 
      changeVolume(sliderRef.value);
    } // all these extra if checks are for eliminating that rapid-slide bug
  })

  sliderIconRef.addEventListener('click', () => {
    sliderIconRef.classList.add('active');
    volumeRef.style.setProperty('--after-width', '0%');

    volumeRef.addEventListener('mouseleave', () => {
      let hideSliderTimeout = setTimeout(() => {
        sliderIconRef.classList.remove('active');
        volumeRef.style.setProperty('--after-width', '100%');
      }, 2500);
      
      // to pause the timeout when re-entering the slider
      volumeRef.addEventListener('mouseenter', () => {
        clearTimeout(hideSliderTimeout);
      });
    }) // remember the difference between mouseout and mouseleave
  });
}

volSliderControl();