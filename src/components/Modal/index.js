import { newGame } from "../../App.js"


export class Modal {
	constructor() {
		this.render()
	}

	addReloadBtn() {
		if (document.querySelector(".reload")) return
		const btn = document.createElement("button")
		btn.classList.add("reload")
		btn.addEventListener("click", () => {
			new Modal
		})
		document.body.prepend(btn)
	}

	handleClick() {
		const currSumb = document.querySelector("input[name='symb']:checked").value
		document.querySelector(".wrapper").remove()
		newGame(currSumb)
	}

	render() {
		document.body.insertAdjacentHTML("afterbegin", `
		<div class="wrapper">
			<div class="modal">
			<h1>"<scpan class="color-green">X</scpan>O<scpan class="color-green">X</scpan>"</h1>
			<h2>
			Select symbol:
			</h2>
			<label>
		<scpan class="color-green">X</scpan>
				<input type="radio" name="symb" value="x" checked>
			</label>
			<label>
			O
				<input type="radio" name="symb" value="o">
			</label>
			<button class="btn color-yellow">START</button>
			</div>
		</div>
		`)

		document.querySelector(".btn").addEventListener("click", this.handleClick)
		this.addReloadBtn()
	}
}