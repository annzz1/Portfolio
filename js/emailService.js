
        // Initialize EmailJS with your public key
        (function() {
            emailjs.init("PbFZQNa_sji4JkS0V");
        })();

        // Handle form submission
        document.getElementById("contactForm").addEventListener("submit", function(event) {
            event.preventDefault();
            
            const submitBtn = document.getElementById("submitBtn");
            const buttonText = document.getElementById("buttonText");
            const spinner = document.getElementById("spinner");
            
            // Show loading state
            submitBtn.disabled = true;
            buttonText.textContent = "Sending...";
            spinner.style.display = "inline-block";
            
            // Send email
            emailjs.sendForm("service_x1qqj5y", "template_buncosd", this)
                .then(function() {
                    // Update button to show success
                    buttonText.textContent = "Sent!";
                    spinner.style.display = "none";
                    
                    // Reset form
                    document.getElementById("contactForm").reset();
                    
                    // Reset button after success
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        buttonText.textContent = "Send Message";
                    }, 2000);
                }, function(error) {
                    // Update button to show error
                    buttonText.textContent = "Failed!";
                    spinner.style.display = "none";
                    
                    console.error("EmailJS Error:", error);
                    
                    // Reset button on error
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        buttonText.textContent = "Send Message";
                    }, 2000);
                });
        });

        // Scroll to top button
        const scrollToTopBtn = document.getElementById("scrollToTop");
        
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.display = "flex";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        });
        
        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });