// попап поиска

const showHeaderSearch = () => {
    const searchPopup = document.getElementById('headerSearch');
    searchPopup.classList.add('header-search_show');
    document.addEventListener('click', (e) => {
        if (!searchPopup.contains(e.target)) {
            hideHeaderSearch();
        }
    })
};

const hideHeaderSearch = () => {
    const searchPopup = document.getElementById('headerSearch');
    searchPopup.classList.remove('header-search_show');
    document.body.removeEventListener('click', hideHeaderSearch);
};

window.addEventListener('load', () => {
    const headerSearchButton = document.getElementById('headerSearchButton');
    headerSearchButton.addEventListener('click', showHeaderSearch);

    const headerSearchPopupClose = document.getElementById('headerSearchPopupClose');
    headerSearchPopupClose.addEventListener('click', hideHeaderSearch);

})

// swiper
window.addEventListener('load', () => {
    const projectsNode = document.querySelector('.project-list .swiper');
    if (projectsNode) {
        const swiperProjects = new Swiper(projectsNode, {
            slidesPerView: 'auto',
            spaceBetween: 30,
            allowTouchMove: false,
            slidesPerGroupSkip: 1,
            pagination: {
                el: '.swiper-pagination_projects',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next_projects',
                prevEl: '.swiper-button-prev_projects',
            },
            breakpoints: {
                900: {
                    slidesPerView: 1,
                },
                630: {
                    slidesPerView: 2,
                },
                320: {
                  slidesPerView: 1,
                },
            },
            on: {
                beforeInit: (swiper) => {
                    const countSlides = swiper.slides.length;

                    swiper.params.loop = true;
                    swiper.params.loopedSlides = countSlides;

                    swiper.update();
                },
                afterInit: () => {
                    bindProjectPopups();
                },
                activeIndexChange: (swiper) => {
                    if (window.matchMedia('(min-width: 1150px)').matches) {
                        for (const slide of swiper.slides) {
                            slide.style.width = 'calc(25% - 15px)';
                        }
                        swiper.slides[swiper.activeIndex].style.width = 'calc(75% - 15px)';
                        swiper.updateSlides();
                        swiper.slideReset();
                    }
                }
            },
        });
    }
    const videosNode = document.querySelector('.videos-list__slider .swiper');
    if (videosNode) {
        const swiperVideos = new Swiper(videosNode, {
            loop: false,
            slidesPerView: 4,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination_videos',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next_videos',
                prevEl: '.swiper-button-prev_videos',
            },
            breakpoints: {
                1150: {
                    slidesPerView: 4,
                },
                850: {
                    slidesPerView: 3,
                },
                550: {
                    slidesPerView: 2,
                },
                260: {
                  slidesPerView: 1,
                },
            }
        });
    }
})

// modals
import {showModal, watchScrollY} from "./modal";

watchScrollY();

const fillProjectPopupData = (node) => {
    const root = node.closest('.project-item');
    const popupTitle = document.querySelector('#modal-projects .modal__title');
    const popupContent = document.querySelector('#modal-projects .modal__content');

    popupTitle.innerText = root.querySelector('.project-item__title').innerText;
    const img = document.createElement('img');

    img.src = root.querySelector('.project-item__img img').src;

    popupContent.innerHTML = '';
    popupContent.append(img);
    popupContent.innerHTML += root.querySelector('.project-item__popup-text').innerHTML;
}
const bindProjectPopups = () => {
    [...document.querySelectorAll('.js-project-popup')].map(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.href ? e.target : e.target.closest('a');
            showModal(target, () => {
                fillProjectPopupData(target)
            });
        })
    });
}

const fillPopupVideo = (videoId) => {
    const htmlString = `
    <iframe src="https://www.youtube-nocookie.com/embed/${videoId}?controls=0"
     title="YouTube video player"
      frameborder="0"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    const videoContainer = document.getElementById('video169');
    videoContainer.innerHTML = htmlString;
}

window.addEventListener('load', () => {
    const youtubePopupLinks = [...document.querySelectorAll('.js-youtube-link')];
    const targetPopup = document.getElementById('modal-videos');
    if (youtubePopupLinks.length > 1) {
        targetPopup.classList.add('modal_controls');
    }

    const calculateIndex = (method, currentIndex, length) => {
        const current = Number(currentIndex);
        switch (method) {
            case 'inc': {
                if (current === length - 1) {
                    return 0;
                }
                return current + 1;
            }
            case 'dec': {
                if (current === 0) {
                    return length;
                }
                return current - 1;
            }
            default:
                return current;
        }
    }

    const controls = targetPopup.querySelectorAll('.modal__control');
    for (const control of controls) {
        control.addEventListener('click', (e) => {
            e.preventDefault();
            const method = control.getAttribute('data-action');
            const currentIndex = targetPopup.getAttribute('data-current-index');
            const newIndex = calculateIndex(method, currentIndex, youtubePopupLinks.length);
            fillPopupVideo(youtubePopupLinks[newIndex].getAttribute('data-code'));
            targetPopup.setAttribute('data-current-index', String(newIndex));
        })
    }

    youtubePopupLinks.map((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.classList.contains('js-youtube-link') ? e.target : e.target.closest('.js-youtube-link');
            showModal('#modal-videos', () => {
                fillPopupVideo(target.getAttribute('data-code'));
                targetPopup.setAttribute('data-current-index', String(index));
            });
        })
    });
})

// burger
window.addEventListener('load', () => {

    const showMobileMenu = () => {
        document.body.classList.add('body_menu-opened');
    }

    const hideMobileMenu = () => {
        document.body.classList.remove('body_menu-opened');
    }

    const burger = document.getElementById('headerBurger');
    if (burger) {
        burger.addEventListener('click', (e) => {
            e.preventDefault();
            showMobileMenu();
        })

        document.getElementById('headerMobileClose').addEventListener('click', (e) => {
            e.preventDefault();
            hideMobileMenu();
        })
    }
})