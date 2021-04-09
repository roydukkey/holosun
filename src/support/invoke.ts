// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //


export function invoke (listener: EventListenerOrEventListenerObject | null, target: EventTarget, event: Event): void {
	if (typeof listener === 'function') {
		listener.call(target, event);
	}
	else {
		listener?.handleEvent(event);
	}
}
