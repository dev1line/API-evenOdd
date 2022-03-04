gcloud auth print-access-token
docker login -u oauth2accesstoken -p "token" https://gcr.io
docker build . -t gcr.io/gamesmetaplay-8de67/pam-api
docker push gcr.io/gamesmetaplay-8de67/pam-api

#Add docker user
net localgroup docker-users "tudv" /ADD