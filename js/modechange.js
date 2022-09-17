themeDivRef = document.getElementById('theme-selector');
bodyRef = document.getElementsByTagName("body")[0];

themeDivRef.addEventListener('click', () => {
  themeDivRef.classList.toggle('dark');
  themeDivRef.classList.toggle('light');
  bodyRef.classList.toggle('dark');
});