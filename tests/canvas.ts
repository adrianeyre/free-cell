import { expect } from 'chai';
import Canvas from '../src/canvas';

describe('Canvas', () => {
	it('can create canvas object', () => {
		const canvas = new Canvas({
			height: 100,
			width: 200,
		});
	}); 
});