export const SYSTEM_PROMPT = `
You are an expert HR recruiter performing precise candidate-to-job matching and ATS (Applicant Tracking System) optimization analysis.
Analyze the provided job advertisement and candidate CV (both in Markdown).

Key ATS factors to evaluate:
- Keyword matching: How well the CV incorporates exact skills, tools, qualifications, and phrases from the job ad (naturally, not stuffed).
- Formatting & parsability: Standard Markdown headings (e.g., # Name, ## Experience, ## Skills), no tables/graphics implied, clear sections.
- Structure: Presence of key sections (Contact, Summary, Experience, Skills, Education), reverse-chronological order, quantifiable achievements.
- Common red flags: Unconventional headings, missing keywords, lack of metrics, overly complex layout hints.

Respond EXCLUSIVELY with valid JSON in this exact structure (no extra text, no markdown fencing):

{
  "overallSuitabilityPercentage": number, // 0-100 overall fit for the role, TECHNICAL SKILLS match are most important to match, others follows
  "overallSuitabilityReason": string, // 1-2 sentences
  "matchingCriteria": [
    {
      "criterion": string, // key requirement from job,
      "matchLevel": "Full" | "Partial" | "None",
      "evidenceFromCV": string // quote/summary or "Not mentioned"
    }
  ],
  "missingCriteria": string[], // focus on TECHNICAL SKILLS gaps & experience,
  "atsCompatibilityPercentage": number, // 0-100 estimated ATS pass & rank score, TECHNICAL SKILLS match are most important to match, others follows
  "atsCompatibilityReason": string, // 1-2 sentences summary
  "atsStrengths": string[], // e.g., "Strong keyword overlap", "Clear standard sections"
  "atsIssues": string[], // e.g., "Missing key skills '<List the missing key skills>'" | "Lackings in technicall skills" | "No quantifiable achievements" | "Unconventional section headings"
  "pointerForRecruiter": string, // preliminary suggestable action for the recruiter
  "pointerForCandidate": string // tell how candidate can improve to score better for the job
}

Be objective, evidence-based, and concise. Estimate percentages realistically:
- ATS >80%: Excellent parsing + strong keyword match
- ATS 60-80%: Good but some improvements needed
- ATS <60%: Likely filtered out early
- Do not prettify the JSON.
- Do not add extra text outside the JSON.
`;

export const CV_MARKDOWN = `# Majedul Hoque
**Senior Software Developer & Frontend Architect**
**Location**: Vantaa, Finland  | **e-mail**: rumanbsl@gmail.com
[LinkedIn](https://www.linkedin.com/in/rumanhuq/) | [Github](https://github.com/rumanHuq)

### PROFESSIONAL SUMMARY
Senior Software Developer with **9 years of experience** architecting high-traffic, real-time applications and enterprise solutions. Expert in **Modern JavaScript/TypeScript**, **React**, and **React Native**, with a unique background combining 85% technical engineering with 15% business strategy. Currently expanding architectural expertise into **Generative AI integration**, utilizing **Vercel AI SDK**, **RAG**, and **Vector Embeddings** to build intelligent, context-aware user interfaces. Proven track record of leading technical teams and delivering MVPs for major clients (DNA, SOK).

---

### TECHNICAL SKILLS
* **Languages:** TypeScript, JavaScript (ES6+), HTML5, CSS3, SAAS, Rust, Dart, Java.
* **Frontend Frameworks:** React, React Native, Next.js, Gatsby, Vue.js, AngularJS.
* **State Management & Data:** Redux, Zustand, React Query, Apollo GraphQL, RxJS, Vuex.
* **Backend & Cloud:** Node.js, Express.js, HonoJS, MongoDB, PostgreSQL, gRPC, Docker, Azure (Fundamentals), AWS.
* **AI & LLM Engineering:** Vercel AI SDK, RAG (Retrieval-Augmented Generation), Vector Embeddings, Ollama, LLM Integration.
* **Testing & Tooling:** Jest, Cypress, Playwright, Storybook, Webpack, Vite, Git, CI/CD (GitLab/Bitbucket).
* **Methodologies:** Agile, Scrum (SAFe® 6 Certified), Kanban, TDD, Design Systems.

---

### PROFESSIONAL EXPERIENCE

#### **Tietoevry** | *Senior Software Engineer*
**Flow Festival mobile application** |  | *Jan 2025 – Dec 2025*
* **Architecture & Rebuild:** Led the architecture and implementation of key application modules, significantly improving app stability and performance metrics (e.g., reducing crash rates by $35%$ during peak usage).
* **Real-Time Features:** Developed and optimized complex real-time features, including personalized schedules, live push notifications, and geolocation-based services (map navigation).
* **High-Volume Stability:** Managed state and data synchronization for an application designed to handle thousands of concurrent users during a major public event, utilizing robust state management and efficient data throttling.
* **Deployment Excellence:** Managed the full app lifecycle through CI/CD pipelines, ensuring timely delivery and quality assurance for both iOS and Android stores prior to the festival launch.

**Client: DNA (Telecom)** | *Nov 2023 – Jan 2025*
* **Architected the Frontend:** Designed and built a scalable B2B mobile application using **React Native** and **TypeScript**, enabling organizations to manage employee subscriptions and monitor usage in real-time.
* **MVP Delivery:** Successfully delivered a performant Minimum Viable Product (MVP) within a strict six-month deadline, securing approval for continued feature expansion.
* **Feature Implementation:** Developed critical features including secure authentication, invoice generation, and service structure synchronization via RESTful APIs.
* **Code Quality & Leadership:** Established a unified codebase for iOS and Android, conducted rigorous code reviews, and managed task tracking via JIRA to ensure strict adherence to Agile principles.

**Client: Tuska Festival** | *Feb 2023 – Jun 2023*
* **Mobile Development:** Developed a cross-platform mobile app for the Tuska Festival using **React Native**, providing real-time event updates, artist schedules, and notifications.
* **Performance Optimization:** Integrated live data synchronization via RESTful APIs, ensuring high performance during peak festival traffic.
* **Team Leadership:** Contributed to sprint planning, trained junior developers, and enforced code quality standards through reviewing and mentoring.

#### **The Qt Company** | *Senior Software Engineer*
*Feb 2022 – Sep 2022*
* **No-Code Platform Development:** Led the engineering of a real-time collaborative no-code platform, allowing users to visually build UIs in the browser and compile them into deployable Flutter mobile apps.
* **Complex Architecture:** Designed a **TypeScript/React** WYSIWYG canvas capable of synchronizing live design changes with mobile builds using a **gRPC-powered** backend with **Rust**.
* **Team Management:** Led an engineering team (including outsourced developers) through the full lifecycle from ideation and research to MVP delivery.
* **Innovation:** Conducted in-depth research on Flutter’s compilation model to validate the technical feasibility of visual-to-mobile deployment.

#### **SOK** | *Senior Software Developer / Frontend Architect*
**Project: Raflaamo (Restaurant Indexing Service)** | *Aug 2020 – Sep 2022*
* **Frontend Architecture:** Modernized the *Raflaamo.fi* platform using **GatsbyJS**, **Next.js**, and **GraphQL**, significantly improving SEO, accessibility, and page load speeds.
* **Developer Experience (DX):** Established sustainable engineering practices by introducing a shared style guide, enforcing linting standards, and automating workflows.
* **Collaboration:** Worked closely with Product Owners and Designers to translate business goals into technical requirements, utilizing Kanban for efficient sprint management.
* **Mentorship:** Acted as a key mentor for junior developers, conducting code reviews and guiding the team on React best practices.

#### **Feedbackly Oy** | *Fullstack Developer*
*Jul 2017 – Aug 2020*
* **SaaS Development:** Developed a Customer Experience (CX) platform using a microservices backend (**Node.js, MongoDB**) and a composable frontend (**Vue.js, React**).
* **Microservices Orchestration:** Designed and updated the microservice architecture for upcoming product features, ensuring scalability and ease of integration.
* **DevOps & Automation:** Solely responsible for setting up the local development environment, Docker containerization, and automation tools, reducing onboarding time for new engineers.
* **API Development:** Built robust RESTful APIs to support mobile and web touchpoints for analyzing customer feedback.

---

### CERTIFICATIONS
* **AWS Certified Solutions Architect – Associate** (May 2025)
* **SAFe® 6 Scrum Master (SSM)** (Dec 2023)
* **Microsoft Certified: Azure Fundamentals (AZ-900)** (Jul 2023)

---

### EDUCATION
**Bachelor of Business Administration (BBA) - Business Information Technology**
*Lapland University of Applied Science* | *2013 – 2017*
`;
