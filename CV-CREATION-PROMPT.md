Act as a career coach. Keep the structure. Only focus on text content. Alter the Experience, and Skills sections on top of Base experience section based on the AST score. Alter other sections where it is indicated, Provide a raw markdown keeping the structure intact and alter with revisions. Do not leave anything

**Avoid**
- Do not change formats
- Do not change headings
- Do not bolden text content except where it's given
- Do not update experience section if my base skills section does not match the job criteria

**Input files:**
* **AST Score:** `ast_score.json`
* **Job Description:** `linkedInJobPageMarkdown.md`

**Output:**
 updated-resume.md

**Base Skills*
```md
- **Languages:** TypeScript, JavaScript (ES6+), Rust, Go (Golang)
- **Frontend:** React, Next.js, Gatsby, Vue.js, React Native
- **Backend **& Databases: Node.js, Express.js, HonoJS, PostgreSQL, MySQL, MongoDB, gRPC
- **Cloud **& DevOps: AWS, Docker, CI/CD (GitLab/Bitbucket/Github_actions)
- **AI/**ML & Generative Tools: GitHub Copilot, AI-driven code generation, Ollama, Vercel AI
- **Testing **& Tooling: Jest, Cypress, Storybook, Webpack, Vite, Git, Postman, VSCode
- **Methodologies:** Agile (SAFe® 6 Certified), Scrum, Kanban, TDD, Design Systems
```

**Base Experience**
```md
## **Experience**

**Senior Software Developer - Consultant**
: **Tieto Oyj**
: **Feb 2023 – Dec 2025**

<br>

**Client: Flow Festival mobile application** | Feb 2025 – Dec 2025
- Architecture & Rebuild: Led the architecture and implementation of key application modules, significantly improving app
stability and performance (e.g., reducing crash rates during peak usage).
- Real-Time Features: Developed and optimized complex real-time features including personalized schedules, live push
notifications, and geolocation-based services.
- High-Volume Stability: Managed state and data synchronization for an application handling thousands of concurrent users,
utilizing robust state management and efficient data throttling.
- Deployment Excellence: Managed the full app lifecycle through CI/CD pipelines (GitLab/Bitbucket), ensuring timely delivery
to iOS and Android stores.

**Client: DNA (Telecom)** | Nov 2023 – Jan 2025
- Architected the Frontend: Designed and built a scalable B2B mobile application using React Native and TypeScript.
- MVP Delivery: Successfully delivered a performant Minimum Viable Product (MVP) within a strict six-month deadline.
- Feature Implementation: Developed critical features including secure authentication, invoice generation, and service
structure synchronization via RESTful APIs and SQL database integrations.
- Code Quality & Leadership: Established a unified codebase, conducted rigorous code reviews, and managed task tracking via
JIRA with strict adherence to Agile principles.

**Client: Tuska Festival** | Feb 2023 – Oct 2023
- Mobile Development: Developed a cross-platform mobile app using React Native, providing real-time event updates and
- Performance Optimization: Integrated live data synchronization via RESTful APIs, ensuring high performance during peak
- Team Leadership: Contributed to sprint planning, trained junior developers, and enforced code quality standards.

---
<br><br><br><br><br>

**Senior Software Engineer**
: **The Qt Company**
: **Feb 2022 – Sep 2022**

- No-Code Platform Development: Led engineering of a real-time collaborative no-code platform, compiling visual UIs into
deployable Flutter apps.
- Complex Architecture: Designed a TypeScript/React WYSIWYG canvas synchronized with a gRPC-powered backend, applying
Object-Oriented Programming principles for reusable UI components.
- Team Management: Led an engineering team through the full lifecycle from ideation to MVP delivery.

---
<br>

**Senior SW / Frontend Architect**
: **SOK**
: **Aug 2020 – Sep 2022**
- Frontend Architecture: Modernized the Raflaamo.fi platform using GatsbyJS, Next.js, and GraphQL, significantly improving
SEO, accessibility, and page load speeds with a focus on W3C standards and cross-browser compatibility.
- Developer Experience (DX): Established sustainable engineering practices by introducing a shared style guide, enforcing
linting standards, and automating workflows.
- Collaboration: Worked closely with Product Owners and Designers to translate business goals into technical requirements,
utilizing Kanban for efficient sprint management.
- Mentorship: Acted as a key mentor for junior developers, conducting code reviews and guiding the team on React best
practices.

---
<br>

**Fullstack Developer**
: **Feedbackly Oy**
: **Jul 2017 – Aug 2020**

- SaaS Development: Developed a Customer Experience (CX) platform using a microservices backend (Node.js, MongoDB,
PostgreSQL) and a composable frontend (Vue.js, React).
- Microservices Orchestration: Designed and updated the microservice architecture for upcoming product features, ensuring
scalability and ease of integration.
- DevOps & Automation: Solely responsible for setting up the local development environment, Docker containerization, and
automation tools, reducing onboarding time for new engineers.
- API Development: Built robust RESTful APIs to support mobile and web touchpoints for analyzing customer feedback.
```

**Output Format:**

```md

# Majedul Hoque

<span class="iconify" data-icon="tabler:brand-linkedin"></span> [linkedin.com/in/rumanHuq](https://linkedin.com/in/rumanHuq/)
  : <span class="iconify" data-icon="tabler:brand-github"></span> [github.com/rumanHuq](https://github.com/rumanHuq)
  : <span class="iconify" data-icon="tabler:mail"></span> [rumanbsl@gmail.com](mailto:rumanbsl@gmail.com)

## **About Me**
[Revised text incorporating Warsaw relocation, Finnish citizenship/EU work eligibility, and relevant JD keywords]


## **Skills**
- **Languages:** [Revised list]
- **Frontend Frameworks:** [Revised list]
- **State Management & Data:** [Revised list]
- **Backend, Databases & Cloud:** [Revised list]
- **Security & Analytics:** [Revised list]
- **Testing & Tooling:** [Revised list]
- **Methodologies:** [Revised list]
- **Additional Tools:** [Revised list]


## Experience

**Senior Software Developer - Consultant**
: **Tieto Oyj**
: **Feb 2023 – Dec 2025**

<br>

**Client: Flow Festival mobile application** | Feb 2025 – Dec 2025
- [Revised bullet point]
- [Revised bullet point]
- [Revised bullet point]
- [Revised bullet point]


**Client: DNA (Telecom)** | Nov 2023 – Jan 2025
- [Revised bullet point]
- [Revised bullet point]
- [Revised bullet point]
- [Revised bullet point]


**Client: Tuska Festival** | Feb 2023 – Oct 2023
- [Revised bullet point]
- [Revised bullet point]
- [Revised bullet point]

---
<br><br><br><br><br>

**Senior Software Engineer**
: **The Qt Company**
: **Feb 2022 – Sep 2022**
- [Revised bullet point]
- [Revised bullet point]
- [Revised bullet point]

---
<br>

**Senior SW / Frontend Architect**
: **SOK**
: **Aug 2020 – Sep 2022**
- [Revised bullet point]
- [Revised bullet point]
- [Revised bullet point]
- [Revised bullet point]

---
<br>

**Fullstack Developer**
: **Feedbackly Oy**
: **Jul 2017 – Aug 2020**
- [Revised bullet point]
- [Revised bullet point]
- [Revised bullet point]
- [Revised bullet point]

## **Education**
**BBA in Business Information Technology**
: **2013 – 2017**

Lapland University of Applied Science
: Tornio, Finland

## **Certifications**
* **AWS Certified Solutions Architect – Associate**
  : May 2025

* **SAFe® 6 Scrum Master (SSM)**
  : Dec 2023
* **Microsoft Certified: Azure Fundamentals (AZ-900)**
  : Jul 2023

```
