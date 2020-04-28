import { expect } from 'chai';
import Hand from '../src/hand';
import IHand from '../src/interfaces/hand';
import Card from '../src/card';
import ICard from '../src/interfaces/card';

describe ('Hand', () => {
	let hand: IHand;
	let card: ICard;

	beforeEach(() => {
		hand = new Hand();

		card = new Card({
			suite: 'suite',
			value: 'value',
			cost: 1,
			colour: '#000',
			isBlack: true,
		});
	})

	it ('can create hand object', () => {
		expect(hand.cards.length).equal(0);
		expect(hand.lastStackIndex).equal(-1);
	})

	it ('can pick up cards', () => {
		expect(hand.pick([card])).to.deep.equal([card]);
	});

	it ('can drop all cards', () => {
		expect(hand.pick([card])).to.deep.equal([card]);
		expect(hand.drop()).to.deep.equal([]);
	});
});