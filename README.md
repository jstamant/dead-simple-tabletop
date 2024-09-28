# Dead-Simple Tabletop

Welcome to the repository for Dead-Simple Tabletop!

...I'd like to upload some screenshots when I have something screenshot-worthy...

## Features

There are no features implemented as of yet.

## Roadmap

Here's a general list of features I'd like to implement in this platform, roughly ordered by priority.

### Initial release
- Sign-up
- Password login
- Create character sheets
- Create games/tables
- Logout
- changelog update online

### Next release
- Create templates
- Email code login
- Email verification
- In-game dice roller
- Invite/add users to tables
- Link sharing for tables - no sign-up required for players
- changelog update online

### Future releases
- Character sheet export to PDF
- Payment and/or tipping
- Sessions instead of per-request authentication?
- Game access as guest
- Permissions settings for guests and players
- Sheet pages/tabs/sections
- Online docs for usage of the platform
- changelog update online

## Technologies

On the frontend, I'll be using React and Next.js. I'm also using Zustand for the store, as I find it simpler than Redux.

On the backend, I'll be using Node, Express, and postgres.js.

For the DBMS, I'll be using PostgreSQL.

For the frontend within games/tables, I think I might use WebGL, which might be a better choice for VTT features down the line, like the dice-roller. But I might equally just use React for simplicity, to start.

## Running

To run the docker container

``` sh
docker pull postgres
docker run --name dstt_postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
docker ps
docker exec -it dstt_postgres psql -U postgres
docker start dstt_postgres
docker stop dstt_postgres
docker rm dstt_postgres
docker logs dstt_postgres
```
