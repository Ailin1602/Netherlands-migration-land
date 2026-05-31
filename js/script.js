const container = document.getElementById('scrollContainer');
const arrowBtn = document.querySelector('.arrow-btn');

if (container) {
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
    });
}

if (arrowBtn && container) {
    arrowBtn.addEventListener('click', () => {
        container.scrollBy({
            left: window.innerWidth,
            behavior: 'smooth',
        });
    });
}

// Section modal handlers
function openSectionModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.showModal();
    }
}

function closeSectionModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.close();
    }
}

// Delegate click for arrow-btn-down buttons
document.addEventListener('click', (e) => {
    const target = e.target.closest('.arrow-btn-down');
    if (target) {
        const modalType = target.dataset.popup;
        if (modalType) {
            e.preventDefault();
            openSectionModal(`popup-${modalType}`);
        }
    }
});

// Close modal on close button click
document.addEventListener('click', (e) => {
    if (e.target.matches('.modal--image .close') || e.target.matches('.modal-close')) {
        const modal = e.target.closest('dialog');
        if (modal) {
            modal.close();
        }
    }
});

// Close modal on backdrop click (outside the modal)
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'DIALOG') {
        const rect = e.target.getBoundingClientRect();
        const isInDialog = (
            rect.top <= e.clientY &&
            e.clientY <= rect.top + rect.height &&
            rect.left <= e.clientX &&
            e.clientX <= rect.left + rect.width
        );
        if (!isInDialog) {
            e.target.close();
        }
    }
});

// Handle all klikbaar SVG elements with data-video attributes
document.addEventListener('click', (e) => {
    const klikbaarElement = e.target.closest('[id="klikbaar"]');
    if (klikbaarElement && klikbaarElement.dataset && klikbaarElement.dataset.video) {
        const videoId = klikbaarElement.dataset.video;
        const popup = document.getElementById(`modal-${videoId}`);
        if (popup) {
            popup.showModal();
            // Add autoplay parameter when modal opens
            const videoIframe = popup.querySelector('iframe');
            if (videoIframe) {
                const videoUrl = videoIframe.dataset.videoUrl;
                if (videoUrl && !videoIframe.src) {
                    videoIframe.src = videoUrl + '&autoplay=1';
                } else if (videoIframe.src && !videoIframe.src.includes('autoplay=1')) {
                    videoIframe.src = videoIframe.src.split('&autoplay=')[0] + '&autoplay=1';
                }
            }
        }
    }
});


// Close pop-up on close button click
document.addEventListener('click', (e) => {
    if (e.target.matches('.popup-close')) {
        const popup = e.target.closest('dialog');
        if (popup) {
            // Stop video when closing
            const videoIframe = popup.querySelector('iframe');
            if (videoIframe) {
                const baseSrc = videoIframe.src.split('&autoplay=')[0];
                videoIframe.src = baseSrc;
            }
            popup.close();
        }
    }
});

