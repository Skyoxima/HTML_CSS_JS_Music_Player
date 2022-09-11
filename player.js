function playerMech() {
  //+ fetching DOM elements
  const titleRef = document.querySelector('.title');
  const prevBtnRef = document.querySelector('.prev');
  const playPauseBtnRef = document.querySelector('.playPause');
  const nextBtnRef = document.querySelector('.next');
  const audioRef = document.querySelector('audio');
  
  let songPlaying = false;
  let currSongIndex = 0;
  
  //+ song list - idea for next versions -> use DB or API
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
      path: "Infinity.mp3",
      songName: "Infinity",
    },
    {
      path: "Shadow Fight 2 Wasp Theme.wav",
      songName: "Ship Battle - Shadow Fight 2",
    }
  ];
  
  //+ Song Loading mechanism ~ selection of path and name
  function loadSong(songListElement) {
    titleRef.textContent = songListElement.songName;
    audioRef.src = songListElement.path;
    // All loading (on change song as well) should happen and finish here itself
  }
  loadSong(songList[currSongIndex]);  //First loading -> future idea, ask for directory/db? to choose from where to load the songs
  // also song is loaded outside rather than inside playSong is to preemptively show a title. Can be changed in further versions
  
  //+ Buttons Functionality
  function playSong() {
    songPlaying = true;
    playPauseBtnRef.classList.add('active');
    playPauseBtnRef.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
    audioRef.play();        //! audio.play() is an async function by default
  }

  function pauseSong() {
    songPlaying = false;
    playPauseBtnRef.classList.remove('active');
    playPauseBtnRef.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
    audioRef.pause();
    // console.log(audioRef.currentTime)
  }
  
  playPauseBtnRef.addEventListener('click', () => {
    if(songPlaying) {
      pauseSong();
    } else {
      playSong();
    }
    // since we had to perform the condition checking of if the song is playing, callback function was written which'll after checking status call the appropriate function
    // if there were no additional lines of code then the functions would've been directly passed as callbacks (no '()') (can be seen below with prevSong and nextSong)
  });

  audioRef.addEventListener('ended', () => {
    songPlaying = false;
    playPauseBtnRef.classList.remove('active');
    playPauseBtnRef.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
  });
  
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



//* ------ From playSong function (resolved) ------
//! to have the duration load first -- this is probably a makeshift solution
//? This is makeshift because it depends on the device strength of the user I think
// setTimeout(() => {
//   audioRef.play();
// }, 50)
// to remove this indefinity I think promise will be needed