import ICard from './card';

export default interface IHand {
	cards: ICard[];
	lastStackIndex: number
	pick(card: ICard[]): ICard[];
	drop(): ICard[];
}