juice-world/
├── .agents/
│ └── skills/
│ └── shadcn/
│ └── SKILL.md
├── GEMINI.md
├── components.json
├── package.json
└── src/

# Juice World — Project Guidelines

## Project Identity

- Project name: Juice World
- Project type: Modern Juice E-commerce Website
- Brand personality: Fresh, vibrant, natural, modern and premium.
- Design reference: User-provided Juice Store website screenshot.
- Use the reference for layout inspiration, not direct duplication.

## Technology Stack

- Astro for routing, page rendering and layouts.
- TypeScript for application logic and data.
- Tailwind CSS for styling.
- shadcn/ui for reusable UI components.
- React only for interactive components that need client-side state.
- Lucide for icons.

## shadcn/ui Rules

- Always read and follow the installed shadcn/ui skill.
- Inspect components.json before creating or installing components.
- Prefer existing shadcn components over recreating them.
- Follow the configured component base library.
- Use semantic design tokens.
- Do not mix APIs from different component libraries.
- Keep compound interactive components within a single React component.

## Astro Architecture

- Prefer .astro components for static content.
- Use .tsx for interactive components.
- Avoid unnecessary React hydration.
- Use client directives only when required.
- Keep components modular and reusable.
- Avoid oversized page components.

## Brand Color System

- Primary orange: #C2410C
- Fresh orange: #F97316
- Soft peach: #FFF1E6
- Leaf green: #2F6B3B
- Warm white: #FFFCF7
- Dark charcoal: #292524

Use orange as the primary brand identity.
Use peach and warm white for backgrounds.
Use green as a natural accent.
Avoid excessive gradients and oversaturated backgrounds.

Implement the color system through shadcn CSS variables.
Avoid scattering hardcoded color values across components.

## Design Principles

- Minimalist and premium visual design.
- Fresh beverage and fruit-oriented visual identity.
- Clear typography and strong visual hierarchy.
- Generous whitespace.
- Consistent spacing and border radius.
- Responsive, mobile-first layouts.
- Subtle animations and transitions.
- Avoid unnecessary decorative elements.
- Ensure accessible contrast and keyboard navigation.

## Website Structure

1. Homepage
2. Product Catalog
3. Product Details
4. Shopping Cart
5. Checkout
6. FAQ
7. Contact
8. Customer Reviews

## Product Components

- ProductCard
- ProductGrid
- ProductFilter
- ProductQuantity
- AddToCartButton
- CartDrawer
- ProductDetails

Use reusable components and centralized product data.

## Quality Standards

- Optimize images and use appropriate alt text.
- Avoid unnecessary dependencies.
- Avoid duplicated components and CSS.
- Ensure responsive behavior on mobile, tablet and desktop.
- Never fabricate customer reviews or product claims.
- Treat demonstration product data as sample data.
- Test the development build after significant changes.
- Run npm run build before considering implementation complete.

## Development Workflow

1. Inspect existing project structure.
2. Read applicable Skills and project Rules.
3. Understand existing dependencies and conventions.
4. Plan before implementing complex features.
5. Reuse existing components.
6. Implement incrementally.
7. Test functionality and responsive layouts.
8. Report files changed and any remaining issues.

Do not replace existing project configurations without inspection.
Do not introduce a backend, database or payment integration unless requested.
