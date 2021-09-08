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
            //allowTouchMove: false,
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
                /*1150: {
                    slidesPerView: 'auto',
                },*/
                /*900: {
                    slidesPerView: 1,
                },
                630: {
                    slidesPerView: 2,
                },
                320: {
                  slidesPerView: 1,
                },*/
            },
            on: {
                beforeInit: (swiper) => {
                    const countSlides = swiper.slides.length;

                    swiper.params.loop = true;
                    swiper.params.loopedSlides = countSlides;

                    swiper.update();
                    let mobileLayout = false;
                    window.addEventListener('resize', () => {
                        if (!mobileLayout && window.matchMedia('(max-width: 1150px)').matches) {
                            for (const slide of swiper.slides) {
                                slide.style.width = '100%';
                            }
                            swiper.updateSlides();
                            swiper.slideReset();
                            mobileLayout = true;
                        }
                    })
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
                    } else if (window.matchMedia('(min-width: 900px)').matches) {
                        for (const slide of swiper.slides) {
                            slide.style.width = '100%';
                        }
                    } else if (window.matchMedia('(min-width: 630px)').matches) {
                        for (const slide of swiper.slides) {
                            slide.style.width = 'calc(50% - 15px)';
                        }
                    } else {
                        for (const slide of swiper.slides) {
                            slide.style.width = '100%';
                        }
                    }
                    swiper.updateSlides();
                    swiper.slideReset();
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

    const advantagesNode = document.querySelector('.advantages__slider .swiper');
    if (advantagesNode) {
        const swiperAdvantages = new Swiper(advantagesNode, {
            loop: false,
            slidesPerView: 4,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination_advantages',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next_advantages',
                prevEl: '.swiper-button-prev_advantages',
            },
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
});

// front-video
const fadeIn = (el, display) => {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        let val = parseFloat(el.style.opacity);
        if (!((val += .025) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}

const fadeOut = (el, cb) => {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .025) < 0) {
            el.style.display = "none";
            if (typeof cb === 'function') {
                cb();
            }
        } else {
            requestAnimationFrame(fade);
        }
    })();
}

window.addEventListener('load', () => {
    const video = document.querySelector('.js-front-video');
    if (video) {
        //video.querySelector('video').play();

        const animateTitle = (elements, index = 0, step = 6000, cb) => {
            if (!elements.length) {
                return false;
            }
            fadeIn(elements[index]);
            const nextIndex = index === elements.length - 1 ? 0 : index + 1;
            setTimeout(() => {
                fadeOut(elements[index], () => {
                    animateTitle(elements, nextIndex);
                });
            }, step)
        }
        const titles = document.querySelectorAll('.front-video__text');
        setTimeout(() => {
            animateTitle(titles);
        }, 1500);
    }
})

// set min height

const setMinHeight = (arrNodes) => {
    const height = arrNodes.reduce((acc, el) => {
        el.style.minHeight = 'unset';
        const elHeight = el.offsetHeight;
        if (elHeight > acc) {
            return elHeight;
        }
        return acc;
    }, 0);
    for (const el of arrNodes) {
        el.style.minHeight = height + 'px';
    }
}

const startHeightAbjust = (groups = [[]]) => {
    for (const group of groups) {
        setMinHeight(group);
    }
}

window.addEventListener('load', () => {
    const nodes = [...document.querySelectorAll('.js-set-min-height')];

    const arrGroups = nodes.reduce((acc, el, index) => {
        const dataAttributeValue = el.getAttribute('data-minheight');
        const dataIndex = acc.selectors[dataAttributeValue];
        if (dataIndex !== undefined) {
            const newElements = acc.elements.slice();
            newElements[dataIndex] = [...newElements[dataIndex], el];
            return {
                ...acc,
                elements: newElements,
            }
        }
        return {
            selectors: {
                ...acc.selectors,
                [dataAttributeValue]: acc.elements.length,
            },
            elements: [...acc.elements, [el]],
        };
    }, {
        selectors: {},
        elements: [],
    }).elements;

    startHeightAbjust(arrGroups);

    window.addEventListener('resize', () => {startHeightAbjust(arrGroups)});
})