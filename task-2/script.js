let viewport;
let buttonNext;
let buttonPrev;
let slides;
let sliders = [];
let currentImage = 2;
let step = 0;
let offset = -1;
let elements = [];

const main = () => {
    let slides = document.querySelectorAll('.slide');
    let sliders = [];

    sliders = initSliders(slides, sliders);
}

const mainSlider = () => {
    initSliders()
    drawLeft();
    drawLeft();
    drawLeft();
    // console.log(step);
    buttonNext.addEventListener("click", left);
    buttonPrev.addEventListener("click", right);
}

const initSliders = () => {
    viewport = document.getElementById('slider').offsetWidth;
    buttonNext = document.getElementById('slider-next');
    buttonPrev = document.getElementById('slider-prev');
    elements = document.querySelectorAll('.slider-indicator');
    elements[currentImage - 1].style.background = 'red';
    console.log(viewport);
    slides = document.querySelectorAll('.slide');

    // console.log(slides);
    for (let i = 0; i < slides.length; ++i) {
        sliders[i] = slides[i].querySelector('img');
        slides[i].remove();
    }
    // console.log(sliders);
}

const drawLeft = () => {
    let slide = document.createElement('div');
    slide.classList.add('slide');
    slide.appendChild(sliders[step]);
    slide.style.left = offset * viewport + 'px';
    document.querySelector('.slider-wrapper').appendChild(slide);

    step + 1 == slides.length ? step = 0: step++;
    offset + 1 == 2 ? offset = 1: offset++;
}

const drawRight = () => {
    let slide = document.createElement('div');
    slide.classList.add('slide');
    slide.appendChild(sliders[step - 3 <= 0 ? 5 + (step - 3): step - 4]);
    // debugger;
    slide.style.left = -1 * viewport + 'px';
    document.querySelector('.slider-wrapper').insertBefore(slide, document.getElementById('slider-wrapper').firstChild);
    console.log(document.getElementById('slider-wrapper'));

    step - 1 < 0 ? step = slides.length - 1: step--;
}

const left = () => {
    buttonNext.disabled = true;
    let renderedSlides = document.querySelectorAll('.slide');
    let leftOffset = -1;

    let start = Date.now();
    let timer = setInterval(() => {
        leftOffset = -1;
        let timePassed = Date.now() - start;

        if (timePassed > 600) {
            clearInterval(timer);
            return;
        }

        renderedSlides.forEach((renderedSlide) => {
            renderedSlide.style.left = leftOffset * viewport - (timePassed / 2) + 'px';
            leftOffset++;
        })

    }, 2);
    setTimeout(() => {
        renderedSlides[0].remove();
        drawLeft();
        buttonNext.disabled = false;
        currentImage + 1 > 6 ? currentImage = 1: currentImage++;
        lightElement((currentImage - 1));
        console.log(step);
    }, 600)
    // console.log(renderedSlides);
}

const right = () => {
    buttonPrev.disabled = true;
    let renderedSlides = document.querySelectorAll('.slide');
    let leftOffset = -1;

    let start = Date.now();
    let timer = setInterval(() => {
        leftOffset = -1;
        let timePassed = Date.now() - start;

        if (timePassed > 600) {
            clearInterval(timer);
            return;
        }

        renderedSlides.forEach((renderedSlide) => {
            renderedSlide.style.left = leftOffset * viewport + (timePassed / 2) + 'px';
            leftOffset++;
        })

    }, 2);

    setTimeout(() => {
        renderedSlides[2].remove()
        drawRight();
        buttonPrev.disabled = false;
        currentImage - 1 < 1 ? currentImage = 6: currentImage--;
        // elements[currentImage].style.background = 'white';
        elements[currentImage - 1].style.background = 'red';
        console.log(step);
    }, 600)
}

const lightElement = (index) => {
    elements[index - 1].style.background = 'white';
    elements[currentImage - 1].style.background = 'red';
}

const goToElement = (images) => {
    if (currentImage == images) return;
    images + 1 < 7 ? step = images: step = 0;
    elements[currentImage - 1].style.background = 'white';
    currentImage = images;
    elements[currentImage - 1].style.background = 'red';

    let slide = document.createElement('div');
    slide.classList.add('slide');
    slide.appendChild(sliders[currentImage - 1 == 0 ? 5: currentImage - 2]);
    slide.style.left = -1 * viewport + 'px';
    document.querySelector('.slider-wrapper').appendChild(slide);

    let slide2 = document.createElement('div');
    slide2.classList.add('slide');
    slide2.appendChild(sliders[currentImage - 1]);
    slide2.style.left = 0 * viewport + 'px';
    document.querySelector('.slider-wrapper').appendChild(slide2);

    let slide3 = document.createElement('div');
    slide3.classList.add('slide');
    slide3.appendChild(sliders[currentImage + 1 == 7 ? 0: currentImage]);
    slide3.style.left = 1 * viewport + 'px';
    document.querySelector('.slider-wrapper').appendChild(slide3);
    // alert(currentImage);
}

document.addEventListener('DOMContentLoaded', () => {
    // firstOption();
    mainSlider();
})
