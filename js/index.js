const items = document.querySelectorAll(".card__check, .expand");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.open = true;
            //entry.target.open = !entry.target.open;
        }
    })
}, {
    rootMargin: "-50%"
});

items.forEach(i => {
    observer.observe(i);
})