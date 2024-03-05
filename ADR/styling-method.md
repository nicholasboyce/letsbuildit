# Architectural Decision Records (Styling)

## Context and Problem Statement
Styling in React feels... unnatural! I need an easy to understand, inspect, and debug styling method. It would be great to learn something new and flex my skills, but I'd also like to have something that isn't completely opposite to my current understanding of HTML -> CSS -> JS so that it doesn't negatively affect my productivity.

## Considered Options
- Styled Components
- Tailwind CSS
- Material UI
- CSS Modules

### Decision Outcome
CSS Modules.
Styled Components means inline styles.
CSS Modules seems to have an issue regarding the order build and application in Vite (and Webpack), however, at the moment it seems like it works for me, and so I'll be mindful of this. Tailwind can come for another project.
Material UI could be useful, but this project is meant to help understand me design and styling, and pre-styled components may not be as instructive.
