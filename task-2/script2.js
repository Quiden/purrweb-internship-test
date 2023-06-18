let viewport;
let position = 0;
let dotIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    const sliderLine = document.querySelector('.slider-line');
    const images = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.button-prev');
    const nextButton = document.querySelector('.button-next');
    const dots = document.querySelectorAll('.dot');
    viewport = document.getElementById('slider-wrapper').offsetWidth;

    const nextSlide = () => {
        dotIndex++;
        nextButton.disabled = true;
        let start = Date.now();

        let timer = setInterval(() => {
            let timePassed = Date.now() - start;
    
            if (timePassed > viewport * 2) {
                if (position + viewport > (dots.length) * viewport) {
                    position = 0;
                    sliderLine.style.left = -viewport + 'px';
                    dotIndex = 0;
                }
                nextButton.disabled = false;
                position += viewport;
                thisSlide(dotIndex);
                clearInterval(timer);
                return;
            }
            console.log(timePassed / 2);
            sliderLine.style.left = -(position + timePassed / 2) + 'px';
    
        }, 3);
    }

    const prevSlide = () => {
        dotIndex--;
        prevButton.disabled = true;
        let start = Date.now();

        let timer = setInterval(() => {
            let timePassed = Date.now() - start;
    
            if (timePassed > viewport * 2) {
                position -= viewport;
                if (position - viewport < 0) {
                    position = (dots.length) * viewport;
                    sliderLine.style.left = -(dots.length) * viewport;
                    dotIndex = dots.length - 1;
                }
                prevButton.disabled = false;
                thisSlide(dotIndex);
                clearInterval(timer);
                return;
            }
            sliderLine.style.left = -(position - timePassed / 2) + 'px';
    
        }, 2);
    }

    const thisSlide = (index) => {
        for (let dot of dots) {
            dot.classList.remove('active-dot');
        }
        dots[index].classList.add('active-dot');
    }

    const manager = (index) => {
        index > dotIndex ? clickForwardDot(index): clickBackDot(index);
    }

    const clickForwardDot = (index) => {
        dots.forEach((dot) => {
            dot.disabled = true;
        })
        let start = Date.now();
        let timer = setInterval(() => {
            let timePassed = Date.now() - start;
    
            if (position + timePassed > viewport * (index + 1)) {
                clearInterval(timer);
                position = viewport * (index + 1);
                sliderLine.style.left = -position + 'px';
                dots.forEach((dot) => {
                    dot.disabled = false;
                })
                return;
            }
            sliderLine.style.left = -(position + timePassed) + 'px';
    
        }, 2);

        dotIndex = index;
        thisSlide(dotIndex);
    }

    const clickBackDot = (index) => {
        dots.forEach((dot) => {
            dot.disabled = true;
        })
        let start = Date.now();
        let timer = setInterval(() => {
            let timePassed = Date.now() - start;
    
            if (position - timePassed < viewport * (index + 1)) {
                clearInterval(timer);
                position = viewport * (index + 1);
                sliderLine.style.left = -position + 'px';
                dots.forEach((dot) => {
                    dot.disabled = false;
                })
                return;
            }
            sliderLine.style.left = -(position - timePassed) + 'px';
    
        }, 2);

        dotIndex = index;
        thisSlide(dotIndex);
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    const initialSlider = () => {
        let leftSlide = images[images.length - 1];
        sliderLine.insertBefore(leftSlide.cloneNode(true), sliderLine.firstChild);

        sliderLine.appendChild(images[0].cloneNode(true));
        position = viewport;
        sliderLine.style.left = -position + 'px';
    }

    initialSlider();

    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', () => manager(i));
    }
});