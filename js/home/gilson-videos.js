/**
 * Gilson Video Slider
 */
class GilsonVideoSlider {
    constructor() {
        this.selectors = {
            slider: '.js-video-slider',
            container: '.gilson-video__slider-container',
            slidesWrapper: '.gilson-video__slides-wrapper',
            slides: '.gilson-video__slide',
            prevBtn: '.gilson-video__nav--prev',
            nextBtn: '.gilson-video__nav--next',
            dotsContainer: '.gilson-video__dots'
        };
        
        this.elements = {};
        this.state = {
            currentIndex: 0,
            isTransitioning: false,
            slidesPerView: 4,
            totalSlides: 0,
            autoSlideInterval: null,
            isAutoSlideActive: true,
            isDragging: false,
            dragStartX: 0,
            dragStartY: 0
        };
        
        this.init();
    }
    
    init() {
        this.getElements();
        
        if (!this.elements.slider) {
            console.warn('Gilson Video Slider not found');
            return;
        }
        
        this.slideItems = document.querySelectorAll(this.selectors.slides);
        this.totalItems = this.slideItems.length;
        
        if (this.totalItems === 0) {
            console.warn('No slides found for Gilson Video Slider');
            return;
        }
        
        console.log(`Gilson Video Slider initialized with ${this.totalItems} slides`);
        
        this.setupSlider();
        this.bindEvents();
        this.updateResponsive();
        this.startAutoSlide();
    }
    
    getElements() {
        for (const key in this.selectors) {
            this.elements[key] = document.querySelector(this.selectors[key]);
        }
    }
    
    setupSlider() {
        this.state.slidesPerView = this.calculateSlidesPerView();
        this.removeClones();
        this.setupInfiniteScroll();
        this.createDots();
        this.updateSlider(false);
    }
    
    setupInfiniteScroll() {
        const clonesNeeded = Math.min(this.state.slidesPerView, this.totalItems);
        this.clonedSlides = [];
        
        // Clone last items to beginning
        for (let i = this.totalItems - clonesNeeded; i < this.totalItems; i++) {
            const clone = this.slideItems[i].cloneNode(true);
            clone.classList.add('gilson-video__slide--cloned');
            this.elements.slidesWrapper.insertBefore(clone, this.slideItems[0]);
            this.clonedSlides.push(clone);
        }
        
        // Clone first items to end
        for (let i = 0; i < clonesNeeded; i++) {
            const clone = this.slideItems[i].cloneNode(true);
            clone.classList.add('gilson-video__slide--cloned');
            this.elements.slidesWrapper.appendChild(clone);
            this.clonedSlides.push(clone);
        }
        
        this.state.totalSlides = this.totalItems + (clonesNeeded * 2);
        this.state.currentIndex = clonesNeeded;
    }
    
    removeClones() {
        if (this.clonedSlides && this.clonedSlides.length > 0) {
            this.clonedSlides.forEach(clone => {
                if (clone && clone.parentNode) {
                    clone.parentNode.removeChild(clone);
                }
            });
        }
        this.clonedSlides = [];
    }
    
    updateSlider(animate = true) {
        if (this.state.isTransitioning) return;
        
        this.state.isTransitioning = true;
        const slideWidth = 100 / this.state.slidesPerView;
        const translateX = -this.state.currentIndex * slideWidth;
        
        this.elements.slidesWrapper.style.transition = animate ? 
            'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
        this.elements.slidesWrapper.style.transform = `translateX(${translateX}%)`;
        
        const completeTransition = () => {
            this.checkLoopBoundaries();
            this.state.isTransitioning = false;
        };
        
        if (animate) {
            this.elements.slidesWrapper.addEventListener('transitionend', completeTransition, { once: true });
        } else {
            setTimeout(completeTransition, 50);
        }
        
        this.updateDots();
        this.updateNavigationButtons();
    }
    
    checkLoopBoundaries() {
        const clonesCount = Math.min(this.state.slidesPerView, this.totalItems);
        const totalOriginalSlides = this.totalItems;
        
        // Jump to real end if at beginning clones
        if (this.state.currentIndex < clonesCount) {
            this.state.currentIndex = totalOriginalSlides + clonesCount - 1;
            const slideWidth = 100 / this.state.slidesPerView;
            const translateX = -this.state.currentIndex * slideWidth;
            
            this.elements.slidesWrapper.style.transition = 'none';
            this.elements.slidesWrapper.style.transform = `translateX(${translateX}%)`;
        }
        // Jump to real beginning if at end clones
        else if (this.state.currentIndex >= totalOriginalSlides + clonesCount) {
            this.state.currentIndex = clonesCount;
            const slideWidth = 100 / this.state.slidesPerView;
            const translateX = -this.state.currentIndex * slideWidth;
            
            this.elements.slidesWrapper.style.transition = 'none';
            this.elements.slidesWrapper.style.transform = `translateX(${translateX}%)`;
        }
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
    
    calculateSlidesPerView() {
        const width = window.innerWidth;
        
        if (width <= 768) {
            return 1;
        } else if (width <= 992) {
            return 2;
        } else if (width <= 1200) {
            return 3;
        } else {
            return 4;
        }
    }
    
    updateResponsive() {
        const newSlidesPerView = this.calculateSlidesPerView();
        
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
            dot.className = 'gilson-video__dot';
            dot.setAttribute('type', 'button');
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.setAttribute('data-slide', i);
            
            if (i === this.getOriginalSlideIndex()) {
                dot.classList.add('gilson-video__dot--active');
                dot.setAttribute('aria-current', 'true');
            }
            
            this.elements.dotsContainer.appendChild(dot);
        }
    }
    
    bindEvents() {
        // Navigation buttons
        if (this.elements.prevBtn) {
            this.elements.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.prevSlide();
            });
        }
        
        if (this.elements.nextBtn) {
            this.elements.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextSlide();
            });
        }
        
        // Dots navigation
        if (this.elements.dotsContainer) {
            this.elements.dotsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('gilson-video__dot')) {
                    const slideIndex = parseInt(e.target.dataset.slide);
                    this.goToSlide(slideIndex);
                }
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
        
        // Mouse hover
        const sliderWrapper = this.elements.slider.closest('.gilson-video__slider-wrapper');
        if (sliderWrapper) {
            sliderWrapper.addEventListener('mouseenter', () => this.stopAutoSlide());
            sliderWrapper.addEventListener('mouseleave', () => {
                if (this.state.isAutoSlideActive) {
                    this.startAutoSlide();
                }
            });
        }
        
        // Window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.updateResponsive();
            }, 250);
        });
    }
    
    handleDragStart(e) {
        this.state.isDragging = true;
        this.state.dragStartX = e.clientX;
        this.state.dragStartY = e.clientY;
        this.stopAutoSlide();
        this.elements.container.style.cursor = 'grabbing';
    }
    
    handleDragMove(e) {
        if (!this.state.isDragging) return;
        e.preventDefault();
    }
    
    handleDragEnd(e) {
        if (!this.state.isDragging) return;
        
        const dragEndX = e.clientX;
        const diff = dragEndX - this.state.dragStartX;
        
        if (Math.abs(diff) > 50) {
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
        this.state.isDragging = true;
        this.state.dragStartX = e.touches[0].clientX;
        this.state.dragStartY = e.touches[0].clientY;
        this.stopAutoSlide();
    }
    
    handleTouchMove(e) {
        if (!this.state.isDragging) return;
        
        // Prevent vertical scroll when horizontal swipe is detected
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const diffX = Math.abs(touchX - this.state.dragStartX);
        const diffY = Math.abs(touchY - this.state.dragStartY);
        
        if (diffX > diffY) {
            e.preventDefault();
        }
    }
    
    handleTouchEnd(e) {
        if (!this.state.isDragging) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchEndX - this.state.dragStartX;
        
        if (Math.abs(diff) > 50) {
            if (diff < 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
        
        this.state.isDragging = false;
        this.startAutoSlide();
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
        this.updateSlider(true);
        this.resetAutoSlide();
    }
    
    updateDots() {
        const dots = document.querySelectorAll('.gilson-video__dot');
        if (!dots.length) return;
        
        const currentOriginalIndex = this.getOriginalSlideIndex();
        
        dots.forEach((dot, index) => {
            const isActive = index === currentOriginalIndex;
            dot.classList.toggle('gilson-video__dot--active', isActive);
            dot.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
    }
    
    updateNavigationButtons() {
        // Optional: Add disabled states if needed
    }
    
    startAutoSlide() {
        this.stopAutoSlide();
        this.state.isAutoSlideActive = true;
        
        this.state.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
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
        this.removeClones();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const videoSlider = new GilsonVideoSlider();
    
    // Export for debugging if needed
    window.gilsonVideoSlider = videoSlider;
});