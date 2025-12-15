class FeaturedProductsSlider {
    constructor() {
        this.selectors = {
            slider: '.featured-products__slider',
            container: '.featured-products__items-container',
            itemsWrapper: '.featured-products__items',
            items: '.featured-products__item:not(.featured-products__item--cloned)',
            prevBtn: '.featured-products__nav--prev',
            nextBtn: '.featured-products__nav--next',
            dotsContainer: '.featured-products__dots'
        };
        
        this.elements = {};
        this.state = {
            currentIndex: 0,
            isTransitioning: false,
            slidesPerView: 4
        };
        
        this.init();
    }
    
    init() {
        Object.keys(this.selectors).forEach(key => {
            this.elements[key] = document.querySelector(this.selectors[key]);
        });
        
        if (!this.elements.slider) return;
        
        this.productItems = Array.from(document.querySelectorAll(this.selectors.items));
        this.totalItems = this.productItems.length;
        
        this.setupSlider();
        this.bindEvents();
        this.updateResponsive();
        this.startAutoSlide();
    }
    
    setupSlider() {
        this.removeClones();
        this.setupClones();
        this.goToSlide(Math.max(this.state.slidesPerView, 2), false);
        this.updateSlider(true, false);
    }
    
    setupClones() {
        const clonesNeeded = Math.max(this.state.slidesPerView, 2);
        this.clonedItems = [];
        
        // Create beginning clones
        this.productItems.slice(-clonesNeeded).forEach(item => {
            this.createClone(item, 'beginning');
        });
        
        // Create end clones
        this.productItems.slice(0, clonesNeeded).forEach(item => {
            this.createClone(item, 'end');
        });
        
        this.totalSlides = this.totalItems + (clonesNeeded * 2);
    }
    
    createClone(item, position) {
        const clone = item.cloneNode(true);
        clone.classList.add('featured-products__item--cloned');
        
        if (position === 'beginning') {
            this.elements.itemsWrapper.insertBefore(clone, this.productItems[0]);
        } else {
            this.elements.itemsWrapper.appendChild(clone);
        }
        
        this.clonedItems.push(clone);
    }
    
    removeClones() {
        this.clonedItems?.forEach(clone => clone.remove());
        this.clonedItems = [];
    }
    
    updateSlider(animate = true, checkBoundaries = true) {
        if (this.state.isTransitioning) return;
        
        this.state.isTransitioning = true;
        const slideWidth = 100 / this.state.slidesPerView;
        const translateX = -(this.state.currentIndex + Math.max(this.state.slidesPerView, 2)) * slideWidth;
        
        this.elements.itemsWrapper.style.transition = animate ? 'transform 0.5s ease' : 'none';
        this.elements.itemsWrapper.style.transform = `translateX(${translateX}%)`;
        
        // Set item dimensions
        this.elements.itemsWrapper.querySelectorAll('.featured-products__item').forEach(item => {
            item.style.flex = `0 0 ${slideWidth}%`;
            item.style.maxWidth = `${slideWidth}%`;
        });
        
        if (checkBoundaries) {
            setTimeout(() => this.handleBoundaryReset(), 500);
        }
        
        this.updateDots();
    }
    
    handleBoundaryReset() {
        const clonesCount = Math.max(this.state.slidesPerView, 2);
        
        if (this.state.currentIndex >= this.totalItems) {
            this.state.currentIndex = 0;
            this.resetPosition(clonesCount);
        } else if (this.state.currentIndex < 0) {
            this.state.currentIndex = this.totalItems - 1;
            this.resetPosition(clonesCount);
        } else {
            this.state.isTransitioning = false;
        }
    }
    
    resetPosition(clonesCount) {
        const slideWidth = 100 / this.state.slidesPerView;
        const translateX = -(this.state.currentIndex + clonesCount) * slideWidth;
        
        this.elements.itemsWrapper.style.transition = 'none';
        this.elements.itemsWrapper.style.transform = `translateX(${translateX}%)`;
        
        setTimeout(() => {
            this.state.isTransitioning = false;
        }, 50);
    }
    
    updateResponsive() {
        const width = window.innerWidth;
        const breakpoints = [
            { max: 768, slides: 1 },
            { max: 1200, slides: 2 },
            { max: Infinity, slides: 4 }
        ];
        
        const newSlidesPerView = breakpoints.find(bp => width <= bp.max)?.slides || 4;
        
        if (newSlidesPerView !== this.state.slidesPerView) {
            this.state.slidesPerView = newSlidesPerView;
            this.setupSlider();
        }
    }
    
    bindEvents() {
        // Navigation buttons
        [['prevBtn', this.prevSlide.bind(this)], ['nextBtn', this.nextSlide.bind(this)]].forEach(([key, handler]) => {
            this.elements[key]?.addEventListener('click', handler);
        });
        
        // Dots
        this.elements.dotsContainer?.addEventListener('click', (e) => {
            const slideIndex = e.target.dataset?.slide;
            if (slideIndex) this.goToSlide(parseInt(slideIndex));
        });
        
        // Touch events
        let touchStartX = 0;
        const touchHandler = (e) => {
            if (e.type === 'touchstart') {
                touchStartX = e.changedTouches[0].screenX;
                this.stopAutoSlide();
            } else if (e.type === 'touchend') {
                const touchEndX = e.changedTouches[0].screenX;
                if (touchEndX < touchStartX - 50) this.nextSlide();
                else if (touchEndX > touchStartX + 50) this.prevSlide();
                this.startAutoSlide();
            }
        };
        
        this.elements.container.addEventListener('touchstart', touchHandler, { passive: true });
        this.elements.container.addEventListener('touchend', touchHandler, { passive: true });
        
        // Auto-slide controls
        this.elements.slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.elements.slider.addEventListener('mouseleave', () => this.startAutoSlide());
        
        // Resize handler
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => this.updateResponsive(), 250);
        });
        
        // Transition end
        this.elements.itemsWrapper.addEventListener('transitionend', () => {
            this.state.isTransitioning = false;
        });
    }
    
    nextSlide() {
        if (!this.state.isTransitioning) {
            this.state.currentIndex++;
            this.updateSlider();
            this.resetAutoSlide();
        }
    }
    
    prevSlide() {
        if (!this.state.isTransitioning) {
            this.state.currentIndex--;
            this.updateSlider();
            this.resetAutoSlide();
        }
    }
    
    goToSlide(index, animate = true) {
        if (this.state.isTransitioning || index < 0 || index >= this.totalItems) return;
        this.state.currentIndex = index;
        this.updateSlider(animate);
        this.resetAutoSlide();
    }
    
    updateDots() {
        const dots = this.elements.dotsContainer?.querySelectorAll('.featured-products__dot') || [];
        dots.forEach((dot, index) => {
            const isActive = index === this.state.currentIndex;
            dot.classList.toggle('featured-products__dot--active', isActive);
            dot.setAttribute('aria-current', isActive);
        });
    }
    
    startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
    }
    
    stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.autoSlideInterval = null;
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

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => new FeaturedProductsSlider());