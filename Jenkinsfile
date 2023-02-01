pipeline {
    agent any
    stages {
        stage('linter') {
            steps {
                sh 'npm run lint'
            }
        }
        stage('test') {
            steps {
                sh 'npm run jest'
            }
        }
        stage('deploy') {
            steps {
                sh 'npm run deploy'
            }
        }
    }
}
