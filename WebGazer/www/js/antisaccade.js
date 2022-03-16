// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true

webgazer
  .setGazeListener(function (data, elapsedTime) {
    if (data == null) {
      return
    }
    var xprediction = data.x //these x coordinates are relative to the viewport
    var yprediction = data.y //these y coordinates are relative to the viewport
    //elapsed time is based on time since begin was called
  })
  .begin()

function sendJSON() {
  let result = document.querySelector(".result")
  let name = document.querySelector("#name")
  let email = document.querySelector("#email")

  // Creating a XHR object
  let xhr = new XMLHttpRequest()
  let url = "submit.php"

  // open a connection
  xhr.open("POST", url, true)

  // Set the request header i.e. which type of content you are sending
  xhr.setRequestHeader("Content-Type", "application/json")

  // Create a state change callback
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Print received data from server
      result.innerHTML = this.responseText
    }
  }

  // Converting JSON data to string
  var data = JSON.stringify({ name: name.value, email: email.value })

  // Sending data with the request
  xhr.send(data)
}
