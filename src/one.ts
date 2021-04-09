// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { isOnceSupported } from './support/once';
import { oneAugmenterKey, single } from './support/single';


/**
 * Attach an event listener that will be called once whenever each of the specified event types are delivered to the given target.
 *
 * @param target - The target on which the event listener is attached.
 * @param types - A case-sensitive string representing the {@link https://developer.mozilla.org/en-US/docs/Web/Events|event type}s to listen for.
 * @param listener - The object that receives a notification (an object that implements the {@link https://developer.mozilla.org/en-US/docs/Web/API/Event|Event} interface) when an event of a specified type occurs. This must be an object implementing the {@link https://developer.mozilla.org/en-US/docs/Web/API/EventListener|EventListener} interface, or a function.
 * @param useCapture - Whether or not events of these types will be dispatched to the registered listener before being dispatched to any target beneath it in the DOM tree.
 *
 * @returns The provided listener when successfully attached; otherwise, `undefined`.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#the_event_listener_callback} The event listener callback for details on the callback itself.
 */
export function one (target: EventTarget, types: string, listener: EventListenerOrEventListenerObject | null, useCapture?: boolean): EventListenerOrEventListenerObject | null | undefined;


/**
 * Attach an event listener that will be called once whenever each of the specified event types are delivered to the given target.
 *
 * @param target - The target on which the event listener is attached.
 * @param types - A case-sensitive string representing the {@link https://developer.mozilla.org/en-US/docs/Web/Events|event type}s to listen for.
 * @param listener - The object that receives a notification (an object that implements the {@link https://developer.mozilla.org/en-US/docs/Web/API/Event|Event} interface) when an event of a specified type occurs. This must be an object implementing the {@link https://developer.mozilla.org/en-US/docs/Web/API/EventListener|EventListener} interface, or a function.
 * @param options - An {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters|options object} specifying characteristics about the event listener.
 *
 * @returns The provided listener when successfully attached; otherwise, `undefined`.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#the_event_listener_callback} The event listener callback for details on the callback itself.
 */
export function one (target: EventTarget, types: string, listener: EventListenerOrEventListenerObject | null, options: AddEventListenerOptions): EventListenerOrEventListenerObject | null | undefined;


/**
 * Attach an event listener that will be called once whenever each of the specified event types are delivered to the given node from specific descendants.
 *
 * @param node - The node on which the event listener is attached.
 * @param selector - A selector string to filter the descendants of the given node that trigger the event.
 * @param types - A case-sensitive string representing the {@link https://developer.mozilla.org/en-US/docs/Web/Events|event type}s to listen for.
 * @param listener - The object that receives a notification (an object that implements the {@link https://developer.mozilla.org/en-US/docs/Web/API/Event|Event} interface) when an event of a specified type occurs. This must be an object implementing the {@link https://developer.mozilla.org/en-US/docs/Web/API/EventListener|EventListener} interface, or a function.
 * @param useCapture - Whether or not events of these types will be dispatched to the registered listener before being dispatched to any target beneath it in the DOM tree.
 *
 * @returns The provided listener when successfully attached; otherwise, `undefined`.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#the_event_listener_callback} The event listener callback for details on the callback itself.
 */
export function one (node: Node, selector: string, types: string, listener: EventListenerOrEventListenerObject | null, useCapture?: boolean): EventListenerOrEventListenerObject | null | undefined;


/**
 * Attach an event listener that will be called once whenever each of the specified event types are delivered to the given node from specific descendants.
 *
 * @param node - The node on which the event listener is attached.
 * @param selector - A selector string to filter the descendants of the given node that trigger the event.
 * @param types - A case-sensitive string representing the {@link https://developer.mozilla.org/en-US/docs/Web/Events|event type}s to listen for.
 * @param listener - The object that receives a notification (an object that implements the {@link https://developer.mozilla.org/en-US/docs/Web/API/Event|Event} interface) when an event of a specified type occurs. This must be an object implementing the {@link https://developer.mozilla.org/en-US/docs/Web/API/EventListener|EventListener} interface, or a function.
 * @param options - An {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters|options object} specifying characteristics about the event listener.
 *
 * @returns The provided listener when successfully attached; otherwise, `undefined`.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#the_event_listener_callback} The event listener callback for details on the callback itself.
 */
export function one (node: Node, selector: string, types: string, listener: EventListenerOrEventListenerObject | null, options: AddEventListenerOptions): EventListenerOrEventListenerObject | null | undefined;


/**
 * @internal
 */
export function one (
	target: EventTarget,
	selector: string,
	types: string | EventListenerOrEventListenerObject | null,
	listener?: boolean | AddEventListenerOptions | EventListenerOrEventListenerObject | null,
	options?: boolean | AddEventListenerOptions
): EventListenerOrEventListenerObject | null | undefined {

	let augmenterKey: string | undefined = oneAugmenterKey;

	// When no delegate selector is provided, determine if once is supported natively.
	if (typeof types !== 'string') {
		if (isOnceSupported) {

			if (listener === undefined || typeof listener === 'boolean') {
				listener = {
					capture: listener
				};
			}

			(listener as AddEventListenerOptions).once = true;
			augmenterKey = undefined;
		}
	}

	return single(augmenterKey, target, selector, types, listener, options);

}
