Build your docker image:

```sh
PROJECT=$(basename `pwd`) && docker image build -t $PROJECT-image . --build-arg user_id=`id -u` --build-arg group_id=`id -g`
```

And run it:

```sh
docker container run -it --rm --init -e NODE_ENV=development --mount type=bind,src=`pwd`,dst=/app --name $PROJECT-container $PROJECT-image /bin/zsh
```

Run the following commands inside the Docker containers:

```sh
npx tsx src/fizzbuzz.ts
```

You can pass an additional argument as the [filter](https://vitest.dev/guide/cli.html#vitest) of the test files to run. For example:

```sh
npx vitest run concurrent
```

Will run only the test file that contains *concurrent* in their paths. 

```sh
npx eslint .
```
