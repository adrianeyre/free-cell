import IHand from './interfaces/hand';
import ICard from './interfaces/card';

export default class Hand implements IHand {
	public cards: ICard[];
	public lastStackIndex: number = -1;

	constructor() {
		this.cards = [];
	}

	public pick = (cards: ICard[]): ICard[] => this.cards = cards;

	public drop = (): ICard[] => this.cards = [];
}