# cs260startup
## Specification Deliverable

### Elevator Pitch
Do you keep track of your books read on *Goodreads* (or something similar) and the movies you watch on something like *Letterboxd*? Do you wish you could see what video games you have played and what you thought of them? This video game tracking application makes it so the user can record what games they have played, give it a score so they can see thought, and review the lists created by their friends. There is no other software exclusively for video game tracking like this.

### Design
![mockup_startup_02.png](https://github.com/kilom3ters/cs260startup/blob/main/mockup_startup_02.png)
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
- **HTML** - Uses correct HTML structure for the application. I plan to have three HTML pages. One for login/account creation, one for users pages, and one for friends pages.
- **CSS** - Application styling that will look good on a variety of screen sizes, makes good use of whitespace, color choice and contrast.
- **React** - Allows for login, list of games that users can interact with, displaying ratings, and routing and components
- **Service** - Backend service with endpoints for:
    - login
    - add game lists
    - remove/change data
    - use third party API to collect game data using this [link](https://www.igdb.com/api)
- **DB/Login** - Store games, lists, and user data. Register and store user logins.
- **WebSocket** - Allow users to see other user's list info. Allow users to see friends.

## HTML Deliverable

For this deliverable, I did the following:

- **HTML Pages** – Three different pages:  
  - index.html: Welcome page with a short description and a link to the login page.  
  - login.html: Login form with entry fields for user name and password.  
  - user.html: Displays the user's profile, game lists, favorite game, stats, and realtime data of the user's friends games, reviews, lists, and stats.

- **Proper HTML Usage** – I used multiple HTML elements, including header, footer, main, nav, img, a, and many more. I spent time learing how to use fieldset, input, button, form, section, and table.

- **Links** – Links between pages to allow navigation:  
  - The login page links to the user profile.  
  - The user page has a logout button that returns to the welcome page.  

- **Text** – The landing page (index.html) includes a description of the website and a welcome message.  

- **3rd-Party API** – The user profile page (user.html) includes a placeholder to fetch video game information from a third-party API. This will eventually be used to populate the **favorite game**, **games played**, and **user-created lists**.  

- **Images** – A placeholder **profile picture** is visible on the user profile page (user.html).  

- **Login** – The login page includes an HTML form where users can enter their chosen username and password. There is temporarily a "Skip Login" button to simplify the login step until the functionality of the login feature can be worked out.

- **DB Data** – The user page has a database placeholder that will store **games played** and **user lists**. The for now the HTML structure uses a table element to show data.  

- **WebSocket** – The user page contains a place where real-time updates to **friends' pages** will be displayed. New **games added** and **reviews written** by friends will appear in real-time.  
