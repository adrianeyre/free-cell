import IGame from './interfaces/game';
import IDeck from './interfaces/deck';
import IStack from './interfaces/stack';
import ICard from './interfaces/card';
import ICanvas from './interfaces/canvas';
import IHand from './interfaces/hand';
import Deck from './deck';
import Stack from './stack';
import Canvas from './canvas';
import Hand from './hand';

export default class Game implements IGame {
	private deck: IDeck;
	private stacks: IStack[];
	private canvas: ICanvas;
	private hand: IHand;
	private moves: number = 0;
	private gameInPlay: boolean = true;

	private readonly cascadeStacks = 8;

	constructor() {
		this.canvas = new Canvas({ height: 800, width: 700 });
		this.deck = new Deck();
		this.hand = new Hand();
		this.stacks = [
			new Stack({ x: 0, y: 250, cascade: true, allowAdditionalCards: true }), new Stack({ x: 1, y: 250, cascade: true, allowAdditionalCards: true }),
			new Stack({ x: 2, y: 250, cascade: true, allowAdditionalCards: true }), new Stack({ x: 3, y: 250, cascade: true, allowAdditionalCards: true }),
			new Stack({ x: 4, y: 250, cascade: true, allowAdditionalCards: true }), new Stack({ x: 5, y: 250, cascade: true, allowAdditionalCards: true }),
			new Stack({ x: 6, y: 250, cascade: true, allowAdditionalCards: true }), new Stack({ x: 7, y: 250, cascade: true, allowAdditionalCards: true }),
			new Stack({ x: 0, y: 100, cascade: false, allowAdditionalCards: false }), new Stack({ x: 1, y: 100, cascade: false, allowAdditionalCards: false }),
			new Stack({ x: 2, y: 100, cascade: false, allowAdditionalCards: false }), new Stack({ x: 3, y: 100, cascade: false, allowAdditionalCards: false }),
			new Stack({ x: 4, y: 100, cascade: false, allowAdditionalCards: true, isHomeSquare: true }), new Stack({ x: 5, y: 100, cascade: false, allowAdditionalCards: true, isHomeSquare: true }),
			new Stack({ x: 6, y: 100, cascade: false, allowAdditionalCards: true, isHomeSquare: true }), new Stack({ x: 7, y: 100, cascade: false, allowAdditionalCards: true, isHomeSquare: true })
		];
	}

	public play = (): void => {
		this.setupDeck();
		this.setupCanvas();
	}

	private setupDeck = (): void => {
		this.deck.shuffle();

		this.deck.cards.forEach((card: ICard, cardIndex: number) => {
			const stackIndex = cardIndex % this.cascadeStacks;
			this.stacks[stackIndex].addCard(card);
		});
	}

	private setupCanvas = (): void => {
		this.drawCards();

		const canvas = document.getElementById('canvas');
		if (!canvas) throw Error('canvas not found!');
		canvas.addEventListener('mousedown', this.onMouseDown);
		canvas.addEventListener('mouseup', this.onMouseUp);
		canvas.addEventListener('mousemove', this.onMouseMove);

		this.canvas.publish();
	}

	private onMouseDown = (event: MouseEvent): void => {
		if (!this.gameInPlay) return;

		let cards: ICard[] | undefined;
		this.stacks.forEach((stack: IStack, stackIndex: number) => {
			cards = stack.findCard(event.x, event.y);

			if (cards) {
				this.hand.pick(cards);
				this.hand.lastStackIndex = stackIndex;
				return;
			}
		});
	}

	private onMouseUp = (event: MouseEvent): void => {
		if (!this.gameInPlay) return;

		const stack = this.stacks.find((currentStack: IStack) => event.x >= currentStack.x - 28 && event.x <= currentStack.x + 28 && event.y >= currentStack.y - 53);
		let stackIndex = stack ? this.stacks.indexOf(stack) : this.hand.lastStackIndex;
		const isValidMove = this.stacks[stackIndex].isValidMove(this.hand.cards);

		const stackToMove = isValidMove ? this.stacks[stackIndex] : this.stacks[this.hand.lastStackIndex];
		this.hand.cards.forEach((card: ICard) => stackToMove.addCard(card));

		if (isValidMove) this.moves ++;
		this.hand.drop();

		const isWon = this.stacks.filter((stack: IStack) => stack.isHomeSquare && stack.cards.length > 12).length > 3;
		this.gameInPlay = !isWon;
		if (!this.gameInPlay) this.gameWon();
	}

	private gameWon = (): void => {
		this.canvas.clear();
		this.canvas.drawWon(this.moves);
		this.canvas.publish();
	}

	private onMouseMove = (event: MouseEvent) => {
		if (!this.gameInPlay) return;

		this.hand.cards.forEach((card: ICard, cardIndex: number) => {
			card.x = event.x;
			card.y = event.y + cardIndex * 40;
		});

		this.drawCards();
	}

	private drawCards = (): void => {
		this.canvas.clear();

		this.stacks.forEach((stack: IStack) => {
			this.canvas.drawBlank(stack.x, stack.y, !stack.isHomeSquare)
			stack.cards.forEach((card: ICard) => {
				this.canvas.drawCard(card, card.x, card.y);
			})
		})

		this.hand.cards.forEach((card: ICard) => this.canvas.drawCard(card, card.x, card.y));
		this.canvas.displayMoves(this.moves);
		if (!this.gameInPlay) this.canvas.drawWon(this.moves);
		this.canvas.publish();
	}
}