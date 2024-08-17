Build your docker image:

```sh
PROJECT=$(basename `pwd`) && docker image build -t $PROJECT-image . --build-arg user_id=`id -u` --build-arg group_id=`id -g`
```

And run it:

```sh
docker container run -it --rm --init -e NODE_ENV=development --mount type=bind,src=`pwd`,dst=/app --name $PROJECT-container $PROJECT-image /bin/zsh
```

## localで実行するとき

```console
% npx ts-node src/index.ts
```

```console
% tsc --project tsconfig.json
```

```console
% npx vitest run test/prime.test.ts
```
