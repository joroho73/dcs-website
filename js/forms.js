document.addEventListener("DOMContentLoaded", () => {
    initialiseAjaxForm({
        formId: "contactForm",
        statusId: "formStatus",
        endpoint: "/php/contact.php",
        submittingText: "Sending...",
        successEvent: "contact_form_submit",
        eventCategory: "contact",
        eventLabel: "Contact Form",
        fallbackMessage:
            "Sorry, something went wrong. Please call or email instead."
    });

    initialiseAjaxForm({
        formId: "review-form",
        statusId: "review-form-status",
        endpoint: "/php/review.php",
        submittingText: "Submitting...",
        successEvent: "review_submitted",
        eventCategory: "reviews",
        eventLabel: "Review Form",
        fallbackMessage:
            "Sorry, your review could not be submitted. Please try again later.",
        beforeSubmit: validateReviewForm
    });
});


function initialiseAjaxForm({
    formId,
    statusId,
    endpoint,
    submittingText,
    successEvent,
    eventCategory,
    eventLabel,
    fallbackMessage,
    beforeSubmit
}) {
    const form = document.getElementById(formId);
    const status = document.getElementById(statusId);

    if (!form || !status) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        status.textContent = "";
        status.className = "form-status";

        if (beforeSubmit && !beforeSubmit(form, status)) {
            return;
        }

        const button = form.querySelector("button[type='submit']");
        const originalButtonText = button ? button.textContent : "";

        if (button) {
            button.disabled = true;
            button.textContent = submittingText;
        }

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                body: new FormData(form),
                headers: {
                    Accept: "application/json"
                }
            });

            let result;

            try {
                result = await response.json();
            } catch {
                throw new Error("The server returned an invalid response.");
            }

            if (!response.ok || !result.success) {
                status.textContent =
                    result.message || "Sorry, something went wrong.";
                status.classList.add("error");
                return;
            }

            status.textContent =
                result.message ||
                "Thank you. Your submission has been received.";

            status.classList.add("success");

            form.reset();

            if (typeof gtag === "function") {
                gtag("event", successEvent, {
                    event_category: eventCategory,
                    event_label: eventLabel
                });
            }
        } catch (error) {
            console.error(`${formId} submission failed:`, error);

            status.textContent = fallbackMessage;
            status.classList.add("error");
        } finally {
            if (button) {
                button.disabled = false;
                button.textContent = originalButtonText;
            }
        }
    });
}


function validateReviewForm(form, status) {
    const selectedRating = form.querySelector(
        "input[name='rating']:checked"
    );

    if (!selectedRating) {
        status.textContent = "Please choose a star rating.";
        status.classList.add("error");

        const ratingGroup = form.querySelector(".star-rating");

        ratingGroup?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        return false;
    }

    const permission = form.querySelector(
        "input[name='permission']"
    );

    const displayName = form.querySelector(
        "select[name='display_name']"
    );

    if (permission?.checked && displayName && !displayName.value) {
        status.textContent =
            "Please choose how your name should appear if the review is published.";

        status.classList.add("error");
        displayName.focus();

        return false;
    }

    return true;
}