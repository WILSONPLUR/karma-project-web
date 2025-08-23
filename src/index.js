import "./css/main.scss";

// Initialize mobile menu
const mobileMenu = document.querySelector("[data-mobile-menu]");
const nav = document.querySelector("[data-nav]");

function toggleMobileMenu() {
  nav.classList.toggle("menu-open");
}

if (mobileMenu) {
  mobileMenu.addEventListener("click", toggleMobileMenu);
}

// Custom Slider Implementation
class CustomSlider {
  constructor(container, options = {}) {
    this.container = document.querySelector(container);
    if (!this.container) return;
    
    this.wrapper = this.container.querySelector('.swiper-wrapper');
    this.slides = this.container.querySelectorAll('.swiper-slide');
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.isTransitioning = false;
    
    this.options = {
      autoplay: options.autoplay || false,
      delay: options.delay || 3000,
      loop: options.loop || true,
      slidesPerView: options.slidesPerView || 1,
      ...options
    };
    
    this.init();
  }
  
  init() {
    if (this.slides.length === 0) return;
    
    this.setupSlider();
    this.setupNavigation();
    this.setupPagination();
    this.showSlide(0, false);
    
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }
  
  setupSlider() {
    // Set container styles
    this.container.style.position = 'relative';
    this.container.style.overflow = 'hidden';
    this.container.style.width = '100%';
    
    // Calculate slide width based on slidesPerView
    const slideWidth = 100 / this.options.slidesPerView;
    const totalWidth = (this.slides.length / this.options.slidesPerView) * 100;
    
    // Set wrapper styles
    this.wrapper.style.display = 'flex';
    this.wrapper.style.width = `${totalWidth}%`;
    this.wrapper.style.height = 'auto';
    this.wrapper.style.transition = 'none';
    
    // Set slide styles
    this.slides.forEach((slide, index) => {
      slide.style.flex = '0 0 auto';
      slide.style.width = `${slideWidth}%`;
      slide.style.display = 'flex';
      slide.style.alignItems = 'center';
      slide.style.justifyContent = 'center';
    });
  }
  
  setupNavigation() {
    const nextBtn = this.container.parentElement.querySelector('.swiper-button-next-custom');
    const prevBtn = this.container.parentElement.querySelector('.swiper-button-prev-custom');
    
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.nextSlide();
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.prevSlide();
      });
    }
  }
  
  setupPagination() {
    const pagination = this.container.querySelector('.swiper-pagination-trusted');
    if (!pagination) return;
    
    pagination.innerHTML = '';
    
    this.slides.forEach((_, index) => {
      const bullet = document.createElement('span');
      bullet.className = 'swiper-pagination-bullet-custom';
      bullet.addEventListener('click', (e) => {
        e.preventDefault();
        this.goToSlide(index);
      });
      pagination.appendChild(bullet);
    });
    
    this.bullets = pagination.querySelectorAll('.swiper-pagination-bullet-custom');
  }
  
  showSlide(index, animate = true) {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.currentIndex = index;
    
    // Calculate position based on slidesPerView
    const slideWidth = 100 / this.options.slidesPerView;
    const translateX = -index * slideWidth;
    
    // Apply transition
    if (animate) {
      this.wrapper.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    } else {
      this.wrapper.style.transition = 'none';
    }
    
    this.wrapper.style.transform = `translateX(${translateX}%)`;
    
    // Update pagination
    if (this.bullets) {
      this.bullets.forEach((bullet, i) => {
        bullet.classList.toggle('swiper-pagination-bullet-active-custom', i === index);
      });
    }
    
    // Reset transition flag
    setTimeout(() => {
      this.isTransitioning = false;
    }, animate ? 500 : 0);
  }
  
  nextSlide() {
    if (this.isTransitioning) return;
    
    const maxIndex = this.slides.length - this.options.slidesPerView;
    const nextIndex = this.options.loop 
      ? (this.currentIndex + 1) % (maxIndex + 1)
      : Math.min(this.currentIndex + 1, maxIndex);
    this.showSlide(nextIndex);
  }
  
  prevSlide() {
    if (this.isTransitioning) return;
    
    const maxIndex = this.slides.length - this.options.slidesPerView;
    const prevIndex = this.options.loop
      ? (this.currentIndex - 1 + (maxIndex + 1)) % (maxIndex + 1)
      : Math.max(this.currentIndex - 1, 0);
    this.showSlide(prevIndex);
  }
  
  goToSlide(index) {
    if (this.isTransitioning || index === this.currentIndex) return;
    this.showSlide(index);
  }
  
  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => {
      if (!this.isTransitioning) {
        this.nextSlide();
      }
    }, this.options.delay);
  }
  
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
}

// Initialize sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize trusted companies slider - show 4 slides on desktop
  new CustomSlider('.swiper-container-trusted', {
    autoplay: false,
    loop: true,
    slidesPerView: 4
  });
  
  // Initialize products slider - show 2 slides with navigation arrows
  new CustomSlider('.swiper-container-products', {
    autoplay: false,
    loop: true,
    slidesPerView: 2
  });
});

// Say hello
console.log("🦊 Custom sliders initialized!");
