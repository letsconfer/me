const restrictionMessage = "This action is restricted, please contact Vikramjit for more details.";
let isInternalAction = false;

const darkBulbSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2m-6.364 1.636l1.414 1.414m12.728 0l-1.414 1.414M2 12h2m16 0h2M6.364 19.364l1.414-1.414m10.284 1.414l-1.414-1.414M12 6a6 6 0 0 1 6 6c0 2.22-1.25 4.15-3.08 5.15V19a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1.85C7.25 16.15 6 14.22 6 12a6 6 0 0 1 6-6z"/><path d="M9 22h6"/></svg>`;
const lightBulbSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#E0E0E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2m-6.364 1.636l1.414 1.414m12.728 0l-1.414 1.414M2 12h2m16 0h2M6.364 19.364l1.414-1.414m10.284 1.414l-1.414-1.414M12 6a6 6 0 0 1 6 6c0 2.22-1.25 4.15-3.08 5.15V19a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1.85C7.25 16.15 6 14.22 6 12a6 6 0 0 1 6-6z"/><path d="M9 22h6"/></svg>`;

function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('theme-toggle-btn');
    const currentTheme = body.getAttribute("data-theme");
    
    if (currentTheme === "light") {
        body.setAttribute("data-theme", "dark");
        if (themeBtn) {
            themeBtn.innerHTML = lightBulbSvg;
        }
    } else {
        body.setAttribute("data-theme", "light");
        if (themeBtn) {
            themeBtn.innerHTML = darkBulbSvg;
        }
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
    const switcher = document.querySelector('.cv-container .theme-switcher') || document.querySelector('.theme-switcher');
    
    if (switcher) {
        switcher.style.position = 'absolute';
        switcher.style.top = '15px';
        switcher.style.right = '15px';
        switcher.style.margin = '0';
        switcher.style.textAlign = 'right';
        switcher.style.zIndex = '10';
        
        switcher.innerHTML = '';
        
        // 1. Theme Toggle Button
        const themeBtn = document.createElement('button');
        themeBtn.type = 'button';
        themeBtn.id = 'theme-toggle-btn';
        themeBtn.onclick = toggleTheme;
        themeBtn.title = "Toggle Theme";
        themeBtn.style.background = "transparent";
        themeBtn.style.border = "none";
        themeBtn.style.cursor = "pointer";
        themeBtn.style.padding = "2px";
        themeBtn.style.display = "inline-flex";
        themeBtn.style.alignItems = "center";
        themeBtn.style.justifyContent = "center";
        
        const currentTheme = document.body.getAttribute("data-theme") || "light";
        themeBtn.innerHTML = currentTheme === "dark" ? lightBulbSvg : darkBulbSvg;
        
        // 2. Download PDF Button
        const downloadBtn = document.createElement('button');
        downloadBtn.type = 'button';
        downloadBtn.onclick = downloadPDF;
        downloadBtn.title = "Download PDF";
        downloadBtn.style.background = "transparent";
        downloadBtn.style.border = "none";
        downloadBtn.style.cursor = "pointer";
        downloadBtn.style.padding = "2px";
        downloadBtn.style.display = "inline-flex";
        downloadBtn.style.alignItems = "center";
        downloadBtn.style.justifyContent = "center";
        
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
