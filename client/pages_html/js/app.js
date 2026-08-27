/**
 * Ecommy Interactive Client JS
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initGallerySwitcher();
  initTabSwitchers();
  initToastSystem();
  initQuantityControls();
});

/* Mobile Drawer Menu Toggle */
function initMobileMenu() {
  const sandwichBtn = document.querySelector('.sandwich-btn');
  const navMenu = document.querySelector('.nav-menu');
  
  if (sandwichBtn && navMenu) {
    sandwichBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }
}

/* Product Detail Thumbnail Gallery Switcher */
function initGallerySwitcher() {
  const mainImg = document.querySelector('.gallery-main');
  const thumbs = document.querySelectorAll('.gallery-thumb');

  if (mainImg && thumbs.length > 0) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        mainImg.src = thumb.src;
      });
    });
  }
}

/* Tab Switcher for Profile and Details */
function initTabSwitchers() {
  const tabBtns = document.querySelectorAll('[data-tab-target]');
  
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-tab-target');
        
        // Remove active class from sibling buttons & target panes
        const parent = btn.closest('.tab-container') || document;
        parent.querySelectorAll('[data-tab-target]').forEach(b => b.classList.remove('active'));
        parent.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        
        btn.classList.add('active');
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }
}

/* Toast Notifications */
function showToast(message = 'Action successful!') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✓</span> <div>${message}</div>`;
  
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function initToastSystem() {
  window.showToast = showToast;
  
  document.querySelectorAll('[data-add-cart]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Item added to your shopping cart!');
      updateCartBadge(1);
    });
  });
}

function updateCartBadge(delta) {
  const badge = document.querySelector('.cart-badge');
  if (badge) {
    let count = parseInt(badge.textContent || '0') + delta;
    badge.textContent = count;
  }
}

/* Quantity Picker Controls */
function initQuantityControls() {
  document.querySelectorAll('.qty-picker').forEach(picker => {
    const minusBtn = picker.querySelector('.qty-minus');
    const plusBtn = picker.querySelector('.qty-plus');
    const input = picker.querySelector('input');

    if (minusBtn && plusBtn && input) {
      minusBtn.addEventListener('click', () => {
        let val = parseInt(input.value) || 1;
        if (val > 1) {
          input.value = val - 1;
        }
      });

      plusBtn.addEventListener('click', () => {
        let val = parseInt(input.value) || 1;
        input.value = val + 1;
      });
    }
  });
}
