There is two separate branches for [frontend](https://github.com/snh1999/SAZIM-FS-Node-GQL-challenge/tree/frontend_) and [backend](https://github.com/snh1999/SAZIM-FS-Node-GQL-challenge/tree/backend_) which is merged into master branch. See [Pull Requests](https://github.com/snh1999/SAZIM-FS-Node-GQL-challenge/pulls) for more information.

There is separate folders for both frontend and backend. You will need `docker` and `node` version **20** (version 18 works with backend, but frontend require at least version 20).

## 1. Clone the repository

```bash
git clone https://github.com/snh1999/SAZIM-FS-Node-GQL-challenge.git #<put_folder_name>
```

## Backend

```bash
cd backend
mv .env.sample .env
nvm use 20
npm install
docker compose up db -d
# sudo docker compose up db -d # if previous one fails for permission issue
npx prisma migrate dev --name initial_migration
# npx prisma db seed  # OPTIONAL STEP FOR SOME HARDCODED DEMO DATA
npm run dev
```

1. Rename `env.sample` file to `.env` from your file manager or running (for windows see `ren`)

```bash
cd backend
mv .env.sample .env # linux specific command
```

change any variable you want to update(make sure you reflect the changes in [docker-compose](./backend/docker-compose.yml) and [frontend .env variable](./frontend/.env))

2. Make sure you are running Node version 20

```bash
nvm use 20
```

3. install required dependencies

```
npm install
```

4. This project uses docker with Postgresql. if the lastest image is not available- it will pull it from dockerhub (if you have any speficic version, make sure to update `image:postgres@<your_version>` at [docker.compose.yml](./backend/docker-compose.yml) (I have tested with latest and version 13) )

```bash
docker compose up db -d
# sudo docker compose up db -d
```

5. To perform prisma migrations, run

```bash
npx prisma migrate dev --name initial_migration # change the name if you want
```

Optionally If you want some demo data for application,

```bash
npx prisma db seed
```

6. To start the server, run

```
npm run dev
```

Alternatively use `npm start`.

**IMPORTANT- KEEP THIS TERMINAL WINDOW OPEN**

## Frontend

```bash
cd frontend
mv .env.sample .env
nvm use 20
npm install
npm run dev
```

1. Make sure you are at the root of the project in a new terminal window.
   Rename `env.sample` file to `.env` from your file manager or running (for windows see `ren`)

```bash
cd frontend
mv .env.sample .env # linux specific command
```

make sure to reflect any changes made in [Backend env](./backend/.env)

2. **Make sure you are running Node version 20** and install required dependencies

```bash
nvm use 20
npm install
```

3. Run the project

```bash
npm run dev
```
