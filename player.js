function playerMech() {
  // fetching DOM elements
  const titleRef = document.querySelector('.title');
  const prevBtnRef = document.querySelector('.prev');
  const playPauseBtnRef = document.querySelector('.playPause');
  const nextBtnRef = document.querySelector('.next');
  const audioRef = document.querySelector('audio');
  // const durSliderRef = document.querySelector('.duration-slider');
  // const durSliderFillRef = document.querySelector('.durSliderFill');
  
  let songPlaying = false;
  let currSongIndex = 3;
  // let sliderWidth = parseFloat(window.getComputedStyle(durSliderRef).getPropertyValue('width'));
  // let thumbWidth = parseInt(window.getComputedStyle(durSliderRef).getPropertyValue('--thumb-dimension'));
  
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
    titleRef.textContent = songListElement.songName;
    audioRef.src = songListElement.path;
  }
  loadSong(songList[currSongIndex]);  //First loading -> future idea, ask for directory/db? to choose from where to load the songs
  // also song is loaded outside rather than inside playSong is to preemptively show a title. Can be changed in further versions
  
  // Buttons Functionality
  function playSong() {
    songPlaying = true;
    audioRef.play();
    playPauseBtnRef.classList.add('active');
    playPauseBtnRef.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
  }

  function pauseSong() {
    songPlaying = false;
    audioRef.pause();
    playPauseBtnRef.classList.remove('active');
    playPauseBtnRef.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
  }
  
  playPauseBtnRef.addEventListener('click', () => {
    if(songPlaying) {
      pauseSong();
    } else {
      playSong();
      // durSliderRef.max = audioRef.duration;
      // let widthIncrement = (sliderWidth - thumbWidth) / durSliderRef.max;
      // let autoSlide = setInterval(() => {
      //   console.log('In-terval');
      //   durSliderRef.value = audioRef.currentTime;
      //   currSliderFillWidth = prevSliderFillWidth + (widthIncrement)
      // }, 1000);
    }
    // since we had to perform the condition checking of if the song is playing, callback function was written which'll after checking status call the appropriate function
    // if there were no additional lines of code then the functions would've been directly passed as callbacks (no '()') (can be seen below with prevSong and nextSong)
  });
  
  // Handling song end -> future idea, add repeat, shuffle buttons which will affect the behaviour after a song ends
  audioRef.onended = () => {
    pauseSong();
  }

  function prevSong() {
    currSongIndex > 0 ? currSongIndex-- : currSongIndex = songList.length - 1;
    loadSong(songList[currSongIndex]);
    playSong();
  }
  prevBtnRef.addEventListener('click', prevSong);
  
  function nextSong() {
    currSongIndex < songList.length - 1 ? currSongIndex++ : currSongIndex = 0;
    loadSong(songList[currSongIndex]);
    playSong();
  }
  nextBtnRef.addEventListener('click', nextSong);
}


playerMech();