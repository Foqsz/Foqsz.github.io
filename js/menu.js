const btnMenu = document.getElementById("menuButton");
const menu = document.querySelector(".nav-menu");

if(!btnMenu){
    console.warn('menuButton not found');
}

if(!menu){
    console.warn('nav-menu element not found');
}

if(btnMenu){
    btnMenu.classList.add("hamburguer-button-js-enabled");
    btnMenu.setAttribute('aria-controls', 'main-nav');
    btnMenu.setAttribute('role', 'button');
}

if(menu){
    // ensure accessible attributes
    menu.setAttribute('id', menu.id || 'main-nav');
    menu.setAttribute('aria-hidden', 'true');
    menu.classList.add('menu-closed');

    // prevent clicks inside menu from closing it when open
    menu.addEventListener('click', (e) => e.stopPropagation());
}

function closeMenu(){
    if(!btnMenu || !menu) return;
    btnMenu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
    menu.classList.add("menu-closed");
    document.removeEventListener('click', closeMenu);
}

function openMenu(){
    if(!btnMenu || !menu) return;
    menu.setAttribute("aria-hidden", "false");
    btnMenu.setAttribute("aria-expanded", "true");
    menu.classList.remove("menu-closed");
    // clicking outside should close the menu
    setTimeout(() => document.addEventListener('click', closeMenu), 0);
}

function toggleMenu(event){
    if(!btnMenu || !menu) return;
    event.stopPropagation();
    const expanded = btnMenu.getAttribute('aria-expanded') === 'true';
    if(expanded){
        closeMenu();
    } else {
        openMenu();
    }
}

if(btnMenu){
    btnMenu.addEventListener('click', toggleMenu);
    btnMenu.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu(e);
        }
    });
}

const mediaQuery = window.matchMedia('(min-width: 64em)');

function handleMediaQueryChange(event){
    if(!menu) return;
    if(event.matches){
        // desktop: ensure menu visible
        menu.classList.remove('menu-closed');
        menu.setAttribute('aria-hidden', 'false');
        if(btnMenu) btnMenu.setAttribute('aria-expanded', 'true');
        document.removeEventListener('click', closeMenu);
    } else {
        // mobile: hide by default
        menu.classList.add('menu-closed');
        menu.setAttribute('aria-hidden', 'true');
        if(btnMenu) btnMenu.setAttribute('aria-expanded', 'false');
    }
}

if(mediaQuery.addEventListener){
    mediaQuery.addEventListener('change', handleMediaQueryChange);
} else if(mediaQuery.addListener){
    mediaQuery.addListener(handleMediaQueryChange);
}

handleMediaQueryChange(mediaQuery);