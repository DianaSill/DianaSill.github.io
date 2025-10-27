class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.waves = [];
        this.time = 0;
        this.init();
    }

    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'none';
        document.body.appendChild(this.canvas);
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        this.canvas.addEventListener('click', (e) => {
            this.waves.push({
                x: e.clientX,
                y: e.clientY,
                radius: 0,
                maxRadius: 200,
                opacity: 1
            });
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < 80; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.particles.push({
                x: x,
                y: y,
                originalX: x,
                originalY: y,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                originalVx: (Math.random() - 0.5) * 1,
                originalVy: (Math.random() - 0.5) * 1,
                size: Math.random() * 2 + 1,
                baseSize: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                speedBoost: 1,
                pulseOffset: Math.random() * Math.PI * 2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.time += 0.02;
        
        // Update waves
        this.waves = this.waves.filter(wave => {
            wave.radius += 3;
            wave.opacity -= 0.02;
            return wave.opacity > 0;
        });
        
        // Draw connection lines
        this.drawConnections();
        
        this.particles.forEach(particle => {
            // Calculate distance from mouse
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Repel particles from cursor
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx -= (dx / distance) * force * 0.5;
                particle.vy -= (dy / distance) * force * 0.5;
                particle.speedBoost = 2; // Speed boost when disturbed
            } else {
                // Return to original floating behavior
                particle.vx += (particle.originalVx - particle.vx) * 0.08;
                particle.vy += (particle.originalVy - particle.vy) * 0.08;
                particle.speedBoost = Math.max(1, particle.speedBoost * 0.98); // Gradual slowdown
            }
            
            // Wave ripple effects
            this.waves.forEach(wave => {
                const waveDx = particle.x - wave.x;
                const waveDy = particle.y - wave.y;
                const waveDistance = Math.sqrt(waveDx * waveDx + waveDy * waveDy);
                
                if (Math.abs(waveDistance - wave.radius) < 20) {
                    const waveForce = 0.3 * wave.opacity;
                    particle.vx += (waveDx / waveDistance) * waveForce;
                    particle.vy += (waveDy / waveDistance) * waveForce;
                }
            });
            
            // Size pulsing
            particle.size = particle.baseSize + Math.sin(this.time + particle.pulseOffset) * 0.5;
            
            particle.x += particle.vx * particle.speedBoost;
            particle.y += particle.vy * particle.speedBoost;
            
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
                particle.originalVx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
                particle.originalVy *= -1;
            }
            
            // Glow effect
            this.ctx.shadowColor = 'rgba(201, 237, 220, 0.8)';
            this.ctx.shadowBlur = 10;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(201, 237, 220, ${particle.opacity})`;
            this.ctx.fill();
            
            // Reset shadow
            this.ctx.shadowBlur = 0;
        });
        
        // Draw wave ripples
        this.drawWaves();
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawConnections() {
        this.ctx.strokeStyle = 'rgba(201, 237, 220, 0.1)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    drawWaves() {
        this.waves.forEach(wave => {
            this.ctx.strokeStyle = `rgba(201, 237, 220, ${wave.opacity * 0.5})`;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
            this.ctx.stroke();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});