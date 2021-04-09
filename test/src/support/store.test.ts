// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { add, defaultAugmenterKey, remove, store } from '../../../src/support/store';


const removeTerm = `${'\x1b[4m'}remove${'\x1b[24m'}`;


/**
 * It can be beneficial to:
 *   `console.log(type, $listener, optionsKey);`
 * before:
 *   target.addEventListener(type, augmenter ?? $listener, options);
 * in `../../../../src/support/store`
 */
describe('Listener Store', () => {

	test('Can not add listener with no type', () => {
		const success = add(self, null, '', null, defaultAugmenterKey, null);

		expect(success).toBe(false);
		expect(store.has(self)).toBe(false);
	});

	test(`Can not ${removeTerm} listener with no type`, () => {
		const success = remove(self, null, '', null, undefined, defaultAugmenterKey);

		expect(success).toBe(false);
	});

	test('Can add one minimal listener', () => {
		const success = add(self, null, 'minimal1', null, defaultAugmenterKey, null);
		expect(success).toBe(true);

		const typeStore = store.get(self);

		expect(typeStore?.size).toBe(1);
		expect(typeStore?.has('minimal1')).toBe(true);
	});

	test('Can add another minimal listener', () => {
		const success = add(self, null, 'minimal2', null, defaultAugmenterKey, null);

		expect(success).toBe(true);

		const typeStore = store.get(self);

		expect(typeStore?.size).toBe(2);
		expect(typeStore?.has('minimal2')).toBe(true);
	});

	test('Can not add another minimal listener of the same signature', () => {
		const success = add(self, null, 'minimal2', null, defaultAugmenterKey, null);

		expect(success).toBe(false);

		const typeStore = store.get(self);

		expect(typeStore?.size).toBe(2);
		expect(typeStore?.has('minimal2')).toBe(true);
	});

	const minimal2DifferentListener = (): void => { /**/ };

	test('Can add another minimal listener of the different signature', () => {
		const success = add(self, null, 'minimal2', minimal2DifferentListener, defaultAugmenterKey, null);

		expect(success).toBe(true);

		const typeStore = store.get(self);

		expect(typeStore?.size).toBe(2);
		expect(typeStore?.has('minimal2')).toBe(true);
	});

	test(`Can ${removeTerm} one minimal listener`, () => {
		const success = remove(self, null, 'minimal1', null, undefined, defaultAugmenterKey);

		expect(success).toBe(true);

		const typeStore = store.get(self);

		expect(typeStore?.size).toBe(1);
		expect(typeStore?.has('minimal1')).toBe(false);
	});

	test(`Can ${removeTerm} another minimal listener`, () => {
		const success = remove(self, null, 'minimal2', null, undefined, defaultAugmenterKey);

		expect(success).toBe(true);

		const typeStore = store.get(self);

		expect(typeStore?.size).toBe(1);
		expect(typeStore?.has('minimal2')).toBe(true);
	});

	test(`Can not ${removeTerm} another minimal listener of the same signature`, () => {
		const success = remove(self, null, 'minimal2', null, undefined, defaultAugmenterKey);

		expect(success).toBe(false);

		const typeStore = store.get(self);

		expect(typeStore?.size).toBe(1);
		expect(typeStore?.has('minimal2')).toBe(true);
	});

	test(`Can ${removeTerm} another minimal listener of the different signature`, () => {
		const success = remove(self, null, 'minimal2', minimal2DifferentListener, undefined, defaultAugmenterKey);

		expect(success).toBe(true);

		const typeStore = store.get(self);

		expect(typeStore).toBeUndefined();
	});

	let same1Listener1: EventListener;
	let same1Listener2: EventListener;

	test('Can add listener with same listener', () => {
		let result = 0;

		same1Listener1 = (): number => result++;
		same1Listener2 = (): number => result++;

		const success1 = add(self, null, 'same1', same1Listener1, defaultAugmenterKey, null);
		const success2 = add(self, null, 'same1', same1Listener2, defaultAugmenterKey, null);

		expect(success1).toBe(true);
		expect(success2).toBe(true);

		self.dispatchEvent(new Event('same1'));

		expect(result).toBe(2);
	});

	test(`Can ${removeTerm} listener with same listener`, () => {
		const success1 = remove(self, null, 'same1', same1Listener1, undefined, defaultAugmenterKey);
		const success2 = remove(self, null, 'same1', same1Listener2, undefined, defaultAugmenterKey);

		expect(success1).toBe(true);
		expect(success2).toBe(true);
	});

	let same2Listener: EventListener;

	test('Can not add listener with same listener reference', () => {
		let result = 0;
		same2Listener = (): number => result++;

		const success1 = add(self, null, 'same2', same2Listener, defaultAugmenterKey, null);
		const success2 = add(self, null, 'same2', same2Listener, defaultAugmenterKey, null);

		expect(success1).toBe(true);
		expect(success2).toBe(false);

		self.dispatchEvent(new Event('same2'));

		expect(result).toBe(1);
	});

	test(`Can not ${removeTerm} listener with same listener reference`, () => {
		const success1 = remove(self, null, 'same2', same2Listener, undefined, defaultAugmenterKey);
		const success2 = remove(self, null, 'same2', same2Listener, undefined, defaultAugmenterKey);

		expect(success1).toBe(true);
		expect(success2).toBe(false);
	});

	test('Can not add listener with same listener reference (native)', () => {
		let result = 0;
		const listener = (): number => result++;

		self.addEventListener('same2-native', listener);
		self.addEventListener('same2-native', listener);

		self.dispatchEvent(new Event('same2-native'));

		expect(result).toBe(1);
	});

	let capture1Listener: EventListener;

	test('Can add listener with same listener reference and different capture option', () => {
		let result = 0;
		capture1Listener = (): number => result++;

		const success1 = add(self, null, 'capture1', capture1Listener, defaultAugmenterKey, null);
		const success2 = add(self, null, 'capture1', capture1Listener, defaultAugmenterKey, null, true);

		expect(success1).toBe(true);
		expect(success2).toBe(true);

		self.dispatchEvent(new Event('capture1'));

		expect(result).toBe(2);
	});

	test(`Can ${removeTerm} listener with same listener reference and different capture option`, () => {
		const success1 = remove(self, null, 'capture1', capture1Listener, undefined, defaultAugmenterKey);
		const success2 = remove(self, null, 'capture1', capture1Listener, true, defaultAugmenterKey);

		expect(success1).toBe(true);
		expect(success2).toBe(true);
	});

	test('Can add listener with same listener reference and different capture option (native)', () => {
		let result = 0;
		const listener = (): number => result++;

		self.addEventListener('capture1-native', listener, true);
		self.addEventListener('capture1-native', listener);

		self.dispatchEvent(new Event('capture1-native'));

		expect(result).toBe(2);
	});

	let aug1Listener: () => number;

	test('Can add listener with augmenter', () => {
		let result1 = 0;
		let result2 = -1;
		aug1Listener = (): number => result1++;
		const augmenter = (): void => {
			aug1Listener();
			result2--;
		};

		const success = add(self, null, 'aug1a', aug1Listener, 'aug1b', augmenter);

		expect(success).toBe(true);

		self.dispatchEvent(new Event('aug1a'));

		expect(result1).toBe(1);
		expect(result2).toBe(-2);
	});

	test(`Can ${removeTerm} listener with augmenter`, () => {
		const success = remove(self, null, 'aug1a', aug1Listener, undefined, 'aug1b');

		expect(success).toBe(true);
	});

	let aug2Listener: () => number;

	test('Can not add listener with same listener reference and different augmenter', () => {
		let result1 = 0;
		let result2 = -1;
		aug2Listener = (): number => result1++;

		const success1 = add(self, null, 'aug2a', aug2Listener, 'aug2b', (): void => {
			aug2Listener();
			result2--;
		});
		const success2 = add(self, null, 'aug2a', aug2Listener, 'aug2b', (): void => {
			aug2Listener();
			result2--;
		});

		expect(success1).toBe(true);
		expect(success2).toBe(false);

		self.dispatchEvent(new Event('aug2a'));

		expect(result1).toBe(1);
		expect(result2).toBe(-2);
	});

	test(`Can not ${removeTerm} listener with same listener reference and different augmenter`, () => {
		const success1 = remove(self, null, 'aug2a', aug2Listener, undefined, 'aug2b');
		const success2 = remove(self, null, 'aug2a', aug2Listener, undefined, 'aug2b');

		expect(success1).toBe(true);
		expect(success2).toBe(false);
	});

	let aug3Listener: () => number;

	test('Can not add listener with same augmenter reference', () => {
		let result1 = 0;
		let result2 = -1;
		aug3Listener = (): number => result1++;
		const augmenter = (): void => {
			aug3Listener();
			result2--;
		};

		const success1 = add(self, null, 'aug3a', aug3Listener, 'aug3b', augmenter);
		const success2 = add(self, null, 'aug3a', aug3Listener, 'aug3b', augmenter);

		expect(success1).toBe(true);
		expect(success2).toBe(false);

		self.dispatchEvent(new Event('aug3a'));

		expect(result1).toBe(1);
		expect(result2).toBe(-2);
	});

	test(`Can not ${removeTerm} listener with same augmenter reference`, () => {
		const success1 = remove(self, null, 'aug3a', aug3Listener, undefined, 'aug3b');
		const success2 = remove(self, null, 'aug3a', aug3Listener, undefined, 'aug3b');

		expect(success1).toBe(true);
		expect(success2).toBe(false);
	});

	let capture2Listener: () => number;

	test('Can add same listener with same augmenter reference and different capture option', () => {
		let result1 = 0;
		let result2 = -1;
		capture2Listener = (): number => result1++;
		const augmenter = (): void => {
			capture2Listener();
			result2--;
		};

		const success1 = add(self, null, 'capture2a', capture2Listener, 'capture2b', augmenter);
		const success2 = add(self, null, 'capture2a', capture2Listener, 'capture2b', augmenter, { capture: true });

		expect(success1).toBe(true);
		expect(success2).toBe(true);

		self.dispatchEvent(new Event('capture2a'));

		expect(result1).toBe(2);
		expect(result2).toBe(-3);
	});

	test(`Can ${removeTerm} same listener with same augmenter reference and different capture option`, () => {
		const success1 = remove(self, null, 'capture2a', capture2Listener, undefined, 'capture2b');
		const success2 = remove(self, null, 'capture2a', capture2Listener, { capture: true }, 'capture2b');

		expect(success1).toBe(true);
		expect(success2).toBe(true);
	});

	let passive1Listener: EventListener;

	test('Can not add listener with same listener reference and different passive option', () => {
		let result = 0;
		passive1Listener = (): number => result++;

		const success1 = add(self, null, 'passive1', passive1Listener, defaultAugmenterKey, null);
		const success2 = add(self, null, 'passive1', passive1Listener, defaultAugmenterKey, null, { passive: true });

		expect(success1).toBe(true);
		expect(success2).toBe(false);

		self.dispatchEvent(new Event('passive1'));

		expect(result).toBe(1);
	});

	test(`Can not ${removeTerm} listener with same listener reference and different passive option`, () => {
		const success1 = remove(self, null, 'passive1', passive1Listener, { passive: true }, defaultAugmenterKey);
		const success2 = remove(self, null, 'passive1', passive1Listener, undefined, defaultAugmenterKey);

		expect(success1).toBe(true);
		expect(success2).toBe(false);
	});

	test('Can not add listener with same listener reference and different passive option (native)', () => {
		let result = 0;
		const listener = (): number => result++;

		self.addEventListener('passive1-native', listener);
		self.addEventListener('passive1-native', listener, { passive: true });

		self.dispatchEvent(new Event('passive1-native'));

		expect(result).toBe(1);
	});

	let multipleListener: EventListener;

	test('Can add more than one type of listener', () => {
		let result;

		multipleListener = (event: Event): void => {
			result = event.type;
		};

		const success = add(self, null, 'multiple1 multiple2', multipleListener, defaultAugmenterKey, null);

		expect(success).toBe(true);

		self.dispatchEvent(new Event('multiple2'));

		expect(result).toBe('multiple2');

		self.dispatchEvent(new Event('multiple1'));

		expect(result).toBe('multiple1');
	});

	test(`Can ${removeTerm} more than one type of listener`, () => {
		const success = remove(self, null, 'multiple1 multiple2', multipleListener, undefined, defaultAugmenterKey);

		expect(success).toBe(true);
	});

	test(`Can ${removeTerm} one type without providing a listener`, () => {
		let result;

		add(self, null, 'noListener1', (event: Event): void => {
			result = event.type;
		}, defaultAugmenterKey, null);

		const success = remove(self, null, 'noListener1', undefined, undefined, defaultAugmenterKey);

		expect(success).toBe(true);

		self.dispatchEvent(new Event('noListener1'));

		expect(result).toBeUndefined();
	});

	test(`Can not ${removeTerm} type which hasn't been added`, () => {
		add(self, null, 'notAdded1', () => { /**/ }, defaultAugmenterKey, null);

		const success = remove(self, null, 'notAdded2', undefined, undefined, defaultAugmenterKey);

		expect(success).toBe(false);

		remove(self, null, 'notAdded1', undefined, undefined, defaultAugmenterKey);
	});

	test(`Can add/${removeTerm} side-by-side same listener with and without augmenter`, () => {
		const listener = (): void => { /**/ };
		const added1 = add(self, null, 'side-by-side', listener, 'side-by-side-1', () => { /**/ });
		const added2 = add(self, null, 'side-by-side', listener, defaultAugmenterKey, null);

		expect(added1).toBe(true);
		expect(added2).toBe(true);

		const removed1 = remove(self, null, 'side-by-side', listener, undefined, defaultAugmenterKey);
		const removed2 = remove(self, null, 'side-by-side', listener, undefined, 'side-by-side-1');

		expect(removed1).toBe(true);
		expect(removed2).toBe(true);
	});

	test(`Can add/${removeTerm} multiple delegate listeners`, () => {

		const listener = (): void => { /**/ };
		const added2 = add(self, null, 'multiple-delegate', listener, defaultAugmenterKey, null);
		const added1 = add(self, '.delegate-1', 'multiple-delegate', listener, 'delegate', () => { /**/ });
		const added3 = add(self, '.delegate-2', 'multiple-delegate', listener, 'delegate', () => { /**/ });

		expect(added1).toBe(true);
		expect(added2).toBe(true);
		expect(added3).toBe(true);

		const removed1 = remove(self, null, 'multiple-delegate', listener, undefined, defaultAugmenterKey);
		const removed2 = remove(self, '.delegate-2', 'multiple-delegate', listener, undefined, 'delegate');
		const removed3 = remove(self, '.delegate-1', 'multiple-delegate', listener, undefined, 'delegate');

		expect(removed1).toBe(true);
		expect(removed2).toBe(true);
		expect(removed3).toBe(true);
	});

	test(`Can ${removeTerm} multiple listeners, with different augmenters, without specifying an augmenter`, () => {

		const listener = (): void => { /**/ };
		const added1 = add(self, '.delegate', 'multiple-delegate', listener, 'delegate-1', () => { /**/ });
		const added2 = add(self, '.delegate', 'multiple-delegate', listener, 'delegate-2', () => { /**/ });
		const added3 = add(self, '.delegate', 'multiple-delegate', listener, 'delegate-3', () => { /**/ });

		expect(added1).toBe(true);
		expect(added2).toBe(true);
		expect(added3).toBe(true);

		const removed = remove(self, '.delegate', 'multiple-delegate', listener);

		expect(removed).toBe(true);
	});

	test('All listeners have been removed', () => {
		expect(store.get(self)).toBeUndefined();
	});

});
