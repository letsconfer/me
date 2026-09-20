const restrictionMessage = "This action is restricted, please contact Vikramjit for more details.";
let isInternalAction = false;

function updateThemeButton() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        const currentTheme = document.body.getAttribute("data-theme") || "light";
        // Light mode -> DarkBulb.jpeg, Dark mode -> LightBulb.jpeg
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
    updateThemeButton();
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

        // 1. Theme Toggle Button
        const themeBtn = document.createElement('button');
        themeBtn.id = 'theme-toggle-btn';
        baseButtonStyle(themeBtn);
        themeBtn.onclick = toggleTheme;
        themeBtn.title = "Toggle Theme";
        
        // 2. Download PDF Button
        const downloadBtn = document.createElement('button');
        downloadBtn.id = 'download-pdf-btn';
        baseButtonStyle(downloadBtn);
        downloadBtn.onclick = downloadPDF;
        downloadBtn.title = "Download PDF";
        downloadBtn.style.backgroundImage = "url('Download.jpeg?v=2026')";

        switcher.appendChild(themeBtn);
        switcher.appendChild(downloadBtn);

        updateThemeButton();
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
