// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import type { EventMap } from './EventMap';
import { isOnceSupported } from './support/once';
import { oneAugmenterKey, single } from './support/single';


/**
 * Attach an event listener that will be called once whenever the specified event type is delivered to the given target.
 *
 * @param target - The target on which the event listener is attached.
 * @param type - A case-sensitive string representing the {@link https://developer.mozilla.org/en-US/docs/Web/Events|event type} to listen for.
 * @param listener - The object that receives a notification (an object that implements the {@link https://developer.mozilla.org/en-US/docs/Web/API/Event|Event} interface) when an event of a specified type occurs. This must be an object implementing the {@link https://developer.mozilla.org/en-US/docs/Web/API/EventListener|EventListener} interface, or a function.
 * @param useCaptureOrOptions - A Boolean indicating whether events of this type will be dispatched to the registered listener before being dispatched to any target beneath it in the DOM tree; or an {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters|options object} specifying characteristics about the event listener.
 *
 * @returns The provided listener when successfully attached; otherwise, `undefined`.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#the_event_listener_callback} The event listener callback for details on the callback itself.
 */
 export function one <T extends EventTarget, E extends keyof EventMap<T>, R> (
	target: T,
	type: E,
	listener: (this: T, event: EventMap<T>[E]) => R,
	useCaptureOrOptions?: boolean | AddEventListenerOptions
): typeof listener | undefined;


/**
 * Attach an event listener that will be called once whenever each of the specified event types are delivered to the given target.
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
export function one <T extends EventTarget, E extends Event, R> (
	target: T,
	types: string,
	listener: (this: T, event: E) => R,
	useCaptureOrOptions?: boolean | AddEventListenerOptions
): typeof listener | undefined;


/**
 * Attach an event listener that will be called once whenever each of the specified event types are delivered to the given target.
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
export function one <L extends EventListenerObject | null> (
	target: EventTarget,
	types: string,
	listener: L,
	useCaptureOrOptions?: boolean | AddEventListenerOptions
): L | undefined;


/**
 * Attach an event listener that will be called once whenever the specified event type is delivered to the given node from specific descendants.
 *
 * @param node - The node on which the event listener is attached.
 * @param selector - A selector string to filter the descendants of the given node that trigger the event.
 * @param type - A case-sensitive string representing the {@link https://developer.mozilla.org/en-US/docs/Web/Events|event type} to listen for.
 * @param listener - The object that receives a notification (an object that implements the {@link https://developer.mozilla.org/en-US/docs/Web/API/Event|Event} interface) when an event of a specified type occurs. This must be an object implementing the {@link https://developer.mozilla.org/en-US/docs/Web/API/EventListener|EventListener} interface, or a function.
 * @param useCaptureOrOptions - A Boolean indicating whether events of this type will be dispatched to the registered listener before being dispatched to any target beneath it in the DOM tree; or an {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters|options object} specifying characteristics about the event listener.
 *
 * @returns The provided listener when successfully attached; otherwise, `undefined`.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#the_event_listener_callback} The event listener callback for details on the callback itself.
 */
export function one <T extends Node, E extends keyof EventMap<T>, R> (
	node: T,
	selector: string,
	type: E,
	listener: (this: T, event: EventMap<T>[E]) => R,
	useCaptureOrOptions?: boolean | AddEventListenerOptions
): typeof listener | undefined;


/**
 * Attach an event listener that will be called once whenever each of the specified event types are delivered to the given node from specific descendants.
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
export function one <T extends Node, E extends Event, R> (
	node: T,
	selector: string,
	types: string,
	listener: (this: T, event: E) => R,
	useCaptureOrOptions?: boolean | AddEventListenerOptions
): typeof listener | undefined;


/**
 * Attach an event listener that will be called once whenever each of the specified event types are delivered to the given node from specific descendants.
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
export function one <L extends EventListenerObject | null> (
	node: Node,
	selector: string,
	types: string,
	listener: L,
	useCaptureOrOptions?: boolean | AddEventListenerOptions
): L | undefined;


/**
 * Attach an event listener that will be called once whenever the specified event type is delivered to the given target or node.
 *
 * @remarks
 * These ambiguous signatures enable other libraries to forward configuration up the chain without branching logic.
 */
export function one <T extends EventTarget, E extends keyof EventMap<T>, R> (
	targetOrNode: T,
	selector: string | null,
	type: E,
	listener: (this: T, event: EventMap<T>[E]) => R,
	useCaptureOrOptions?: boolean | AddEventListenerOptions
): typeof listener | undefined;


export function one <T extends EventTarget, E extends Event, R> (
	targetOrNode: T,
	selector: string | null,
	types: string,
	listener: (this: T, event: E) => R,
	useCaptureOrOptions?: boolean | AddEventListenerOptions
): typeof listener | undefined;


export function one <L extends EventListenerObject | null> (
	targetOrNode: EventTarget,
	selector: string | null,
	types: string,
	listener: L,
	useCaptureOrOptions?: boolean | AddEventListenerOptions
): L | undefined;


/**
 * @internal
 */
export function one (
	target: EventTarget,
	selector: string | null,
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
