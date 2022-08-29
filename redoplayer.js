function FullPlayerControl() {
  const title = document.querySelector('.title');
  const audio = document.querySelector('audio');

  const prev = document.querySelector('.prev');
  const playPause = document.querySelector('.playPause');
  const next = document.querySelector('.next');
  
  const durSlider = document.querySelector('.duration-slider');
  const durSliderFill = document.querySelector('.sliderFill');
  const thumbWidth = parseInt(window.getComputedStyle(durSlider).getPropertyValue('--thumb-width'));

  let currSongIndex = 3;
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

  function loadSong(ithSong) {
    title.textContent = ithSong.songName;
    audio.src = ithSong.path;
    
    audio.addEventListener('loadedmetadata', () => {
      console.log(audio.duration)
    }) 
    
  } loadSong(songList[currSongIndex]);


} FullPlayerControl();