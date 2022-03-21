var globalData = { gazedata: [], dotdata: [] }
var count = 0
var run = null
var gazeinterval = null
var calls = 0
var startstate = 0
var starttime = null
var trials = 2

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
      timestamp: timestamp - starttime,
      x: data.x,
      y: data.y,
    })
  })
  .begin()

webgazer.saveDataAcrossSessions(true)

function saccadeTest() {
  if (calls == trials) {
    // document.getElementById("status").innerHTML =
    //   "Finished Test, Refresh to Start Again"

    clearInterval(run)
    clearInterval(gazeinterval)
    endSaccadeTest()
    return
  } else if (calls >= parseInt(trials / 2)) {
    if (count == 10) {
      document.getElementById("right").style.display = "block"
      document.getElementById("center").style.display = "none"
      globalData["dotdata"].push({
        timestamp: Date.now() - starttime,
        dotposition: "right",
      })
    } else if (count == 11) {
      document.getElementById("center").style.display = "block"
      document.getElementById("right").style.display = "none"
      globalData["dotdata"].push({
        timestamp: Date.now() - starttime,
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
        timestamp: Date.now() - starttime,
        dotposition: "left",
      })
    } else if (count == 11) {
      document.getElementById("center").style.display = "block"
      document.getElementById("left").style.display = "none"
      globalData["dotdata"].push({
        timestamp: Date.now() - starttime,
        dotposition: "center",
      })
      count = 0
      calls++
    }
  }

  count++
}

function analyzeJSON(data) {
  console.log(data)
  var gazedata = data["gazedata"]
  var dotdata = data["dotdata"]
  var left = data["left"]
  var right = data["right"]
  var center = data["center"]
  var skip = 5
  var trial_incorrect = [] //array to store the number of points that are on the incorrect side in that sequence
  var switch_time = null
  var reset_time = null
  var switch_dir = null
  var gazepiont = null
  var gazetime = null

  for (let dotswitch = 1; dotswitch <= trials * 2; dotswitch += 2) {
    trial_incorrect[dotswitch] = 0
    switch_time = dotdata[dotswitch]["timestamp"]
    reset_time = dotdata[dotswitch + 1]["timestamp"]
    switch_dir = dotdata[dotswitch]["dotposition"]
    for (let gazeindex = 0; gazeindex < gazedata.length; gazeindex++) {
      gazepoint = gazedata[gazeindex]
      gazetime = gazepoint["timestamp"]
      if (gazetime > switch_time && gazetime <= reset_time) {
        if (skip > 0) {
          skip -= 1
        } else {
          // console.log(switch_dir, switch_dir == "left", switch_dir == "right")
          if (switch_dir == "left" && gazepoint["x"] < center["x"]) {
            // console.log("error left")
            trial_incorrect[dotswitch] = trial_incorrect[dotswitch] + 1
          } else if (switch_dir == "right" && gazepoint["x"] > center["x"]) {
            // console.log("error right")
            trial_incorrect[dotswitch] = trial_incorrect[dotswitch] + 1
          }
        }
      }
    }
  }

  var num_incorrect = 0 // number of trials that are incorrect
  for (let i = 0; i <= trial_incorrect.length; i++) {
    if (trial_incorrect[i] > 0) {
      num_incorrect += 1
    }
  }
  console.log(trial_incorrect, num_incorrect)

  var error = (num_incorrect / trials) * 100

  document.getElementById("status").innerHTML =
    "Finished Test with " + String(error) + " % error, Refresh to Start Again"
}

function launchSaccadeTest() {
  document.getElementById("status").innerHTML = "Test Running"
  document.getElementById("center").style.display = "block"
  document.getElementById("block1").style.display = "none"
  globalData = { gazedata: [], dotdata: [] }
  starttime = Date.now()
  globalData["dotdata"].push({
    timestamp: Date.now() - starttime,
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
  // webgazer.showVideo(false)
  run = setInterval(saccadeTest, 500)
}

function endSaccadeTest() {
  document.getElementById("block1").style.display = "block"
  document.getElementById("center").style.display = "none"
  analyzeJSON(globalData)
  webgazer.showPredictionPoints(true)
  // webgazer.showVideo(true)
}
