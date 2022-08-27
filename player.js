function playerMech() {
  // fetching DOM elements
  const title = document.querySelector('.title');
  const prev = document.querySelector('.prev');
  const playPause = document.querySelector('.playPause');
  const next = document.querySelector('.next');
  const audio = document.querySelector('audio');
  const durSlider = document.querySelector('.duration-range');
  const durSliderFill = document.querySelector('.filled');

  let songPlaying = false;
  let currSongIndex = 3;
  
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
  
  // Buttons Functionality
  function playSong() {
    songPlaying = true;
    audio.play();
    playPause.classList.add('active');
    playPause.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
  }
  
  function pauseSong() {
    songPlaying = false;
    audio.pause();
    playPause.classList.remove('active');
    playPause.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
  }
  playPause.addEventListener('click', () => {
    songPlaying ? pauseSong(): playSong(); 
    // since we had to do the condition checking, callback function was written which'll after checking status call the appropriate function
    // if there was no additional lines of code then the functions would've been directly passed as callbacks (no '()')
  })
  
  // Handling normal song end
  audio.onended = () => {
    playPause.classList.remove('active')
    playPause.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
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
  
  // Song Loading mechanism
  function loadSong(songList) {
    title.textContent = songList.songName;
    audio.src = songList.path;
  }

  // Initial Loading
  loadSong(songList[currSongIndex]);
} 
playerMech();