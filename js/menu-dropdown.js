// menu-dropdown.js
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
                
                // Create dropdown container
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
        dropdown.className = 'mega-dropdown';
        dropdown.style.cssText = 'position: absolute; top: 100%; left: 0; right: 0; width: 88%; z-index: 1000; background-color: white; box-shadow: 0 4px 8px rgba(0,0,0,0.1); text-align: left; color: #333; margin: auto; display: none;';
        
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
            <ul class="nav-tabs" style="background-color: #446798; display: flex; list-style: none; margin: 0; padding: 0; overflow-x: auto;">
                ${tabsHTML}
            </ul>
            <div class="tab-content">
                ${contentHTML}
            </div>
        `;
        
        // Add tab click handlers
        dropdown.querySelectorAll('.tab-btn').forEach(btn => {
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
            <li class="nav-item" style="margin: 0; flex-shrink: 0;">
                <button class="tab-btn nav-link border-0 rounded-0" 
                        data-tab="${tab.id}"
                        data-category="${category}"
                        style="cursor: pointer; border-right: 1px solid #869bb8; font-size: 14px; padding: 10px 18px; transition: 0.3s; margin: 0; background-color: ${tab.id === activeTabId ? '#fff' : '#446798'}; color: ${tab.id === activeTabId ? '#446798' : '#fff'}; white-space: nowrap;">${tab.label}</button>
            </li>
        `).join('');
    }

    createContentHTML(content, activeTabId) {
        const activeContent = content[activeTabId];
        
        if (!activeContent || !activeContent.categories) {
            console.error(`No content for tab: ${activeTabId}`);
            return '<div class="p-4">No content available</div>';
        }
        
        const categoriesHTML = activeContent.categories.map(cat => `
            <div class="d-flex flex-column align-items-center text-center border h-100" style="padding: 15px; transition: 0.3s; box-shadow: none; border-color: #e0e0e0;">
                <div class="mb-2">
                    <img alt="${cat.name}" loading="lazy" src="${cat.img}" style="width: 100%; height: 100px; object-fit: contain; background-color: #f5f5f5;">
                </div>
                <div>
                    <a href="${cat.link}" class="text-decoration-none fw-medium" style="font-size: 14px; line-height: 1.3; color: #333; transition: color 0.3s;">${cat.name}</a>
                </div>
            </div>
        `).join('');
        
        const resourcesHTML = activeContent.resources ? activeContent.resources.map(res => `
            <li class="mb-2">
                <a href="${res.link}" class="d-flex align-items-start text-decoration-none p-2" style="transition: 0.3s; border-radius: 4px; background-color: transparent;" ${res.isVideo ? 'target="_blank"' : ''}>
                    <img alt="${res.title}" class="me-2 flex-shrink-0" loading="lazy" src="${res.img}" style="width: 60px; height: 60px; object-fit: contain; background-color: #f5f5f5;">
                    <span style="font-size: 14px; line-height: 1.3; font-weight: 400; color: #002d58;">${res.title}</span>
                </a>
            </li>
        `).join('') : '';
        
        return `
            <div class="row g-0" style="min-height: 400px;">
                <div class="col-md-9" style="padding: 20px;">
                    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px;">
                        ${categoriesHTML}
                    </div>
                </div>
                <div class="col-md-3 border-start p-3" style="background-color: #f2f3f4;">
                    <h6 class="mb-3" style="color: #002d58;">Resources</h6>
                    <ul class="list-unstyled" style="margin-bottom: 20px;">
                        ${resourcesHTML}
                    </ul>
                    <div class="border-bottom border-secondary mb-3 pb-3">
                        <a href="https://www.globalgilson.com/customer-resource-center" class="d-block text-center text-decoration-none border border-secondary rounded text-primary fw-bold py-2" style="font-size: 14px; color: #0066cc;">Resource Center</a>
                    </div>
                    <div class="mb-3">
                        <a href="https://www.globalgilson.com/Content/Images/uploaded/pdf/product-catalogs/pdf-viewer/2021/index.html?reload=1591207903917#page=1" class="d-block text-decoration-none" target="_blank">
                            <img alt="Gilson Catalog" class="w-100" loading="lazy" src="./src/assets/haeder-component/gilson-catalog-button.webp">
                        </a>
                    </div>
                    <div>
                        <a href="https://www.globalgilson.com/gilson-catalog" class="d-block text-center text-decoration-none border border-secondary rounded text-primary fw-bold py-2" style="font-size: 14px; color: #0066cc;">Request Catalog</a>
                    </div>
                </div>
            </div>
        `;
    }

    switchTab(dropdown, tabId, category) {
        console.log(`Switching to tab: ${tabId}`);
        
        // Update tab styles
        dropdown.querySelectorAll('.tab-btn').forEach(btn => {
            const isActive = btn.dataset.tab === tabId;
            btn.style.backgroundColor = isActive ? '#fff' : '#446798';
            btn.style.color = isActive ? '#446798' : '#fff';
        });
        
        // Update content
        const content = window.menuData[category].content[tabId];
        const contentContainer = dropdown.querySelector('.tab-content');
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
            dropdown.style.display = 'block';
            
            // Position the dropdown
            const rect = item.getBoundingClientRect();
            // const containerWidth = window.innerWidth * 0.88;
            // const leftPosition = Math.max(0, rect.left - (containerWidth - rect.width) / 2);
            
            // dropdown.style.left = `${leftPosition}px`;
            // dropdown.style.width = `${containerWidth}px`;
            
            // Add active class to parent item
            item.classList.add('active');
            
            // Add active style to link
            const link = item.querySelector('.toolbar__nav-link');
            if (link) {
                link.style.backgroundColor = '#fff';
                link.style.color = '#446798';
            }
        }
    }

    hideMenu() {
        if (this.currentMenu) {
            const dropdown = this.currentMenu.querySelector('.mega-dropdown');
            if (dropdown) {
                dropdown.style.display = 'none';
            }
            this.currentMenu.classList.remove('active');
            
            // Remove active style from link
            const link = this.currentMenu.querySelector('.toolbar__nav-link');
            if (link) {
                link.style.backgroundColor = 'transparent';
                link.style.color = '';
            }
            
            this.currentMenu = null;
        }
    }

    keepMenuOpen() {
        if (this.currentMenu) {
            this.currentMenu.classList.add('active');
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded, initializing MegaMenu');
    new MegaMenu();
});