/**
 * Footer Banner Slider - Պարզ սլայդեր միայն սլաքներով
 */
class FooterBannerSlider {
    constructor() {
        this.selectors = {
            slider: '.js-footer-banner-slider',
            container: '.footer-banner__slider-container',
            slidesWrapper: '.footer-banner__slides-wrapper',
            slides: '.footer-banner__slide',
            prevBtn: '.footer-banner__nav--prev',
            nextBtn: '.footer-banner__nav--next'
        };
        
        this.elements = {};
        this.state = {
            currentIndex: 0,
            isTransitioning: false,
            totalSlides: 0,
            autoSlideInterval: null,
            isAutoSlideActive: true,
            isDragging: false,
            dragStartX: 0,
            dragThreshold: 50
        };
        
        this.init();
    }
    
    init() {
        this.getElements();
        
        if (!this.elements.slider) {
            console.warn('Footer Banner Slider not found');
            return;
        }
        
        this.slideItems = document.querySelectorAll(this.selectors.slides);
        this.state.totalSlides = this.slideItems.length;
        
        if (this.state.totalSlides === 0) {
            console.warn('No slides found for Footer Banner Slider');
            return;
        }
        
        console.log(`Footer Banner Slider initialized with ${this.state.totalSlides} slides`);
        
        this.setupSlider();
        this.bindEvents();
        this.startAutoSlide();
    }
    
    getElements() {
        for (const key in this.selectors) {
            this.elements[key] = document.querySelector(this.selectors[key]);
        }
    }
    
    setupSlider() {
        // Set initial position
        this.updateSlider(false);
        this.updateNavigationButtons();
    }
    
    updateSlider(animate = true) {
        if (this.state.isTransitioning) return;
        
        this.state.isTransitioning = true;
        const translateX = -this.state.currentIndex * 100;
        
        this.elements.slidesWrapper.style.transition = animate ? 
            'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
        this.elements.slidesWrapper.style.transform = `translateX(${translateX}%)`;
        
        const completeTransition = () => {
            this.state.isTransitioning = false;
        };
        
        if (animate) {
            this.elements.slidesWrapper.addEventListener('transitionend', completeTransition, { once: true });
        } else {
            setTimeout(completeTransition, 50);
        }
        
        this.updateNavigationButtons();
    }
    
    nextSlide() {
        if (this.state.isTransitioning) return;
        
        if (this.state.currentIndex < this.state.totalSlides - 1) {
            this.state.currentIndex++;
        } else {
            this.state.currentIndex = 0; // Loop to first slide
        }
        
        this.updateSlider(true);
        this.resetAutoSlide();
    }
    
    prevSlide() {
        if (this.state.isTransitioning) return;
        
        if (this.state.currentIndex > 0) {
            this.state.currentIndex--;
        } else {
            this.state.currentIndex = this.state.totalSlides - 1; // Loop to last slide
        }
        
        this.updateSlider(true);
        this.resetAutoSlide();
    }
    
    goToSlide(index) {
        if (this.state.isTransitioning || index < 0 || index >= this.state.totalSlides) return;
        
        this.state.currentIndex = index;
        this.updateSlider(true);
        this.resetAutoSlide();
    }
    
    updateNavigationButtons() {
        // Update prev button state
        if (this.elements.prevBtn) {
            if (this.state.currentIndex === 0) {
                this.elements.prevBtn.disabled = true;
                this.elements.prevBtn.setAttribute('aria-disabled', 'true');
            } else {
                this.elements.prevBtn.disabled = false;
                this.elements.prevBtn.setAttribute('aria-disabled', 'false');
            }
        }
        
        // Update next button state
        if (this.elements.nextBtn) {
            if (this.state.currentIndex === this.state.totalSlides - 1) {
                this.elements.nextBtn.disabled = true;
                this.elements.nextBtn.setAttribute('aria-disabled', 'true');
            } else {
                this.elements.nextBtn.disabled = false;
                this.elements.nextBtn.setAttribute('aria-disabled', 'false');
            }
        }
    }
    
    bindEvents() {
        // Navigation buttons
        if (this.elements.prevBtn) {
            this.elements.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.prevSlide();
            });
        }
        
        if (this.elements.nextBtn) {
            this.elements.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.nextSlide();
            });
        }
        
        // Mouse drag events
        this.elements.container.addEventListener('mousedown', this.handleDragStart.bind(this));
        this.elements.container.addEventListener('mousemove', this.handleDragMove.bind(this));
        this.elements.container.addEventListener('mouseup', this.handleDragEnd.bind(this));
        this.elements.container.addEventListener('mouseleave', this.handleDragEnd.bind(this));
        
        // Touch events
        this.elements.container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        this.elements.container.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        this.elements.container.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
        
        // Keyboard navigation
        this.elements.container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextSlide();
            }
        });
        
        // Make container focusable for keyboard navigation
        this.elements.container.setAttribute('tabindex', '0');
        
        // Pause auto-slide on hover/focus
        this.elements.container.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.elements.container.addEventListener('mouseleave', () => {
            if (this.state.isAutoSlideActive) {
                this.startAutoSlide();
            }
        });
        
        this.elements.container.addEventListener('focusin', () => this.stopAutoSlide());
        this.elements.container.addEventListener('focusout', () => {
            if (this.state.isAutoSlideActive) {
                this.startAutoSlide();
            }
        });
        
        // Handle image load for proper sizing
        const images = this.elements.container.querySelectorAll('img');
        images.forEach(img => {
            if (img.complete) {
                this.handleImageLoad();
            } else {
                img.addEventListener('load', this.handleImageLoad.bind(this));
            }
        });
    }
    
    handleDragStart(e) {
        this.state.isDragging = true;
        this.state.dragStartX = e.clientX || e.touches[0].clientX;
        this.stopAutoSlide();
        this.elements.container.style.cursor = 'grabbing';
    }
    
    handleDragMove(e) {
        if (!this.state.isDragging) return;
        e.preventDefault();
    }
    
    handleDragEnd(e) {
        if (!this.state.isDragging) return;
        
        const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
        if (!clientX) return;
        
        const dragEndX = clientX;
        const diff = dragEndX - this.state.dragStartX;
        
        if (Math.abs(diff) > this.state.dragThreshold) {
            if (diff < 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
        
        this.state.isDragging = false;
        this.elements.container.style.cursor = 'grab';
        this.startAutoSlide();
    }
    
    handleTouchStart(e) {
        this.handleDragStart(e);
    }
    
    handleTouchMove(e) {
        if (!this.state.isDragging) return;
        
        // Prevent vertical scroll when horizontal swipe is detected
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const diffX = Math.abs(touchX - this.state.dragStartX);
        const diffY = Math.abs(touchY - e.touches[0].clientY);
        
        if (diffX > diffY) {
            e.preventDefault();
        }
    }
    
    handleTouchEnd(e) {
        this.handleDragEnd(e);
    }
    
    handleImageLoad() {
        // Ensure slider is properly sized after images load
        setTimeout(() => {
            this.updateSlider(false);
        }, 100);
    }
    
    startAutoSlide() {
        this.stopAutoSlide();
        this.state.isAutoSlideActive = true;
        
        this.state.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 6000); // 6 seconds for banner slides
    }
    
    stopAutoSlide() {
        if (this.state.autoSlideInterval) {
            clearInterval(this.state.autoSlideInterval);
            this.state.autoSlideInterval = null;
        }
    }
    
    resetAutoSlide() {
        this.stopAutoSlide();
        if (this.state.isAutoSlideActive) {
            this.startAutoSlide();
        }
    }
    
    destroy() {
        this.stopAutoSlide();
        
        // Remove event listeners
        if (this.elements.prevBtn) {
            const newPrevBtn = this.elements.prevBtn.cloneNode(true);
            this.elements.prevBtn.parentNode.replaceChild(newPrevBtn, this.elements.prevBtn);
        }
        
        if (this.elements.nextBtn) {
            const newNextBtn = this.elements.nextBtn.cloneNode(true);
            this.elements.nextBtn.parentNode.replaceChild(newNextBtn, this.elements.nextBtn);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const footerBannerSlider = new FooterBannerSlider();
    
    // Export for debugging if needed
    window.footerBannerSlider = footerBannerSlider;
});