'use client'

import { useEffect, useRef } from 'react'

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    // Resize the canvas when the window size changes
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    // Array to store particles
    const particles: Array<{
      x: number
      y: number
      radius: number
      opacity: number
      speedX: number
      speedY: number
      color: string
    }> = []

    // Generate particles
    const createParticle = () => {
      const particle = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1, // radius between 1 and 4
        opacity: Math.random() * 0.5 + 0.5, // opacity between 0.5 and 1
        speedX: Math.random() * 0.5 - 0.25, // speed in X direction
        speedY: Math.random() * 0.5 - 0.25, // speed in Y direction
        color: `hsl(${Math.random() * 360}, 100%, 70%)`, // random color
      }
      particles.push(particle)
    }

    // Function to update and draw particles
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw each particle
      particles.forEach((particle, index) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()

        // Update particle properties
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Create a fading effect for particles
        particle.opacity -= 0.002
        particle.radius *= 0.99

        // Remove particles that are no longer visible
        if (particle.opacity <= 0 || particle.radius <= 0.1) {
          particles.splice(index, 1)
        }

        // Loop particle to the other side when it goes off the screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      })

      // Create new particles every frame to fill the background
      if (particles.length < 200) createParticle()

      animationFrameId = requestAnimationFrame(drawParticles)
    }

    drawParticles()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-950">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ pointerEvents: 'none' }}
      />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-6 text-5xl font-bold text-gray-800 dark:text-white md:text-6xl">
          Full Stack Developer
        </h1>
        <p className="mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-400 md:text-2xl">
          Crafting elegant solutions with cutting-edge technologies. Turning ideas into reality, one
          line of code at a time.
        </p>
      </main>
    </div>
  )
}
