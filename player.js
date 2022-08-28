function playerMech() {
  // fetching DOM elements
  const title = document.querySelector('.title');
  const prev = document.querySelector('.prev');
  const playPause = document.querySelector('.playPause');
  const next = document.querySelector('.next');
  const audio = document.querySelector('audio');
  const durSlider = document.querySelector('.duration-slider');
  const durSliderFill = document.querySelector('.sliderFill');

  let songPlaying = false;
  let currSongIndex = 0;
  
  //song list - idea for next versions -> use DB or API
  const songList = [
    {
      path: "Choices The Bad Cop.mp3",
      songName: "The Bad Cop - Choices",
    },
    {
      path: "PLA Volo Theme.mp3",
      songName: "Vs. Pokemon Wielder Volo",
    },
    {
      path: "PMDX Mt Thunder.mp3",
      songName: "Mount Thunder - Pokemon Mystery Dungeon DX",
    },
    {
      path: "Shadow Fight 2 Wasp Theme.wav",
      songName: "Ship Battle - Shadow Fight 2",
    }
  ];
  
  // Song Loading mechanism ~ selection of path and name
  function loadSong(songListElement) {
    title.textContent = songListElement.songName;
    audio.src = songListElement.path;
  }
  loadSong(songList[currSongIndex]);  //First loading -> future idea, ask for directory/db? to choose from where to load the songs
  // also song is loaded outside rather than inside playSong is to preemptively show a title. Can be changed in further versions
  
  // Buttons Functionality
  function playSong() {
    songPlaying = true;
    audio.play();
    playPause.classList.add('active');
    playPause.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
    
    function durationSliderAuto() {
      let sliderWidth = parseFloat(window.getComputedStyle(durSlider).getPropertyValue('width'));
      let intervalSpan = 1000;
      durSlider.max = audio.duration
      let widthIncrement = ((sliderWidth - 25) / durSlider.max) * (intervalSpan / 1000);
      
      let durationIntv = setInterval(() => {
        durSlider.value = audio.currentTime;
        console.log(durSlider.value);
        durSliderFill.style.width = `${parseFloat(window.getComputedStyle(durSliderFill).getPropertyValue('width')) + widthIncrement}px`;
        
        if(audio.ended === true) {
          clearInterval(durationIntv);
        }
      }, intervalSpan);
    }
    durationSliderAuto();
  }
  
  function pauseSong() {
    songPlaying = false;
    audio.pause();
    playPause.classList.remove('active');
    playPause.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
  }
  playPause.addEventListener('click', () => {
    songPlaying ? pauseSong(): playSong(); 
    // since we had to perform the condition checking of if the song is playing, callback function was written which'll after checking status call the appropriate function
    // if there were no additional lines of code then the functions would've been directly passed as callbacks (no '()') (can be seen below with prevSong and nextSong)
  })

  
  // Handling song end -> future idea, add repeat, shuffle buttons which will affect the behaviour after a song ends
  audio.onended = () => {
    pauseSong();
  }

  function prevSong() {
    currSongIndex > 0 ? currSongIndex-- : currSongIndex = songList.length - 1;
    loadSong(songList[currSongIndex]);
    playSong();
  }
  prev.addEventListener('click', prevSong);
  
  function nextSong() {
    currSongIndex < songList.length - 1 ? currSongIndex++ : currSongIndex = 0;
    loadSong(songList[currSongIndex]);
    playSong();
  }
  next.addEventListener('click', nextSong);
} 
playerMech();