export default class ArrayMember {
	constructor (x, val, width, height, color='gray') {
		this.x = x;
		this.val = val;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	isSorted() {
		return this.color === 'green';
	}

	setColor(color) {
		if (!this.isSorted() && color !== 'green') {
			this.color = color;
		}
	}

	sorted() {
		if (!this.isSorted()) {
			this.color = 'green';
		}
	}

	reset() {
		if (!this.isSorted()) {
			this.color = 'gray';
		}
	}
}