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

### Next release
- Create templates
- Email code login
- In-game dice roller
- Invite/add users to tables
- Link sharing for tables - no sign-up required for players

### Future releases
- Character sheet export to PDF
- Payment and/or tipping

## Technologies

On the frontend, I'll be using React and Next.js

On the backend, I'll be using Rust. Specifically, I'll be using axum, because it is tightly integrated with the Tokio project, an important async engine in Rust.

For the DBMS, I'll be using PostgreSQL.

For the frontend within games/tables, I think I might use WebGL, which might be a better choice for VTT features down the line, like the dice-roller. But I might equally just use React for simplicity, to start.
