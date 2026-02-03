

# Portfolio Website - Streamlined Plan
## Technical & Modern Portfolio for Derick Grey

---

## Site Structure (5 Pages)

### 1. **Home**
- Bold hero with your headline: "Engineering Leader | .NET/JS Developer | People Empowerer"
- Prominent "Seeking Engineering Manager Roles" availability badge
- Quick impact stats (15+ years, teams of 30+, $4M exit, etc.)
- Featured snippets linking to other sections
- Dark/light mode toggle

### 2. **Experience & Impact**
- Interactive timeline of your career journey
- Each role shows: title, dates, key accomplishments with metrics
- Testimonials placed alongside relevant roles (social proof in context)
- **"The Pivot Story"** narrative section at the end - your corporate → entrepreneur → return journey with a brief mention of Inclusive Agile as a learning experience

### 3. **Writing & Ideas**
- **Featured at top**: TheoremOne article + spotlight on you
- **Leadership philosophy section**: Your values (radical candor, inclusion, systems thinking, empowerment)
- **Blog posts below** in three categories:
  - Leadership Lab
  - Code & Context  
  - AI-Assisted Engineering
- Category tabs/filters for easy browsing

### 4. **Current Work**
- Overview cards for your 3 fractional technical co-founder roles
- GitHub contribution visualization (activity heatmap)
- "Learning in Public" section - framing your POC/tutorial repos as growth
- Connects your current energy to the value you'd bring to a new org

### 5. **Contact**
- Clean contact form
- Direct links: LinkedIn, GitHub, email
- Availability status
- Optional: Calendar booking for conversations

---

## Design Direction

**Technical & Modern Aesthetic:**
- Dark mode default (with light mode toggle)
- Monospace fonts for headings - subtle "developer" feel
- Clean sans-serif body text
- Electric blue/purple accents
- Generous whitespace for scanability
- Terminal-inspired subtle decorative elements
- Fully responsive (recruiters browse on phones)

---

## Backend (Lovable Cloud)

**Database Tables:**
- `posts` - Blog content with title, content, category, publish date
- `testimonials` - Name, role, company, quote, associated experience
- `contacts` - Form submissions

**Admin Features:**
- Simple authentication for you
- Create/edit blog posts with markdown
- Manage testimonials
- View contact form submissions

---

## Key Components to Build

- `<Header />` - Navigation + theme toggle + availability badge
- `<Timeline />` - Career visualization
- `<RoleCard />` - Expandable experience details with testimonials
- `<PostCard />` - Blog post previews
- `<CategoryTabs />` - Filter writing by theme
- `<GitHubActivity />` - Contribution heatmap using Recharts
- `<ContactForm />` - Validated form with Supabase submission
- `<ThemeToggle />` - Dark/light mode switch

---

## Implementation Phases

**Phase 1: Foundation**
- Design system (colors, typography, dark mode)
- Layout components (Header, Footer, responsive nav)
- Home page with hero and stats

**Phase 2: Content Pages**
- Experience & Impact with timeline and testimonial slots
- Writing & Ideas with category structure
- Current Work with project cards
- Contact with form

**Phase 3: Backend**
- Lovable Cloud setup
- Database tables for posts, testimonials, contacts
- Admin authentication and simple CMS

**Phase 4: Dynamic Features**
- GitHub API integration for activity viz
- Blog post management
- Contact form → Supabase

**Phase 5: Polish**
- SEO meta tags
- Mobile responsiveness review
- Performance optimization
- Launch!

