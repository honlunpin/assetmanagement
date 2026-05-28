# push2github

Push the latest changes to GitHub safely, keeping the README and repo About section current.

## Steps

### 1. Secrets scan

Before touching git, scan every tracked and staged file for secrets. Search for patterns that indicate leaked credentials:

- Strings matching `sk-`, `pk-`, `Bearer `, `API_KEY`, `SECRET`, `PASSWORD`, `TOKEN` (case-insensitive) in non-test files
- Any `.env` files not listed in `.gitignore`
- Private key blocks (`-----BEGIN ... PRIVATE KEY-----`)

If any are found, **stop immediately**, report the file and line to the user, and do not proceed until the user confirms the issue is resolved. Never commit or push if secrets are detected.

### 2. Update README.md

Read the current state of the project (HTML, CSS, JS files) and rewrite `README.md` to reflect:
- Project name and one-line description
- Live site URL: `https://honlunpin.github.io/assetmanagement/`
- Stack / architecture (what files do what)
- How to run locally
- Deployment info (GitHub Actions → GitHub Pages)

Keep it concise — no fluff.

### 3. Commit and push

Add Git to PATH if needed: `$env:LOCALAPPDATA\Programs\Git\bin`

Run in sequence:
```powershell
git add .
git status
git commit -m "<short summary of what changed>"
git push
```

Write a commit message that describes what actually changed, not a generic message.

### 4. Update repo About

The GitHub repo About section (description + website) cannot be updated via git. After pushing, remind the user to:

1. Go to `https://github.com/honlunpin/assetmanagement`
2. Click the **gear icon** next to "About"
3. Set **Description** to a one-line summary of the current site
4. Set **Website** to `https://honlunpin.github.io/assetmanagement/`
5. Click **Save changes**

If the description is already accurate, skip this step and say so.

### 5. Report

Summarise what was done:
- Whether any secrets were found (and blocked, or none found)
- Which files were committed
- The commit message used
- The push result
- Whether the About section needs manual updating
