Assigment 3 in React

The goal is to create an app to enable users to edit team information, including teamleader, teammembers, and projects. A card interface for each Team’s information has been used.

public/index.html
The app will get mounted into <main id="root"></div>.

src/index.js
I used both React and ReactDOM. index.js is used to render the app.

ReactDOM will render <TeamApp React component into root element in the DOM. 

React will look into root element in DOM and control the contents of displayed page. Once any changed has been made, it will automatically changed on the web page.

src/components/TeamInfo.js
1) Layout: Popover component:
Used to show the content of top of Save botton. The way to experience is just clicking the SAVE botton and placing mouse over it.

2) Layout: Box
Used to wrap all labels, buttons and multi-select components for CSS purpose.

3) Surface: Cards
Used to contain displayed information of teams and projects. 

4) Inputs: Buttons
Used to contain update/save action 

5) Inputs: Multiple Select
Used to collect mutiple team members and projects chosen. 

src/TeamApp.js
Used to customize Material-UI with theme, content of page, set colors and typography, and elements positions.
The effect hook (useEffect) is used to fetch the data with axios from the TeamAPI and to set the data in select area. The promise resolving happens with async/await. 

Steps to run this app:
1)npm run build
2)npm start
3)run the web server located at http://localhost:3000/