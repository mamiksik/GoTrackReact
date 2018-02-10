/* @flow */

export class IndexedArray<T> {
	private data: { [key: string]: T } = {};
	private arrayData: T[] = [];


	constructor(data: { [key: string]: T } = null) {
		if (data) {
			this.setData(data);
		}
	}

	setData(value: { [key: string]: T }) {
		this.data = {};
		for (let k in value) {
			this.data[k.toString()] = value[k];
		}

		this.removeIndexes();
		return this;
	}

	getAsObject(): { [key: string]: T } {
		return this.data;
	}

	getAsArray(): T[] {
		return this.arrayData;
	}

	removeIndex(index: string): IndexedArray<T> {
		delete this.data[index.toString()];
		this.removeIndexes();
		return this;
	}

	setIndex(index: string, item: T): IndexedArray<T> {
		this.data[index.toString()] = item;
		this.removeIndexes();
		return this;
	}

	getIndex(index: string): T {
		return (index.toString() in this.data) ? this.data[index.toString()] : null;
	}

	isEmpty(): boolean {
		return Object.keys(this.data).length === 0;
	}

	removeIndexes() {
		this.arrayData = [];
		for (var index in this.data) {
			this.arrayData.push(this.data[index]);
		}
	}

	count() {
		return this.arrayData.length;
	}
}
