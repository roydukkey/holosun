// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { on as mainOn, trigger as mainTrigger } from '../dist/holosun';
import { on as moduleOn, trigger as moduleTrigger } from 'holosun';
import { on as srcOn, trigger as srcTrigger } from '../typescript';


const packages: Array<[string, typeof srcTrigger, typeof srcOn]> = [
	['typescript', srcTrigger, srcOn],
	['main', mainTrigger, mainOn],
	['module', moduleTrigger, moduleOn]
];


packages.forEach(([name, trigger, on]) => {
	describe(`'${name}' Package`, () => {

		let count = 0;
		const listener = (): number => count++;
		const receivesEvent = (event: Event): void => expect(event).not.toHaveProperty('detail');
		const receivesCustomEvent = (event: Event): void => expect(event).toHaveProperty('detail');

		describe('Trigger Function', () => {

			test('Listener is invoked when triggered', () => {
				on(self, 'trigger-1', listener);

				trigger(self, 'trigger-1');
				expect(count).toBe(1);

				trigger(self, 'trigger-1');
				expect(count).toBe(2);
			});

			test('Listener for multiple events is invoked when triggered', () => {
				count = 0;
				on(self, 'trigger-2 trigger-3', listener);

				trigger(self, 'trigger-2');
				expect(count).toBe(1);

				trigger(self, 'trigger-3');
				expect(count).toBe(2);

				trigger(self, 'trigger-2 trigger-3');
				expect(count).toBe(4);
			});

			test('Triggered event returns false when cancelable and calls .preventDefault()', () => {
				count = 0;

				const cancelableListener = (event: Event): void => {
					event.preventDefault();
					listener();
				};

				on(self, 'trigger-4', listener);
				on(self, 'trigger-5', cancelableListener);

				const results = trigger(self, 'trigger-5 trigger-4', { cancelable: true });
				expect(results).toStrictEqual([
					['trigger-5', false],
					['trigger-4', true]
				]);

				expect(count).toBe(2);
			});

			test('.trigger(EventTarget, string)', () => {
				on(self, 'string', receivesEvent);

				const result = trigger(self, 'string');
				expect(result).toStrictEqual([
					['string', true]
				]);
			});

			test('.trigger(EventTarget, string, EventInit)', () => {
				on(self, 'string_event-init', receivesEvent);

				const result = trigger(self, 'string_event-init', { bubbles: true });
				expect(result).toStrictEqual([
					['string_event-init', true]
				]);
			});

			test('.trigger(EventTarget, string, CustomEventInit)', () => {
				on(self, 'string_custom-event-init', receivesCustomEvent);

				const result = trigger(self, 'string_custom-event-init', { detail: true });
				expect(result).toStrictEqual([
					['string_custom-event-init', true]
				]);
			});

			test('.trigger(EventTarget, string, EventInit, boolean)', () => {
				on(self, 'string_event-init_boolean=true', receivesCustomEvent);
				on(self, 'string_event-init_boolean=false', receivesEvent);

				const result1 = trigger(self, 'string_event-init_boolean=true', { bubbles: true }, true);
				expect(result1).toStrictEqual([
					['string_event-init_boolean=true', true]
				]);

				const result2 = trigger(self, 'string_event-init_boolean=false', { bubbles: true }, false);
				expect(result2).toStrictEqual([
					['string_event-init_boolean=false', true]
				]);
			});

		});

	});
});
