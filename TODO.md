# TODO

- add shadcn ui library
  - 2025/02/18: installed, need to learn how to use
  - maybe watch a youtube video
  - let AI create the custom components
- move endpoint addresses and secrets to ENV files
- fix entity imports
- implement middleware in the backend
- refactoring tasklist:
  - usequery hooks into a separate file
  - most files in the routes/ folder are terrible slop, refactor into components, utils, services, hooks
  - refactor the useQuery boxscore hook into its own file
- more data integrations, such as natural stat trick and moneypuck, polymarket sports
- in the game page, make it consistent so that player statistics dropdown is not shown if there is no data (rather than being grayed out)
- add redis for caching. not only to the postgres backend, but also external nhl api thru nginx
- create a mongodb database to store api info as-is
- testing/formatting pipeline
- some feature ideas:
  - add statistics pages
    - centered around betting odds. which teams have outperformed, underperformed the odds?
    - past winning odds
  - add features to record parlays and returns
  - simulate betting strategies
    - "for the past 30 games, simulate the returns for betting for a Hellebuyck win"
  - add "statistics about the season" page
    - goal averages, PP averages, save-% averages, etc.
  - enrich the view for past games, add filters, implement a proper search, using generative AI

  tasks for 6/12:
  - consider redis caching for nginx using lua scripts