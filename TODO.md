# TODO

## Must to have
- refactoring tasklist:
  - make dropdown logic in the individual game page shared
  - most files in the routes/ folder are terrible slop, e.g.:
    - favoritegames.tsx
    - goalies.tsx
    - login.tsx
    - players.tsx
    - signup.tsx
    - teams.tsx
  - refactor the above into components, utils, services, hooks
- start impelementing testing & linting & formatting pipeline (gh actions)
  - deployment in a single ec2 instance (t2.medium)
- add typing to loaders
- implement middleware in the backend
- add proper validations into signup and login
- make file names and function/type/component names consistent in general
- unify to single quotes (prettier)
- fix imports to make use of tilde (default directory)
- make use of react router v7 route types
- move endpoint addresses and secrets to ENV files
  - only with regards to the backend. handle frontend envs in gh actions
- setup favicon, page title, etc.
- write up a readme on how to run the app

## Nice to have
- show number of games under the dates in the calendar view
- add shadcn ui library
  - 2025/02/18: installed, need to learn how to use
- maybe watch a youtube video
- let AI create the custom components