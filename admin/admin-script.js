// Admin Panel JavaScript

// Admin Login Form
const adminLoginForm = document.getElementById('adminLoginForm');
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('#email').value;
        const password = this.querySelector('#password').value;
        
        // Simulate login (in real app, this would connect to backend)
        if (email && password) {
            // Store login state (in real app, use proper authentication)
            sessionStorage.setItem('adminLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        } else {
            alert('Please enter email and password');
        }
    });
}

// Check if user is logged in (for protected pages)
function checkAdminAuth() {
    if (window.location.pathname.includes('admin/') && 
        !window.location.pathname.includes('login.html')) {
        const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
        if (!isLoggedIn) {
            window.location.href = 'login.html';
        }
    }
}

// Run auth check on page load
checkAdminAuth();

// Mobile Menu Toggle (for sidebar)
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        const sidebar = document.querySelector('.admin-sidebar');
        sidebar.classList.toggle('open');
    });
}

// Select All Checkbox
const selectAllCheckbox = document.getElementById('selectAll');
if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.admin-table tbody input[type="checkbox"]');
        checkboxes.forEach(cb => {
            cb.checked = this.checked;
        });
    });
}

// Table Row Actions
document.querySelectorAll('.btn-icon').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const action = this.getAttribute('title');
        const row = this.closest('tr');
        
        if (action === 'Delete') {
            if (confirm('Are you sure you want to delete this item?')) {
                // In real app, this would make an API call
                row.style.opacity = '0.5';
                setTimeout(() => {
                    row.remove();
                }, 300);
            }
        } else if (action === 'Edit') {
            // In real app, this would open an edit modal or navigate to edit page
            alert('Edit functionality - would open edit form');
        } else if (action === 'View') {
            // In real app, this would open a view modal or navigate to detail page
            alert('View functionality - would show details');
        }
    });
});

// Logout
const adminLogout = document.querySelector('.admin-logout');
if (adminLogout) {
    adminLogout.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            sessionStorage.removeItem('adminLoggedIn');
            window.location.href = 'login.html';
        }
    });
}

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'var(--color-red-600)';
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Initialize tooltips or other UI enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add any initialization code here
    console.log('Admin panel loaded');
});

