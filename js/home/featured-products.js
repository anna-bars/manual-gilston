/**
 * Featured Products Slider
 * BEM methodology implementation
 */
(function() {
    'use strict';
    
    class FeaturedProductsSlider {
        constructor() {
            this.slider = document.querySelector('.featured-products__slider');
            this.sliderItems = document.querySelector('.featured-products__items');
            this.productItems = document.querySelectorAll('.featured-products__item');
            this.prevBtn = document.querySelector('.featured-products__nav--prev');
            this.nextBtn = document.querySelector('.featured-products__nav--next');
            this.dots = document.querySelectorAll('.featured-products__dot');
            
            this.currentSlide = 0;
            this.slidesPerView = 3;
            this.totalSlides = this.productItems.length;
            this.slideWidth = 100 / this.slidesPerView;
            this.autoSlideInterval = null;
            this.autoSlideDelay = 5000; // 5 seconds
            
            this.init();
        }
        
        init() {
            if (!this.slider || this.totalSlides === 0) {
                console.warn('Featured products slider not found');
                return;
            }
            
            this.setupSlider();
            this.bindEvents();
            this.updateSliderPosition();
            this.updateDots();
            this.startAutoSlide();
        }
        
        setupSlider() {
            // Set initial width for slider items
            this.sliderItems.style.width = `128%`;
            
            // Set width for each product item
            this.productItems.forEach(item => {
                item.style.flex = `0 0 ${this.slideWidth}%`;
            });
            
            // Update slides per view based on screen width
            this.updateSlidesPerView();
        }
        
        updateSlidesPerView() {
            const screenWidth = window.innerWidth;
            
            if (screenWidth <= 768) {
                this.slidesPerView = 1;
            } else if (screenWidth <= 1200) {
                this.slidesPerView = 2;
            } else {
                this.slidesPerView = 3;
            }
            
            this.slideWidth = 100 / this.slidesPerView;
            this.sliderItems.style.width = `125%`;
            
            this.productItems.forEach(item => {
                item.style.flex = `0 0 20%`;
            });
            
            // Adjust current slide if needed
            const maxSlide = Math.max(0, this.totalSlides - this.slidesPerView);
            if (this.currentSlide > maxSlide) {
                this.currentSlide = maxSlide;
            }
            
            this.updateSliderPosition();
        }
        
        nextSlide() {
            const maxSlide = Math.max(0, this.totalSlides - this.slidesPerView);
            
            if (this.currentSlide < maxSlide) {
                this.currentSlide++;
            } else {
                this.currentSlide = 0; // Loop back to start
            }
            
            this.updateSliderPosition();
            this.updateDots();
            this.resetAutoSlide();
        }
        
        prevSlide() {
            const maxSlide = Math.max(0, this.totalSlides - this.slidesPerView);
            
            if (this.currentSlide > 0) {
                this.currentSlide--;
            } else {
                this.currentSlide = maxSlide; // Loop to end
            }
            
            this.updateSliderPosition();
            this.updateDots();
            this.resetAutoSlide();
        }
        
        goToSlide(slideIndex) {
            const maxSlide = Math.max(0, this.totalSlides - this.slidesPerView);
            this.currentSlide = Math.min(Math.max(0, slideIndex), maxSlide);
            
            this.updateSliderPosition();
            this.updateDots();
            this.resetAutoSlide();
        }
        
        updateSliderPosition() {
            const translateX = -this.currentSlide * this.slideWidth;
            this.sliderItems.style.transform = `translateX(${translateX}%)`;
        }
        
        updateDots() {
            if (this.dots.length === 0) return;
            
            // Calculate which dot should be active based on current slide
            const activeDotIndex = Math.floor(this.currentSlide / this.slidesPerView);
            
            this.dots.forEach((dot, index) => {
                if (index === activeDotIndex) {
                    dot.classList.add('featured-products__dot--active');
                } else {
                    dot.classList.remove('featured-products__dot--active');
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
                dot.addEventListener('click', () => this.goToSlide(index * this.slidesPerView));
            });
            
            // Touch/swipe support for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            this.slider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                this.stopAutoSlide();
            }, { passive: true });
            
            this.slider.addEventListener('touchend', (e) => {
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
                    this.updateDots();
                }, 250);
            });
        }
        
        handleSwipe(startX, endX) {
            const swipeThreshold = 50;
            
            if (endX < startX - swipeThreshold) {
                // Swipe left - next slide
                this.nextSlide();
            } else if (endX > startX + swipeThreshold) {
                // Swipe right - previous slide
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
         * Public method to manually go to a specific slide
         */
        goTo(slideIndex) {
            this.goToSlide(slideIndex);
        }
        
        /**
         * Public method to manually trigger next slide
         */
        next() {
            this.nextSlide();
        }
        
        /**
         * Public method to manually trigger previous slide
         */
        prev() {
            this.prevSlide();
        }
    }
    
    // Initialize slider when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        window.featuredProductsSlider = new FeaturedProductsSlider();
    });
    
})();