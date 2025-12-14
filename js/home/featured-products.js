/**
 * Featured Products Slider - Infinite Loop
 * 4 slides on desktop, 1 slide on mobile
 */
(function() {
    'use strict';
    
    class FeaturedProductsSlider {
        constructor() {
            this.slider = document.querySelector('.featured-products__slider');
            this.sliderContainer = document.querySelector('.featured-products__items-container');
            this.sliderItems = document.querySelector('.featured-products__items');
            this.productItems = document.querySelectorAll('.featured-products__item:not(.featured-products__item--cloned)');
            this.prevBtn = document.querySelector('.featured-products__nav--prev');
            this.nextBtn = document.querySelector('.featured-products__nav--next');
            this.dotsContainer = document.querySelector('.featured-products__dots');
            
            this.totalItems = this.productItems.length;
            this.currentIndex = 0;
            this.slidesPerView = 4;
            this.isTransitioning = false;
            this.autoSlideInterval = null;
            this.autoSlideDelay = 5000;
            this.resizeTimer = null;
            
            this.clonedItems = [];
            this.totalSlides = 0;
            
            this.init();
        }
        
        init() {
            if (!this.slider || this.totalItems === 0) {
                console.warn('Featured products slider not found');
                return;
            }
            
            this.setupInfiniteSlider();
            this.createDots();
            this.bindEvents();
            this.updateSlidesPerView();
            this.updateSlider();
            this.startAutoSlide();
        }
        
        setupInfiniteSlider() {
            // Clear any existing clones
            this.removeClones();
            
            // Calculate how many clones we need based on slidesPerView
            const clonesNeeded = Math.max(this.slidesPerView, 2);
            
            // Clone first items to end
            for (let i = 0; i < clonesNeeded; i++) {
                const clone = this.productItems[i].cloneNode(true);
                clone.classList.add('featured-products__item--cloned');
                this.sliderItems.appendChild(clone);
                this.clonedItems.push(clone);
            }
            
            // Clone last items to beginning
            for (let i = this.totalItems - clonesNeeded; i < this.totalItems; i++) {
                const clone = this.productItems[i].cloneNode(true);
                clone.classList.add('featured-products__item--cloned');
                this.sliderItems.insertBefore(clone, this.productItems[0]);
                this.clonedItems.push(clone);
            }
            
            // Update total slides count
            this.totalSlides = this.totalItems + (clonesNeeded * 2);
            
            // Set initial position to show real first items
            this.goToSlide(this.currentIndex + clonesNeeded, false);
        }
        
        removeClones() {
            this.clonedItems.forEach(clone => {
                if (clone.parentNode) {
                    clone.parentNode.removeChild(clone);
                }
            });
            this.clonedItems = [];
        }
        
        createDots() {
            if (!this.dotsContainer) return;
            
            // Clear existing dots
            this.dotsContainer.innerHTML = '';
            
            // Create dots based on total items
            for (let i = 0; i < this.totalItems; i++) {
                const dot = document.createElement('button');
                dot.className = 'featured-products__dot';
                if (i === 0) {
                    dot.classList.add('featured-products__dot--active');
                    dot.setAttribute('aria-current', 'true');
                }
                dot.setAttribute('data-slide', i);
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                
                this.dotsContainer.appendChild(dot);
            }
            
            this.dots = document.querySelectorAll('.featured-products__dot');
        }
        
        updateSlidesPerView() {
            const screenWidth = window.innerWidth;
            let oldSlidesPerView = this.slidesPerView;
            
            if (screenWidth <= 768) {
                this.slidesPerView = 1;
            } else if (screenWidth <= 1200) {
                this.slidesPerView = 2;
            } else {
                this.slidesPerView = 4;
            }
            
            // Re-clone items if slidesPerView changed
            if (oldSlidesPerView !== this.slidesPerView) {
                this.setupInfiniteSlider();
                this.createDots();
                this.updateSlider();
            }
            
            this.updateDots();
        }
        
        updateSlider() {
            const slideWidth = 100 / this.slidesPerView;
            const clonesCount = Math.max(this.slidesPerView, 2);
            const translateX = -(this.currentIndex + clonesCount) * slideWidth;
            
            this.sliderItems.style.transform = `translateX(${translateX}%)`;
            
            // Update item widths
            const allItems = this.sliderItems.querySelectorAll('.featured-products__item');
            allItems.forEach(item => {
                item.style.flex = `0 0 ${100 / this.slidesPerView}%`;
                item.style.maxWidth = `${100 / this.slidesPerView}%`;
            });
        }
        
        nextSlide() {
            if (this.isTransitioning) return;
            
            this.isTransitioning = true;
            this.currentIndex++;
            
            const clonesCount = Math.max(this.slidesPerView, 2);
            const slideWidth = 100 / this.slidesPerView;
            
            // Animate to next position
            const translateX = -(this.currentIndex + clonesCount) * slideWidth;
            this.sliderItems.style.transition = 'transform 0.5s ease';
            this.sliderItems.style.transform = `translateX(${translateX}%)`;
            
            // Check if we've reached the end of real items
            if (this.currentIndex >= this.totalItems) {
                setTimeout(() => {
                    // Jump to beginning (first real item)
                    this.currentIndex = 0;
                    const jumpTranslateX = -(this.currentIndex + clonesCount) * slideWidth;
                    this.sliderItems.style.transition = 'none';
                    this.sliderItems.style.transform = `translateX(${jumpTranslateX}%)`;
                    
                    setTimeout(() => {
                        this.isTransitioning = false;
                    }, 50);
                }, 500);
            } else {
                setTimeout(() => {
                    this.isTransitioning = false;
                }, 500);
            }
            
            this.updateDots();
            this.resetAutoSlide();
        }
        
        prevSlide() {
            if (this.isTransitioning) return;
            
            this.isTransitioning = true;
            this.currentIndex--;
            
            const clonesCount = Math.max(this.slidesPerView, 2);
            const slideWidth = 100 / this.slidesPerView;
            
            // Animate to previous position
            const translateX = -(this.currentIndex + clonesCount) * slideWidth;
            this.sliderItems.style.transition = 'transform 0.5s ease';
            this.sliderItems.style.transform = `translateX(${translateX}%)`;
            
            // Check if we've reached before the first real item
            if (this.currentIndex < 0) {
                setTimeout(() => {
                    // Jump to end (last real item)
                    this.currentIndex = this.totalItems - 1;
                    const jumpTranslateX = -(this.currentIndex + clonesCount) * slideWidth;
                    this.sliderItems.style.transition = 'none';
                    this.sliderItems.style.transform = `translateX(${jumpTranslateX}%)`;
                    
                    setTimeout(() => {
                        this.isTransitioning = false;
                    }, 50);
                }, 500);
            } else {
                setTimeout(() => {
                    this.isTransitioning = false;
                }, 500);
            }
            
            this.updateDots();
            this.resetAutoSlide();
        }
        
        goToSlide(index) {
            if (this.isTransitioning || index < 0 || index >= this.totalItems) return;
            
            this.currentIndex = index;
            this.updateSlider();
            this.updateDots();
            this.resetAutoSlide();
        }
        
        updateDots() {
            if (!this.dots || this.dots.length === 0) return;
            
            this.dots.forEach((dot, index) => {
                if (index === this.currentIndex) {
                    dot.classList.add('featured-products__dot--active');
                    dot.setAttribute('aria-current', 'true');
                } else {
                    dot.classList.remove('featured-products__dot--active');
                    dot.removeAttribute('aria-current');
                }
            });
        }
        
        bindEvents() {
            // Navigation buttons
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prevSlide());
            }
            
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.nextSlide());
            }
            
            // Dots navigation
            if (this.dots) {
                this.dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        this.goToSlide(index);
                    });
                });
            }
            
            // Touch/swipe support
            let touchStartX = 0;
            let touchEndX = 0;
            
            this.sliderContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                this.stopAutoSlide();
            }, { passive: true });
            
            this.sliderContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe(touchStartX, touchEndX);
                this.startAutoSlide();
            }, { passive: true });
            
            // Mouse hover pause
            this.slider.addEventListener('mouseenter', () => this.stopAutoSlide());
            this.slider.addEventListener('mouseleave', () => this.startAutoSlide());
            
            // Window resize
            window.addEventListener('resize', () => {
                clearTimeout(this.resizeTimer);
                this.resizeTimer = setTimeout(() => {
                    this.updateSlidesPerView();
                }, 250);
            });
            
            // Transition end event
            this.sliderItems.addEventListener('transitionend', () => {
                this.isTransitioning = false;
            });
        }
        
        handleSwipe(startX, endX) {
            const swipeThreshold = 50;
            
            if (endX < startX - swipeThreshold) {
                this.nextSlide();
            } else if (endX > startX + swipeThreshold) {
                this.prevSlide();
            }
        }
        
        startAutoSlide() {
            this.stopAutoSlide();
            this.autoSlideInterval = setInterval(() => this.nextSlide(), this.autoSlideDelay);
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
        
        /**
         * Public API methods
         */
        goTo(index) {
            this.goToSlide(index);
        }
        
        next() {
            this.nextSlide();
        }
        
        prev() {
            this.prevSlide();
        }
        
        destroy() {
            this.stopAutoSlide();
            // Remove event listeners if needed
        }
    }
    
    // Initialize slider when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        window.featuredProductsSlider = new FeaturedProductsSlider();
    });
    
})();