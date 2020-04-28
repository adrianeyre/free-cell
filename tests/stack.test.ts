import { expect } from 'chai';
import Stack from '../src/stack';
import IStack from '../src/interfaces/stack';
import Card from '../src/card';
import ICard from '../src/interfaces/card';

describe ('Stack', () => {
	let stack: IStack;
	let card: ICard;

	beforeEach(() => {
		stack = new Stack({
			x: 1,
			y: 2,
			cascade: true,
			allowAdditionalCards: true,
		});

		card = new Card({
			suite: 'suite',
			value: 'value',
			cost: 5,
			colour: '#000',
			isBlack: true,
		});

		card.setX(1);
		card.setY(2);
	})

	it ('can add card', () => {
		expect(stack.cards.length).equal(0);
		stack.addCard(card);
		expect(stack.cards.length).equal(1);
		expect(stack.cards).to.deep.equal([card]);
	})

	it ('can find card', () => {
		stack.addCard(card);
		expect(stack.findCard(135, 2)).to.deep.equal([card]);
	})

	describe('cascade stack', () => {
		beforeEach(() => {
			stack = new Stack({
				x: 1,
				y: 2,
				cascade: true,
				allowAdditionalCards: true,
				isHomeSquare: false,
			});
		})

		it ('is valid when next card cost plus 1 and different colour suite', () => {
			const nextCard = new Card({
				suite: 'suite',
				value: 'value',
				cost: 6,
				colour: '#000',
				isBlack: false,
			});
	
			stack.addCard(card);
			expect(stack.isValidMove([card], nextCard)).equal(true);
		})

		it ('is invalid when next card cost plus 1 and same colour suite', () => {
			const nextCard = new Card({
				suite: 'suite',
				value: 'value',
				cost: 6,
				colour: '#000',
				isBlack: true,
			});
	
			stack.addCard(card);
			expect(stack.isValidMove([card], nextCard)).equal(false);
		})

		it ('is invalid when next card cost plus 2 and different colour suite', () => {
			const nextCard = new Card({
				suite: 'suite',
				value: 'value',
				cost: 7,
				colour: '#000',
				isBlack: false,
			});
	
			stack.addCard(card);
			expect(stack.isValidMove([card], nextCard)).equal(false);
		})
	})

	describe('home stack', () => {
		beforeEach(() => {
			stack = new Stack({
				x: 1,
				y: 2,
				cascade: false,
				allowAdditionalCards: true,
				isHomeSquare: true,
			});
		})

		it ('is valid to place ace on empty home stack', () => {
			const ace = new Card({
				suite: 'suite',
				value: 'value',
				cost: 1,
				colour: '#000',
				isBlack: true,
			});
	
			expect(stack.isValidMove([ace])).equal(true);
		})

		it ('is valid when next card cost plus 1 and same suite', () => {
			const nextCard = new Card({
				suite: 'suite',
				value: 'value',
				cost: 6,
				colour: '#000',
				isBlack: true,
			});
	
			stack.addCard(card);
			expect(stack.isValidMove([nextCard])).equal(true);
		})

		it ('is invalid when next card cost plus 1 and different suite', () => {
			const nextCard = new Card({
				suite: 'different',
				value: 'value',
				cost: 6,
				colour: '#000',
				isBlack: true,
			});
	
			stack.addCard(card);
			expect(stack.isValidMove([nextCard])).equal(false);
		})

		it ('is invalid when next card cost plus 2 and same suite', () => {
			const nextCard = new Card({
				suite: 'suite',
				value: 'value',
				cost: 7,
				colour: '#000',
				isBlack: true,
			});
	
			stack.addCard(card);
			expect(stack.isValidMove([nextCard])).equal(false);
		})
	})

	describe('addition stack', () => {
		beforeEach(() => {
			stack = new Stack({
				x: 1,
				y: 2,
				cascade: false,
				allowAdditionalCards: false,
				isHomeSquare: false,
			});
		})

		it ('is valid to place a card on empty addition stack', () => {
			const ace = new Card({
				suite: 'suite',
				value: 'value',
				cost: 1,
				colour: '#000',
				isBlack: true,
			});
	
			expect(stack.isValidMove([ace])).equal(true);
		})

		it ('is invalid to place a card on stack that has a card on it', () => {
			const ace = new Card({
				suite: 'suite',
				value: 'value',
				cost: 1,
				colour: '#000',
				isBlack: true,
			});
	
			stack.addCard(card);
			expect(stack.isValidMove([ace])).equal(false);
		})
	});
})
