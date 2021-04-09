// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { invoke } from './invoke';
import { add, defaultAugmenterKey } from './store';


const delegateAugmenterKey = 'D';


/**
 * Attach an event listener that will be called, directly or through the specified augmenter, whenever a specified event type is delivered to the given target.
 */
export function on (
	target: EventTarget,
	selector: string | null,
	types: string,
	listener: EventListenerOrEventListenerObject | null,
	options?: boolean | AddEventListenerOptions,
	augmenterKey?: string,
	augmenter?: EventListener | null
): EventListenerOrEventListenerObject | null | undefined {

	if (augmenterKey === undefined) {
		augmenterKey = selector ? delegateAugmenterKey : defaultAugmenterKey;
	}

	let delegateListener: EventListener | null = augmenter ?? null;

	if (selector) {

		delegateListener = function (this: EventTarget, event: Event): void {
			// Assertion assumes that since a `selector` has been provided, the `target` provided is a Node which must be traversable, thus the event target must provide an Element.
			let eventTarget: Element | null = event.target as Element;

			// Loop parent nodes from the event target to the delegation node.
			while (eventTarget && eventTarget !== this) {
				if (eventTarget.matches(selector)) {
					invoke(augmenter ?? listener, eventTarget, event);
				}

				eventTarget = eventTarget.parentElement;
			}
		};

	}

	return add(target, selector, types, listener, augmenterKey as string, delegateListener, options) ? listener : undefined;

}
