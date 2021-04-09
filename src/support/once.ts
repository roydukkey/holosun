// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //


export let isOnceSupported = false;


try {
  const options = {
    get once (): boolean {
      isOnceSupported = true;
      return false;
    }
  };

	self.addEventListener('_', null as never, options);
  self.removeEventListener('_', null as never, options as never);
}

catch (err: unknown) {
  isOnceSupported = false;
}


export const injectSupport = (value: boolean): void => {
	isOnceSupported = value;
};
