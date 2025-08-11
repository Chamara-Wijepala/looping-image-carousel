import images from './data.js';

const slide = document.querySelector('.slide');
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');

images.forEach((image) => {
	const panel = document.createElement('div');
	const panelImage = document.createElement('img');
	panel.classList.add('panel');
	panelImage.src = image.url;

	panel.append(panelImage);
	slide.append(panel);
});

const panelSize = slide.children[0]?.offsetWidth;

leftBtn.addEventListener('click', () => {
	slide.scrollBy({ top: 0, left: -panelSize, behavior: 'smooth' });
});
rightBtn.addEventListener('click', () => {
	slide.scrollBy({ top: 0, left: panelSize, behavior: 'smooth' });
});
