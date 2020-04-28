import { expect } from 'chai';
import Card from '../src/card';
import ICard from '../src/interfaces/card';

describe ('Card', () => {
	let card: ICard;

	beforeEach(() => {
		card = new Card({
			suite: 'suite',
			value: 'value',
			cost: 1,
			colour: '#000',
			isBlack: true,
		});
	})

	it ('can create card object', () => {
		expect(card.suite).equal('suite');
		expect(card.value).equal('value');
		expect(card.cost).equal(1);
		expect(card.colour).equal('#000');
		expect(card.isBlack).equal(true);
	});

	it ('can set x value', () => {
		const x = 99;

		expect(card.setX(x)).equal(x);
		expect(card.x).equal(x);
	});

	it ('can set y value', () => {
		const y = 99;

		expect(card.setY(y)).equal(y);
		expect(card.y).equal(y);
	});
});
