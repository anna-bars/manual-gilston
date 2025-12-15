/**
 * Gilson Insights Slider - օպտիմալացված
 */
class InsightsSlider {
    constructor() {
        this.slider = document.querySelector('.gilson-insights__slider');
        if (!this.slider) return;
        
        this.slidesWrapper = this.slider.querySelector('.gilson-insights__slides');
        this.slideItems = this.slidesWrapper.querySelectorAll('.gilson-insights__slide');
        this.totalItems = this.slideItems.length;
        this.dotsContainer = this.slider.querySelector('.gilson-insights__dots');
        this.prevBtn = this.slider.querySelector('.gilson-insights__nav--prev');
        this.nextBtn = this.slider.querySelector('.gilson-insights__nav--next');
        
        this.state = {
            currentIndex: 0,
            isTransitioning: false,
            slidesPerView: 4,
            totalSlides: 0
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
        this.updateSlider();
    }
    
    setupInfiniteScroll() {
        const clonesNeeded = this.state.slidesPerView;
        
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
        
        this.state.totalSlides = this.totalItems + (clonesNeeded * 2);
        this.state.currentIndex = clonesNeeded;
        this.updateSlider(false);
    }
    
    removeClones() {
        this.clonedSlides.forEach(clone => {
            clone.remove();
        });
        this.clonedSlides = [];
    }
    
    updateSlider(animate = true) {
        if (this.state.isTransitioning) return;
        
        this.state.isTransitioning = true;
        const slideWidth = 100 / this.state.slidesPerView;
        const translateX = -this.state.currentIndex * slideWidth;
        
        this.slidesWrapper.style.transition = animate ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
        this.slidesWrapper.style.transform = `translateX(${translateX}%)`;
        
        setTimeout(() => {
            this.checkLoopBoundaries();
            this.updateDots();
        }, animate ? 500 : 0);
    }
    
    checkLoopBoundaries() {
        const clonesCount = this.state.slidesPerView;
        const totalOriginalSlides = this.totalItems;
        
        if (this.state.currentIndex < clonesCount) {
            this.state.currentIndex = totalOriginalSlides + clonesCount - 1;
            this.jumpToSlide();
        } else if (this.state.currentIndex >= totalOriginalSlides + clonesCount) {
            this.state.currentIndex = clonesCount;
            this.jumpToSlide();
        }
        
        setTimeout(() => {
            this.state.isTransitioning = false;
        }, 50);
    }
    
    jumpToSlide() {
        const slideWidth = 100 / this.state.slidesPerView;
        const translateX = -this.state.currentIndex * slideWidth;
        
        this.slidesWrapper.style.transition = 'none';
        this.slidesWrapper.style.transform = `translateX(${translateX}%)`;
    }
    
    getOriginalSlideIndex() {
        const clonesCount = this.state.slidesPerView;
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
            dot.className = 'gilson-insights__dot';
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
                if (e.target.classList.contains('gilson-insights__dot')) {
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
        
        const clonesCount = this.state.slidesPerView;
        this.state.currentIndex = originalIndex + clonesCount;
        this.updateSlider();
        this.resetAutoSlide();
    }
    
    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.gilson-insights__dot');
        if (!dots.length) return;
        
        const currentOriginalIndex = this.getOriginalSlideIndex();
        
        dots.forEach((dot, index) => {
            const isActive = index === currentOriginalIndex;
            dot.classList.toggle('gilson-insights__dot--active', isActive);
            dot.setAttribute('aria-current', isActive);
        });
    }
    
    startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
    
    resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
    
    destroy() {
        this.stopAutoSlide();
        this.removeClones();
        window.removeEventListener('resize', this.updateResponsive);
    }
}

// Initialize slider
document.addEventListener('DOMContentLoaded', () => {
    new InsightsSlider();
});