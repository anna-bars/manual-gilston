/**
 * Featured Products Slider - Optimized but Same Functionality
 */
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
        // Get DOM elements
        for (const key in this.selectors) {
            this.elements[key] = document.querySelector(this.selectors[key]);
        }
        
        if (!this.elements.slider) return;
        
        this.productItems = document.querySelectorAll(this.selectors.items);
        this.totalItems = this.productItems.length;
        
        this.setupSlider();
        this.bindEvents();
        this.updateResponsive();
        this.startAutoSlide();
    }
    
    setupSlider() {
        this.removeClones();
        this.setupInfiniteScroll();
        this.updateSlider();
    }
    
    setupInfiniteScroll() {
        const clonesNeeded = Math.max(this.state.slidesPerView, 2);
        this.clonedItems = [];
        
        // Clone first items to end
        for (let i = 0; i < clonesNeeded; i++) {
            const clone = this.productItems[i].cloneNode(true);
            clone.classList.add('featured-products__item--cloned');
            this.elements.itemsWrapper.appendChild(clone);
            this.clonedItems.push(clone);
        }
        
        // Clone last items to beginning
        for (let i = this.totalItems - clonesNeeded; i < this.totalItems; i++) {
            const clone = this.productItems[i].cloneNode(true);
            clone.classList.add('featured-products__item--cloned');
            this.elements.itemsWrapper.insertBefore(clone, this.productItems[0]);
            this.clonedItems.push(clone);
        }
        
        this.totalSlides = this.totalItems + (clonesNeeded * 2);
        this.goToSlide(clonesNeeded, false);
    }
    
    removeClones() {
        if (this.clonedItems) {
            this.clonedItems.forEach(clone => {
                if (clone.parentNode) clone.parentNode.removeChild(clone);
            });
        }
        this.clonedItems = [];
    }
    
    updateSlider(animate = true) {
        if (this.state.isTransitioning) return;
        
        this.state.isTransitioning = true;
        const clonesCount = Math.max(this.state.slidesPerView, 2);
        const slideWidth = 100 / this.state.slidesPerView;
        const translateX = -(this.state.currentIndex + clonesCount) * slideWidth;
        
        this.elements.itemsWrapper.style.transition = animate ? 'transform 0.5s ease' : 'none';
        this.elements.itemsWrapper.style.transform = `translateX(${translateX}%)`;
        
        // Update item widths
        const allItems = this.elements.itemsWrapper.querySelectorAll('.featured-products__item');
        allItems.forEach(item => {
            item.style.flex = `0 0 ${slideWidth}%`;
            item.style.maxWidth = `${slideWidth}%`;
        });
        
        this.checkLoopBoundaries();
        this.updateDots();
    }
    
    checkLoopBoundaries() {
        setTimeout(() => {
            const clonesCount = Math.max(this.state.slidesPerView, 2);
            
            if (this.state.currentIndex >= this.totalItems) {
                this.state.currentIndex = 0;
                const slideWidth = 100 / this.state.slidesPerView;
                const translateX = -(this.state.currentIndex + clonesCount) * slideWidth;
                
                this.elements.itemsWrapper.style.transition = 'none';
                this.elements.itemsWrapper.style.transform = `translateX(${translateX}%)`;
                
                setTimeout(() => {
                    this.state.isTransitioning = false;
                }, 50);
            } 
            else if (this.state.currentIndex < 0) {
                this.state.currentIndex = this.totalItems - 1;
                const slideWidth = 100 / this.state.slidesPerView;
                const translateX = -(this.state.currentIndex + clonesCount) * slideWidth;
                
                this.elements.itemsWrapper.style.transition = 'none';
                this.elements.itemsWrapper.style.transform = `translateX(${translateX}%)`;
                
                setTimeout(() => {
                    this.state.isTransitioning = false;
                }, 50);
            } 
            else {
                setTimeout(() => {
                    this.state.isTransitioning = false;
                }, 500);
            }
        }, 500);
    }
    
    updateResponsive() {
        const width = window.innerWidth;
        let newSlidesPerView;
        
        if (width <= 768) {
            newSlidesPerView = 1;
        } else if (width <= 1200) {
            newSlidesPerView = 2;
        } else {
            newSlidesPerView = 4;
        }
        
        if (newSlidesPerView !== this.state.slidesPerView) {
            this.state.slidesPerView = newSlidesPerView;
            this.setupSlider();
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
                if (e.target.classList.contains('featured-products__dot')) {
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
        this.elements.itemsWrapper.addEventListener('transitionend', () => {
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
    
    goToSlide(index, animate = true) {
        if (this.state.isTransitioning || index < 0 || index >= this.totalItems) return;
        this.state.currentIndex = index;
        this.updateSlider(animate);
        this.resetAutoSlide();
    }
    
    updateDots() {
        const dots = document.querySelectorAll('.featured-products__dot');
        if (!dots.length) return;
        
        dots.forEach((dot, index) => {
            const isActive = index === this.state.currentIndex;
            dot.classList.toggle('featured-products__dot--active', isActive);
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
    new FeaturedProductsSlider();
});