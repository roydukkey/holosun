// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { anyAugmenterKey, single } from './support/single';


/**
 * Attach an event listener that will be called once whenever any of the specified event types are delivered to the given target.
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
export function any (target: EventTarget, types: string, listener: EventListenerOrEventListenerObject | null, useCapture?: boolean): EventListenerOrEventListenerObject | null | undefined;


/**
 * Attach an event listener that will be called once whenever any of the specified event types are delivered to the given target.
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
export function any (target: EventTarget, types: string, listener: EventListenerOrEventListenerObject | null, options: AddEventListenerOptions): EventListenerOrEventListenerObject | null | undefined;


/**
 * Attach an event listener that will be called once whenever any of the specified event types are delivered to the given node from specific descendants.
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
export function any (node: Node, selector: string, types: string, listener: EventListenerOrEventListenerObject | null, useCapture?: boolean): EventListenerOrEventListenerObject | null | undefined;


/**
 * Attach an event listener that will be called once whenever any of the specified event types are delivered to the given node from specific descendants.
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
export function any (node: Node, selector: string, types: string, listener: EventListenerOrEventListenerObject | null, options: AddEventListenerOptions): EventListenerOrEventListenerObject | null | undefined;


/**
 * Attach an event listener that will be called once whenever any of the specified event types are delivered to the given target or node.
 *
 * @remarks
 * This ambiguous signature enables other libraries to forward configuration up the chain without branching logic.
 */
export function any (
	targetOrNode: EventTarget,
	selector: string | null,
	types: string,
	listener: EventListenerOrEventListenerObject | null,
	useCaptureOrOptions?: boolean | AddEventListenerOptions
): EventListenerOrEventListenerObject | null | undefined;


/**
 * @internal
 */
export function any (
	target: EventTarget,
	selector: string | null,
	types: string | EventListenerOrEventListenerObject | null,
	listener?: boolean | AddEventListenerOptions | EventListenerOrEventListenerObject | null,
	options?: boolean | AddEventListenerOptions
): EventListenerOrEventListenerObject | null | undefined {
	return single(anyAugmenterKey, target, selector, types, listener, options);
}
