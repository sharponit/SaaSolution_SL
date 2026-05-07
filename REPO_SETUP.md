# Create a New Repository (df_mobile_app)

Use these commands from the project root to publish this codebase to a fresh remote repository.

## 1) Initialize local git (if needed)
```bash
git init
git branch -M main
```

## 2) Commit files
```bash
git add .
git commit -m "Initial commit: df_mobile_app MVP"
```

## 3) Create a new remote repository
Create a repository named:
`df_mobile_app`

Then connect and push:
```bash
git remote add origin <YOUR_NEW_REPO_URL>
git push -u origin main
```

## 4) Recommended repository settings
- Add `.env*` to secrets only (never commit real keys).
- Enable branch protection on `main`.
- Add Vercel + Supabase + Stripe environment variables.

