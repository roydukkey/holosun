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

		describe('On Function (ambiguous)', () => {

			test('.off(EventTarget, null, string)', () => {
				on(self, null, 'ambiguous|$undefined', listener);

				const success = off(self, null, 'ambiguous|$undefined');
				expect(success).toBe(true);

				const fail = off(self, null, 'ambiguous|$undefined');
				expect(fail).toBe(false);
			});

			test('.off(EventTarget, null, string, null)', () => {
				on(self, null, 'ambiguous|$null', null);

				const success = off(self, null, 'ambiguous|$null', null);
				expect(success).toBe(true);

				const fail = off(self, null, 'ambiguous|$null', null);
				expect(fail).toBe(false);
			});

			test('.off(EventTarget, null, string, null, boolean)', () => {
				on(self, null, 'ambiguous|null_boolean', null, true);
				on(self, null, 'ambiguous|null_boolean', null, false);

				const success1 = off(self, null, 'ambiguous|null_boolean', null, false);
				expect(success1).toBe(true);

				const success2 = off(self, null, 'ambiguous|null_boolean', null, true);
				expect(success2).toBe(true);

				const fail1 = off(self, null, 'ambiguous|null_boolean', null, false);
				expect(fail1).toBe(false);

				const fail2 = off(self, null, 'ambiguous|null_boolean', null, true);
				expect(fail2).toBe(false);
			});

			test('.off(EventTarget, null, string, null, EventListenerOptions)', () => {
				on(self, null, 'ambiguous|null_event-listener-options', null, { capture: true });
				on(self, null, 'ambiguous|null_event-listener-options', null, { capture: false });

				const success1 = off(self, null, 'ambiguous|null_event-listener-options', null, { capture: false });
				expect(success1).toBe(true);

				const success2 = off(self, null, 'ambiguous|null_event-listener-options', null, { capture: true });
				expect(success2).toBe(true);

				const fail1 = off(self, null, 'ambiguous|null_event-listener-options', null, { capture: false });
				expect(fail1).toBe(false);

				const fail2 = off(self, null, 'ambiguous|null_event-listener-options', null, { capture: true });
				expect(fail2).toBe(false);
			});

			test('.off(EventTarget, null, string, EventListener)', () => {
				on(self, null, 'ambiguous|$event-listener', listener);

				const success = off(self, null, 'ambiguous|$event-listener', listener);
				expect(success).toBe(true);

				const fail = off(self, null, 'ambiguous|$event-listener', listener);
				expect(fail).toBe(false);
			});

			test('.off(EventTarget, null, string, EventListener, boolean)', () => {
				on(self, null, 'ambiguous|event-listener_boolean', listener, true);
				on(self, null, 'ambiguous|event-listener_boolean', listener, false);

				const success1 = off(self, null, 'ambiguous|event-listener_boolean', listener, false);
				expect(success1).toBe(true);

				const success2 = off(self, null, 'ambiguous|event-listener_boolean', listener, true);
				expect(success2).toBe(true);

				const fail1 = off(self, null, 'ambiguous|event-listener_boolean', listener, false);
				expect(fail1).toBe(false);

				const fail2 = off(self, null, 'ambiguous|event-listener_boolean', listener, true);
				expect(fail2).toBe(false);
			});

			test('.off(EventTarget, null, string, EventListener, EventListenerOptions)', () => {
				on(self, null, 'ambiguous|event-listener_event-listener-options', listener, { capture: true });
				on(self, null, 'ambiguous|event-listener_event-listener-options', listener, { capture: false });

				const success1 = off(self, null, 'ambiguous|event-listener_event-listener-options', listener, { capture: false });
				expect(success1).toBe(true);

				const success2 = off(self, null, 'ambiguous|event-listener_event-listener-options', listener, { capture: true });
				expect(success2).toBe(true);

				const fail1 = off(self, null, 'ambiguous|event-listener_event-listener-options', listener, { capture: false });
				expect(fail1).toBe(false);

				const fail2 = off(self, null, 'ambiguous|event-listener_event-listener-options', listener, { capture: true });
				expect(fail2).toBe(false);
			});

			test('.off(EventTarget, null, string, EventListenerObject)', () => {
				on(self, null, 'ambiguous|$event-listener-object', listenerObject);

				const success = off(self, null, 'ambiguous|$event-listener-object', listenerObject);
				expect(success).toBe(true);

				const fail = off(self, null, 'ambiguous|$event-listener-object', listenerObject);
				expect(fail).toBe(false);
			});

			test('.off(EventTarget, null, string, EventListenerObject, boolean)', () => {
				on(self, null, 'ambiguous|event-listener-object_boolean', listenerObject, true);
				on(self, null, 'ambiguous|event-listener-object_boolean', listenerObject, false);

				const success1 = off(self, null, 'ambiguous|event-listener-object_boolean', listenerObject, false);
				expect(success1).toBe(true);

				const success2 = off(self, null, 'ambiguous|event-listener-object_boolean', listenerObject, true);
				expect(success2).toBe(true);

				const fail1 = off(self, null, 'ambiguous|event-listener-object_boolean', listenerObject, false);
				expect(fail1).toBe(false);

				const fail2 = off(self, null, 'ambiguous|event-listener-object_boolean', listenerObject, true);
				expect(fail2).toBe(false);
			});

			test('.off(EventTarget, null, string, EventListenerObject, EventListenerOptions)', () => {
				on(self, null, 'ambiguous|event-listener-object_event-listener-options', listenerObject, { capture: true });
				on(self, null, 'ambiguous|event-listener-object_event-listener-options', listenerObject, { capture: false });

				const success1 = off(self, null, 'ambiguous|event-listener-object_event-listener-options', listenerObject, { capture: false });
				expect(success1).toBe(true);

				const success2 = off(self, null, 'ambiguous|event-listener-object_event-listener-options', listenerObject, { capture: true });
				expect(success2).toBe(true);

				const fail1 = off(self, null, 'ambiguous|event-listener-object_event-listener-options', listenerObject, { capture: false });
				expect(fail1).toBe(false);

				const fail2 = off(self, null, 'ambiguous|event-listener-object_event-listener-options', listenerObject, { capture: true });
				expect(fail2).toBe(false);
			});

			test('.off(EventTarget, string, string)', () => {
				on(self, '.delegation', 'ambiguous|$undefined', listener);

				const fail = off(self, '.delegation', 'ambiguous|$undefined');
				expect(fail).toBe(false);
			});

			test('.off(EventTarget, string, string, null)', () => {
				on(self, '.delegation', 'ambiguous|$null', null);

				const fail = off(self, '.delegation', 'ambiguous|$null', null);
				expect(fail).toBe(false);
			});

			test('.off(EventTarget, string, string, null, boolean)', () => {
				on(self, '.delegation', 'ambiguous|null_boolean', null, true);
				on(self, '.delegation', 'ambiguous|null_boolean', null, false);

				const fail1 = off(self, '.delegation', 'ambiguous|null_boolean', null, false);
				expect(fail1).toBe(false);

				const fail2 = off(self, '.delegation', 'ambiguous|null_boolean', null, true);
				expect(fail2).toBe(false);
			});

			test('.off(EventTarget, string, string, null, EventListenerOptions)', () => {
				on(self, '.delegation', 'ambiguous|null_event-listener-options', null, { capture: true });
				on(self, '.delegation', 'ambiguous|null_event-listener-options', null, { capture: false });

				const fail1 = off(self, '.delegation', 'ambiguous|null_event-listener-options', null, { capture: false });
				expect(fail1).toBe(false);

				const fail2 = off(self, '.delegation', 'ambiguous|null_event-listener-options', null, { capture: true });
				expect(fail2).toBe(false);
			});

			test('.off(EventTarget, string, string, EventListener)', () => {
				on(self, '.delegation', 'ambiguous|$event-listener', listener);

				const fail = off(self, '.delegation', 'ambiguous|$event-listener', listener);
				expect(fail).toBe(false);
			});

			test('.off(EventTarget, string, string, EventListener, boolean)', () => {
				on(self, '.delegation', 'ambiguous|event-listener_boolean', listener, true);
				on(self, '.delegation', 'ambiguous|event-listener_boolean', listener, false);

				const fail1 = off(self, '.delegation', 'ambiguous|event-listener_boolean', listener, false);
				expect(fail1).toBe(false);

				const fail2 = off(self, '.delegation', 'ambiguous|event-listener_boolean', listener, true);
				expect(fail2).toBe(false);
			});

			test('.off(EventTarget, string, string, EventListener, EventListenerOptions)', () => {
				on(self, '.delegation', 'ambiguous|event-listener_event-listener-options', listener, { capture: true });
				on(self, '.delegation', 'ambiguous|event-listener_event-listener-options', listener, { capture: false });

				const fail1 = off(self, '.delegation', 'ambiguous|event-listener_event-listener-options', listener, { capture: false });
				expect(fail1).toBe(false);

				const fail2 = off(self, '.delegation', 'ambiguous|event-listener_event-listener-options', listener, { capture: true });
				expect(fail2).toBe(false);
			});

			test('.off(EventTarget, string, string, EventListenerObject)', () => {
				on(self, '.delegation', 'ambiguous|$event-listener-object', listenerObject);

				const fail = off(self, '.delegation', 'ambiguous|$event-listener-object', listenerObject);
				expect(fail).toBe(false);
			});

			test('.off(EventTarget, string, string, EventListenerObject, boolean)', () => {
				on(self, '.delegation', 'ambiguous|event-listener-object_boolean', listenerObject, true);
				on(self, '.delegation', 'ambiguous|event-listener-object_boolean', listenerObject, false);

				const fail1 = off(self, '.delegation', 'ambiguous|event-listener-object_boolean', listenerObject, false);
				expect(fail1).toBe(false);

				const fail2 = off(self, '.delegation', 'ambiguous|event-listener-object_boolean', listenerObject, true);
				expect(fail2).toBe(false);
			});

			test('.off(EventTarget, string, string, EventListenerObject, EventListenerOptions)', () => {
				on(self, '.delegation', 'ambiguous|event-listener-object_event-listener-options', listenerObject, { capture: true });
				on(self, '.delegation', 'ambiguous|event-listener-object_event-listener-options', listenerObject, { capture: false });

				const fail1 = off(self, '.delegation', 'ambiguous|event-listener-object_event-listener-options', listenerObject, { capture: false });
				expect(fail1).toBe(false);

				const fail2 = off(self, '.delegation', 'ambiguous|event-listener-object_event-listener-options', listenerObject, { capture: true });
				expect(fail2).toBe(false);
			});

			if (store) {
				test('All listener have been removed', () => {
					expect(store.get(self)).toBeUndefined();
				});
			}

		});

	});
});
