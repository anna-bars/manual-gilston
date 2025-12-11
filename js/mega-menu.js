// Մեգա Մենյուի Ֆունկցիոնալություն
function initMegaMenu(navItems, menuData) {
    // Ստեղծել նավիգացիա
    createNavigation(navItems, menuData);
    
    // Մոբայլ մենյուի հանդիսավորում
    initMobileMenu();
    
    // Ստեղծել մեգա մենյուի կոնտեյները
    createMegaMenuContainers();
}

function createNavigation(navItems, menuData) {
    const bottomNav = document.querySelector('.toolbar__bottom .toolbar__nav-list');
    
    if (bottomNav) {
        const navItemsElements = bottomNav.querySelectorAll('.toolbar__nav-item');
        
        navItemsElements.forEach((navItem, index) => {
            const navLink = navItem.querySelector('.toolbar__nav-link');
            const linkText = navLink.textContent.trim().toLowerCase();
            
            // Գտնել համապատասխան տվյալները
            let dataKey = '';
            switch(linkText) {
                case 'sieving': dataKey = 'sieving'; break;
                case 'screening': dataKey = 'screening'; break;
                case 'sample splitting': dataKey = 'sampleSplitting'; break;
                case 'aggregates': dataKey = 'aggregates'; break;
                case 'asphalt': dataKey = 'asphalt'; break;
                case 'concrete': dataKey = 'concrete'; break;
                case 'soils': dataKey = 'soils'; break;
                case 'general lab': dataKey = 'generalLab'; break;
            }
            
            if (dataKey && menuData[dataKey]) {
                navItem.addEventListener('mouseenter', (e) => {
                    showMegaMenu(dataKey, menuData, navItem);
                });
                
                navItem.addEventListener('mouseleave', (e) => {
                    const relatedTarget = e.relatedTarget;
                    const megaMenu = document.querySelector('.mega-menu-container');
                    
                    if (!navItem.contains(relatedTarget) && 
                        (!megaMenu || !megaMenu.contains(relatedTarget))) {
                        hideMegaMenu();
                    }
                });
            }
        });
    }
}

function createMegaMenuContainers() {
    // Եթե արդեն գոյություն ունի, ապա չստեղծել կրկին
    if (!document.getElementById('megaMenuContainer')) {
        const megaContainer = document.createElement('div');
        megaContainer.id = 'megaMenuContainer';
        megaContainer.className = 'mega-menu-container';
        
        // Տեղադրել header-ից հետո
        const header = document.querySelector('header.toolbar');
        if (header) {
            header.parentNode.insertBefore(megaContainer, header.nextSibling);
        }
    }
}

function showMegaMenu(menuKey, menuData, parentElement) {
    // Հեռացնել գոյություն ունեցող մեգա-մենյուն
    hideMegaMenu();
    
    const data = menuData[menuKey];
    if (!data) return;
    
    // Ստեղծել մեգա-մենյուն
    const megaMenu = createMegaMenuElement(data, menuKey);
    
    // Տեղադրել մեգա-մենյուն
    const container = document.getElementById('megaMenuContainer');
    container.innerHTML = '';
    container.appendChild(megaMenu);
    
    // Դիրքավորել մենյուն
    positionMegaMenu(parentElement, megaMenu);
    
    // Ցույց տալ մենյուն
    container.style.display = 'block';
    
    // Ավելացնել իրադարձություններ
    setupMegaMenuEvents(megaMenu, parentElement);
}

function createMegaMenuElement(data, menuKey) {
    const megaMenu = document.createElement('div');
    megaMenu.className = 'mega-dropdown';
    
    // Ստեղծել թաբեր, եթե կան մեկից ավելի թաբեր
    const hasMultipleTabs = data.tabs && data.tabs.length > 1;
    
    if (hasMultipleTabs) {
        const tabsContainer = document.createElement('ul');
        tabsContainer.className = 'mega-tabs';
        
        data.tabs.forEach((tab, index) => {
            const tabItem = document.createElement('li');
            tabItem.className = 'mega-tab';
            
            const tabButton = document.createElement('button');
            tabButton.className = `mega-tab-btn ${tab.isActive ? 'active' : ''}`;
            tabButton.textContent = tab.label;
            tabButton.dataset.tabId = tab.id;
            
            tabButton.addEventListener('click', (e) => {
                e.preventDefault();
                switchTab(tab.id, megaMenu, data);
            });
            
            tabButton.addEventListener('mouseenter', () => {
                switchTab(tab.id, megaMenu, data);
            });
            
            tabItem.appendChild(tabButton);
            tabsContainer.appendChild(tabItem);
        });
        
        megaMenu.appendChild(tabsContainer);
    }
    
    // Ստեղծել բովանդակություն
    const contentContainer = document.createElement('div');
    contentContainer.className = 'tab-content';
    
    const row = document.createElement('div');
    row.className = 'row';
    
    // Գտնել ակտիվ թաբը
    let activeTabId = data.tabs?.find(t => t.isActive)?.id || data.tabs?.[0]?.id || 'default';
    const activeContent = data.content[activeTabId] || data.content;
    
    // Ստեղծել կատեգորիաների ցանց
    const categoriesGrid = createCategoriesGrid(activeContent.categories);
    
    // Ստուգել, արդյոք կան ռեսուրսներ
    const hasResources = activeContent.resources && activeContent.resources.length > 0;
    
    if (hasResources) {
        // Ստեղծել երկու սյունակներով դասավորություն
        const categoriesCol = document.createElement('div');
        categoriesCol.className = 'col-md-9';
        categoriesCol.appendChild(categoriesGrid);
        
        const resourcesCol = document.createElement('div');
        resourcesCol.className = 'col-md-3 resources-section';
        resourcesCol.appendChild(createResourcesSection(activeContent.resources));
        
        row.appendChild(categoriesCol);
        row.appendChild(resourcesCol);
    } else {
        // Եթե ռեսուրսներ չկան, ապա միայն կատեգորիաները
        row.className = 'col-12';
        row.appendChild(categoriesGrid);
    }
    
    contentContainer.appendChild(row);
    megaMenu.appendChild(contentContainer);
    
    return megaMenu;
}

function createCategoriesGrid(categories) {
    const grid = document.createElement('div');
    grid.className = 'categories-grid';
    
    categories.forEach(category => {
        const categoryItem = document.createElement('div');
        categoryItem.className = 'category-item';
        
        // Կատեգորիայի պատկերը
        const imageDiv = document.createElement('div');
        imageDiv.className = 'category-image';
        
        const image = document.createElement('img');
        image.src = category.img;
        image.alt = category.name;
        image.loading = 'lazy';
        
        imageDiv.appendChild(image);
        
        // Կատեգորիայի անունը
        const nameDiv = document.createElement('div');
        nameDiv.className = 'category-name';
        
        const nameLink = document.createElement('a');
        nameLink.href = category.link;
        nameLink.textContent = category.name;
        
        nameDiv.appendChild(nameLink);
        
        // Լրիվ հղումը (որ ծածկում է ամբողջ տարրը)
        const fullLink = document.createElement('a');
        fullLink.href = category.link;
        fullLink.setAttribute('aria-label', category.name);
        
        // Ավելացնել բոլոր տարրերը
        categoryItem.appendChild(fullLink);
        categoryItem.appendChild(imageDiv);
        categoryItem.appendChild(nameDiv);
        
        grid.appendChild(categoryItem);
    });
    
    return grid;
}

function createResourcesSection(resources) {
    const resourcesSection = document.createElement('div');
    
    // Վերնագիր
    const title = document.createElement('h3');
    title.className = 'resources-title';
    title.textContent = 'Resources';
    
    // Ռեսուրսների ցանկ
    const resourceList = document.createElement('ul');
    resourceList.className = 'resource-list';
    
    resources.forEach(resource => {
        const resourceItem = document.createElement('li');
        resourceItem.className = 'resource-item';
        
        const resourceLink = document.createElement('a');
        resourceLink.href = resource.link;
        resourceLink.className = 'resource-link';
        
        const imageDiv = document.createElement('div');
        imageDiv.className = 'resource-image';
        
        const image = document.createElement('img');
        image.src = resource.img;
        image.alt = resource.title;
        image.loading = 'lazy';
        
        imageDiv.appendChild(image);
        
        const titleSpan = document.createElement('span');
        titleSpan.className = 'resource-title';
        titleSpan.textContent = resource.title;
        
        resourceLink.appendChild(imageDiv);
        resourceLink.appendChild(titleSpan);
        resourceItem.appendChild(resourceLink);
        resourceList.appendChild(resourceItem);
    });
    
    // Resource Center կոճակ
    const resourceCenterBtn = document.createElement('a');
    resourceCenterBtn.href = 'https://www.globalgilson.com/customer-resource-center';
    resourceCenterBtn.className = 'resource-center-btn';
    resourceCenterBtn.textContent = 'Resource Center';
    
    // Online Catalog կոճակ
    const onlineBtn = document.createElement('div');
    onlineBtn.className = 'online-btn';
    
    const catalogLink = document.createElement('a');
    catalogLink.href = 'https://www.globalgilson.com/Content/Images/uploaded/pdf/product-catalogs/pdf-viewer/2021/index.html?reload=1591207903917#page=1';
    
    const catalogImage = document.createElement('img');
    catalogImage.src = './src/assets/haeder-component/gilson-catalog-button.webp';
    catalogImage.alt = 'Gilson Catalog';
    catalogImage.loading = 'lazy';
    
    catalogLink.appendChild(catalogImage);
    onlineBtn.appendChild(catalogLink);
    
    // Request Catalog կոճակ
    const requestCatalogBtn = document.createElement('a');
    requestCatalogBtn.href = 'https://www.globalgilson.com/gilson-catalog';
    requestCatalogBtn.className = 'request-catalog-btn catalog-btn';
    requestCatalogBtn.textContent = 'Request Catalog';
    
    // Ավելացնել բոլոր տարրերը
    resourcesSection.appendChild(title);
    resourcesSection.appendChild(resourceList);
    resourcesSection.appendChild(resourceCenterBtn);
    resourcesSection.appendChild(onlineBtn);
    resourcesSection.appendChild(requestCatalogBtn);
    
    return resourcesSection;
}

function switchTab(tabId, megaMenu, data) {
    // Թարմացնել ակտիվ թաբը
    const tabButtons = megaMenu.querySelectorAll('.mega-tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tabId === tabId) {
            btn.classList.add('active');
        }
    });
    
    // Թարմացնել բովանդակությունը
    const contentContainer = megaMenu.querySelector('.tab-content');
    const newContent = createTabContent(data.content[tabId], data.tabs.length > 1);
    
    contentContainer.innerHTML = '';
    contentContainer.appendChild(newContent);
}

function createTabContent(tabData, hasMultipleTabs) {
    const contentWrapper = document.createElement('div');
    
    if (hasMultipleTabs) {
        contentWrapper.className = 'row';
    } else {
        contentWrapper.className = 'col-12';
    }
    
    // Ստեղծել կատեգորիաների ցանց
    const categoriesGrid = createCategoriesGrid(tabData.categories);
    
    // Ստուգել, արդյոք կան ռեսուրսներ
    const hasResources = tabData.resources && tabData.resources.length > 0;
    
    if (hasResources) {
        // Ստեղծել երկու սյունակներով դասավորություն
        const categoriesCol = document.createElement('div');
        categoriesCol.className = 'col-md-9';
        categoriesCol.appendChild(categoriesGrid);
        
        const resourcesCol = document.createElement('div');
        resourcesCol.className = 'col-md-3 resources-section';
        resourcesCol.appendChild(createResourcesSection(tabData.resources));
        
        contentWrapper.appendChild(categoriesCol);
        contentWrapper.appendChild(resourcesCol);
    } else {
        // Եթե ռեսուրսներ չկան, ապա միայն կատեգորիաները
        contentWrapper.appendChild(categoriesGrid);
    }
    
    return contentWrapper;
}

function positionMegaMenu(parentElement, megaMenu) {
    const rect = parentElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    const megaContainer = document.getElementById('megaMenuContainer');
    megaContainer.style.top = (rect.bottom + scrollTop) + 'px';
    megaContainer.style.left = '0';
    megaContainer.style.width = '100%';
}

function setupMegaMenuEvents(megaMenu, parentElement) {
    const megaContainer = document.getElementById('megaMenuContainer');
    
    // Ավելացնել մկնիկի լքման իրադարձություն
    megaContainer.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (!megaContainer.matches(':hover') && !parentElement.matches(':hover')) {
                hideMegaMenu();
            }
        }, 100);
    });
    
    // Ավելացնել իրադարձություն ամբողջ էջի համար
    document.addEventListener('mousemove', function checkMouseLeave(e) {
        if (!megaContainer.contains(e.target) && !parentElement.contains(e.target)) {
            hideMegaMenu();
            document.removeEventListener('mousemove', checkMouseLeave);
        }
    });
}

function hideMegaMenu() {
    const container = document.getElementById('megaMenuContainer');
    if (container) {
        container.style.display = 'none';
        container.innerHTML = '';
    }
}

function initMobileMenu() {
    // Մոբայլ մենյուի կոճակ
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
        
        // Փակել մենյուն, երբ սեղմում ենք դրսում
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Արտահանել ֆունկցիաները
window.initMegaMenu = initMegaMenu;
window.showMegaMenu = showMegaMenu;
window.hideMegaMenu = hideMegaMenu;

// Ինիցիալիզացիա, երբ DOM-ը պատրաստ է
document.addEventListener('DOMContentLoaded', function() {
    // Ստեղծել նավիգացիայի տարրերը
    const navItems = [
        { name: 'Sieving', link: 'sieve-analysis-equipment', data: 'sieving' },
        { name: 'Screening', link: 'screening', data: 'screening' },
        { name: 'Sample Splitting', link: 'sampling-dividing', data: 'sampleSplitting' },
        { name: 'Aggregates', link: 'aggregate-testing-equipment', data: 'aggregates' },
        { name: 'Asphalt', link: 'asphalt-testing-equipment', data: 'asphalt' },
        { name: 'Concrete', link: 'concrete-testing-equipment', data: 'concrete' },
        { name: 'Soils', link: 'soil-testing-equipment', data: 'soils' },
        { name: 'General Lab', link: 'pans-tools-glassware', data: 'generalLab' }
    ];
    
    // Բեռնել տվյալները menu-data.js-ից
    if (window.menuData) {
        initMegaMenu(navItems, window.menuData);
    } else {
        console.warn('Menu data not loaded yet. Make sure menu-data.js is loaded before mega-menu.js');
    }
});