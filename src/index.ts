import Game from './game';

const version = document.getElementById('version');
if (version) version.textContent = `v${__APP_VERSION__}`;

const game = new Game();
game.play();
