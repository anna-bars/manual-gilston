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
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        this.renderMenu();
        this.setupEventListeners();
    }
    
    renderMenu() {
        let html = `
            <div class="close-btn" id="mobileMenuClose" style="margin-top: 25px; margin-left: 25px; cursor: pointer; position: absolute; top: 0; left: 0; z-index: 1000;">
                <img loading="lazy" src="./src/assets/haeder-component/mobile-menu/close-menu.png" alt="Close Menu">
            </div>
            
            <h3 style="font-size: 15px; color: #535353; text-transform: uppercase; font-weight: bold; padding: 15px 15px; border-bottom: 1px solid #ececec; margin-bottom: 0;">Shop by Category</h3>
            <ul style="margin-bottom: 0;">
                ${mobileMenuData.categories.map(cat => `
                    <li style="padding: 13px 15px; border-bottom: 1px solid #ececec; position: relative;">
                        <a href="${cat.link}" style="display: flex; align-items: center; text-decoration: none; position: relative;">
                            <img loading="lazy" src="${cat.img}" alt="${cat.name}" style="width: 50px; height: 50px; object-fit: contain; margin-right: 15px;">
                            <p style="font-size: 17px; font-weight: bold; color: #004488; margin: 0;">${cat.name}</p>
                            <i class="fa fa-angle-right" aria-hidden="false" style="position: absolute; right: 0; font-size: 20px; color: #666; margin-right: 15px;"></i>
                        </a>
                    </li>
                `).join('')}
            </ul>
            
            <div class="mob-account-list" style="margin-top: 30px;">
                <h3 style="font-size: 15px; color: #535353; text-transform: uppercase; font-weight: bold; padding: 15px 15px; border-bottom: 1px solid #ececec; margin-bottom: 0;">Account</h3>
                <ul style="margin-bottom: 0;">
                    ${mobileMenuData.account.map(item => `
                        <li style="padding: 13px 15px; border-bottom: 1px solid #ececec; position: relative;">
                            <a href="${item.link}" style="display: flex; align-items: center; text-decoration: none; position: relative;">
                                <img loading="lazy" src="${item.icon}" alt="${item.name}" class="svgimg" style="width: 18px; height: 18px; margin-right: 10px;">
                                <p style="font-size: 15px; color: #597baa; margin: 0;">${item.name}</p>
                                <i class="fa fa-angle-right" aria-hidden="false" style="position: absolute; right: 0; font-size: 20px; color: #666; margin-right: 15px;"></i>
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="mob-account-list" style="margin-top: 30px;">
                <h3 style="font-size: 15px; color: #535353; text-transform: uppercase; font-weight: bold; padding: 15px 15px; border-bottom: 1px solid #ececec; margin-bottom: 0;">Tools</h3>
                <ul style="margin-bottom: 0;">
                    ${mobileMenuData.tools.map(item => `
                        <li style="padding: 13px 15px; border-bottom: 1px solid #ececec; position: relative;">
                            <a href="${item.link}" style="display: flex; align-items: center; text-decoration: none; position: relative;">
                                <p style="font-size: 15px; color: #597baa; margin: 0;">${item.name}</p>
                                <i class="fa fa-angle-right" aria-hidden="false" style="position: absolute; right: 0; font-size: 20px; color: #666; margin-right: 15px;"></i>
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="mob-account-list" style="margin-top: 30px;">
                <h3 style="font-size: 15px; color: #535353; text-transform: uppercase; font-weight: bold; padding: 15px 15px; border-bottom: 1px solid #ececec; margin-bottom: 0;">Resources</h3>
                <ul style="margin-bottom: 0;">
                    ${mobileMenuData.resources.map(item => `
                        <li style="padding: 13px 15px; border-bottom: 1px solid #ececec; position: relative;">
                            <a href="${item.link}" style="display: flex; align-items: center; text-decoration: none; position: relative;">
                                <p style="font-size: 15px; color: #597baa; margin: 0;">${item.name}</p>
                                <i class="fa fa-angle-right" aria-hidden="false" style="position: absolute; right: 0; font-size: 20px; color: #666; margin-right: 15px;"></i>
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="part-btn" style="padding: 0 15px;">
                <a href="https://www.globalgilson.com/replacement-parts" 
                   style="display: block; background-color: #00a651; color: white; font-weight: bold; text-align: center; padding: 12px; margin: 20px 0; border-radius: 5px; text-decoration: none; font-size: 15px;">
                    Replacement Parts
                </a>
            </div>
            
            <div class="mob-menu-contact" style="padding: 15px;">
                <div class="mob-contact-text" style="text-align: center;">
                    <h4 style="font-size: 16px; color: #003366; font-weight: bold; margin-bottom: 8px;">We're here to help</h4>
                    <p style="font-size: 14px; color: #424445; margin-bottom: 20px;">We'll do anything we can to help find an answer to your question.</p>
                    <div class="mob-call-btn" style="margin-top: 10px;">
                        <a href="#" style="display: inline-flex; align-items: center; justify-content: center; text-decoration: none; padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; background: #fff; color: #004488; font-size: 14px;">
                            <i class="fa fa-phone" style="margin-right: 8px;">
                                <img loading="lazy" src="./src/assets/haeder-component/middle-header/phone-receiver-silhouette.png" alt="Phone" style="width: 16px; height: 16px;">
                            </i> 
                            800-444-1508
                        </a>
                    </div>
                </div>
                
                <div class="support-text" style="margin-top: 30px;">
                    <ul style="list-style: none; padding: 0; margin: 0; display: flex; justify-content: space-around;">
                        ${mobileMenuData.support.map(item => `
                            <li style="position: relative; text-align: center; width: 70px;">
                                <a href="${item.link}" class="position-absolute w-100 h-100 top-0 start-0" target="${item.type === 'Chat' ? '_blank' : '_self'}"></a>
                                <div class="support-icon" style="width: 50px; height: 50px; background-color: #ff6b00; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
                                    <i class="fa" style="font-size: 20px; color: white;">
                                        <img loading="lazy" src="${item.icon}" alt="${item.type}" style="width: 24px; height: 24px;">
                                    </i>
                                </div>
                                <div class="call-text1">
                                    <p class="text-center fw-bold fs-6 mt-14" style="padding-top: 20px; color: #424445; font-size: 14px; font-weight: bold; margin: 0;">${item.type}</p>
                                </div>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="mob-call-back" style="margin-top: 30px;">
                    <ul style="list-style: none; padding: 0; margin: 0; display: flex; justify-content: center; align-items: center;">
                        ${mobileMenuData.callBack.map(item => `
                            <li style="margin: 0 15px;">
                                <a href="${item.link}" style="text-align: center; display: inline-block; padding: 15px; text-decoration: none; border: 1px solid transparent; border-radius: 5px; transition: all 0.3s;">
                                    <div style="width: 20px; height: 20px; display: inline-block; margin-bottom: 5px;">
                                        <img loading="lazy" src="${item.icon}" alt="${item.text}" style="width: 20px; height: 20px;">
                                    </div>
                                    <p style="font-size: 14px; font-weight: bold; color: #004488; margin: 0; line-height: 1.2;">${item.text}</p>
                                    <i class="fa fa-angle-right fs-6" aria-hidden="false" style="font-size: 16px; color: #666; margin-top: 5px;"></i>
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="mob-call-btn text-center mt-3" style="text-align: center; margin-top: 20px; border: none;">
                    <div style="width: 25px; height: 25px; display: inline-block; margin-right: 5px; vertical-align: middle;">
                        <img loading="lazy" src="./src/assets/haeder-component/mobile-menu/icon/printing.png" alt="Fax" style="width: 25px; height: 25px;">
                    </div> 
                    740-548-5314
                </div>
                
                <div class="newsletter-area mt-4 px-3" style="margin-top: 30px; padding: 0 15px;">
                    <ul style="list-style: none; padding: 0; margin: 0; display: flex; justify-content: flex-start;">
                        <li style="margin-right: 10px;">
                            <a href="https://www.facebook.com/GilsonCompany" style="text-decoration: none;">
                                <div style="width: 26px; height: 26px; display: inline-block; background-image: url('./src/assets/haeder-component/social/facebook.png'); background-size: contain; background-repeat: no-repeat;"></div>
                            </a>
                        </li>
                        <li style="margin-right: 10px;">
                            <a href="https://www.instagram.com/gilsoncompanyinc" style="text-decoration: none;">
                                <div style="width: 26px; height: 26px; display: inline-block; background-image: url('./src/assets/haeder-component/social/instagram.png'); background-size: contain; background-repeat: no-repeat;"></div>
                            </a>
                        </li>
                        <li style="margin-right: 10px;">
                            <a href="https://twitter.com/gilsoncompany" style="text-decoration: none;">
                                <div style="width: 26px; height: 26px; display: inline-block; background-image: url('./src/assets/haeder-component/social/twitter.png'); background-size: contain; background-repeat: no-repeat;"></div>
                            </a>
                        </li>
                        <li style="margin-right: 10px;">
                            <a href="https://www.linkedin.com/company/gilson-company-inc." style="text-decoration: none;">
                                <div style="width: 26px; height: 26px; display: inline-block; background-image: url('./src/assets/haeder-component/social/linkedin.png'); background-size: contain; background-repeat: no-repeat;"></div>
                            </a>
                        </li>
                        <li style="margin-right: 10px;">
                            <a href="https://www.youtube.com/user/GilsonCompanyInc" style="text-decoration: none;">
                                <div style="width: 26px; height: 26px; display: inline-block; background-image: url('./src/assets/haeder-component/social/youtube.png'); background-size: contain; background-repeat: no-repeat;"></div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        `;
        
        this.menu.querySelector('.mobile-menu1').innerHTML = html;
    }
    
    setupEventListeners() {
        // Close button (delegated event since button is dynamically added)
        this.menu.addEventListener('click', (e) => {
            if (e.target.closest('#mobileMenuClose') || e.target.id === 'mobileMenuClose') {
                this.close();
            }
            
            // Close when clicking outside the menu content
            if (e.target === this.menu) {
                this.close();
            }
        });
        
        // Add event listener to menu toggle button
        const menuToggle = document.querySelector('.toolbar__menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => this.toggle());
        }
    }
    
    open() {
        this.menu.classList.add('mobile-menu-open');
        this.menu.style.width = '100%';
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.menu.classList.remove('mobile-menu-open');
        this.menu.style.width = '0';
        this.isOpen = false;
        document.body.style.overflow = 'auto';
    }
    
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
}

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.mobileMenu = new MobileMenu();
    
    // Also initialize the event listener for the menu toggle button
    const menuToggle = document.querySelector('.toolbar__menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            window.mobileMenu.toggle();
        });
    }
});