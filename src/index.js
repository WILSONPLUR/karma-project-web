import "./css/main.scss";

// Initialize mobile menu
const mobileMenu = document.querySelector("[data-mobile-menu]");
const nav = document.querySelector("[data-nav]");

function toggleMobileMenu() {
  nav.classList.toggle("menu-open");
}

mobileMenu.addEventListener("click", toggleMobileMenu);

// Initialize Swiper slider for products section
function initProductsSwiper() {
  if (typeof Swiper !== 'undefined') {
    const swiper = new Swiper('.swiper-container', {
      spaceBetween: 10,
      slidesPerView: 2,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next-custom',
        prevEl: '.swiper-button-prev-custom',
      },
    });
  }
}

// Initialize Swiper slider for trusted by section
function initTrustedSwiper() {
  if (typeof Swiper !== 'undefined') {
    const swiper = new Swiper('.swiper-container-trusted', {
      modules: [Swiper.Pagination],
      spaceBetween: 30,
      slidesPerView: 4,
      loop: true,
      pagination: {
        el: '.swiper-pagination-trusted',
        clickable: true,
        bulletClass: 'swiper-pagination-bullet-custom',
        bulletActiveClass: 'swiper-pagination-bullet-active-custom',
      },
    });
  }
}

// Initialize all Swipers
function initSwipers() {
  initProductsSwiper();
  initTrustedSwiper();
}

// Initialize Swipers when DOM is loaded
document.addEventListener('DOMContentLoaded', initSwipers);

// Also initialize Swipers after page load to ensure all resources are loaded
window.addEventListener('load', initSwipers);

// Say hello
// eslint-disable-next-line no-console
console.log("🦊 Hello! Edit me in src/index.js");
