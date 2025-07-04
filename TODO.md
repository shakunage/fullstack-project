# TODO

## Must to have
- refactoring tasklist:
  - make dropdown logic in the individual game page shared
  - most files in the routes/ folder are terrible slop, e.g.:
    - login.tsx
    - signup.tsx
- add proper validations into signup and login
- make use of react router v7 route types
- add typing to loaders
- make file names and function/type/component names consistent in general
- unify to single quotes (prettier)
- fix imports to make use of tilde (default directory)
- move backend endpoint addresses and secrets to ENV files
- setup favicon, page title, etc.
- write up a readme on how to run the app
- start impelementing testing & linting & formatting pipeline (gh actions)
  - deployment in a single ec2 instance (t2.medium)

## Nice to have
- show number of games under the dates in the calendar view
- add shadcn ui library
  - 2025/02/18: installed, need to learn how to use
- maybe watch a youtube video
- let AI create the custom components
- implement middleware in the backend
