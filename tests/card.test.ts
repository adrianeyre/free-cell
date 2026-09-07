import { beforeEach, describe, expect, it } from 'vitest';
import Card from '../src/card';
import type ICard from '../src/interfaces/card';

describe('Card', () => {
	let card: ICard;

	beforeEach(() => {
		card = new Card({
			suite: 'suite',
			value: 'value',
			cost: 1,
			colour: '#000',
			isBlack: true,
		});
	});

	it('can create card object', () => {
		expect(card.suite).toBe('suite');
		expect(card.value).toBe('value');
		expect(card.cost).toBe(1);
		expect(card.colour).toBe('#000');
		expect(card.isBlack).toBe(true);
	});

	it('can set x value', () => {
		const x = 99;

		expect(card.setX(x)).toBe(x);
		expect(card.x).toBe(x);
	});

	it('can set y value', () => {
		const y = 99;

		expect(card.setY(y)).toBe(y);
		expect(card.y).toBe(y);
	});
});
