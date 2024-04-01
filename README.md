# Holidays

## Description

###  The course project

Create a web application to determine the time interval between given dates and to determine public holidays for a country in a selected year. The API will obtain data about countries and holidays from [the website](https://calendarific.com/). To do this, you will need to create an account on this site to use the API key in the work of the open API of this site.

### The basic idea of the app

The web page should contain 2 tabs:
- On the first tab, the user can select a date in the first input, then a date in the second input, and set additional parameters - then get the time interval between these dates.
- On the second tab, the user can select the country in the first input, then the year in the second input - and get a list of holidays with dates.

### Features of work tab #1

 1. Only after the user has selected one date in the first input, he can change the date in the second input, which is earlier than the date from the first input and vice versa
 2. The user can choose time interval presets:
    - 'week' (7 days)
    - 'month' (30 days)
 3. The user can choose options:
    - 'All days'
    - 'Working days'
    - 'Weekend'
 4. The user can choose options:
    - 'Count the number of days'
    - 'Calculate the number of hours'
    - 'Count the number of minutes'
    - 'Count number of seconds'
 5. The user can enter the application and see, if there are any, the last 10 results that he calculated in the form of a table (start date, end date, and what the measurement result is). To do this, use localStorage.

### Features of work tab #2

1. When the user enters this tab, a request must be made to [the endpoint](https://calendarific.com/api/v2/countries) to receive a list of all countries. This list will be used for the options in the first **'Select Country'** input.
2. The second input **'Select a year'** should contain a list of years from 2001 to 2049. This input should be blocked until the user selects a country.
3. The default value in the 'Select year' input should be the current year.
4. When both options are selected, you need to make a request to [the endpoint](https://calendarific.com/api/v2/holidays)
5. The obtained result should be presented in the form of a table with columns **'Date'** and **'Name of the holiday'**
6. For the **'Date'** column, there should be a clickable button on which the user can sort the holidays in chronological or reverse chronological order
7. If either of these two requests to endpoints fails, an error block should be displayed on the screen.

### General features of the application
1. The user should be able to comfortably work with this application from a mobile phone.
2. The user must be able to go to the real page of the application on the Internet (Github pages).
3. The interface should be in English or Ukrainian.

## The features
- [ ] #1 Create Readme.md and make a list of tasks.
- [x] #2 Create a page: HTML layout and attach CSS styles. Use Bootstrap.
- [ ] The issues/tickets of work tab #1:
  - [x] #3.1 Get the values of the start date and end date. Make sure that the end date is not earlier than the start date
  - [x] #3.2 The user can choose time interval presets: 'week' (7 days) / 'month' (30 days)
  - [x] #3.3 The user can choose options
  - [x] #3.4 Calculate the time interval between given dates
  - [ ] #3.5 The user can enter the application and see, if there are any, the last 10 results that he calculated in the form of a table (start date, end date, and what the measurement result is). To do this, use localStorage.
- [ ] The issues/tickets of work tab #2:
  - [ ] #4.1 Make request to [the endpoint](https://calendarific.com/api/v2/countries) to receive a list of all countries. This list will be used for the options in the first **'Select Country'** input.
  - [ ] #4.2 The second input **'Select a year'** should contain a list of years from 2001 to 2049. This input should be blocked until the user selects a country. The default value in the 'Select year' input should be the current year.
  - [ ] #4.3 When both options are selected, you need to make a request to [the endpoint](https://calendarific.com/api/v2/holidays). The obtained result should be presented in the form of a table with columns **'Date'** and **'Name of the holiday'**
  - [ ] #4.4 For the **'Date'** column, there should be a clickable button on which the user can sort the holidays in chronological or reverse chronological order
- [ ] #5 If either of these two requests to endpoints fails, an error block should be displayed on the screen.

<img src="./img/jpg/4865096.jpg" alt="image" width="300" height="auto">