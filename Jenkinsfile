pipeline {
    agent any
     environment {
        //IMAGE_NAME = "curso-devops"
        DH_REPO    = "vnvenega/lab3-devops-vvf"
        GHCR_REPO  = "ghcr.io/vnvnege/lab3-devops-vvf"
        K8S_NAMESPACE  = "vvenegas"
        K8S_DEPLOYMENT = "curso-devops-deployment"
        K8S_CONTAINER  = "contenedor-lab3-vvf"
    }
    stages {
        stage("Integracion continua") {
            agent {
                docker {
                    image "node:24"
                    reuseNode true
                }
            }
            stages {
                stage("CI de la aplicacion - version") {
                    steps {
                        script {
                            env.APP_SEMANTIC_VERSION = sh(
                                script: 'npm pkg get version | tr -d \'"\'',
                                returnStdout: true
                            ).trim()
                            echo "Version semantica detectada: ${env.APP_SEMANTIC_VERSION}"
                        }
                    }
                }
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
                            sh '''
                                sonar-scanner   \
                                -Dsonar.coverage.exclusions=**/*.spec.ts,**/*.test.ts
                            '''
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


        stage("CD de la aplicacion - build dockerfile") {
            steps {
                sh "docker build -t lab3-devops-vvf ."

                script{                    
                    docker.withRegistry("https://index.docker.io/v1/","credencial-dh") {
                        sh "docker tag lab3-devops-vvf vnvenega/lab3-devops-vvf:latest"
                        sh "docker tag lab3-devops-vvf vnvenega/lab3-devops-vvf:${env.BUILD_NUMBER}"
                        sh "docker tag lab3-devops-vvf vnvenega/lab3-devops-vvf:${env.APP_SEMANTIC_VERSION}"
                        sh "docker push vnvenega/lab3-devops-vvf:latest"
                        sh "docker push vnvenega/lab3-devops-vvf:${env.BUILD_NUMBER}"
                        sh "docker push vnvenega/lab3-devops-vvf:${env.APP_SEMANTIC_VERSION}"   
                    }

                    docker.withRegistry("https://ghcr.io","credential-gh") {
                        sh "docker tag lab3-devops-vvf ghcr.io/vnvnege/lab3-devops-vvf:latest"
                        sh "docker tag lab3-devops-vvf ghcr.io/vnvnege/lab3-devops-vvf:${env.BUILD_NUMBER}"
                        sh "docker tag lab3-devops-vvf ghcr.io/vnvnege/lab3-devops-vvf:${env.APP_SEMANTIC_VERSION}"
                        sh "docker push ghcr.io/vnvnege/lab3-devops-vvf:latest"
                        sh "docker push ghcr.io/vnvnege/lab3-devops-vvf:${env.BUILD_NUMBER}"
                        sh "docker push ghcr.io/vnvnege/lab3-devops-vvf:${env.APP_SEMANTIC_VERSION}"
                    }    
                }                          
            }
        }  

        stage("CD - Despliegue continuo en develop"){
            agent {
                docker {
                    image "alpine/k8s:1.34.6"
                    reuseNode true
                }
            }
            steps{                
                script {
                    if (!env.APP_SEMANTIC_VERSION?.trim()) {
                        error("APP_SEMANTIC_VERSION no definida para el despliegue")
                    }
                }                
                withKubeConfig([credentialsId: 'credencial-k8']) {
                    sh """
                        kubectl -n ${env.K8S_NAMESPACE} set image deployment/${env.K8S_DEPLOYMENT} ${env.K8S_CONTAINER}=${env.DH_REPO}:${env.APP_SEMANTIC_VERSION}
                        kubectl -n ${env.K8S_NAMESPACE} rollout status deployment/${env.K8S_DEPLOYMENT}
                    """
                }
            }
        }




    }         
}