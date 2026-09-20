const restrictionMessage = "This action is restricted, please contact Vikramjit for more details.";
let isInternalAction = false;

function toggleTheme() {
    const body = document.body;
    const themeBtnImg = document.getElementById('theme-icon');
    if (body.getAttribute("data-theme") === "light") {
        body.setAttribute("data-theme", "dark");
        if (themeBtnImg) themeBtnImg.src = "LightBulb.jpeg";
    } else {
        body.setAttribute("data-theme", "light");
        if (themeBtnImg) themeBtnImg.src = "DarkBulb.jpeg";
    }
}

function downloadPDF() {
    isInternalAction = true;
    window.print();
    setTimeout(() => {
        isInternalAction = false;
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function() {
    const switcher = document.querySelector('.theme-switcher');
    const container = document.querySelector('.cv-container');
    
    if (switcher && container) {
        // Position the button group at the top right of the CV container frame
        switcher.style.position = 'absolute';
        switcher.style.top = '20px';
        switcher.style.right = '20px';
        switcher.style.margin = '0';
        switcher.style.textAlign = 'right';
        switcher.style.zIndex = '10';
        
        switcher.innerHTML = '';
        
        // 1. Theme Toggle Icon Button (Single bulb based on theme)
        const themeBtn = document.createElement('button');
        themeBtn.type = 'button';
        themeBtn.onclick = toggleTheme;
        themeBtn.title = "Toggle Theme";
        
        const currentTheme = document.body.getAttribute("data-theme") || "light";
        const themeImg = document.createElement('img');
        themeImg.id = 'theme-icon';
        themeImg.src = currentTheme === "dark" ? "LightBulb.jpeg" : "DarkBulb.jpeg";
        themeImg.alt = "";
        themeImg.style.width = "20px";
        themeImg.style.height = "20px";
        themeImg.style.display = "block";
        themeBtn.appendChild(themeImg);
        
        // 2. Download PDF Icon Button
        const downloadBtn = document.createElement('button');
        downloadBtn.type = 'button';
        downloadBtn.onclick = downloadPDF;
        downloadBtn.title = "Download PDF";
        
        const downloadImg = document.createElement('img');
        downloadImg.src = "Download.jpeg";
        downloadImg.alt = "";
        downloadImg.style.width = "20px";
        downloadImg.style.height = "20px";
        downloadImg.style.display = "block";
        downloadBtn.appendChild(downloadImg);

        // Styling for both icon-only buttons
        [themeBtn, downloadBtn].forEach(btn => {
            btn.style.background = "var(--container-bg)";
            btn.style.border = "1px solid var(--border-color)";
            btn.style.padding = "6px";
            btn.style.borderRadius = "4px";
            btn.style.cursor = "pointer";
            btn.style.display = "inline-flex";
            btn.style.alignItems = "center";
            btn.style.justifyContent = "center";
        });
        themeBtn.style.marginRight = "8px";

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
