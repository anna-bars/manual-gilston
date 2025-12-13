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
            this.productItems = document.querySelectorAll('.featured-products__item');
            this.prevBtn = document.querySelector('.featured-products__nav--prev');
            this.nextBtn = document.querySelector('.featured-products__nav--next');
            this.dots = document.querySelectorAll('.featured-products__dot');
            
            this.totalItems = this.productItems.length;
            this.currentIndex = 0;
            this.slidesPerView = 4; // Desktop-ի համար
            this.isTransitioning = false;
            this.autoSlideInterval = null;
            this.autoSlideDelay = 5000;
            this.resizeTimer = null;
            
            // Clone items for infinite loop
            this.clonedItems = [];
            
            this.init();
        }
        
        init() {
            if (!this.slider || this.totalItems === 0) {
                console.warn('Featured products slider not found');
                return;
            }
            
            this.setupInfiniteSlider();
            this.bindEvents();
            this.updateSlidesPerView();
            this.updateDots();
            this.startAutoSlide();
        }
        
        setupInfiniteSlider() {
            // Clone first few items for infinite effect
            for (let i = 0; i < this.slidesPerView; i++) {
                const clone = this.productItems[i].cloneNode(true);
                clone.classList.add('featured-products__item--cloned');
                this.sliderItems.appendChild(clone);
                this.clonedItems.push(clone);
            }
            
            // Clone last few items for infinite effect
            for (let i = this.totalItems - this.slidesPerView; i < this.totalItems; i++) {
                const clone = this.productItems[i].cloneNode(true);
                clone.classList.add('featured-products__item--cloned');
                this.sliderItems.insertBefore(clone, this.productItems[0]);
                this.clonedItems.push(clone);
            }
            
            // Set initial position to show real first items
            this.goToSlide(0, false);
        }
        
        updateSlidesPerView() {
            const screenWidth = window.innerWidth;
            let oldSlidesPerView = this.slidesPerView;
            
            if (screenWidth <= 768) {
                this.slidesPerView = 1; // Mobile
            } else if (screenWidth <= 1200) {
                this.slidesPerView = 2; // Tablet
            } else {
                this.slidesPerView = 4; // Desktop
            }
            
            // Re-clone items if slidesPerView changed
            if (oldSlidesPerView !== this.slidesPerView) {
                this.rebuildClones();
                this.updateSlidesPosition();
            }
            
            this.updateDots();
        }
        
        rebuildClones() {
            // Remove old clones
            this.clonedItems.forEach(clone => {
                if (clone.parentNode) {
                    clone.parentNode.removeChild(clone);
                }
            });
            this.clonedItems = [];
            
            // Add new clones based on current slidesPerView
            // Clone first items to end
            for (let i = 0; i < this.slidesPerView; i++) {
                const clone = this.productItems[i].cloneNode(true);
                clone.classList.add('featured-products__item--cloned');
                this.sliderItems.appendChild(clone);
                this.clonedItems.push(clone);
            }
            
            // Clone last items to beginning
            for (let i = this.totalItems - this.slidesPerView; i < this.totalItems; i++) {
                const clone = this.productItems[i].cloneNode(true);
                clone.classList.add('featured-products__item--cloned');
                this.sliderItems.insertBefore(clone, this.productItems[0]);
                this.clonedItems.push(clone);
            }
        }
        
        updateSlidesPosition() {
            const slideWidth = 100 / this.slidesPerView;
            const translateX = -this.currentIndex * slideWidth;
            this.sliderItems.style.transform = `translateX(${translateX}%)`;
        }
        
        nextSlide() {
            if (this.isTransitioning) return;
            
            this.currentIndex++;
            
            // Infinite loop check
            if (this.currentIndex >= this.totalItems) {
                this.currentIndex = 0;
                this.goToSlide(this.currentIndex, false);
                setTimeout(() => {
                    this.sliderItems.style.transition = 'transform 0.5s ease';
                    this.goToSlide(this.currentIndex);
                }, 50);
            } else {
                this.goToSlide(this.currentIndex);
            }
            
            this.updateDots();
            this.resetAutoSlide();
        }
        
        prevSlide() {
            if (this.isTransitioning) return;
            
            this.currentIndex--;
            
            // Infinite loop check
            if (this.currentIndex < 0) {
                this.currentIndex = this.totalItems - 1;
                const slideWidth = 100 / this.slidesPerView;
                const translateX = -(this.totalItems + this.slidesPerView) * slideWidth;
                
                // Jump to cloned items (end)
                this.sliderItems.style.transition = 'none';
                this.sliderItems.style.transform = `translateX(${translateX}%)`;
                
                setTimeout(() => {
                    this.sliderItems.style.transition = 'transform 0.5s ease';
                    this.goToSlide(this.currentIndex);
                }, 50);
            } else {
                this.goToSlide(this.currentIndex);
            }
            
            this.updateDots();
            this.resetAutoSlide();
        }
        
        goToSlide(index, animate = true) {
            if (this.isTransitioning || index < 0 || index >= this.totalItems) return;
            
            this.isTransitioning = true;
            this.currentIndex = index;
            
            const slideWidth = 100 / this.slidesPerView;
            const translateX = -(index + this.slidesPerView) * slideWidth;
            
            if (!animate) {
                this.sliderItems.style.transition = 'none';
            } else {
                this.sliderItems.style.transition = 'transform 0.5s ease';
            }
            
            this.sliderItems.style.transform = `translateX(${translateX}%)`;
            
            // Reset transitioning flag after animation
            if (animate) {
                setTimeout(() => {
                    this.isTransitioning = false;
                    
                    // Jump to start if at cloned end
                    if (index === this.totalItems - 1) {
                        setTimeout(() => {
                            this.sliderItems.style.transition = 'none';
                            this.goToSlide(0, false);
                        }, 50);
                    }
                }, 500);
            } else {
                this.isTransitioning = false;
            }
        }
        
        updateDots() {
            if (this.dots.length === 0) return;
            
            // Calculate number of dots needed
            const dotsCount = Math.ceil(this.totalItems / this.slidesPerView);
            const activeDotIndex = Math.floor(this.currentIndex / this.slidesPerView);
            
            this.dots.forEach((dot, index) => {
                if (index < dotsCount) {
                    dot.style.display = 'inline-block';
                    
                    if (index === activeDotIndex) {
                        dot.classList.add('featured-products__dot--active');
                        dot.setAttribute('aria-current', 'true');
                    } else {
                        dot.classList.remove('featured-products__dot--active');
                        dot.removeAttribute('aria-current');
                    }
                } else {
                    dot.style.display = 'none';
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
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.goToSlide(index * this.slidesPerView);
                    this.updateDots();
                    this.resetAutoSlide();
                });
            });
            
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