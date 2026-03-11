document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position considering fixed header
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Init Yandex Maps
    ymaps.ready(initMap);
    
    function initMap() {
        // Balashikha coordinated (approximate around microdistrict Savvino)
        const coords = [55.7369, 38.0125]; 
        
        try {
            const map = new ymaps.Map('map', {
                center: coords,
                zoom: 14,
                controls: ['zoomControl', 'fullscreenControl']
            });

            const placemark = new ymaps.Placemark(coords, {
                hintContent: 'АЙС Дизель Сервис',
                balloonContent: '<strong>Грузовой автосервис АЙС</strong><br>Пригородная ул., 129<br>Круглосуточно'
            }, {
                preset: 'islands#orangeAutoIcon'
            });

            map.geoObjects.add(placemark);
            
            // disable scroll zoom
            map.behaviors.disable('scrollZoom');
        } catch (e) {
            console.error('Yandex Maps loading error', e);
        }
    }
});
