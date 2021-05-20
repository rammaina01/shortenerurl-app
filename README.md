## Steps to run the application
Run the below two commands to build the container image and run the application

## To build the image
sudo docker build -t urlshortener-app .

## Start the container
sudo docker run -itd --rm -v ${PWD}:/app -v /app/node_modules -p 3000:3000 -e CHOKIDAR_USEPOLLING=true urlshortener-app

## How to access the application

http://localhost:3000/

## Note: make Sure Backend application is up and running

## Backend app:
https://github.com/rammaina01/urlshortener

