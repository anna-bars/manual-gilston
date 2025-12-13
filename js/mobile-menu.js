// Mobile Menu Configuration
const MOBILE_MENU_CONFIG = {
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

// Template generators
const MenuTemplates = {
    generateList(items, iconSize = 'large', textClass = '') {
        return items.map(item => `
            <li class="mobile-menu__item">
                <a href="${item.link}" class="mobile-menu__link">
                    ${item.img ? `<img loading="lazy" src="${item.img}" alt="${item.name}" class="mobile-menu__icon mobile-menu__icon--${iconSize}">` : ''}
                    ${item.icon ? `<img loading="lazy" src="${item.icon}" alt="${item.name}" class="mobile-menu__icon mobile-menu__icon--${iconSize}">` : ''}
                    <p class="mobile-menu__text ${textClass}">${item.name || item.text || item.type}</p>
                    <i class="fa fa-angle-right mobile-menu__arrow"></i>
                </a>
            </li>
        `).join('');
    },

    generateSupport(items) {
        return items.map(item => `
            <li class="mobile-menu__support-item">
                <a href="${item.link}" target="${item.type === 'Chat' ? '_blank' : '_self'}" class="mobile-menu__link">
                    <div class="mobile-menu__support-icon">
                        <img loading="lazy" src="${item.icon}" alt="${item.type}" class="mobile-menu__support-icon-img">
                    </div>
                    <p class="mobile-menu__support-label">${item.type}</p>
                </a>
            </li>
        `).join('');
    },

    generateCallback(items) {
        return items.map(item => `
            <li class="mobile-menu__callback-item">
                <a href="${item.link}" class="mobile-menu__callback-link">
                    <img loading="lazy" src="${item.icon}" alt="${item.text}" class="mobile-menu__callback-icon">
                    <p class="mobile-menu__callback-text">${item.text}</p>
                    <i class="fa fa-angle-right mobile-menu__callback-arrow"></i>
                </a>
            </li>
        `).join('');
    },

    generateSocial() {
        const socialLinks = [
            { platform: "Facebook", url: "https://www.facebook.com/GilsonCompany", icon: "./src/assets/haeder-component/mobile-menu/social-media/fb.webp" },
            { platform: "Instagram", url: "https://www.instagram.com/gilsoncompanyinc", icon: "./src/assets/haeder-component/mobile-menu/social-media/insta.webp" },
            { platform: "Twitter", url: "https://twitter.com/gilsoncompany", icon: "./src/assets/haeder-component/mobile-menu/social-media/twitter.webp" },
            { platform: "LinkedIn", url: "https://www.linkedin.com/company/gilson-company-inc.", icon: "./src/assets/haeder-component/mobile-menu/social-media/linkedin.webp" },
            { platform: "YouTube", url: "https://www.youtube.com/user/GilsonCompanyInc", icon: "./src/assets/haeder-component/mobile-menu/social-media/utube.webp" }
        ];

        return socialLinks.map(item => `
            <li class="mobile-menu__social-item">
                <a href="${item.url}" class="mobile-menu__social-link">
                    <img src="${item.icon}" alt="${item.platform}" class="mobile-menu__social-icon">
                </a>
            </li>
        `).join('');
    }
};

// Mobile Menu Class
class MobileMenu {
    constructor() {
        this.menu = document.getElementById('mobileMenu');
        this.content = this.menu.querySelector('.mobile-menu__content');
        this.isOpen = false;
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    render() {
        this.content.innerHTML = `
            <h3 class="mobile-menu__title">Shop by Category</h3>
            <ul class="mobile-menu__list">
                ${MenuTemplates.generateList(MOBILE_MENU_CONFIG.categories, 'large', '')}
            </ul>
            
            <div class="mobile-menu__section">
                <h3 class="mobile-menu__title">Account</h3>
                <ul class="mobile-menu__list">
                    ${MenuTemplates.generateList(MOBILE_MENU_CONFIG.account, 'small', 'mobile-menu__text--secondary')}
                </ul>
            </div>
            
            <div class="mobile-menu__section">
                <h3 class="mobile-menu__title">Tools</h3>
                <ul class="mobile-menu__list">
                    ${MenuTemplates.generateList(MOBILE_MENU_CONFIG.tools, 'small', 'mobile-menu__text--secondary')}
                </ul>
            </div>
            
            <div class="mobile-menu__section">
                <h3 class="mobile-menu__title">Resources</h3>
                <ul class="mobile-menu__list">
                    ${MenuTemplates.generateList(MOBILE_MENU_CONFIG.resources, 'small', 'mobile-menu__text--secondary')}
                </ul>
            </div>
            
            <a href="https://www.globalgilson.com/replacement-parts" class="mobile-menu__btn">Replacement Parts</a>

            <div class="mobile-menu__poster">
                <img loading="lazy" src="./src/assets/haeder-component/mobile-menu/mob-menu-post.webp" alt="Phone" class="mobile-menu__poster-img">
            </div>
            
            <div class="mobile-menu__contact">
                <div class="mobile-menu__contact-header">
                    <h4 class="mobile-menu__contact-title">We're here to help</h4>
                    <p class="mobile-menu__contact-desc">We'll do anything we can to help find an answer to your question.</p>
                    <div class="mobile-menu__call">
                        <a href="#" class="mobile-menu__call-link">
                            <img loading="lazy" src="./src/assets/haeder-component/middle-header/phone-receiver-silhouette.png" alt="Phone" class="mobile-menu__call-icon">
                            800-444-1508
                        </a>
                    </div>
                </div>
                
                <div class="mobile-menu__support">
                    <ul class="mobile-menu__support-list">
                        ${MenuTemplates.generateSupport(MOBILE_MENU_CONFIG.support)}
                    </ul>
                </div>
                
                <div class="mobile-menu__callback">
                    <ul class="mobile-menu__callback-list">
                        ${MenuTemplates.generateCallback(MOBILE_MENU_CONFIG.callBack)}
                    </ul>
                </div>
                
                <div class="mobile-menu__fax">
                    <img loading="lazy" src="./src/assets/haeder-component/mobile-menu/icon/printing.png" alt="Fax" class="mobile-menu__fax-icon">
                    740-548-5314
                </div>
                
                <div class="mobile-menu__social">
                    <ul class="mobile-menu__social-list">
                        ${MenuTemplates.generateSocial()}
                    </ul>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Close button
        document.getElementById('mobileMenuClose')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.close();
            this.removeFullClass();
        });

        // Close on overlay click
        this.menu.addEventListener('click', (e) => {
            if (e.target === this.menu) {
                this.close();
                this.removeFullClass();
            }
        });

        // Toggle button
        document.querySelector('.toolbar__menu-toggle')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
            this.toggleFullClass();
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.menu.classList.add('mobile-menu--open');
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.menu.classList.remove('mobile-menu--open');
        this.isOpen = false;
        document.body.style.overflow = '';
    }

    toggleFullClass() {
        this.menu.classList.toggle('full');
        if (this.menu.classList.contains('full')) {
            this.menu.style.width = '100%';
            this.content.style.transform = 'translateX(0)';
        } else {
            this.menu.style.width = '';
            this.content.style.transform = '';
        }
    }

    removeFullClass() {
        this.menu.classList.remove('full');
        this.menu.style.width = '';
        this.content.style.transform = '';
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const menuElement = document.getElementById('mobileMenu');
    if (!menuElement) return;

    window.mobileMenu = new MobileMenu();
});