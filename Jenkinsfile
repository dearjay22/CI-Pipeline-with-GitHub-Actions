pipeline {
    agent any
    environment {
        // Docker Hub credentials configured in Jenkins
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id')
    }
    stages {

        stage('Checkout') {
            steps {
                // Pull latest code from GitHub
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Windows batch command
                bat 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Use BUILD_NUMBER for unique tag
                    env.DOCKER_TAG = "build-${env.BUILD_NUMBER}"
                    bat "docker build -t %DOCKERHUB_CREDENTIALS_USR%/ci-midterm-sample:%DOCKER_TAG% ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Login to Docker Hub and push the image
                    bat "echo %DOCKERHUB_CREDENTIALS_PSW% | docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin"
                    bat "docker push %DOCKERHUB_CREDENTIALS_USR%/ci-midterm-sample:%DOCKER_TAG%"
                }
            }
        }
    }

    post {
        always {
            // Clean workspace after build
            cleanWs()
        }
        failure {
            echo "Pipeline failed — check test reports and logs"
        }
    }
}
