import { ctx, FieldSize } from "../../App.js"


export class Circle {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.radius = 60
		this.endPercent = 85
		this.curPerc = 0
	}

	render = this.draw.bind(this)

	draw(current) {
		const { x, y, radius, endPercent } = this
		if (this.curPerc >= endPercent) return

		return () => {
			ctx.save()
			ctx.lineWidth = 10
			ctx.strokeStyle = "#FCF69C"
			ctx.shadowBlur = 15
			ctx.shadowColor = "#FCF69C"
			ctx.lineCap = "round"
			ctx.clearRect(x + 5, y + 5, FieldSize - 10, FieldSize - 10)
			ctx.beginPath()
			ctx.arc(
				x + FieldSize * .5,
				y + FieldSize * .5,
				radius,
				0,
				current * this.curPerc)
			ctx.stroke()
			ctx.restore()

			this.curPerc += 2;
			(this.curPerc < endPercent) && requestAnimationFrame(this.render(this.curPerc / 100));
			(this.curPerc === endPercent) && (this.curPerc = 0)
		}
	}
}
