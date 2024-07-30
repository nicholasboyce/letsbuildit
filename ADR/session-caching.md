# Architectural Decision Records (Session Caching)

## Context and Problem Statement
I'm thinking about how I want to store sessions on the backend, especially considering that it's possible I may decide to use them for managing tokens in the backend as well. I'm still figuring out how exactly I want to do that but likely will be using sessions for simplicity. 

### Considered Options
- PostgreSQL
- MongoDB
- Redis