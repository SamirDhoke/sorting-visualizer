export function isSortingAlgoCorrect(fn) {
	const arr = generateRandomArray(100);
	const result = [...arr];
	const expected = arr.sort((x, y) => x - y);
	
	fn(result, 100);
	
	for (let i = 0; i < 100; i ++) {
		if (result[i] !== expected[i]) {
			return false;
		}
	}

	return true;
}

export const ALGORITHMS = {
	MERGESORT: 'MERGESORT',
	SELECTIONSORT: 'SELECTIONSORT',
	QUICKSORT: 'QUICKSORT'
}

export const delay = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const generateRandomArray = (n) => {

	return new Array(n).fill(0).map((_, idx) => Math.floor( Math.random() * n ) );
	// arr.sort((a, b) => Math.random() > 0.5 ? 1 : -1);
	// return arr;

}