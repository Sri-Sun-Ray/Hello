let unsavedChanges=false;
const rowImages=new Map();

// Delegated event listener: if an <input>, <select>, or <textarea> changes anywhere
// in the document, set unsavedChanges=true. You could refine the selector if needed.
document.addEventListener("change", function (event) {
  // Only if the target is an input, select, or textarea:
  if (event.target.matches("input, select, textarea")) {
    unsavedChanges = true;
  }
});

//A variable t0 store station information

let stationName="";
let stationId="";
let zone=[];
let division=[];
let intialDate="";
let updateDate="";
var data=[];

document.addEventListener("DOMContentLoaded", function () {
  // No need to toggle .active in the click events.
  // Instead, rely on showSection to do it conditionally.
});

async function showSection(section){
      // 1) If user tries to navigate away with unsaved changes, confirm
  if (unsavedChanges) {
    const proceed = confirm("You have unsaved changes in this section. Do you want to continue?");
    if (!proceed) {
      // The user canceled -> do not change sections and do NOT highlight new button
      return;
    } else {
      // The user chose to continue -> discard unsaved changes
      unsavedChanges = false;
    }
  }
  // 2) Now it's safe to switch sections AND highlight the new button
  const buttons = document.querySelectorAll(".sidebar .button");
  buttons.forEach(btn => btn.classList.remove("active")); // remove from all
   // 3) Find the clicked button that triggered showSection('X') by matching the 'section' somehow
  // For example, if each button's onclick calls showSection with a unique section ID, you can
  // compare that ID to something stored in a data attribute:
  const newActiveBtn = [...buttons].find(btn => {
    // If your button code is `onclick="showSection('1_0')"`,
    // you might store data-section="1_0" or parse the onclick attribute.
    return btn.getAttribute('onclick') === `showSection('${section}')`;
  });
  if (newActiveBtn) {
    newActiveBtn.classList.add("active");
  }
  // 4) Finally, do the rest of your code that actually loads the new section's content
  console.log("Showing section:", section);
  // ... your logic to fetch or display that section's data ...



  const mainContent = document.getElementById("main-content");
  const currentDate = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD
  //const locoInfo = JSON.parse(sessionStorage.getItem("locoInfo")); // Get saved loco info
  //const locoInfo = JSON.parse(localStorage.getItem("locoDetails") || "{}");

  // console.log("locoInfo is:", locoInfo);
  // First, try to get loco info from sessionStorage (for a fresh page)
  const storedLocal = localStorage.getItem("locoDetails");
  const storedSession = sessionStorage.getItem("locoInfo");

   let locoInfo = {};
   if (storedLocal) {
    // If localStorage has data, use it (edit mode)
    locoInfo = JSON.parse(storedLocal);
  } else if (storedSession) {
    // Otherwise, if sessionStorage is present, use that (fresh page)
    locoInfo = JSON.parse(storedSession);
  }
  else {
    // Otherwise, nothing is set → use empty defaults
    locoInfo = {
      stationName:"",
      stationId:"",
      zone:[],
      division:[],
      intialDate:"",
      updateDate:""
    };
  }

   console.log("locoInfo is:", locoInfo);
}