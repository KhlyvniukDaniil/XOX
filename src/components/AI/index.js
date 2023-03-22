import {
	cnv,
	currPlayer,
	FieldSize,
	gameOver,
	setCurrPlayer
} from "../../App.js"
import { Player } from "../Player/index.js"


export class AI extends Player {
	constructor(...args) {
		super(...args)
	}

	minimax(board, depth, isMaximizing) {
		const result = board.isWin()
		if (result !== null) {
			switch (result.winner) {
				case "x":
					return this.scores[result.winner] - depth
				case "o":
					return this.scores[result.winner] + depth
				default:
					return 0
			}
		} else {
			if (isMaximizing) {
				let bestScore = -100
				for (let i = 0; i < 3; i++) {
					for (let j = 0; j < 3; j++) {
						if (board.state[i][j] === "") {
							board.state[i][j] = this.symbol
							let score = this.minimax(board, depth + 1, false)
							board.state[i][j] = ""

							if (score > bestScore) {
								bestScore = score
							}
						}
					}
				}
				return bestScore
			} else {
				let bestScore = 100
				for (let i = 0; i < 3; i++) {
					for (let j = 0; j < 3; j++) {
						if (board.state[i][j] === "") {
							board.state[i][j] = this.oponentSymbol
							let score = this.minimax(board, depth + 1, true)
							board.state[i][j] = ""
							if (score < bestScore) {
								bestScore = score
							}
						}
					}
				}
				return bestScore
			}
		}
	}

	getBestMove(board) {
		let bestScore = -100
		let move
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board.state[i][j] === "") {
					board.state[i][j] = this.symbol
					let score = this.minimax(board, 0, false)
					board.state[i][j] = ""
					if (score > bestScore) {
						bestScore = score
						move = [ i, j ]
					}
				}
			}
		}
		return move
	}


	initMove(board, { i, j, X, Y }) {
		return () => {
			board.insert(this.symbol, i, j)
			board.drawSymbol(this.symbol, i, j, X, Y)
			cnv.style.cursor = "pointer"
			const res = board.isWin()
			if (res) gameOver(res)
		}
	}

	move(board) {
		return () => {
			const [ i, j ] = this.getBestMove(board) || []

			const X = FieldSize * j
			const Y = FieldSize * i
			if (board.state?.[i]?.[j] || !!board.isWin() || currPlayer !== this.symbol) return
			const position = { i, j, X, Y }

			cnv.style.cursor = "initial"
			setTimeout(this.initMove(board, position), 250)
			setCurrPlayer(this.oponentSymbol)
		}
	}
}