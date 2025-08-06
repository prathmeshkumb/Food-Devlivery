// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }),
  )
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.backdropFilter = "blur(10px)"
  } else {
    navbar.style.background = "#fff"
    navbar.style.backdropFilter = "none"
  }
})

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".feature-card, .dish-card, .mission-card, .stat-item").forEach((el) => {
  observer.observe(el)
})

// Contact form handling
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    // Simple validation
    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all fields", "error")
      return
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address", "error")
      return
    }

    // Simulate form submission
    showNotification("Sending message...", "info")

    setTimeout(() => {
      showNotification("Message sent successfully! We'll get back to you soon.", "success")
      contactForm.reset()
    }, 2000)
  })
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : "#2196F3"};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  notification.querySelector(".notification-content").style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    `

  notification.querySelector(".notification-close").style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `

  // Add to page
  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Close button functionality
  notification.querySelector(".notification-close").addEventListener("click", () => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => notification.remove(), 300)
  })

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => notification.remove(), 300)
    }
  }, 5000)
}

// Add to cart functionality (simulation)
document.querySelectorAll(".btn-small").forEach((button) => {
  if (button.textContent.includes("Add to Cart")) {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const dishCard = this.closest(".dish-card")
      const dishName = dishCard.querySelector("h3").textContent
      const dishPrice = dishCard.querySelector(".dish-price").textContent

      showNotification(`${dishName} (${dishPrice}) added to cart!`, "success")

      // Add visual feedback
      this.textContent = "Added!"
      this.style.background = "#4CAF50"

      setTimeout(() => {
        this.textContent = "Add to Cart"
        this.style.background = ""
      }, 2000)
    })
  }
})

// Order Now button functionality
document.querySelectorAll(".btn-primary").forEach((button) => {
  if (button.textContent.includes("Order Now")) {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      showNotification("Redirecting to order page...", "info")
      // In a real app, this would redirect to the ordering system
    })
  }
})

// View Menu button functionality
document.querySelectorAll(".btn-secondary").forEach((button) => {
  if (button.textContent.includes("View Menu")) {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      // Scroll to popular dishes section
      const popularDishes = document.querySelector(".popular-dishes")
      if (popularDishes) {
        popularDishes.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  }
})

// Loading animation for images
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("load", function () {
    this.style.opacity = "1"
  })

  img.style.opacity = "0"
  img.style.transition = "opacity 0.3s ease"
})

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  // Close mobile menu with Escape key
  if (e.key === "Escape") {
    if (navMenu && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }

    // Close notifications
    const notification = document.querySelector(".notification")
    if (notification) {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => notification.remove(), 300)
    }
  }
})

// Performance optimization: Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add loaded class to body for CSS animations
  document.body.classList.add("loaded")

  // Initialize any additional features here
  console.log("FoodExpress website loaded successfully!")
})
