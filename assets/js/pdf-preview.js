/**
 * PDF Thumbnail Preview
 * Renders the first page of each PDF into a canvas element
 * using PDF.js library.
 */
(function () {
    'use strict';

    // Set the PDF.js worker
    pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    // Get all canvas elements with PDF source
    const canvases = document.querySelectorAll('canvas.pdf-thumbnail[data-pdf-src]');

    canvases.forEach(function (canvas) {
        const pdfUrl = canvas.getAttribute('data-pdf-src');
        const container = canvas.closest('.pdf-preview-container');

        // Show a loading spinner while PDF loads
        canvas.style.display = 'none';
        const spinner = document.createElement('div');
        spinner.className = 'pdf-loading-spinner';
        spinner.innerHTML = '<div class="spinner"></div>';
        if (container) container.appendChild(spinner);

        pdfjsLib.getDocument(pdfUrl).promise.then(function (pdf) {
            return pdf.getPage(1);
        }).then(function (page) {
            // Calculate scale to fit the container width
            var containerWidth = container ? container.clientWidth : 280;
            var viewport = page.getViewport({ scale: 1 });
            var scale = containerWidth / viewport.width;
            var scaledViewport = page.getViewport({ scale: scale });

            canvas.width = scaledViewport.width;
            canvas.height = scaledViewport.height;

            var ctx = canvas.getContext('2d');
            var renderContext = {
                canvasContext: ctx,
                viewport: scaledViewport
            };

            return page.render(renderContext).promise;
        }).then(function () {
            // Remove spinner, show canvas
            if (spinner && spinner.parentNode) spinner.parentNode.removeChild(spinner);
            canvas.style.display = 'block';
        }).catch(function (err) {
            console.error('Error rendering PDF thumbnail:', pdfUrl, err);
            // On error, show a fallback icon
            if (spinner && spinner.parentNode) spinner.parentNode.removeChild(spinner);
            canvas.style.display = 'none';
            if (container) {
                var fallback = document.createElement('div');
                fallback.className = 'pdf-fallback-icon';
                fallback.innerHTML = '<svg width="64" height="64" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#E74C3C"/><path d="M7 7h6v2H7zM7 11h10v2H7zM7 15h10v2H7z" fill="#fff"/></svg>';
                container.appendChild(fallback);
            }
        });
    });
})();
