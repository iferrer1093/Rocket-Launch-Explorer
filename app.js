// ** JavaScript Starter File **
// Purpose: Populate a dropdown of upcoming launches and display mission details
// and a rocket image using callbacks (Part 1), then refactor to promises (Part 2).

// Space Devs development endpoint: no rate limits, but the data is stale and limited.
const BASE_URL = "https://lldev.thespacedevs.com/2.3.0";

// ---------------------------------------------------------------
// PART 1: XMLHttpRequest and callbacks
// ---------------------------------------------------------------

// Step 1: Create getUpcomingLaunches(callback)
// - Makes a GET request to BASE_URL + "/launches/upcoming/"
// - Parses the response
// - Calls the callback function and passes the results array
function getUpcomingLaunches() {
    const status = document.getElementById("status")
    status.textContent = "Loading..."
  axios.get(BASE_URL + "/launches/upcoming/")
  .then(function (response) {
    status.textContent = ""
    populateDropdown(response.data.results)
  })
  .catch(function (error) {
    status.textContent = ("Couldn't load launches: " + error)
    console.log("Error getting launches:", error)
  })
}

// Step 2: Create populateDropdown(launches)
// - Receives an array of launches
// - Adds one <option> per launch: text = launch name, value = launch id
function populateDropdown(launches) {
  // TODO: Iterate and append <option> elements
  const dropdown = document.getElementById("launchDropdown")
  launches.forEach(launch => {
    const option = document.createElement("option")
    option.textContent = launch.name
    option.value = launch.id
    dropdown.appendChild(option)
  });
  
}

// Step 3: Add event listener to #launchDropdown
// - On change, get the selected launch ID
// - Call getLaunchDetails(launchId, callback)
document.getElementById("launchDropdown").addEventListener("change", function () {
  // TODO: Get selected launchId
  // TODO: Call getLaunchDetails
  const launchId = this.value
  getLaunchDetails(launchId, displayLaunchInfo)
});

// Step 4: Create getLaunchDetails(launchId, callback)
// - Makes a GET request to BASE_URL + "/launches/" + launchId + "/"
// - Parses the response and passes the launch object to the callback
function getLaunchDetails(launchId) {
    const status = document.getElementById("status")
    status.textContent = "Loading..."

  axios.get(BASE_URL + "/launches/" + launchId + "/")
  .then(function (response) {
    status.textContent = ""
    displayLaunchInfo(response.data)
  })
  .catch(function (error) {
    status.textContent = ("Failed to get launch details" + error)
    console.log("Error getting launch details" + error)
  })
}

// Step 5: Create displayLaunchInfo(launch)
// - Updates #missionDetails with the mission name and description (if available)
// - Creates an image of the rocket (launch.rocket.configuration.image.image_url) and appends it to #rocket
// - If no image is available, displays a message instead
function displayLaunchInfo(launch) {
  // TODO: Display mission name and description
  // TODO: Display the rocket image
  const missionDetails = document.getElementById("missionDetails")
  missionDetails.textContent = ""
  const rocket = document.getElementById("rocket")
  rocket.textContent = ""
  
  const missionName = document.createElement("h2")
  missionName.textContent = launch.name
  missionDetails.appendChild(missionName)
  const descriptionParagraph = document.createElement("p")

  if (launch.mission && launch.mission.description) {
    descriptionParagraph.textContent = launch.mission.description
  } else {
    descriptionParagraph.textContent = "No mission description is available for this launch. "
  }
  missionDetails.appendChild(descriptionParagraph)

  if (
    launch.rocket && launch.rocket.configuration && launch.rocket.configuration.image && launch.rocket.configuration.image.image_url
  ) {
    const img = document.createElement("img")
    img.src = launch.rocket.configuration.image.image_url
    img.alt = launch.rocket.configuration.name || "Image of a rocket"
    rocket.appendChild(img)
  } else {
    const imgMessage = document.createElement("p")
    imgMessage.textContent = "No rocket image is available for this mission"
    rocket.appendChild(imgMessage)
  }
}

// Final step: kick off the flow
getUpcomingLaunches(populateDropdown);

// ---------------------------------------------------------------
// PART 2: Axios and promises (refactor after Part 1 is committed)
// ---------------------------------------------------------------
// - Replace both XHR requests with axios.get(...).then(...).catch(...)
// - Show "Loading..." in #status while a request is pending
// - Show a clear error message in #status when a request fails
// - Clear the status message when data arrives
