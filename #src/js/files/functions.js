/* BodyLock
-----------------------------------------------------------------------------*/
let unlock = true;
function body_lock(delay) {
	let body = document.querySelector("body");
	
    if (body.classList.contains("lock")) {
      body_lock_remove(delay);
    } else {
      body_lock_add(delay);
    }
}

function body_lock_remove(delay) {
	let body = document.querySelector("body");

	if (unlock) {
		let lock_padding = document.querySelectorAll(".lp");

		setTimeout(() => {
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = "0px";
		}
		body.style.paddingRight = "0px";
		body.classList.remove("lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
		unlock = true;
		}, delay);
	}
}

function body_lock_add(delay) {
	let body = document.querySelector("body");

	if (unlock) {
	let lock_padding = document.querySelectorAll(".lp");

	for (let index = 0; index < lock_padding.length; index++) {
		const el = lock_padding[index];
		el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
	}
	body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
	body.classList.add("lock");

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, delay);
	}
}



/* Smoth scroll
-----------------------------------------------------------------------------*/
const linkNav = document.querySelectorAll('.smooth'),
      V = .1; 
for (let link of linkNav) {
    link.addEventListener('click', function (e) {
        e.preventDefault(); 

        let w = window.pageYOffset,  
            hash = this.href.replace(/[^#]*(.*)/, '$1'), 
        	t = document.querySelector(hash).getBoundingClientRect().top,  
            start = null;
        requestAnimationFrame(step); 
		
        function step(time) {
            if (start === null) start = time;
            let progress = time - start,
                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash  
            }
        }
    });
}



/* Modal Windows
-----------------------------------------------------------------------------*/
let modalLinks = document.querySelectorAll('.modal-link');
const overlay = document.querySelector('.overlay');

if (modalLinks.length > 0) {
    for (let i = 0; i < modalLinks.length; i++) {

        modalLinks[i].addEventListener('click', (e) => {
            let linkTarget = e.target.dataset.modal,
            	modalWindow = document.querySelector(`${linkTarget}`);

            modalActive(modalWindow);
        });
        
    }
}


function modalActive (target) {
    if (target) {
        modalShow (target);

        let closeBtn = target.querySelector('.modal__close');

        closeBtn.addEventListener('click', () => {
            modalClose (target);
        });

        overlay.addEventListener('click', () => {
            modalClose (target);
        });

        document.addEventListener('keydown', function (e) {
            if (e.code === 'Escape') {
                modalClose (target);
            }
        });
    }
}

function modalShow (target) {
	target.classList.add('modal-show');
	overlay.classList.add('modal-show');
	if (burgerNav.classList.contains('active')) {
		closeBurgerNav ();
	} else {
		body_lock(0);
	}
}

function modalClose (target) {
	target.classList.remove('modal-show');
	overlay.classList.remove('modal-show');
	body_lock(0);
}
