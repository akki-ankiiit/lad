import { useCallback } from "react";
import { studio } from "../data/studio";

const LABELS = {
  name: "Full name",
  email: "Email",
  phone: "Phone",
  country: "Country",
  project_type: "Project type",
  project_location: "Project location",
  project_area: "Approximate project area",
  services: "Services required",
  message: "Project description",
};

/** Collect form values, keeping multi-select fields (services) as arrays. */
function formValues(form) {
  const values = {};
  for (const [key, value] of new FormData(form)) {
    if (key in values) values[key] = [].concat(values[key], value);
    else values[key] = form.elements[key]?.multiple ? [value] : value;
  }
  return values;
}

/** Without a configured endpoint, hand the enquiry to the visitor's email app. */
function mailtoFallback(values) {
  const body = Object.entries(LABELS)
    .filter(([key]) => values[key] && String(values[key]).trim())
    .map(([key, label]) => `${label}: ${[].concat(values[key]).join(", ")}`)
    .join("\n");
  const subject = `Project inquiry — ${values.project_type || "Luxury Antonovich Design"}`;
  return `mailto:${studio.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Use a configured enquiry endpoint; never claim an enquiry was sent without one. */
export function useContactForm() {
  return useCallback(async (event) => {
    event.preventDefault();
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.reportValidity()) return;
    const labels = [...form.querySelectorAll('[data-form-btn] [hover="text"]')];
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
    let status = form.querySelector("[data-form-status]");
    if (!status) {
      status = document.createElement("p");
      status.dataset.formStatus = "";
      status.className = "form-status";
      status.setAttribute("role", "status");
      form.appendChild(status);
    }
    if (!endpoint) {
      window.location.href = mailtoFallback(formValues(form));
      status.textContent = `Your email app has opened with your inquiry addressed to ${studio.email}. You can also call ${studio.phone}.`;
      labels.forEach((label) => {
        label.textContent = "Submit";
      });
      return;
    }
    if (form.dataset.sending === "true") return;
    form.dataset.sending = "true";
    labels.forEach((label) => {
      label.textContent = "Sending…";
    });
    status.textContent = "";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues(form)),
      });
      if (!response.ok) throw new Error("Unable to submit enquiry");
      const success = form.parentElement.querySelector(".w-form-done");
      if (success) {
        form.style.display = "none";
        success.style.display = "block";
        success.setAttribute("tabindex", "-1");
        success.focus();
      } else status.textContent = "Thank you. Your enquiry has been sent.";
    } catch {
      status.textContent = `Your inquiry could not be sent. Please try again, email ${studio.email} or call ${studio.phone}.`;
    } finally {
      delete form.dataset.sending;
      labels.forEach((label) => {
        label.textContent = "Submit";
      });
    }
  }, []);
}
