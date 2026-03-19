# Tasks

- [x] 1 Project Setup
  - [x] 1.1 Initialize Vite + React + TypeScript project with `npm create vite@latest`
  - [x] 1.2 Install dependencies: tailwindcss, framer-motion, lucide-react, fast-check (dev)
  - [x] 1.3 Configure Tailwind CSS with `darkMode: 'class'` and extend theme with Stellies Green (#009933) and slate dark palette
  - [x] 1.4 Set up project folder structure: `src/components/`, `src/data/`, `src/context/`, `src/hooks/`
  - [x] 1.5 Configure Vitest with React Testing Library and jsdom environment

- [x] 2 Theme System
  - [x] 2.1 Create `ThemeProvider` context that reads initial theme from `localStorage` key `stellies-theme`, defaults to `'light'`
  - [x] 2.2 Implement `toggleTheme` function that flips theme state, updates `localStorage`, and toggles `dark` class on `document.documentElement`
  - [x] 2.3 Create `ThemeToggle` component rendering Sun icon (dark mode) / Moon icon (light mode) from lucide-react
  - [x] 2.4 Write property test for Property 1: theme toggle and persistence round-trip using fast-check

- [x] 3 Header Component
  - [x] 3.1 Create `Header` component with glassmorphism effect (`backdrop-blur-md bg-white/70 dark:bg-slate-900/70`) for desktop viewport
  - [x] 3.2 Add logo, navigation links (smooth scroll anchors), and `ThemeToggle` positioned top-right
  - [x] 3.3 Create `MobileNav` component with hamburger menu or sticky bottom navigation for mobile viewport

- [x] 4 Hero Section
  - [x] 4.1 Create `HeroSection` component with split-screen layout (desktop) and stacked layout (mobile)
  - [x] 4.2 Create `LiveStatusBadge` component that displays Open/Closed status with appropriate color coding
  - [x] 4.3 Add "Request a Quote" call-to-action button
  - [x] 4.4 Implement staggered fade-in animation using Framer Motion with `prefers-reduced-motion` support
  - [x] 4.5 Add hero image with `loading="lazy"` and descriptive alt text
  - [x] 4.6 Write property test for Property 2: LiveStatusBadge displays correct label for any CafeStatus

- [x] 5 Services Grid
  - [x] 5.1 Create `services` data array with 6 service objects (title, description, icon)
  - [x] 5.2 Create `ServiceCard` component displaying Lucide icon, title, and description with border and padding
  - [x] 5.3 Create `ServicesGrid` component rendering 6 cards in 3-column (desktop) / 1-column (mobile) layout
  - [x] 5.4 Add hover-lift animation (`whileHover={{ y: -4 }}`) and staggered viewport fade-in with Framer Motion
  - [x] 5.5 Write property test for Property 3: ServiceCard renders title and description for any Service
  - [x] 5.6 Write unit test verifying exactly 6 ServiceCard components are rendered

- [x] 6 Price Calculator
  - [x] 6.1 Create `priceConfig` data object with B&W and Color per-page prices
  - [x] 6.2 Create `PriceCalculator` component with print type selector (B&W / Color) and numeric page count input
  - [x] 6.3 Implement real-time price calculation as controlled component (no submit button)
  - [x] 6.4 Implement input validation: reject non-numeric, negative, and decimal values with inline error message
  - [x] 6.5 Write property test for Property 4: price calculation correctness for any valid print type and non-negative integer
  - [x] 6.6 Write property test for Property 5: invalid input rejection for any non-numeric/negative string
  - [x] 6.7 Write unit tests for edge cases: zero pages returns R0.00, empty string, whitespace, large numbers

- [x] 7 Testimonial Carousel
  - [x] 7.1 Create `testimonials` data array with client testimonial objects (name, text, optional rating/avatar)
  - [x] 7.2 Create `TestimonialCard` component displaying name, text, and optional rating/avatar
  - [x] 7.3 Create `TestimonialCarousel` component showing 1 card (mobile) / 3 cards (desktop) with swipe and arrow navigation
  - [x] 7.4 Write property test for Property 6: TestimonialCard renders name and text for any Testimonial

- [x] 8 Footer
  - [x] 8.1 Create `Footer` component with address ("38 Libertas Building"), WhatsApp link, email (info@stelliesicafe.com), and social media icon links
  - [x] 8.2 Implement responsive layout with semantic `<footer>` element
  - [x] 8.3 Write unit tests verifying footer contains address, email, and WhatsApp link

- [x] 9 Animations and Accessibility
  - [x] 9.1 Implement `prefers-reduced-motion` detection and disable/minimize non-essential animations when active
  - [x] 9.2 Ensure all animation durations are ≤ 500ms across all Framer Motion configs
  - [x] 9.3 Write property test for Property 7: all animation duration configs ≤ 0.5s
  - [x] 9.4 Write unit test verifying reduced-motion preference disables animations

- [x] 10 Performance and Accessibility
  - [x] 10.1 Add `loading="lazy"` to all `<img>` elements
  - [x] 10.2 Use semantic HTML elements: `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`
  - [x] 10.3 Add descriptive `alt` text to all images
  - [x] 10.4 Ensure all interactive elements (buttons, links, toggle) are keyboard-navigable with visible focus indicators
  - [x] 10.5 Write property test for Property 8: all rendered img elements have non-empty alt attribute
  - [x] 10.6 Write property test for Property 9: all theme color pairs meet 4.5:1 contrast ratio
  - [x] 10.7 Write unit tests for semantic HTML structure and lazy-loading attributes

- [x] 11 App Assembly and Final Integration
  - [x] 11.1 Create `App.tsx` composing all sections: ThemeProvider → Header → HeroSection → ServicesGrid → PriceCalculator → TestimonialCarousel → Footer
  - [x] 11.2 Add smooth scroll behavior for navigation anchor links
  - [x] 11.3 Verify full app renders without errors in both light and dark modes
