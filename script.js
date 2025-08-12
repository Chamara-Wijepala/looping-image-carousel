import images from './data.js';

const slide = document.querySelector('.slide');
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');

const leftClones = images.slice(-3);
const rightClones = images.slice(0, 3);

[leftClones, images, rightClones].flat().forEach((image) => {
	const panel = document.createElement('div');
	const panelImage = document.createElement('img');
	panel.classList.add('panel');
	panelImage.src = image.url;

	panel.append(panelImage);
	slide.append(panel);
});

let panelSize;

window.addEventListener('load', () => {
	panelSize = slide.children[0].offsetWidth;
	// scroll past cloned left panels
	slide.scrollBy({
		top: 0,
		left: panelSize * leftClones.length,
		behavior: 'instant'
	});
})

// prevent user from manually scrolling
slide.addEventListener('wheel', (e) => e.preventDefault(), {passive: false});
slide.addEventListener('touchmove', (e) => e.preventDefault(), {passive: false});

leftBtn.addEventListener('click', () => {
	leftBtn.disabled = true;
	slide.scrollBy({ top: 0, left: -panelSize, behavior: 'smooth' });
});
rightBtn.addEventListener('click', () => {
	rightBtn.disabled = true;
	slide.scrollBy({ top: 0, left: panelSize, behavior: 'smooth' });
});

// scroll to correct panel to give user the illusion of a looping carousel 
// Note: scrollend is not supported in some browsers
slide.addEventListener('scrollend', () => {
	leftBtn.disabled = false;
	rightBtn.disabled = false;
	if(slide.scrollLeft / panelSize === images.length - leftClones.length) {
		slide.scrollBy({
			top: 0,
			left: images.length * panelSize,
			behavior: 'instant'
		})
	}
	if(slide.scrollLeft / panelSize === images.length + rightClones.length) {
		slide.scrollBy({
			top: 0,
			left: images.length * -panelSize,
			behavior: 'instant'
		})
	}
})