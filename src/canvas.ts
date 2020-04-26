import ICanvas from './interfaces/canvas';
import ICanvasProps from './interfaces/canvas-props';
import ICard from './interfaces/card';

export default class Canvas implements ICanvas {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D | null;

	private readonly DEFAULT_BACKGROUND_COLOUR = '#88CDEB';
	private readonly DEFAULT_CARD_BACKGROUND_COLOUR = '#000';
	private readonly DEFAULT_CARD_OUTLINE_COLOUR = '#FFF';
	private readonly DEFAULT_CARD_BACKGROUND = String.fromCharCode(9608);

	constructor(props: ICanvasProps) {
		this.canvas = document.createElement('canvas');
		this.canvas.id = 'canvas';
		this.canvas.width = props.width;
		this.canvas.height = props.height;
		this.canvas.style.backgroundColor = props.backgroundColour ? props.backgroundColour : this.DEFAULT_BACKGROUND_COLOUR;

		this.ctx = this.canvas.getContext('2d');
	}

	public drawCard = (card: ICard, x: number, y: number): void => {
		if (!this.ctx) return;

		this.drawText(x, y , 99, this.DEFAULT_CARD_BACKGROUND_COLOUR, this.DEFAULT_CARD_BACKGROUND);
		this.drawText(x , y, 95, this.DEFAULT_CARD_OUTLINE_COLOUR, this.DEFAULT_CARD_BACKGROUND);
		this.drawText(x - 20, y - 42, 26, card.colour, card.value);
		this.drawText(x + 20, y + 42, 26, card.colour, card.value);
		this.drawText(x, y, 90, card.colour, card.suite);
	}

	public publish = (): HTMLCanvasElement => document.body.appendChild(this.canvas);

	public clear = (): void | null => this.ctx ? this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) : null;

	public displayMoves = (moves: number): void => {
		if (!this.ctx) return;

		this.ctx.font = `20px arial`;
		this.ctx.fillStyle = '#000';
		this.ctx.fillText(`Moves: ${ moves }`, 50, 20);
	}

	private drawText = (x: number, y: number, size: number, colour: string, text: string): void => {
		if (!this.ctx) return;

		this.ctx.textAlign = 'center';
		this.ctx.textBaseline = 'middle';
		this.ctx.font = `${ size }px arial`;
		this.ctx.fillStyle = colour;
		this.ctx.fillText(text, x, y);
	}
}