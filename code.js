const konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

let konamiCodePosition = 0;

const konamiCodeHandler = (event) => {
  if (event.code === konamiCode[konamiCodePosition]) {
    konamiCodePosition++;
    if (konamiCodePosition === konamiCode.length) {
      alert('Konami Code Entered!');
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
};

document.addEventListener('keydown', (event) => {
  konamiCodeHandler(event);
});