// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { any as mainAny } from '../../dist/holosun';
import { any as moduleAny } from 'holosun';
import { any as srcAny } from '../../src/any';


const packages: Array<[string, typeof srcAny]> = [
	['typescript', srcAny],
	['main', mainAny],
	['module', moduleAny]
];


packages.forEach(([name, any]) => {
	describe(`'${name}' Package`, () => {

		const listener = (): void => { /**/ };
		const listenerObject = {
			handleEvent: listener
		};

		describe('Any Function', () => {

			test('.any(EventTarget, string, null)', () => {
				const success = any(self, '$null', null);
				expect(success).toBe(null);

				const fail = any(self, '$null', null);
				expect(fail).toBe(undefined);
			});

			test('.any(EventTarget, string, null, boolean)', () => {
				const success1 = any(self, 'null_boolean', null, true);
				expect(success1).toBe(null);

				const success2 = any(self, 'null_boolean', null, false);
				expect(success2).toBe(null);

				const fail1 = any(self, 'null_boolean', null, true);
				expect(fail1).toBe(undefined);

				const fail2 = any(self, 'null_boolean', null, false);
				expect(fail2).toBe(undefined);
			});

			test('.any(EventTarget, string, null, AddEventListenerOptions)', () => {
				const success1 = any(self, 'null_add-event-listener-options', null, { capture: false });
				expect(success1).toBe(null);

				const success2 = any(self, 'null_add-event-listener-options', null, { capture: true });
				expect(success2).toBe(null);

				const fail1 = any(self, 'null_add-event-listener-options', null, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = any(self, 'null_add-event-listener-options', null, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('.any(EventTarget, string, EventListener)', () => {
				const success = any(self, 'event-listener', listener);
				expect(success).toBe(listener);

				const fail = any(self, 'event-listener', listener);
				expect(fail).toBe(undefined);
			});

			test('.any(EventTarget, string, EventListener, boolean)', () => {
				const success1 = any(self, 'event-listener_boolean', listener, true);
				expect(success1).toBe(listener);

				const success2 = any(self, 'event-listener_boolean', listener, false);
				expect(success2).toBe(listener);

				const fail1 = any(self, 'event-listener_boolean', listener, true);
				expect(fail1).toBe(undefined);

				const fail2 = any(self, 'event-listener_boolean', listener, false);
				expect(fail2).toBe(undefined);
			});

			test('.any(EventTarget, string, EventListener, AddEventListenerOptions)', () => {
				const success1 = any(self, 'event-listener_add-event-listener-options', listener, { capture: false });
				expect(success1).toBe(listener);

				const success2 = any(self, 'event-listener_add-event-listener-options', listener, { capture: true });
				expect(success2).toBe(listener);

				const fail1 = any(self, 'event-listener_add-event-listener-options', listener, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = any(self, 'event-listener_add-event-listener-options', listener, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('.any(EventTarget, string, EventListenerObject)', () => {
				const success = any(self, 'event-listener-object', listenerObject);
				expect(success).toBe(listenerObject);

				const fail = any(self, 'event-listener-object', listenerObject);
				expect(fail).toBe(undefined);
			});

			test('.any(EventTarget, string, EventListenerObject, boolean)', () => {
				const success1 = any(self, 'event-listener-object_boolean', listenerObject, true);
				expect(success1).toBe(listenerObject);

				const success2 = any(self, 'event-listener-object_boolean', listenerObject, false);
				expect(success2).toBe(listenerObject);

				const fail1 = any(self, 'event-listener-object_boolean', listenerObject, true);
				expect(fail1).toBe(undefined);

				const fail2 = any(self, 'event-listener-object_boolean', listenerObject, false);
				expect(fail2).toBe(undefined);
			});

			test('.any(EventTarget, string, EventListenerObject, AddEventListenerOptions)', () => {
				const success1 = any(self, 'event-listener-object_add-event-listener-options', listenerObject, { capture: false });
				expect(success1).toBe(listenerObject);

				const success2 = any(self, 'event-listener-object_add-event-listener-options', listenerObject, { capture: true });
				expect(success2).toBe(listenerObject);

				const fail1 = any(self, 'event-listener-object_add-event-listener-options', listenerObject, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = any(self, 'event-listener-object_add-event-listener-options', listenerObject, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('Listener is removed after one invocation', () => {
				let count = 0;
				const listener = (): number => count++;
				const event = new Event('single', { bubbles: true });

				const success = any(self, 'single', listener);
				expect(success).toBe(listener);

				self.dispatchEvent(event);
				expect(count).toBe(1);

				self.dispatchEvent(event);
				expect(count).toBe(1);
			});

			test('Listener for multiple event is removed after any event invocation', () => {
				let count = 0;
				const listener = (): number => count++;
				const event1 = new Event('multiple-2', { bubbles: true });
				const event2 = new Event('multiple-1', { bubbles: true });

				const success = any(self, 'multiple-1 multiple-2', listener);
				expect(success).toBe(listener);

				self.dispatchEvent(event1);
				expect(count).toBe(1);

				self.dispatchEvent(event1);
				expect(count).toBe(1);

				self.dispatchEvent(event2);
				expect(count).toBe(1);

				self.dispatchEvent(event2);
				expect(count).toBe(1);
			});

		});

		describe('Any Function w/Delegation', () => {

			const node = self.document.createElement('div');

			test('.any(Node, string, string, null)', () => {
				const success = any(node, '.delegation', '$null', null);
				expect(success).toBe(null);

				const fail = any(node, '.delegation', '$null', null);
				expect(fail).toBe(undefined);
			});

			test('.any(Node, string, string, null, boolean)', () => {
				const success1 = any(node, '.delegation', 'null_boolean', null, true);
				expect(success1).toBe(null);

				const success2 = any(node, '.delegation', 'null_boolean', null, false);
				expect(success2).toBe(null);

				const fail1 = any(node, '.delegation', 'null_boolean', null, true);
				expect(fail1).toBe(undefined);

				const fail2 = any(node, '.delegation', 'null_boolean', null, false);
				expect(fail2).toBe(undefined);
			});

			test('.any(Node, string, string, null, AddEventListenerOptions)', () => {
				const success1 = any(node, '.delegation', 'null_add-event-listener-options', null, { capture: false });
				expect(success1).toBe(null);

				const success2 = any(node, '.delegation', 'null_add-event-listener-options', null, { capture: true });
				expect(success2).toBe(null);

				const fail1 = any(node, '.delegation', 'null_add-event-listener-options', null, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = any(node, '.delegation', 'null_add-event-listener-options', null, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('.any(Node, string, string, EventListener)', () => {
				const success = any(node, '.delegation', 'event-listener', listener);
				expect(success).toBe(listener);

				const fail = any(node, '.delegation', 'event-listener', listener);
				expect(fail).toBe(undefined);
			});

			test('.any(Node, string, string, EventListener, boolean)', () => {
				const success1 = any(node, '.delegation', 'event-listener_boolean', listener, true);
				expect(success1).toBe(listener);

				const success2 = any(node, '.delegation', 'event-listener_boolean', listener, false);
				expect(success2).toBe(listener);

				const fail1 = any(node, '.delegation', 'event-listener_boolean', listener, true);
				expect(fail1).toBe(undefined);

				const fail2 = any(node, '.delegation', 'event-listener_boolean', listener, false);
				expect(fail2).toBe(undefined);
			});

			test('.any(Node, string, string, EventListener, AddEventListenerOptions)', () => {
				const success1 = any(node, '.delegation', 'event-listener_add-event-listener-options', listener, { capture: false });
				expect(success1).toBe(listener);

				const success2 = any(node, '.delegation', 'event-listener_add-event-listener-options', listener, { capture: true });
				expect(success2).toBe(listener);

				const fail1 = any(node, '.delegation', 'event-listener_add-event-listener-options', listener, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = any(node, '.delegation', 'event-listener_add-event-listener-options', listener, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('.any(Node, string, string, EventListenerObject)', () => {
				const success = any(node, '.delegation', 'event-listener-object', listenerObject);
				expect(success).toBe(listenerObject);

				const fail = any(node, '.delegation', 'event-listener-object', listenerObject);
				expect(fail).toBe(undefined);
			});

			test('.any(Node, string, string, EventListenerObject, boolean)', () => {
				const success1 = any(node, '.delegation', 'event-listener-object_boolean', listenerObject, true);
				expect(success1).toBe(listenerObject);

				const success2 = any(node, '.delegation', 'event-listener-object_boolean', listenerObject, false);
				expect(success2).toBe(listenerObject);

				const fail1 = any(node, '.delegation', 'event-listener-object_boolean', listenerObject, true);
				expect(fail1).toBe(undefined);

				const fail2 = any(node, '.delegation', 'event-listener-object_boolean', listenerObject, false);
				expect(fail2).toBe(undefined);
			});

			test('.any(Node, string, string, EventListenerObject, AddEventListenerOptions)', () => {
				const success1 = any(node, '.delegation', 'event-listener-object_add-event-listener-options', listenerObject, { capture: false });
				expect(success1).toBe(listenerObject);

				const success2 = any(node, '.delegation', 'event-listener-object_add-event-listener-options', listenerObject, { capture: true });
				expect(success2).toBe(listenerObject);

				const fail1 = any(node, '.delegation', 'event-listener-object_add-event-listener-options', listenerObject, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = any(node, '.delegation', 'event-listener-object_add-event-listener-options', listenerObject, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('Delegate listener is removed after one invocation', () => {
				let count = 0;
				const listener = (): number => count++;
				const event = new Event('delegate-single', { bubbles: true });

				const success = any(node, '.delegate-single-1', 'delegate-single', listener);
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

			test('Delegate listener for multiple event is removed after any event invocation', () => {
				let count = 0;
				const listener = (): number => count++;
				const event1 = new Event('delegate-multiple-1', { bubbles: true });
				const event2 = new Event('delegate-multiple-2', { bubbles: true });

				const success = any(node, '.delegate-multiple-class', 'delegate-multiple-1 delegate-multiple-2', listener);
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
				expect(count).toBe(1);

				delegateNode.dispatchEvent(event2);
				expect(count).toBe(1);
			});

		});

	});
});
