# CampusFlow — Student Management System with Jenkins CI/CD

A responsive student-management demo for a Software Engineering project demonstrating Jenkins CI/CD on Windows.

## Features
- Responsive dashboard and student directory
- Create, edit and delete student records
- Search by name, email, student ID or programme
- Programme and status filters
- Live statistics and progress indicators
- CSV export of filtered records
- Browser localStorage persistence
- Light/dark theme toggle
- Built-in Node.js static server; no third-party runtime packages
- Automated checks and a Windows Jenkins pipeline

Sample records are fictional. Data is stored in the current browser only; this is not a secure multi-user database.

## Requirements
- Windows 10/11 for this Jenkinsfile (`bat` steps)
- Node.js 18 or newer
- Git for Windows
- Jenkins LTS with Pipeline and Git plugins
- GitHub repository

## Run locally
1. Extract the ZIP and open the folder in VS Code.
2. Open Terminal → New Terminal.
3. Run:

```powershell
node --version
npm --version
npm run check
npm test
npm start
```

4. Visit http://localhost:3000. Stop with Ctrl+C.

No `npm install` is required. You can open `index.html` directly, but `npm start` demonstrates the server.

## Push to GitHub
Create an empty GitHub repository named `Jenkins-CICD-Project`. In PowerShell from this folder:

```powershell
git init
git add .
git commit -m "Add CampusFlow app and CI/CD pipeline"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Jenkins-CICD-Project.git
git push -u origin main
```

Replace `YOUR_USERNAME`. If Git asks for identity, configure `git config --global user.name` and `git config --global user.email`. Never commit access tokens or passwords.

## Configure Jenkins
1. Open http://localhost:8080.
2. Open `Student-Management-CICD` → Configure.
3. Under Pipeline, choose **Pipeline script from SCM**.
4. SCM: **Git**.
5. Enter your GitHub repository URL.
6. For a public repository, leave Credentials as **None**.
7. Branch Specifier: `*/main`.
8. Script Path: `Jenkinsfile`.
9. Save, then click **Build Now**.
10. Inspect Console Output and Pipeline Stage View.

### Pipeline stages
- **Checkout:** Jenkins retrieves source while loading the Jenkinsfile; this stage verifies Git availability.
- **Build:** checks Node.js/npm and JavaScript syntax.
- **Test:** runs `npm test`.
- **Deploy:** copies app files to the workspace's `deployment` directory.

### Windows service note
Jenkins may run as a Windows service account different from your desktop user. If `node`, `npm`, or `git` is not recognized in Console Output, make those executables available on the service account's PATH and restart Jenkins, or configure an appropriate service account. Do not expose an unsecured Jenkins instance to the public internet.

## Demonstrate CI/CD
1. Change a line in `index.html` or `app.js`.
2. Push the change:

```powershell
git add .
git commit -m "Update CampusFlow UI"
git push
```

3. In Jenkins click **Build Now**. Optional: enable **Poll SCM** with `H/2 * * * *` for periodic checks.
4. Show the successful stages and `deployment` folder in the Jenkins workspace.

To preview the deployed copy, open a terminal in `deployment` and run `node server.js`, then visit http://localhost:3000. If port 3000 is busy, use `$env:PORT=3001; node server.js` and visit http://localhost:3001.

## Automated checks
`npm test` checks the page shell, responsive styling, sample records, required fields, HTML escaping, initials, feature markers and server path handling. These project-level tests are not a substitute for full browser end-to-end testing.

## Troubleshooting
- `node` not recognized: install Node.js and reopen the terminal; for Jenkins, correct the service PATH.
- `git` not recognized: ensure Git is available to the Jenkins service account.
- `bat` not recognized: this pipeline is for Windows agents; Linux agents need `sh` steps.
- Repository not found: verify URL, branch and repository access.
- Port 3000 occupied: run `$env:PORT=3001; npm start` in PowerShell.

## Suggested report sections
1. Abstract and introduction
2. Problem statement and objectives
3. Tools and requirements
4. Architecture and CI/CD workflow
5. UI and application features
6. Jenkinsfile and pipeline stages
7. Test cases and actual results
8. Screenshots of your own successful Jenkins builds
9. Limitations and future enhancements
10. Conclusion

Use screenshots from your own running app and Jenkins job. Do not present expected output as actual build evidence.
