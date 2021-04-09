// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //


/**
 * Generates a unique key for the options which influence uniqueness.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener#matching_event_listeners_for_removal}
 */
export function generateOptionsKey (options?: boolean | AddEventListenerOptions): boolean {
	return typeof options === 'boolean'
		? options
		: options !== undefined && !!options.capture;
}
