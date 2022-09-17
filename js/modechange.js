themeDivRef = document.getElementById('theme-selector');
bodyRef = document.getElementsByTagName("body")[0];
currMode = bodyRef.classList[0] || 'light'
console.log(currMode)
themeDivRef.classList.add(currMode);

themeDivRef.addEventListener('click', () => {
  themeDivRef.classList.toggle('dark');
  themeDivRef.classList.toggle('light');
  bodyRef.classList.toggle('dark');
});