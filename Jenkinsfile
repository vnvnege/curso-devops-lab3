pipeline {
    agent {
        docker {
            image "node:24"
        }
    }
    stages {
        stage("CI de la aplicacion - dependencias") {
            steps {
                sh "npm install"                
            }
        }
        stage("CI de la aplicacion - lint") {
            steps {
                sh "npm run lint"

            }
        }
        stage("CI de la aplicacion - test") {
            steps {
                sh "npm run test"

            }
        }
        stage("CI de la aplicacion - build") {
            steps {
                sh "npm run build"

            }
        }
    }
}