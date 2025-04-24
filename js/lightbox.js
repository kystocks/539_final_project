/**
 * Apple Product History Lightbox
 * A simple, accessible lightbox implementation for image galleries
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get all "Open Gallery" buttons
    const galleryButtons = document.querySelectorAll('.open-gallery');
    
    // Initialize lightbox if buttons exist
    if (galleryButtons.length > 0) {
        initLightbox();
        
        // Add click event listener to each gallery button
        galleryButtons.forEach(button => {
            button.addEventListener('click', openGallery);
        });
    }
});

/**
 * Initialize the lightbox by creating and appending the necessary DOM elements
 */
function initLightbox() {
    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image gallery lightbox');
    lightbox.setAttribute('tabindex', '-1');
    lightbox.style.display = 'none';
    
    // Create lightbox content wrapper
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.className = 'lightbox-close';
    closeButton.setAttribute('aria-label', 'Close gallery');
    
    // Create image container
    const imgContainer = document.createElement('div');
    imgContainer.className = 'lightbox-image-container';
    
    // Create main image
    const img = document.createElement('img');
    img.className = 'lightbox-image';
    img.setAttribute('alt', '');
    
    // Create caption
    const caption = document.createElement('div');
    caption.className = 'lightbox-caption';
    
    // Create navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'lightbox-nav lightbox-prev';
    prevButton.innerHTML = '&#10094;';
    prevButton.setAttribute('aria-label', 'Previous image');
    
    const nextButton = document.createElement('button');
    nextButton.className = 'lightbox-nav lightbox-next';
    nextButton.innerHTML = '&#10095;';
    nextButton.setAttribute('aria-label', 'Next image');
    
    // Create thumbnails container
    const thumbsContainer = document.createElement('div');
    thumbsContainer.className = 'lightbox-thumbnails';
    
    // Append elements to DOM
    imgContainer.appendChild(img);
    lightboxContent.appendChild(closeButton);
    lightboxContent.appendChild(prevButton);
    lightboxContent.appendChild(imgContainer);
    lightboxContent.appendChild(nextButton);
    lightboxContent.appendChild(caption);
    lightbox.appendChild(lightboxContent);
    lightbox.appendChild(thumbsContainer);
    document.body.appendChild(lightbox);
    
    // Add event listeners
    closeButton.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyDown);
    
    // Close lightbox when clicking outside the content
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Global variables to keep track of the current gallery and image index
let currentGallery = [];
let currentIndex = 0;

/**
 * Open the gallery when a gallery button is clicked
 */
function openGallery(event) {
    const button = event.currentTarget;
    const productType = document.body.classList[0]?.replace('-page', '') || '';
    
    // Get gallery images based on product type
    currentGallery = getGalleryImages(productType);
    
    if (currentGallery.length === 0) {
        console.error('No gallery images found for product type:', productType);
        return;
    }
    
    // Display lightbox and show first image
    currentIndex = 0;
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        updateLightboxImage();
        updateThumbnails();
        
        // Show lightbox with animation
        lightbox.style.display = 'flex';
        setTimeout(() => {
            lightbox.classList.add('active');
            // Focus the lightbox for keyboard navigation
            lightbox.focus();
        }, 10);
        
        // Prevent page scrolling when lightbox is open
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Get gallery images based on product type
 */
function getGalleryImages(productType) {
    // Get the base path for URLs, handling both local and GitHub Pages deployments
    const basePath = '/539_final_project';
    
    // Define galleries for each product
    const galleries = {
        'imac': [
            {
                src: basePath + '/images/imac-bondi-blue.jpeg',
                alt: 'Original Bondi Blue iMac G3 from 1998',
                caption: 'The original Bondi Blue iMac G3 (1998) featured a revolutionary all-in-one design.'
            },
            {
                src: basePath + '/images/imac-five-flavors.jpg',
                alt: 'Five flavors of the iMac G3',
                caption: 'The iMac G3 "five flavors" lineup from 1999: Strawberry, Blueberry, Lime, Grape, and Tangerine.'
            },
            {
                src: basePath + '/images/imac-slotload.jpg',
                alt: 'Slot-loading iMac G3',
                caption: 'The slot-loading iMac G3 models introduced in 1999 featured a more refined design.'
            },
            {
                src: basePath + '/images/imac-g4.webp',
                alt: 'iMac G4 "Sunflower" design',
                caption: 'The iMac G4 "Sunflower" (2002-2004) featured a floating display on an adjustable arm.'
            },
            {
                src: basePath + '/images/imacs-through-years.webp',
                alt: 'Evolution of iMac designs through the years',
                caption: 'The evolution of iMac designs from the original G3 to modern thin aluminum models.'
            },
            {
                src: basePath + '/images/Apple-iMac-M4-hero.webp',
                alt: 'Modern M-series iMac with colorful design',
                caption: 'The latest M-series iMac returned to colorful designs reminiscent of the original iMac G3.'
            }
        ],
        'ipod': [
            {
                src: basePath + '/images/ipod-og.jpg',
                alt: 'Original iPod with mechanical scroll wheel',
                caption: 'The original iPod (2001) featured a mechanical scroll wheel and 5GB of storage.'
            },
            {
                src: basePath + '/images/ipod-3.webp',
                alt: 'Third generation iPod with touch wheel',
                caption: 'The third generation iPod introduced the touch-sensitive wheel with separate buttons.'
            },
            {
                src: basePath + '/images/ipod-4.webp',
                alt: 'Fourth generation iPod with click wheel',
                caption: 'The fourth generation iPod (2004) integrated buttons into the click wheel design.'
            },
            {
                src: basePath + '/images/ipod-mini-1-2.webp',
                alt: 'iPod mini in multiple colors',
                caption: 'The iPod mini (2004-2005) came in multiple anodized aluminum colors and introduced the click wheel.'
            },
            {
                src: basePath + '/images/ipod-nano-2.webp',
                alt: 'Second generation iPod nano',
                caption: 'The second generation iPod nano featured an aluminum case in multiple colors.'
            },
            {
                src: basePath + '/images/ipod-nano-4-5.webp',
                alt: 'Fourth and fifth generation iPod nano',
                caption: 'The fourth and fifth generation iPod nano returned to a vertical design with larger screens.'
            },
            {
                src: basePath + '/images/ipod-shuffle-1.webp',
                alt: 'First generation iPod shuffle',
                caption: 'The first iPod shuffle (2005) was designed like a USB stick with no screen.'
            },
            {
                src: basePath + '/images/ipod-touch-1.webp',
                alt: 'First generation iPod touch',
                caption: 'The first iPod touch (2007) featured an iPhone-like design with touchscreen.'
            },
            {
                src: basePath + '/images/ipod-touch-6.webp',
                alt: 'Sixth generation iPod touch',
                caption: 'The sixth generation iPod touch (2015) was one of the last iPod models before discontinuation.'
            },
            {
                src: basePath + '/images/2007-iPod-lineup.jpg',
                alt: 'Complete iPod lineup from 2007',
                caption: 'The complete iPod lineup from 2007 showing all variations: shuffle, nano, classic, and touch.'
            }
        ],
        'iphone': [
            {
                src: basePath + '/images/iphone-1.webp',
                alt: 'Original iPhone from 2007',
                caption: 'The original iPhone (2007) featured a 3.5-inch touchscreen and introduced multi-touch to the mass market.'
            },
            {
                src: basePath + '/images/iphone-10-years.webp',
                alt: 'iPhone evolution over 10 years',
                caption: 'The evolution of iPhone designs over its first decade, from the original to the iPhone X.'
            },
            {
                src: basePath + '/images/ios-homescreens.jpg',
                alt: 'Evolution of iOS home screen designs',
                caption: 'The evolution of iOS home screen designs from the original iPhone OS to modern iOS versions.'
            }
        ]
    };
    
    // Return the gallery for the requested product or an empty array if not found
    return galleries[productType] || [];
}

/**
 * Update the lightbox image, caption, and navigation based on current index
 */
function updateLightboxImage() {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;
    
    const img = lightbox.querySelector('.lightbox-image');
    const caption = lightbox.querySelector('.lightbox-caption');
    const prevButton = lightbox.querySelector('.lightbox-prev');
    const nextButton = lightbox.querySelector('.lightbox-next');
    
    // Update image and caption
    const currentImg = currentGallery[currentIndex];
    img.src = currentImg.src;
    img.alt = currentImg.alt;
    caption.textContent = currentImg.caption;
    
    // Update navigation buttons visibility
    prevButton.style.display = currentIndex > 0 ? 'block' : 'none';
    nextButton.style.display = currentIndex < currentGallery.length - 1 ? 'block' : 'none';
    
    // Update thumbnails to highlight current image
    const thumbnails = lightbox.querySelectorAll('.lightbox-thumbnail');
    thumbnails.forEach((thumb, index) => {
        if (index === currentIndex) {
            thumb.classList.add('active');
            thumb.setAttribute('aria-current', 'true');
        } else {
            thumb.classList.remove('active');
            thumb.setAttribute('aria-current', 'false');
        }
    });
}

/**
 * Create and update thumbnails for easy navigation
 */
function updateThumbnails() {
    const thumbsContainer = document.querySelector('.lightbox-thumbnails');
    if (!thumbsContainer) return;
    
    // Clear existing thumbnails
    thumbsContainer.innerHTML = '';
    
    // Create thumbnails for each image
    currentGallery.forEach((image, index) => {
        const thumb = document.createElement('button');
        thumb.className = 'lightbox-thumbnail';
        thumb.setAttribute('aria-label', `View image ${index + 1}: ${image.alt}`);
        thumb.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
        
        const thumbImg = document.createElement('img');
        thumbImg.src = image.src;
        thumbImg.alt = '';
        thumbImg.setAttribute('role', 'presentation');
        
        thumb.appendChild(thumbImg);
        
        if (index === currentIndex) {
            thumb.classList.add('active');
        }
        
        thumb.addEventListener('click', () => {
            currentIndex = index;
            updateLightboxImage();
        });
        
        thumbsContainer.appendChild(thumb);
    });
}

/**
 * Show the previous image in the gallery
 */
function showPrevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        updateLightboxImage();
    }
}

/**
 * Show the next image in the gallery
 */
function showNextImage() {
    if (currentIndex < currentGallery.length - 1) {
        currentIndex++;
        updateLightboxImage();
    }
}

/**
 * Close the lightbox
 */
function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300); // Match transition time
        
        // Re-enable page scrolling
        document.body.style.overflow = '';
        
        // Return focus to the button that opened the gallery
        const galleryButton = document.querySelector('.open-gallery');
        if (galleryButton) {
            galleryButton.focus();
        }
    }
}

/**
 * Handle keyboard navigation in the lightbox
 */
function handleKeyDown(event) {
    const lightbox = document.querySelector('.lightbox');
    
    // Only handle keyboard events when lightbox is open
    if (lightbox && lightbox.style.display !== 'none') {
        switch (event.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    }
}