const restrictionMessage = "This action is restricted, please contact Vikramjit for more details.";
let isInternalAction = false;

function toggleTheme() {
    const body = document.body;
    const themeImg = document.getElementById('theme-icon');
    const currentTheme = body.getAttribute("data-theme");
    
    if (currentTheme === "light") {
        body.setAttribute("data-theme", "dark");
        if (themeImg) {
            themeImg.src = "light-bulb.svg";
        }
    } else {
        body.setAttribute("data-theme", "light");
        if (themeImg) {
            themeImg.src = "dark-bulb.svg";
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
        
        // 1. Theme Toggle Icon Button
        const themeBtn = document.createElement('button');
        themeBtn.type = 'button';
        themeBtn.onclick = toggleTheme;
        themeBtn.title = "Toggle Theme";
        
        const currentTheme = document.body.getAttribute("data-theme") || "light";
        
        const themeImg = document.createElement('img');
        themeImg.id = 'theme-icon';
        themeImg.src = currentTheme === "dark" ? "light-bulb.svg" : "dark-bulb.svg";
        themeImg.alt = "Toggle Theme";
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
