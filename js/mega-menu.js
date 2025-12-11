// Մեգա Մենյուի Ֆունկցիոնալություն
function initMegaMenu(navItems, menuData) {
    // Ստեղծել նավիգացիա
    createNavigation(navItems, menuData);
    
    // Մոբայլ մենյուի հանդիսավորում
    initMobileMenu();
}

function createNavigation(navItems, menuData) {
    const bottomNav = document.querySelector('.toolbar__bottom .toolbar__nav-list');
    
    if (!bottomNav) {
        // Եթե գոյություն չունի bottom nav, ապա ստեղծել նորը
        const navContainer = document.createElement('div');
        navContainer.className = 'mega-menu-container';
        
        const nav = document.createElement('nav');
        nav.className = 'mega-nav';
        
        const container = document.createElement('div');
        container.className = 'toolbar__container';
        
        const navList = document.createElement('ul');
        navList.className = 'mega-nav-list';
        
        // Ավելացնել բոլոր նավիգացիայի տարրերը
        navItems.forEach((item, index) => {
            const navItem = document.createElement('li');
            navItem.className = 'mega-nav-item';
            
            const navLink = document.createElement('a');
            navLink.href = `https://www.globalgilson.com/${item.link}`;
            navLink.className = 'mega-nav-link';
            navLink.textContent = item.name;
            
            // Ավելացնել մեգա-մենյուի ֆունկցիոնալություն
            navLink.addEventListener('mouseenter', () => {
                showMegaMenu(item.data, menuData, navItem);
            });
            
            navItem.appendChild(navLink);
            navList.appendChild(navItem);
        });
        
        container.appendChild(navList);
        nav.appendChild(container);
        navContainer.appendChild(nav);
        
        // Տեղադրել մենյուն header-ից հետո
        const header = document.querySelector('header.toolbar');
        if (header) {
            header.parentNode.insertBefore(navContainer, header.nextSibling);
        }
    } else {
        // Եթե գոյություն ունի toolbar__bottom, ապա ավելացնել ֆունկցիոնալություն
        const navItems = bottomNav.querySelectorAll('.toolbar__nav-item');
        
        navItems.forEach((navItem, index) => {
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
                navItem.addEventListener('mouseenter', () => {
                    showMegaMenu(dataKey, menuData, navItem);
                });
            }
        });
    }
}

function showMegaMenu(menuKey, menuData, parentElement) {
    // Հեռացնել գոյություն ունեցող մեգա-մենյուն
    hideMegaMenu();
    
    const data = menuData[menuKey];
    if (!data) return;
    
    // Ստեղծել մեգա-մենյուն
    const megaMenu = createMegaMenuElement(data);
    
    // Տեղադրել մեգա-մենյուն
    const container = document.getElementById('megaMenuContainer');
    container.innerHTML = '';
    container.appendChild(megaMenu);
    
    // Դիրքավորել մենյուն
    positionMegaMenu(parentElement, megaMenu);
    
    // Ցույց տալ մենյուն
    setTimeout(() => {
        megaMenu.style.display = 'block';
    }, 10);
    
    // Ավելացնել մկնիկի լքման իրադարձություն
    megaMenu.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (!megaMenu.matches(':hover') && !parentElement.matches(':hover')) {
                hideMegaMenu();
            }
        }, 100);
    });
    
    // Ավելացնել իրադարձություն ամբողջ էջի համար
    document.addEventListener('mousemove', function checkMouseLeave(e) {
        if (!megaMenu.contains(e.target) && !parentElement.contains(e.target)) {
            hideMegaMenu();
            document.removeEventListener('mousemove', checkMouseLeave);
        }
    });
}

function createMegaMenuElement(data) {
    const megaMenu = document.createElement('div');
    megaMenu.className = 'mega-dropdown';
    megaMenu.style.display = 'none';
    
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
    let activeTabId = data.tabs.find(t => t.isActive)?.id || data.tabs[0].id;
    const activeContent = data.content[activeTabId];
    
    // Ստեղծել կատեգորիաների ցանց
    const categoriesGrid = document.createElement('div');
    categoriesGrid.className = 'categories-grid';
    
    activeContent.categories.forEach(category => {
        const categoryItem = document.createElement('div');
        categoryItem.className = 'category-item';
        
        const image = document.createElement('img');
        image.src = category.img;
        image.alt = category.name;
        image.className = 'category-image';
        
        const nameLink = document.createElement('a');
        nameLink.href = category.link;
        nameLink.className = 'category-name';
        nameLink.textContent = category.name;
        
        categoryItem.appendChild(image);
        categoryItem.appendChild(nameLink);
        categoriesGrid.appendChild(categoryItem);
    });
    
    // Ստուգել, արդյոք կան ռեսուրսներ
    const hasResources = activeContent.resources && activeContent.resources.length > 0;
    
    // Ավելացնել ռեսուրսների բաժին, եթե կան
    if (hasResources) {
        const resourcesCol = document.createElement('div');
        resourcesCol.className = 'col-md-3 border-start p-3';
        resourcesCol.style.backgroundColor = '#f2f3f4';
        
        const resourcesTitle = document.createElement('h6');
        resourcesTitle.className = 'resources-title';
        resourcesTitle.textContent = 'Resources';
        
        const resourcesList = document.createElement('ul');
        resourcesList.className = 'resource-list';
        
        activeContent.resources.forEach(resource => {
            const resourceItem = document.createElement('li');
            resourceItem.className = 'resource-item';
            
            const resourceLink = document.createElement('a');
            resourceLink.href = resource.link;
            resourceLink.className = 'resource-link';
            
            const resourceImage = document.createElement('img');
            resourceImage.src = resource.img;
            resourceImage.alt = resource.title;
            resourceImage.className = 'resource-image';
            
            const resourceTitle = document.createElement('span');
            resourceTitle.className = 'resource-title';
            resourceTitle.textContent = resource.title;
            
            if (resource.isVideo) {
                const videoIcon = document.createElement('i');
                videoIcon.className = 'fas fa-play-circle';
                videoIcon.style.marginLeft = '5px';
                videoIcon.style.color = '#ff0000';
                resourceTitle.appendChild(videoIcon);
            }
            
            resourceLink.appendChild(resourceImage);
            resourceLink.appendChild(resourceTitle);
            resourceItem.appendChild(resourceLink);
            resourcesList.appendChild(resourceItem);
        });
        
        // Ավելացնել Resource Center կոճակ
        const resourceCenterBtn = document.createElement('a');
        resourceCenterBtn.href = 'https://www.globalgilson.com/customer-resource-center';
        resourceCenterBtn.className = 'resource-center-btn';
        resourceCenterBtn.textContent = 'Resource Center';
        
        // Ավելացնել կատալոգի կոճակ
        const catalogBtn = document.createElement('a');
        catalogBtn.href = 'https://www.globalgilson.com/Content/Images/uploaded/pdf/product-catalogs/pdf-viewer/2021/index.html?reload=1591207903917#page=1';
        catalogBtn.className = 'catalog-btn';
        
        const catalogImage = document.createElement('img');
        catalogImage.src = './src/assets/haeder-component/gilson-catalog-button.webp';
        catalogImage.alt = 'Gilson Catalog';
        
        catalogBtn.appendChild(catalogImage);
        
        // Ավելացնել Request Catalog կոճակ
        const requestCatalogBtn = document.createElement('a');
        requestCatalogBtn.href = 'https://www.globalgilson.com/gilson-catalog';
        requestCatalogBtn.className = 'request-catalog-btn';
        requestCatalogBtn.textContent = 'Request Catalog';
        
        resourcesCol.appendChild(resourcesTitle);
        resourcesCol.appendChild(resourcesList);
        resourcesCol.appendChild(resourceCenterBtn);
        resourcesCol.appendChild(catalogBtn);
        resourcesCol.appendChild(requestCatalogBtn);
        
        // Ստեղծել երկու սյունակներով դասավորություն
        const categoriesCol = document.createElement('div');
        categoriesCol.className = 'col-md-9';
        categoriesCol.appendChild(categoriesGrid);
        
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
    const categoriesGrid = document.createElement('div');
    categoriesGrid.className = 'categories-grid';
    
    tabData.categories.forEach(category => {
        const categoryItem = document.createElement('div');
        categoryItem.className = 'category-item';
        
        const image = document.createElement('img');
        image.src = category.img;
        image.alt = category.name;
        image.className = 'category-image';
        
        const nameLink = document.createElement('a');
        nameLink.href = category.link;
        nameLink.className = 'category-name';
        nameLink.textContent = category.name;
        
        categoryItem.appendChild(image);
        categoryItem.appendChild(nameLink);
        categoriesGrid.appendChild(categoryItem);
    });
    
    // Ստուգել, արդյոք կան ռեսուրսներ
    const hasResources = tabData.resources && tabData.resources.length > 0;
    
    // Ավելացնել ռեսուրսների բաժին, եթե կան
    if (hasResources) {
        const resourcesCol = document.createElement('div');
        resourcesCol.className = 'resources-section';
        
        const resourcesTitle = document.createElement('h6');
        resourcesTitle.className = 'resources-title';
        resourcesTitle.textContent = 'Resources';
        
        const resourcesList = document.createElement('ul');
        resourcesList.className = 'resource-list';
        
        tabData.resources.forEach(resource => {
            const resourceItem = document.createElement('li');
            resourceItem.className = 'resource-item';
            
            const resourceLink = document.createElement('a');
            resourceLink.href = resource.link;
            resourceLink.className = 'resource-link';
            
            const resourceImage = document.createElement('img');
            resourceImage.src = resource.img;
            resourceImage.alt = resource.title;
            resourceImage.className = 'resource-image';
            
            const resourceTitle = document.createElement('span');
            resourceTitle.className = 'resource-title';
            resourceTitle.textContent = resource.title;
            
            if (resource.isVideo) {
                const videoIcon = document.createElement('i');
                videoIcon.className = 'fas fa-play-circle';
                videoIcon.style.marginLeft = '5px';
                videoIcon.style.color = '#ff0000';
                resourceTitle.appendChild(videoIcon);
            }
            
            resourceLink.appendChild(resourceImage);
            resourceLink.appendChild(resourceTitle);
            resourceItem.appendChild(resourceLink);
            resourcesList.appendChild(resourceItem);
        });
        
        // Ավելացնել Resource Center կոճակ
        const resourceCenterBtn = document.createElement('a');
        resourceCenterBtn.href = 'https://www.globalgilson.com/customer-resource-center';
        resourceCenterBtn.className = 'resource-center-btn';
        resourceCenterBtn.textContent = 'Resource Center';
        
        // Ավելացնել կատալոգի կոճակ
        const catalogBtn = document.createElement('a');
        catalogBtn.href = 'https://www.globalgilson.com/Content/Images/uploaded/pdf/product-catalogs/pdf-viewer/2021/index.html?reload=1591207903917#page=1';
        catalogBtn.className = 'catalog-btn';
        
        const catalogImage = document.createElement('img');
        catalogImage.src = './src/assets/haeder-component/gilson-catalog-button.webp';
        catalogImage.alt = 'Gilson Catalog';
        
        catalogBtn.appendChild(catalogImage);
        
        // Ավելացնել Request Catalog կոճակ
        const requestCatalogBtn = document.createElement('a');
        requestCatalogBtn.href = 'https://www.globalgilson.com/gilson-catalog';
        requestCatalogBtn.className = 'request-catalog-btn';
        requestCatalogBtn.textContent = 'Request Catalog';
        
        resourcesCol.appendChild(resourcesTitle);
        resourcesCol.appendChild(resourcesList);
        resourcesCol.appendChild(resourceCenterBtn);
        resourcesCol.appendChild(catalogBtn);
        resourcesCol.appendChild(requestCatalogBtn);
        
        // Ստեղծել երկու սյունակներով դասավորություն
        const categoriesCol = document.createElement('div');
        categoriesCol.className = 'col-md-9';
        categoriesCol.appendChild(categoriesGrid);
        
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
    
    // Կենտրոնացնել մենյուն
    megaMenu.style.left = '50%';
    megaMenu.style.transform = 'translateX(-50%)';
    megaMenu.style.top = (rect.bottom + scrollTop) + 'px';
}

function hideMegaMenu() {
    const container = document.getElementById('megaMenuContainer');
    container.innerHTML = '';
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