// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { separateTypes } from './support/type';


/**
 * Executes all listeners attached to the given target for the specified event types.
 *
 * @param target - The target on which the specified events are executed.
 * @param types - A case-sensitive string representing the {@link https://developer.mozilla.org/en-US/docs/Web/Events|event type}s to execute.
 * @param options - An {@link https://developer.mozilla.org/en-US/docs/Web/API/Event/Event#values|options object} specifying characteristics about the triggered event.
 *
 * @returns A list of tuples, where the first value is the event type and the second is `true`; unless the event is cancelable and at least one of the event listeners which received the event called {@link https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault|`Event.preventDefault()`}, the second value is `false`.
 */
export function trigger (target: EventTarget, types: string, options?: EventInit): Array<[string, boolean]> {
	return separateTypes(types).map((type) => [
		type,
		target.dispatchEvent(new Event(type, options))
	]);
}
