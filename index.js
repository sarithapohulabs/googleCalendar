const express = require('express');
const { google } = require('googleapis');

const app = express();

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCEA4NyzzUMnJye\nrhoKkBmLiJrZb0UNMYGlTk1J0AqP/hjOiYIgMQgXTsj3nVF6aniW9VBm/wONzk0F\n9vIuVU1gy4LSIRHdz7KGJEpnNa6d9mMKPzV/UpUawoJ2t6uOgAr6tCLlIrkuqZwK\n92QIADfrOuX2ERlCrDtgVJk/jot1swSXgZq6jdHcX4kwL6cVP5ofkUC7rJ8WoKNx\noMfc8nGOiedSfiRxBe/ByU63gOtoRQ5WI5gHd3L3hq0z37SMToq7ns4XuST2IZ7g\nX2Ln/I/s90PxKum597zqvoxYG0JJPqsMqj38ADlhApOmhBd0mzcQZLTtn+9l2/Mb\nMtQhvkd/AgMBAAECgf8mi2Wj0C3MmQAeDia43EPQyZWkfuzrWrAHR+2ebYXuedxR\nV51AyPJ4AM2Hq0fEBThVhepZ5XSCzAHLLTNRTIB5m6QwtjRaSpoaDqdZFwdk9lXE\nUPbReri1QigulBGitGb+aAW5apwd0abzyBtCM1scqqwHFHUhAJCYYWGNmomuRKeb\nf//aBxIlqqtDp3iXcHia5qZ8xiPe2Ut423UHV/Xhl8rhmUDytav1I3XevomJaKlV\nuKSAKU/6BXUT6/9Ja2r66aG2lqdtAR85bnpcn0xWYz0rIPNtnHS3kS5nBskKRSpt\nF8RtrhfpvGHNtM+E/o/pcE8verTudrQ7EpRS0CECgYEAuYe7BnTLiZVJIWJHGCzd\n2CY2mLj15OwETDPLre6ffR/pw4zF37QBzTaFW2cCAWe/4CAPXASpq5s2XXHQugP3\nTYyYa3U3NTmwz+3m4fLnRa1gLX+1GMS4Z8FSPFkjXhnDydnSYXmW4OULC10pa902\nlrLSImHYO12s1uDpfiDwZ58CgYEAtigKCp4RnlHQehvF7MwZH5wnLVgZds+wmNqV\nr1SJsPm/T+NnJaefznU7RZtkFIu8kOXSS5TV6gfOamu1LXCaBMrq+atbrLpCm2K9\nIMyu6bHP+383T+6IUqw178GAcYU8Ryylg0PAiB0/6MTYTmUb7VmfnSPYc89ctW9L\nQH6HlCECgYEAt5//G4S9bo6ysrfyZZsCdsxbfQyTUt/F4SXikWN7tvu/AixyK9ad\ncd5kXvK0qW9mGQ2iJhD3XUFhrVrYm0MRoU9mC/UXjzZqKWHtAfTHsc7HQkEDnGAX\no5lTKyeOObSGc2GDN7Z//lazd6vdM0TeooiaMi1lNlyglIxGjO9NAUECgYEAjwe5\nesTLiMktLfSI4XsRbySqDozS0dwbCqr4RgfXZkN02UHySDrq3K5osCtn1koy8oPD\nMN3Zaj5e8mlIhjmYdpLvFsRa47INgv1xDEQsRAv/B7fIstbV7DSU1YHXXUwFHM4N\n2JhmoXp2KEwInOX/m8t37WesGqOEZGLTb/zqcIECgYEAi4pJjk6+AbBttnkYRnoq\n/vwkOVn3P3VEfts0rYcnqm370ZJ3NtGw5/8U/5jXl1pTZwrEtjv7VXEiGJC09cii\n8cw18x2sG0jR/rhrq0Wy4De2fj4ajbTOew0CmHRRFNQHCIBPz3eJFg8Wgtdjz1ke\nppEPQT/P9RhMfhNrn/9CIqM=\n-----END PRIVATE KEY-----\n"
const GOOGLE_CLIENT_EMAIL = "my-calendar@my-calendar-376806.iam.gserviceaccount.com"
const GOOGLE_PROJECT_NUMBER = "986559712475"
const GOOGLE_CALENDAR_ID = "f5b0ed4c4dd4f057d5f6b9df62076d5cfe8f80a14ab68767490042e9400ac92a@group.calendar.google.com"


const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES
);

const calendar = google.calendar({
    version: 'v3',
    project: GOOGLE_PROJECT_NUMBER,
    auth: jwtClient
});

app.get('/', (req, res) => {

  calendar.events.list({
    calendarId: GOOGLE_CALENDAR_ID,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (error, result) => {
    if (error) {
      res.send(JSON.stringify({ error: error }));
    } else {
      if (result.data.items.length) {
        res.send(JSON.stringify({ events: result.data.items }));
      } else {
        res.send(JSON.stringify({ message: 'No upcoming events found.' }));
      }
    }
  });
});

app.get("/createEvent",(req,res)=>{
    var event = 
    //     {
    //   'summary': 'My first event!',
    //   'location': 'Hyderabad,India',
    //   'description': 'First event with nodeJS!',
    //   'start': {
    //     'dateTime': '2022-01-12T09:00:00-07:00',
    //     'timeZone': 'Asia/Dhaka',
    //   },
    //   'end': {
    //     'dateTime': '2022-01-14T17:00:00-07:00',
    //     'timeZone': 'Asia/Dhaka',
    //   },
    //   'attendees': [],
    //   'reminders': {
    //     'useDefault': false,
    //     'overrides': [
    //       {'method': 'email', 'minutes': 24 * 60},
    //       {'method': 'popup', 'minutes': 10},
    //     ],
    //   },
    // },
    {
        'summary': 'Febraury month strategy Discussion',
        'location': 'Bengaluru,Karnataka,India',
        'description': 'SERPS Backend backlog wind-off',
        'start': {
          'dateTime': '2023-02-06T09:00:00-10:00',
          'timeZone': 'Asia/Dhaka',
        },
        'end': {
          'dateTime': '2023-02-06T17:00:00-12:00',
          'timeZone': 'Asia/Dhaka',
        },
        'attendees': [],
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10},
          ],
        },
      };
    
    const auth = new google.auth.GoogleAuth({
      keyFile: 'C:/Users/saisa/Downloads/my-calendar-376806-490ca33b9e9a.json',
      scopes: 'https://www.googleapis.com/auth/calendar',
    });
    auth.getClient().then(a=>{
      calendar.events.insert({
        auth:a,
        calendarId: GOOGLE_CALENDAR_ID,
        resource: event,
      }, function(err, event) {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err);
          return;
        }
        console.log('Event created: %s', event.data);
        res.jsonp("Event successfully created!");
      });
    })
  })
  

app.listen(6001, () => console.log(`App listening on port 6001!`));