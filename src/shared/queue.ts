interface Entry<T> {
	value: T;
	next: Entry<T>;
}

export class Queue<T> {
	public constructor(private head = undefined! as Entry<T>, private tail = undefined! as Entry<T>) {}

	public pushBack(value: T): void {
		const entry = identity<Entry<T>>({
			value,
			next: undefined!,
		});

		if (this.tail !== undefined) {
			this.tail.next = entry;
		}

		this.tail = entry;

		if (this.head === undefined) {
			this.head = entry;
		}
	}

	public popFront(): T | undefined {
		if (this.head === undefined) {
			return undefined;
		}

		const val = this.head.value;
		this.head = this.head.next;

		return val;
	}
}
