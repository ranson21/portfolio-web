# Portfolio Web Application 🎨

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/) [![Vite](https://img.shields.io/badge/Vite-5.1.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/) [![MUI](https://img.shields.io/badge/MUI-5.15.12-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)

A modern, responsive portfolio web application built with React and Vite, featuring Material UI components and state management with Redux.

## 🚀 Features

- Modern React 18 with Hooks
- Lightning-fast builds with Vite
- Material UI components and styling
- Redux state management
- Form handling with React Final Form
- Route management with React Router
- Responsive design
- SASS styling support
- Intersection Observer for scroll animations
- Development proxy configuration
- Asset optimization and caching
- Module aliasing for clean imports
- Firebase integration for hosting and CI/CD

## 📦 Prerequisites

- Node.js (LTS version recommended)
- npm or yarn package manager
- Firebase CLI (`npm install -g firebase-tools`)
- Google Cloud account (for Firebase)

## 🔥 Firebase Setup

### Initial Project Setup

1. Create a new Firebase project:
   ```bash
   # Login to Firebase
   firebase login

   # Initialize Firebase in your project
   firebase init
   ```

2. Select the following Firebase features when prompted:
   - Hosting
   - GitHub Actions deployment (optional)
   - Emulators (optional)

### Setting up Continuous Integration

1. Generate a Firebase CI token:
   ```bash
   firebase login:ci
   ```

2. Add the token to your GitHub repository:
   - Go to Repository Settings > Secrets
   - Create a new secret named `FIREBASE_TOKEN`
   - Paste the CI token as the value

3. The `.github/workflows/firebase-hosting-merge.yml` file will be automatically created during Firebase init. Ensure it contains:
   ```yaml
   name: Deploy to Firebase Hosting
   on:
     push:
       branches: [ main ]
   jobs:
     build_and_deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: npm ci && npm run build
         - uses: FirebaseExtended/action-hosting-deploy@v0
           with:
             repoToken: '${{ secrets.GITHUB_TOKEN }}'
             firebaseServiceAccount: '${{ secrets.FIREBASE_TOKEN }}'
             channelId: live
   ```

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/ranson21/portfolio-web
cd portfolio-web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## 🔧 Development

Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will open automatically in your default browser at `http://localhost:5173`.

## 🏗️ Build

Create a production build:
```bash
npm run build
# or
yarn build
```

Preview the production build:
```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
portfolio-web/
├── src/
│   ├── components/     # React components
│   ├── styles/        # SASS/CSS styles
│   ├── utils/         # Utility functions
│   └── index.jsx      # Application entry point
├── public/            # Static assets
└── vite.config.js     # Vite configuration
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
APP_VERSION=development
FIREBASE_API_KEY=your_api_key
FIREBASE_PROJECT_ID=your_project_id
```

### Proxy Configuration

The development server is configured to proxy `/api` requests to `http://localhost:8080`. Modify `vite.config.js` to change this configuration.

## 🧪 Linting

Run ESLint:
```bash
npm run lint
# or
yarn lint
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Abigail Ranson
- Website: [abbyranson.com](https://abbyranson.com)
- GitHub: [@ranson21](https://github.com/ranson21)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the lightning-fast build tool
- Material-UI team for the component library
- Firebase team for the hosting and CI/CD platform