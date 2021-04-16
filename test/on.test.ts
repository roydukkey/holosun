// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { on as mainOn } from '../dist/holosun';
import { on as moduleOn } from 'holosun';
import { on as srcOn } from '../typescript';


const packages: Array<[string, typeof srcOn]> = [
	['typescript', srcOn],
	['main', mainOn],
	['module', moduleOn]
];


packages.forEach(([name, on]) => {
	describe(`'${name}' Package`, () => {

		const listener = (): void => { /**/ };
		const listenerObject = {
			handleEvent: listener
		};

		describe('On Function', () => {

			test('.on(EventTarget, string, null)', () => {
				const success = on(self, '$null', null);
				expect(success).toBe(null);

				const fail = on(self, '$null', null);
				expect(fail).toBe(undefined);
			});

			test('.on(EventTarget, string, null, boolean)', () => {
				const success1 = on(self, 'null_boolean', null, true);
				expect(success1).toBe(null);

				const success2 = on(self, 'null_boolean', null, false);
				expect(success2).toBe(null);

				const fail1 = on(self, 'null_boolean', null, true);
				expect(fail1).toBe(undefined);

				const fail2 = on(self, 'null_boolean', null, false);
				expect(fail2).toBe(undefined);
			});

			test('.on(EventTarget, string, null, AddEventListenerOptions)', () => {
				const success1 = on(self, 'null_add-event-listener-options', null, { capture: false });
				expect(success1).toBe(null);

				const success2 = on(self, 'null_add-event-listener-options', null, { capture: true });
				expect(success2).toBe(null);

				const fail1 = on(self, 'null_add-event-listener-options', null, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = on(self, 'null_add-event-listener-options', null, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('.on(EventTarget, string, EventListener)', () => {
				const success = on(self, 'event-listener', listener);
				expect(success).toBe(listener);

				const fail = on(self, 'event-listener', listener);
				expect(fail).toBe(undefined);
			});

			test('.on(EventTarget, string, EventListener, boolean)', () => {
				const success1 = on(self, 'event-listener_boolean', listener, true);
				expect(success1).toBe(listener);

				const success2 = on(self, 'event-listener_boolean', listener, false);
				expect(success2).toBe(listener);

				const fail1 = on(self, 'event-listener_boolean', listener, true);
				expect(fail1).toBe(undefined);

				const fail2 = on(self, 'event-listener_boolean', listener, false);
				expect(fail2).toBe(undefined);
			});

			test('.on(EventTarget, string, EventListener, AddEventListenerOptions)', () => {
				const success1 = on(self, 'event-listener_add-event-listener-options', listener, { capture: false });
				expect(success1).toBe(listener);

				const success2 = on(self, 'event-listener_add-event-listener-options', listener, { capture: true });
				expect(success2).toBe(listener);

				const fail1 = on(self, 'event-listener_add-event-listener-options', listener, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = on(self, 'event-listener_add-event-listener-options', listener, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('.on(EventTarget, string, EventListenerObject)', () => {
				const success = on(self, 'event-listener-object', listenerObject);
				expect(success).toBe(listenerObject);

				const fail = on(self, 'event-listener-object', listenerObject);
				expect(fail).toBe(undefined);
			});

			test('.on(EventTarget, string, EventListenerObject, boolean)', () => {
				const success1 = on(self, 'event-listener-object_boolean', listenerObject, true);
				expect(success1).toBe(listenerObject);

				const success2 = on(self, 'event-listener-object_boolean', listenerObject, false);
				expect(success2).toBe(listenerObject);

				const fail1 = on(self, 'event-listener-object_boolean', listenerObject, true);
				expect(fail1).toBe(undefined);

				const fail2 = on(self, 'event-listener-object_boolean', listenerObject, false);
				expect(fail2).toBe(undefined);
			});

			test('.on(EventTarget, string, EventListenerObject, AddEventListenerOptions)', () => {
				const success1 = on(self, 'event-listener-object_add-event-listener-options', listenerObject, { capture: false });
				expect(success1).toBe(listenerObject);

				const success2 = on(self, 'event-listener-object_add-event-listener-options', listenerObject, { capture: true });
				expect(success2).toBe(listenerObject);

				const fail1 = on(self, 'event-listener-object_add-event-listener-options', listenerObject, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = on(self, 'event-listener-object_add-event-listener-options', listenerObject, { capture: true });
				expect(fail2).toBe(undefined);
			});

		});

		describe('On Function w/Delegation', () => {

			const node = self.document.createElement('div');

			test('.on(Node, string, string, null)', () => {
				const success = on(node, '.delegation', '$null', null);
				expect(success).toBe(null);

				const fail = on(node, '.delegation', '$null', null);
				expect(fail).toBe(undefined);
			});

			test('.on(Node, string, string, null, boolean)', () => {
				const success1 = on(node, '.delegation', 'null_boolean', null, true);
				expect(success1).toBe(null);

				const success2 = on(node, '.delegation', 'null_boolean', null, false);
				expect(success2).toBe(null);

				const fail1 = on(node, '.delegation', 'null_boolean', null, true);
				expect(fail1).toBe(undefined);

				const fail2 = on(node, '.delegation', 'null_boolean', null, false);
				expect(fail2).toBe(undefined);
			});

			test('.on(Node, string, string, null, AddEventListenerOptions)', () => {
				const success1 = on(node, '.delegation', 'null_add-event-listener-options', null, { capture: false });
				expect(success1).toBe(null);

				const success2 = on(node, '.delegation', 'null_add-event-listener-options', null, { capture: true });
				expect(success2).toBe(null);

				const fail1 = on(node, '.delegation', 'null_add-event-listener-options', null, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = on(node, '.delegation', 'null_add-event-listener-options', null, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('.on(Node, string, string, EventListener)', () => {
				const success = on(node, '.delegation', 'event-listener', listener);
				expect(success).toBe(listener);

				const fail = on(node, '.delegation', 'event-listener', listener);
				expect(fail).toBe(undefined);
			});

			test('.on(Node, string, string, EventListener, boolean)', () => {
				const success1 = on(node, '.delegation', 'event-listener_boolean', listener, true);
				expect(success1).toBe(listener);

				const success2 = on(node, '.delegation', 'event-listener_boolean', listener, false);
				expect(success2).toBe(listener);

				const fail1 = on(node, '.delegation', 'event-listener_boolean', listener, true);
				expect(fail1).toBe(undefined);

				const fail2 = on(node, '.delegation', 'event-listener_boolean', listener, false);
				expect(fail2).toBe(undefined);
			});

			test('.on(Node, string, string, EventListener, AddEventListenerOptions)', () => {
				const success1 = on(node, '.delegation', 'event-listener_add-event-listener-options', listener, { capture: false });
				expect(success1).toBe(listener);

				const success2 = on(node, '.delegation', 'event-listener_add-event-listener-options', listener, { capture: true });
				expect(success2).toBe(listener);

				const fail1 = on(node, '.delegation', 'event-listener_add-event-listener-options', listener, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = on(node, '.delegation', 'event-listener_add-event-listener-options', listener, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('.on(Node, string, string, EventListenerObject)', () => {
				const success = on(node, '.delegation', 'event-listener-object', listenerObject);
				expect(success).toBe(listenerObject);

				const fail = on(node, '.delegation', 'event-listener-object', listenerObject);
				expect(fail).toBe(undefined);
			});

			test('.on(Node, string, string, EventListenerObject, boolean)', () => {
				const success1 = on(node, '.delegation', 'event-listener-object_boolean', listenerObject, true);
				expect(success1).toBe(listenerObject);

				const success2 = on(node, '.delegation', 'event-listener-object_boolean', listenerObject, false);
				expect(success2).toBe(listenerObject);

				const fail1 = on(node, '.delegation', 'event-listener-object_boolean', listenerObject, true);
				expect(fail1).toBe(undefined);

				const fail2 = on(node, '.delegation', 'event-listener-object_boolean', listenerObject, false);
				expect(fail2).toBe(undefined);
			});

			test('.on(Node, string, string, EventListenerObject, AddEventListenerOptions)', () => {
				const success1 = on(node, '.delegation', 'event-listener-object_add-event-listener-options', listenerObject, { capture: false });
				expect(success1).toBe(listenerObject);

				const success2 = on(node, '.delegation', 'event-listener-object_add-event-listener-options', listenerObject, { capture: true });
				expect(success2).toBe(listenerObject);

				const fail1 = on(node, '.delegation', 'event-listener-object_add-event-listener-options', listenerObject, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = on(node, '.delegation', 'event-listener-object_add-event-listener-options', listenerObject, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('Delegated listener persists with nodes are added/removed', () => {
				let count = 0;
				const listener = (): number => count++;
				const event = new Event('persist-event', { bubbles: true });

				const success = on(node, '.persist', 'persist-event', listener);
				expect(success).toBe(listener);

				node.dispatchEvent(event);
				expect(count).toBe(0);

				const delegateNode = self.document.createElement('div');
				delegateNode.className = 'child-node';

				node.append(delegateNode);

				delegateNode.dispatchEvent(event);
				expect(count).toBe(0);

				delegateNode.classList.add('persist');

				node.dispatchEvent(event);
				expect(count).toBe(0);

				delegateNode.dispatchEvent(event);
				expect(count).toBe(1);

				delegateNode.remove();

				delegateNode.dispatchEvent(event);
				expect(count).toBe(1);

				node.append(delegateNode);

				delegateNode.dispatchEvent(event);
				expect(count).toBe(2);

				delegateNode.classList.remove('persist');

				delegateNode.dispatchEvent(event);
				expect(count).toBe(2);

				delegateNode.classList.add('persist');

				delegateNode.dispatchEvent(event);
				expect(count).toBe(3);
			});

			test('Delegated listener executes listeners with .handleEvent()', () => {
				let count = 0;
				const listener = {
					handleEvent: (): number => count++
				};
				const event = new Event('handle-event', { bubbles: true });

				const success = on(node, '.handle', 'handle-event', listener);
				expect(success).toBe(listener);

				const delegateNode = self.document.createElement('div');
				delegateNode.className = 'handle';
				node.append(delegateNode);

				delegateNode.dispatchEvent(event);
				expect(count).toBe(1);
			});

		});

		describe('On Function (ambiguous)', () => {

			test('.on(EventTarget, null, string, null)', () => {
				const success = on(self, null, 'ambiguous|$null', null);
				expect(success).toBe(null);

				const fail = on(self, null, 'ambiguous|$null', null);
				expect(fail).toBe(undefined);
			});

			test('.on(EventTarget, null, string, null, boolean)', () => {
				const success1 = on(self, null, 'ambiguous|null_boolean', null, true);
				expect(success1).toBe(null);

				const success2 = on(self, null, 'ambiguous|null_boolean', null, false);
				expect(success2).toBe(null);

				const fail1 = on(self, null, 'ambiguous|null_boolean', null, true);
				expect(fail1).toBe(undefined);

				const fail2 = on(self, null, 'ambiguous|null_boolean', null, false);
				expect(fail2).toBe(undefined);
			});

			test('.on(EventTarget, null, string, null, options)', () => {
				const success1 = on(self, null, 'ambiguous|null_add-event-listener-options', null, { capture: false });
				expect(success1).toBe(null);

				const success2 = on(self, null, 'ambiguous|null_add-event-listener-options', null, { capture: true });
				expect(success2).toBe(null);

				const fail1 = on(self, null, 'ambiguous|null_add-event-listener-options', null, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = on(self, null, 'ambiguous|null_add-event-listener-options', null, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('.on(EventTarget, null, string, EventListener)', () => {
				const success = on(self, null, 'ambiguous|event-listener', listener);
				expect(success).toBe(listener);

				const fail = on(self, null, 'ambiguous|event-listener', listener);
				expect(fail).toBe(undefined);
			});

			test('.on(EventTarget, null, string, EventListener, boolean)', () => {
				const success1 = on(self, null, 'ambiguous|event-listener_boolean', listener, true);
				expect(success1).toBe(listener);

				const success2 = on(self, null, 'ambiguous|event-listener_boolean', listener, false);
				expect(success2).toBe(listener);

				const fail1 = on(self, null, 'ambiguous|event-listener_boolean', listener, true);
				expect(fail1).toBe(undefined);

				const fail2 = on(self, null, 'ambiguous|event-listener_boolean', listener, false);
				expect(fail2).toBe(undefined);
			});

			test('.on(EventTarget, null, string, EventListener, AddEventListenerOptions)', () => {
				const success1 = on(self, null, 'ambiguous|event-listener_add-event-listener-options', listener, { capture: false });
				expect(success1).toBe(listener);

				const success2 = on(self, null, 'ambiguous|event-listener_add-event-listener-options', listener, { capture: true });
				expect(success2).toBe(listener);

				const fail1 = on(self, null, 'ambiguous|event-listener_add-event-listener-options', listener, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = on(self, null, 'ambiguous|event-listener_add-event-listener-options', listener, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('.on(EventTarget, null, string, EventListenerObject)', () => {
				const success = on(self, null, 'ambiguous|event-listener-object', listenerObject);
				expect(success).toBe(listenerObject);

				const fail = on(self, null, 'ambiguous|event-listener-object', listenerObject);
				expect(fail).toBe(undefined);
			});

			test('.on(EventTarget, null, string, EventListenerObject, boolean)', () => {
				const success1 = on(self, null, 'ambiguous|event-listener-object_boolean', listenerObject, true);
				expect(success1).toBe(listenerObject);

				const success2 = on(self, null, 'ambiguous|event-listener-object_boolean', listenerObject, false);
				expect(success2).toBe(listenerObject);

				const fail1 = on(self, null, 'ambiguous|event-listener-object_boolean', listenerObject, true);
				expect(fail1).toBe(undefined);

				const fail2 = on(self, null, 'ambiguous|event-listener-object_boolean', listenerObject, false);
				expect(fail2).toBe(undefined);
			});

			test('.on(EventTarget, null, string, EventListenerObject, AddEventListenerOptions)', () => {
				const success1 = on(self, null, 'ambiguous|event-listener-object_add-event-listener-options', listenerObject, { capture: false });
				expect(success1).toBe(listenerObject);

				const success2 = on(self, null, 'ambiguous|event-listener-object_add-event-listener-options', listenerObject, { capture: true });
				expect(success2).toBe(listenerObject);

				const fail1 = on(self, null, 'ambiguous|event-listener-object_add-event-listener-options', listenerObject, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = on(self, null, 'ambiguous|event-listener-object_add-event-listener-options', listenerObject, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('.on(EventTarget, string, string, null)', () => {
				const fail = on(self, '.delegation', 'ambiguous|$null', null);
				expect(fail).toBe(undefined);
			});

			test('.on(EventTarget, string, string, null, boolean)', () => {
				const fail1 = on(self, '.delegation', 'ambiguous|null_boolean', null, true);
				expect(fail1).toBe(undefined);

				const fail2 = on(self, '.delegation', 'ambiguous|null_boolean', null, false);
				expect(fail2).toBe(undefined);
			});

			test('.on(EventTarget, string, string, null, AddEventListenerOptions)', () => {
				const fail1 = on(self, '.delegation', 'ambiguous|null_add-event-listener-options', null, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = on(self, '.delegation', 'ambiguous|null_add-event-listener-options', null, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('.on(EventTarget, string, string, EventListener)', () => {
				const fail = on(self, '.delegation', 'ambiguous|event-listener', listener);
				expect(fail).toBe(undefined);
			});

			test('.on(EventTarget, string, string, EventListener, boolean)', () => {
				const fail1 = on(self, '.delegation', 'ambiguous|event-listener_boolean', listener, true);
				expect(fail1).toBe(undefined);

				const fail2 = on(self, '.delegation', 'ambiguous|event-listener_boolean', listener, false);
				expect(fail2).toBe(undefined);
			});

			test('.on(EventTarget, string, string, EventListener, AddEventListenerOptions)', () => {
				const fail1 = on(self, '.delegation', 'ambiguous|event-listener_add-event-listener-options', listener, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = on(self, '.delegation', 'ambiguous|event-listener_add-event-listener-options', listener, { capture: true });
				expect(fail2).toBe(undefined);
			});

			test('.on(EventTarget, string, string, EventListenerObject)', () => {
				const fail = on(self, '.delegation', 'ambiguous|event-listener-object', listenerObject);
				expect(fail).toBe(undefined);
			});

			test('.on(EventTarget, string, string, EventListenerObject, boolean)', () => {
				const fail1 = on(self, '.delegation', 'ambiguous|event-listener-object_boolean', listenerObject, true);
				expect(fail1).toBe(undefined);

				const fail2 = on(self, '.delegation', 'ambiguous|event-listener-object_boolean', listenerObject, false);
				expect(fail2).toBe(undefined);
			});

			test('.on(EventTarget, string, string, EventListenerObject, AddEventListenerOptions)', () => {
				const fail1 = on(self, '.delegation', 'ambiguous|event-listener-object_add-event-listener-options', listenerObject, { capture: false });
				expect(fail1).toBe(undefined);

				const fail2 = on(self, '.delegation', 'ambiguous|event-listener-object_add-event-listener-options', listenerObject, { capture: true });
				expect(fail2).toBe(undefined);
			});

		});

	});
});
