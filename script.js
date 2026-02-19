const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

// Escucha el cambio de tamaño de ventana para que el canvas siempre cubra todo
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(); // Reinicia para redistribuir partículas en el nuevo tamaño
});

class Particle {
    constructor() {
        this.init();
    }

    // Inicializa o reinicia las propiedades de la partícula
    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Tamaño variado para crear sensación de profundidad (unas más lejos que otras)
        this.size = Math.random() * 1.5 + 0.2; 
        // Velocidad muy suave para un look elegante y profesional
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        // Opacidad aleatoria para que parezcan estrellas reales
        this.opacity = Math.random() * 0.6 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Lógica de Movimiento Infinito (Edge Wrapping)
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        // Color BLANCO con opacidad dinámica
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    const numberOfParticles = 125; // Cantidad balanceada para rendimiento y estética
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    // Limpia el frame anterior para dibujar el nuevo
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    
    requestAnimationFrame(animate);
}

init();
animate();
