import { expect } from 'chai';
import Deck from '../src/deck';
import IDeck from '../src/interfaces/deck';

describe ('Deck', () => {
	let deck: IDeck;

	beforeEach(() => {
		deck = new Deck();
	})

	it ('has 52 cards', () => {
		expect(deck.cards.length).equal(52);
	});

	it ('can shuffle cards', () => {
		const cards = [...deck.cards];

		expect(deck.shuffle()).not.equal(cards);
	});

	it ('can pick top card', () => {
		const topCard = deck.cards[deck.cards.length - 1];

		expect(deck.take()).equal(topCard);
	});
});