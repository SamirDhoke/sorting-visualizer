export const drawArr = (p5, arr, n) => {
	p5.background(0);
	for (let i = 0; i < n; i ++) {
		drawArrItem(p5, arr[i]);
	}
}

export const resetArr = (p5, arr, n) => {
	for (let i = 0; i < n; i ++) {
		arr[i].reset();
	}
}

const drawArrItem = (p5, item) => {
	p5.fill(item.color);
	p5.rect(
		item.x * item.width,
		0,
		item.width,
		item.val * item.height 
	);
}