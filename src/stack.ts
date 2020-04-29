import IStack from './interfaces/stack';
import IStackProps from './interfaces/stack-props';
import ICard from './interfaces/card';

export default class Stack implements IStack {
	private cascade: boolean;
	private allowAdditionalCards: boolean;
	
	public cards: ICard[];
	public x: number;
	public y: number;
	public isHomeSquare: boolean;

	constructor(props: IStackProps) {
		this.cards = [];
		this.x = props.x;
		this.y = props.y;
		this.cascade = props.cascade;
		this.allowAdditionalCards = props.allowAdditionalCards;
		this.isHomeSquare = props.isHomeSquare || false;
	}

	public addCard = (card: ICard): void => {
		card.setX(this.x);
		card.setY(this.cascade ? this.cards.length * 40 + this.y : this.y);
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

	public isValidMove = (currentCards: ICard[], nextCard: ICard = this.cards[this.cards.length - 1]): boolean => {
		if (!currentCards.length) return false;

		const currentCard = currentCards[0];

		if (this.isHomeSquare) {
			return (this.isStackEmpty() && this.isCardAce(currentCard)) ||
			(this.isSuiteSame(currentCard, nextCard) && this.isCostOneMore(currentCard, nextCard))
		}

		const isAllowedToAddMoreThanOne = this.allowAdditionalCards ? this.allowAdditionalCards : currentCards.length === 1;

		return (this.isStackEmpty() && isAllowedToAddMoreThanOne) ||
		((this.isCardsInStack() && isAllowedToAddMoreThanOne) &&
		(this.isSuiteDifferentColour(currentCard, nextCard) && this.isCostOneLess(currentCard, nextCard)));
	}

	private isSuiteDifferentColour = (currentCard: ICard, nextCard: ICard): boolean => currentCard?.isBlack !== nextCard?.isBlack;
	private isSuiteSame = (currentCard: ICard, nextCard: ICard): boolean => currentCard?.suite === nextCard?.suite;
	private isCostOneLess = (currentCard: ICard, nextCard: ICard): boolean => currentCard?.cost === nextCard?.cost - 1;
	private isCostOneMore = (currentCard: ICard, nextCard: ICard): boolean => currentCard?.cost === nextCard?.cost + 1;
	private isCardAce = (currentCard: ICard): boolean => currentCard.cost === 1;
	private isStackEmpty = (): boolean => this.cards.length === 0;
	private isCardsInStack = (): boolean => this.cards.length > 0;
	private isAllowedToAddMoreThanOne = (): boolean => this.allowAdditionalCards;
}