// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { store } from '../src/support/store';
import { off as mainOff, on as mainOn } from '../dist/holosun';
import { off as moduleOff, on as moduleOn } from 'holosun';
import { off as srcOff, on as srcOn } from '../typescript';


const packages: Array<[string, typeof srcOff, typeof srcOn, typeof store | null]> = [
	['typescript', srcOff, srcOn, store],
	['main', mainOff, mainOn, null],
	['module', moduleOff, moduleOn, null]
];


packages.forEach(([name, off, on, store]) => {
	describe(`'${name}' Package`, () => {

		const listener = (): void => { /**/ };
		const listenerObject = {
			handleEvent: listener
		};

		describe('Off Function', () => {

			test('.off(EventTarget, string)', () => {
				on(self, '$undefined', listener);

				const success = off(self, '$undefined');
				expect(success).toBe(true);

				const fail = off(self, '$undefined');
				expect(fail).toBe(false);
			});

			test('.off(EventTarget, string, null)', () => {
				on(self, '$null', null);

				const success = off(self, '$null', null);
				expect(success).toBe(true);

				const fail = off(self, '$null', null);
				expect(fail).toBe(false);
			});

			test('.off(EventTarget, string, null, boolean)', () => {
				on(self, 'null_boolean', null, true);
				on(self, 'null_boolean', null, false);

				const success1 = off(self, 'null_boolean', null, false);
				expect(success1).toBe(true);

				const success2 = off(self, 'null_boolean', null, true);
				expect(success2).toBe(true);

				const fail1 = off(self, 'null_boolean', null, false);
				expect(fail1).toBe(false);

				const fail2 = off(self, 'null_boolean', null, true);
				expect(fail2).toBe(false);
			});

			test('.off(EventTarget, string, null, EventListenerOptions)', () => {
				on(self, 'null_event-listener-options', null, { capture: true });
				on(self, 'null_event-listener-options', null, { capture: false });

				const success1 = off(self, 'null_event-listener-options', null, { capture: false });
				expect(success1).toBe(true);

				const success2 = off(self, 'null_event-listener-options', null, { capture: true });
				expect(success2).toBe(true);

				const fail1 = off(self, 'null_event-listener-options', null, { capture: false });
				expect(fail1).toBe(false);

				const fail2 = off(self, 'null_event-listener-options', null, { capture: true });
				expect(fail2).toBe(false);
			});

			test('.off(EventTarget, string, EventListener)', () => {
				on(self, '$event-listener', listener);

				const success = off(self, '$event-listener', listener);
				expect(success).toBe(true);

				const fail = off(self, '$event-listener', listener);
				expect(fail).toBe(false);
			});

			test('.off(EventTarget, string, EventListener, boolean)', () => {
				on(self, 'event-listener_boolean', listener, true);
				on(self, 'event-listener_boolean', listener, false);

				const success1 = off(self, 'event-listener_boolean', listener, false);
				expect(success1).toBe(true);

				const success2 = off(self, 'event-listener_boolean', listener, true);
				expect(success2).toBe(true);

				const fail1 = off(self, 'event-listener_boolean', listener, false);
				expect(fail1).toBe(false);

				const fail2 = off(self, 'event-listener_boolean', listener, true);
				expect(fail2).toBe(false);
			});

			test('.off(EventTarget, string, EventListener, EventListenerOptions)', () => {
				on(self, 'event-listener_event-listener-options', listener, { capture: true });
				on(self, 'event-listener_event-listener-options', listener, { capture: false });

				const success1 = off(self, 'event-listener_event-listener-options', listener, { capture: false });
				expect(success1).toBe(true);

				const success2 = off(self, 'event-listener_event-listener-options', listener, { capture: true });
				expect(success2).toBe(true);

				const fail1 = off(self, 'event-listener_event-listener-options', listener, { capture: false });
				expect(fail1).toBe(false);

				const fail2 = off(self, 'event-listener_event-listener-options', listener, { capture: true });
				expect(fail2).toBe(false);
			});

			test('.off(EventTarget, string, EventListenerObject)', () => {
				on(self, '$event-listener-object', listenerObject);

				const success = off(self, '$event-listener-object', listenerObject);
				expect(success).toBe(true);

				const fail = off(self, '$event-listener-object', listenerObject);
				expect(fail).toBe(false);
			});

			test('.off(EventTarget, string, EventListenerObject, boolean)', () => {
				on(self, 'event-listener-object_boolean', listenerObject, true);
				on(self, 'event-listener-object_boolean', listenerObject, false);

				const success1 = off(self, 'event-listener-object_boolean', listenerObject, false);
				expect(success1).toBe(true);

				const success2 = off(self, 'event-listener-object_boolean', listenerObject, true);
				expect(success2).toBe(true);

				const fail1 = off(self, 'event-listener-object_boolean', listenerObject, false);
				expect(fail1).toBe(false);

				const fail2 = off(self, 'event-listener-object_boolean', listenerObject, true);
				expect(fail2).toBe(false);
			});

			test('.off(EventTarget, string, EventListenerObject, EventListenerOptions)', () => {
				on(self, 'event-listener-object_event-listener-options', listenerObject, { capture: true });
				on(self, 'event-listener-object_event-listener-options', listenerObject, { capture: false });

				const success1 = off(self, 'event-listener-object_event-listener-options', listenerObject, { capture: false });
				expect(success1).toBe(true);

				const success2 = off(self, 'event-listener-object_event-listener-options', listenerObject, { capture: true });
				expect(success2).toBe(true);

				const fail1 = off(self, 'event-listener-object_event-listener-options', listenerObject, { capture: false });
				expect(fail1).toBe(false);

				const fail2 = off(self, 'event-listener-object_event-listener-options', listenerObject, { capture: true });
				expect(fail2).toBe(false);
			});

			if (store) {
				test('All listener have been removed', () => {
					expect(store.get(self)).toBeUndefined();
				});
			}

		});

		describe('Off Function w/Delegation', () => {

			const node = self.document.createElement('div');

			test('.off(Node, string, string)', () => {
				on(node, '.delegation', '$undefined', listener);

				const success = off(node, '.delegation', '$undefined');
				expect(success).toBe(true);

				const fail = off(node, '.delegation', '$undefined');
				expect(fail).toBe(false);
			});

			test('.off(Node, string, string, null)', () => {
				on(node, '.delegation', '$null', null);

				const success = off(node, '.delegation', '$null', null);
				expect(success).toBe(true);

				const fail = off(node, '.delegation', '$null', null);
				expect(fail).toBe(false);
			});

			test('.off(Node, string, string, null, boolean)', () => {
				on(node, '.delegation', 'null_boolean', null, true);
				on(node, '.delegation', 'null_boolean', null, false);

				const success1 = off(node, '.delegation', 'null_boolean', null, false);
				expect(success1).toBe(true);

				const success2 = off(node, '.delegation', 'null_boolean', null, true);
				expect(success2).toBe(true);

				const fail1 = off(node, '.delegation', 'null_boolean', null, false);
				expect(fail1).toBe(false);

				const fail2 = off(node, '.delegation', 'null_boolean', null, true);
				expect(fail2).toBe(false);
			});

			test('.off(Node, string, string, null, EventListenerOptions)', () => {
				on(node, '.delegation', 'null_event-listener-options', null, { capture: true });
				on(node, '.delegation', 'null_event-listener-options', null, { capture: false });

				const success1 = off(node, '.delegation', 'null_event-listener-options', null, { capture: false });
				expect(success1).toBe(true);

				const success2 = off(node, '.delegation', 'null_event-listener-options', null, { capture: true });
				expect(success2).toBe(true);

				const fail1 = off(node, '.delegation', 'null_event-listener-options', null, { capture: false });
				expect(fail1).toBe(false);

				const fail2 = off(node, '.delegation', 'null_event-listener-options', null, { capture: true });
				expect(fail2).toBe(false);
			});

			test('.off(Node, string, string, EventListener)', () => {
				on(node, '.delegation', '$event-listener', listener);

				const success = off(node, '.delegation', '$event-listener', listener);
				expect(success).toBe(true);

				const fail = off(node, '.delegation', '$event-listener', listener);
				expect(fail).toBe(false);
			});

			test('.off(Node, string, string, EventListener, boolean)', () => {
				on(node, '.delegation', 'event-listener_boolean', listener, true);
				on(node, '.delegation', 'event-listener_boolean', listener, false);

				const success1 = off(node, '.delegation', 'event-listener_boolean', listener, false);
				expect(success1).toBe(true);

				const success2 = off(node, '.delegation', 'event-listener_boolean', listener, true);
				expect(success2).toBe(true);

				const fail1 = off(node, '.delegation', 'event-listener_boolean', listener, false);
				expect(fail1).toBe(false);

				const fail2 = off(node, '.delegation', 'event-listener_boolean', listener, true);
				expect(fail2).toBe(false);
			});

			test('.off(Node, string, string, EventListener, EventListenerOptions)', () => {
				on(node, '.delegation', 'event-listener_event-listener-options', listener, { capture: true });
				on(node, '.delegation', 'event-listener_event-listener-options', listener, { capture: false });

				const success1 = off(node, '.delegation', 'event-listener_event-listener-options', listener, { capture: false });
				expect(success1).toBe(true);

				const success2 = off(node, '.delegation', 'event-listener_event-listener-options', listener, { capture: true });
				expect(success2).toBe(true);

				const fail1 = off(node, '.delegation', 'event-listener_event-listener-options', listener, { capture: false });
				expect(fail1).toBe(false);

				const fail2 = off(node, '.delegation', 'event-listener_event-listener-options', listener, { capture: true });
				expect(fail2).toBe(false);
			});

			test('.off(Node, string, string, EventListenerObject)', () => {
				on(node, '.delegation', '$event-listener-object', listenerObject);

				const success = off(node, '.delegation', '$event-listener-object', listenerObject);
				expect(success).toBe(true);

				const fail = off(node, '.delegation', '$event-listener-object', listenerObject);
				expect(fail).toBe(false);
			});

			test('.off(Node, string, string, EventListenerObject, boolean)', () => {
				on(node, '.delegation', 'event-listener-object_boolean', listenerObject, true);
				on(node, '.delegation', 'event-listener-object_boolean', listenerObject, false);

				const success1 = off(node, '.delegation', 'event-listener-object_boolean', listenerObject, false);
				expect(success1).toBe(true);

				const success2 = off(node, '.delegation', 'event-listener-object_boolean', listenerObject, true);
				expect(success2).toBe(true);

				const fail1 = off(node, '.delegation', 'event-listener-object_boolean', listenerObject, false);
				expect(fail1).toBe(false);

				const fail2 = off(node, '.delegation', 'event-listener-object_boolean', listenerObject, true);
				expect(fail2).toBe(false);
			});

			test('.off(Node, string, string, EventListenerObject, EventListenerOptions)', () => {
				on(node, '.delegation', 'event-listener-object_event-listener-options', listenerObject, { capture: true });
				on(node, '.delegation', 'event-listener-object_event-listener-options', listenerObject, { capture: false });

				const success1 = off(node, '.delegation', 'event-listener-object_event-listener-options', listenerObject, { capture: false });
				expect(success1).toBe(true);

				const success2 = off(node, '.delegation', 'event-listener-object_event-listener-options', listenerObject, { capture: true });
				expect(success2).toBe(true);

				const fail1 = off(node, '.delegation', 'event-listener-object_event-listener-options', listenerObject, { capture: false });
				expect(fail1).toBe(false);

				const fail2 = off(node, '.delegation', 'event-listener-object_event-listener-options', listenerObject, { capture: true });
				expect(fail2).toBe(false);
			});

			if (store) {
				test('All listeners have been removed', () => {
					expect(store.get(node)).toBeUndefined();
				});
			}

		});

	});
});
