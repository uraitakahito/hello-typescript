Build your docker image:

```sh
PROJECT=$(basename `pwd`) && docker image build -t $PROJECT-image . --build-arg user_id=`id -u` --build-arg group_id=`id -g`
```

And run it:

```sh
docker container run -d --rm --init -e NODE_ENV=development --mount type=bind,src=`pwd`,dst=/app --mount type=bind,src=$HOME/.gitconfig,dst=/home/developer/.gitconfig --name $PROJECT-container $PROJECT-image
```

Run any commands inside the Docker containers as needed:

```console
% npx tsx src/fizzbuzz.ts
% npx eslint .
% npm run format
```
