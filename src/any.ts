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
 * @param useCaptureOrOptions - A Boolean indicating whether events of these types will be dispatched to the registered listener before being dispatched to any target beneath it in the DOM tree; or an {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters|options object} specifying characteristics about the event listener.
 *
 * @returns The provided listener when successfully attached; otherwise, `undefined`.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#the_event_listener_callback} The event listener callback for details on the callback itself.
 */
export function any <T extends EventTarget, E extends Event, R> (
	target: T,
	types: string,
	listener: (this: T, event: E) => R,
	useCaptureOrOptions?: boolean | AddEventListenerOptions
): typeof listener | undefined;


/**
 * Attach an event listener that will be called once whenever any of the specified event types are delivered to the given target.
 *
 * @param target - The target on which the event listener is attached.
 * @param types - A case-sensitive string representing the {@link https://developer.mozilla.org/en-US/docs/Web/Events|event type}s to listen for.
 * @param listener - The object that receives a notification (an object that implements the {@link https://developer.mozilla.org/en-US/docs/Web/API/Event|Event} interface) when an event of a specified type occurs. This must be an object implementing the {@link https://developer.mozilla.org/en-US/docs/Web/API/EventListener|EventListener} interface, or a function.
 * @param useCaptureOrOptions - A Boolean indicating whether events of these types will be dispatched to the registered listener before being dispatched to any target beneath it in the DOM tree; or an {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters|options object} specifying characteristics about the event listener.
 *
 * @returns The provided listener when successfully attached; otherwise, `undefined`.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#the_event_listener_callback} The event listener callback for details on the callback itself.
 */
export function any <T extends EventTarget, L extends EventListenerObject | null> (
	target: T,
	types: string,
	listener: L,
	useCaptureOrOptions?: boolean | AddEventListenerOptions
): L | undefined;


/**
 * Attach an event listener that will be called once whenever any of the specified event types are delivered to the given node from specific descendants.
 *
 * @param node - The node on which the event listener is attached.
 * @param selector - A selector string to filter the descendants of the given node that trigger the event.
 * @param types - A case-sensitive string representing the {@link https://developer.mozilla.org/en-US/docs/Web/Events|event type}s to listen for.
 * @param listener - The object that receives a notification (an object that implements the {@link https://developer.mozilla.org/en-US/docs/Web/API/Event|Event} interface) when an event of a specified type occurs. This must be an object implementing the {@link https://developer.mozilla.org/en-US/docs/Web/API/EventListener|EventListener} interface, or a function.
 * @param useCaptureOrOptions - A Boolean indicating whether events of these types will be dispatched to the registered listener before being dispatched to any target beneath it in the DOM tree; or an {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters|options object} specifying characteristics about the event listener.
 *
 * @returns The provided listener when successfully attached; otherwise, `undefined`.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#the_event_listener_callback} The event listener callback for details on the callback itself.
 */
export function any <T extends Node, E extends Event, R> (
	node: T,
	selector: string,
	types: string,
	listener: (this: T, event: E) => R,
	useCaptureOrOptions?: boolean | AddEventListenerOptions
): typeof listener | undefined;


/**
 * Attach an event listener that will be called once whenever any of the specified event types are delivered to the given node from specific descendants.
 *
 * @param node - The node on which the event listener is attached.
 * @param selector - A selector string to filter the descendants of the given node that trigger the event.
 * @param types - A case-sensitive string representing the {@link https://developer.mozilla.org/en-US/docs/Web/Events|event type}s to listen for.
 * @param listener - The object that receives a notification (an object that implements the {@link https://developer.mozilla.org/en-US/docs/Web/API/Event|Event} interface) when an event of a specified type occurs. This must be an object implementing the {@link https://developer.mozilla.org/en-US/docs/Web/API/EventListener|EventListener} interface, or a function.
 * @param useCaptureOrOptions - A Boolean indicating whether events of these types will be dispatched to the registered listener before being dispatched to any target beneath it in the DOM tree; or an {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters|options object} specifying characteristics about the event listener.
 *
 * @returns The provided listener when successfully attached; otherwise, `undefined`.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#the_event_listener_callback} The event listener callback for details on the callback itself.
 */
export function any <T extends Node, L extends EventListenerObject | null> (
	node: T,
	selector: string,
	types: string,
	listener: L,
	useCaptureOrOptions?: boolean | AddEventListenerOptions
): L | undefined;


/**
 * Attach an event listener that will be called once whenever any of the specified event types are delivered to the given target or node.
 *
 * @remarks
 * These ambiguous signatures enable other libraries to forward configuration up the chain without branching logic.
 */
export function any <T extends EventTarget, E extends Event, R> (
	targetOrNode: T,
	selector: string | null,
	types: string,
	listener: (this: T, event: E) => R,
	useCaptureOrOptions?: boolean | AddEventListenerOptions
): typeof listener | undefined;


export function any <T extends EventTarget, L extends EventListenerObject | null> (
	targetOrNode: T,
	selector: string | null,
	types: string,
	listener: L,
	useCaptureOrOptions?: boolean | AddEventListenerOptions
): L | undefined;


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
