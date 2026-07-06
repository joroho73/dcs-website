document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const button = form.querySelector("button[type='submit']");
        const originalButtonText = button.textContent;

        status.textContent = "";
        status.className = "form-status";

        button.disabled = true;
        button.textContent = "Sending...";

        try {
            const response = await fetch("/contact.php", {
                method: "POST",
                body: new FormData(form)
            });

            const result = await response.json();

            if (result.success) {
                status.textContent = result.message;
                status.classList.add("success");
                form.reset();

                if (typeof gtag === "function") {
                    gtag("event", "contact_form_submit", {
                        event_category: "contact",
                        event_label: "Contact Form"
                    });
                }
            } else {
                status.textContent = result.message;
                status.classList.add("error");
            }
        } catch (error) {
            status.textContent = "Sorry, something went wrong. Please call or email instead.";
            status.classList.add("error");
        }

        button.disabled = false;
        button.textContent = originalButtonText;
    });
});