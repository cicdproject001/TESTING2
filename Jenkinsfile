pipeline {
  agent any

  tools {
    nodejs 'node-20'  // must match the NodeJS version you installed in Jenkins tools
  }

environment {
    NETLIFY_AUTH_TOKEN = credentials('netlify-auth')
    NETLIFY_SITE_ID    = credentials('netlify-site')
}


  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install') {
      steps { sh 'npm install' }
    }

    stage('Build') {
      steps { sh 'npm run build' }
    }

stage('Deploy') {
    steps {
        sh 'npx netlify-cli deploy --dir=build --prod --site=$NETLIFY_SITE_ID --auth=$NETLIFY_AUTH_TOKEN'
    }
}

  }
}
