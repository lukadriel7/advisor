# Advisor (advisor)

A web app giving random advices

## Install the dependencies

This project was built using yarn, and requires node >= 14 and npm >= 6 to be installed.
Those can be installed by visiting https://nodejs.org/en/

### Install yarn

```bash
npm install --global yarn
```

### Install project dependencies

Change directories to the root of the project

```bash
cd /path/to/this/directory
```

Install the project dependencies with

```bash
yarn
```

### Install Docker (Optional)

Docker can be used to build an image and launch a container of this application.
You can install docker by following the instructions at
https://docs.docker.com/get-docker/

### Install nginx (Optional)

You can install nginx following the instructions at https://www.nginx.com/resources/wiki/start/topics/tutorials/install/

### Install Quasar cli (Optional)

The quasar cli can be used to serve build files.
Install it using

```bash
npm install --global @quasar/cli
```

## Development

### Environment variables (Important)

Create a file `.env` at the root of the folder. You can use the `.env.example` file as a template. The used environment variables are :

```env
ADVICESLIP_API=https://api.adviceslip.com/advice #adviceslip API URL
ADVICE_MIN_ENTRIES=5 # The smallest number of advice the user can request
ADVICE_MAX_ENTRIES=20 # The largest number of advice the user can request
LIBRETRANSLATE_API=https://libretranslate.de/translate #libretranslate API URL
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

Using Quasar cli:

```bash
quasar dev
```

Using yarn:

```bash
yarn dev
```

Visit http://localhost:8080 in your browser

### Build the app for production (Required for deployment)

Using Quasar cli:

```bash
quasar build
```

Using yarn:

```bash
yarn build
```

## Deployment (It is required to build the app for production before deployment)

### Docker

Run the following command to create an image

```bash
docker build . -t [TAG_NAME]
```

Launch a container using:

```bash
docker run --name [CONTAINER_NAME] -d -p [PORT_NUMBER]:80 [TAG_NAME]
```

Visit http://localhost:[PORT_NUMBER] in your browser

### Nginx

In the nginx configuration file, add under html add a server block similar to the following:

```nginx
server {
    listen 80;
    server_name localhost 127.0.0.1;
    location / {
        alias /data/www/;
        index index.html;
        try_files $uri $uri/ index.html;
    }
    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

copy the content of `dist/spa` to /data/www

Make sure to remove all other default server configuration already existing.
Visit http://localhost in your browser

### Quasar cli

After building the application for production, use the following command to launch a local server

```bash
quasar serve --history dist/spa
```

Visit http://localhost:4000 in your browser
you can read more about the serve command at https://quasar.dev/quasar-cli/commands-list#serve
