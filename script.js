/**
 * ============================================================================
 * Pricing Cards Section - Vanilla JavaScript Logic
 * Task: Intermediate Task 4 - Pricing Cards Section
 * ============================================================================
 * Features:
 *  - Dynamic Monthly/Yearly pricing calculation and updates without page reload
 *  - Smooth visual transitions during price switches
 *  - Accessible ARIA state management (role="switch", aria-checked, live regions)
 *  - Interactive Plan Selection Modal with detailed order summary
 *  - User feedback toast banner for confirmed plan selection
 *  - Full keyboard accessibility (Escape to close, accessible button focus)
 *  - Dark / Light Mode theme switcher with localStorage persistence
 *  - Interactive FAQ accordion with ARIA expanded states
 * ============================================================================
 */

// Execute logic once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // --------------------------------------------------------------------------
  // 1. Theme Switcher (Dark / Light Mode)
  // --------------------------------------------------------------------------
  const themeToggle = document.getElementById("theme-toggle");
  const rootHtml = document.documentElement;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    rootHtml.setAttribute("data-theme", savedTheme);
  } else if (systemPrefersDark) {
    rootHtml.setAttribute("data-theme", "dark");
  }

  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = rootHtml.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      rootHtml.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 2. DOM Element References
  // --------------------------------------------------------------------------
  const billingToggle = document.getElementById("billing-toggle");
  const monthlyLabel = document.getElementById("monthly-label");
  const yearlyLabel = document.getElementById("yearly-label");
  const priceElements = document.querySelectorAll(".price-amount");
  const ctaButtons = document.querySelectorAll(".card-cta .btn");
  const srAnnouncement = document.getElementById("sr-announcement");

  // Dynamic Subtexts
  const proSubtext = document.getElementById("pro-billing-subtext");
  const premiumSubtext = document.getElementById("premium-billing-subtext");

  // Confirmation Modal Elements
  const modal = document.getElementById("confirmation-modal");
  const modalPlanName = document.getElementById("modal-plan-name");
  const modalBillingCycle = document.getElementById("modal-billing-cycle");
  const modalPlanPrice = document.getElementById("modal-plan-price");
  const modalTotalBilled = document.getElementById("modal-total-billed");
  const confirmBtn = document.getElementById("confirm-btn");
  const cancelBtn = document.getElementById("cancel-btn");

  // Toast / Selection Banner Elements
  const selectionBanner = document.getElementById("selection-banner");
  const bannerText = document.getElementById("banner-text");
  const closeBannerBtn = document.getElementById("close-banner-btn");

  // FAQ Accordion Elements
  const faqQuestions = document.querySelectorAll(".faq-question");

  // --------------------------------------------------------------------------
  // 3. State Management
  // --------------------------------------------------------------------------
  // Current billing cycle: false for monthly, true for yearly
  let isYearly = false;
  let bannerTimeoutId = null;

  // --------------------------------------------------------------------------
  // 4. Billing Toggle Functionality
  // --------------------------------------------------------------------------
  /**
   * Updates all price displays, labels, and subtexts based on billing cycle
   * @param {boolean} yearlyActive - True if yearly billing is selected
   */
  function updatePricing(yearlyActive) {
    isYearly = yearlyActive;

    // A. Update toggle switch accessibility state
    billingToggle.setAttribute("aria-checked", isYearly ? "true" : "false");

    // B. Update active label styling
    if (isYearly) {
      monthlyLabel.classList.remove("active");
      yearlyLabel.classList.add("active");
    } else {
      yearlyLabel.classList.remove("active");
      monthlyLabel.classList.add("active");
    }

    // C. Smoothly animate and update price figures
    priceElements.forEach((priceEl) => {
      // Add CSS class to fade out momentarily
      priceEl.classList.add("price-updating");

      setTimeout(() => {
        const monthlyVal = priceEl.getAttribute("data-monthly");
        const yearlyVal = priceEl.getAttribute("data-yearly");
        const newPrice = isYearly ? yearlyVal : monthlyVal;

        // Update displayed text
        priceEl.textContent = newPrice;

        // Remove CSS animation class to fade back in
        priceEl.classList.remove("price-updating");
      }, 120);
    });

    // D. Update dynamic billing subtext
    if (proSubtext) {
      proSubtext.textContent = isYearly
        ? "Billed annually (₹4,788/yr) • Save ₹1,200"
        : "Billed monthly • Cancel anytime";
    }

    if (premiumSubtext) {
      premiumSubtext.textContent = isYearly
        ? "Billed annually (₹9,588/yr) • Save ₹2,400"
        : "Billed monthly • Cancel anytime";
    }

    // E. Update CTA button aria-labels for screen readers
    ctaButtons.forEach((btn) => {
      const planName = btn.getAttribute("data-plan-name");
      const monthlyPrice = btn.getAttribute("data-plan-monthly");
      const yearlyPrice = btn.getAttribute("data-plan-yearly");
      const currentPrice = isYearly ? yearlyPrice : monthlyPrice;

      if (planName === "Basic") {
        btn.setAttribute("aria-label", "Choose Basic Plan for free");
      } else {
        btn.setAttribute(
          "aria-label",
          `Choose ${planName} Plan at ₹${currentPrice} per month`
        );
      }
    });

    // F. Announce change to screen readers
    const cycleName = isYearly ? "Yearly billing with 20% discount" : "Monthly billing";
    if (srAnnouncement) {
      srAnnouncement.textContent = `Billing cycle updated to ${cycleName}. Prices updated.`;
    }
  }

  // Toggle switch click event
  if (billingToggle) {
    billingToggle.addEventListener("click", () => {
      updatePricing(!isYearly);
    });
  }

  // Clicking directly on the text labels also toggles the switch
  if (monthlyLabel) {
    monthlyLabel.addEventListener("click", () => {
      if (isYearly) updatePricing(false);
    });
  }

  if (yearlyLabel) {
    yearlyLabel.addEventListener("click", () => {
      if (!isYearly) updatePricing(true);
    });
  }

  // --------------------------------------------------------------------------
  // 5. Plan Selection & Confirmation Modal
  // --------------------------------------------------------------------------
  let currentlySelectedPlan = null;

  /**
   * Opens the confirmation modal with details of the selected plan
   * @param {string} planName - Name of the chosen plan
   * @param {string} monthlyPrice - Monthly price figure
   * @param {string} yearlyPrice - Yearly monthly-equivalent price figure
   */
  function openConfirmationModal(planName, monthlyPrice, yearlyPrice) {
    const cycleText = isYearly ? "Yearly (Billed Annually)" : "Monthly";
    const effectivePrice = isYearly ? yearlyPrice : monthlyPrice;

    // Calculate total bill amount
    let totalBilledText = "";
    if (planName === "Basic") {
      totalBilledText = "₹0 (Free Forever)";
    } else if (isYearly) {
      const annualTotal = parseInt(yearlyPrice, 10) * 12;
      totalBilledText = `₹${annualTotal.toLocaleString("en-IN")} / year`;
    } else {
      totalBilledText = `₹${effectivePrice} / month`;
    }

    // Populate modal contents
    modalPlanName.textContent = `${planName} Plan`;
    modalBillingCycle.textContent = cycleText;
    modalPlanPrice.textContent = `₹${effectivePrice} / month`;
    modalTotalBilled.textContent = totalBilledText;

    // Store selection in state
    currentlySelectedPlan = {
      name: planName,
      cycle: cycleText,
      price: effectivePrice,
      total: totalBilledText,
    };

    // Show modal
    modal.removeAttribute("hidden");
    confirmBtn.focus();
    document.body.style.overflow = "hidden"; // Prevent background scroll
  }

  /**
   * Closes the confirmation modal
   */
  function closeModal() {
    modal.setAttribute("hidden", "true");
    document.body.style.overflow = ""; // Restore background scroll
  }

  // Attach event listener to all "Choose Plan" buttons
  ctaButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const planName = btn.getAttribute("data-plan-name");
      const monthlyPrice = btn.getAttribute("data-plan-monthly");
      const yearlyPrice = btn.getAttribute("data-plan-yearly");

      openConfirmationModal(planName, monthlyPrice, yearlyPrice);
    });
  });

  // Confirm selection in modal
  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      if (!currentlySelectedPlan) return;

      closeModal();
      showToastNotification(
        `🎉 Great choice! You have successfully selected the ${currentlySelectedPlan.name} Plan (${currentlySelectedPlan.cycle} at ₹${currentlySelectedPlan.price}/mo).`
      );
    });
  }

  // Cancel / Close modal button
  if (cancelBtn) {
    cancelBtn.addEventListener("click", closeModal);
  }

  // Close modal when clicking on the dimmed background backdrop
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close modal on Escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.hasAttribute("hidden")) {
      closeModal();
    }
  });

  // --------------------------------------------------------------------------
  // 6. Toast / Feedback Notification Banner
  // --------------------------------------------------------------------------
  /**
   * Displays the floating feedback notification banner
   * @param {string} message - Message to display inside the banner
   */
  function showToastNotification(message) {
    if (bannerTimeoutId) {
      clearTimeout(bannerTimeoutId);
    }

    bannerText.textContent = message;
    selectionBanner.removeAttribute("hidden");

    // Automatically hide after 6 seconds
    bannerTimeoutId = setTimeout(() => {
      selectionBanner.setAttribute("hidden", "true");
    }, 6000);
  }

  // Dismiss banner button
  if (closeBannerBtn) {
    closeBannerBtn.addEventListener("click", () => {
      if (bannerTimeoutId) {
        clearTimeout(bannerTimeoutId);
      }
      selectionBanner.setAttribute("hidden", "true");
    });
  }

  // --------------------------------------------------------------------------
  // 7. Interactive FAQ Accordion Logic
  // --------------------------------------------------------------------------
  faqQuestions.forEach((button) => {
    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      const answerId = button.getAttribute("aria-controls");
      const answerElement = document.getElementById(answerId);

      if (!answerElement) return;

      // Close all other accordions for clean single-open UX
      faqQuestions.forEach((otherButton) => {
        if (otherButton !== button) {
          otherButton.setAttribute("aria-expanded", "false");
          const otherAnsId = otherButton.getAttribute("aria-controls");
          const otherAns = document.getElementById(otherAnsId);
          if (otherAns) {
            otherAns.setAttribute("hidden", "true");
          }
        }
      });

      // Toggle current item
      if (isExpanded) {
        button.setAttribute("aria-expanded", "false");
        answerElement.setAttribute("hidden", "true");
      } else {
        button.setAttribute("aria-expanded", "true");
        answerElement.removeAttribute("hidden");
      }
    });
  });

  // Log successful initialization for developer verification
  console.log("Pricing Cards Section initialized successfully.");
});
