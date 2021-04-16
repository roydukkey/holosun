// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { one as mainOne } from '../../dist/holosun';
import { one as moduleOne } from 'holosun';
import { one as srcOne } from '../../typescript';
import { injectSupport, isOnceSupported } from '../../src/support/once';


const packages: Array<[string, typeof srcOne, typeof injectSupport | null]> = [
	['typescript', srcOne, injectSupport],
	['main', mainOne, null],
	['module', moduleOne, null]
];


packages.forEach(([name, one, injectSupport]) => {
	describe(`'${name}' Package`, () => {

		const listener = (): void => { /**/ };
		const listenerObject = {
			handleEvent: listener
		};

		describe('One Function', () => {

			test('.one(EventTarget, string, null)', () => {
				const success = one(self, '$null', null);
				expect(success).toBe(null);

				const fail = one(self, '$null', null);
				expect(fail).toBe(undefined);
			});

			test('.one(EventTarget, string, null, boolean)', () => {
				const success1 = one(self, 'null_boolean', null, true);
				expect(success1).toBe(null);

				const success2 = one(self, 'null_boolean', null, false);
				expect(success2).toBe(null);

				const fail1 = one(self, 'null_boolean', null, true);
				expect(fail1).toBe(undefined);

				const fail2 = one(self, 'null_boolean', null, false);
				expect(fail2).toBe(undefined);
			});

			test('.one(EventTarget, string, null, AddEventListenerOptions)', () => {
				const success1 = one(self, 'null_add-event-listener-options', null, { capture: false });
				expect(success1).toBe(null);

				const success2 = one(self, 'null_add-event-listener-options', null, { capture: true });
				expect(success2).toBe(null);

				const fail1 = one(self, 'null_add-event-listener-options', null, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = one(self, 'null_add-event-listener-options', null, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('.one(EventTarget, string, EventListener)', () => {
				const success = one(self, 'event-listener', listener);
				expect(success).toBe(listener);

				const fail = one(self, 'event-listener', listener);
				expect(fail).toBe(undefined);
			});

			test('.one(EventTarget, string, EventListener, boolean)', () => {
				const success1 = one(self, 'event-listener_boolean', listener, true);
				expect(success1).toBe(listener);

				const success2 = one(self, 'event-listener_boolean', listener, false);
				expect(success2).toBe(listener);

				const fail1 = one(self, 'event-listener_boolean', listener, true);
				expect(fail1).toBe(undefined);

				const fail2 = one(self, 'event-listener_boolean', listener, false);
				expect(fail2).toBe(undefined);
			});

			test('.one(EventTarget, string, EventListener, AddEventListenerOptions)', () => {
				const success1 = one(self, 'event-listener_add-event-listener-options', listener, { capture: false });
				expect(success1).toBe(listener);

				const success2 = one(self, 'event-listener_add-event-listener-options', listener, { capture: true });
				expect(success2).toBe(listener);

				const fail1 = one(self, 'event-listener_add-event-listener-options', listener, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = one(self, 'event-listener_add-event-listener-options', listener, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('.one(EventTarget, string, EventListenerObject)', () => {
				const success = one(self, 'event-listener-object', listenerObject);
				expect(success).toBe(listenerObject);

				const fail = one(self, 'event-listener-object', listenerObject);
				expect(fail).toBe(undefined);
			});

			test('.one(EventTarget, string, EventListenerObject, boolean)', () => {
				const success1 = one(self, 'event-listener-object_boolean', listenerObject, true);
				expect(success1).toBe(listenerObject);

				const success2 = one(self, 'event-listener-object_boolean', listenerObject, false);
				expect(success2).toBe(listenerObject);

				const fail1 = one(self, 'event-listener-object_boolean', listenerObject, true);
				expect(fail1).toBe(undefined);

				const fail2 = one(self, 'event-listener-object_boolean', listenerObject, false);
				expect(fail2).toBe(undefined);
			});

			test('.one(EventTarget, string, EventListenerObject, AddEventListenerOptions)', () => {
				const success1 = one(self, 'event-listener-object_add-event-listener-options', listenerObject, { capture: false });
				expect(success1).toBe(listenerObject);

				const success2 = one(self, 'event-listener-object_add-event-listener-options', listenerObject, { capture: true });
				expect(success2).toBe(listenerObject);

				const fail1 = one(self, 'event-listener-object_add-event-listener-options', listenerObject, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = one(self, 'event-listener-object_add-event-listener-options', listenerObject, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('Listener is removed after one invocation', () => {
				let count = 0;
				const listener = (): number => count++;
				const event = new Event('single', { bubbles: true });

				if (injectSupport) {
					expect(isOnceSupported).toBe(true);
				}

				const success = one(self, 'single', listener);
				expect(success).toBe(listener);

				self.dispatchEvent(event);
				expect(count).toBe(1);

				self.dispatchEvent(event);
				expect(count).toBe(1);
			});

			if (injectSupport) {
				test('Listener is removed after one invocation (shimmed)', () => {
					let count = 0;
					const listener = (): number => count++;
					const event = new Event('single-shimmed', { bubbles: true });

					expect(isOnceSupported).toBe(true);
					injectSupport(false);
					expect(isOnceSupported).toBe(false);

					const success = one(self, 'single-shimmed', listener);
					injectSupport(true);
					expect(success).toBe(listener);

					self.dispatchEvent(event);
					expect(count).toBe(1);

					self.dispatchEvent(event);
					expect(count).toBe(1);
				});
			}

			test('Listener for multiple event is removed one at a time after invocation', () => {
				let count = 0;
				const listener = (): number => count++;
				const event1 = new Event('multiple-1', { bubbles: true });
				const event2 = new Event('multiple-2', { bubbles: true });

				if (injectSupport) {
					expect(isOnceSupported).toBe(true);
				}

				const success = one(self, 'multiple-1 multiple-2', listener);
				expect(success).toBe(listener);

				self.dispatchEvent(event1);
				expect(count).toBe(1);

				self.dispatchEvent(event1);
				expect(count).toBe(1);

				self.dispatchEvent(event2);
				expect(count).toBe(2);

				self.dispatchEvent(event2);
				expect(count).toBe(2);
			});

		});

		describe('One Function w/Delegation', () => {

			const node = self.document.createElement('div');

			test('.one(Node, string, string, null)', () => {
				const success = one(node, '.delegation', '$null', null);
				expect(success).toBe(null);

				const fail = one(node, '.delegation', '$null', null);
				expect(fail).toBe(undefined);
			});

			test('.one(Node, string, string, null, boolean)', () => {
				const success1 = one(node, '.delegation', 'null_boolean', null, true);
				expect(success1).toBe(null);

				const success2 = one(node, '.delegation', 'null_boolean', null, false);
				expect(success2).toBe(null);

				const fail1 = one(node, '.delegation', 'null_boolean', null, true);
				expect(fail1).toBe(undefined);

				const fail2 = one(node, '.delegation', 'null_boolean', null, false);
				expect(fail2).toBe(undefined);
			});

			test('.one(Node, string, string, null, AddEventListenerOptions)', () => {
				const success1 = one(node, '.delegation', 'null_add-event-listener-options', null, { capture: false });
				expect(success1).toBe(null);

				const success2 = one(node, '.delegation', 'null_add-event-listener-options', null, { capture: true });
				expect(success2).toBe(null);

				const fail1 = one(node, '.delegation', 'null_add-event-listener-options', null, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = one(node, '.delegation', 'null_add-event-listener-options', null, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('.one(Node, string, string, EventListener)', () => {
				const success = one(node, '.delegation', 'event-listener', listener);
				expect(success).toBe(listener);

				const fail = one(node, '.delegation', 'event-listener', listener);
				expect(fail).toBe(undefined);
			});

			test('.one(Node, string, string, EventListener, boolean)', () => {
				const success1 = one(node, '.delegation', 'event-listener_boolean', listener, true);
				expect(success1).toBe(listener);

				const success2 = one(node, '.delegation', 'event-listener_boolean', listener, false);
				expect(success2).toBe(listener);

				const fail1 = one(node, '.delegation', 'event-listener_boolean', listener, true);
				expect(fail1).toBe(undefined);

				const fail2 = one(node, '.delegation', 'event-listener_boolean', listener, false);
				expect(fail2).toBe(undefined);
			});

			test('.one(Node, string, string, EventListener, AddEventListenerOptions)', () => {
				const success1 = one(node, '.delegation', 'event-listener_add-event-listener-options', listener, { capture: false });
				expect(success1).toBe(listener);

				const success2 = one(node, '.delegation', 'event-listener_add-event-listener-options', listener, { capture: true });
				expect(success2).toBe(listener);

				const fail1 = one(node, '.delegation', 'event-listener_add-event-listener-options', listener, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = one(node, '.delegation', 'event-listener_add-event-listener-options', listener, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('.one(Node, string, string, EventListenerObject)', () => {
				const success = one(node, '.delegation', 'event-listener-object', listenerObject);
				expect(success).toBe(listenerObject);

				const fail = one(node, '.delegation', 'event-listener-object', listenerObject);
				expect(fail).toBe(undefined);
			});

			test('.one(Node, string, string, EventListenerObject, boolean)', () => {
				const success1 = one(node, '.delegation', 'event-listener-object_boolean', listenerObject, true);
				expect(success1).toBe(listenerObject);

				const success2 = one(node, '.delegation', 'event-listener-object_boolean', listenerObject, false);
				expect(success2).toBe(listenerObject);

				const fail1 = one(node, '.delegation', 'event-listener-object_boolean', listenerObject, true);
				expect(fail1).toBe(undefined);

				const fail2 = one(node, '.delegation', 'event-listener-object_boolean', listenerObject, false);
				expect(fail2).toBe(undefined);
			});

			test('.one(Node, string, string, EventListenerObject, AddEventListenerOptions)', () => {
				const success1 = one(node, '.delegation', 'event-listener-object_add-event-listener-options', listenerObject, { capture: false });
				expect(success1).toBe(listenerObject);

				const success2 = one(node, '.delegation', 'event-listener-object_add-event-listener-options', listenerObject, { capture: true });
				expect(success2).toBe(listenerObject);

				const fail1 = one(node, '.delegation', 'event-listener-object_add-event-listener-options', listenerObject, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = one(node, '.delegation', 'event-listener-object_add-event-listener-options', listenerObject, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('Delegate listener is removed after one invocation', () => {
				let count = 0;
				const listener = (): number => count++;
				const event = new Event('delegate-single', { bubbles: true });

				if (injectSupport) {
					expect(isOnceSupported).toBe(true);
				}

				const success = one(node, '.delegate-single-1', 'delegate-single', listener);
				expect(success).toBe(listener);

				self.dispatchEvent(event);
				expect(count).toBe(0);

				const delegateNode = self.document.createElement('div');
				delegateNode.className = 'child-node';

				node.append(delegateNode);

				delegateNode.dispatchEvent(event);
				expect(count).toBe(0);

				delegateNode.classList.add('delegate-single-1');

				node.dispatchEvent(event);
				expect(count).toBe(0);

				delegateNode.dispatchEvent(event);
				expect(count).toBe(1);

				delegateNode.dispatchEvent(event);
				expect(count).toBe(1);
			});

			if (injectSupport) {
				test('Delegate listener is removed after one invocation (shimmed)', () => {
					let count = 0;
					const listener = (): number => count++;
					const event = new Event('delegate-single-shimmed', { bubbles: true });

					expect(isOnceSupported).toBe(true);
					injectSupport(false);
					expect(isOnceSupported).toBe(false);

					const success = one(node, '.delegate-single-shimmed-1', 'delegate-single-shimmed', listener);
					injectSupport(true);
					expect(success).toBe(listener);

					self.dispatchEvent(event);
					expect(count).toBe(0);

					const delegateNode = self.document.createElement('div');
					delegateNode.className = 'child-node';

					node.append(delegateNode);

					delegateNode.dispatchEvent(event);
					expect(count).toBe(0);

					delegateNode.classList.add('delegate-single-shimmed-1');

					node.dispatchEvent(event);
					expect(count).toBe(0);

					delegateNode.dispatchEvent(event);
					expect(count).toBe(1);

					delegateNode.dispatchEvent(event);
					expect(count).toBe(1);
				});
			}

			test('Delegate listener for multiple event is removed one at a time after invocation', () => {
				let count = 0;
				const listener = (): number => count++;
				const event1 = new Event('delegate-multiple-1', { bubbles: true });
				const event2 = new Event('delegate-multiple-2', { bubbles: true });

				expect(isOnceSupported).toBe(true);

				const success = one(node, '.delegate-multiple-class', 'delegate-multiple-1 delegate-multiple-2', listener);
				expect(success).toBe(listener);

				const delegateNode = self.document.createElement('div');
				delegateNode.className = 'child-node';

				node.append(delegateNode);

				delegateNode.dispatchEvent(event1);
				delegateNode.dispatchEvent(event2);
				expect(count).toBe(0);

				delegateNode.classList.add('delegate-multiple-class');

				node.dispatchEvent(event1);
				node.dispatchEvent(event2);
				expect(count).toBe(0);

				delegateNode.dispatchEvent(event1);
				expect(count).toBe(1);

				delegateNode.dispatchEvent(event1);
				expect(count).toBe(1);

				delegateNode.dispatchEvent(event2);
				expect(count).toBe(2);

				delegateNode.dispatchEvent(event2);
				expect(count).toBe(2);
			});

		});

	});
});
