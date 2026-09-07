import { beforeEach, describe, expect, it } from 'vitest';
import Hand from '../src/hand';
import type IHand from '../src/interfaces/hand';
import Card from '../src/card';
import type ICard from '../src/interfaces/card';

describe('Hand', () => {
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
	});

	it('can create hand object', () => {
		expect(hand.cards.length).toBe(0);
		expect(hand.lastStackIndex).toBe(-1);
	});

	it('can pick up cards', () => {
		expect(hand.pick([card])).toEqual([card]);
	});

	it('can drop all cards', () => {
		expect(hand.pick([card])).toEqual([card]);
		expect(hand.drop()).toEqual([]);
	});
});
