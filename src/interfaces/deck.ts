import ICard from './card';

export default interface IDeck {
	cards: ICard[]
	shuffle(): ICard[];
	take(): ICard;
}