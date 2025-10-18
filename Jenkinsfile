pipeline {
    agent any
    environment {
        // Docker Hub credentials configured in Jenkins
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id')
    }
    stages {

        // =========================
        // Build & Test Stage (like GitHub Actions build-and-test) 
        // =========================
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Set Image Tag') {
            steps {
                script {
                    // Simulate GitHub SHA with Jenkins GIT_COMMIT (if available)
                    env.IMAGE_TAG = env.GIT_COMMIT ?: "build-${env.BUILD_NUMBER}"
                    echo "Image tag set to: ${env.IMAGE_TAG}"
                }
            }
        }

        // =========================
        // Build & Push Docker Image (like build-and-push-image job)
        // =========================
        stage('Build Docker Image') {
            steps {
                script {
                    bat "docker build -t %DOCKERHUB_CREDENTIALS_USR%/ci-midterm-sample:%IMAGE_TAG% ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Login to Docker Hub
                    bat "echo %DOCKERHUB_CREDENTIALS_PSW% | docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin"
                    // Push with IMAGE_TAG and latest
                    bat "docker push %DOCKERHUB_CREDENTIALS_USR%/ci-midterm-sample:%IMAGE_TAG%"
                    bat "docker tag %DOCKERHUB_CREDENTIALS_USR%/ci-midterm-sample:%IMAGE_TAG% %DOCKERHUB_CREDENTIALS_USR%/ci-midterm-sample:latest"
                    bat "docker push %DOCKERHUB_CREDENTIALS_USR%/ci-midterm-sample:latest"
                }
            }
        }

    }

    post {
        always {
            cleanWs()
        }
        failure {
            echo "Pipeline failed — check test reports and logs"
        }
    }
}
