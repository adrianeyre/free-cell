import { expect } from 'chai';
import Card from '../src/card';

describe('Card', () => {
	it('can create card object', () => {
		const card = new Card({
			suite: 'suite',
			value: 'value',
			cost: 1,
			colour: '#000',
			isBlack: true,
		});

		expect(card.suite).equal('suite');
		expect(card.value).equal('value');
		expect(card.cost).equal(1);
		expect(card.colour).equal('#000');
		expect(card.isBlack).equal(true);
	}); 
});
