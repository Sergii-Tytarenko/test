/* Spollers
-----------------------------------------------------------------------------*/
let spollers = document.querySelectorAll(".spoller");
let spollersGo = true;

function spollerInit () {
	if (spollers.length > 0) {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];
			spoller.addEventListener("click", function (e) {
				if (spollersGo) {
					spollersGo = false;
					if (spoller.classList.contains('spoller-530') && window.innerWidth > 530) {
						return false;
					}

					spoller.classList.toggle('active');
					_slideToggle(spoller.nextElementSibling);

					setTimeout(function () {
						spollersGo = true;
					}, 500);
				}
            });
            // Add perents block class 'spollers' and 'one' if need close prev spoller after open next.
            
            // if (spoller.closest('.spollers').classList.contains('one')) {
            //     let curent_spollers = spoller.closest('.spollers').querySelectorAll('.spoller');
            //     for (let i = 0; i < curent_spollers.length; i++) {
            //         let el = curent_spollers[i];
            //         if (el != spoller) {
            //             el.classList.remove('active');
            //             _slideUp(el.nextElementSibling);
            //         }
            //     }
            // }

            // If don't need adaptive. Remove listener 'resize'

            // if (spoller.classList.contains('_active')) {
            //     _slideToggle(spoller.nextElementSibling);
            // }

			if (window.innerWidth > 530) {
				spoller.classList.remove('active');
				spoller.nextElementSibling.style.display = 'block';
			} else if (window.innerWidth < 530 && spoller.classList.contains('active')) {
				spoller.nextElementSibling.style.display = 'block';
			} else {
				spoller.nextElementSibling.style.display = '';
			}

		}
	}
}

spollerInit ();

window.addEventListener('resize', () => {
	spollerInit ();
	spollersGo = true;
});



/* SlideToggle
-----------------------------------------------------------------------------*/
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('slide');
	}, duration);
}

let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('slide');
	}, duration);
}

let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('slide')) {
		target.classList.add('slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}


