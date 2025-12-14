/**
 * Gilson Insights Slider - Վերօգտագործված Featured Products Slider-ից
 */
class GilsonInsightsSlider {
    constructor() {
        this.selectors = {
            slider: '.gilson-insights__slider-wrapper',
            container: '.gilson-insights__slider-container',
            slidesWrapper: '.gilson-insights__slides-wrapper',
            slides: '.gilson-insights__slide',
            prevBtn: '.gilson-insights__nav--prev',
            nextBtn: '.gilson-insights__nav--next',
            dotsContainer: '.gilson-insights__dots'
        };
        
        this.elements = {};
        this.state = {
            currentIndex: 0,
            isTransitioning: false,
            slidesPerView: 4,
            totalSlides: 0
        };
        
        this.init();
    }
    
    init() {
        // Get DOM elements
        for (const key in this.selectors) {
            this.elements[key] = document.querySelector(this.selectors[key]);
        }
        
        if (!this.elements.slider) return;
        
        this.slideItems = document.querySelectorAll(this.selectors.slides);
        this.totalItems = this.slideItems.length;
        
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
        this.clonedSlides = [];
        
        // Clone last items to beginning (for infinite scroll)
        for (let i = this.totalItems - clonesNeeded; i < this.totalItems; i++) {
            const clone = this.slideItems[i].cloneNode(true);
            clone.classList.add('gilson-insights__slide--cloned');
            this.elements.slidesWrapper.insertBefore(clone, this.slideItems[0]);
            this.clonedSlides.push(clone);
        }
        
        // Clone first items to end (for infinite scroll)
        for (let i = 0; i < clonesNeeded; i++) {
            const clone = this.slideItems[i].cloneNode(true);
            clone.classList.add('gilson-insights__slide--cloned');
            this.elements.slidesWrapper.appendChild(clone);
            this.clonedSlides.push(clone);
        }
        
        this.state.totalSlides = this.totalItems + (clonesNeeded * 2);
        // Start from original first slide (after clones)
        this.state.currentIndex = clonesNeeded;
        this.updateSlider(false);
    }
    
    removeClones() {
        if (this.clonedSlides) {
            this.clonedSlides.forEach(clone => {
                if (clone.parentNode) clone.parentNode.removeChild(clone);
            });
        }
        this.clonedSlides = [];
    }
    
    updateSlider(animate = true) {
        if (this.state.isTransitioning) return;
        
        this.state.isTransitioning = true;
        const slideWidth = 100 / this.state.slidesPerView;
        const translateX = -this.state.currentIndex * slideWidth;
        
        this.elements.slidesWrapper.style.transition = animate ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
        this.elements.slidesWrapper.style.transform = `translateX(${translateX}%)`;
        
        // Check for infinite scroll loop
        setTimeout(() => {
            this.checkLoopBoundaries();
        }, animate ? 500 : 0);
        
        this.updateDots();
    }
    
    checkLoopBoundaries() {
        const clonesCount = this.state.slidesPerView;
        const totalOriginalSlides = this.totalItems;
        
        // If we're at the beginning clones, jump to real end
        if (this.state.currentIndex < clonesCount) {
            this.state.currentIndex = totalOriginalSlides + clonesCount - 1;
            const slideWidth = 100 / this.state.slidesPerView;
            const translateX = -this.state.currentIndex * slideWidth;
            
            this.elements.slidesWrapper.style.transition = 'none';
            this.elements.slidesWrapper.style.transform = `translateX(${translateX}%)`;
        }
        // If we're at the end clones, jump to real beginning
        else if (this.state.currentIndex >= totalOriginalSlides + clonesCount) {
            this.state.currentIndex = clonesCount;
            const slideWidth = 100 / this.state.slidesPerView;
            const translateX = -this.state.currentIndex * slideWidth;
            
            this.elements.slidesWrapper.style.transition = 'none';
            this.elements.slidesWrapper.style.transform = `translateX(${translateX}%)`;
        }
        
        setTimeout(() => {
            this.state.isTransitioning = false;
        }, 50);
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
        if (!this.elements.dotsContainer || this.totalItems <= 1) return;
        
        this.elements.dotsContainer.innerHTML = '';
        
        for (let i = 0; i < this.totalItems; i++) {
            const dot = document.createElement('button');
            dot.className = 'gilson-insights__dot';
            dot.setAttribute('type', 'button');
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.setAttribute('data-slide', i);
            
            if (i === this.getOriginalSlideIndex()) {
                dot.classList.add('gilson-insights__dot--active');
                dot.setAttribute('aria-current', 'true');
            }
            
            this.elements.dotsContainer.appendChild(dot);
        }
    }
    
    bindEvents() {
        // Navigation buttons
        if (this.elements.prevBtn) {
            this.elements.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.elements.nextBtn) {
            this.elements.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Dots navigation
        if (this.elements.dotsContainer) {
            this.elements.dotsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('gilson-insights__dot')) {
                    const slideIndex = parseInt(e.target.dataset.slide);
                    this.goToSlide(slideIndex);
                }
            });
        }
        
        // Touch events
        let touchStartX = 0;
        this.elements.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            this.stopAutoSlide();
        }, { passive: true });
        
        this.elements.container.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) this.nextSlide();
            else if (touchEndX > touchStartX + 50) this.prevSlide();
            this.startAutoSlide();
        }, { passive: true });
        
        // Mouse hover
        this.elements.slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.elements.slider.addEventListener('mouseleave', () => this.startAutoSlide());
        
        // Window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.updateResponsive();
            }, 250);
        });
        
        // Transition end
        this.elements.slidesWrapper.addEventListener('transitionend', () => {
            this.state.isTransitioning = false;
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
    
    goToSlide(originalIndex, animate = true) {
        if (this.state.isTransitioning || originalIndex < 0 || originalIndex >= this.totalItems) return;
        
        const clonesCount = this.state.slidesPerView;
        this.state.currentIndex = originalIndex + clonesCount;
        this.updateSlider(animate);
        this.resetAutoSlide();
    }
    
    updateDots() {
        const dots = document.querySelectorAll('.gilson-insights__dot');
        if (!dots.length) return;
        
        const currentOriginalIndex = this.getOriginalSlideIndex();
        
        dots.forEach((dot, index) => {
            const isActive = index === currentOriginalIndex;
            dot.classList.toggle('gilson-insights__dot--active', isActive);
            dot.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
    }
    
    startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
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
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const insightsSlider = new GilsonInsightsSlider();
});