# Remove the old ENV vars
if [ -f .env ]; then
  rm .env
fi

# Add the Vault Secrets to the environment
cat >>.env << EOF
# Set the Node ENV
export NODE_ENV="development"

# Set the Application Client ID
export API_KEY=$(gcloud secrets versions access latest --secret="aurora-admin-web-key")
export SENDER_ID=$(gcloud secrets versions access latest --secret="aurora-admin-web-app-id")
export APP_ID=$(gcloud secrets versions access latest --secret="aurora-admin-web-sender-id")


# Project settings
export PROJECT_ID="audit-signal-auditor"
export _RELEASE="dev"
export _SERVER=http://localhost:4000/graphql
export _AURORA_URL=http://localhost:9080
EOF

# Install node Modules if not intstalled
if [ ! -d node_modules ]; then
  npm i
fi