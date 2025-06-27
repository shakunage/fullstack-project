# TODO

## Must to have
- something weird with the player stats dropdown. it shows old data without even trying to load new data
- implement some general UI improvements
  - make teams and players filterable by playoffs/regular season of a selectable season (2010-2025) 
    - add path parameters: :season/:playoffs
- refactoring tasklist:
  - usequery hooks into a separate folder and files
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
- add proper validations into signup and login
- make file names and function/type/component names consistent in general
- unify to single quotes
- fix imports to make use of tilde (default directory)
- make us of react router v7 route types
- move endpoint addresses and secrets to ENV files
  - only with regards to the backend. handle frontend envs in gh actions
- setup favicon, page title, etc.

## Nice to have
- add typing to loaders
- show number of games under the dates in the calendar view
- add shadcn ui library
  - 2025/02/18: installed, need to learn how to use
- maybe watch a youtube video
- let AI create the custom components
- implement middleware in the backend
