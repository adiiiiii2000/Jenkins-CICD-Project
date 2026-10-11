pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Source code retrieved from GitHub.'
                bat 'git --version'
            }
        }

        stage('Build') {
            steps {
                echo 'Checking Node.js and JavaScript syntax.'
                bat 'node --version'
                bat 'npm --version'
                bat 'npm run check'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated tests.'
                bat 'npm test'
            }
        }

        
        stage('Deploy') {
            steps {
                echo 'Preparing deployment directory.'

                bat 'if not exist deployment mkdir deployment'

                bat 'copy /Y index.html deployment\\index.html'
                bat 'copy /Y styles.css deployment\\styles.css'
                bat 'copy /Y app.js deployment\\app.js'
                bat 'copy /Y server.js deployment\\server.js'
                bat 'copy /Y package.json deployment\\package.json'

                echo 'Deployment files copied successfully.'
            }
        }

    }

    post {
        success {
            echo 'SUCCESS: CampusFlow passed build and tests and was deployed.'
        }
        failure {
            echo 'FAILURE: Check the stage logs for details.'
        }
        always {
            echo 'CampusFlow CI/CD pipeline run finished.'
        }
    }
}