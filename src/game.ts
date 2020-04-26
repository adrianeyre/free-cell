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

	constructor() {
		this.canvas = new Canvas({ height: 800, width: 700 });
		this.deck = new Deck();
		this.hand = new Hand();
		this.stacks = [new Stack(0), new Stack(1), new Stack(2), new Stack(3), new Stack(4), new Stack(5), new Stack(6), new Stack(7)];
	}

	public play = (): void => {
		this.setupDeck();
		this.setupCanvas();
	}

	private setupDeck = (): void => {
		this.deck.shuffle();

		this.deck.cards.forEach((card: ICard, cardIndex: number) => {
			const stackIndex = cardIndex % this.stacks.length
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
		const stack = this.stacks.find((currentStack: IStack) => event.x >= currentStack.x - 28 && event.x <= currentStack.x + 28);
		let stackIndex = stack ? this.stacks.indexOf(stack) : this.hand.lastStackIndex;
		const isValidMove = this.stacks[stackIndex].isValidMove(this.hand.cards[0]);

		const stackToMove = isValidMove ? this.stacks[stackIndex] : this.stacks[this.hand.lastStackIndex];
		this.hand.cards.forEach((card: ICard) => stackToMove.addCard(card));

		if (isValidMove) this.moves ++;
		this.hand.drop();
	}

	private onMouseMove = (event: MouseEvent) => {
		this.hand.cards.forEach((card: ICard, cardIndex: number) => {
			card.x = event.x;
			card.y = event.y + cardIndex * 40;
		});

		this.drawCards();
	}

	private drawCards = (): void => {
		this.canvas.clear();

		this.stacks.forEach((stack: IStack) => {
			stack.cards.forEach((card: ICard) => {
				this.canvas.drawCard(card, card.x, card.y);
			})
		})

		this.hand.cards.forEach((card: ICard) => this.canvas.drawCard(card, card.x, card.y));
		this.canvas.displayMoves(this.moves);
		this.canvas.publish();
	}
}