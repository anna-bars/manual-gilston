/**
 * Video Slider - օպտիմալացված
 */
class VideoSlider {
    constructor() {
        this.slider = document.querySelector('.gilson-video__slider');
        if (!this.slider) return;
        
        this.slidesWrapper = this.slider.querySelector('.gilson-video__slides');
        this.slideItems = this.slidesWrapper.querySelectorAll('.gilson-video__slide');
        this.totalItems = this.slideItems.length;
        this.dotsContainer = this.slider.querySelector('.gilson-video__dots');
        this.prevBtn = this.slider.querySelector('.gilson-video__nav--prev');
        this.nextBtn = this.slider.querySelector('.gilson-video__nav--next');
        
        this.state = {
            currentIndex: 0,
            isTransitioning: false,
            slidesPerView: 4,
            autoSlideInterval: null
        };
        
        this.clonedSlides = [];
        this.init();
    }
    
    init() {
        this.setupSlider();
        this.bindEvents();
        this.updateResponsive();
        this.startAutoSlide();
    }
    
    setupSlider() {
        this.removeClones();
        this.setupInfiniteScroll();
        this.createDots();
        this.updateSlider(false);
    }
    
    setupInfiniteScroll() {
        const clonesNeeded = Math.min(this.state.slidesPerView, this.totalItems);
        
        // Clone last items to beginning
        for (let i = this.totalItems - clonesNeeded; i < this.totalItems; i++) {
            const clone = this.slideItems[i].cloneNode(true);
            this.slidesWrapper.insertBefore(clone, this.slideItems[0]);
            this.clonedSlides.push(clone);
        }
        
        // Clone first items to end
        for (let i = 0; i < clonesNeeded; i++) {
            const clone = this.slideItems[i].cloneNode(true);
            this.slidesWrapper.appendChild(clone);
            this.clonedSlides.push(clone);
        }
        
        this.state.currentIndex = clonesNeeded;
        this.updateSlider(false);
    }
    
    removeClones() {
        this.clonedSlides.forEach(clone => clone.remove());
        this.clonedSlides = [];
    }
    
    updateSlider(animate = true) {
        if (this.state.isTransitioning) return;
        
        this.state.isTransitioning = true;
        const slideWidth = 100 / this.state.slidesPerView;
        const translateX = -this.state.currentIndex * slideWidth;
        
        this.slidesWrapper.style.transition = animate ? 
            'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
        this.slidesWrapper.style.transform = `translateX(${translateX}%)`;
        
        setTimeout(() => {
            this.checkLoopBoundaries();
            this.updateDots();
            this.state.isTransitioning = false;
        }, animate ? 500 : 50);
    }
    
    checkLoopBoundaries() {
        const clonesCount = Math.min(this.state.slidesPerView, this.totalItems);
        
        if (this.state.currentIndex < clonesCount) {
            this.state.currentIndex = this.totalItems + clonesCount - 1;
            this.jumpToSlide();
        } else if (this.state.currentIndex >= this.totalItems + clonesCount) {
            this.state.currentIndex = clonesCount;
            this.jumpToSlide();
        }
    }
    
    jumpToSlide() {
        const slideWidth = 100 / this.state.slidesPerView;
        const translateX = -this.state.currentIndex * slideWidth;
        
        this.slidesWrapper.style.transition = 'none';
        this.slidesWrapper.style.transform = `translateX(${translateX}%)`;
    }
    
    getOriginalSlideIndex() {
        const clonesCount = Math.min(this.state.slidesPerView, this.totalItems);
        
        if (this.state.currentIndex < clonesCount) {
            return this.totalItems - (clonesCount - this.state.currentIndex);
        } else if (this.state.currentIndex >= this.totalItems + clonesCount) {
            return this.state.currentIndex - this.totalItems - clonesCount;
        }
        return this.state.currentIndex - clonesCount;
    }
    
    updateResponsive() {
        const width = window.innerWidth;
        let newSlidesPerView;
        
        if (width <= 768) {
            newSlidesPerView = 1;
        } else if (width <= 992) {
            newSlidesPerView = 2;
        } else if (width <= 1200) {
            newSlidesPerView = 3;
        } else {
            newSlidesPerView = 4;
        }
        
        if (newSlidesPerView !== this.state.slidesPerView) {
            this.state.slidesPerView = newSlidesPerView;
            this.setupSlider();
        }
    }
    
    createDots() {
        if (!this.dotsContainer || this.totalItems <= 1) return;
        
        this.dotsContainer.innerHTML = '';
        
        for (let i = 0; i < this.totalItems; i++) {
            const dot = document.createElement('button');
            dot.className = 'gilson-video__dot';
            dot.type = 'button';
            dot.role = 'tab';
            dot.ariaLabel = `Go to slide ${i + 1}`;
            dot.dataset.slide = i;
            
            this.dotsContainer.appendChild(dot);
        }
    }
    
    bindEvents() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        if (this.dotsContainer) {
            this.dotsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('gilson-video__dot')) {
                    this.goToSlide(parseInt(e.target.dataset.slide));
                }
            });
        }
        
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
        
        // Resize
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => this.updateResponsive(), 250);
        });
    }
    
    nextSlide() {
        if (this.state.isTransitioning) return;
        this.state.currentIndex++;
        this.updateSlider();
        this.resetAutoSlide();
    }
    
    prevSlide() {
        if (this.state.isTransitioning) return;
        this.state.currentIndex--;
        this.updateSlider();
        this.resetAutoSlide();
    }
    
    goToSlide(originalIndex) {
        if (this.state.isTransitioning || originalIndex < 0 || originalIndex >= this.totalItems) return;
        
        const clonesCount = Math.min(this.state.slidesPerView, this.totalItems);
        this.state.currentIndex = originalIndex + clonesCount;
        this.updateSlider();
        this.resetAutoSlide();
    }
    
    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.gilson-video__dot');
        if (!dots.length) return;
        
        const currentOriginalIndex = this.getOriginalSlideIndex();
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('gilson-video__dot--active', index === currentOriginalIndex);
            dot.setAttribute('aria-current', index === currentOriginalIndex);
        });
    }
    
    startAutoSlide() {
        this.stopAutoSlide();
        this.state.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
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
}

// Initialize slider
document.addEventListener('DOMContentLoaded', () => {
    new VideoSlider();
});