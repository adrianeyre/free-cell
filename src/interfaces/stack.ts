import ICard from './card';

export default interface IStack {
	cards: ICard[];
	x: number;
	addCard(card: ICard): void;
	findCard(x: number, y: number): ICard[] | undefined;
	isValidMove(card: ICard, nextCard?: ICard): boolean;
}
