console.log('menu-dropdown.js loaded');

class MegaMenu {
    constructor() {
        this.currentMenu = null;
        this.menuContainer = null;
        this.init();
    }

    init() {
        console.log('Initializing MegaMenu...');
        
        const navItems = document.querySelectorAll('.toolbar__nav-item');
        
        navItems.forEach((item, index) => {
            const link = item.querySelector('.toolbar__nav-link');
            const category = this.getCategoryFromLink(link.href);
            
            if (category && window.menuData?.[category]) {
                const dropdown = this.createDropdown(category);
                item.appendChild(dropdown);
                
                this.addEventListeners(item, dropdown, category);
            }
        });
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.toolbar__nav-item')) {
                this.hideMenu();
            }
        });
    }

    getCategoryFromLink(href) {
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
            if (pathname.includes(key)) return value;
        }
        return null;
    }

    addEventListeners(item, dropdown, category) {
        item.addEventListener('mouseenter', () => this.showMenu(item, category));
        
        const hideMenuHandler = (e) => {
            if (!item.contains(e.relatedTarget)) this.hideMenu();
        };
        
        item.addEventListener('mouseleave', hideMenuHandler);
        dropdown.addEventListener('mouseleave', hideMenuHandler);
        dropdown.addEventListener('mouseenter', () => this.keepMenuOpen());
    }

    createDropdown(category) {
        const dropdown = document.createElement('div');
        dropdown.className = 'mega-dropdown mega-dropdown--hidden';
        
        const data = window.menuData[category];
        if (!data?.tabs) return dropdown;
        
        const activeTab = data.tabs.find(tab => tab.isActive) || data.tabs[0];
        const activeTabId = activeTab?.id || data.tabs[0].id;
        
        dropdown.innerHTML = `
            <ul class="mega-dropdown__tabs">
                ${this.createTabsHTML(data.tabs, category, activeTabId)}
            </ul>
            <div class="mega-dropdown__content">
                ${this.createContentHTML(data.content, activeTabId)}
            </div>
        `;
        
        this.addTabEventListeners(dropdown, category);
        return dropdown;
    }

    createTabsHTML(tabs, category, activeTabId) {
        if (!Array.isArray(tabs)) return '';
        
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
        if (!activeContent?.categories) return '<div class="mega-dropdown__no-content">No content available</div>';
        
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
        
        const resourcesHTML = activeContent.resources?.map(res => `
            <li class="mega-dropdown__resource-item">
                <a href="${res.link}" class="mega-dropdown__resource-link" ${res.isVideo ? 'target="_blank"' : ''}>
                    <img alt="${res.title}" class="mega-dropdown__resource-img" loading="lazy" src="${res.img}">
                    <span class="mega-dropdown__resource-title">${res.title}</span>
                </a>
            </li>
        `).join('') || '';
        
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
                        <a href="https://www.globalgilson.com/Content/Images/uploaded/pdf/product-catalogs/pdf-viewer/2021/index.html?reload=1591207903917#page=1" 
                           class="mega-dropdown__catalog-link" target="_blank">
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

    addTabEventListeners(dropdown, category) {
        dropdown.querySelectorAll('.mega-dropdown__tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchTab(dropdown, btn.dataset.tab, category);
            });
        });
    }

    switchTab(dropdown, tabId, category) {
        dropdown.querySelectorAll('.mega-dropdown__tab-btn').forEach(btn => {
            btn.classList.toggle('mega-dropdown__tab-btn--active', btn.dataset.tab === tabId);
        });
        
        const contentContainer = dropdown.querySelector('.mega-dropdown__content');
        contentContainer.innerHTML = this.createContentHTML(window.menuData[category].content, tabId);
    }

    showMenu(item, category) {
        if (this.currentMenu && this.currentMenu !== item) {
            this.hideMenu();
        }
        
        this.currentMenu = item;
        const dropdown = item.querySelector('.mega-dropdown');
        
        if (dropdown) {
            dropdown.classList.remove('mega-dropdown--hidden');
            dropdown.classList.add('mega-dropdown--visible');
            item.classList.add('toolbar__nav-item--active');
            
            const link = item.querySelector('.toolbar__nav-link');
            link?.classList.add('toolbar__nav-link--active');
        }
    }

    hideMenu() {
        if (!this.currentMenu) return;
        
        const dropdown = this.currentMenu.querySelector('.mega-dropdown');
        if (dropdown) {
            dropdown.classList.remove('mega-dropdown--visible');
            dropdown.classList.add('mega-dropdown--hidden');
        }
        
        this.currentMenu.classList.remove('toolbar__nav-item--active');
        const link = this.currentMenu.querySelector('.toolbar__nav-link');
        link?.classList.remove('toolbar__nav-link--active');
        
        this.currentMenu = null;
    }

    keepMenuOpen() {
        if (this.currentMenu) {
            this.currentMenu.classList.add('toolbar__nav-item--active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new MegaMenu());