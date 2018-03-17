const keypress = require('keypress');
const axios = require('axios');
const WebSocket = require('ws');

const baseURL = process.argv[2] || 'http://localhost:3000';

let ws;
let state;

keypress(process.stdin);

function startTimer() {
	axios.post(`${baseURL}/timer/start`)
		.then((res) => {
			if (res.status !== 204) {
				console.error('couldn\'t start timer');
			}
		})
		.catch(e => console.error(e.response.status));
}

function stopPlayer(player) {
	axios.post(`${baseURL}/timer/player/finish/${player}`)
		.then((res) => {
			if (res.status !== 204) {
				console.error(`couldn't stop player ${player}`);
			}
		})
		.catch(e => console.error(e.response.status));
}

process.stdin.on('keypress', (ch, key) => {
	console.log(state);
	if (key.name === 'g') {
		if (state === 2) {
			startTimer();
		} else if (state === 0) {
			stopPlayer(0);
		} else {
			console.log('Buttons can\'t handle this state.');
		}
	} else if (key.name === 'b') {
		if (state === 2) {
			startTimer();
		} else if (state === 0) {
			stopPlayer(1);
		} else {
			console.log('Buttons can\'t handle this state.');
		}
	}
	if (key && key.ctrl && key.name === 'c') {
		console.log('exiting...');
		process.exit(0);
	}
});

process.stdin.setRawMode(true);

const initWs = () => {
	const wsTimeout = 5000;
	ws = new WebSocket('ws://localhost:3000/ws');

	ws.on('open', () => {
		console.log('WS Connection opened');
	});

	ws.on('message', (data) => {
		const d = JSON.parse(data);
		if (d.dataType === 'stateUpdate') {
			({ state } = d);
		} else if (d.dataType === 'initalData') {
			state = d.timerState;
		}
	});

	ws.on('close', () => {
		console.log('Websocket disconnected. Reconnecting in 5 seconds');
		setTimeout(initWs, wsTimeout);
	});

	ws.on('error', (e) => {
		console.log(`Websocket error: ${e}`);
	});
};
initWs();

console.log('running... waiting for keypresses. \ng is player 1 and b is player 2');
