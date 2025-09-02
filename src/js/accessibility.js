// Comprehensive Accessibility Enhancements
class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupScreenReaderSupport();
    this.setupColorContrastEnhancements();
    this.setupMotionPreferences();
  }

  // Enhanced Keyboard Navigation
  setupKeyboardNavigation() {
    // Escape key handling for modals and dropdowns
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
        this.closeAllDropdowns();
      }
      
      // Tab trapping for modals
      if (e.key === 'Tab') {
        this.handleTabTrapping(e);
      }
      
      // Arrow key navigation for dropdowns
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        this.handleArrowNavigation(e);
      }
      
      // Enter and Space for button activation
      if ((e.key === 'Enter' || e.key === ' ') && e.target.getAttribute('role') === 'button') {
        e.preventDefault();
        e.target.click();
      }
    });
  }

  // Focus Management
  setupFocusManagement() {
    // Focus visible indicators
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Focus restoration after modal close
    this.lastFocusedElement = null;
    
    // Store focus before opening modals
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-modal-trigger]')) {
        this.lastFocusedElement = e.target;
      }
    });
  }

  // Screen Reader Support
  setupScreenReaderSupport() {
    // Live regions for dynamic content
    this.createLiveRegion();
    
    // Announce page changes
    this.announcePageChanges();
    
    // Enhanced form validation messages
    this.setupFormAccessibility();
  }

  // Color Contrast and Visual Enhancements
  setupColorContrastEnhancements() {
    // High contrast mode detection
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      document.body.classList.add('high-contrast');
    }
    
    // Focus indicators with sufficient contrast
    const style = document.createElement('style');
    style.textContent = `
      .keyboard-navigation *:focus {
        outline: 3px solid #ba0108 !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 0 1px #ffffff !important;
      }
      
      .keyboard-navigation button:focus,
      .keyboard-navigation a:focus,
      .keyboard-navigation input:focus,
      .keyboard-navigation textarea:focus,
      .keyboard-navigation select:focus {
        outline: 3px solid #ba0108 !important;
        outline-offset: 2px !important;
      }
      
      /* High contrast mode styles */
      .high-contrast {
        filter: contrast(150%);
      }
      
      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
      
      /* Screen reader only class */
      .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }
      
      .sr-only.focus\\:not-sr-only:focus {
        position: static !important;
        width: auto !important;
        height: auto !important;
        padding: inherit !important;
        margin: inherit !important;
        overflow: visible !important;
        clip: auto !important;
        white-space: normal !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Motion Preferences
  setupMotionPreferences() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('reduced-motion');
    }
  }

  // Utility Methods
  closeAllModals() {
    const modals = document.querySelectorAll('[role="dialog"], .modal, #mobileMenu');
    modals.forEach(modal => {
      if (!modal.classList.contains('hidden') || modal.classList.contains('open')) {
        modal.classList.add('hidden');
        modal.classList.remove('open');
        
        // Restore focus
        if (this.lastFocusedElement) {
          this.lastFocusedElement.focus();
          this.lastFocusedElement = null;
        }
        
        // Re-enable body scroll
        document.body.style.overflow = '';
      }
    });
  }

  closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown-parent.active');
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('active');
      const button = dropdown.querySelector('button[aria-expanded]');
      if (button) {
        button.setAttribute('aria-expanded', 'false');
      }
    });
  }

  handleTabTrapping(e) {
    const modal = document.querySelector('[role="dialog"]:not(.hidden), .mobile-menu.open');
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }

  handleArrowNavigation(e) {
    const dropdown = document.querySelector('.dropdown-menu:not([style*="display: none"])');
    if (!dropdown) return;

    const items = dropdown.querySelectorAll('a, button');
    const currentIndex = Array.from(items).indexOf(document.activeElement);
    
    if (currentIndex === -1) return;

    e.preventDefault();
    
    if (e.key === 'ArrowDown') {
      const nextIndex = (currentIndex + 1) % items.length;
      items[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      items[prevIndex].focus();
    }
  }

  createLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.id = 'live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
  }

  announcePageChanges() {
    // Announce navigation changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.target.matches('main, [role="main"]')) {
          this.announce('Сторінку оновлено');
        }
      });
    });

    const main = document.querySelector('main, [role="main"]');
    if (main) {
      observer.observe(main, { childList: true, subtree: true });
    }
  }

  setupFormAccessibility() {
    // Enhanced form validation
    document.addEventListener('invalid', (e) => {
      e.preventDefault();
      const field = e.target;
      const errorId = field.id + '-error';
      
      let errorElement = document.getElementById(errorId);
      if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = errorId;
        errorElement.className = 'error-message text-red-600 text-sm mt-1';
        errorElement.setAttribute('role', 'alert');
        field.parentNode.appendChild(errorElement);
      }
      
      errorElement.textContent = field.validationMessage;
      field.setAttribute('aria-describedby', errorId);
      field.setAttribute('aria-invalid', 'true');
      
      this.announce(`Помилка валідації: ${field.validationMessage}`);
    });

    // Clear errors on valid input
    document.addEventListener('input', (e) => {
      const field = e.target;
      if (field.validity.valid) {
        const errorId = field.id + '-error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
          errorElement.remove();
        }
        field.removeAttribute('aria-describedby');
        field.setAttribute('aria-invalid', 'false');
      }
    });
  }

  announce(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }

  // Public API for manual announcements
  static announce(message) {
    const instance = window.accessibilityManager;
    if (instance) {
      instance.announce(message);
    }
  }
}

// Initialize accessibility manager
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.accessibilityManager = new AccessibilityManager();
  });
} else {
  window.accessibilityManager = new AccessibilityManager();
}
