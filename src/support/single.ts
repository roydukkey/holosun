// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { invoke } from './invoke';
import { on } from './on';
import { remove } from './store';


export const anyAugmenterKey = 'A';
export const oneAugmenterKey = 'O';


/**
 * Attach an event listener that will be called once whenever each or any of the specified event types are delivered to the given target depending on the specified augmenter key.
 *
 * @param augmenterKey - When 'A' the listener will be detached for all events after one invocation. When 'O' the listener will be detached for each event after one invocation. When `undefined` the listener will be detached for each event after one invocation, using the browser's native once behavior.
 */
export function single (
	augmenterKey: string | undefined,
	target: EventTarget,
	$selector: string,
	$types: string | EventListenerOrEventListenerObject | null,
	$listener?: boolean | AddEventListenerOptions | EventListenerOrEventListenerObject | null,
	options?: boolean | AddEventListenerOptions
): EventListenerOrEventListenerObject | null | undefined {

	let types: string;
	let listener: EventListenerOrEventListenerObject | null;
	let selector: string | null = $selector;

	if (typeof $types === 'string') {
		types = $types;
		listener = $listener as EventListenerOrEventListenerObject | null;
	}

	else {
		options = $listener as boolean | AddEventListenerOptions | undefined;
		listener = $types as EventListenerOrEventListenerObject | null;
		types = $selector;
		selector = null;
	}

	const singleListener: EventListener | null = augmenterKey
		? function (this: EventTarget, event: Event): void {
			invoke(listener, this, event);
			remove(target, selector, augmenterKey === anyAugmenterKey ? types : event.type, listener, options, augmenterKey);
		}
		: null;

	return on(target, selector, types, listener, options, augmenterKey, singleListener);

}
