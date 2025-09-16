pipeline {
  agent any

  tools {
    nodejs 'node-20'  // Must match the NodeJS version you configured in Jenkins "Global Tool Configuration"
  }



  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        // NODE_OPTIONS will be automatically applied from environment
        sh 'npm run build'
      }
    }

    stage('Deploy') {
      steps {
        sh 'npx netlify-cli deploy --dir=build --prod 
      }
    }
  }
}
