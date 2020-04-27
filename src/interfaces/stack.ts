import ICard from './card';

export default interface IStack {
	cards: ICard[];
	x: number;
	y: number;
	isHomeSquare: boolean
	addCard(card: ICard): void;
	findCard(x: number, y: number): ICard[] | undefined;
	isValidMove(currentCards: ICard[], nextCard?: ICard): boolean;
}
