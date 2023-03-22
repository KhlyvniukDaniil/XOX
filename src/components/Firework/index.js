import { cnv, ctx } from "../../App.js"


let animId
let firework1
let firework2


class Particle {
	#maxLifetime

	constructor(x, y, vx, vy, ax, ay, colour, trailLength, lifetime, particleRadius) {
		this.x = x
		this.y = y
		this.vx = vx
		this.vy = vy
		this.ax = ax
		this.ay = ay
		this.lifetime = lifetime
		this.#maxLifetime = lifetime
		this.path = []
		this.colour = colour
		this.r = particleRadius
		this.trailLength = trailLength
	}

	update() {
		this.lifetime--

		if (this.path.length >= this.trailLength) {
			this.path.shift()
		}

		this.path.push([ this.x, this.y ])

		this.vy += this.ay
		this.vx += this.ax
		this.x += this.vx
		this.y += this.vy
	}

	draw() {
		const opacity = ((this.lifetime * 100) / this.#maxLifetime) / 100

		ctx.fillStyle = "rgba(" + this.colour + opacity * 0.6 + ")"
		if (this.lifetime > this.#maxLifetime * 0.95) ctx.fillStyle = "#fff"
		ctx.lineWidth = 1
		ctx.beginPath()

		ctx.moveTo(this.x - this.r, this.y)
		ctx.lineTo(this.path[0][0], this.path[0][1])
		ctx.lineTo(this.x + this.r, this.y)
		ctx.fill()
		ctx.closePath()

		ctx.fillStyle = `rgba(${ this.colour }${ opacity }})`
		if (this.lifetime > this.#maxLifetime * .95) ctx.fillStyle = "#fff"
		ctx.beginPath()

		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
		ctx.fill()
		ctx.closePath()
	}
}

class Firework {
	#minStrength = 5
	#maxStrength = 7
	#minTrails = 20
	#maxTrails = 35
	#particleRadius = .5
	#trailLength = 3
	#delay = .4
	#maxLifetime = 200
	#g = 5e-2
	#D = 1e-3

	constructor() {
		this.x = this.setRandomPoint(cnv.width)
		this.y = this.setRandomPoint(cnv.height)
		this.strength = this.setRandomStrength()
		this.colour = this.setRandomColor()
		this.lifetime = 0
		this.particles = this.getParticles(this.x, this.y, this.strength, this.colour)
	}

	setRandomPoint(size) {
		return size * (Math.random() * .8 + .1)
	}

	setRandomStrength() {
		return Math.random() * (this.#maxStrength - this.#minStrength) + this.#minStrength
	}

	setRandomColor() {
		return `
		${ Math.floor((1 + Math.random()) * 256 / 2) },
		${ Math.floor((1 + Math.random()) * 256 / 2) },
		${ Math.floor((1 + Math.random()) * 256 / 2) },
		`
	}

	getParticles(x, y, strength, colour) {
		const p = []
		const n = Math.floor(Math.random() * (this.#maxTrails - this.#minTrails)) + this.#minTrails

		for (let i = n; i--;) {
			let ax = this.#D
			const ay = this.#g
			const angle = (i * Math.PI * 2) / n
			if (angle < Math.PI) ax *= -1
			const vx = strength * Math.sin(angle)
			const vy = strength * Math.cos(angle)

			p.push(new Particle(
				x,
				y,
				vx,
				vy,
				ax,
				ay,
				colour,
				this.#trailLength,
				this.#maxLifetime,
				this.#particleRadius)
			)
		}
		return p
	}

	update() {
		this.lifetime++
		if (this.lifetime < 0) return
		for (let i = this.particles.length; i--;) {
			this.particles[i].update()
			this.particles[i].draw()
		}
	}

	isFinished() {
		return this.lifetime === this.#maxLifetime * this.#delay
	}

	setLifeTime(value) {
		this.lifetime = value
	}
}


const animation = (symb) => () => {
	ctx.fillStyle = "#050505"
	ctx.fillRect(0, 0, cnv.width, cnv.height)

	firework1.update()
	firework2.update()

	if (symb === "o") {
		ctx.shadowColor = "#FCF69C"
		ctx.fillStyle = "#FCF69C"
	} else {
		ctx.shadowColor = "#55D8C1"
		ctx.fillStyle = "#55D8C1"
	}

	ctx.shadowBlur = 7
	ctx.lineWidth = 10

	ctx.font = "100px Courier New, monospace"
	ctx.textAlign = "center"
	ctx.fillText(`The "${ symb }" has won`, cnv.width / 2, cnv.height / 2)

	if (firework1.isFinished()) firework2 = new Firework()
	if (firework2.isFinished()) firework1 = new Firework()

	animId = requestAnimationFrame(animation(symb))
}

export const initFirework = (symb) => () => {
	cnv.width = innerWidth
	cnv.height = innerHeight
	firework1 = new Firework()
	firework2 = new Firework()
	firework2.setLifeTime(-100)
	animation(symb)()
}

export const stopFirework = () => {
	cancelAnimationFrame(animId)
}


