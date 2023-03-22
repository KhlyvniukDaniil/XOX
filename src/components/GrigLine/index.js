import { cnv, ctx } from "../../App.js"


export class GridLine {
	constructor({ mtX, mtY, ltX, ltY, direction }) {
		this.mtX = mtX
		this.mtY = mtY
		this.ltX = ltX
		this.ltY = ltY
		this.curPerc = 0
		this.direction = direction
	}
	draw = this.drawLine.bind(this)

	drawLine() {
		ctx.save()
		ctx.lineWidth = 5
		ctx.strokeStyle = "#0F0E0E"
		ctx.shadowBlur = .5
		ctx.shadowColor = "#ccc"
		ctx.lineCap = "butt"
		ctx.beginPath()

		if (this.direction === "V") {
			ctx.moveTo(this.mtX, this.mtY)
			ctx.lineTo(this.ltX, this.curPerc)
		} else {
			ctx.moveTo(this.mtX, this.mtY)
			ctx.lineTo(this.curPerc, this.ltY)
		}
		ctx.stroke()
		ctx.restore()

		this.curPerc += 30;
		(this.curPerc <= cnv.height) && requestAnimationFrame(this.draw)
	}
}