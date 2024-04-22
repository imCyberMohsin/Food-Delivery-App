//! Smooth Scrolling Script using Locmotive
document.addEventListener('DOMContentLoaded', () => {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#smooth-div'),
        smooth: true,
        direction: 'vertical',
    });
});