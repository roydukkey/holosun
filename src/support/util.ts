// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //


/**
 * Separate string of event types into an array.
 *
 * @param types - A case-sensitive string of types to separate.
 */
export function separateTypes (types: string): string[] {
	return types.match(/[^\x20\t\r\n\f]+/g)?.filter((type, index, types) => types.indexOf(type) === index) ?? [];
}


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
