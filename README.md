# Frontend Project - Work Methodology

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Route-specific pages
├── styles/             # CSS stylesheets
├── scripts/            # JavaScript files
└── assets/             # Static assets
    ├── images/         # Image files
    └── icons/          # Icon files
public/                 # Public assets (served directly)
```

## Work Methodology

### File Organization Guidelines

#### `/src/components/`
- **Purpose**: Store reusable UI components
- **Naming**: Use PascalCase for component names
- **Structure**: Each component should have its own folder with:
  - `ComponentName.html` (if standalone)
  - `ComponentName.css` (component-specific styles)
  - `ComponentName.js` (component logic)
- **Example**:
  ```
  components/
  ├── Header/
  │   ├── Header.html
  │   ├── Header.css
  │   └── Header.js
  └── Button/
      ├── Button.html
      ├── Button.css
      └── Button.js
  ```

#### `/src/pages/`
- **Purpose**: Store route-specific pages
- **Naming**: Use kebab-case for page names
- **Structure**: Each page should have:
  - `page-name.html` (main page template)
  - `page-name.css` (page-specific styles)
  - `page-name.js` (page-specific logic)
- **Example**:
  ```
  pages/
  ├── home/
  │   ├── home.html
  │   ├── home.css
  │   └── home.js
  ├── about/
  │   ├── about.html
  │   ├── about.css
  │   └── about.js
  └── contact/
      ├── contact.html
      ├── contact.css
      └── contact.js
  ```

#### `/src/styles/`
- **Purpose**: Global stylesheets and style utilities
- **Files to include**:
  - `global.css` - Global styles and CSS reset
  - `variables.css` - CSS custom properties (colors, fonts, etc.)
  - `utilities.css` - Utility classes
  - `responsive.css` - Media queries and responsive design

#### `/src/scripts/`
- **Purpose**: Shared JavaScript utilities and modules
- **Files to include**:
  - `app.js` - Main application entry point
  - `router.js` - Client-side routing logic
  - `utils.js` - Utility functions
  - `api.js` - API calls and data handling

#### `/src/assets/`
- **Purpose**: Static assets
- **Organization**:
  - `images/` - All image files (jpg, png, svg, etc.)
  - `icons/` - Icon files and icon fonts

#### `/public/`
- **Purpose**: Files served directly by the web server
- **Contents**: 
  - `index.html` - Main HTML entry point
  - `favicon.ico`
  - Any other static files that need direct access

## Development Workflow

### 1. Creating New Pages
1. Create folder in `/src/pages/[page-name]/`
2. Add required files: `[page-name].html`, `[page-name].css`, `[page-name].js`
3. Update routing logic in `/src/scripts/router.js`
4. Link styles and scripts in main `index.html`

### 2. Creating Reusable Components
1. Create folder in `/src/components/[ComponentName]/`
2. Add component files with consistent naming
3. Import/include component in pages where needed
4. Document component usage and props

### 3. Styling Guidelines
- Use CSS custom properties for consistent theming
- Follow BEM methodology for CSS class naming
- Keep component styles scoped to avoid conflicts
- Use mobile-first responsive design approach

### 4. JavaScript Organization
- Use ES6 modules for better code organization
- Keep page-specific logic in page files
- Share common functionality through utility modules
- Implement proper error handling and validation

### 5. Asset Management
- Optimize images before adding to `/assets/images/`
- Use appropriate image formats (WebP for modern browsers)
- Organize assets by feature or page when necessary
- Use relative paths for better portability

## Naming Conventions

- **Files**: kebab-case (`user-profile.html`)
- **Components**: PascalCase (`UserProfile`)
- **CSS Classes**: BEM methodology (`.component__element--modifier`)
- **JavaScript Variables**: camelCase (`userName`)
- **JavaScript Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

## Best Practices

1. **Modular Development**: Keep files small and focused on single responsibility
2. **Consistent Structure**: Follow the established folder structure
3. **Documentation**: Comment complex logic and document component APIs
4. **Performance**: Optimize assets and minimize HTTP requests
5. **Accessibility**: Follow WCAG guidelines for accessible web development
6. **Cross-browser Compatibility**: Test across different browsers and devices