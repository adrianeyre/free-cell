import ICard from './card';

export default interface ICanvas {
	publish(): HTMLCanvasElement;
	clear(): void | null;
	drawWon(moves: number): void;
	drawBlank(x: number, y: number, showCardBackground: boolean): void;
	drawCard(card: ICard, x: number, y: number): void;
	displayMoves(moves: number): void;
}