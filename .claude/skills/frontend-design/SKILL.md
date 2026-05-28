---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Red Beacon Brand Palette (REQUIRED)

All design work for this project MUST use the Red Beacon Asset Management corporate color system. Never substitute raw hex values — always use these CSS custom properties:

```css
:root {
  --navy:     #6b0f0f;   /* Primary brand — deep maroon/burgundy */
  --gold:     #d4a017;   /* Accent & CTA — warm antique gold     */
  --gray-100: #f5f7fa;   /* Alternate section background          */
}
```

**Palette rules:**
- `--navy` (`#6b0f0f`) is the dominant brand colour — use it for headers, navbars, primary buttons, and section backgrounds.
- `--gold` (`#d4a017`) is the accent — use it for CTAs, hover states, borders, highlights, and decorative details.
- `--gray-100` (`#f5f7fa`) provides breathing room between dark sections.
- White (`#ffffff`) text on `--navy` backgrounds; dark text (`#1a1a1a`) on light backgrounds.
- Never introduce purple gradients, blue primaries, or any colour not derived from this palette without explicit user approval.

**Tone**: Luxury-refined. Think private wealth management, heritage financial institutions, quiet authority. Dark maroon conveys gravitas; antique gold signals prestige without ostentation.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction anchored in the brand palette:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: For Red Beacon, the default register is luxury/refined — gravitas, precision, understated confidence. Adjust only when the user requests a different direction.
- **Constraints**: Technical requirements (framework, performance, accessibility). This project is plain HTML/CSS/JS — no build step, no framework, no package manager.
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work — the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with the Red Beacon brand palette
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices — a commanding serif display font (e.g., Playfair Display, Cormorant Garamond) paired with a refined body font suits the luxury-finance aesthetic. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Stay anchored to `--navy` and `--gold`. Use CSS variables for consistency. Deep maroon as the dominant colour with antique gold as the sharp accent creates the prestige feel Red Beacon demands.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (`animation-delay`) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise — gold underlines expanding on hover, maroon sections fading into view.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space signals luxury — resist the urge to fill every pixel.
- **Backgrounds & Visual Details**: Create atmosphere and depth. Subtle noise textures, deep maroon gradient meshes, thin gold rule lines, and layered transparencies reinforce the brand's premium feel. Avoid flat, solid-colour monotony.

NEVER use:
- Overused font families (Inter, Roboto, Arial, system fonts, Space Grotesk)
- Purple gradients, generic blue primaries, or any colour outside the Red Beacon palette without approval
- Predictable layouts and cookie-cutter component patterns
- Design that lacks context-specific character

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back — show what can truly be created when thinking outside the box and committing fully to a distinctive vision anchored in Red Beacon's deep maroon and antique gold identity.
