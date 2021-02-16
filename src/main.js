// link event listeners
const rootEl = document.querySelector(':root');
const portfolioText = document.querySelector('#portfolio-text .link-hover-header');
const navItems = document.getElementsByClassName('nav-item');
const mobileMenuToggle = document.querySelector('#cont-top-right p');
const mobileMenuItems = document.querySelectorAll('#mobile-menu div');
const scrollClue = document.getElementById('scroll-clue');
const cont1 = document.getElementById('cont-1');
const cont2 = document.getElementById('cont-2');
const cont3 = document.getElementById('cont-3');
const cont4 = document.getElementById('cont-4');
const hoverElements = [];
hoverElements.push(portfolioText);
for (const [key, value] of Object.entries(document.querySelectorAll('.link-hover'))) {
	hoverElements.push(value);
}
hoverElements.push(scrollClue);

portfolioText.addEventListener('click', (event) => {
	cont1.scrollIntoView();
	if (document.querySelector('#mobile-menu').classList.contains('active')) {
		document.querySelector('#mobile-menu').classList.remove('active');
	}
});

scrollClue.addEventListener('click', (event) => {
	cont2.scrollIntoView();
});

navItems[0].addEventListener('click', (event) => {
	cont2.scrollIntoView();
});

navItems[1].addEventListener('click', (event) => {
	cont3.scrollIntoView();
});

navItems[2].addEventListener('click', (event) => {
	cont4.scrollIntoView();
});

mobileMenuToggle.addEventListener('click', (event) => {
	document.querySelector('#mobile-menu').classList.toggle('active');
});

mobileMenuItems[0].addEventListener('click', (event) => {
	cont2.scrollIntoView();
	document.querySelector('#mobile-menu').classList.remove('active');
});

mobileMenuItems[1].addEventListener('click', (event) => {
	cont3.scrollIntoView();
	document.querySelector('#mobile-menu').classList.remove('active');
});

mobileMenuItems[2].addEventListener('click', (event) => {
	cont4.scrollIntoView();
	document.querySelector('#mobile-menu').classList.remove('active');
});

mobileMenuItems[3].addEventListener('click', (event) => {
	if (selectedTheme < (colorThemes.length - 1)) {
		selectedTheme++;
	} else {
		selectedTheme = 0;
	}
	colorSwitch();
	document.querySelector('#mobile-menu').classList.remove('active');
});

hoverElements.forEach(element => {
	element.addEventListener('mouseenter', (event) => {
		rootEl.style.setProperty('--mouse-circle1-scale', '2.4');
		rootEl.style.setProperty('--mouse-circle2-scale', '2.5');
		rootEl.style.setProperty('--mouse-circle2-border', 'solid');
		mouseCircle1.style.background = 'var(--color-mouse)';
	});
	element.addEventListener('mouseleave', (event) => {
		rootEl.style.setProperty('--mouse-circle1-scale', '1');
		rootEl.style.setProperty('--mouse-circle2-scale', '1');
		rootEl.style.setProperty('--mouse-circle2-border', 'dashed');
		mouseCircle1.style.background = 'transparent';
	});
});

document.querySelector('#theme-change-text .link-hover').addEventListener('click', (event) => {
	if (selectedTheme < (colorThemes.length - 1)) {
		selectedTheme++;
	} else {
		selectedTheme = 0;
	}
	colorSwitch();
});

VanillaTilt.init(document.querySelector("#cont-1 div"), {});
document.querySelectorAll("img").forEach(element => {
	VanillaTilt.init(element, {});
});
VanillaTilt.init(document.querySelector("#cont-4 h2"), {});

//hover contact links
const linkHoverContact = document.querySelectorAll('.link-hover-contact');

for (const [key, value] of Object.entries(linkHoverContact)) {
	value.addEventListener('mouseenter', (event) => {
		rootEl.style.setProperty('--mouse-circle1-scale', '2.4');
		rootEl.style.setProperty('--mouse-circle2-scale', '2.5');
		rootEl.style.setProperty('--mouse-circle2-border', 'solid');
	});
	value.addEventListener('mouseleave', (event) => {
		rootEl.style.setProperty('--mouse-circle1-scale', '1');
		rootEl.style.setProperty('--mouse-circle2-scale', '1');
		rootEl.style.setProperty('--mouse-circle2-border', 'dashed');	
	});
}

function respondToVisibility(element, delay) {
	let options = {
		root: document.documentElement
	}

	let observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.intersectionRatio > 0) {
				element.style.transitionDelay = `${delay}s`;
				element.classList.add('animate-cont-2');
			} else {
				if (element.getBoundingClientRect().y >= 0) {
					element.style.transitionDelay = '0s';
					element.classList.remove('animate-cont-2');
				}
			}
		});
	}, options);

	observer.observe(element);
}

document.querySelectorAll('.cont-heading').forEach(element => {
	if (!element.classList.contains('animate-cont-2')) {
		respondToVisibility(element, 0);
	}
});
document.querySelectorAll('.cont-subheading').forEach(element => {
	if (!element.classList.contains('animate-cont-2')) {
		respondToVisibility(element, 0.25);
	}
});
document.querySelectorAll('.cont-paragraph').forEach(element => {
	if (!element.classList.contains('animate-cont-2')) {
		respondToVisibility(element, 0.5);
	}
});
document.querySelectorAll('.cont-li').forEach(element => {
	if (!element.classList.contains('animate-cont-2')) {
		respondToVisibility(element, 0.75);
	}
});
document.querySelectorAll('.cont-image').forEach(element => {
	if (!element.classList.contains('animate-cont-2')) {
		respondToVisibility(element, 1);
	}
});


// animate cont-2
// animate cont-2 end

// animate cont-3
// animate cont-3 end

// confetti code
const runConfetti = () => {
	let count = 200;
	let defaults = {
		origin: { y: 0.7 }
	};

	function fire(particleRatio, opts) {
		confetti(Object.assign({}, defaults, opts, {
			particleCount: Math.floor(count * particleRatio)
		}));
	}

	fire(0.25, {
		spread: 26,
		startVelocity: 55,
	});
	fire(0.2, {
		spread: 60,
	});
	fire(0.35, {
		spread: 100,
		decay: 0.91,
		scalar: 0.8
	});
	fire(0.1, {
		spread: 120,
		startVelocity: 25,
		decay: 0.92,
		scalar: 1.2
	});
	fire(0.1, {
		spread: 120,
		startVelocity: 45,
	});
}
// confetti code end

//utility functions
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const hex2rgba = (hex, alpha = 0.15) => {
	const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
	return `rgba(${r},${g},${b},${alpha})`;
};

const getRandomNum = (min, max) => {
	return Math.random() * (max - min) + min;
}

const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const getSmaller = (num1, num2) => {
	if (num1 < num2) {
		return num1;
	}
	return num2;
}

const newAlert = (message, target, duration) => {
	if (target.querySelectorAll('.alert-div').length !== 0) {
		target.querySelector('.alert-div').remove();
	}
	let div1 = document.createElement('div');
	div1.innerText = message;
	div1.classList.add('alert-div');
	target.appendChild(div1);
	setTimeout(() => {
		div1.remove();
	}, duration);
}
