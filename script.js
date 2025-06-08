document.addEventListener('DOMContentLoaded', () => {
    const PRELOADER_MIN_TIME = 1000; // Minimum preloader time in ms
    const preloader = document.getElementById('preloader');
    const startTime = new Date().getTime();

    window.addEventListener('load', () => {
        const elapsedTime = new Date().getTime() - startTime;
        const remainingTime = PRELOADER_MIN_TIME - elapsedTime;

        const hidePreloader = () => preloader.classList.add('loaded');

        if (remainingTime > 0) {
            setTimeout(hidePreloader, remainingTime);
        } else {
            hidePreloader();
        }
    });

    // --- Vanta.js 3D Background ---
    if (window.VANTA) {
        VANTA.DOTS({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xffffff,      // B&W
            color2: 0x888888,     // B&W
            backgroundColor: 0x0,
            size: 2.8,
            spacing: 30.0
        });
    }

    // --- 3D Tilt Effect on Main Content ---
    const container = document.querySelector('.container');
    const contentWrapper = document.querySelector('.content-wrapper');
    let animationFrameId = null;

    if (window.innerWidth > 768) {
        container.addEventListener('mousemove', (e) => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            animationFrameId = requestAnimationFrame(() => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 60; // Decreased sensitivity
                const rotateY = (centerX - x) / 60; // Decreased sensitivity

                contentWrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        });

        container.addEventListener('mouseleave', () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            contentWrapper.style.transition = 'transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)';
            contentWrapper.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }

    // --- Avatar Click Animation ---
    const links = document.querySelectorAll('.link-item');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const avatar = this.querySelector('.avatar');
            const href = this.href;

            // Prevent immediate navigation
            e.preventDefault();

            // Add animation class
            avatar.classList.add('clicked');
            
            // Wait for the animation to finish, then navigate
            setTimeout(() => {
                window.open(href, '_blank');
                // Remove class so it can be re-triggered
                avatar.classList.remove('clicked');
            }, 500); // Should match the animation duration in CSS
        });
    });

    // Preload images to prevent emoji fallback on first load
    function preloadImages() {
        const images = ['/static/main.jpg', '/static/main_acc.jpg'];
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    preloadImages();
}); 