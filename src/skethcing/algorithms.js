import { ACTIONS } from "./actions.js";

export function selectionSort (arr, n, anim, onAction = () => {}) {
	for (let i = 0; i < n; i ++) {
		let max = 0, maxIdx = 0;
		for (let j = 0; j < n - i; j ++) {
			if ( arr[j] > max ) {
				max = arr[j];
				maxIdx = j;
			}
		}

		// we have identified the max
		// swap it with the last element
		// await onAction({ type: ACTIONS.COMPARE, data: [n - i - 1, maxIdx] })
		// await onAction({ type: ACTIONS.SWAP, data: [n - i - 1, maxIdx] })
		anim.push({ type: ACTIONS.COMPARE, data: [n - i - 1, maxIdx] })
		anim.push({ type: ACTIONS.RESET, data: [n - i - 1, maxIdx] })
		anim.push({ type: ACTIONS.SWAP, data: [n - i - 1, maxIdx] })
		anim.push({ type: ACTIONS.RESET, data: [n - i - 1, maxIdx] })
		
		const temp = arr[n - i - 1]; // the last element
		arr[n - i - 1] = arr[maxIdx];
		arr[maxIdx] = temp;
		
		anim.push({ type: ACTIONS.SORTED, data: n - i - 1 })
		// anim.push({ type: ACTIONS.SORTED, data: n - i - 1 })
		// await onAction({ type: ACTIONS.SORTED, data: n - i - 1 });
	}
}

/***************** QUICKSORT *******************/

export async function quicksort(arr, n, onAction = () => {}) {
	
	await _quicksort(arr, 0, n, onAction);
}

async function _quicksort(arr, start, end, onAction) {
	if (end - start <= 1) {
		if (start < end) {
			await onAction({ type: ACTIONS.SORTED, data: start });
		}		
		return;
	}

	const piviot = findGoodPiviot(arr, start, end);
	// pre-processing
	await onAction({ type: ACTIONS.COMPARE, data: [piviot, start] });
	await onAction({ type: ACTIONS.SWAP, data: [piviot, start] });
	const temp = arr[piviot];
	arr[piviot] = arr[start];
	arr[start] = temp;
	// partition ARR around PIVIOT
	const spi = await partition(arr, start, end, onAction); // correct position of PIVIOT
	await onAction({ type: ACTIONS.SORTED, data: spi });

	await _quicksort(arr, start, spi, onAction);
	await _quicksort(arr, spi + 1, end, onAction);
}

function findGoodPiviot(arr, start, end) {
	const mid = Math.floor( (start + end) / 2 );

	const items = [
		[arr[start], start],
		[arr[mid], mid],
		[arr[end - 1], end - 1]
	];

	items.sort((x, y) => x[0] < y[0] ? -1 : 1);

	// return end - 1;
	return items[1][1];
}

async function partition(arr, start, end, onAction) {
	const piviot = arr[start];
	let boundary = start + 1;
	
	for (let i = start; i < end; i ++) {
		const value = arr[i];
		await onAction({ type: ACTIONS.COMPARE, data: [start, i] });

		if (value < piviot) {
			await onAction({ type: ACTIONS.SWAP, data: [boundary, i] });
			arr[i] = arr[boundary];
			arr[boundary] = value;
			boundary += 1;
		}
	}

	await onAction({ type: ACTIONS.SWAP, data: [start, boundary - 1] });
	arr[start] = arr[boundary - 1];
	arr[boundary - 1] = piviot;

	return boundary - 1;
}

/***************** Mergesort *****************/
export const mergesort = async (arr, n, onAction = () => {}) => {
	await _mergesort(arr, 0, n, onAction);
	
	// post-processing step to show sorted array in green
	for (let i = 0; i < n; i ++) {
		await onAction({ type: ACTIONS.SORTED, data: i });
	}
}

const _mergesort = async (arr, start, end, onAction) => {
	if (end - start <= 1) {
		return;
	}

	const mid = Math.floor( (start + end) / 2 );
	await _mergesort(arr, start, mid, onAction);
	await _mergesort(arr, mid, end, onAction);

	await merge(arr, start, mid, end, onAction);
}

const merge = async (arr, start, mid, end, onAction) => {
	const sorted = [];
	
	let i = start, j = mid;
	while (i < mid && j < end) {
		await onAction({ type: ACTIONS.COMPARE, data: [i, j] })
		if ( arr[i] < arr[j] ) {
			sorted.push( arr[i] );
			i += 1;
		} else {
			sorted.push( arr[j] );
			j += 1;
		}
	}

	while ( i < mid ) {
		await onAction({ type: ACTIONS.COMPARE, data: [i, i] })
		sorted.push( arr[i] );
		i += 1;
	}

	while ( j < end ) {
		await onAction({ type: ACTIONS.COMPARE, data: [j, j] })
		sorted.push( arr[j] );
		j += 1;
	}

	// in-place sort trick
	for (let k = start; k < end; k ++) {
		await onAction({ type: ACTIONS.REPLACE, data: [k, sorted[k - start]] });
		arr[k] = sorted[k - start];
	}
}