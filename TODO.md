# TODO

## Must to have
- add mongodb schema validations
- ask cline if it makes any sense to have interfaces and models separate in the backend
- setup favicon, page title, etc.
- move endpoint addresses and secrets to ENV files
  - only with regards to the backend. handle frontend envs in gh actions
- fix entity imports
- refactoring tasklist:
  - usequery hooks into a separate folder and files
  - make favoritegame card and games.tsx game card the same (add flexibility into data handling)
  - make dropdown logic in the individual game page shared
  - most files in the routes/ folder are terrible slop, e.g.:
    - bettinglines.tsx
    - favoritegames.tsx
    - goalies.tsx
    - login.tsx
    - players.tsx
    - signup.tsx
    - teams.tsx
  - refactor the above into components, utils, services, hooks
- implement some general UI improvements
  - for example: better landing page experience when there are only few recent games
  - ^this needs more complicated fetching logic
  - show number of games under the dates in the calendar view
- start impelementing testing & linting & formatting pipeline (gh actions)
  - deployment in a single ec2 instance (t2.medium)
- make file names and function/type/component names consistent in general
- unify to double quotes

## Nice to have
- solve favoritegames n+1 problem using graphql
  - would need to create new features as currently there is no n+1 problem
- add shadcn ui library
- 2025/02/18: installed, need to learn how to use
- maybe watch a youtube video
- let AI create the custom components
- implement middleware in the backend
- enrich the team stats bar in the individual game view (faceoffs etc. add moneypuck link)
