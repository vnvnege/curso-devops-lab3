pipeline {
    agent {
        docker {
            image "node:24"
        }
    }
    stages {
        stage("CI de la aplicacion") {
            steps {
                sh "echo 'este es el primer paso para instalar dependencia'"
                sh "npm install"
                sh "ls -l"
                sh "hostname"
            }
        }
        stage("La segunda etapa fome") {
            steps {
                sh "echo 'esto es la prueba de la segunda etapa en jenkins'"

            }
        }
    }
}