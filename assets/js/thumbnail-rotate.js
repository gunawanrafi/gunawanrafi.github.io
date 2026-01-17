// Auto-rotate research thumbnails
document.addEventListener('DOMContentLoaded', function () {
    const researchItems = document.querySelectorAll('[data-research-item]');

    researchItems.forEach(item => {
        const imgElement = item.querySelector('[data-research-img]');
        const details = item.querySelector('[data-research-details]');
        const imagesAttr = details?.getAttribute('data-images');

        if (imagesAttr) {
            const images = imagesAttr.split(',').map(img => img.trim());
            let currentIndex = 0;

            // Rotate images every 3 seconds
            setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                imgElement.src = images[currentIndex];
                imgElement.style.transition = 'opacity 0.5s ease';
                imgElement.style.opacity = '0';

                setTimeout(() => {
                    imgElement.style.opacity = '1';
                }, 100);
            }, 3000);
        }
    });
});
