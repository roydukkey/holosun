// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { remove } from './support/store';


/**
 * Detach all event listeners of the specified event types from the given target.
 *
 * @param target - The target from which the event listener is detached.
 * @param types - A case-sensitive string representing the {@link https://developer.mozilla.org/en-US/docs/Web/Events|event type}s to detach.
 *
 * @returns `true` when successfully detached at least one listener; otherwise, `false`.
 */
export function off (target: EventTarget, types: string): boolean;


/**
 * Detach an event listener of the specified event types from the given target.
 *
 * @param target - The target from which the event listener is detached.
 * @param types - A case-sensitive string representing the {@link https://developer.mozilla.org/en-US/docs/Web/Events|event type}s to detach.
 * @param listener - The {@link https://developer.mozilla.org/en-US/docs/Web/API/EventListener|event listener} to detach from the event target.
 * @param useCapture - Whether or not the EventListener to be detached is registered as a capturing listener.
 *
 * @returns `true` when successfully detached at least one listener; otherwise, `false`.
 */
export function off (target: EventTarget, types: string, listener: EventListenerOrEventListenerObject | null, useCapture?: boolean): boolean;


/**
 * Detach an event listener of the specified event types from the given target.
 *
 * @param target - The target from which the event listener is detached.
 * @param types - A case-sensitive string representing the {@link https://developer.mozilla.org/en-US/docs/Web/Events|event type}s to detach.
 * @param listener - The {@link https://developer.mozilla.org/en-US/docs/Web/API/EventListener|event listener} to detach from the event target.
 * @param options - An {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener#parameters|options object} specifying characteristics about the event listener.
 *
 * @returns `true` when successfully detached at least one listener; otherwise, `false`.
 */
export function off (target: EventTarget, types: string, listener: EventListenerOrEventListenerObject | null, options: EventListenerOptions): boolean;


/**
 * Detach all event listeners of the specified event types from the given node for the specified selector.
 *
 * @param node - The node from which the event listener is detached.
 * @param selector - A selector which should match the one used when attaching event listeners.
 * @param types - A case-sensitive string representing the {@link https://developer.mozilla.org/en-US/docs/Web/Events|event type}s to detach.
 *
 * @returns `true` when successfully detached at least one listener; otherwise, `false`.
 */
export function off (node: Node, selector: string, types: string): boolean;


/**
 * Detach an event listener of the specified event types from the given node for the specified selector.
 *
 * @param node - The node from which the event listener is detached.
 * @param selector - A selector which should match the one used when attaching event listeners.
 * @param types - A case-sensitive string representing the {@link https://developer.mozilla.org/en-US/docs/Web/Events|event type}s to detach.
 * @param listener - The {@link https://developer.mozilla.org/en-US/docs/Web/API/EventListener|event listener} to detach from the event target.
 * @param useCapture - Whether or not the EventListener to be detached is registered as a capturing listener.
 *
 * @returns `true` when successfully detached at least one listener; otherwise, `false`.
 */
export function off (node: Node, selector: string, types: string, listener: EventListenerOrEventListenerObject | null, useCapture?: boolean): boolean;


/**
 * Detach an event listener of the specified event types from the given node for the specified selector.
 *
 * @param node - The node from which the event listener is detached.
 * @param selector - A selector which should match the one used when attaching event listeners.
 * @param types - A case-sensitive string representing the {@link https://developer.mozilla.org/en-US/docs/Web/Events|event type}s to detach.
 * @param listener - The {@link https://developer.mozilla.org/en-US/docs/Web/API/EventListener|event listener} to detach from the event target.
 * @param options - An {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener#parameters|options object} specifying characteristics about the event listener.
 *
 * @returns `true` when successfully detached at least one listener; otherwise, `false`.
 */
export function off (node: Node, selector: string, types: string, listener: EventListenerOrEventListenerObject | null, options: EventListenerOptions): boolean;


/**
 * Detach event listeners of the specified event types from the given target or node.
 *
 * @remarks
 * This ambiguous signature enables other libraries to forward configuration up the chain without branching logic.
 */
export function off (targetOrNode: EventTarget, selector: string | null, types: string, listener?: EventListenerOrEventListenerObject | null, useCaptureOrOptions?: boolean | EventListenerOptions): boolean;


/**
 * @internal
 */
export function off (
	target: EventTarget,
	selector: string | null,
	types?: string | EventListenerOrEventListenerObject | null,
	listener?: boolean | EventListenerOptions | EventListenerOrEventListenerObject | null,
	options?: boolean | EventListenerOptions
): boolean {

	if (typeof types === 'string') {
		return remove(target, selector, types, listener as EventListenerOrEventListenerObject | null, options);
	}

	return remove(target, null, selector as string, types as EventListenerOrEventListenerObject | null, listener as EventListenerOptions | boolean | undefined);

}
