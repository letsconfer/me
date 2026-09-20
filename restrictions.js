const restrictionMessage = "This action is restricted, please contact Vikramjit for more details.";
let isInternalAction = false;

// Load Profile Image from Master Config if available
function applyMasterConfig() {
    const config = window.CV_MASTER_CONFIG || {};
    
    // Apply profile image across all avatar slots if config is present
    if (config.profileImage) {
        const profileImgs = document.querySelectorAll('.profile-img');
        profileImgs.forEach(img => {
            img.src = config.profileImage;
        });
    }

    // Apply left-click / selection restriction
    if (config.allowLeftClick === false) {
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';
    } else {
        document.body.style.userSelect = 'auto';
        document.body.style.webkitUserSelect = 'auto';
    }
}

function updateThemeButton() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        const currentTheme = document.body.getAttribute("data-theme") || "light";
        if (currentTheme === "dark") {
            themeBtn.style.backgroundImage = "url('LightBulb.jpeg?v=2026')";
        } else {
            themeBtn.style.backgroundImage = "url('DarkBulb.jpeg?v=2026')";
        }
    }
}

function toggleTheme() {
    const body = document.body;
    const html = document.documentElement;
    const currentTheme = body.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    body.setAttribute("data-theme", newTheme);
    html.setAttribute("data-theme", newTheme);
    
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.style.backgroundImage = 'none';
    }
    
    void body.offsetHeight;
    setTimeout(() => {
        updateThemeButton();
    }, 50);
}

function downloadPDF() {
    isInternalAction = true;
    window.print();
    setTimeout(() => {
        isInternalAction = false;
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function() {
    applyMasterConfig();
    
    const config = window.CV_MASTER_CONFIG || {};
    const switcher = document.querySelector('.cv-container .theme-switcher') || document.querySelector('.theme-switcher');
    
    if (switcher) {
        switcher.style.position = 'absolute';
        switcher.style.top = '15px';
        switcher.style.right = '15px';
        switcher.style.margin = '0';
        switcher.style.textAlign = 'right';
        switcher.style.zIndex = '10';
        switcher.innerHTML = '';
        
        const baseButtonStyle = (btn) => {
            btn.type = 'button';
            btn.style.backgroundSize = '20px 20px';
            btn.style.backgroundRepeat = 'no-repeat';
            btn.style.backgroundPosition = 'center';
            btn.style.backgroundColor = 'transparent';
            btn.style.border = 'none';
            btn.style.outline = 'none';
            btn.style.boxShadow = 'none';
            btn.style.cursor = 'pointer';
            btn.style.width = '24px';
            btn.style.height = '24px';
            btn.style.padding = '0';
            btn.style.margin = '0 4px';
            btn.style.display = 'inline-block';
            btn.style.verticalAlign = 'middle';
        };

        if (!document.body.hasAttribute("data-theme")) {
            document.body.setAttribute("data-theme", "light");
            document.documentElement.setAttribute("data-theme", "light");
        }

        // 1. Theme Toggle Button (Controlled by Master Config)
        if (config.showThemeIcon !== false) {
            const themeBtn = document.createElement('button');
            themeBtn.id = 'theme-toggle-btn';
            baseButtonStyle(themeBtn);
            themeBtn.onclick = toggleTheme;
            themeBtn.title = "Toggle Theme";
            switcher.appendChild(themeBtn);
            updateThemeButton();
        }
        
        // 2. Download PDF Button (Controlled by Master Config)
        if (config.showDownloadIcon !== false) {
            const downloadBtn = document.createElement('button');
            downloadBtn.id = 'download-pdf-btn';
            baseButtonStyle(downloadBtn);
            downloadBtn.onclick = downloadPDF;
            downloadBtn.title = "Download PDF";
            downloadBtn.style.backgroundImage = "url('Download.jpeg?v=2026')";
            switcher.appendChild(downloadBtn);
        }
    }
});

// ========== SECURITY & RESTRICTIONS (Controlled by Master Config) ==========
document.addEventListener('contextmenu', function(e) {
    const config = window.CV_MASTER_CONFIG || {};
    if (!config.allowRightClick) {
        e.preventDefault();
        alert(restrictionMessage);
    }
});

document.addEventListener('click', function(e) {
    const config = window.CV_MASTER_CONFIG || {};
    if (config.allowLeftClick === false) {
        // Optional left-click behavior suppression if needed
    }
});

document.addEventListener('copy', function(e) {
    const config = window.CV_MASTER_CONFIG || {};
    if (!config.allowRightClick) {
        e.preventDefault();
        alert(restrictionMessage);
    }
});

document.addEventListener('cut', function(e) {
    const config = window.CV_MASTER_CONFIG || {};
    if (!config.allowRightClick) {
        e.preventDefault();
        alert(restrictionMessage);
    }
});

document.addEventListener('dragstart', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    const config = window.CV_MASTER_CONFIG || {};
    if (isInternalAction) return;
    
    // If screenshot / shortcuts are allowed, skip blocking
    if (config.allowScreenshot) return;

    // Block Ctrl+P (Print), Ctrl+S (Save), Ctrl+U (View Source)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's' || e.key === 'u' || e.key === 'P' || e.key === 'S' || e.key === 'U')) {
        e.preventDefault();
        alert(restrictionMessage);
    }
    
    // Block PrintScreen
    if (e.key === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        navigator.clipboard.writeText('');
        alert(restrictionMessage);
    }

    // Block F12 (DevTools) and Ctrl+Shift+I/J/C
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))) {
        e.preventDefault();
        alert(restrictionMessage);
    }
});
