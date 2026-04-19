pipeline {
    agent any
    stages {
        stage("Integracion continua") {
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
        stage("CI de la aplicacion - build dockerfile") {
            steps {
                sh "docker build -t lab3-devops-vvf ."
            }
        }  
    }         
}