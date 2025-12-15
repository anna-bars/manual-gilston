/**
 * Footer Banner Slider - օպտիմալացված
 */
class FooterBannerSlider {
    constructor() {
        this.slider = document.querySelector('.footer-banner__slider');
        if (!this.slider) return;
        
        this.slidesWrapper = this.slider.querySelector('.footer-banner__slides');
        this.slideItems = this.slidesWrapper.querySelectorAll('.footer-banner__slide');
        this.totalSlides = this.slideItems.length;
        this.prevBtn = this.slider.querySelector('.footer-banner__nav--prev');
        this.nextBtn = this.slider.querySelector('.footer-banner__nav--next');
        
        this.state = {
            currentIndex: 0,
            isTransitioning: false,
            autoSlideInterval: null
        };
        
        this.init();
    }
    
    init() {
        this.setupSlider();
        this.bindEvents();
        this.startAutoSlide();
    }
    
    setupSlider() {
        this.updateSlider(false);
        this.updateButtons();
    }
    
    updateSlider(animate = true) {
        if (this.state.isTransitioning) return;
        
        this.state.isTransitioning = true;
        const translateX = -this.state.currentIndex * 100;
        
        this.slidesWrapper.style.transition = animate ? 
            'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
        this.slidesWrapper.style.transform = `translateX(${translateX}%)`;
        
        setTimeout(() => {
            this.state.isTransitioning = false;
            this.updateButtons();
        }, animate ? 500 : 50);
    }
    
    nextSlide() {
        if (this.state.isTransitioning) return;
        
        if (this.state.currentIndex < this.totalSlides - 1) {
            this.state.currentIndex++;
        } else {
            this.state.currentIndex = 0;
        }
        
        this.updateSlider(true);
        this.resetAutoSlide();
    }
    
    prevSlide() {
        if (this.state.isTransitioning) return;
        
        if (this.state.currentIndex > 0) {
            this.state.currentIndex--;
        } else {
            this.state.currentIndex = this.totalSlides - 1;
        }
        
        this.updateSlider(true);
        this.resetAutoSlide();
    }
    
    updateButtons() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.state.currentIndex === 0;
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = this.state.currentIndex === this.totalSlides - 1;
        }
    }
    
    bindEvents() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Touch events
        let touchStartX = 0;
        this.slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            this.stopAutoSlide();
        }, { passive: true });
        
        this.slider.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            if (diff > 50) this.nextSlide();
            else if (diff < -50) this.prevSlide();
            
            this.startAutoSlide();
        }, { passive: true });
        
        // Auto-slide control
        this.slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.slider.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    startAutoSlide() {
        this.stopAutoSlide();
        this.state.autoSlideInterval = setInterval(() => this.nextSlide(), 6000);
    }
    
    stopAutoSlide() {
        if (this.state.autoSlideInterval) {
            clearInterval(this.state.autoSlideInterval);
            this.state.autoSlideInterval = null;
        }
    }
    
    resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
    
    destroy() {
        this.stopAutoSlide();
    }
}

// Initialize slider
document.addEventListener('DOMContentLoaded', () => {
    new FooterBannerSlider();
});