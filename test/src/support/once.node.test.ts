/** @jest-environment node */ // eslint-disable-line tsdoc/syntax
// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { isOnceSupported } from '../../../src/support/once';

describe('Feature detection', () => {

	test('Once should not be supported by node environment', () => {
		expect(isOnceSupported).toBe(false);
	});

});
