// 4. Favicon Setting
    favicon: "logo.png"          // Favicon image file path
};

// ==========================================
// AUTOMATIC FAVICON INJECTOR
// ==========================================
(function() {
    if (window.CV_MASTER_CONFIG && window.CV_MASTER_CONFIG.favicon) {
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/png';
        link.rel = 'icon';
        link.href = window.CV_MASTER_CONFIG.favicon;
        if (!link.parentNode) {
            document.head.appendChild(link);
        }
    }
})();
