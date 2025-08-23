// Contact Modal Functionality
class ContactModal {
  constructor() {
    this.modal = document.getElementById('contactModal');
    this.openBtn = document.getElementById('openModal');
    this.closeBtn = document.getElementById('closeModal');
    this.form = document.getElementById('contactForm');
    
    this.init();
  }

  init() {
    if (!this.modal) return;
    
    // Event listeners
    if (this.openBtn) {
      this.openBtn.addEventListener('click', () => this.open());
    }
    
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    
    // Close on overlay click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
        this.close();
      }
    });
    
    // Form submission
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    // Phone number formatting
    const phoneInput = document.getElementById('userPhone');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => this.formatPhoneNumber(e));
    }
  }

  open() {
    this.modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Focus first input
    const firstInput = this.modal.querySelector('.form-input');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }

  close() {
    this.modal.classList.add('hidden');
    document.body.style.overflow = '';
    
    // Reset form
    if (this.form) {
      this.form.reset();
    }
  }

  formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Ensure it starts with 380 if user types numbers
    if (value && !value.startsWith('380')) {
      if (value.startsWith('0')) {
        value = '38' + value;
      } else if (value.length > 0) {
        value = '380' + value;
      }
    }
    
    // Format as +380 XX XXX XX XX
    if (value.length >= 3) {
      let formatted = '+' + value.substring(0, 3);
      if (value.length > 3) {
        formatted += ' ' + value.substring(3, 5);
      }
      if (value.length > 5) {
        formatted += ' ' + value.substring(5, 8);
      }
      if (value.length > 8) {
        formatted += ' ' + value.substring(8, 10);
      }
      if (value.length > 10) {
        formatted += ' ' + value.substring(10, 12);
      }
      e.target.value = formatted;
    } else if (value.length === 0) {
      e.target.value = '+380';
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.form);
    const data = {
      name: formData.get('userName'),
      phone: formData.get('userPhone'),
      quantity: formData.get('quantity'),
      message: formData.get('message')
    };
    
    // Basic validation
    if (!data.name.trim()) {
      this.showError('Будь ласка, введіть ваше ім\'я');
      return;
    }
    
    if (!data.phone.trim() || data.phone.length < 13) {
      this.showError('Будь ласка, введіть коректний номер телефону');
      return;
    }
    
    if (!data.quantity || data.quantity <= 0) {
      this.showError('Будь ласка, введіть кількість стеків');
      return;
    }
    
    // Simulate form submission
    this.submitForm(data);
  }

  async submitForm(data) {
    const submitBtn = this.form.querySelector('.submit-button');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Відправляємо...';
    submitBtn.disabled = true;
    
    try {
      // Here you would typically send data to your server
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      this.showSuccess('Дякуємо! Ваш запит успішно відправлено. Ми зв\'яжемось з вами найближчим часом.');
      
      setTimeout(() => {
        this.close();
      }, 2000);
      
    } catch (error) {
      this.showError('Виникла помилка при відправці. Спробуйте ще раз.');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  showError(message) {
    this.showMessage(message, 'error');
  }

  showSuccess(message) {
    this.showMessage(message, 'success');
  }

  showMessage(message, type) {
    // Remove existing messages
    const existingMessage = this.modal.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message--${type}`;
    messageEl.textContent = message;
    
    // Insert before submit button
    const submitBtn = this.form.querySelector('.submit-button');
    submitBtn.parentNode.insertBefore(messageEl, submitBtn);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.remove();
      }
    }, 5000);
  }
}

// Initialize immediately and ensure global function is available
window.contactModalInstance = null;

// Global function to open modal (can be called from anywhere)
window.openContactModal = function() {
  if (window.contactModalInstance) {
    window.contactModalInstance.open();
  } else {
    // If instance doesn't exist yet, create it and open
    window.contactModalInstance = new ContactModal();
    window.contactModalInstance.open();
  }
};

// Initialize when DOM is loaded
function initModal() {
  if (!window.contactModalInstance) {
    window.contactModalInstance = new ContactModal();
  }
}

// Initialize based on document ready state
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModal);
} else {
  initModal();
}
