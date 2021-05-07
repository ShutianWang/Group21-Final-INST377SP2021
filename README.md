# Music Database

## Description
The music industry is a competitive one, and there is often more to it than just luck. Being able to easily navigate through a collection of information on recent music that has proven to be successful could allow those trying to break into the industry to those looking to maintain their position to see what has worked in the past and learn from it. Our database provides information on the music and artists that have made it to the Billboard Top 100 in the previous years, and allows viewers to navigate through this data.

## Website
https://evening-sea-24521.herokuapp.com/

## Target Browsers
* Chrome 21+
* Internet Explorer 10+
* Firefox 28+
* Safari 6.1+

## Links
* [About Us](https://evening-sea-24521.herokuapp.com/about.html)

# Developer Manual

## Installation
1. Clone or download the repository and move to local directory
2. Run terminal in the install directory
3. Perform ```npm install``` in terminal, which installs dependencies 

## Running on a Server
1. Run terminal in the install directory
2. Perform ```npm start``` in terminal which launches the server
3. To visit the server go to ```http://localhost:3000/``` in your browser

## Running Tests
Currently there are no tests prebuilt.
Cypress allows customs tests to be run, and is one of the packages. To start Cypress:
1. Start the server using "npm start"
2. Start Cypress using "npm test"

## API
### ```/api``` - API for Music Database
* ```/albums```- album information from database
  * ```/album_id```- specific album information associated with provided id
* ```/artist```- artist information from database
  * ```/artist_id```- specific artist information associated with provided id
* ```/charting```- charting information from database
  * ```/charting_id```- specific charting information associated with provided id
* ```/songs```- song information from database
  * ```/song_id```- specific song information associated with provided id
* ```/genres```- genre information from database
  * ```/genre_id```- specific genre information associated with provided id

* ```GET``` -  returns database information in json format
* ```POST``` - creates new entry in database
* ```PUT``` - replaces entry under provided id
* ```DELETE``` - deletes entry under provided id


## Known Bugs

## Future Development
