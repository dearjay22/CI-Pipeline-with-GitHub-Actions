pipeline {
  agent any
  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id') // configure in Jenkins credentials (username/password)
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Build Docker Image') {
      steps {
        script {
          def tag = "ci-${env.GIT_COMMIT}"
          sh "docker build -t ${DOCKERHUB_CREDENTIALS_USR}/ci-midterm-sample:${tag} ."
        }
      }
    }
    stage('Push Image') {
      steps {
        script {
          sh "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
          sh "docker push ${DOCKERHUB_CREDENTIALS_USR}/ci-midterm-sample:ci-${env.GIT_COMMIT}"
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
