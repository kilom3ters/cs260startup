# cs260startup
## Specification Deliverable

### Elevator Pitch
Do you keep track of your books read on *Goodreads* (or something similar) and the movies you watch on something like *Letterboxd*? Do you wish you could see what video games you have played and what you thought of them? This video game tracking application makes it so the user can record what games they have played, give it a score so they can see thought, and review the lists created by their friends. There is no other software exclusively for video game tracking like this.

### Design
![./public/mockup_startup_02.png](https://github.com/kilom3ters/cs260startup/blob/main/mockup_startup_02.png)
![./public/mockup_startup_01.png](https://github.com/kilom3ters/cs260startup/blob/main/mockup_startup_01.png)


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

## CSS Deliverable

For this deliverable, I:

- ** Header, footer, and main content body **  
  - I used a CSS file (styles.css) to style the header, footer, and main content for the index.html page.
  - The user profile page has additional styling in user-styles.css.

- ** Navigation elements**  
  - Implemented a **Bootstrap Navbar** for easy navigation and search functionality.
  - The sidebar menu provides quick access to user features.

- ** Responsive to window resizing**  
  - Used **Bootstrap grid system** and display: flex; to ensure all elements resize properly.
  - The **mobile layout stacks sections** vertically and moves the log-out button to the bottom.

- ** Application elements**  
  - Used **CSS flexbox** and **Bootstrap utilities** to align and organize elements properly.
  - Ensured the sidebar remains fixed on larger screens and disappears on mobile.

- ** Application text content**  
  - Set the default font to **Verdana** for a clean, modern look.

- ** Application images**  
  - Ensured profile and game images are properly scaled using max-width: 100% inside responsive containers.
  - Used **Bootstrap utility classes** for consistent image alignment.

 **Additional Features**:
- The **Login page** follows a **two-column layout** on desktop but stacks properly on mobile.
- The **Log Out button** moves to the bottom only when the sidebar is hidden.
- The **User Profile page** dynamically adjusts the sidebar, user stats, and game lists for both desktop and mobile.

## React Part 1 Deliverable

### Transition to React
For this deliverable, I transitioned my application to a React-based architecture. The application now functions correctly for a single user, with structured components and placeholders for future enhancements.

### Components
- **Home.jsx**: Contains buttons for navigation using React Router instead of a navbar.
- **Login.jsx**: Includes login and account creation forms, as well as a "Skip Login" button for quick navigation.
- **User.jsx**: Displays the user profile, game statistics, and a list of friends, with full sidebar functionality.
- **Buttons & Forms**: All buttons dynamically navigate using useNavigate() from React Router.

### Routing
- Implemented React Router for page transitions:
  - / → Home page with navigation buttons.
  - /login → Login page with sign-in and account creation.
  - /user → User profile and game list.

### CSS & Styling Fixes
- All pages now scale properly across screen sizes.
- Forms and buttons are centered correctly inside their respective sections.
- Prevented shrinking issues on input fields when resizing.
- Login and Create Account buttons now properly align and shift with the screen size.

### Mobile Responsiveness
- Used CSS media queries to handle layout changes for small screens.
- On mobile, the sidebar is hidden, and the navigation buttons scale properly.
- The login page adapts to stack components correctly for mobile users.

### Future Implementations
- **Database Integration**: Game lists and friend lists will be stored using database integration in the future.
- **WebSocket Placeholder**: Future functionality will include real-time updates for user interactions between friends and friend's lists.

## React Part 2 Deliverable

For this deliverable, I made the following updates:

### Features Implemented
- **All functionality implemented or mocked out**  
  - Local storage is used to store user data, stats, and game logs.  
  - User profiles now properly save profile pictures, favorite games, and friends.

- **Hooks (useState, useEffect, useRef)**
  - Use of useEffect to update local storage when data changes.  
  - **Dynamic UI updates**:
    - Profile picture section dynamically shows "Add Profile Picture" if none is set.
    - Favorite game section dynamically shows "Add Favorite Game" or "Edit Favorite Game".
    - GameLogs now correctly track total unique games and display "No games logged yet" when empty.

## Service Deliverable

For this deliverable, I implemented a backend service that supports user authentication and integrates a third-party API for displaying quotes.

### Features Implemented
- **Node.js/Express HTTP service** - Created a backend service using Node.js and Express.
- **Static middleware for frontend** - Configured Express to serve the frontend using static middleware.
- **Calls to third-party endpoints** - Implemented a route that fetches quotes from an external API and displays them on the homepage.
- **Backend service endpoints** - Implemented endpoints for:
  - User registration
  - User login
  - Logout functionality
- **Frontend calls service endpoints** - Used the fetch API in the frontend to interact with backend endpoints.
- **Supports registration, login, logout, and restricted endpoints** - Implemented authentication using sessions and cookies.
