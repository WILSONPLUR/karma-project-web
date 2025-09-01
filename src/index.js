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

    this.init();
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
    // Do not force width here; allow CSS to control container width

    // Set wrapper styles
    this.wrapper.style.display = "flex";
    this.wrapper.style.width = "fit-content";
    this.wrapper.style.height = "auto";
    this.wrapper.style.transition = "none";
    this.wrapper.style.flexWrap = "nowrap";

    this.updateSlideStyles();
  }

  updateSlideStyles() {
    const currentSlidesPerView = this.getCurrentSlidesPerView();
    const currentSpaceBetween = this.getCurrentSpaceBetween();
    const containerWidth = this.container.offsetWidth;

    console.log("Debug slider:", {
      containerWidth,
      currentSlidesPerView,
      currentSpaceBetween,
      windowWidth: window.innerWidth,
    });

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
      const maxSlideWidth =
        currentSlidesPerView === 1 ? containerWidth - 20 : 500;
      slideWidth = Math.min(slideWidth, maxSlideWidth);

      // Якщо 2 картки, переконуємось що вони займають всю ширину
      if (currentSlidesPerView === 2) {
        const totalSpacingCheck = currentSpaceBetween;
        const maxPossibleWidth = (containerWidth - totalSpacingCheck) / 2;
        slideWidth = Math.min(slideWidth, maxPossibleWidth);
      }
    }

    console.log("Calculated slideWidth:", slideWidth);

    this.slides.forEach((slide, index) => {
      slide.style.flex = "0 0 auto";
      slide.style.width = `${slideWidth}px`;
      slide.style.display = "flex";
      slide.style.alignItems = "center";
      slide.style.justifyContent = "center";
      slide.style.marginRight =
        index < this.slides.length - 1 ? `${currentSpaceBetween}px` : "0";
      slide.style.boxSizing = "border-box";
    });

    // Розрахунок ширини wrapper
    if (this.options.fixedWrapperWidth) {
      this.wrapper.style.width = `${this.options.fixedWrapperWidth}px`;
    } else {
      const wrapperWidth =
        slideWidth * this.slides.length +
        currentSpaceBetween * (this.slides.length - 1);
      this.wrapper.style.width = `${wrapperWidth}px`;
    }
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
    const handleResize = () => {
      this.updateSlideStyles();
      this.showSlide(this.currentIndex, false);
    };

    window.addEventListener("resize", handleResize);
  }

  getCurrentSlidesPerView() {
    const width = window.innerWidth;
    const responsive = this.options.responsive;

    let currentSlidesPerView = this.options.slidesPerView;

    Object.keys(responsive)
      .map(Number)
      .sort((a, b) => a - b)
      .forEach((breakpoint) => {
        if (width >= breakpoint) {
          currentSlidesPerView =
            responsive[breakpoint].slidesPerView || currentSlidesPerView;
        }
      });

    return currentSlidesPerView;
  }

  getCurrentSpaceBetween() {
    const width = window.innerWidth;
    const responsive = this.options.responsive;

    let currentSpaceBetween = this.options.spaceBetween;

    Object.keys(responsive)
      .map(Number)
      .sort((a, b) => a - b)
      .forEach((breakpoint) => {
        if (width >= breakpoint) {
          currentSpaceBetween =
            responsive[breakpoint].spaceBetween || currentSpaceBetween;
        }
      });

    return currentSpaceBetween;
  }
}

// Initialize sliders when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Desktop/Tablet trusted companies slider (4 visible)
  new CustomSlider(".swiper-container-trusted-desktop", {
    autoplay: false,
    loop: true,
    slidesPerView: 4,
    spaceBetween: 40,
    paginationCount: 4,
  });

  // Mobile trusted companies slider (1 slide showing 2x2 grid inside)
  new CustomSlider(".swiper-container-trusted-mobile", {
    autoplay: false,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    paginationCount: 4,
  });

  // Initialize desktop products slider with responsive configuration (2 cards, 51 gap, move by 2)
  new CustomSlider(".swiper-container-products", {
    autoplay: false,
    loop: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
    fixedSlideWidth: null,
    responsive: {
      // Планшет - показуємо 2 картки
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 20,
        fixedSlideWidth: null,
      },
      // Десктоп - показуємо 2 картки з трохи більшим відступом
      1024: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 25,
        fixedSlideWidth: null,
      },
      // Великі екрани - показуємо 2 картки
      1200: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30,
        fixedSlideWidth: null,
      },
    },
  });

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
});

// Say hello
console.log("🦊 Custom sliders initialized!");
