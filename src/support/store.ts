// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { generateOptionsKey, separateTypes } from './util';


// We need to be able to track that listener's w/o augmenters have been added.
// Without this, a listener w/ an augmenter adds all the same base data as a listener w/o an augmenter,
// thus making it impossible to tell if a listener w/o an augmenter has been previously added.
export const defaultAugmenterKey = '$';


/**
 * \{
 *   $target: \{
 *     $type: \{
 *       $listener: \{
 *         $optionsKey: \{
 *           $selector: \{
 *             augmenterKey: $augmenter
 *           \}
 *         \}
 *       \}
 *     \}
 *   \}
 * \}
 */
export const store: TargetMap = new WeakMap();


interface TargetMap extends WeakMap<EventTarget, TypeMap> { }
interface TypeMap extends Map<string, ListenerMap> { }
interface ListenerMap extends Map<EventListenerOrEventListenerObject | null, OptionsMap> { }
interface OptionsMap extends Map<boolean, SelectorMap> { }
interface SelectorMap extends Map<string | null, AugmenterMap> { }
interface AugmenterMap extends Map<string, EventListener | null> { }


/**
 * Add an event listener appropriately to the target when determined to be unique.
 *
 * @param target - The target on which the event listener is attached.
 * @param selector - A selector string used with component augmenter.
 * @param $types - A case-sensitive string representing the types to listen for.
 * @param listener - The object that receives a notification (an object that implements the Event interface) when an event of a specified type occurs. This must be an object implementing the EventListener interface, or a function.
 * @param augmenterKey - The key which identifies the augmenter. ie. delegate, once, etc.
 * @param augmenter - The event listener which encapsulate the original, providing additional functionality before dispatching events to the original listener.
 * @param options - A boolean or options object specifying characteristics about the event listener.
 */
export function add (target: EventTarget, selector: string | null, $types: string, listener: EventListenerOrEventListenerObject | null, augmenterKey: string, augmenter: EventListener | null, options?: boolean | AddEventListenerOptions): boolean {
	const types = separateTypes($types);
	let result = false;

	if (types.length) {
		const optionsKey = generateOptionsKey(options);

		// Add new target
		if (!store.has(target)) {
			store.set(target, new Map());
		}

		const typeStore = store.get(target) as TypeMap;

		types.forEach((type) => {
			// Add new type
			if (!typeStore.has(type)) {
				typeStore.set(type, new Map());
			}

			const listenerStore = typeStore.get(type) as ListenerMap;

			// Add new type
			if (!listenerStore.has(listener)) {
				listenerStore.set(listener, new Map());
			}

			const optionsStore = listenerStore.get(listener) as OptionsMap;

			// Add new options
			if (!optionsStore.has(optionsKey)) {
				optionsStore.set(optionsKey, new Map());
			}

			const selectorStore = optionsStore.get(optionsKey) as SelectorMap;

			// Add new selector
			if (!selectorStore.has(selector)) {
				selectorStore.set(selector, new Map());
			}

			const augmenterStore = selectorStore.get(selector) as AugmenterMap;

			// Add new augmenter
			if (!augmenterStore.has(augmenterKey)) {
				augmenterStore.set(augmenterKey, augmenter);
				target.addEventListener(type, augmenter ?? listener, options);
				result = true;
			}
		});
	}

	return result;
}


/**
 * Remove an event listener appropriately from the target when previously added to store.
 *
 * @param target - The target on which the event listener is attached.
 * @param selector - A selector string used with component augmenter.
 * @param $types - A case-sensitive string representing the types to listen for.
 * @param listener - The object that receives a notification (an object that implements the Event interface) when an event of a specified type occurs. This must be an object implementing the EventListener interface, or a function.
 * @param augmenterKey - The key which identifies the augmenter. ie. delegate, once, etc.
 * @param options - A boolean or options object specifying characteristics about the event listener.
 */
export function remove (target: EventTarget, selector: string | null, $types: string, listener?: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions, augmenterKey?: string): boolean {
	let result = false;
	const types = separateTypes($types);

	if (types.length) {

		const typeStore = store.get(target);

		if (typeStore) {
			const optionsKey = generateOptionsKey(options);

			types.forEach((type) => {
				const listenerStore = typeStore.get(type);

				if (listenerStore) {

					listenerStore.forEach((optionsStore, $listener) => {

						// No listener provided or provided listener
						if (listener === undefined || listener === $listener) {
							const selectorStore = optionsStore.get(optionsKey) as SelectorMap;
							const augmenterStore = selectorStore.get(selector) as AugmenterMap;

							augmenterStore.forEach((augmenter, $augmenterKey) => {
								if (augmenterKey === undefined || augmenterKey === $augmenterKey) {
									result = true;
									target.removeEventListener(type, augmenter ?? $listener, options);
									augmenterStore.delete($augmenterKey);
								}
							});

							// Delete selector when empty
							if (!augmenterStore.size) {
								selectorStore.delete(selector);
							}

							// Delete options when empty
							if (!selectorStore.size) {
								optionsStore.delete(optionsKey);
							}

							// Delete listener when empty
							if (!optionsStore.size) {
								listenerStore.delete($listener);
							}
						}

					});

					// Delete type when empty
					if (!listenerStore.size) {
						typeStore.delete(type);
					}

				}
			});

			// Delete target when empty
			if (!typeStore.size) {
				store.delete(target);
			}
		}

	}

	return result;
}
