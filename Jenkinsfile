/*Jenkins file para que cuando llame jenkins a este archivo, se ejecute el pipeline y con ello estas 3 tareas
Una stage llamada "linter" que llamara al superlinterv4 para comprobar que el código cumple con las normas de estilo
→ Una stage llamada "test" que ejecutará los tests de jest del proyecto
→ Una stage llamada "deploy" que desplegará el proyecto en la propia máquina de jenkins.*/

pipeline {
    agent any
    stages {
        stage('test') {
            steps {
                shell 'npm run jest'
            }
        }
        stage('deploy') {
            steps {
                shell 'npm run deploy'
            }
        }
    }
}