# React Portfolio

## Setup & Run Instructions

### Prerequisites

* Node.js and npm installed
* Git installed (for deploying the project)

### Installation

Clone the repository and move into the project directory:

```bash
git clone <https://github.com/tanmayeepullangari/Portfolio>
cd <portfolio-react>
```

Install the required dependencies:

```bash
npm install
```

### Run the Development Server

Start the Vite development server:

```bash
npm run dev
```

The application will be available at the local URL shown in the terminal, usually:

```text
http://localhost:5173/
```

### Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Component Tree

The application is divided into reusable React components rather than keeping everything inside `App.jsx`.

```text
App
├── Navbar
├── About
├── Skills
├── Tools
├── Projects
│   └── ProjectCard
│       └── ProjectDetails
└── Contact
    └── ContactForm
```

The `ProjectCard` component is designed to be reusable. Project information such as the title, description, technologies, image, and project link is passed through props. The projects are stored separately in `src/data/projects.js`, allowing new projects to be added without changing the component itself.

This structure keeps components focused on one responsibility and makes the application easier to maintain.

---

## State Lifting Decisions

State lifting was used when multiple components needed access to the same piece of state.

For example, form-related state is kept at the appropriate parent level when information needs to be shared between the form and another component. Instead of maintaining separate copies of the same state in child components, the state is stored in their closest common parent and passed down through props.

The general data flow is:

```text
Parent Component
      |
      | props
      ↓
Child Component
      |
      | callback
      ↓
Parent Component
```

This keeps the application state predictable and follows React's one-way data-flow model.

---

## useEffect Hooks

The following `useEffect` hooks were implemented:

### 1. Initial Application Setup

An effect can be used for logic that needs to run after the component is mounted, such as initializing browser-related behavior or performing setup that should happen only once.

```javascript
useEffect(() => {
    // initialization logic
}, []);
```

The empty dependency array means the effect runs once after the initial render.

### 2. Synchronizing External/Browser State

Where required, `useEffect` is used to synchronize React state with browser APIs or other external systems. This is appropriate because these operations are side effects and should not be performed directly during rendering.

```javascript
useEffect(() => {
    // synchronize with external/browser state
}, [state]);
```

The dependency array ensures the effect runs again whenever the relevant state changes.

### Why `useEffect` Was Used

`useEffect` was only used for operations that are side effects, such as interacting with browser APIs, subscriptions, timers, or synchronizing with something outside React.

Normal calculations and UI rendering were kept outside `useEffect` because they can be performed directly during rendering.

---

## Project Structure

```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── ProjectCard.jsx
│   ├── Skills.jsx
│   └── ContactForm.jsx
├── data/
│   └── projects.js
├── App.jsx
├── main.jsx
└── index.css
```

The separation of components and data makes the project easier to extend and demonstrates reusable React component design.

## video recording link
https://drive.google.com/file/d/1qsQ6F1-IXXiFq6r19SCQ0gOEcHUd39LC/view