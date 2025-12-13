console.log('menu-dropdown.js loaded');

class MegaMenu {
    constructor() {
        this.currentMenu = null;
        this.currentTab = null;
        this.menuContainer = null;
        this.init();
    }

    init() {
        console.log('Initializing MegaMenu...');
        console.log('Available menuData:', window.menuData);
        
        // Find all navigation items that should have dropdowns
        const navItems = document.querySelectorAll('.toolbar__nav-item');
        console.log('Found nav items:', navItems.length);
        
        navItems.forEach((item, index) => {
            const link = item.querySelector('.toolbar__nav-link');
            const category = this.getCategoryFromLink(link.href);
            
            console.log(`Item ${index}: ${link.textContent}, Category: ${category}`);
            
            if (category && window.menuData && window.menuData[category]) {
                console.log(`Creating dropdown for: ${category}`);
                
                // Create dropdown container with BEM classes
                const dropdown = this.createDropdown(category);
                item.appendChild(dropdown);
                
                // Add event listeners
                item.addEventListener('mouseenter', () => {
                    console.log(`Mouse entered: ${category}`);
                    this.showMenu(item, category);
                });
                
                item.addEventListener('mouseleave', (e) => {
                    if (!item.contains(e.relatedTarget)) {
                        this.hideMenu();
                    }
                });
                
                // Keep dropdown open when hovering over it
                dropdown.addEventListener('mouseenter', () => this.keepMenuOpen());
                dropdown.addEventListener('mouseleave', (e) => {
                    if (!dropdown.contains(e.relatedTarget)) {
                        this.hideMenu();
                    }
                });
            } else {
                console.log(`No data found for category: ${category}`);
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.toolbar__nav-item')) {
                this.hideMenu();
            }
        });
        
        console.log('MegaMenu initialization complete');
    }

    getCategoryFromLink(href) {
        // Սա պարզեցված է, կարող եք կարգավորել ըստ ձեր կարիքների
        const url = new URL(href);
        const pathname = url.pathname;
        
        const categoryMap = {
            'sieve-analysis-equipment': 'sieving',
            'screening': 'screening',
            'sampling-dividing': 'sample-splitting',
            'aggregate-testing-equipment': 'aggregates',
            'asphalt-testing-equipment': 'asphalt',
            'concrete-testing-equipment': 'concrete',
            'soil-testing-equipment': 'soils',
            'pans-tools-glassware': 'general-lab'
        };
        
        for (const [key, value] of Object.entries(categoryMap)) {
            if (pathname.includes(key)) {
                return value;
            }
        }
        return null;
    }

    createDropdown(category) {
        const dropdown = document.createElement('div');
        dropdown.className = 'mega-dropdown mega-dropdown--hidden';
        
        const data = window.menuData[category];
        console.log(`Creating dropdown for ${category} with data:`, data);
        
        if (!data || !data.tabs) {
            console.error(`No valid data for category: ${category}`);
            return dropdown;
        }
        
        // Find active tab
        const activeTab = data.tabs.find(tab => tab.isActive) || data.tabs[0];
        const activeTabId = activeTab ? activeTab.id : data.tabs[0].id;
        
        // Create tabs
        const tabsHTML = this.createTabsHTML(data.tabs, category, activeTabId);
        
        // Create tab content
        const contentHTML = this.createContentHTML(data.content, activeTabId);
        
        dropdown.innerHTML = `
            <ul class="mega-dropdown__tabs">
                ${tabsHTML}
            </ul>
            <div class="mega-dropdown__content">
                ${contentHTML}
            </div>
        `;
        
        // Add tab click handlers
        dropdown.querySelectorAll('.mega-dropdown__tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const tabId = btn.dataset.tab;
                this.switchTab(dropdown, tabId, category);
            });
        });
        
        return dropdown;
    }

    createTabsHTML(tabs, category, activeTabId) {
        if (!tabs || !Array.isArray(tabs)) {
            console.error(`No tabs array for category: ${category}`);
            return '';
        }
        
        return tabs.map(tab => `
            <li class="mega-dropdown__tab-item">
                <button class="mega-dropdown__tab-btn ${tab.id === activeTabId ? 'mega-dropdown__tab-btn--active' : ''}" 
                        data-tab="${tab.id}"
                        data-category="${category}">
                    ${tab.label}
                </button>
            </li>
        `).join('');
    }

    createContentHTML(content, activeTabId) {
        const activeContent = content[activeTabId];
        
        if (!activeContent || !activeContent.categories) {
            console.error(`No content for tab: ${activeTabId}`);
            return '<div class="mega-dropdown__no-content">No content available</div>';
        }
        
        const categoriesHTML = activeContent.categories.map(cat => `
            <div class="mega-dropdown__category">
                <div class="mega-dropdown__category-image">
                    <img alt="${cat.name}" loading="lazy" src="${cat.img}">
                </div>
                <div class="mega-dropdown__category-info">
                    <a href="${cat.link}" class="mega-dropdown__category-link">${cat.name}</a>
                </div>
            </div>
        `).join('');
        
        const resourcesHTML = activeContent.resources ? activeContent.resources.map(res => `
            <li class="mega-dropdown__resource-item">
                <a href="${res.link}" class="mega-dropdown__resource-link" ${res.isVideo ? 'target="_blank"' : ''}>
                    <img alt="${res.title}" class="mega-dropdown__resource-img" loading="lazy" src="${res.img}">
                    <span class="mega-dropdown__resource-title">${res.title}</span>
                </a>
            </li>
        `).join('') : '';
        
        return `
            <div class="mega-dropdown__grid">
                <div class="mega-dropdown__categories">
                    <div class="mega-dropdown__categories-grid">
                        ${categoriesHTML}
                    </div>
                </div>
                <div class="mega-dropdown__resources">
                    <h3 class="mega-dropdown__resources-title">Resources</h3>
                    <ul class="mega-dropdown__resource-list">
                        ${resourcesHTML}
                    </ul>
                    <div class="mega-dropdown__resource-actions">
                        <a href="https://www.globalgilson.com/customer-resource-center" class="mega-dropdown__action-btn mega-dropdown__action-btn--center">
                            Resource Center
                        </a>
                        <a href="https://www.globalgilson.com/Content/Images/uploaded/pdf/product-catalogs/pdf-viewer/2021/index.html?reload=1591207903917#page=1" class="mega-dropdown__catalog-link" target="_blank">
                            <img alt="Gilson Catalog" class="mega-dropdown__catalog-img" loading="lazy" src="./src/assets/haeder-component/gilson-catalog-button.webp">
                        </a>
                        <a href="https://www.globalgilson.com/gilson-catalog" class="mega-dropdown__action-btn mega-dropdown__action-btn--request">
                            Request Catalog
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    switchTab(dropdown, tabId, category) {
        console.log(`Switching to tab: ${tabId}`);
        
        // Update tab styles
        dropdown.querySelectorAll('.mega-dropdown__tab-btn').forEach(btn => {
            btn.classList.toggle('mega-dropdown__tab-btn--active', btn.dataset.tab === tabId);
        });
        
        // Update content
        const content = window.menuData[category].content[tabId];
        const contentContainer = dropdown.querySelector('.mega-dropdown__content');
        contentContainer.innerHTML = this.createContentHTML(window.menuData[category].content, tabId);
        
        // Reattach event listeners for resources
        contentContainer.querySelectorAll('a[target="_blank"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    }

    showMenu(item, category) {
        console.log(`Showing menu for: ${category}`);
        
        // Hide any currently open menu
        if (this.currentMenu && this.currentMenu !== item) {
            this.hideMenu();
        }
        
        this.currentMenu = item;
        const dropdown = item.querySelector('.mega-dropdown');
        
        if (dropdown) {
            dropdown.classList.remove('mega-dropdown--hidden');
            dropdown.classList.add('mega-dropdown--visible');
            
            // Add active class to parent item
            item.classList.add('toolbar__nav-item--active');
            
            // Add active style to link
            const link = item.querySelector('.toolbar__nav-link');
            if (link) {
                link.classList.add('toolbar__nav-link--active');
            }
        }
    }

    hideMenu() {
        if (this.currentMenu) {
            const dropdown = this.currentMenu.querySelector('.mega-dropdown');
            if (dropdown) {
                dropdown.classList.remove('mega-dropdown--visible');
                dropdown.classList.add('mega-dropdown--hidden');
            }
            this.currentMenu.classList.remove('toolbar__nav-item--active');
            
            // Remove active style from link
            const link = this.currentMenu.querySelector('.toolbar__nav-link');
            if (link) {
                link.classList.remove('toolbar__nav-link--active');
            }
            
            this.currentMenu = null;
        }
    }

    keepMenuOpen() {
        if (this.currentMenu) {
            this.currentMenu.classList.add('toolbar__nav-item--active');
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded, initializing MegaMenu');
    new MegaMenu();
});