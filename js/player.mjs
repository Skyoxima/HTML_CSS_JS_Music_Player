// importing function(s) from other sources
import { sliderOnSongEnd } from "./durSliderControl.mjs";
// fetching DOM elements
const css = window.document.styleSheets[0];
const titleDivRef = document.querySelector('.title');
const titleRef = document.querySelector('.title .text');
const prevBtnRef = document.querySelector('.prev');
const playPauseBtnRef = document.querySelector('.playPause');
const nextBtnRef = document.querySelector('.next');
const audioRef = document.querySelector('audio');
const modeBtnRef = document.querySelector('.mode');

let songPlaying = false;
let currSongIndex = 1;
let playModes = ['stop', 'loop-same', 'loop-all'];
let currentModeIndex = 0;
let titleWidth = parseFloat(window.getComputedStyle(titleDivRef).getPropertyValue('width'));
let textWidth = 0; 
// song list - idea for next versions -> use DB or API
const songList = [
  {
    path: "./music/Choices The Bad Cop.mp3",
    songName: "The Bad Cop - Most Wanted - Choices",
  },
  {
    path: "./music/PLA Volo Theme.mp3",
    songName: "Vs. Pokemon Wielder Volo - Pokemon Legends: Arceus",
  },
  {
    path: "./music/PMDX Mt Thunder.mp3",
    songName: "Mt. Thunder - Pokemon Mystery Dungeon Rescue Team DX",
  },
  {
    path: "./music/Infinity.mp3",
    songName: "Infinity",
  },
  {
    path: "./music/Shadow Fight 2 Wasp Theme.wav",
    songName: "Ship Battle - Shadow Fight 2",
  }
];

function isMarqueeable() {
  if(textWidth > titleWidth) {
    titleDivRef.style.overflow = 'hidden';
    titleRef.innerText = titleRef.innerText + "\t\t\t" + titleRef.innerText
    let newtextWidth = parseFloat(window.getComputedStyle(titleRef).getPropertyValue('width'));
    console.log(newtextWidth);
    titleRef.style.animation = 'marquee 10s linear infinite';
    css.insertRule(`@keyframes marquee {
      from {
        transform: translateX(0);
      } to {
      transform: translateX(-${textWidth + (newtextWidth - 2 * textWidth)}px);
    }
  }`);
  } else {
    titleDivRef.style.justifyContent = 'center';
    titleDivRef.style.textAlign = 'center';
    titleRef.style.animation = 'none';
  }
}
// Song Loading mechanism ~ selection of path and name
function loadSong(songListElement) {
  titleRef.textContent = songListElement.songName;
  audioRef.src = songListElement.path;
  textWidth = parseFloat(window.getComputedStyle(titleRef).getPropertyValue('width'));
  isMarqueeable();
  console.log(textWidth, titleWidth)
}
loadSong(songList[currSongIndex]);
//First loading -> future idea, ask for directory/db? to choose from where to load the songs

// Buttons Functionality
export function playSong() {
  songPlaying = true;
  playPauseBtnRef.classList.add('active');
  playPauseBtnRef.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
  audioRef.play();        //! audio.play() is an async function by default
}

export function pauseSong() {
  songPlaying = false;
  playPauseBtnRef.classList.remove('active');
  playPauseBtnRef.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
  audioRef.pause();
  // console.log(audioRef.currentTime)
}

function prevSong() {
  currSongIndex > 0 ? currSongIndex-- : currSongIndex = songList.length - 1;
  loadSong(songList[currSongIndex]);
  playSong();
}

function nextSong() {
  currSongIndex < songList.length - 1 ? currSongIndex++ : currSongIndex = 0;
  loadSong(songList[currSongIndex]);
  playSong();
}

function playModeChange() {
  currentModeIndex < playModes.length - 1 ? currentModeIndex++ : currentModeIndex = 0;
  if(playModes[currentModeIndex] === 'stop') {
    modeBtnRef.innerHTML = '<ion-icon name="repeat-outline"></ion-icon>'; 
    modeBtnRef.classList.remove('innerActive');
  }
  else if(playModes[currentModeIndex] === 'loop-same') {
    modeBtnRef.classList.add('innerActive');
  } else if(playModes[currentModeIndex] === 'loop-all') {
    modeBtnRef.innerHTML = '<ion-icon name="infinite-outline"></ion-icon>'; 
  }
}

function onSongEnd() {
  songPlaying = false;
  playPauseBtnRef.classList.remove('active');
  playPauseBtnRef.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
  
  sliderOnSongEnd(); // to have a singular listener for ended with ensured correct order of execution
  if(playModes[currentModeIndex] !== 'stop') {
    if(playModes[currentModeIndex] === 'loop-same') {
      playSong();
    } else if(playModes[currentModeIndex] === 'loop-all') {
      nextSong();
    }
  }
}


function playerMech() {  
  // Event Listeners
  playPauseBtnRef.addEventListener('click', () => {
    songPlaying ? pauseSong() : playSong();   
    // since we had to perform the condition checking of if the song is playing, callback function was written which'll after checking status call the appropriate function
    // if there were no additional lines of code then the functions would've been directly passed as callbacks (no '()') (can be seen below with prevSong and nextSong)
  });

  audioRef.addEventListener('ended', onSongEnd);
  prevBtnRef.addEventListener('click', prevSong);
  nextBtnRef.addEventListener('click', nextSong);
  modeBtnRef.addEventListener('click', playModeChange);
}

playerMech();
// TODO
//- Replay Modes
//- Dark Mode
// Glow Ring (From a previous project)
// Song Title Marquee
// Understand Event Loop properly (had curiousity about same eventListeners order of execution)

//* ------ From playSong function (resolved) ------
//! to have the duration load first -- this is probably a makeshift solution
//? This is makeshift because it depends on the device strength of the user I think
// setTimeout(() => {
//   audioRef.play();
// }, 50)
// to remove this indefinity I think promise will be needed ---> Nope