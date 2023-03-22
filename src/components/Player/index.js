import {
	cnv,
	currPlayer,
	FieldSize,
	gameOver,
	setCurrPlayer
} from "../../App.js"


export class Player {
	constructor(sym) {
		this.symbol = sym
		this.oponentSymbol = (this.symbol === "x") ? "o" : "x"
		this.scores = {
			[this.symbol]: 100,
			[this.oponentSymbol]: -100,
			"draw": 0
		}
	}


	move(board, AI) {
		return (ev) => {
			const { x, y } = cnv.getBoundingClientRect()
			const mouthClickX = ev.x - x
			const mouthClickY = ev.y - y

			const i = Math.min(3, Math.floor(mouthClickY / FieldSize))
			const j = Math.min(3, Math.floor(mouthClickX / FieldSize))
			if (board.state?.[i]?.[j] || !!board.isWin() || currPlayer !== this.symbol) return
			setCurrPlayer(this.oponentSymbol)

			const X = Math.floor(mouthClickX / FieldSize) * FieldSize
			const Y = Math.floor(mouthClickY / FieldSize) * FieldSize

			board.insert(this.symbol, i, j)
			board.drawSymbol(this.symbol, i, j, X, Y)

			const res = board.isWin()
			if (res) gameOver(res)
			setTimeout(AI.move(board), 250)
		}
	}
}