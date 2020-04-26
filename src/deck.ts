import IDeck from './interfaces/deck';
import ICard from './interfaces/card'
import Card from './card';

export default class Deck implements IDeck {
	private readonly CARD_COLOUR = ['#000', '#000', '#FF0000', '#FF0000'];
	private readonly CARD_SUITES = [9824, 9827, 9829, 9830];

	public cards: ICard[];

	constructor() {
		this.cards = [];

		for (let suiteIndex = 1; suiteIndex <= 4; suiteIndex ++) {
			for (let valueIndex = 1; valueIndex <= 13; valueIndex ++) {
				const suite = String.fromCharCode(this.CARD_SUITES[suiteIndex - 1]);
				const value = valueIndex > 10 ? 'JQK'[valueIndex - 11] : valueIndex === 1 ? 'A' : valueIndex.toString();
				const colour = this.CARD_COLOUR[suiteIndex - 1];

				this.cards.push(new Card({ suite, value, colour, cost: valueIndex, isBlack: suiteIndex < 3 }));
			}
		}
	}

	public shuffle = (): ICard[] => this.cards = this.cards.sort(() => Math.random() - 0.5);

	public take = (): ICard => this.cards.pop() || new Card({ suite: '', value: '', colour: '', cost: 0, isBlack: false });
}