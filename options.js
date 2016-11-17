function saveOptions(e) {
  browser.storage.local.set({
    location: document.querySelector("#options").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#options").value = result.location || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("location");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
