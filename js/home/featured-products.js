class FeaturedProductsSlider {
    constructor() {
        this.slider = document.querySelector('.featured-products__slider');
        this.itemsWrapper = document.querySelector('.featured-products__items');
        this.items = document.querySelectorAll('.featured-products__item');
        this.prevBtn = document.querySelector('.featured-products__nav--prev');
        this.nextBtn = document.querySelector('.featured-products__nav--next');
        this.dotsContainer = document.querySelector('.featured-products__dots');
        
        if (!this.slider) return;
        
        this.state = {
            currentIndex: 0,
            totalItems: this.items.length,
            isTransitioning: false,
            slidesPerView: this.getSlidesPerView()
        };
        
        this.init();
    }
    
    init() {
        this.setupClones();
        this.bindEvents();
        this.updateSlider(false); // Initial setup without animation
        this.startAutoSlide();
    }
    
    getSlidesPerView() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 1200) return 2;
        return 4;
    }
    
    setupClones() {
        // Remove existing clones
        this.removeClones();
        
        const clonesNeeded = Math.max(this.state.slidesPerView, 2);
        this.clonedItems = [];
        
        // Clone items for infinite scroll
        for (let i = 0; i < clonesNeeded; i++) {
            const cloneEnd = this.items[i].cloneNode(true);
            const cloneStart = this.items[this.state.totalItems - 1 - i].cloneNode(true);
            
            cloneEnd.classList.add('featured-products__item--cloned');
            cloneStart.classList.add('featured-products__item--cloned');
            
            this.itemsWrapper.appendChild(cloneEnd);
            this.itemsWrapper.insertBefore(cloneStart, this.items[0]);
            
            this.clonedItems.push(cloneEnd, cloneStart);
        }
    }
    
    removeClones() {
        if (this.clonedItems) {
            this.clonedItems.forEach(clone => clone.remove());
        }
        this.clonedItems = [];
    }
    
    updateSlider(animate = true) {
        if (this.state.isTransitioning) return;
        
        this.state.isTransitioning = true;
        const clonesCount = Math.max(this.state.slidesPerView, 2);
        const slideWidth = 100 / this.state.slidesPerView;
        const translateX = -(this.state.currentIndex + clonesCount) * slideWidth;
        
        this.itemsWrapper.style.transition = animate ? 'transform 0.5s ease' : 'none';
        this.itemsWrapper.style.transform = `translateX(${translateX}%)`;
        
        // Remove inline styles from items - let CSS handle the responsive widths
        const allItems = this.itemsWrapper.querySelectorAll('.featured-products__item');
        allItems.forEach(item => {
            item.style.flex = '';
            item.style.maxWidth = '';
        });
        
        setTimeout(() => this.checkBoundaries(), animate ? 500 : 50);
        this.updateDots();
    }
    
    checkBoundaries() {
        const clonesCount = Math.max(this.state.slidesPerView, 2);
        const totalRealItems = this.state.totalItems;
        
        if (this.state.currentIndex >= totalRealItems) {
            this.state.currentIndex = 0;
            this.itemsWrapper.style.transition = 'none';
            const resetTranslateX = -(this.state.currentIndex + clonesCount) * (100 / this.state.slidesPerView);
            this.itemsWrapper.style.transform = `translateX(${resetTranslateX}%)`;
            
            setTimeout(() => {
                this.state.isTransitioning = false;
            }, 50);
        } 
        else if (this.state.currentIndex < 0) {
            this.state.currentIndex = totalRealItems - 1;
            this.itemsWrapper.style.transition = 'none';
            const resetTranslateX = -(this.state.currentIndex + clonesCount) * (100 / this.state.slidesPerView);
            this.itemsWrapper.style.transform = `translateX(${resetTranslateX}%)`;
            
            setTimeout(() => {
                this.state.isTransitioning = false;
            }, 50);
        } 
        else {
            this.state.isTransitioning = false;
        }
    }
    
    handleResize() {
        const newSlidesPerView = this.getSlidesPerView();
        if (newSlidesPerView !== this.state.slidesPerView) {
            this.state.slidesPerView = newSlidesPerView;
            this.state.currentIndex = 0;
            this.setupClones();
            this.updateSlider(false);
            this.updateDots();
        }
    }
    
    bindEvents() {
        // Navigation
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Dots
        this.dotsContainer?.addEventListener('click', (e) => {
            const dot = e.target.closest('.featured-products__dot');
            if (dot && dot.dataset.slide) {
                this.goToSlide(parseInt(dot.dataset.slide));
            }
        });
        
        // Touch events
        let touchStartX = 0;
        this.slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            this.stopAutoSlide();
        }, { passive: true });
        
        this.slider.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) this.nextSlide();
                else this.prevSlide();
            }
            this.startAutoSlide();
        }, { passive: true });
        
        // Auto-slide controls
        this.slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.slider.addEventListener('mouseleave', () => this.startAutoSlide());
        
        // Resize handler
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => this.handleResize(), 250);
        });
        
        // Transition end
        this.itemsWrapper.addEventListener('transitionend', () => {
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
    
    goToSlide(index) {
        if (this.state.isTransitioning || index < 0 || index >= this.state.totalItems) return;
        this.state.currentIndex = index;
        this.updateSlider();
        this.resetAutoSlide();
    }
    
    updateDots() {
        const dots = document.querySelectorAll('.featured-products__dot');
        dots.forEach((dot, index) => {
            const isActive = index === this.state.currentIndex;
            dot.classList.toggle('featured-products__dot--active', isActive);
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

// Initialize
document.addEventListener('DOMContentLoaded', () => new FeaturedProductsSlider());