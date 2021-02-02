let selectedTheme = 0;
let colorThemes = [
	{
		circle: '#9c9c9c',
		line: '#9c9c9c',
		bg: '#ffffff',
		shadowColor: '#9c9c9c',
		color1: '#474747',
		color2: '#ffffff',
		mouse: '#ffffff'
	},
	{
		circle: '#ffffff',
		line: '#ffffff',
		bg: '#000000',
		shadowColor: '#ffffff',
		color1: '#ffffff',
		color2: '#000000',
		mouse: '#ffffff'
	},
	{
		circle: '#000000',
		line: '#000000',
		bg: '#ff124f',
		shadowColor: '#000000',
		color1: '#000000',
		color2: '#ff124f',
		mouse: '#ff124f'
	},
	{
		circle: '#2f404d',
		line: '#3d898d',
		bg: '#85ebd9',
		shadowColor: '#2f404d',
		color1: '#2f404d',
		color2: '#85ebd9',
		mouse: '#85ebd9'
	},
	{
		circle: '#ff2a6d',
		line: '#05d9e8',
		bg: '#000000',
		shadowColor: '#ff2a6d',
		color1: '#ff2a6d',
		color2: '#000000',
		mouse: '#f0546a'
	},
	{
		circle: '#fe00fe',
		line: '#ffffff',
		bg: '#120458',
		shadowColor: '#fe00fe',
		color1: '#fe00fe',
		color2: '#120458',
		mouse: '#fe00fe'
	},
	{
		circle: '#65dc98',
		line: '#a0ffe3',
		bg: '#222035',
		shadowColor: '#65dc98',
		color1: '#65dc98',
		color2: '#222035',
		mouse: '#65dc98'
	},
];

let particleCount;
const canvasBgLoaded = () => {
	const canvas = document.querySelector('#canvas-bg');
	const contextBg = canvas.getContext('2d');

	const canvasScaling = 1;
	const canvasParticleDivision = 20;

	let stopFunctions = false;

	if (innerWidth >= innerHeight) {
		particleCount = parseInt(innerWidth / canvasParticleDivision);
	} else {
		particleCount = parseInt(innerHeight / canvasParticleDivision);
	}
	let particleObjects = [];
	let connectorObjects = [];
	let mouseOver = false;
	let mouseX;
	let mouseY;
	let autoChangeTheme = false;
	let autoChangeThemeInterval;

	const canvasInit = () => {
		colorSwitch(selectedTheme);

		canvas.width = (innerWidth - 2) / canvasScaling;
		canvas.height = (innerHeight - 2) / canvasScaling;
		canvas.style.transform = `scale(${canvasScaling})`;

		for (let i = 0; i < particleCount; i++) {
			let newParticle = new Particle();
			newParticle.draw();
			particleObjects.push(newParticle);
		}

		window.requestAnimationFrame(mainLoop);
	}

	class Particle {
		constructor() {
			this.x = getRandomNum(0, canvas.width);
			this.y = getRandomNum(0, canvas.height);
			this.z = getRandomNum(0.5, 1);
			this.r = getRandomNum(2, 6) * this.z;
			this.angle = getRandomNum(1, 360) * 0.01745;
			this.v = getRandomNum(0.5, 2);
		}

		draw() {
			contextBg.beginPath();
			contextBg.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
			contextBg.fillStyle = colorThemes[selectedTheme].circle;
			contextBg.fill();
			// contextBg.shadowColor = colorThemes[selectedTheme].shadowColor;
			// contextBg.shadowBlur = 3 * this.z;
		}

		reConf() {
			const rand = getRandomInt(1, 5);
			if (rand == 1) {
				this.x = getRandomNum(0, canvas.width);
				this.y = -10;
				this.z = getRandomNum(0.5, 1);
				this.r = getRandomNum(2, 6) * this.z;
				if (this.x / canvas.width < 0.5) {
					this.angle = getRandomNum(10, 80) * 0.01745;
				} else {
					this.angle = getRandomNum(100, 170) * 0.01745;
				}
				this.v = getRandomNum(0.5, 2);
			} else if (rand == 2) {
				this.x = canvas.width + 10;
				this.y = getRandomNum(0, canvas.height);
				this.z = getRandomNum(0.5, 1);
				this.r = getRandomNum(2, 6) * this.z;
				if (this.y / canvas.height < 0.5) {
					this.angle = getRandomNum(100, 170) * 0.01745;
				} else {
					this.angle = getRandomNum(190, 260) * 0.01745;
				}
				this.v = getRandomNum(0.5, 2);
			} else if (rand == 3) {
				this.x = getRandomNum(0, canvas.width);
				this.y = canvas.height + 10;
				this.z = getRandomNum(0.5, 1);
				this.r = getRandomNum(2, 6) * this.z;
				if (this.x / canvas.width < 0.5) {
					this.angle = getRandomNum(280, 350) * 0.01745;
				} else {
					this.angle = getRandomNum(190, 260) * 0.01745;
				}
				this.v = getRandomNum(0.5, 2);
			} else if (rand == 4) {
				this.x = -10;
				this.y = getRandomNum(0, canvas.height);
				this.z = getRandomNum(0.5, 1);
				this.r = getRandomNum(2, 6) * this.z;
				if (this.y / canvas.height < 0.5) {
					this.angle = getRandomNum(10, 80) * 0.01745;
				} else {
					this.angle = getRandomNum(280, 350) * 0.01745;
				}
				this.v = getRandomNum(0.5, 2);
			}
		}
	}

	class Connector {
		constructor(x1, y1, x2, y2, lineWidth) {
			this.x1 = x1;
			this.y1 = y1;
			this.x2 = x2;
			this.y2 = y2;
			this.lineWidth = lineWidth;
		}

		draw() {
			contextBg.beginPath();
			contextBg.moveTo(this.x1, this.y1);
			contextBg.lineTo(this.x2, this.y2);
			contextBg.strokeStyle = colorThemes[selectedTheme].line;
			contextBg.lineWidth = this.lineWidth;
			contextBg.stroke();
			// contextBg.shadowColor = colorThemes[selectedTheme].bg;
		}
	}

	const updateConnectorArray = () => {
		connectorObjects = null;
		connectorObjects = [];
		particleObjects.forEach(object => {
			particleObjects.forEach(objectInner => {
				if (object !== objectInner) {
					if ((object.x >= 0) && (object.y >= 0) && (objectInner.x >= 0) && (objectInner.y >= 0) && (object.x <= canvas.width) && (object.y <= canvas.height) && (objectInner.x <= canvas.width) && (objectInner.y <= canvas.height)) {
						if ((Math.abs(object.x - objectInner.x) <= 150) && (Math.abs(object.y - objectInner.y) <= 150)) {
							let lineWidth;
							if ((object.x > objectInner.x) && (object.y > objectInner.y)) {
								lineWidth = getSmaller((objectInner.x / object.x), (objectInner.y / object.y)) * 0.6;
							} else if ((object.x < objectInner.x) && (object.y < objectInner.y)) {
								lineWidth = getSmaller((object.x / objectInner.x), (object.y / objectInner.y)) * 0.6;
							}
							let check = true;
							connectorObjects.forEach(objectTest => {
								if (((objectTest.x1 == objectInner.x) && (objectTest.y1 == objectInner.y) && (objectTest.x2 == object.x) && (objectTest.y2 == object.y)) || ((objectTest.x1 == object.x) && (objectTest.y1 == object.y) && (objectTest.x2 == objectInner.x) && (objectTest.y2 == objectInner.y))) {
									check = false;
								}
							});
							if (check) {
								let newLine = new Connector(object.x, object.y, objectInner.x, objectInner.y, lineWidth);
								newLine.draw();
								connectorObjects.push(newLine);
							}
						}
					}
				}
			});
			if (mouseOver) {
				if ((object.x >= 0) && (object.y >= 0) && (object.x <= canvas.width) && (object.y <= canvas.height)) {
					if ((Math.abs(object.x - mouseX) <= canvas.width / 4 && (Math.abs(object.y - mouseY) <= canvas.height / 4))) {
						let lineWidth;
						if (Math.abs(object.x - mouseX) >= Math.abs(object.y - mouseY)) {
							if (object.x > mouseX) {
								lineWidth = (mouseX / object.x) * 0.9;
							} else if (object.x < mouseX) {
								lineWidth = (object.x / mouseX) * 0.9;
							}
						} else {
							if (object.y > mouseY) {
								lineWidth = (mouseY / object.y) * 0.9;
							} else if (object.y < mouseY) {
								lineWidth = (object.y / mouseY) * 0.9;
							}
						}
						let newLine = new Connector(object.x, object.y, mouseX, mouseY, lineWidth);
						newLine.draw();
						connectorObjects.push(newLine);
					}
				}
			}
		});
	}

	const clearCanvas = () => {
		contextBg.clearRect(0, 0, canvas.width, canvas.height);
	}

	let lastTimestamp = 0;
	let maxFPS = 120;
	let timestep = 1000 / maxFPS;

	let mainAnimationFrame;
	const mainLoop = (timestamp) => {
		mainAnimationFrame = window.requestAnimationFrame(mainLoop);
		if (timestamp - lastTimestamp < timestep) return;
		lastTimestamp = timestamp;
		clearCanvas();
		updateConnectorArray();
		particleObjects.forEach(particle => {
			if ((particle.x > -11) && (particle.x < (canvas.width + 11)) && (particle.y > -11) && (particle.y < (canvas.height + 11))) {
				particle.x = particle.x + Math.cos(particle.angle) * particle.v;
				particle.y = particle.y + Math.sin(particle.angle) * particle.v;
				particle.draw();
			} else {
				particle.reConf();
				particle.draw();
			}
		});
	}

	document.addEventListener('mousemove', (event) => {
		mouseX = event.clientX / canvasScaling;
		mouseY = event.clientY / canvasScaling;

		mouseOver = true;
	});

	document.addEventListener('mouseleave', (event) => {
		mouseOver = false;
		mouseX = 0;
		mouseY = 0;
	});

	document.addEventListener("keydown", function(event) {
		if (event.key.toLowerCase() == 'r') {
			if (autoChangeTheme === false) {
				autoChangeTheme = true;
				autoChangeThemeInterval = setInterval(() => {
					if (selectedTheme < (colorThemes.length - 1)) {
						selectedTheme++;
					} else {
						selectedTheme = 0;
					}
					colorSwitch();
				}, 1000);
			} else {
				clearInterval(autoChangeThemeInterval);
			}
		}
	})

	let lastResizeTime = 0;
	window.addEventListener('resize', (event) => {
		clearCanvas();
		canvas.width = (innerWidth - 2) / canvasScaling;
		canvas.height = (innerHeight - 2) / canvasScaling;
		particleObjects = [];
		connectorObjects = [];
		if (innerWidth >= innerHeight) {
			particleCount = parseInt(innerWidth / 20);
		} else {
			particleCount = parseInt(innerHeight / 20);
		}
		for (let i = 0; i < particleCount; i++) {
			let newParticle = new Particle();
			newParticle.draw();
			particleObjects.push(newParticle);
		}
	});

	canvasInit();
}

const colorSwitch = () => {
	document.body.style.backgroundColor = colorThemes[selectedTheme].bg;
	document.querySelector('#canvas-bg').style.backgroundColor = colorThemes[selectedTheme].bg;
	document.querySelector('#canvas-bg').style.border = `1px solid ${colorThemes[selectedTheme].bg}`;

	document.documentElement.style.cssText = 
	`--color-1: ${colorThemes[selectedTheme].color1};
	 --color-2: ${colorThemes[selectedTheme].color2};
	 --color-white: ${colorThemes[selectedTheme].bg};
	 --color-black: ${colorThemes[selectedTheme].circle};
	 --color-mouse: ${colorThemes[selectedTheme].mouse};
	 --color-picture: ${hex2rgba(colorThemes[selectedTheme].color1)};`;
}

setInterval(() => {
	// canvasBgLoaded();
}, 1000);