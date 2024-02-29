# Architectural Decision Records (Authentication)

## Context and Problem Statement
I'm looking for a means of user authentication that allows for users to access. Currently, this authentication method would need to support both POST requests to the login endpoint via Javascript (as a modal) or through a template generated via Spring Boot.
This method needs to be reasonably manageable, as well as last long enough that users can stay logged into their accounts. Likewise, users should be able to responsibly log out, and not have any actions done on their behalf without being associated with their logging in. 

Lastly, this method needs to be integrateable with other services - the current goal is to have user authentication via Github FIRST.

## Considered Options
- Session IDs
- JWTs