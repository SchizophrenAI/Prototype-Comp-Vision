var globalData = { gazedata: [], dotdata: [] }
var count = 0
var run = null
var gazeinterval = null
var calls = 0

webgazer
  .setGazeListener(function (data, elapsedTime) {
    if (data == null) {
      return
    }
    var timestamp = Date.now()
    globalData["gazedata"].push({
      timestamp: timestamp,
      x: data.x,
      y: data.y,
    })
  })
  .begin()

webgazer.saveDataAcrossSessions(true)

function saccadeTest() {
  if (calls > 1) {
    document.getElementById("status").innerHTML =
      "Finished Test, Refresh to Start Again"
    endSaccadeTest()
    return
  } else if (calls > 10) {
    if (count == 10) {
      document.getElementById("right").style.display = "inline"
      document.getElementById("center").style.display = "none"
      center = false
      right = true
    } else if (count == 11) {
      document.getElementById("center").style.display = "inline"
      document.getElementById("right").style.display = "none"
      center = true
      right = false
      count = 0
      calls++
    }
  } else {
    if (count == 10) {
      document.getElementById("left").style.display = "inline"
      document.getElementById("center").style.display = "none"
      center = false
      left = true
    } else if (count == 11) {
      document.getElementById("center").style.display = "inline"
      document.getElementById("left").style.display = "none"
      center = true
      left = false
      count = 0
      calls++
    }
  }

  count++
}

function sendJSON(data) {
  console.log(data)
  fetch("http://localhost:8000/collector", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    console.log("Request complete! response:", res)
  })
}

function launchSaccadeTest() {
  document.getElementById("right").style.display = "none"
  document.getElementById("left").style.display = "none"
  document.getElementById("status").innerHTML = "Test Running"
  globalData = { gazedata: [], dotdata: [] }
  webgazer.showPredictionPoints(false)
  webgazer.showVideo(false)
  run = setInterval(saccadeTest, 500)
}

function endSaccadeTest() {
  sendJSON(globalData)
  clearInterval(run)
  clearInterval(gazeinterval)
  webgazer.showPredictionPoints(true)
  webgazer.showVideo(true)
}
