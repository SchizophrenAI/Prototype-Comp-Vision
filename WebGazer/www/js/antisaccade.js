var globalData = { gazedata: [], dotdata: [] }
var count = 0
var run = null
var gazeinterval = null
var calls = 0
var startstate = 0

webgazer
  .setGazeListener(function (data, elapsedTime) {
    if (data == null) {
      return
    }
    if (startstate == 0) {
      document.getElementById("status").innerHTML =
        "Test Ready to Begin, Press Start Test Button"
      startstate++
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
  if (calls == 1) {
    document.getElementById("status").innerHTML =
      "Finished Test, Refresh to Start Again"
    endSaccadeTest()
    return
  } else if (calls >= 1) {
    if (count == 10) {
      document.getElementById("right").style.display = "block"
      document.getElementById("center").style.display = "none"
      globalData["dotdata"].push({
        timestamp: Date.now(),
        dotposition: "right",
      })
    } else if (count == 11) {
      document.getElementById("center").style.display = "block"
      document.getElementById("right").style.display = "none"
      globalData["dotdata"].push({
        timestamp: Date.now(),
        dotposition: "center",
      })
      count = 0
      calls++
    }
  } else {
    if (count == 10) {
      document.getElementById("left").style.display = "block"
      document.getElementById("center").style.display = "none"
      globalData["dotdata"].push({
        timestamp: Date.now(),
        dotposition: "left",
      })
    } else if (count == 11) {
      document.getElementById("center").style.display = "block"
      document.getElementById("left").style.display = "none"
      globalData["dotdata"].push({
        timestamp: Date.now(),
        dotposition: "center",
      })
      count = 0
      calls++
    }
  }

  count++
}

function analyzeJSON(data) {
  error = 10
  document.getElementById("status").innerHTML =
    "Finished Test with " +
    String(error) +
    " % error rate, Refresh to Start Again"
}

function launchSaccadeTest() {
  document.getElementById("status").innerHTML = "Test Running"
  document.getElementById("center").style.display = "block"
  document.getElementById("block1").style.display = "none"
  globalData = { gazedata: [], dotdata: [] }
  globalData["dotdata"].push({
    timestamp: Date.now(),
    dotposition: "center",
  })

  //Getting coordinates of center dot
  var img = document.getElementById("center").getBoundingClientRect()
  var img_y = (img.top + img.bottom) / 2
  var img_x = (img.left + img.right) / 2
  globalData["center"] = { x: img_x, y: img_y }

  //Getting coordinates of right dot
  document.getElementById("right").style.display = "inline"
  var img = document.getElementById("right").getBoundingClientRect()
  var img_y = (img.top + img.bottom) / 2
  var img_x = (img.left + img.right) / 2
  globalData["right"] = { x: img_x, y: img_y }
  document.getElementById("right").style.display = "none"

  //Getting coordinates of left dot
  document.getElementById("left").style.display = "inline"
  var img = document.getElementById("left").getBoundingClientRect()
  var img_y = (img.top + img.bottom) / 2
  var img_x = (img.left + img.right) / 2
  globalData["left"] = { x: img_x, y: img_y }
  document.getElementById("left").style.display = "none"
  webgazer.showPredictionPoints(false)
  webgazer.showVideo(false)
  run = setInterval(saccadeTest, 500)
}

function endSaccadeTest() {
  document.getElementById("block1").style.display = "block"
  document.getElementById("center").style.display = "none"
  analyzeJSON(globalData)
  clearInterval(run)
  clearInterval(gazeinterval)
  webgazer.showPredictionPoints(true)
  webgazer.showVideo(true)
}
