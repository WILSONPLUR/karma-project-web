// Enhanced Performance Optimizations for Mobile
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.setupLazyLoading();
    this.preloadCriticalResources();
    this.setupServiceWorker();
    this.trackWebVitals();
    this.optimizeForMobile();
  }

  optimizeForMobile() {
    // Defer non-critical JavaScript
    this.deferNonCriticalJS();
    
    // Optimize images for mobile viewport
    this.optimizeMobileImages();
    
    // Reduce layout shifts
    this.preventLayoutShifts();
  }

  deferNonCriticalJS() {
    // Defer Swiper initialization until user interaction
    if (window.innerWidth <= 768) {
      const swiperContainers = document.querySelectorAll('.swiper-container-products');
      if (swiperContainers.length > 0) {
        const loadSwiper = () => {
          if (window.Swiper) {
            this.initializeSwiper();
          }
        };
        
        // Load on first scroll or touch
        const events = ['scroll', 'touchstart', 'mousedown'];
        const loadOnce = () => {
          events.forEach(event => document.removeEventListener(event, loadOnce));
          loadSwiper();
        };
        events.forEach(event => document.addEventListener(event, loadOnce, { passive: true, once: true }));
      }
    }
  }

  optimizeMobileImages() {
    if (window.innerWidth <= 768) {
      // Reduce image quality for mobile to improve LCP
      const images = document.querySelectorAll('img[src*="webp"]');
      images.forEach(img => {
        if (img.loading !== 'lazy' && !img.hasAttribute('fetchpriority')) {
          img.loading = 'lazy';
        }
      });
    }
  }

  preventLayoutShifts() {
    // Ensure all images have dimensions to prevent CLS
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(img => {
      if (!img.width && !img.height) {
        const rect = img.getBoundingClientRect();
        if (rect.width && rect.height) {
          img.setAttribute('width', Math.round(rect.width));
          img.setAttribute('height', Math.round(rect.height));
        }
      }
    });
  }

  // Advanced Lazy Loading with IntersectionObserver
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      // Aggressive lazy loading for mobile performance
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: window.innerWidth <= 768 ? '25px 0px' : '50px 0px',
        threshold: 0.01
      });

      document.querySelectorAll('img[data-src], img.lazy').forEach(img => {
        imageObserver.observe(img);
      });

      // Lazy load background images with mobile optimization
      const bgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            bgObserver.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: window.innerWidth <= 768 ? '10px 0px' : '25px 0px'
      });

      document.querySelectorAll('[data-bg]').forEach(el => {
        bgObserver.observe(el);
      });
    } else {
      // Fallback for older browsers
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
      });
    }
  }

  // Critical Resource Hints
  preloadCriticalResources() {
    // Mobile-optimized critical resource preloading
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
      // Only preload hero image on desktop
      const heroImage = document.querySelector('img[fetchpriority="high"]');
      if (heroImage && !heroImage.complete) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = heroImage.src;
        document.head.appendChild(link);
      }
    }

    // Preload critical fonts with reduced weight
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.as = 'font';
    fontPreload.type = 'font/woff2';
    fontPreload.crossOrigin = 'anonymous';
    fontPreload.href = 'https://fonts.gstatic.com/s/unbounded/v7/Yq6R-LCAWCX3-6Ky7FAFnOZwkxgtUb8.woff2';
    document.head.appendChild(fontPreload);
  }

  // Service Worker for caching
  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  trackWebVitals() {
    // Track Core Web Vitals with mobile optimization
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint - target <2.5s for mobile
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const lcp = entry.startTime;
          console.log('LCP:', lcp, 'ms');
          if (lcp > 2500) {
            console.warn('LCP too slow for mobile:', lcp);
          }
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay - target <100ms
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const fid = entry.processingStart - entry.startTime;
          console.log('FID:', fid, 'ms');
        }
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift - target <0.1
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        console.log('CLS:', clsValue);
        if (clsValue > 0.1) {
          console.warn('CLS too high:', clsValue);
        }
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PerformanceOptimizer();
});

// Critical performance fixes for mobile
if (window.innerWidth <= 768) {
  // Reduce animation complexity on mobile
  document.documentElement.style.setProperty('--animation-duration', '0.3s');
  
  // Disable non-essential animations on low-end devices
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
    document.documentElement.classList.add('reduce-motion');
  }
}
