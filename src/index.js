import "./css/main.scss";

// Defer non-critical JavaScript execution
function deferExecution(callback, priority = "low") {
  if (priority === "high") {
    // High priority - execute immediately but non-blocking
    requestAnimationFrame(callback);
  } else {
    // Low priority - execute when browser is idle
    if ("requestIdleCallback" in window) {
      requestIdleCallback(callback, {timeout: 1000});
    } else {
      // Fallback for older browsers
      setTimeout(callback, 100);
    }
  }
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize mobile menu with defer
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

    this.wrapper = this.container.querySelector(".swiper-wrapper");
    this.slides = this.container.querySelectorAll(".swiper-slide");
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.isTransitioning = false;

    this.options = {
      autoplay: options.autoplay || false,
      delay: options.delay || 3000,
      loop: options.loop || true,
      slidesPerView: options.slidesPerView || 1,
      slidesPerGroup: options.slidesPerGroup || 1,
      spaceBetween: options.spaceBetween || 0,
      responsive: options.responsive || {},
      paginationCount: options.paginationCount || null,
      fixedSlideWidth: options.fixedSlideWidth || null,
      fixedWrapperWidth: options.fixedWrapperWidth || null,
      ...options,
    };

    // Defer initialization to reduce blocking
    deferExecution(() => this.init(), "high");
    this.setupResponsive();
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
    this.container.style.position = "relative";
    this.container.style.overflow = "hidden";

    // Set wrapper styles
    this.wrapper.style.display = "flex";
    this.wrapper.style.width = "fit-content";
    this.wrapper.style.height = "auto";
    this.wrapper.style.transition = "none";
    this.wrapper.style.flexWrap = "nowrap";

    this.updateSlideStyles();
  }

  updateSlideStyles() {
    // Defer style updates to reduce blocking
    deferExecution(() => {
      const currentSlidesPerView = this.getCurrentSlidesPerView();
      const currentSpaceBetween = this.getCurrentSpaceBetween();
      const containerWidth = this.container.offsetWidth;

      let slideWidth;

      if (this.options.fixedSlideWidth) {
        slideWidth = this.options.fixedSlideWidth;
      } else {
        // Розрахунок адаптивної ширини
        const totalSpacing = currentSpaceBetween * (currentSlidesPerView - 1);
        const availableWidth = containerWidth - totalSpacing;
        slideWidth = Math.floor(availableWidth / currentSlidesPerView);

        // Збільшені мінімальні розміри щоб поміщалось рівно 2 картки
        const minSlideWidth = currentSlidesPerView === 1 ? 280 : 380;
        slideWidth = Math.max(slideWidth, minSlideWidth);

        // Максимальні розміри
        const maxSlideWidth = currentSlidesPerView === 1 ? 400 : 500;
        slideWidth = Math.min(slideWidth, maxSlideWidth);
      }

      // Apply styles efficiently
      this.slides.forEach((slide, index) => {
        slide.style.width = `${slideWidth}px`;
        slide.style.flexShrink = "0";
        if (index < this.slides.length - 1) {
          slide.style.marginRight = `${currentSpaceBetween}px`;
        }
      });

      if (this.options.fixedWrapperWidth) {
        this.wrapper.style.width = `${this.options.fixedWrapperWidth}px`;
      } else {
        const totalWidth = slideWidth * this.slides.length +
                          currentSpaceBetween * (this.slides.length - 1);
        this.wrapper.style.width = `${totalWidth}px`;
      }
    }, "low");
  }
  setupNavigation() {
    const nextBtn =
      this.container.querySelector(".swiper-button-next-custom") ||
      this.container.parentElement.querySelector(".swiper-button-next-custom");
    const prevBtn =
      this.container.querySelector(".swiper-button-prev-custom") ||
      this.container.parentElement.querySelector(".swiper-button-prev-custom");

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.nextSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.prevSlide();
      });
    }
  }

  setupPagination() {
    const pagination = this.container.querySelector(
      ".swiper-pagination-trusted"
    );
    if (!pagination) return;

    pagination.innerHTML = "";

    const bulletCount = this.options.paginationCount || this.slides.length;
    for (let i = 0; i < bulletCount; i += 1) {
      const bullet = document.createElement("span");
      bullet.className = "swiper-pagination-bullet-custom";
      bullet.addEventListener("click", (e) => {
        e.preventDefault();
        const targetIndex = this.slides.length > 0 ? i % this.slides.length : 0;
        this.goToSlide(targetIndex);
      });
      pagination.appendChild(bullet);
    }

    this.bullets = pagination.querySelectorAll(
      ".swiper-pagination-bullet-custom"
    );
  }

  showSlide(index, animate = true) {
    if (index < 0 || index >= this.slides.length) return;

    this.isTransitioning = true;
    this.currentIndex = index;

    // Calculate position based on slide width
    const currentSlidesPerView = this.getCurrentSlidesPerView();
    const currentSpaceBetween = this.getCurrentSpaceBetween();
    const containerWidth = this.container.offsetWidth;
    const computedWidth =
      (containerWidth - currentSpaceBetween * (currentSlidesPerView - 1)) /
      currentSlidesPerView;
    const slideWidth = this.options.fixedSlideWidth
      ? this.options.fixedSlideWidth
      : computedWidth;
    const translateX = -(index * (slideWidth + currentSpaceBetween));

    // Apply transition
    if (animate) {
      this.wrapper.style.transition =
        "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    } else {
      this.wrapper.style.transition = "none";
    }

    this.wrapper.style.transform = `translateX(${translateX}px)`;

    // Update pagination
    if (this.bullets) {
      const bulletIndex = this.options.paginationCount
        ? index % this.options.paginationCount
        : index;
      this.bullets.forEach((bullet, i) => {
        bullet.classList.toggle(
          "swiper-pagination-bullet-active-custom",
          i === bulletIndex
        );
      });
    }

    // Reset transition flag
    setTimeout(
      () => {
        this.isTransitioning = false;
      },
      animate ? 500 : 0
    );
  }

  nextSlide() {
    if (this.isTransitioning) return;

    const step = this.options.slidesPerGroup || 1;
    const maxStartIndex = Math.max(
      0,
      this.slides.length - this.getCurrentSlidesPerView()
    );
    const groups = Math.ceil((maxStartIndex + 1) / step) || 1; // number of start positions in groups
    const currentGroup = Math.floor(this.currentIndex / step);
    const nextGroup = (currentGroup + 1) % groups;
    const targetIndex = Math.min(nextGroup * step, maxStartIndex);
    this.showSlide(targetIndex);
  }

  prevSlide() {
    if (this.isTransitioning) return;

    const step = this.options.slidesPerGroup || 1;
    const maxStartIndex = Math.max(
      0,
      this.slides.length - this.getCurrentSlidesPerView()
    );
    const groups = Math.ceil((maxStartIndex + 1) / step) || 1;
    const currentGroup = Math.floor(this.currentIndex / step);
    const prevGroup = (currentGroup - 1 + groups) % groups;
    const targetIndex = Math.min(prevGroup * step, maxStartIndex);
    this.showSlide(targetIndex);
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

  setupResponsive() {
    const debouncedResize = debounce(() => {
      this.updateSlideStyles();
    }, 150);

    window.addEventListener("resize", debouncedResize);
    this.resizeHandler = debouncedResize;
  }

  getCurrentSlidesPerView() {
    const width = window.innerWidth;
    const breakpoints = Object.keys(this.options.responsive)
      .map(Number)
      .sort((a, b) => b - a);

    for (const breakpoint of breakpoints) {
      if (width >= breakpoint) {
        return this.options.responsive[breakpoint].slidesPerView || this.options.slidesPerView;
      }
    }
    return this.options.slidesPerView;
  }

  getCurrentSpaceBetween() {
    const width = window.innerWidth;
    const breakpoints = Object.keys(this.options.responsive)
      .map(Number)
      .sort((a, b) => b - a);

    for (const breakpoint of breakpoints) {
      if (width >= breakpoint) {
        return this.options.responsive[breakpoint].spaceBetween || this.options.spaceBetween;
      }
    }
    return this.options.spaceBetween;
  }
}

// Initialize sliders with deferred execution
function initializeSliders() {
  // Defer slider initialization to reduce blocking
  deferExecution(() => {
    // Trusted By Desktop Slider
    new CustomSlider(".swiper-container-trusted-desktop", {
      autoplay: false,
      loop: true,
      slidesPerView: 4,
      spaceBetween: 0,
      paginationCount: 4,
      fixedSlideWidth: null,
      responsive: {
        768: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
        1440: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
      },
    });

    // Products Slider
    new CustomSlider(".swiper-container-products", {
      autoplay: false,
      loop: true,
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 51,
      fixedSlideWidth: 400,
      responsive: {
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 51,
          fixedSlideWidth: 400,
        },
        1023: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 51,
          fixedSlideWidth: 400,
        },
        1200: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 51,
          fixedSlideWidth: 400,
        },
        1440: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 51,
          fixedSlideWidth: 400,
        },
      },
    });
  }, "low");
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSliders);
} else {
  initializeSliders();
}

// Initialize simple mobile slider
const mobileSlider = document.getElementById("mobile-slider");
const mobileWrapper = document.getElementById("mobile-slider-wrapper");
const mobilePrev = document.querySelector(".mobile-prev");
const mobileNext = document.querySelector(".mobile-next");

if (mobileSlider && mobileWrapper) {
  let currentSlide = 0;
  const totalSlides = mobileWrapper.children.length;

  function updateSlider() {
    const translateX = -currentSlide * 100;
    mobileWrapper.style.transform = `translateX(${translateX}%)`;
  }

  if (mobilePrev) {
    mobilePrev.addEventListener("click", () => {
      currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
      updateSlider();
    });
  }

  if (mobileNext) {
    mobileNext.addEventListener("click", () => {
      currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
      updateSlider();
    });
  }
}

// Initialize trusted companies mobile slider (separate custom controls if needed)
const trustedMobileSlider = document.getElementById("trusted-mobile-slider");
const trustedMobileWrapper = document.getElementById(
  "trusted-mobile-wrapper"
);
const trustedMobilePrev = document.querySelector(".trusted-mobile-prev");
const trustedMobileNext = document.querySelector(".trusted-mobile-next");
const trustedPaginationDots = document.querySelectorAll(
  ".trusted-pagination-dot"
);

if (trustedMobileSlider && trustedMobileWrapper) {
  let currentTrustedSlide = 0;
  const totalTrustedSlides = trustedMobileWrapper.children.length;

  function updateTrustedSlider() {
    const translateX = -currentTrustedSlide * 100;
    trustedMobileWrapper.style.transform = `translateX(${translateX}%)`;

    // Update pagination dots
    trustedPaginationDots.forEach((dot, index) => {
      if (index === currentTrustedSlide) {
        dot.classList.remove("bg-gray-400");
        dot.classList.add("bg-[#ba0108]");
      } else {
        dot.classList.remove("bg-[#ba0108]");
        dot.classList.add("bg-gray-400");
      }
    });
  }

  if (trustedMobilePrev) {
    trustedMobilePrev.addEventListener("click", () => {
      currentTrustedSlide =
        currentTrustedSlide > 0
          ? currentTrustedSlide - 1
          : totalTrustedSlides - 1;
      updateTrustedSlider();
    });
  }

  if (trustedMobileNext) {
    trustedMobileNext.addEventListener("click", () => {
      currentTrustedSlide =
        currentTrustedSlide < totalTrustedSlides - 1
          ? currentTrustedSlide + 1
          : 0;
      updateTrustedSlider();
    });
  }

  // Add click handlers for pagination dots
  trustedPaginationDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentTrustedSlide = index;
      updateTrustedSlider();
    });
  });
}

// Say hello
console.log("🦊 Custom sliders initialized!");
