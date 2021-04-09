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
