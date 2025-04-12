// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear()

// Navigation highlighting
const navLinks = document.querySelectorAll(".nav-link")
const sections = document.querySelectorAll("section")

function setActiveSection() {
  let currentSection = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = sectionId
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.dataset.section === currentSection) {
      link.classList.add("active")
    }
  })
}

// Smooth scrolling for navigation
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()
    const sectionId = this.dataset.section
    const section = document.getElementById(sectionId)

    if (section) {
      window.scrollTo({
        top: section.offsetTop - 50,
        behavior: "smooth",
      })
    }
  })
})

// Contact form handling
const contactForm = document.getElementById("contact-form")
const formSuccess = document.getElementById("form-success")
const formError = document.getElementById("form-error")
const sendAnother = document.getElementById("send-another")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    // The form will now submit directly to Formspree
    // No need to prevent default as we want the form to actually submit
    // We'll show the success message after the form redirects back
    // Formspree will handle the actual submission
  })
}

if (sendAnother) {
  sendAnother.addEventListener("click", () => {
    contactForm.reset()
    contactForm.style.display = "block"
    formSuccess.classList.add("hidden")
    formError.classList.add("hidden")
  })
}

// Dynamic background
function initDynamicBackground() {
  const canvas = document.getElementById("background-canvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")

  // Set canvas to full screen
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 5 + 1
      this.speedX = Math.random() * 3 - 1.5
      this.speedY = Math.random() * 3 - 1.5
      this.color = this.getRandomColor()
    }

    getRandomColor() {
      const colors = ["rgb(161, 49, 173)", "rgb(190, 27, 185)", "rgb(97, 45, 210)", "rgb(55, 170, 224)"]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x > canvas.width) this.x = 0
      else if (this.x < 0) this.x = canvas.width
      if (this.y > canvas.height) this.y = 0
      else if (this.y < 0) this.y = canvas.height
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.fill()
    }
  }

  // Create particles
  const particlesArray = []
  const numberOfParticles = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000))

  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle())
  }

  // Connect particles with lines
  function connect() {
    const maxDistance = 150
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x
        const dy = particlesArray[a].y - particlesArray[b].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
          ctx.stroke()
        }
      }
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#0f172a") // Dark blue
    gradient.addColorStop(1, "#1e1b4b") // Dark purple
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update()
      particlesArray[i].draw()
    }

    connect()
    requestAnimationFrame(animate)
  }

  animate()
}

// Initialize everything
window.addEventListener("load", () => {
  initDynamicBackground()
  setActiveSection()
  window.addEventListener("scroll", setActiveSection)
})
