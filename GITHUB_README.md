# Nudge Digital - Marketing Website

A modern, high-performance marketing website for Nudge Digital, a digital marketing strategy and implementation agency. Built with React, TypeScript, Tailwind CSS 4, and tRPC.

## Features

- **Animated Hero Section** with liquid glass design and prominent CTAs
- **Full-Site Search** across services, pages, and resources
- **Comprehensive Services Page** organized into 5 strategic pillars
- **Interactive Calculator** showing time and cost savings
- **Pricing Page** with three value-based packages
- **How We Work** process page with animated steps
- **Client Success Stories** with case studies and testimonials
- **Resources Page** with filterable content
- **AI-Powered Chatbot** with liquid glass UI
- **Fully Responsive** mobile-first design
- **Accessibility** built-in with semantic HTML and ARIA labels

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS 4, Framer Motion
- **Backend**: Express 4, tRPC 11, Node.js
- **Database**: MySQL/TiDB with Drizzle ORM
- **Authentication**: Manus OAuth
- **Styling**: OKLCH color format, liquid glass effects, custom animations

## Project Structure

```
nudge_digital/
├── client/
│   ├── src/
│   │   ├── pages/              # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── HowWeWork.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Resources.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── Calculator.tsx
│   │   ├── components/         # Reusable components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── SearchModal.tsx
│   │   │   └── ChatBot.tsx
│   │   ├── App.tsx             # Main app and routing
│   │   ├── index.css           # Global styles and design system
│   │   └── lib/trpc.ts         # tRPC client setup
│   ├── index.html
│   └── public/                 # Static assets (favicon, robots.txt only)
├── server/
│   ├── routers.ts              # tRPC procedures
│   ├── db.ts                   # Database queries
│   └── _core/                  # Framework internals
├── drizzle/
│   └── schema.ts               # Database schema
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+
- MySQL/TiDB database

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables (already configured in Manus)
# DATABASE_URL, JWT_SECRET, OAUTH_SERVER_URL, etc. are pre-set

# Run migrations (if needed)
pnpm drizzle-kit generate
pnpm drizzle-kit migrate

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Content Editing Guide

### Editing Copy and Text Content

#### Home Page
- **File**: `client/src/pages/Home.tsx`
- **Edit these sections**:
  - Hero headline: Search for `"Your Digital Marketing..."` 
  - Hero subheadline: Search for `"We solve the technical..."`
  - Service cards: Update the `services` array with your service titles and descriptions
  - Testimonial quotes: Update the `testimonials` array

#### Services Page
- **File**: `client/src/pages/Services.tsx`
- **Edit these sections**:
  - Service pillar names: Located in the `servicePillars` array
  - Sub-service titles and descriptions: Update each pillar's `services` array
  - Technical tasks: Update the `technicalTasks` array for each service
  - Deliverables: Update the `deliverables` array
  - MarTech stack: Update the `martech` array

#### Pricing Page
- **File**: `client/src/pages/Pricing.tsx`
- **Edit these sections**:
  - Package names: Search for `"Diagnostic Audit"`, `"Strategic Implementer"`, `"Technical Sprint"`
  - Prices: Update the price ranges in each package card
  - Features: Update the `features` array for each package
  - FAQ items: Update the `faqItems` array

#### Contact / Send Us a Nudge Page
- **File**: `client/src/pages/Contact.tsx`
- **Edit these sections**:
  - Contact email: Search for `contact@nudgedigital.com`
  - Contact phone: Search for the phone number
  - Service dropdown options: Update the `services` array
  - Form labels and placeholders

#### How We Work Page
- **File**: `client/src/pages/HowWeWork.tsx`
- **Edit these sections**:
  - Step titles and descriptions: Update the `steps` array
  - Timeline text: Update descriptions for each step

#### About Us Page
- **File**: `client/src/pages/About.tsx`
- **Edit these sections**:
  - Mission statement: Search for `"We architect, implement..."`
  - Company values: Update the grid items with your values
  - Team information: Add team member details

#### Resources Page
- **File**: `client/src/pages/Resources.tsx`
- **Edit these sections**:
  - Resource cards: Update the `resources` array with your guides, case studies, and articles
  - Resource categories: Modify the `categories` array

#### Testimonials Page
- **File**: `client/src/pages/Testimonials.tsx`
- **Edit these sections**:
  - Case studies: Update the `caseStudies` array with real client stories
  - Client names, roles, and quotes
  - Metrics and results

#### Calculator Page
- **File**: `client/src/pages/Calculator.tsx`
- **Edit these sections**:
  - Pricing assumptions: Update `$85/hour` and `$8000/month` with your actual rates
  - Comparison benefits: Update the numbered list items

### Editing Design and Colors

#### Color Palette
- **File**: `client/src/index.css`
- **Edit these sections**:
  - Primary purple: Search for `oklch(0.623 0.214 259.815)` and update OKLCH values
  - Background colors: Update the `--background` CSS variable
  - Accent colors: Update the `--accent` CSS variable
  - All colors use OKLCH format (Lightness, Chroma, Hue)

#### Typography
- **File**: `client/src/index.css`
- **Edit these sections**:
  - Font family: Update the `@import` statement for Google Fonts
  - Font sizes: Modify Tailwind's `font-*` utilities in component files
  - Line heights: Update `leading-*` classes

#### Animations
- **File**: `client/src/index.css`
- **Edit these sections**:
  - Animation keyframes: Search for `@keyframes` to modify animation behavior
  - Animation duration: Update `duration-*` classes in components
  - Transition timing: Modify `transition-*` classes

### Editing Components

#### Header Navigation
- **File**: `client/src/components/Header.tsx`
- **Edit these sections**:
  - Navigation links: Update the `navLinks` array
  - Logo: Replace the logo image URL
  - Company name: Update `"Nudge Digital"`

#### Footer
- **File**: `client/src/components/Footer.tsx`
- **Edit these sections**:
  - Footer links: Update the `footerLinks` array
  - Social media links: Update the `socialLinks` array
  - Copyright text: Update the copyright year and company name
  - Contact information

#### Chatbot
- **File**: `client/src/components/ChatBot.tsx`
- **Edit these sections**:
  - Chatbot responses: Update the `generateChatResponse()` function
  - Initial greeting message: Update the first message in the `useState` hook
  - Response logic: Add more service-specific responses

### Adding New Pages

1. Create a new file in `client/src/pages/YourPage.tsx`
2. Import Header, Footer, and SearchModal components
3. Add the route to `client/src/App.tsx`:
   ```tsx
   import YourPage from "./pages/YourPage";
   
   // In the Router component:
   <Route path={"/your-page"} component={YourPage} />
   ```
4. Add navigation link in `client/src/components/Header.tsx`

### Adding New Services

1. Edit `client/src/pages/Services.tsx`
2. Add a new pillar object to the `servicePillars` array:
   ```tsx
   {
     id: 'new-pillar',
     name: 'Your Pillar Name',
     description: 'Description',
     icon: <YourIcon />,
     services: [
       {
         id: 'service-1',
         name: 'Service Name',
         description: 'Description',
         technicalTasks: ['Task 1', 'Task 2'],
         deliverables: ['Deliverable 1'],
         martech: ['Tool 1', 'Tool 2'],
       },
     ],
   }
   ```

### Updating Images and Media

**Important**: Do NOT store images in `client/public/` or `client/src/assets/`. This will cause deployment timeouts.

**Correct workflow**:
1. Upload images using: `manus-upload-file --webdev path/to/image.png`
2. Copy the returned CDN URL
3. Use the URL directly in your code:
   ```tsx
   <img src="https://cdn.../image.png" alt="Description" />
   ```
4. Store original files in `/home/ubuntu/webdev-static-assets/` (outside the project)

### Database Schema

#### Services Table (if needed)
```sql
CREATE TABLE services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pillar VARCHAR(100),
  name VARCHAR(200),
  description TEXT,
  tasks JSON,
  deliverables JSON,
  martech JSON,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Testimonials Table (if needed)
```sql
CREATE TABLE testimonials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  company VARCHAR(100),
  contact VARCHAR(100),
  role VARCHAR(100),
  quote TEXT,
  metric VARCHAR(200),
  rating INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Customization

### Changing Brand Colors

1. Open `client/src/index.css`
2. Find the `:root` selector
3. Update the OKLCH color values:
   - `--primary`: Main brand color
   - `--accent`: Highlight color (currently purple)
   - `--background`: Page background
   - `--foreground`: Text color

### Adding Custom Animations

1. Add keyframes in `client/src/index.css`:
   ```css
   @keyframes myAnimation {
     from { opacity: 0; }
     to { opacity: 1; }
   }
   ```
2. Add utility class:
   ```css
   .animate-my-animation {
     animation: myAnimation 0.6s ease-out;
   }
   ```
3. Use in components: `className="animate-my-animation"`

### Modifying Liquid Glass Effects

1. Edit `.glass-panel`, `.glass-card`, or `.glass-input` in `client/src/index.css`
2. Adjust these properties:
   - `background`: Opacity and color
   - `backdrop-filter`: Blur amount
   - `border`: Color and width
   - `box-shadow`: Shadow intensity

## API Integration

### tRPC Procedures

All backend logic goes in `server/routers.ts`. Example:

```typescript
export const appRouter = router({
  services: router({
    getAll: publicProcedure.query(async () => {
      // Fetch from database
      return db.getAllServices();
    }),
  }),
});
```

### Using in Components

```typescript
const { data: services } = trpc.services.getAll.useQuery();
```

## Deployment

### Building for Production

```bash
pnpm build
```

This creates optimized bundles in the `dist/` directory.

### Environment Variables

All required environment variables are automatically injected by Manus:
- `DATABASE_URL`
- `JWT_SECRET`
- `OAUTH_SERVER_URL`
- `VITE_APP_ID`
- `VITE_FRONTEND_FORGE_API_KEY`

No manual configuration needed.

## Performance Optimization

### Code Splitting

Pages are automatically code-split by the router. No additional configuration needed.

### Image Optimization

- Use WebP format when possible
- Compress images before uploading
- Use CDN URLs for all media

### Caching

- Static assets are cached by the CDN
- API responses are cached by tRPC's React Query integration
- Database queries use Drizzle's built-in caching

## Troubleshooting

### Build Errors

If you see CSS utility class errors:
1. Check that custom classes are defined in `client/src/index.css`
2. Ensure they are in the `@layer components` block
3. Restart the dev server: `pnpm dev`

### Search Not Working

The search uses mock data. To connect to a real backend:
1. Create a tRPC procedure in `server/routers.ts`
2. Update `SearchModal.tsx` to call the procedure
3. Implement search logic in the backend

### Chatbot Not Responding

The chatbot uses mock responses. To integrate with an LLM:
1. Create a tRPC procedure for chat in `server/routers.ts`
2. Use the `invokeLLM` helper from `server/_core/llm`
3. Update `ChatBot.tsx` to call the procedure

## Contributing

When making changes:
1. Test locally with `pnpm dev`
2. Build to check for errors: `pnpm build`
3. Update this README if you add new features or pages
4. Keep component files under 300 lines for readability

## Support

For questions or issues, contact the development team or create an issue in the repository.

## License

© 2026 Nudge Digital. All rights reserved.
