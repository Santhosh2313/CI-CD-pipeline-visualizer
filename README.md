# ⚡ NeonFlow | CI/CD Pipeline Visualizer

A premium, interactive CI/CD pipeline visualizer built with a modern "Dark Cyberpunk" aesthetic. Watch your builds flow through stages with real-time status updates and animated connection paths.

![NeonFlow Dashboard](https://raw.githubusercontent.com/placeholder/neonflow/main/screenshot.png)

## ✨ Features

- **Dynamic Visualization**: Beautiful SVG-based connection lines that animate as stages progress.
- **Real-time Simulation**: Click "Run Pipeline" to see a simulated CI/CD flow with logs and status changes.
- **Glassmorphism UI**: High-end design with backdrop filters, neon glow effects, and smooth transitions.
- **Detailed Logs**: Click on any stage node to inspect real-time logs and performance metrics.
- **Responsive Design**: Works across different screen sizes.

## 🚀 Quick Start

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Santhosh2313/CI-CD-pipeline-visualizer.git
   cd CI-CD-pipeline-visualizer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the dev server**:
   ```bash
   npm run dev
   ```

### Deployment

This project is optimized for **Vercel** and **GitHub Pages**.

1. Push your code to a GitHub repository.
2. Connect your repository to Vercel.
3. Vercel will automatically detect the Vite configuration and deploy.

## 📁 Project Structure

```text
cicd-pipeline-visualizer/
├── .github/workflows/    # CI/CD Automation
│   └── ci.yml            # Build validation workflow
├── public/               # Static assets
├── src/
│   ├── main.js           # Core logic & state management
│   └── style.css         # Design system & neon aesthetics
├── index.html            # Main application entry
├── package.json          # Dependencies & scripts
├── vercel.json           # Vercel deployment config
└── README.md             # Project documentation
```

## 🛠️ Tech Stack

- **Core**: HTML5, Vanilla JavaScript
- **Styling**: CSS3 (Vanilla) with CSS Variables
- **Build Tool**: Vite
- **Animations**: CSS Keyframes, SVG Paths
