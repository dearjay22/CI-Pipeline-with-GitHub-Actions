pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id')
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install') {
            steps {
                bat 'npm ci'
            }
        }
        stage('Test') {
            steps {
                bat 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    def tag = env.GIT_COMMIT ?: "local"
                    bat "docker build -t %DOCKERHUB_CREDENTIALS_USR%/ci-midterm-sample:${tag} ."
                }
            }
        }
        stage('Push Image') {
            steps {
                script {
                    bat "echo %DOCKERHUB_CREDENTIALS_PSW% | docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin"
                    bat "docker push %DOCKERHUB_CREDENTIALS_USR%/ci-midterm-sample:ci-${env.GIT_COMMIT}"
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
