const { map, filter } = require("rxjs");

const fetchAndProcessData = () => {
  const apiUrl = 'https://thingspeak.com/channels/2474011/field/1.json';

  return fetch(apiUrl)
    .then(response => {
      // Check if the response is successful (status code 200)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Parse the JSON from the response
      return response.json();
    })
    .then(data => {
      let values = { data: [] };
      for (let key of data["feeds"]) {
        let value = key["field1"];
        let date = key["created_at"];
        date=date.replaceAll('T'," ")
        date=date.replaceAll('Z'," ")
        let id = key["entry_id"];
        values['data'].push({ "id": id, "value": value, "date": date });
      }
      values['data'] = values['data'].filter(data => {
        return data["value"] != null;
      });
      return values; // Return the treated data
    })
    .catch(error => {
      // Handle any errors that occur during the fetch
      console.log(error);
      throw error; // Rethrow the error to propagate it to the caller
    });
};

module.exports = fetchAndProcessData;