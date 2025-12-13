// mega-menu.js - վերակառուցված BEM մեթոդաբանությամբ
class MegaMenu {
    constructor(options = {}) {
        this.navItems = options.navItems || [];
        this.menuData = options.menuData || {};
        this.isMobile = window.innerWidth < 992;
        this.currentDropdown = null;
        this.init();
    }

    init() {
        console.log('MegaMenu initialized with BEM methodology');
        this.createMarkup();
        this.bindEvents();
        this.initMobileMenu();
    }

    createMarkup() {
        // Ստեղծել մեգա մենյուի կոնտեյներ, եթե գոյություն չունի
        if (!document.querySelector('.mega-menu')) {
            const megaMenuContainer = document.createElement('div');
            megaMenuContainer.className = 'mega-menu';
            
            const toolbarBottom = document.querySelector('.toolbar__bottom');
            if (toolbarBottom) {
                toolbarBottom.parentNode.insertBefore(megaMenuContainer, toolbarBottom.nextSibling);
            }
        }
    }

    bindEvents() {
        const navItems = document.querySelectorAll('.toolbar__nav-item');
        
        navItems.forEach((navItem, index) => {
            const navLink = navItem.querySelector('.toolbar__nav-link');
            const linkText = navLink.textContent.trim().toLowerCase();
            
            // Գտնել համապատասխան տվյալները
            const dataKey = this.getDataKeyFromText(linkText);
            
            if (dataKey && this.menuData[dataKey]) {
                // Desktop events
                navItem.addEventListener('mouseenter', (e) => {
                    if (!this.isMobile) {
                        this.showDropdown(dataKey, navItem);
                    }
                });
                
                navItem.addEventListener('mouseleave', (e) => {
                    if (!this.isMobile) {
                        setTimeout(() => {
                            if (!navItem.contains(document.activeElement)) {
                                this.hideDropdown();
                            }
                        }, 100);
                    }
                });
                
                // Mobile events
                navLink.addEventListener('click', (e) => {
                    if (this.isMobile) {
                        e.preventDefault();
                        this.toggleMobileDropdown(dataKey, navItem);
                    }
                });
            }
        });
        
        // Document events
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.toolbar__nav-item') && !e.target.closest('.mega-dropdown')) {
                this.hideDropdown();
            }
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth < 992;
            if (this.isMobile && this.currentDropdown) {
                this.hideDropdown();
            }
        });
    }

    getDataKeyFromText(text) {
        const map = {
            'sieving': 'sieving',
            'screening': 'screening',
            'sample splitting': 'sampleSplitting',
            'aggregates': 'aggregates',
            'asphalt': 'asphalt',
            'concrete': 'concrete',
            'soils': 'soils',
            'general lab': 'generalLab'
        };
        
        return map[text] || '';
    }

    showDropdown(menuKey, parentElement) {
        // Hide any existing dropdown
        this.hideDropdown();
        
        const data = this.menuData[menuKey];
        if (!data) return;
        
        // Create dropdown
        const dropdown = this.createDropdown(data, menuKey);
        
        // Position dropdown
        this.positionDropdown(dropdown, parentElement);
        
        // Insert into DOM
        const megaMenuContainer = document.querySelector('.mega-menu');
        megaMenuContainer.appendChild(dropdown);
        
        // Show dropdown
        dropdown.classList.add('mega-dropdown--visible');
        
        // Store reference
        this.currentDropdown = dropdown;
        
        // Add active class to parent
        parentElement.classList.add('toolbar__nav-item--active');
    }

    createDropdown(data, menuKey) {
        const dropdown = document.createElement('div');
        dropdown.className = 'mega-dropdown';
        
        // Create tabs if multiple tabs exist
        const hasTabs = data.tabs && data.tabs.length > 1;
        let activeTabId = null;
        
        if (hasTabs) {
            const tabsContainer = this.createTabs(data.tabs);
            dropdown.appendChild(tabsContainer);
            activeTabId = data.tabs.find(t => t.isActive)?.id || data.tabs[0].id;
        } else {
            activeTabId = data.tabs?.[0]?.id || 'default';
        }
        
        // Create content
        const activeContent = data.content[activeTabId] || data.content;
        const contentContainer = this.createContent(activeContent, hasTabs);
        contentContainer.dataset.activeTab = activeTabId;
        dropdown.appendChild(contentContainer);
        
        // Tab switching functionality
        if (hasTabs) {
            dropdown.querySelectorAll('.mega-dropdown__tab').forEach(tabBtn => {
                tabBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const tabId = tabBtn.dataset.tabId;
                    this.switchTab(tabId, dropdown, data);
                });
                
                tabBtn.addEventListener('mouseenter', () => {
                    if (!this.isMobile) {
                        const tabId = tabBtn.dataset.tabId;
                        this.switchTab(tabId, dropdown, data);
                    }
                });
            });
        }
        
        // Dropdown events
        dropdown.addEventListener('mouseleave', () => {
            if (!this.isMobile) {
                this.hideDropdown();
            }
        });
        
        return dropdown;
    }

    createTabs(tabs) {
        const tabsContainer = document.createElement('div');
        tabsContainer.className = 'mega-dropdown__tabs';
        
        const tabsList = document.createElement('ul');
        tabsList.className = 'mega-dropdown__tabs-list';
        
        tabs.forEach(tab => {
            const tabItem = document.createElement('li');
            tabItem.className = 'mega-dropdown__tabs-item';
            
            const tabButton = document.createElement('button');
            tabButton.className = `mega-dropdown__tab mega-dropdown__tab--${tab.isActive ? 'active' : 'inactive'}`;
            tabButton.textContent = tab.label;
            tabButton.dataset.tabId = tab.id;
            tabButton.type = 'button';
            
            tabItem.appendChild(tabButton);
            tabsList.appendChild(tabItem);
        });
        
        tabsContainer.appendChild(tabsList);
        return tabsContainer;
    }

    createContent(contentData, hasTabs) {
        const contentContainer = document.createElement('div');
        contentContainer.className = 'mega-dropdown__content';
        
        // Create categories grid
        const categoriesGrid = this.createCategoriesGrid(contentData.categories);
        
        // Check if resources exist
        const hasResources = contentData.resources && contentData.resources.length > 0;
        
        if (hasResources) {
            const row = document.createElement('div');
            row.className = 'mega-dropdown__row';
            
            const categoriesCol = document.createElement('div');
            categoriesCol.className = 'mega-dropdown__col mega-dropdown__col--categories';
            categoriesCol.appendChild(categoriesGrid);
            
            const resourcesCol = document.createElement('div');
            resourcesCol.className = 'mega-dropdown__col mega-dropdown__col--resources';
            resourcesCol.appendChild(this.createResourcesSection(contentData.resources));
            
            row.appendChild(categoriesCol);
            row.appendChild(resourcesCol);
            contentContainer.appendChild(row);
        } else {
            const fullWidthRow = document.createElement('div');
            fullWidthRow.className = 'mega-dropdown__row mega-dropdown__row--full';
            fullWidthRow.appendChild(categoriesGrid);
            contentContainer.appendChild(fullWidthRow);
        }
        
        return contentContainer;
    }

    createCategoriesGrid(categories) {
        const grid = document.createElement('div');
        grid.className = 'mega-dropdown__categories';
        
        categories.forEach(category => {
            const categoryItem = this.createCategoryItem(category);
            grid.appendChild(categoryItem);
        });
        
        return grid;
    }

    createCategoryItem(category) {
        const item = document.createElement('div');
        item.className = 'mega-dropdown__category';
        
        const categoryLink = document.createElement('a');
        categoryLink.href = category.link;
        categoryLink.className = 'mega-dropdown__category-link';
        categoryLink.setAttribute('aria-label', category.name);
        
        const imageContainer = document.createElement('div');
        imageContainer.className = 'mega-dropdown__category-image';
        
        const image = document.createElement('img');
        image.src = category.img;
        image.alt = category.name;
        image.loading = 'lazy';
        image.className = 'mega-dropdown__category-img';
        
        imageContainer.appendChild(image);
        
        const nameContainer = document.createElement('div');
        nameContainer.className = 'mega-dropdown__category-name';
        nameContainer.textContent = category.name;
        
        categoryLink.appendChild(imageContainer);
        categoryLink.appendChild(nameContainer);
        item.appendChild(categoryLink);
        
        return item;
    }

    createResourcesSection(resources) {
        const section = document.createElement('div');
        section.className = 'mega-dropdown__resources';
        
        // Title
        const title = document.createElement('h3');
        title.className = 'mega-dropdown__resources-title';
        title.textContent = 'Resources';
        
        // Resources list
        const resourcesList = document.createElement('ul');
        resourcesList.className = 'mega-dropdown__resources-list';
        
        resources.forEach(resource => {
            const resourceItem = this.createResourceItem(resource);
            resourcesList.appendChild(resourceItem);
        });
        
        // Buttons
        const resourceCenterBtn = this.createResourceButton(
            'https://www.globalgilson.com/customer-resource-center',
            'Resource Center',
            'mega-dropdown__btn mega-dropdown__btn--resource'
        );
        
        const catalogImage = document.createElement('a');
        catalogImage.href = 'https://www.globalgilson.com/Content/Images/uploaded/pdf/product-catalogs/pdf-viewer/2021/index.html?reload=1591207903917#page=1';
        catalogImage.className = 'mega-dropdown__catalog-link';
        catalogImage.target = '_blank';
        
        const catalogImg = document.createElement('img');
        catalogImg.src = './src/assets/haeder-component/gilson-catalog-button.webp';
        catalogImg.alt = 'Gilson Catalog';
        catalogImg.loading = 'lazy';
        catalogImg.className = 'mega-dropdown__catalog-img';
        
        catalogImage.appendChild(catalogImg);
        
        const requestCatalogBtn = this.createResourceButton(
            'https://www.globalgilson.com/gilson-catalog',
            'Request Catalog',
            'mega-dropdown__btn mega-dropdown__btn--catalog'
        );
        
        // Append all elements
        section.appendChild(title);
        section.appendChild(resourcesList);
        section.appendChild(resourceCenterBtn);
        section.appendChild(catalogImage);
        section.appendChild(requestCatalogBtn);
        
        return section;
    }

    createResourceItem(resource) {
        const item = document.createElement('li');
        item.className = 'mega-dropdown__resource';
        
        const link = document.createElement('a');
        link.href = resource.link;
        link.className = 'mega-dropdown__resource-link';
        if (resource.isVideo) link.target = '_blank';
        
        const imageContainer = document.createElement('div');
        imageContainer.className = 'mega-dropdown__resource-image';
        
        const image = document.createElement('img');
        image.src = resource.img;
        image.alt = resource.title;
        image.loading = 'lazy';
        image.className = 'mega-dropdown__resource-img';
        
        imageContainer.appendChild(image);
        
        const titleSpan = document.createElement('span');
        titleSpan.className = 'mega-dropdown__resource-title';
        titleSpan.textContent = resource.title;
        
        link.appendChild(imageContainer);
        link.appendChild(titleSpan);
        item.appendChild(link);
        
        return item;
    }

    createResourceButton(href, text, className) {
        const button = document.createElement('a');
        button.href = href;
        button.className = className;
        button.textContent = text;
        return button;
    }

    switchTab(tabId, dropdown, data) {
        // Update active tab
        dropdown.querySelectorAll('.mega-dropdown__tab').forEach(btn => {
            btn.classList.remove('mega-dropdown__tab--active');
            btn.classList.add('mega-dropdown__tab--inactive');
            
            if (btn.dataset.tabId === tabId) {
                btn.classList.remove('mega-dropdown__tab--inactive');
                btn.classList.add('mega-dropdown__tab--active');
            }
        });
        
        // Update content
        const contentContainer = dropdown.querySelector('.mega-dropdown__content');
        const newContent = this.createContent(data.content[tabId], true);
        newContent.dataset.activeTab = tabId;
        
        contentContainer.parentNode.replaceChild(newContent, contentContainer);
    }

    positionDropdown(dropdown, parentElement) {
        const rect = parentElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        dropdown.style.top = `${rect.bottom + scrollTop}px`;
        dropdown.style.left = '0';
        dropdown.style.width = '100%';
    }

    hideDropdown() {
        const dropdown = document.querySelector('.mega-dropdown');
        if (dropdown) {
            dropdown.classList.remove('mega-dropdown--visible');
            setTimeout(() => {
                if (dropdown.parentNode) {
                    dropdown.parentNode.removeChild(dropdown);
                }
            }, 300);
        }
        
        // Remove active class from all nav items
        document.querySelectorAll('.toolbar__nav-item--active').forEach(item => {
            item.classList.remove('toolbar__nav-item--active');
        });
        
        this.currentDropdown = null;
    }

    toggleMobileDropdown(menuKey, parentElement) {
        if (this.currentDropdown && parentElement.classList.contains('toolbar__nav-item--active')) {
            this.hideDropdown();
        } else {
            this.showDropdown(menuKey, parentElement);
        }
    }

    initMobileMenu() {
        const menuToggle = document.querySelector('.toolbar__menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu-area');
        const closeBtn = document.querySelector('.mobile-menu-area .close-btn');
        
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', () => {
                mobileMenu.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
            
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    mobileMenu.style.display = 'none';
                    document.body.style.overflow = 'auto';
                });
            }
            
            mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) {
                    mobileMenu.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait for menu data to be loaded
    if (window.menuData) {
        const megaMenu = new MegaMenu({
            menuData: window.menuData
        });
        window.megaMenuInstance = megaMenu;
    } else {
        // Fallback: try after a short delay
        setTimeout(() => {
            if (window.menuData) {
                const megaMenu = new MegaMenu({
                    menuData: window.menuData
                });
                window.megaMenuInstance = megaMenu;
            }
        }, 500);
    }
});