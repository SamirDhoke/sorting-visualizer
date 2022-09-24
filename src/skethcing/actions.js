import { resetArr, drawArr } from './common.js';
import config from './config.js';
import { delay } from './utils.js';

export const ACTIONS = {
	COMPARE: "COMPARE",
	SWAP: "SWAP",
	SORTED: "SORTED",
	REPLACE: "REPLACE",
	RESET: "RESET"
}

const ACTION_MAP = {
	COMPARE: function (data, arr) {
		const [i, j] = data;
		arr[i].setColor('red');
		arr[j].setColor('red');
	},
	SWAP: function(data, arr) {
		const [i, j] = data;
		arr[i].setColor('red');
		arr[j].setColor('yellow');

		const temp = arr[i].val
		arr[i].val = arr[j].val;
		arr[j].val = temp;
	},
	REPLACE: function(data, arr) {
		const [index, value] = data;
		arr[index].setColor('yellow');
		arr[index].val = value;
	},
	SORTED: function (data, arr) {
		arr[data].sorted();
	}
};

const initializeDispatch = (collection, p5) => {

	let tick = 1;

	return async (action) => {
		// console.log('ACTION', action);
		await delay(config.speed)
		// setTimeout(() => {
		// 	resetArr(collection, collection.length);
		// 	ACTION_MAP[action.type](action.data, collection);
		// 	drawArr(collection, collection.length);
		// }, tick * config.speed);
		resetArr(p5, collection, collection.length);
		ACTION_MAP[action.type](action.data, collection);
		drawArr(p5, collection, collection.length);

		tick += 1;
	}
}

export default initializeDispatch;