# Deployment Guide for GitHub Pages

This guide explains how to deploy the Dark Hacker Mario Portfolio to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed on your machine
- Node.js and npm installed

## Steps

### 1. Create a GitHub Repository

1. Go to GitHub and create a new repository (e.g., `portofolio`)
2. Clone the repository to your local machine

### 2. Configure Base Path

1. Create a `.env` file in the root directory (copy from `.env.example`)
2. Set `VITE_BASE_PATH` to match your repository name:
   ```
   VITE_BASE_PATH=/your-repo-name/
   ```
   - If your repo is `portofolio`, use `/portofolio/`
   - For a custom domain, use `/`

### 3. Update package.json

Update the `homepage` field in `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/your-repo-name"
}
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Build the Project

```bash
npm run build
```

This creates a `dist` folder with the static files.

### 6. Deploy to GitHub Pages

#### Option A: Manual Deployment

1. Build the project: `npm run build`
2. Copy the contents of the `dist` folder
3. Create a `gh-pages` branch in your repository
4. Push the contents to the `gh-pages` branch
5. Go to Repository Settings → Pages
6. Select the `gh-pages` branch as the source
7. Save and wait for GitHub to deploy

#### Option B: Using GitHub Actions (Recommended)

1. Create a `.github/workflows/deploy.yml` file (see below)
2. Push your code to the main branch
3. GitHub Actions will automatically build and deploy

### 7. GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build
        env:
          VITE_BASE_PATH: /your-repo-name/

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 8. Verify Deployment

After deployment, visit:
- `https://yourusername.github.io/your-repo-name`

## Troubleshooting

### 404 Errors

- Make sure `VITE_BASE_PATH` matches your repository name
- Check that the `basename` in `App.jsx` matches `VITE_BASE_PATH`
- Verify the `homepage` in `package.json` is correct

### Assets Not Loading

- Ensure all asset paths are relative
- Check that the base path is correctly set in `vite.config.js`

### Routing Issues

- Make sure React Router's `basename` prop matches your base path
- For client-side routing, GitHub Pages may need a `404.html` that redirects to `index.html`

## Custom Domain

To use a custom domain:

1. Set `VITE_BASE_PATH=/` in `.env`
2. Update `vite.config.js` base to `/`
3. Update `App.jsx` basename to `/`
4. Add a `CNAME` file in the `public` folder with your domain
5. Configure DNS settings in your domain provider

