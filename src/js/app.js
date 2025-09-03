// JS Goes here - ES6 supported
import "./css/main.scss";
import "./modal.js";
import "./performance.js";
import "./accessibility.js";

// Add copy functionality to code blocks
document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit to ensure all content is loaded
  setTimeout(function() {
    // Find all pre elements that contain code
    const preElements = document.querySelectorAll('pre');
    
    preElements.forEach(function(preElement, index) {
      const codeElement = preElement.querySelector('code');
      if (!codeElement) return;
      
      // Ensure pre element has relative positioning
      preElement.style.position = 'relative';
      
      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-button';
      copyButton.setAttribute('aria-label', 'Copy code to clipboard');
      copyButton.setAttribute('title', 'Copy code');
      copyButton.innerHTML = '📋'; // Fallback icon
      
      // Force inline styles to override any CSS conflicts
      copyButton.style.cssText = `
        position: absolute !important;
        top: 8px !important;
        right: 8px !important;
        width: 32px !important;
        height: 32px !important;
        background: #fff !important;
        border: 1px solid #d0d7de !important;
        border-radius: 6px !important;
        cursor: pointer !important;
        opacity: 1 !important;
        z-index: 9999 !important;
        font-size: 14px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
        transition: all 0.2s ease !important;
      `;
      
      // Add hover effect
      copyButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#f6f8fa !important';
        this.style.transform = 'scale(1.05)';
      });
      
      copyButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#fff !important';
        this.style.transform = 'scale(1)';
      });
      
      // Add click handler
      copyButton.addEventListener('click', async function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        try {
          const text = codeElement.textContent.trim();
          await navigator.clipboard.writeText(text);
          
          // Show success feedback
          this.innerHTML = '✓';
          this.style.backgroundColor = '#4CAF50 !important';
          this.style.color = 'white !important';
          
          setTimeout(() => {
            this.innerHTML = '📋';
            this.style.backgroundColor = '#fff !important';
            this.style.color = 'initial !important';
          }, 1000);
          
        } catch (err) {
          console.error('Failed to copy text: ', err);
          // Show error feedback
          this.innerHTML = '✗';
          this.style.backgroundColor = '#f44336 !important';
          this.style.color = 'white !important';
          
          setTimeout(() => {
            this.innerHTML = '📋';
            this.style.backgroundColor = '#fff !important';
            this.style.color = 'initial !important';
          }, 1000);
        }
      });
      
      // Add button to pre element
      preElement.appendChild(copyButton);
    });
  }, 100);
});

// Function to show copy feedback
function showCopyFeedback(button, message, color) {
  const feedback = document.createElement('div');
  feedback.textContent = message;
  feedback.style.cssText = `
    position: absolute;
    top: -30px;
    right: 0;
    background: ${color};
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 1000;
  `;
  
  button.parentElement.appendChild(feedback);
  
  // Animate feedback
  requestAnimationFrame(function() {
    feedback.style.opacity = '1';
    setTimeout(function() {
      feedback.style.opacity = '0';
      setTimeout(function() { 
        if (feedback.parentElement) {
          feedback.remove(); 
        }
      }, 300);
    }, 1500);
  });
}

if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", (user) => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}
