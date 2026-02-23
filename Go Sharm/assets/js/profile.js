// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    
    // Filter Buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Toggle active state
            filterButtons.forEach(b => b.classList.remove('active-filter'));
            this.classList.add('active-filter');
            
            // You can add actual filtering logic here
            console.log('Filter clicked:', this.textContent.trim());
            
            // Example: Show a dropdown menu (you can customize this)
            alert('Filter option: ' + this.textContent.trim());
        });
    });

    // Details Buttons
    const detailsButtons = document.querySelectorAll('.btn-details');
    detailsButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tripCard = this.closest('.trip-card');
            const tripName = tripCard.querySelector('.trip-info h5').textContent;
            const tripPrice = tripCard.querySelector('.trip-price').textContent;
            
            // Show trip details modal or navigate to details page
            showTripDetails(tripName, tripPrice, tripCard);
        });
    });

    // Rebook Buttons
    const rebookButtons = document.querySelectorAll('.btn-rebook');
    rebookButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tripCard = this.closest('.trip-card');
            const tripName = tripCard.querySelector('.trip-info h5').textContent;
            
            // Rebook the trip
            rebookTrip(tripName, tripCard);
        });
    });

    // Request A Ride Button
    const requestRideBtn = document.querySelector('.btn-request-ride');
    if (requestRideBtn) {
        requestRideBtn.addEventListener('click', function() {
            // Navigate to ride request page or show booking modal
            window.location.href = '#request-ride'; // Change to your actual ride request page
            alert('Redirecting to ride request...');
        });
    }

    // Sidebar Navigation
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only prevent default and handle click for logout
            if (this.classList.contains('logout')) {
                e.preventDefault();
                
                if (confirm('Are you sure you want to log out?')) {
                    // Perform logout
                    console.log('Logging out...');
                    // Redirect to login page or home
                    window.location.href = 'login.html'; // Change to your login page
                }
            }
            // For other nav items, let the default link behavior work (navigation)
        });
    });

    // Logout Button
    const logoutBtn = document.querySelector('.nav-item.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (confirm('Are you sure you want to log out?')) {
                // Perform logout
                console.log('Logging out...');
                // Redirect to login page or home
                window.location.href = 'login.html'; // Change to your login page
            }
        });
    }

    // Language Selector
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('click', function() {
            // Show language options
            showLanguageMenu();
        });
    }

    // User Avatar Menu
    const userAvatar = document.querySelector('.user-avatar');
    if (userAvatar) {
        userAvatar.addEventListener('click', function() {
            // Show user menu dropdown
            showUserMenu();
        });
    }

    // Search Bar
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
});

// Function to show trip details
function showTripDetails(tripName, tripPrice, tripCard) {
    const tripMeta = tripCard.querySelector('.trip-meta').textContent;
    const tripDate = tripCard.querySelector('.trip-date').textContent;
    
    // Create modal or navigate to details page
    const modal = document.createElement('div');
    modal.className = 'trip-details-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Trip Details</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>Date:</strong> ${tripDate}</p>
                <p><strong>Destination:</strong> ${tripName}</p>
                <p><strong>Price:</strong> ${tripPrice}</p>
                <p><strong>Details:</strong> ${tripMeta}</p>
                <div class="trip-detail-map">
                    ${tripCard.querySelector('.trip-map').innerHTML}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-close-modal">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeModal = () => {
        modal.remove();
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.btn-close-modal').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'translateY(0)';
    }, 10);
}

// Function to rebook a trip
function rebookTrip(tripName, tripCard) {
    if (confirm(`Do you want to rebook this trip to:\n${tripName}?`)) {
        // Add rebooking logic here
        console.log('Rebooking trip:', tripName);
        
        // Show success message
        showNotification('Trip rebooked successfully!', 'success');
        
        // You can redirect to booking page or show booking form
        // window.location.href = 'booking.html?trip=' + encodeURIComponent(tripName);
    }
}

// Function to show language menu
function showLanguageMenu() {
    const languages = [
        { code: 'en', name: 'English', flag: 'gb' },
        { code: 'ar', name: 'العربية', flag: 'eg' },
        { code: 'fr', name: 'Français', flag: 'fr' },
        { code: 'de', name: 'Deutsch', flag: 'de' }
    ];
    
    let langHTML = '<div class="language-dropdown"><ul>';
    languages.forEach(lang => {
        langHTML += `
            <li data-lang="${lang.code}">
                <img src="https://flagcdn.com/w40/${lang.flag}.png" alt="${lang.name}">
                <span>${lang.name}</span>
            </li>
        `;
    });
    langHTML += '</ul></div>';
    
    // For now, just alert
    alert('Language options:\n- English\n- العربية\n- Français\n- Deutsch');
}

// Function to show user menu
function showUserMenu() {
    const menuOptions = [
        'My Profile',
        'Settings',
        'Payment Methods',
        'Help & Support',
        'Log Out'
    ];
    
    alert('User Menu:\n' + menuOptions.join('\n'));
}

// Function to perform search
function performSearch(query) {
    if (query.trim() !== '') {
        console.log('Searching for:', query);
        alert('Searching for: ' + query);
        // Add actual search logic here
        // window.location.href = 'search.html?q=' + encodeURIComponent(query);
    }
}

// Function to show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Show notification with animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
}

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// BOOKING PAGE FUNCTIONALITY
// ============================================

// Tab Switching
const tabButtons = document.querySelectorAll('.tab-btn');
if (tabButtons.length > 0) {
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const tabName = this.getAttribute('data-tab');
            const tabContent = document.getElementById(tabName);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
}

// New Booking Button
const newBookingBtn = document.querySelector('.btn-new-booking');
if (newBookingBtn) {
    newBookingBtn.addEventListener('click', function() {
        alert('Opening new booking form...');
        // You can redirect to booking form page or show modal
        // window.location.href = 'create-booking.html';
    });
}

// Booking Action Buttons
const modifyButtons = document.querySelectorAll('.btn-action.secondary');
modifyButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const bookingCard = this.closest('.booking-card');
        const bookingTitle = bookingCard.querySelector('.booking-main-info h4').textContent;
        
        if (confirm(`Do you want to modify the booking:\n${bookingTitle}?`)) {
            alert('Opening modification form...');
            // Add modification logic here
        }
    });
});

const cancelButtons = document.querySelectorAll('.btn-action.danger');
cancelButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const bookingCard = this.closest('.booking-card');
        const bookingTitle = bookingCard.querySelector('.booking-main-info h4').textContent;
        
        if (confirm(`Are you sure you want to cancel:\n${bookingTitle}?\n\nThis action cannot be undone.`)) {
            // Add cancellation logic
            bookingCard.style.opacity = '0.5';
            showNotification('Booking cancelled successfully', 'error');
            
            setTimeout(() => {
                bookingCard.remove();
            }, 1000);
        }
    });
});

const viewDetailsButtons = document.querySelectorAll('.btn-action.primary');
viewDetailsButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const bookingCard = this.closest('.booking-card');
        const bookingTitle = bookingCard.querySelector('.booking-main-info h4').textContent;
        const bookingDate = bookingCard.querySelector('.booking-date').textContent.trim();
        const bookingPrice = bookingCard.querySelector('.booking-price .price').textContent;
        
        // Show booking details modal
        showBookingDetailsModal(bookingTitle, bookingDate, bookingPrice, bookingCard);
    });
});

// Quick Action Buttons
const quickActionButtons = document.querySelectorAll('.quick-action-btn');
quickActionButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const action = this.querySelector('span').textContent;
        alert(`Opening ${action} form...`);
        // Add routing to appropriate booking forms
    });
});

// ============================================
// ACCOUNT PAGE FUNCTIONALITY
// ============================================

// Edit Profile Button
const editBtn = document.querySelector('.btn-edit');
if (editBtn) {
    editBtn.addEventListener('click', function() {
        const inputs = document.querySelectorAll('.form-input');
        const isReadonly = inputs[0].hasAttribute('readonly');
        
        if (isReadonly) {
            // Enable editing
            inputs.forEach(input => {
                input.removeAttribute('readonly');
                input.style.background = '#fff';
            });
            this.innerHTML = '<i class="fas fa-save"></i> Save';
            this.style.background = '#28a745';
        } else {
            // Save changes
            inputs.forEach(input => {
                input.setAttribute('readonly', true);
                input.style.background = '#f8f9fa';
            });
            this.innerHTML = '<i class="fas fa-edit"></i> Edit';
            this.style.background = '#6c5ce7';
            showNotification('Profile updated successfully!', 'success');
        }
    });
}

// Change Photo Button
const changePhotoBtn = document.querySelector('.btn-change-photo');
if (changePhotoBtn) {
    changePhotoBtn.addEventListener('click', function() {
        // Create file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = function(e) {
            if (e.target.files && e.target.files[0]) {
                showNotification('Photo uploaded successfully!', 'success');
            }
        };
        fileInput.click();
    });
}

// Add Payment Method
const addPaymentBtn = document.querySelector('.btn-add');
if (addPaymentBtn) {
    addPaymentBtn.addEventListener('click', function() {
        alert('Opening add payment method form...');
        // Show payment form modal or redirect
    });
}

// Payment Card Actions
const editCardButtons = document.querySelectorAll('.btn-card-action:not(.delete)');
editCardButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const paymentCard = this.closest('.payment-card');
        const cardNumber = paymentCard.querySelector('.card-number').textContent;
        alert(`Editing card: ${cardNumber}`);
    });
});

const deleteCardButtons = document.querySelectorAll('.btn-card-action.delete');
deleteCardButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const paymentCard = this.closest('.payment-card');
        const cardNumber = paymentCard.querySelector('.card-number').textContent;
        
        if (confirm(`Are you sure you want to delete:\n${cardNumber}?`)) {
            paymentCard.style.opacity = '0';
            setTimeout(() => paymentCard.remove(), 300);
            showNotification('Payment method removed', 'error');
        }
    });
});

// Security Settings
const changePasswordBtn = document.querySelectorAll('.btn-setting-action')[0];
if (changePasswordBtn) {
    changePasswordBtn.addEventListener('click', function() {
        alert('Opening change password form...');
        // Show password change modal
    });
}

// Toggle Switches
const toggleSwitches = document.querySelectorAll('.toggle-switch input');
toggleSwitches.forEach(toggle => {
    toggle.addEventListener('change', function() {
        const settingItem = this.closest('.setting-item');
        const settingName = settingItem.querySelector('strong').textContent;
        
        if (this.checked) {
            showNotification(`${settingName} enabled`, 'success');
        } else {
            showNotification(`${settingName} disabled`, 'info');
        }
    });
});

// Preferences - Language and Currency Change
const languageChangeBtn = document.querySelectorAll('.preferences-settings .btn-setting-action')[0];
const currencyChangeBtn = document.querySelectorAll('.preferences-settings .btn-setting-action')[1];

if (languageChangeBtn) {
    languageChangeBtn.addEventListener('click', function() {
        showLanguageMenu();
    });
}

if (currencyChangeBtn) {
    currencyChangeBtn.addEventListener('click', function() {
        const currencies = ['USD ($)', 'EUR (€)', 'GBP (£)', 'EGP (E£)'];
        alert('Select Currency:\n' + currencies.join('\n'));
    });
}

// Danger Zone Actions
const deactivateBtn = document.querySelectorAll('.btn-danger-action')[0];
const deleteAccountBtn = document.querySelectorAll('.btn-danger-action')[1];

if (deactivateBtn) {
    deactivateBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to deactivate your account?\n\nYou can reactivate it anytime by logging in.')) {
            alert('Account deactivation process initiated...');
            // Add deactivation logic
        }
    });
}

if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', function() {
        const confirmation = prompt('This will permanently delete your account and all data.\n\nType "DELETE" to confirm:');
        if (confirmation === 'DELETE') {
            alert('Account deletion process initiated...\n\nYou will receive a confirmation email.');
            // Add deletion logic
        } else if (confirmation !== null) {
            alert('Incorrect confirmation. Account not deleted.');
        }
    });
}

// Help Card - Contact Support
const helpBtn = document.querySelector('.btn-help');
if (helpBtn) {
    helpBtn.addEventListener('click', function() {
        alert('Opening support chat...\n\nOur team will respond within 24 hours.');
        // Open support chat or redirect to support page
    });
}

// Booking Details Modal Function
function showBookingDetailsModal(title, date, price, bookingCard) {
    const modal = document.createElement('div');
    modal.className = 'trip-details-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Booking Details</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>Service:</strong> ${title}</p>
                <p><strong>Date & Time:</strong> ${date}</p>
                <p><strong>Price:</strong> ${price}</p>
                <div class="booking-details-full">
                    ${bookingCard.querySelector('.booking-details').innerHTML}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-close-modal">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeModal = () => {
        modal.remove();
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.btn-close-modal').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'translateY(0)';
    }, 10);
}