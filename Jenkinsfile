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
                        sh "npm run test:cov"
                    }
                }
                stage("CI de la aplicacion - build") {
                    steps {
                        sh "npm run build"
                    }
                }
            }
        }

        stage("Quality Assurance"){
            agent {
                docker {
                    image 'sonarsource/sonar-scanner-cli'
                    args '--network=devops-infra_default'
                    reuseNode true
                }
            }
            stages{
                stage("validacion de codigo"){
                    steps{
                        withSonarQubeEnv('sonarqube'){
                            sh 'sonar-scanner'
                        }
                    }
                }
                stage('validacion quality gate'){
                    steps{
                        script{
                            def  qualityGate = waitForQualityGate() // esperar por el resultado del qualitygate en un endpoint de jenkins, que se gatilla desde sonar via webhook.
                            if(qualityGate.status != 'OK'){
                                error "La puerta de calidad ha fallado : ${qualityGate.status}"
                            }
                        }
                    }
                }
            }
        }


        stage("CI de la aplicacion - build dockerfile") {
            steps {
                sh "docker build -t lab3-devops-vvf ."

                script{
                    /*var semantic = sh(
                        script: 'npm pkg get version| tr -d \'"\'',
                        returnStdout:true
                    ).trim()*/
                    docker.withRegistry("https://index.docker.io/v1/","credencial-dh") {
                        sh "docker tag lab3-devops-vvf vnvenega/lab3-devops-vvf:latest"
                        sh "docker tag lab3-devops-vvf vnvenega/lab3-devops-vvf:${env.BUILD_NUMBER}"
                        //sh "docker tag lab3-devops-vvf vnvenega/lab3-devops-vvf:${semantic}"
                        sh "docker push vnvenega/lab3-devops-vvf:latest"
                        sh "docker push vnvenega/lab3-devops-vvf:${env.BUILD_NUMBER}"
                        //sh "docker push vnvenega/lab3-devops-vvf:${semantic}"   
                    }

                    docker.withRegistry("https://ghcr.io","credential-gh") {
                        sh "docker tag lab3-devops-vvf ghcr.io/vnvnege/lab3-devops-vvf:latest"
                        sh "docker tag lab3-devops-vvf ghcr.io/vnvnege/lab3-devops-vvf:${env.BUILD_NUMBER}"
                        //sh "docker tag lab3-devops-vvf ghcr.io/vnvnege/lab3-devops-vvf:${semantic}"
                        sh "docker push ghcr.io/vnvnege/lab3-devops-vvf:latest"
                        sh "docker push ghcr.io/vnvnege/lab3-devops-vvf:${env.BUILD_NUMBER}"
                        //sh "docker push ghcr.io/vnvnege/lab3-devops-vvf:${semantic}"
                    }    
                }                          
            }
        }  
    }         
}