import IStack from './interfaces/stack';
import ICard from './interfaces/card';

export default class Stack implements IStack {
	public cards: ICard[];
	public x: number;

	constructor(index: number) {
		this.cards = [];
		this.x = index * 85 + 50;
	}

	public addCard = (card: ICard): void => {
		card.x = this.x;
		card.y = this.cards.length * 40 + 210;
		this.cards.push(card);
	}

	public findCard = (x: number, y: number): ICard[] | undefined => {
		const cards = this.cards.filter((card: ICard) => x >= card.x - 28 && x <= card.x + 28 && y >= card.y - 53 && y <= card.y + 53);
		if (!cards.length) return;

		const card = cards.pop();
		if (!card) throw Error('Card not found!');

		const cardIndex = this.cards.indexOf(card);
		const returnedCard = [card];
		let currentCost = card.cost - 1;
		let currentIsBlack = card.isBlack;

		for (let index = cardIndex + 1; index < this.cards.length; index ++) {
			const currentCard = this.cards[index]
			if (currentCard.cost !== currentCost || currentCard.isBlack === currentIsBlack) return;

			returnedCard.push(currentCard);
			currentCost --;
			currentIsBlack = currentCard.isBlack;
		}

		this.cards = this.cards.slice(0, -returnedCard.length);

		return returnedCard;
	}

	public isValidMove = (currentCard: ICard, nextCard: ICard = this.cards[this.cards.length - 1]): boolean => currentCard?.isBlack !== nextCard?.isBlack && currentCard?.cost === nextCard?.cost - 1;
}