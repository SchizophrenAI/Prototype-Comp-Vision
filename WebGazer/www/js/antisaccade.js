// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true

function sendJSON(data) {
  fetch("http://localhost:8000/collector", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    console.log("Request complete! response:", res)
  })
}
