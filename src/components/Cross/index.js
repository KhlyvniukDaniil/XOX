import { ctx, FieldSize } from "../../App.js"


export class Cross {
	constructor(x, y, size = FieldSize, gap = 40) {
		this.size = size
		this.gap = gap
		this.x = x + this.gap
		this.y = y + this.gap
		this.curPerc = 0
		this.curPerc1 = 0
	}

	render = this.drawFirstLine.bind(this)
	secLine = this.secondLine.bind(this)

	lineStyles() {
		ctx.lineWidth = 10
		ctx.strokeStyle = "#55D8C1"
		ctx.shadowColor = "#55D8C1"
		ctx.lineCap = "butt"
		ctx.shadowBlur = 10
	}

	secondLine() {
		const { x, y, size, gap, lineStyles, secLine } = this
		let X1 = x + this.curPerc1
		let Y1 = (y + size - gap * 2) - this.curPerc1

		ctx.save()
		lineStyles()
		ctx.clearRect(x - gap * .5, y - gap * .5, FieldSize - gap, FieldSize - gap)

		ctx.beginPath()
		ctx.moveTo(x, y)
		ctx.lineTo(x + size - gap * 2, y + size - gap * 2)
		ctx.stroke()

		ctx.beginPath()
		ctx.moveTo(x, y + size - gap * 2)
		ctx.lineTo(X1, Y1)
		ctx.stroke()
		ctx.restore()

		this.curPerc1 += 20;
		(this.curPerc1 <= size - gap * 2) && requestAnimationFrame(secLine)
	}

	drawFirstLine() {
		const { x, y, size, gap, lineStyles, secLine, render } = this

		ctx.save()
		lineStyles()
		ctx.clearRect(x - gap * .5, y - gap * .5, FieldSize - gap, FieldSize - gap)
		ctx.beginPath()

		ctx.moveTo(x, y)
		ctx.lineTo(x + this.curPerc, y + this.curPerc)

		ctx.stroke()
		ctx.restore()

		this.curPerc += 20
		if (this.curPerc === size - gap * 2) requestAnimationFrame(secLine);
		(this.curPerc <= size - gap * 2) && requestAnimationFrame(render)
	}
}


