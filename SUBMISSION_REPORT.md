# INTERNSHIP TASK SUBMISSION REPORT

**Task Name**: Intermediate Task 4 — Modern Responsive Pricing Cards Section  
**Domain**: Web Development & UI/UX Design  
**Tech Stack**: HTML5, CSS3, Vanilla JavaScript (Zero External Dependencies)  
**Status**: Completed & Verified  

---

## 1. Executive Summary & Objective

The objective of this task was to design and engineer a commercial-grade, fully responsive **Pricing Cards Section** for a SaaS platform. The section must display three distinct subscription tiers—**Basic (Free)**, **Pro (₹499/mo)**, and **Premium (₹999/mo)**—with an interactive **Monthly/Yearly billing toggle** that dynamically updates prices and calculates yearly savings (₹0, ₹399/mo, and ₹799/mo) in real time without refreshing the page.

All code has been authored using **pure Vanilla Web Technologies** (HTML5, CSS3, ES6+ JavaScript) adhering to the strict requirement of zero third-party frameworks, libraries, or external CDN dependencies.

---

## 2. Technical Architecture & File Structure

```
pricing cards section/
│
├── index.html          # Semantic structure, accessible markup & SVGs
├── style.css           # Design tokens (CSS variables), Grid/Flexbox, Dark/Light modes
├── script.js           # State management, price math, modal events, theme & FAQ logic
├── README.md           # Quick setup guide and testing verification
└── SUBMISSION_REPORT.md# Complete formal internship documentation
```

### Component Breakdown:
1. **Header & Navigation**:
   - Sticky navbar with brand identity and Dark/Light mode theme switcher.
   - Hero header with value proposition, title, and billing toggle pill.
2. **Dynamic Pricing Toggle**:
   - Accessible ARIA toggle button (`role="switch"`, `aria-checked`).
   - Dynamic price calculation using `data-monthly` and `data-yearly` HTML5 data attributes.
   - Smooth CSS fade transition prevents abrupt visual jumps.
3. **Tiered Pricing Cards**:
   - **Basic Tier (Free Forever)**: 1 Project, 500 MB Storage, Community Support.
   - **Pro Tier (Most Popular)**: Distinct visual hierarchy, 2px brand border, elevated shadow, gradient ribbon badge, 10 Projects, 50 GB Storage.
   - **Premium Tier**: Unlimited capabilities, 500 GB Storage, 24/7 dedicated support, SLA guarantee.
4. **Accessible Features List**:
   - Clean inline SVG checkmarks (green) for included deliverables.
   - Dimmed cross icons with strikethrough text for plan exclusions.
5. **Interactive Plan Selection Modal**:
   - Triggered upon clicking any "Choose Plan" CTA.
   - Recalculates and displays: Plan Name, Billing Frequency, Monthly Rate, and Total Annual Commitment.
6. **Toast Feedback Notification**:
   - Non-intrusive floating toast confirms user selection upon modal confirmation.
   - Auto-dismisses after 6 seconds or via manual close button.
7. **Interactive FAQ Accordion**:
   - Collapsible question cards addressing Indian payment methods (UPI, RuPay, Net Banking), refunds, and plan upgrade rules.

---

## 3. UI/UX & Responsive Design Strategy

### Design System & Tokens
- **Color Palette**:
  - Primary Brand: Deep Indigo (`#4f46e5`) & Violet (`#7c3aed`)
  - Neutral Light Background: `#f8fafc` to `#ffffff`
  - Neutral Dark Background: `#0b0f19` to `#131b2e`
  - Success Indicator: `#10b981` (Emerald)
- **Typography**: System font stack (`system-ui, -apple-system, Segoe UI, Roboto`) ensuring native performance and crisp rendering across Windows, macOS, Android, and iOS without font download delay.

### Responsive Breakpoint Analysis
| Device Category | Breakpoint Range | Grid Behavior | Padding & Typography Adjustments |
|-----------------|------------------|---------------|----------------------------------|
| **Desktop / Wide** | `> 1024px` | 3 Columns side-by-side | Pro plan center-elevated (`scale: 1.03`), full 2.25rem padding |
| **Tablet / Laptops** | `769px - 1024px` | 2 Columns grid | Pro card spans 2 columns at the top for maximum prominence |
| **Mobile Phones** | `481px - 768px` | 1 Column stacked | Full-width cards, 44px+ touch-friendly CTA buttons |
| **Small Phones** | `< 480px` | 1 Column compact | Fluid clamped typography (`clamp()`), optimized 1rem padding |

---

## 4. Key Engineering Highlights & Best Practices

1. **Zero External Dependencies**:
   - No Bootstrap, Tailwind, jQuery, or FontAwesome.
   - Eliminates security vulnerabilities and third-party downtime; allows 100% offline functionality.
2. **Zero Cumulative Layout Shift (CLS)**:
   - Line heights, font metrics, and button dimensions are locked so switching between 2-digit and 3-digit prices causes zero page stutter.
3. **Accessibility Compliance (WCAG 2.1 AA)**:
   - Correct ARIA semantics (`role="switch"`, `aria-checked="true/false"`, `aria-expanded`, `aria-controls`).
   - Screen-reader live region (`#sr-announcement` with `aria-live="polite"`) verbally announces billing changes.
   - High-contrast `:focus-visible` outlines for keyboard-only navigators.
   - Full keyboard dismissal (`Escape` key closes modal).
4. **Persistent Dark/Light Mode**:
   - Seamlessly syncs with operating system settings (`prefers-color-scheme`) and persists user choice in `localStorage`.

---

## 5. Test Verification Matrix

| # | Test Case Description | Expected Result | Actual Result | Status |
|---|-----------------------|-----------------|---------------|:------:|
| 1 | Page initial load | Monthly prices render: ₹0, ₹499, ₹999 | As expected | **PASS** |
| 2 | Pro Plan highlight | Most popular badge and border visible | As expected | **PASS** |
| 3 | Toggle to Yearly | Prices switch to ₹0, ₹399, ₹799 instantly | As expected | **PASS** |
| 4 | Yearly Savings notice | Subtext updates to "Save ₹1,200" and "Save ₹2,400" | As expected | **PASS** |
| 5 | Label clickability | Clicking text "Yearly" or "Monthly" triggers switch | As expected | **PASS** |
| 6 | Choose Plan CTA | Modal opens with accurate plan and billing cycle | As expected | **PASS** |
| 7 | Modal Confirmation | Toast banner appears: "You selected [Plan]..." | As expected | **PASS** |
| 8 | Modal Dismissal | Clicking "Change Plan", backdrop, or pressing `Esc` closes modal | As expected | **PASS** |
| 9 | Dark/Light Switcher | Toggling changes all background, card, and text colors | As expected | **PASS** |
| 10 | FAQ Accordions | Clicking question expands answer, closes others | As expected | **PASS** |
| 11 | Browser Console | Zero runtime errors, zero syntax warnings | 0 errors | **PASS** |

---

## 6. Social Media / LinkedIn Submission Post Template

*(Copy and paste this template when sharing your internship task completion on LinkedIn or your submission portal)*

```text
🚀 Excited to share my completion of Intermediate Task 4: Modern Responsive Pricing Cards Section!

As part of my Web Development Internship, I engineered a high-conversion, commercial SaaS pricing page using pure HTML5, CSS3, and Vanilla JavaScript—built completely from scratch without external libraries or frameworks.

Key Highlights:
✨ 3 Pricing Tiers: Basic (Free), Pro (₹499/mo), and Premium (₹999/mo)
🔄 Dynamic Billing Toggle: Switch between Monthly and Yearly (₹0, ₹399, ₹799) with real-time price updates & annual savings calculation
🌟 Visual Hierarchy: Featured "Most Popular" Pro plan badge with elevated shadows
🌓 Dark & Light Mode: System-preference detection with localStorage persistence
📱 Fully Responsive: Mobile-first layout seamlessly scaling across phones, tablets, and desktops
♿ Accessibility: WCAG-compliant keyboard navigation, ARIA switches, and screen-reader announcements
❓ Interactive FAQ Accordion: Built-in subscription FAQ with smooth collapsible animation

Check out the code and live demo below!
GitHub Repository: [Insert your link]
Live Demo: [Insert your GitHub Pages link]

#WebDevelopment #Frontend #HTML5 #CSS3 #JavaScript #VanillaJS #UIUX #ResponsiveDesign #Internship #Coding
```

---

## 7. Conclusion

Intermediate Task 4 was executed to professional SaaS standards. The clean, modular, and well-commented codebase proves a solid understanding of frontend foundations, DOM manipulation, responsive CSS architecture, and accessible user experience design.

