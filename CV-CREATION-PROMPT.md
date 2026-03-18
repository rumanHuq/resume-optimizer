Act as a career coach. Alter the provided CV as markdown text based on the AST score. Do not modify any elements. Do not modify the structure. Only focus on text content. In the "About Me" section, explicitly mention that the candidate has **relocated to Warsaw** and holds **Finnish citizenship**, ensuring full legal eligibility to work within the **EU**.

**Inputs:**

* **AST Score:** `ast_score-moss.md`
* **Candidate CV:** `cvMarkDown-moss`
* **Job Description:** `linkedInJobPageMarkdown-moss.md`

**Output Format:**

```md
---
name: Majedul Hoque
header:
  - text: |
      <span style="font-size: 1.2em; font-weight: bold;">Applying for: [Revised Job position]</span>
  - text: <span class="iconify" data-icon="charm:person"></span>rumanHuq.com
    newLine: true
    link: https://rumanhuq.github.io/
  - text: <span class="iconify" data-icon="tabler:mail"></span> rumanbsl@gmail.com
    link: mailto:rumanbsl@gmail.com
  - text: <span class="iconify" data-icon="tabler:brand-github"></span> GitHub
    link: https://github.com/Renovamen
  - text: <span class="iconify" data-icon="tabler:brand-linkedin"></span> LinkedIn
    link: https://linkedin.com/in/rumanHuq/
---

## About Me
[Revised text incorporating Warsaw relocation, Finnish citizenship/EU work eligibility, and relevant JD keywords]

---

## Skills
- **Languages:** [Revised list]
- **Frontend Frameworks:** [Revised list]
- **State Management & Data:** [Revised list]
- **Backend, Databases & Cloud:** [Revised list]
- **Security & Analytics:** [Revised list]
- **Testing & Tooling:** [Revised list]
- **Methodologies:** [Revised list]
- **Additional Tools:** [Revised list]

---

## Experience

**Senior Software Developer - Consultant**
: **Tieto Oyj**
: **Feb 2023 - Dec 2025**
**Client: Flow Festival mobile application**
- [Revised bullet point]
- [Revised bullet point]
- [Revised bullet point]
- [Revised bullet point]

**Client: DNA (Telecom)**
: **Nov 2023 – Jan 2025**
- [Revised bullet point]
- [Revised bullet point]
- [Revised bullet point]
- [Revised bullet point]

**Client: Tuska Festival**
: **Feb 2023 – Jun 2023**
- [Revised bullet point]
- [Revised bullet point]
- [Revised bullet point]

**Senior Software Engineer**
: **The Qt Company**
: **Feb 2022 – Sep 2022**
- [Revised bullet point]
- [Revised bullet point]
- [Revised bullet point]

**Senior SW / Frontend Architect**
: **SOK**
: **Aug 2020 – Sep 2022**
- [Revised bullet point]
- [Revised bullet point]
- [Revised bullet point]
- [Revised bullet point]

**Fullstack Developer**
: **Feedbackly Oy**
: **Jul 2017 – Aug 2020**
- [Revised bullet point]
- [Revised bullet point]
- [Revised bullet point]
- [Revised bullet point]

---

## Education
**BBA in Business Information Technology**
: **2013 – 2017**
Lapland University of Applied Science
: Tornio, Finland

---

## Certifications
* **AWS Certified Solutions Architect – Associate** : May 2025
* **SAFe® 6 Scrum Master (SSM)** : Dec 2023
* **Microsoft Certified: Azure Fundamentals (AZ-900)** : Jul 2023

```
