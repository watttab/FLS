# Free Learning Space - Modern React Edition

A premium, modern reimplementation of the "Free Learning Space" portfolio website using React, Vite, and Tailwind CSS.

## Features

- **Premium UI**: Glassmorphism, smooth animations (Framer Motion), and responsive design.
- **Dynamic Content**: Uses Firebase Realtime Database for managing projects and stats.
- **Admin Dashboard**: Secure-ish login to add, edit, and delete projects.
- **Modern Tech**: React 18, Vite, TypeScript, Tailwind CSS v3.
- **GitHub Ready**: Configured for easy deployment to GitHub Pages.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/free-learning-space.git
   cd free-learning-space
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

This project is configured to deploy to **GitHub Pages**.

1. Update `package.json`:
   Change the `homepage` field (if added) or ensure your repository settings on GitHub enable Pages from the `gh-pages` branch.

2. Deploy heavily:
   ```bash
   npm run deploy
   ```
   This command helps build the project and pushes the `dist` folder to the `gh-pages` branch.

## Configuration

### Firebase

The project uses Firebase Realtime Database. The configuration is located in `src/lib/firebase.ts`.
Ensure your Firebase Security Rules allow read/write access as appropriate.

Current Rules (Development):
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
*Note: For production, you should restrict write access.*

## Project Structure

- `src/components`: Reusable UI components (Navbar, Footer, etc.)
- `src/pages`: Main pages (Home, Dashboard, Admin)
- `src/hooks`: Custom React hooks (useProjects)
- `src/lib`: Configuration files (Firebase)

## License

MIT
