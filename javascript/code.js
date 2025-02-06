const konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

let konamiCodePosition = 0;

const gameOptions = {
  Wordle: 'wordle'
}

const gameStrings = Object.values(gameOptions);

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

window.addEventListener('load', () => {
  const imageContainer = document.querySelector('#imageContainer');
  // Set src
  imageContainer.src = './assets/ask.gif';
});

const clickStart = async (startBtn) => {
  // Randomly select game
  const game = gameStrings[Math.floor(Math.random() * gameStrings.length)];
  // Make button fade out
  await fadeOutButton(startBtn);
  Wordle.init(document, () => {
    document.querySelector('#loveSpan').style.display = 'block';
    document.querySelector('#imageContainer').src = './assets/accept.gif';
    document.querySelector('#imageContainer').scrollIntoView({
      behavior: 'smooth'
    });
    setTimeout(() => {
      document.querySelector('#imageContainer').src = './assets/accept.gif';
    }, 5000);
  });
}

const fadeOutButton = (button) => {
  button.style.opacity = 0;
  return new Promise((resolve) => {
    setTimeout(() => {
      button.style.display = 'none';
      resolve(true);
    }, 500);
  });
}

const showConfetti = () => {
  const defaults = {
    spread: 660,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 40,
    shapes: ["heart"],
    colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
  };
  
  confetti({
    ...defaults,
    particleCount: 80,
    scalar: 2,
  });
  
  confetti({
    ...defaults,
    particleCount: 55,
    scalar: 3,
  });
  
  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 4,
  });
}