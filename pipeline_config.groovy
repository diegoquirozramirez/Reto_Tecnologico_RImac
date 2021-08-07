/*libraries{
    maven
    sonarqube
}*/
pipeline {
    agent any

    stages {
        stage('hhh'){
            steps {
                sh 'echo Hola'
            }
        }
    }
}