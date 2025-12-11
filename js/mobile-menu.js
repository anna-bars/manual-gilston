// Mobile menu data
const mobileMenuData = {
    categories: [
        { name: "Sieving", link: "https://www.globalgilson.com/sieve-analysis-equipment", img: "./src/assets/haeder-component/mobile-menu/sieving-mobile.png" },
        { name: "Screening", link: "https://www.globalgilson.com/screening", img: "./src/assets/haeder-component/mobile-menu/screening-mobile.png" },
        { name: "Sample Splitting", link: "https://www.globalgilson.com/sampling-dividing", img: "./src/assets/haeder-component/mobile-menu/splitting-mobile.png" },
        { name: "Aggregates", link: "https://www.globalgilson.com/aggregate-testing-equipment", img: "./src/assets/haeder-component/mobile-menu/aggregates-mobile.png" },
        { name: "Asphalt", link: "https://www.globalgilson.com/asphalt-testing-equipment", img: "./src/assets/haeder-component/mobile-menu/asphalt-mobile.png" },
        { name: "Concrete", link: "https://www.globalgilson.com/concrete-testing-equipment", img: "./src/assets/haeder-component/mobile-menu/concrete-mobile.png" },
        { name: "Soils", link: "https://www.globalgilson.com/soil-testing-equipment", img: "./src/assets/haeder-component/mobile-menu/soils-mobile.png" },
        { name: "Ovens and Furnaces", link: "https://www.globalgilson.com/ovens-and-furnaces", img: "./src/assets/haeder-component/mobile-menu/ovens-mobile.png" },
        { name: "Scales and Balances", link: "https://www.globalgilson.com/scales-balances", img: "./src/assets/haeder-component/mobile-menu/scales-mobile.png" },
        { name: "General Labs", link: "https://www.globalgilson.com/pans-tools-glassware", img: "./src/assets/haeder-component/mobile-menu/general-lab-mobile.png" },
    ],
    account: [
        { name: "My Account", link: "https://www.globalgilson.com/customer/info", icon: "./src/assets/haeder-component/mobile-menu/user.svg" },
        { name: "Order History", link: "https://www.globalgilson.com/order/history", icon: "./src/assets/haeder-component/mobile-menu/product.svg" },
        { name: "Returns", link: "#", icon: "./src/assets/haeder-component/mobile-menu/parcel.svg" },
        { name: "Logout", link: "https://www.globalgilson.com/logout", icon: "./src/assets/haeder-component/mobile-menu/logout.svg" }
    ],
    tools: [
        { name: "Catalog", link: "https://www.globalgilson.com/gilson-catalog" },
        { name: "Quick Order", link: "https://www.globalgilson.com/quick-order" },
        { name: "Reorder", link: "#" },
        { name: "Saved Carts", link: "#" },
        { name: "Lists", link: "https://www.globalgilson.com/favoriteslist" }
    ],
    resources: [
        { name: "Blog", link: "https://www.globalgilson.com/blog" },
        { name: "Video Library", link: "https://www.globalgilson.com/gilson-videos" },
        { name: "Manuals and Instructions", link: "https://www.globalgilson.com/product-manuals" },
        { name: "SDS", link: "https://www.globalgilson.com/product-sds" },
        { name: "Product 360s", link: "https://www.globalgilson.com/360-product-views" }
    ],
    support: [
        { type: "Call", link: "tel:18004441508", icon: "./src/assets/haeder-component/mobile-menu/icon/mob-phone-call.png" },
        { type: "Text", link: "sms://18004441508", icon: "./src/assets/haeder-component/mobile-menu/icon/mob-chatting.png" },
        { type: "Chat", link: "https://home-c33.nice-incontact.com/incontact/chatclient/chatclient.aspx?poc=e441b03a-781f-49b4-b063-dc0320b162d7&bu=4598504", icon: "./src/assets/haeder-component/mobile-menu/icon/mob-comment.png" },
        { type: "Email", link: "mailto:customerservice@gilsonco.com", icon: "./src/assets/haeder-component/mobile-menu/icon/mob-email.png" }
    ],
    callBack: [
        { text: "Request Callback", icon: "./src/assets/haeder-component/mobile-menu/icon/call-back.png", link: "#" },
        { text: "Support Ticket", icon: "./src/assets/haeder-component/mobile-menu/icon/support-ticket.png", link: "#" }
    ]
};

// Mobile Menu Functions
class MobileMenu {
    constructor() {
        this.menu = document.getElementById('mobileMenu');
        this.menuContent = this.menu.querySelector('.mobile-menu1');
        this.menuContent.id = 'mobileMenuCont';
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        console.log("MobileMenu initialized");
        this.renderMenu();
        this.setupEventListeners();
    }
    
    renderMenu() {
        let html = `
            <h3>Shop by Category</h3>
            <ul>
                ${mobileMenuData.categories.map(cat => `
                    <li>
                        <a href="${cat.link}">
                            <img loading="lazy" src="${cat.img}" alt="${cat.name}">
                            <p>${cat.name}</p>
                            <i class="fa fa-angle-right" aria-hidden="false"></i>
                        </a>
                    </li>
                `).join('')}
            </ul>
            
            <div class="mob-account-list">
                <h3>Account</h3>
                <ul>
                    ${mobileMenuData.account.map(item => `
                        <li>
                            <a href="${item.link}">
                                <img loading="lazy" src="${item.icon}" alt="${item.name}" class="svgimg">
                                <p>${item.name}</p>
                                <i class="fa fa-angle-right" aria-hidden="false"></i>
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="mob-account-list">
                <h3>Tools</h3>
                <ul>
                    ${mobileMenuData.tools.map(item => `
                        <li>
                            <a href="${item.link}">
                                <p>${item.name}</p>
                                <i class="fa fa-angle-right" aria-hidden="false"></i>
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="mob-account-list">
                <h3>Resources</h3>
                <ul>
                    ${mobileMenuData.resources.map(item => `
                        <li>
                            <a href="${item.link}">
                                <p>${item.name}</p>
                                <i class="fa fa-angle-right" aria-hidden="false"></i>
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="part-btn">
                <a href="https://www.globalgilson.com/replacement-parts">Replacement Parts</a>
            </div>
            
            <div class="mob-menu-contact">
                <div class="mob-contact-text">
                    <h4>We're here to help</h4>
                    <p>We'll do anything we can to help find an answer to your question.</p>
                    <div class="mob-call-btn">
                        <a href="#">
                            <i class="fa fa-phone">
                                <img loading="lazy" src="./src/assets/haeder-component/middle-header/phone-receiver-silhouette.png" alt="Phone">
                            </i> 
                            800-444-1508
                        </a>
                    </div>
                </div>
                
                <div class="support-text">
                    <ul>
                        ${mobileMenuData.support.map(item => `
                            <li>
                                <a href="${item.link}" target="${item.type === 'Chat' ? '_blank' : '_self'}"></a>
                                <div class="support-icon">
                                    <i class="fa">
                                        <img loading="lazy" src="${item.icon}" alt="${item.type}">
                                    </i>
                                </div>
                                <div class="call-text1">
                                    <p>${item.type}</p>
                                </div>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="mob-call-back">
                    <ul>
                        ${mobileMenuData.callBack.map(item => `
                            <li>
                                <a href="${item.link}">
                                    <div class="sprite-img call-back">
                                        <img loading="lazy" src="${item.icon}" alt="${item.text}">
                                    </div>
                                    <p>${item.text}</p>
                                    <i class="fa fa-angle-right" aria-hidden="false"></i>
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="mob-call-btn">
                    <div class="sprite-img fax-icon">
                        <img loading="lazy" src="./src/assets/haeder-component/mobile-menu/icon/printing.png" alt="Fax">
                    </div> 
                    740-548-5314
                </div>
                
                <div class="newsletter-area">
                    <ul>
                        <li><a href="https://www.facebook.com/GilsonCompany"><div class="sprite-img fb-icon">
                            <img src="./src/assets/haeder-component/mobile-menu/social-media/fb.webp">
                        </div></a></li>
                        <li><a href="https://www.instagram.com/gilsoncompanyinc"><div class="sprite-img insta-icon">
                             <img src="./src/assets/haeder-component/mobile-menu/social-media/insta.webp">
                        </div></a></li>
                        <li><a href="https://twitter.com/gilsoncompany"><div class="sprite-img twitter-icon">
                            <img src="./src/assets/haeder-component/mobile-menu/social-media/twitter.webp">
                        </div></a></li>
                        <li><a href="https://www.linkedin.com/company/gilson-company-inc."><div class="sprite-img linkedin-icon">
                            <img src="./src/assets/haeder-component/mobile-menu/social-media/linkedin.webp">
                        </div></a></li>
                        <li><a href="https://www.youtube.com/user/GilsonCompanyInc"><div class="sprite-img youtube-icon">
                            <img src="./src/assets/haeder-component/mobile-menu/social-media/utube.webp">
                        </div></a></li>
                    </ul>
                </div>
            </div>
        `;
        
        this.menuContent.innerHTML = html;
    }
    
    setupEventListeners() {
        console.log("Setting up event listeners");
        
        // Close button event listener
        const closeBtn = document.getElementById('mobileMenuClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                console.log("Close button clicked");
                e.stopPropagation(); // Prevent event bubbling
                this.close();
            });
        }
        
        // Close when clicking outside the menu content (on the overlay)
        this.menu.addEventListener('click', (e) => {
            console.log("Mobile menu click event");
            
            // If click is on the menu area (overlay) but NOT on menu content
            if (e.target === this.menu || 
                (!this.menuContent.contains(e.target) && e.target !== closeBtn)) {
                console.log("Clicked outside menu content, closing");
                this.close();
            }
        });
        
        // Add event listener to menu toggle button
        const menuToggle = document.querySelector('.toolbar__menu-toggle');
        if (menuToggle) {
            console.log("Found menu toggle button");
            menuToggle.addEventListener('click', (e) => {
                console.log("Menu toggle clicked");
                e.stopPropagation(); // Prevent event bubbling
                this.toggle();
            });
        } else {
            console.error("Menu toggle button not found!");
        }
    }
    
    open() {
        console.log("Opening mobile menu");
        this.menu.classList.add('mobile-menu-open');
        this.menu.style.width = '100%';
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
        console.log("Menu should be open now");
    }
    
    close() {
        console.log("Closing mobile menu");
        this.menu.classList.remove('mobile-menu-open');
        this.menu.style.width = '0';
        this.isOpen = false;
        document.body.style.overflow = 'auto';
        console.log("Menu should be closed now");
    }
    
    toggle() {
        console.log("Toggling mobile menu, current state:", this.isOpen);
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
}

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, initializing MobileMenu");
    
    // Check if mobile menu element exists
    const mobileMenuElement = document.getElementById('mobileMenu');
    if (!mobileMenuElement) {
        console.error("Mobile menu element not found!");
        return;
    }
    
    console.log("Mobile menu element found:", mobileMenuElement);
    
    // Initialize the menu
    window.mobileMenu = new MobileMenu();
    
    // Also add event listener for the menu toggle button (as backup)
    const menuToggle = document.querySelector('.toolbar__menu-toggle');
    if (menuToggle) {
        console.log("Adding click event to menu toggle");
        menuToggle.addEventListener('click', function(e) {
            console.log("Menu toggle clicked (backup handler)");
            e.stopPropagation();
            if (window.mobileMenu) {
                window.mobileMenu.toggle();
            }
        });
    }
});