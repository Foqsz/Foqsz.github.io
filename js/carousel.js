document.body.classList.replace("no-js", "js");
console.log("JS carregou");
function setupTecnologies(config){
    const wrapper = document.querySelector(config.wrapper);

    if(!wrapper) {
        console.log(`Wrapper element not found: ${config.wrapper}`);
        return;
    }

    const items = wrapper.querySelectorAll(config.items);

    if(items.length === 0) {
        console.log(`No items found in wrapper: ${config.items}`);
        return;
    }

    // only enable on large viewports
    if(!window.matchMedia("(min-width: 90em)").matches){
        console.log("Screen width is less than 90em, carousel will not be set up.");
        return;
    }

    wrapper.classList.add("js-enabled");
    wrapper.style.setProperty("--qtd", items.length);

    items.forEach(item => {
        const clone = item.cloneNode(true);
        wrapper.appendChild(clone);
    })

    // compute one item width and expose to CSS as --w (px) so keyframes can use it
    // use rAF to ensure layout is ready
    requestAnimationFrame(() => {
        const first = wrapper.querySelector(config.items);
        if(first){
            const w = Math.round(first.getBoundingClientRect().width);
            wrapper.style.setProperty('--w', `${w}px`);
        }

        // set a reasonable animation duration based on number of items
        const duration = Math.max(12, Math.round(items.length * 2.5));
        wrapper.style.animation = `scrollLoop ${duration}s linear infinite`;
    });

    // pause animation on hover for better accessibility
    wrapper.addEventListener('mouseenter', () => {
        wrapper.style.animationPlayState = 'paused';
    });
    wrapper.addEventListener('mouseleave', () => {
        wrapper.style.animationPlayState = 'running';
    });
}

setupTecnologies({wrapper: ".technologies__carousel__wrapper", items: "img"});