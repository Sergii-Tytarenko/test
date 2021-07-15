import focusVisible from './vendors/focusVisible';
import Swiper from 'swiper/bundle';

/* Header menu
---------------------------------------------------------------*/
const menuBtn = document.querySelector('.profile__btn'),
      menuUser = document.querySelector('.profile__user'),
      headerMenu = document.querySelector('.profile__inner');

menuBtn.addEventListener('click', () => showMenu())
menuUser.addEventListener('click', () => showMenu())

function showMenu() {
    if(menuBtn)  menuBtn.classList.toggle('profile__btn--active')
   
    headerMenu.classList.toggle('profile__inner--active')
}


/* Creators slider
---------------------------------------------------------------*/
const creatorsSlider = document.querySelector('.creators__slider');

if (creatorsSlider) {
    let mySwiper = new Swiper(creatorsSlider, {
		spaceBetween: 32,
		wrapperClass: 'creators__wrapper',
		slideClass: 'creators__item',
		speed: 1000,
        watchSlidesVisibility: true,
        watchOverflow: true,
        preventClicks: true,
        navigation: {
			nextEl: '.creators__btn-next',
			prevEl: '.creators__btn-prev',
		},
        breakpoints: {
            // when window width is >= 375px
            375: {
                slidesPerView: 1.3,
                spaceBetween: 20
            },
            // when window width is >= 420px
            420: {
                slidesPerView: 1.5,
                spaceBetween: 20
            },
            // // when window width is >= 500px
            500: {
                slidesPerView: 1.8,
                spaceBetween: 20
            },
            // when window width is >= 580px
            580: {
                slidesPerView: 2.1,
                spaceBetween: 20
            },
            // when window width is >= 670px
            670: {
                slidesPerView: 2.4,
                spaceBetween: 20
            },
            // when window width is >= 775px
            775: {
                slidesPerView: 2.7,
                spaceBetween: 20
            },
            // when window width is >= 875px
            875: {
                slidesPerView: 3.1,
                spaceBetween: 20
            },
            // when window width is >= 1000px
            1000: {
                slidesPerView: 3.6,
                spaceBetween: 20
            },
            // when window width is >= 1110px
            1110: {
                slidesPerView: 4,
                spaceBetween: 20
            },
        }
	});
}

