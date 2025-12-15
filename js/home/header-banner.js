/**
 * Banner responsive image loader
 */
(function() {
    'use strict';
    
    class Banner {
        constructor() {
            this.banner = document.querySelector('.banner');
            this.bannerImage = document.querySelector('.banner__image');
            this.lastViewportWidth = null;
            this.resizeTimer = null;
            
            this.init();
        }
        
        init() {
            if (!this.bannerImage) {
                console.warn('Banner image not found');
                return;
            }
            
            this.loadCorrectImage();
            this.bindEvents();
        }
        
        /**
         * Load the correct image based on viewport width
         */
        loadCorrectImage() {
            const viewportWidth = window.innerWidth;
            
            // Only reload if viewport width category changed
            if (this.lastViewportWidth !== null && 
                ((this.lastViewportWidth >= 1025 && viewportWidth >= 1025) ||
                 (this.lastViewportWidth <= 1024 && viewportWidth <= 1024))) {
                return;
            }
            
            this.lastViewportWidth = viewportWidth;
            
            if (viewportWidth >= 1025) {
                // Desktop - load 1400px image
                this.bannerImage.src = "./src/assets/home/banner/optimized/gilson-materials-testing-equipment-1400.jpg";
                this.bannerImage.alt = "Gilson Company, Inc. - Supplying quality construction and laboratory material testing equipment since 1939";
            } else {
                // Mobile - load mobile image
                this.bannerImage.src = "./src/assets/home/banner/optimized/banner1-mob.jpg";
                this.bannerImage.alt = "Gilson Company, Inc. - Supplying quality construction and laboratory material testing equipment since 1939";
            }
            
            console.log(`Banner: Loaded ${viewportWidth >= 1025 ? 'desktop' : 'mobile'} image`);
        }
        
        /**
         * Bind event listeners
         */
        bindEvents() {
            // Debounced resize handler
            window.addEventListener('resize', () => {
                clearTimeout(this.resizeTimer);
                this.resizeTimer = setTimeout(() => {
                    this.loadCorrectImage();
                }, 250);
            });
            
            // Load correct image on orientation change
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    this.loadCorrectImage();
                }, 100);
            });
            
            // Load correct image when page becomes visible again
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) {
                    this.loadCorrectImage();
                }
            });
        }
        
        /**
         * Manually trigger image reload (for external use if needed)
         */
        reloadImage() {
            this.lastViewportWidth = null;
            this.loadCorrectImage();
        }
    }
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        window.bannerInstance = new Banner();
    });
    
})(); 