# Architectural Decision Records (Database)

## Context and Problem Statement
I'm looking to choose a database that will be easy to work with for someone still learning, and that would be easy to onboard others around my skill level with. This would likely mean that database is:
- Modern but well tested
- Easy to find resources on

### Considered Options
- PostgreSQL
- MySQL
- MongoDB

### Decision Outcome
PostgreSQL. 
- I've used this previously and it seems to be an increasingly popular option over MySQL. 
- It would be a good choice for practicing SQL, and is good for write-heavy apps (which may likely be the case).
- There are a large amount of up to date resources regarding using Postgres.

I've also decided to go with Kysely, a type-safe SQL query builder, so that I'm not too divorced from the process of writing and understanding SQL.