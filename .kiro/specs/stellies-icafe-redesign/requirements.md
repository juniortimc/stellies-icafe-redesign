# Requirements Document

## Introduction

This document defines the requirements for a full redesign of stelliesicafe.com into a modern, high-performance, responsive React web application. The redesign prioritizes a professional, minimalist "tech hub" aesthetic using a branded "Stellies Green" (#009933) color palette with full Light/Dark Mode support. The application will use Tailwind CSS for styling, Framer Motion for animations, and follow a mobile-first responsive design approach.

## Glossary

- **Web_App**: The stelliesicafe.com React-based single-page web application
- **Hero_Section**: The top-most visual section of the landing page featuring cafe imagery, status badge, and call-to-action
- **Services_Grid**: A responsive card-based grid layout displaying the six core service offerings
- **Price_Calculator**: An interactive JavaScript-based tool for estimating printing costs
- **Testimonial_Carousel**: A swipeable slider component displaying client testimonials
- **Theme_Toggle**: A sun/moon icon button in the header that switches between Light Mode and Dark Mode
- **Live_Status_Badge**: A visual indicator displaying the cafe's current Open or Closed status
- **Glassmorphism_Header**: A semi-transparent, blurred-background navigation header used on desktop viewports
- **Footer**: The bottom section of the page containing contact information, address, and social links
- **Service_Card**: An individual bordered card within the Services_Grid representing one service offering
- **Light_Mode**: The default color theme using light backgrounds and dark text
- **Dark_Mode**: An alternate color theme using slate-based dark backgrounds and light text
- **Mobile_Viewport**: Screen widths below 768px
- **Desktop_Viewport**: Screen widths at or above 1024px

## Requirements

### Requirement 1: Application Architecture

**User Story:** As a developer, I want the application built with React and Tailwind CSS using modular components, so that the codebase is maintainable and scalable.

#### Acceptance Criteria

1. THE Web_App SHALL be built using React as the UI framework and Tailwind CSS as the styling system
2. THE Web_App SHALL use Framer Motion as the animation library for all motion effects
3. THE Web_App SHALL use Lucide-react as the icon library for all service and UI icons
4. THE Web_App SHALL organize UI elements into modular, reusable React components with each component in a separate file
5. THE Web_App SHALL lazy-load all image assets using native browser lazy loading or equivalent React techniques

### Requirement 2: Responsive Layout

**User Story:** As a user, I want the website to adapt to my device screen size, so that I have an optimal viewing experience on mobile, tablet, and desktop.

#### Acceptance Criteria

1. WHILE the screen width is within Mobile_Viewport, THE Web_App SHALL render content in a single-column layout
2. WHILE the screen width is within Desktop_Viewport, THE Web_App SHALL render the Services_Grid in a 3-column layout with generous white space
3. WHILE the screen width is within Mobile_Viewport, THE Web_App SHALL display either a sticky bottom navigation bar or a hamburger menu for navigation
4. WHILE the screen width is within Desktop_Viewport, THE Web_App SHALL display the Glassmorphism_Header with a semi-transparent blurred background effect

### Requirement 3: Theme Support

**User Story:** As a user, I want to switch between light and dark color themes, so that I can use the website comfortably in different lighting conditions.

#### Acceptance Criteria

1. THE Web_App SHALL support both Light_Mode and Dark_Mode color themes
2. THE Web_App SHALL use "Stellies Green" (#009933) as the primary brand color in both themes
3. THE Web_App SHALL use a slate-based color palette for Dark_Mode backgrounds and surfaces
4. THE Theme_Toggle SHALL be positioned in the top-right area of the header
5. THE Theme_Toggle SHALL display a sun icon in Dark_Mode and a moon icon in Light_Mode
6. WHEN the user activates the Theme_Toggle, THE Web_App SHALL switch between Light_Mode and Dark_Mode without a full page reload
7. THE Web_App SHALL persist the selected theme preference across browser sessions using local storage

### Requirement 4: Hero Section

**User Story:** As a visitor, I want to see an engaging hero section when I land on the page, so that I immediately understand what Stellies iCafe offers and whether it is currently open.

#### Acceptance Criteria

1. WHILE the screen width is within Desktop_Viewport, THE Hero_Section SHALL display a split-screen layout with cafe imagery on the left and text content on the right
2. WHILE the screen width is within Mobile_Viewport, THE Hero_Section SHALL stack the imagery above the text content in a single column
3. THE Hero_Section SHALL display the Live_Status_Badge indicating the cafe's current Open or Closed status
4. THE Hero_Section SHALL display a primary call-to-action button labeled "Request a Quote"
5. THE Hero_Section SHALL use clean, readable typography for all text elements
6. WHEN the Hero_Section loads, THE Web_App SHALL apply a staggered fade-in animation to the hero content elements using Framer Motion

### Requirement 5: Services Grid

**User Story:** As a visitor, I want to see all available services displayed in an organized grid, so that I can quickly find the service I need.

#### Acceptance Criteria

1. THE Services_Grid SHALL display exactly six Service_Card components for: Document Services (Printing/Scanning), ID/Visa Photos, PC Usage and Gaming, PSIRA Renewals, Courier Services, and Skillwise Computer Training
2. EACH Service_Card SHALL display a relevant Lucide-react icon, a service title, and a brief description
3. EACH Service_Card SHALL have a visible border and consistent padding
4. WHEN the user hovers over a Service_Card, THE Service_Card SHALL apply a subtle lift animation using Framer Motion
5. WHEN the Services_Grid enters the viewport, THE Web_App SHALL apply a staggered fade-in animation to the Service_Card components using Framer Motion
6. WHILE the screen width is within Desktop_Viewport, THE Services_Grid SHALL arrange Service_Card components in a 3-column layout
7. WHILE the screen width is within Mobile_Viewport, THE Services_Grid SHALL arrange Service_Card components in a single-column layout

### Requirement 6: Price Calculator

**User Story:** As a customer, I want to estimate printing costs before visiting the cafe, so that I can budget accordingly.

#### Acceptance Criteria

1. THE Price_Calculator SHALL provide a selection input for choosing between "B&W" and "Color" print types
2. THE Price_Calculator SHALL provide a numeric input field for entering the number of pages
3. WHEN the user selects a print type and enters a page count, THE Price_Calculator SHALL display the calculated total price
4. IF the user enters a non-numeric or negative value for page count, THEN THE Price_Calculator SHALL display a validation message and not calculate a price
5. IF the user enters zero as the page count, THEN THE Price_Calculator SHALL display a total price of zero
6. THE Price_Calculator SHALL update the displayed price in real time as the user changes inputs without requiring a submit action

### Requirement 7: Testimonial Carousel

**User Story:** As a visitor, I want to read client testimonials, so that I can build trust in the cafe's services.

#### Acceptance Criteria

1. THE Testimonial_Carousel SHALL display client testimonial cards in a horizontally swipeable slider
2. WHILE the screen width is within Mobile_Viewport, THE Testimonial_Carousel SHALL display one testimonial card at a time
3. WHILE the screen width is within Desktop_Viewport, THE Testimonial_Carousel SHALL display three testimonial cards simultaneously
4. EACH testimonial card SHALL display the client's name, testimonial text, and an optional rating or avatar
5. THE Testimonial_Carousel SHALL support touch-based swipe gestures on mobile devices
6. THE Testimonial_Carousel SHALL support click-based or arrow-based navigation on desktop devices

### Requirement 8: Footer

**User Story:** As a visitor, I want to find contact information and social links in the footer, so that I can reach the cafe through my preferred channel.

#### Acceptance Criteria

1. THE Footer SHALL display the cafe address as "38 Libertas Building"
2. THE Footer SHALL display a clickable WhatsApp link that opens a WhatsApp conversation with the cafe
3. THE Footer SHALL display the email address as info@stelliesicafe.com
4. THE Footer SHALL display social media icon links
5. THE Footer SHALL use a minimalist layout with consistent spacing
6. THE Footer SHALL be fully responsive across Mobile_Viewport and Desktop_Viewport

### Requirement 9: Animations and Micro-Interactions

**User Story:** As a visitor, I want smooth, subtle animations throughout the site, so that the experience feels polished and modern.

#### Acceptance Criteria

1. THE Web_App SHALL use Framer Motion for all animation effects
2. THE Web_App SHALL apply staggered fade-in animations to content sections as they enter the viewport
3. THE Web_App SHALL apply subtle hover-lift effects to interactive card elements
4. THE Web_App SHALL ensure all animations complete within 500 milliseconds to maintain perceived performance
5. WHEN a user has enabled reduced-motion preferences in their operating system, THE Web_App SHALL disable or minimize all non-essential animations

### Requirement 10: Performance and Accessibility

**User Story:** As a user, I want the website to load quickly and be accessible, so that I can use it effectively regardless of my device or abilities.

#### Acceptance Criteria

1. THE Web_App SHALL lazy-load all images using the loading="lazy" attribute or equivalent React technique
2. THE Web_App SHALL use semantic HTML elements for all content sections (header, main, nav, section, footer)
3. THE Web_App SHALL provide appropriate alt text for all images
4. THE Web_App SHALL ensure all interactive elements are keyboard-navigable
5. THE Web_App SHALL maintain a minimum color contrast ratio of 4.5:1 for normal text against background colors in both Light_Mode and Dark_Mode
6. THE Web_App SHALL render the initial visible content within 3 seconds on a standard 4G mobile connection
