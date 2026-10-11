pipeline {
    agent any
    options {
        timestamps()
        disableConcurrentBuilds()
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Jenkins has loaded the project from source control.'
                bat 'git --version'
            }
        }
        stage('Build') {
            steps {
                echo 'Checking Node.js and validating JavaScript syntax.'
                bat 'node --version'
                bat 'npm --version'
                bat 'npm run check'
            }
        }
        stage('Test') {
            steps {
                echo 'Running CampusFlow automated tests.'
                bat 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Copying tested application files into deployment/.'
                bat '''
                    if not exist deployment mkdir deployment
                    copy /Y index.html deployment\index.html
                    copy /Y styles.css deployment\styles.css
                    copy /Y app.js deployment\app.js
                    copy /Y server.js deployment\server.js
                    copy /Y package.json deployment\package.json
                '''
                echo 'Deployment files copied successfully.'
            }
        }
    }
    post {
        success { echo 'SUCCESS: CampusFlow passed build and tests and was deployed.' }
        failure { echo 'FAILURE: Inspect the stage logs and fix the reported issue.' }
        always { echo 'CampusFlow CI/CD pipeline run finished.' }
    }
}