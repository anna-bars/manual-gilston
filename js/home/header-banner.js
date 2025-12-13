document.addEventListener('DOMContentLoaded', function() {
            // Since there's only one slide, we don't need slider functionality
            // But keeping the code for potential future use
            
            // Get all slider elements
            const sliderItems = document.querySelectorAll('.slider-item');
            const sliderDots = document.querySelectorAll('.slider-dot');
            const prevBtn = document.querySelector('.slider-prev');
            const nextBtn = document.querySelector('.slider-next');
            
            // If there are multiple slides, setup the slider
            if (sliderItems.length > 1) {
                let currentSlide = 0;
                let slideInterval;
                const slideDuration = 5000; // 5 seconds
                
                // Function to show a specific slide
                function showSlide(index) {
                    // Hide all slides
                    sliderItems.forEach(item => {
                        item.classList.remove('active');
                    });
                    
                    // Remove active class from all dots
                    if (sliderDots.length > 0) {
                        sliderDots.forEach(dot => {
                            dot.classList.remove('active');
                        });
                        
                        // Show the selected slide
                        sliderItems[index].classList.add('active');
                        sliderDots[index].classList.add('active');
                    } else {
                        sliderItems[index].classList.add('active');
                    }
                    
                    currentSlide = index;
                }
                
                // Function to show next slide
                function nextSlide() {
                    let nextIndex = currentSlide + 1;
                    if (nextIndex >= sliderItems.length) {
                        nextIndex = 0;
                    }
                    showSlide(nextIndex);
                }
                
                // Function to show previous slide
                function prevSlide() {
                    let prevIndex = currentSlide - 1;
                    if (prevIndex < 0) {
                        prevIndex = sliderItems.length - 1;
                    }
                    showSlide(prevIndex);
                }
                
                // Function to start auto slide
                function startAutoSlide() {
                    slideInterval = setInterval(nextSlide, slideDuration);
                }
                
                // Function to stop auto slide
                function stopAutoSlide() {
                    clearInterval(slideInterval);
                }
                
                // Event listeners for navigation buttons
                if (prevBtn) {
                    prevBtn.addEventListener('click', function() {
                        prevSlide();
                        stopAutoSlide();
                        startAutoSlide();
                    });
                }
                
                if (nextBtn) {
                    nextBtn.addEventListener('click', function() {
                        nextSlide();
                        stopAutoSlide();
                        startAutoSlide();
                    });
                }
                
                // Event listeners for dots
                sliderDots.forEach(dot => {
                    dot.addEventListener('click', function() {
                        const slideIndex = parseInt(this.getAttribute('data-slide'));
                        showSlide(slideIndex);
                        stopAutoSlide();
                        startAutoSlide();
                    });
                });
                
                // Pause auto slide on hover
                const slider = document.querySelector('.slider');
                if (slider) {
                    slider.addEventListener('mouseenter', stopAutoSlide);
                    slider.addEventListener('mouseleave', startAutoSlide);
                    
                    // Touch events for mobile swipe
                    let touchStartX = 0;
                    let touchEndX = 0;
                    
                    slider.addEventListener('touchstart', function(e) {
                        touchStartX = e.changedTouches[0].screenX;
                        stopAutoSlide();
                    });
                    
                    slider.addEventListener('touchend', function(e) {
                        touchEndX = e.changedTouches[0].screenX;
                        handleSwipe();
                        startAutoSlide();
                    });
                    
                    function handleSwipe() {
                        const swipeThreshold = 50; // Minimum swipe distance
                        
                        if (touchEndX < touchStartX - swipeThreshold) {
                            // Swipe left - next slide
                            nextSlide();
                        } else if (touchEndX > touchStartX + swipeThreshold) {
                            // Swipe right - previous slide
                            prevSlide();
                        }
                    }
                    
                    // Start auto sliding on page load
                    startAutoSlide();
                }
            } else {
                // Hide navigation arrows if there's only one slide
                if (prevBtn) prevBtn.style.display = 'none';
                if (nextBtn) nextBtn.style.display = 'none';
            }
            
            // Responsive image loading
            function checkViewportAndLoadImages() {
                const width = window.innerWidth;
                console.log(`Viewport width: ${width}px`);
                
                // Check which image source is being used
                const picture = document.querySelector('picture');
                const img = document.querySelector('img');
                
                if (width >= 1025) {
                    console.log('Loading desktop image');
                    // Desktop image should be loaded
                    img.src = "./src/assets/home/banner/optimized/gilson-materials-testing-equipment-1024.jpg";
                } else {
                    console.log('Loading mobile image');
                    // Mobile image should be loaded
                    img.src = "./src/assets/home/banner/optimized/banner1-mob.jpg";
                }
            }
            
            // Check on resize
            window.addEventListener('resize', checkViewportAndLoadImages);
            
            // Initial check
            checkViewportAndLoadImages();
        });