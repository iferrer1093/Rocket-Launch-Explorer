Github Repo: https://github.com/iferrer1093/Rocket-Launch-Explorer

In the callback version, getUpComingLaunches accepts the populateDropdown as a callback function argument. Once XMLHttpRequest finishes and parses the response it executes the callback and passes the array of launch results directly into the dropdown options.

The Axios refactor replaces the XHR with promise based requests through axios.get. We didn't need to check if we got onReadyStatus === 4 and status === 200 because the Axios.get already does that for us. The .then() (or try for references sake) handles successful responses by getting the response data and throwing that data into the HTML. The .catch block (same as in other languages) handles any errors that we might receive and will display a failure message if something has gone awry. It places that error into the status element. 
