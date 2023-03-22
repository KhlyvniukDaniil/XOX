import { AI } from "./components/AI/index.js"
import { Board } from "./components/Board/index.js"
import { initFirework, stopFirework } from "./components/Firework/index.js"
import { Modal } from "./components/Modal/index.js"
import { Player } from "./components/Player/index.js"


export const cnv = document.querySelector("#gameAria")
export const ctx = cnv.getContext("2d")
export const FieldSize = cnv.width / 3
export let currPlayer = "x"
export let AI_PLAYER = null
export let hu = null
export let board = null
export let drawAmim


export const newGame = (playerSymb) => {
	cnv.width = 600
	cnv.height = 600
	currPlayer = "x"
	cancelAnimationFrame(drawAmim)
	stopFirework()
	let aiSymb = playerSymb === "x" ? "o" : "x"

	AI_PLAYER = new AI(aiSymb)
	hu = new Player(playerSymb)
	board = new Board([
		[ "", "", "" ],
		[ "", "", "" ],
		[ "", "", "" ]
	])

	startGame(AI_PLAYER, hu, board)
}

const startGame = (AI, HU, board) => {
	requestAnimationFrame(board.draw)

	if (AI.symbol === "x") {
		setTimeout(AI.move(board), 1000)
		setTimeout(() => {
			cnv.style.cursor = "pointer"
			cnv.addEventListener("click", HU.move(board, AI))
		}, 1500)

	} else {
		cnv.style.cursor = "pointer"
		cnv.addEventListener("click", HU.move(board, AI))
	}
}

export const gameOver = ({ winner }) => {
	cnv.removeEventListener("click", hu.move(board))
	cnv.style.cursor = "initial"

	switch (winner) {
		case "draw":
			return setTimeout(gameOverDrawScreen, 600)
		default:
			return setTimeout(initFirework(winner), 600)
	}
}

const gameOverDrawScreen = () => {
	cnv.width = innerWidth
	cnv.height = innerHeight
	ctx.fillStyle = "#050505"
	ctx.fillRect(0, 0, cnv.width, cnv.height)
	ctx.fillStyle = "crimson"
	ctx.shadowColor = "crimson"
	ctx.shadowBlur = 7
	ctx.lineWidth = 10

	ctx.font = "100px Courier New, monospace"
	ctx.textAlign = "center"
	ctx.fillText(`The draw`, cnv.width / 2, cnv.height / 2)

	drawAmim = requestAnimationFrame(gameOverDrawScreen)
}

export const setCurrPlayer = (val) => {
	currPlayer = val
}


new Modal