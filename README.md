## Setup

Please download the required files by following these steps:

```
curl -L -O https://raw.githubusercontent.com/uraitakahito/hello-javascript/refs/tags/1.2.0/Dockerfile.dev
curl -L -O https://raw.githubusercontent.com/uraitakahito/hello-javascript/refs/tags/1.2.0/docker-entrypoint.sh
chmod 755 docker-entrypoint.sh
```

Detailed environment setup instructions are described at the beginning of the [Dockerfile](https://github.com/uraitakahito/hello-javascript/blob/1.2.0/Dockerfile.dev).

## Production Build

Build the Docker image:

```
PROJECT=$(basename `pwd`) && docker image build -f Dockerfile.prod -t $PROJECT-prod-image .
```

Run the Docker container:

```
docker container run --rm $PROJECT-prod-image
```
