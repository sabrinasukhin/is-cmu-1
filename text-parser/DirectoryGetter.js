const https = require('https');

module.exports = {
  andrewidLookup: andrewidLookup
};

function andrewidLookup(input, callback, emitStatus) {
  emitStatus("Sending request to ScottyLabs...");
  https.get(`https://apis.scottylabs.org/directory/v1/andrewID/${input}`, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      emitStatus("Received response. Parsing...");

      try {
        callback(true, JSON.parse(data));
      }
      catch {
        callback(false);
      }
    });

  }).on("error", (err) => {
    console.error("Error: " + err.message);
  });
}
