# cs260startup
## Specification Deliverable

### Elevator Pitch
Do you keep track of your books read on *Goodreads* (or something similar) and the movies you watch on something like *Letterboxd*? Do you wish you could see what video games you have played and what you thought of them? This video game tracking application makes it so the user can record what games they have played, give it a score so they can see thought, and review the lists created by their friends. There is no other software exclusively for video game tracking like this.

### Design
![mockup_startup_01.png](https://github.com/kilom3ters/cs260startup/blob/main/mockup_startup_01.png)

### Key Features
- Secure login over HTTPS
- Ability to select games
- Full library of games to review
- Friend list of other users
- Lists visible from all users
- Lists and reviews are stored for future access by all users
- Real time updating of games played

### Technologies
I will use the following technologies:
- **HTML** - Uses correct HTML structure for the application. I plan to have two HTML pages. One for users pages and one for friends pages.
- **CSS** - Application styling that will look good on a variety of screen sizes, makes good use of whitespace, color choice and contrast.
- **React** - Allows for login, list of games that users can interact with, displaying ratings, and routing and components
- **Service** - Backend service with endpoints for:
    - login
    - add game lists
    - remove/change data
    - use third party API to collect game data using this [link](https://www.igdb.com/api)
- **DB/Login** - Store games, lists, and user data. Register and store user logins.
- **WebSocket** - Allow users to see other user's list info. Allow users to see friends.