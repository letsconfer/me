const restrictionMessage = "This action is restricted, please contact Vikramjit for more details.";
let isInternalAction = false;

// Detect active theme from either html or body element, defaulting to light
function getCurrentTheme() {
    return document.documentElement.getAttribute("data-theme") || 
           document.body.getAttribute("data-theme") || 
           "light";
}

// Set theme attributes on both html and body to prevent CSS scoping mismatches
function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    
    const themeImg = document.getElementById('theme-icon');
    if (themeImg) {
        // Light mode needs DarkBulb.jpeg, Dark mode needs LightBulb.jpeg
        themeImg.src = (theme === "dark") ? "LightBulb.jpeg" : "DarkBulb.jpeg";
    }
}

function toggleTheme() {
    const current = getCurrentTheme();
    const next = (current === "light") ? "dark" : "light";
    applyTheme(next);
}

function downloadPDF() {
    isInternalAction = true;
    window.print();
    setTimeout(() => {
        isInternalAction = false;
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function() {
    const switcher = document.querySelector('.cv-container .theme-switcher') || document.querySelector('.theme-switcher');
    
    if (switcher) {
        switcher.style.position = 'absolute';
        switcher.style.top = '15px';
        switcher.style.right = '15px';
        switcher.style.margin = '0';
        switcher.style.textAlign = 'right';
        switcher.style.zIndex = '10';
        switcher.innerHTML = '';
        
        const applyButtonStyle = (btn) => {
            btn.type = 'button';
            btn.style.background = 'transparent';
            btn.style.border = 'none';
            btn.style.outline = 'none';
            btn.style.boxShadow = 'none';
            btn.style.cursor = 'pointer';
            btn.style.padding = '2px';
            btn.style.display = 'inline-flex';
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'center';
        };

        // 1. Theme Toggle Button
        const themeBtn = document.createElement('button');
        applyButtonStyle(themeBtn);
        themeBtn.onclick = toggleTheme;
        themeBtn.title = "Toggle Theme";
        
        const themeImg = document.createElement('img');
        themeImg.id = 'theme-icon';
        themeImg.alt = "Toggle Theme";
        themeImg.style.width = "20px";
        themeImg.style.height = "20px";
        themeImg.style.display = "block";
        themeBtn.appendChild(themeImg);
        
        // Initialize active theme and icon immediately on load
        applyTheme(getCurrentTheme());
        
        // 2. Download PDF Button
        const downloadBtn = document.createElement('button');
        applyButtonStyle(downloadBtn);
        downloadBtn.onclick = downloadPDF;
        downloadBtn.title = "Download PDF";
        
        const downloadImg = document.createElement('img');
        downloadImg.src = "Download.jpeg";
        downloadImg.alt = "Download PDF";
        downloadImg.style.width = "20px";
        downloadImg.style.height = "20px";
        downloadImg.style.display = "block";
        downloadBtn.appendChild(downloadImg);

        switcher.appendChild(themeBtn);
        switcher.appendChild(downloadBtn);
    }
});

// Security Restrictions
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert(restrictionMessage);
});

document.addEventListener('copy', function(e) {
    e.preventDefault();
    alert(restrictionMessage);
});

document.addEventListener('cut', function(e) {
    e.preventDefault();
    alert(restrictionMessage);
});

document.addEventListener('dragstart', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if (isInternalAction) return;
    
    if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's' || e.key === 'u' || e.key === 'P' || e.key === 'S' || e.key === 'U')) {
        e.preventDefault();
        alert(restrictionMessage);
    }
    
    if (e.key === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        navigator.clipboard.writeText('');
        alert(restrictionMessage);
    }

    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))) {
        e.preventDefault();
        alert(restrictionMessage);
    }
});
