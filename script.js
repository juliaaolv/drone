const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    initParticles();
}

function initParticles() {
    particles = Array.from({ length: Math.min(120, Math.floor(window.innerWidth / 12)) }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.6 + 0.6,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.6 + 0.25,
    }));
}

function drawParticles() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${p.alpha})`;
        ctx.fill();

        for (let j = index + 1; j < particles.length; j += 1) {
            const q = particles[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.strokeStyle = `rgba(57,255,157,${0.12 * (1 - dist / 120)})`;
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(drawParticles);
}

function toggleTheme() {
    const isLight = root.getAttribute('data-theme') === 'light';
    root.setAttribute('data-theme', isLight ? 'dark' : 'light');
}

window.addEventListener('resize', resizeCanvas);
themeToggle.addEventListener('click', toggleTheme);

AOS.init({ duration: 900, once: true, offset: 120 });
resizeCanvas();
drawParticles();

