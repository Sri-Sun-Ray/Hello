let unsavedChanges = false;
const rowImages = new Map(); // Store images for each row

// Delegated event listener: if an <input>, <select>, or <textarea> changes anywhere
// in the document, set unsavedChanges=true.
document.addEventListener("change", function (event) {
  if (event.target.matches("input, select, textarea")) {
    unsavedChanges = true;
  }
});

// Variables to store station info from session or none
let stationId = "";
let stationName = "";
let zone = [];
let division = [];
let initialDate = "";
let updatedDate = "";

var data = [];

// showSection() is your main function that loads HTML content by 'section' key
document.addEventListener("DOMContentLoaded", function () {
  // No need to toggle .active in the click events.
  // Instead, rely on showSection to do it conditionally.
});

// Update division dropdown based on selected zone
function updateDivisionNames() {
  const zoneSelect = document.getElementById("zone");
  const divisionSelect = document.getElementById("division");
  const selectedZone = zoneSelect.value;

  // Store the current division value to restore it if possible
  const currentDivision = divisionSelect.value;

  // Clear existing options
  divisionSelect.innerHTML = '<option value="" disabled selected>Select</option>';

  // Define all divisions with their corresponding zones
  const divisions = [
    { name: "Mumbai", zone: "CR" },
    { name: "Nagpur", zone: "CR" },
    { name: "Bhusawal", zone: "CR" },
    { name: "Pune", zone: "CR" },
    { name: "Sholapur", zone: "CR" },
    { name: "Howrah-COO", zone: "ER" },
    { name: "Pt Deendayal Upadhy - Pradhankhnta", zone: "ECR" },
    { name: "Matura-Palwal", zone: "NCR" },
    { name: "Jhansi", zone: "NCR" },
    { name: "Nanded-Aurangabad", zone: "SCR" },
    { name: "Vijayawada - Ballarshah", zone: "SCR" },
    { name: "Bangalore - Mysore", zone: "SWR" },
    { name: "Bajva - Ahmedabad", zone: "WR" },
    { name: "Ahmedabad", zone: "WR" },
    { name: "Ratlam", zone: "WR" },
    { name: "Rajkot", zone: "WR" },
    { name: "Bhopal", zone: "WCR" },
    { name: "Matura-Nagda", zone: "WCR" }
  ];

  // Filter divisions for the selected zone
  const filteredDivisions = divisions.filter(div => div.zone === selectedZone);

  // Add filtered divisions to the dropdown
  filteredDivisions.forEach(div => {
    const option = document.createElement("option");
    option.value = div.name;
    option.text = div.name;
    option.setAttribute("data-zone", div.zone);
    if (div.name === currentDivision) {
      option.selected = true;
    }
    divisionSelect.appendChild(option);
  });

  // If no divisions are available for the selected zone, ensure the dropdown is reset
  if (filteredDivisions.length === 0) {
    divisionSelect.value = "";
  }
}

// In showSection, decide if it's okay to switch sections, and if so, highlight the new button.
async function showSection(section) {
  if (unsavedChanges) {
    const proceed = confirm("You have unsaved changes in this section. Do you want to continue?");
    if (!proceed) {
      return;
    } else {
      unsavedChanges = false;
    }
  }

  const buttons = document.querySelectorAll(".sidebar .button");
  buttons.forEach(btn => btn.classList.remove("active"));

  const newActiveBtn = [...buttons].find(btn => {
    return btn.getAttribute('onclick') === `showSection('${section}')`;
  });

  if (newActiveBtn) {
    newActiveBtn.classList.add("active");
  }

  console.log("Showing section:", section);

  const mainContent = document.getElementById("main-content");
  const currentDate = new Date().toISOString().split("T")[0];

  const storedLocal = localStorage.getItem("stationDetails");
  const storedSession = sessionStorage.getItem("stationInfo");

  let stationInfo = {};
  if (storedLocal) {
    stationInfo = JSON.parse(storedLocal);
  } else if (storedSession) {
    stationInfo = JSON.parse(storedSession);
  } else {
    stationInfo = {
      stationId: "",
      stationName: "",
      zone: "",
      division: "",
      initialDate: "",
      updatedDate: ""
    };
  }

  console.log("stationInfo is:", stationInfo);

  const stationIdVal = document.getElementById("station-id")?.value;
  const divisionVal = document.getElementById("division")?.value;
  const zoneVal = document.getElementById("zone")?.value;

  const exists = await checkExistingObservations(stationIdVal, divisionVal, zoneVal, section);

  setTimeout(() => {
    const actionButtons = document.querySelector('.action-buttons');
    if (actionButtons) {
      const saveBtn = actionButtons.querySelector('#save-btn');
      const getDetailsBtn = actionButtons.querySelector('#get-details-btn');
      const updateBtn = actionButtons.querySelector('#update-btn');
      
      if (exists) {
        if (saveBtn) saveBtn.style.display = 'none';
        if (getDetailsBtn) getDetailsBtn.style.display = 'inline-block';
        if (updateBtn) updateBtn.style.display = 'none';
      } else {
        if (saveBtn) saveBtn.style.display = 'inline-block';
        if (getDetailsBtn) getDetailsBtn.style.display = 'none';
        if (updateBtn) updateBtn.style.display = 'none';
      }
    }
  }, 100);

  const stationIdElem = document.getElementById("station-id");
  if (stationIdElem) {
    stationIdElem.value = stationInfo.stationId || "";
  }

  const stationNameElem = document.getElementById("station-name");
  if (stationNameElem) {
    stationNameElem.value = stationInfo.stationName || "";
  }

  const zoneElem = document.getElementById("zone");
  if (zoneElem) {
    zoneElem.value = stationInfo.zone || "";
  }

  const divisionElem = document.getElementById("division");
  if (divisionElem) {
    divisionElem.value = stationInfo.division || "";
  }

  const initialDateElem = document.getElementById("initial-date");
  if (initialDateElem) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    initialDateElem.value = `${year}-${month}-${day}`;
  }

  const updatedDateElem = document.getElementById("updated-date");
  if (updatedDateElem) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    updatedDateElem.value = `${year}-${month}-${day}`;
  }

  const stationDetailsHTML = `
    <div id="form-container">
      <section>
        <form id="stationForm" action="connect.php" method="POST">
          <table class="detail-box station-table">
            <tr>
              <td><strong>Station ID:</strong><input type="text" id="station-id" placeholder="Enter the Station ID" value="${stationInfo ? stationInfo.stationId : ""}"></td>
              <td><strong>Station Name:</strong><input type="text" id="station-name" placeholder="Enter the Station Name" value="${stationInfo ? stationInfo.stationName : ""}"></td>
              <td><strong>Zone:</strong>
                <select name="zone" id="zone" onchange="updateDivisionNames()">
                  <option value="" disabled selected>Select</option>
                  <option value="CR" ${stationInfo && stationInfo.zone === "CR" ? "selected" : ""}>Central Railway</option>
                  <option value="ER" ${stationInfo && stationInfo.zone === "ER" ? "selected" : ""}>Eastern Railway</option>
                  <option value="ECR" ${stationInfo && stationInfo.zone === "ECR" ? "selected" : ""}>East Central Railway</option>
                  <option value="ECoR" ${stationInfo && stationInfo.zone === "ECoR" ? "selected" : ""}>East Coast Railway</option>
                  <option value="NR" ${stationInfo && stationInfo.zone === "NR" ? "selected" : ""}>Northern Railway</option>
                  <option value="NCR" ${stationInfo && stationInfo.zone === "NCR" ? "selected" : ""}>North Central Railway</option>
                  <option value="NER" ${stationInfo && stationInfo.zone === "NER" ? "selected" : ""}>North Eastern Railway</option>
                  <option value="NFR" ${stationInfo && stationInfo.zone === "NFR" ? "selected" : ""}>North Frontier Railway</option>
                  <option value="NWR" ${stationInfo && stationInfo.zone === "NWR" ? "selected" : ""}>North Western Railway</option>
                  <option value="SR" ${stationInfo && stationInfo.zone === "SR" ? "selected" : ""}>Southern Railway</option>
                  <option value="SCR" ${stationInfo && stationInfo.zone === "SCR" ? "selected" : ""}>South Central Railway</option>
                  <option value="SER" ${stationInfo && stationInfo.zone === "SER" ? "selected" : ""}>South Eastern Railway</option>
                  <option value="SECR" ${stationInfo && stationInfo.zone === "SECR" ? "selected" : ""}>South East Central Railway</option>
                  <option value="SWR" ${stationInfo && stationInfo.zone === "SWR" ? "selected" : ""}>South Western Railway</option>
                  <option value="WR" ${stationInfo && stationInfo.zone === "WR" ? "selected" : ""}>Western Railway</option>
                  <option value="WCR" ${stationInfo && stationInfo.zone === "WCR" ? "selected" : ""}>West Central Railway</option>
                </select>
              </td>
              <td><strong>Division:</strong>
                <select id="division">
                  <option value="" disabled selected>Select</option>
                  <option value="Mumbai" data-zone="CR" ${stationInfo && stationInfo.division === "Mumbai" ? "selected" : ""}>Mumbai</option>
                  <option value="Nagpur" data-zone="CR" ${stationInfo && stationInfo.division === "Nagpur" ? "selected" : ""}>Nagpur</option>
                  <option value="Bhusawal" data-zone="CR" ${stationInfo && stationInfo.division === "Bhusawal" ? "selected" : ""}>Bhusawal</option>
                  <option value="Pune" data-zone="CR" ${stationInfo && stationInfo.division === "Pune" ? "selected" : ""}>Pune</option>
                  <option value="Sholapur" data-zone="CR" ${stationInfo && stationInfo.division === "Sholapur" ? "selected" : ""}>Sholapur</option>
                  <option value="Howrah-COO" data-zone="ER" ${stationInfo && stationInfo.division === "Howrah-COO" ? "selected" : ""}>Howrah-COO</option>
                  <option value="Pt Deendayal Upadhy - Pradhankhnta" data-zone="ECR" ${stationInfo && stationInfo.division === "Pt Deendayal Upadhy - Pradhankhnta" ? "selected" : ""}>Pt Deendayal Upadhy - Pradhankhnta</option>
                  <option value="Matura-Palwal" data-zone="NCR" ${stationInfo && stationInfo.division === "Matura-Palwal" ? "selected" : ""}>Matura-Palwal</option>
                  <option value="Jhansi" data-zone="NCR" ${stationInfo && stationInfo.division === "Jhansi" ? "selected" : ""}>Jhansi</option>
                  <option value="Nanded-Aurangabad" data-zone="SCR" ${stationInfo && stationInfo.division === "Nanded-Aurangabad" ? "selected" : ""}>Nanded-Aurangabad</option>
                  <option value="Vijayawada - Ballarshah" data-zone="SCR" ${stationInfo && stationInfo.division === "Vijayawada - Ballarshah" ? "selected" : ""}>Vijayawada - Ballarshah</option>
                  <option value="Bangalore - Mysore" data-zone="SWR" ${stationInfo && stationInfo.division === "Bangalore - Mysore" ? "selected" : ""}>Bangalore - Mysore</option>
                  <option value="Bajva - Ahmedabad" data-zone="WR" ${stationInfo && stationInfo.division === "Bajva - Ahmedabad" ? "selected" : ""}>Bajva - Ahmedabad</option>
                  <option value="Ahmedabad" data-zone="WR" ${stationInfo && stationInfo.division === "Ahmedabad" ? "selected" : ""}>Ahmedabad</option>
                  <option value="Ratlam" data-zone="WR" ${stationInfo && stationInfo.division === "Ratlam" ? "selected" : ""}>Ratlam</option>
                  <option value="Rajkot" data-zone="WR" ${stationInfo && stationInfo.division === "Rajkot" ? "selected" : ""}>Rajkot</option>
                  <option value="Bhopal" data-zone="WCR" ${stationInfo && stationInfo.division === "Bhopal" ? "selected" : ""}>Bhopal</option>
                  <option value="Matura-Nagda" data-zone="WCR" ${stationInfo && stationInfo.division === "Matura-Nagda" ? "selected" : ""}>Matura-Nagda</option>
                </select>
              </td>
              <td><strong>Initial Date:</strong><input type="date" id="initial-date" style="font-family: inherit; font-size: inherit; color: inherit; border: 1px solid #ccc; padding: 5px 10px;" /></td>
              <td><strong>Updated Date:</strong><input type="date" id="updated-date" style="font-family: inherit; font-size: inherit; color: inherit; border: 1px solid #ccc; padding: 5px 10px;" /></td>
            </tr>
          </table>
        </form>
      </section>
    </div>
  `;

  mainContent.innerHTML = stationDetailsHTML;

  // Update division dropdown based on stored zone value
  if (stationInfo.zone) {
    updateDivisionNames();
    const divisionSelect = document.getElementById("division");
    if (divisionSelect && stationInfo.division) {
      divisionSelect.value = stationInfo.division;
    }
  }

  setTimeout(() => {
    const initialDateInput = document.getElementById("initial-date");
    if (initialDateInput) {
      let dateValue = stationInfo && stationInfo.initialDate ? new Date(stationInfo.initialDate) : new Date(currentDate);
      const year = dateValue.getFullYear();
      const month = String(dateValue.getMonth() + 1).padStart(2, "0");
      const day = String(dateValue.getDate()).padStart(2, "0");
      initialDateInput.value = `${year}-${month}-${day}`;
      console.log("Initial date set to:", `${day}-${month}-${year}`);
    } else {
      console.error('Input with id="initial-date" not found.');
    }
  }, 0);

  setTimeout(() => {
    const updatedDateInput = document.getElementById("updated-date");
    if (updatedDateInput) {
      let dateValue = stationInfo && stationInfo.updatedDate ? new Date(stationInfo.updatedDate) : new Date(currentDate);
      const year = dateValue.getFullYear();
      const month = String(dateValue.getMonth() + 1).padStart(2, "0");
      const day = String(dateValue.getDate()).padStart(2, "0");
      updatedDateInput.value = `${year}-${month}-${day}`;
      console.log("Updated date set to:", `${day}-${month}-${year}`);
    } else {
      console.error('Input with id="updated-date" not found.');
    }
  }, 0);

  // Dynamically load content based on the section clicked
  if (section === "0.0") {
    let saveBtnDisplay = "inline-block";
    let getDetailsBtnDisplay = "none";
    
    // Check if we came from the Edit button in viewReports.php
    const urlParams = new URLSearchParams(window.location.search);
    const stationIdFromUrl = urlParams.get('station_id');
    
    // If we came from the Edit button, show Get Details and hide Save
    if (stationIdFromUrl) {
      saveBtnDisplay = "none";
      getDetailsBtnDisplay = "inline-block";
    }
    mainContent.innerHTML += `
      <div class="actio-buttons">
         <button
          id="save-station-info-btn"
          type="button"
          onclick="saveLocoInfo('station-info')"
          style="display:${saveBtnDisplay};"
        >
          Save Station Info
        </button>
        <button
          id="get-details-btn"
          data-section="0.0"
          onclick="getDetails()"
          style="display:${getDetailsBtnDisplay};"
        >
          Get Details
        </button>
        
      </div>
    `;
  }else if (section === "2.0") {
    // For all other sections, add Save Observation button
    mainContent.innerHTML += `
      <h3 class="section-heading">Equipment serial number verification:</h3>
      <div class="table-container">
      <table class="observations" id="observations-section-2_0">
        <thead>
          <tr>
            <th>S_No</th>
            <th>Description</th>
            <th>Observation</th>
            <th>Remarks/Comments</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody id="observations-tbody-2_0">
        <tr id="row-4">
        <td>2.1</td>
      <td class="observation_text">Stationary TCAS unit</td>
      <td>
        <select id="status-dropdown" onchange="highlightSelect(this)">
           <option value="Select">Select</option>
           <option value="Present">Present</option>
           <option value="Not Present">Not Present</option>
        </select>
      </td>
      <td class ="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td style="padding-right: 10px;">
    <button class="add-image" onclick="showUploadOptions(4)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Add Image</button>
    <div class="upload-options" id="upload-options-4" style="display: none;">
      <button class="add-image" onclick="startCamera(4)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Camera</button>
      <label for="file-input-4" class="upload-label" style="cursor: pointer; padding: 5px 10px; font-size: 14px;">Upload from Device</label>
      <input type="file" id="file-input-4" accept="image/*" multiple onchange="displayImages(this, 4)" style="display: none;">
    </div>
      <!-- Container for multiple images --> 
      <div id="image-container-4"></div>
      <!-- Camera Container -->
    <div id="camera-container-4" style="display: none;">
      <video id="camera-4" width="100%" height="auto" autoplay></video>
      <button class="add-image" onclick="captureImage(4)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Capture Image</button>
      <button class="add-image" onclick="stopCamera(4)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Stop Camera</button>
      <button class="reverse-camera" onclick="switchCamera(4)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">🔄 Switch Camera</button>
      <canvas id="canvas-4" style="display: none;"></canvas>
    </div>
  </td>

    </tr>

    <tr id="row-5">
  <td>2.2</td>
  <td class="observation_text" style="padding-right: 10px;">
    Peripheral Processing Card 1
  <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
    oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "/>
  </td>
  

  
  <td class="select" style="padding-right: 10px;">
    <select id="status-dropdown" onchange="highlightSelect(this)" style="width: 180px; padding: 5px; font-size: 14px;">
      <option value="Select">Select</option>
      <option value="Matching">Matching</option>
      <option value="Not Matching">Not Matching</option>
      <option value="Not Installed">Not Installed</option>
    </select>
  </td>
  
  <td class="remarks" style="padding-right: 10px;">
    <textarea placeholder="Verify with IC" rows="2" cols="20" style="width: 180px; padding: 5px; font-size: 14px;"></textarea><br>
  </td>
  
  <td style="padding-right: 10px;">
    <button class="add-image" onclick="showUploadOptions(5)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Add Image</button>
    <div class="upload-options" id="upload-options-5" style="display: none;">
      <button class="add-image" onclick="startCamera(5)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Camera</button>
      <label for="file-input-5" class="upload-label" style="cursor: pointer; padding: 5px 10px; font-size: 14px;">Upload from Device</label>
      <input type="file" id="file-input-5" accept="image/*" multiple onchange="displayImages(this, 5)" style="display: none;">
    </div>
      <!-- Container for multiple images --> 
      <div id="image-container-5"></div>
      <!-- Camera Container -->
    <div id="camera-container-5" style="display: none;">
      <video id="camera-5" width="100%" height="auto" autoplay></video>
      <button class="add-image" onclick="captureImage(5)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Capture Image</button>
      <button class="add-image" onclick="stopCamera(5)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Stop Camera</button>
      <button class="reverse-camera" onclick="switchCamera(5)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">🔄 Switch Camera</button>
      <canvas id="canvas-5" style="display: none;"></canvas>
    </div>
  </td>
</tr>
<tr id="row-6">
  <td>2.3</td>
  <td class="observation_text" style="padding-right: 10px;">
    Peripheral Processing Card 2
    <input 
      type="text" 
      id="kavach-main-unit" 
      name="barcode_kavach_main_unit" 
      pattern="^\d{10,15}$" 
      title="Enter a number between 10 to 15 digits" 
      placeholder="Scan Barcode" 
      style="width:180px; padding:5px; font-size:14px;" 
      oninput="
        if (this.value.length > 15) this.value = this.value.slice(-15);
        toggleNotInstalledOption(this);
      "
    >
  </td>
  <td class="select" style="padding-right: 10px;">
    <select id="status-dropdown" onchange="highlightSelect(this)" style="width: 180px; padding: 5px; font-size: 14px;">
      <option value="Select">Select</option>
      <option value="Matching">Matching</option>
      <option value="Not Matching">Not Matching</option>
      <option value="Not Installed">Not Installed</option>
    </select>
  </td>
  
  <td class="remarks" style="padding-right: 10px;">
    <textarea placeholder="Verify with IC" rows="2" cols="20" style="width: 180px; padding: 5px; font-size: 14px;"></textarea><br>
  </td>
  
  <td style="padding-right: 10px;">
    <button class="add-image" onclick="showUploadOptions(6)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Add Image</button>
    <div class="upload-options" id="upload-options-6" style="display: none;">
      <button class="add-image" onclick="startCamera(6)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Camera</button>
      <label for="file-input-6" class="upload-label" style="cursor: pointer; padding: 5px 10px; font-size: 14px;">Upload from Device</label>
      <input type="file" id="file-input-6" accept="image/*" multiple onchange="displayImages(this, 6)" style="display: none;">
   </div>
      <!-- Container for multiple images --> 
      <div id="image-container-6"></div>
      <!-- Camera Container -->
    <div id="camera-container-6" style="display: none;">
      <video id="camera-6" width="100%" height="auto" autoplay></video>
      <button class="add-image" onclick="captureImage(6)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Capture Image</button>
      <button class="add-image" onclick="stopCamera(6)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Stop Camera</button>
      <button class="reverse-camera" onclick="switchCamera(6)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">🔄 Switch Camera</button>
      <canvas id="canvas-6" style="display: none;"></canvas>
    </div>
  </td>
</tr>
<tr id="row-7">
  <td>2.4</td>
  <td class="observation_text">
    Vital Computer Card 1
    <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
  <td class="select">
    <select id="status-dropdown" onchange="highlightSelect(this)" style="width: 180px; padding: 5px; font-size: 14px; margin-bottom: 10px;">
      <option value="Select">Select</option>
      <option value="Matching">Matching</option>
      <option value="Not Matching">Not Matching</option>
      <option value="Not Installed">Not Installed</option>
    </select>
  </td>
  <td class="remarks">
    <textarea placeholder="Verify with IC" rows="2" cols="20" style="width: 180px; height: 50px; padding: 5px; font-size: 14px; margin-bottom: 10px;"></textarea><br>
  </td>
 <td style="padding-right: 10px;">
    <button class="add-image" onclick="showUploadOptions(7)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Add Image</button>
    <div class="upload-options" id="upload-options-7" style="display: none;">
      <button class="add-image" onclick="startCamera(7)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Camera</button>
      <label for="file-input-7" class="upload-label" style="cursor: pointer; padding: 5px 10px; font-size: 14px;">Upload from Device</label>
      <input type="file" id="file-input-7" accept="image/*" multiple onchange="displayImages(this, 7)" style="display: none;">
   </div>
      <!-- Container for multiple images --> 
      <div id="image-container-7"></div>
      <!-- Camera Container -->
    <div id="camera-container-7" style="display: none;">
      <video id="camera-7" width="100%" height="auto" autoplay></video>
      <button class="add-image" onclick="captureImage(7)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Capture Image</button>
      <button class="add-image" onclick="stopCamera(7)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Stop Camera</button>
      <button class="reverse-camera" onclick="switchCamera(7)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">🔄 Switch Camera</button>
      <canvas id="canvas-7" style="display: none;"></canvas>
    </div>
  </td>
</tr>
<tr id="row-8">
  <td>2.5</td>
   <td class="observation_text">
    Vital Computer Card 2<input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
   oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
  
  </td>
  <td class="select">
    <select id="status-dropdown" onchange="highlightSelect(this)" style="width: 180px; padding: 5px; font-size: 14px; margin-bottom: 10px;">
      <option value="Select">Select</option>
      <option value="Matching">Matching</option>
      <option value="Not Matching">Not Matching</option>
      <option value="Not Installed">Not Installed</option>
    </select>
  </td>
  <td class="remarks">
    <textarea placeholder="Verify with IC" rows="2" cols="20" style="width: 180px; height: 50px; padding: 5px; font-size: 14px; margin-bottom: 10px;"></textarea><br>
  </td>
  <td style="padding-right: 10px;">
    <button class="add-image" onclick="showUploadOptions(8)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Add Image</button>
    <div class="upload-options" id="upload-options-8" style="display: none;">
      <button class="add-image" onclick="startCamera(8)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Camera</button>
      <label for="file-input-8" class="upload-label" style="cursor: pointer; padding: 5px 10px; font-size: 14px;">Upload from Device</label>
      <input type="file" id="file-input-8" accept="image/*" multiple onchange="displayImages(this, 8)" style="display: none;">
   </div>
      <!-- Container for multiple images --> 
      <div id="image-container-8"></div>
      <!-- Camera Container -->
    <div id="camera-container-8" style="display: none;">
      <video id="camera-8" width="100%" height="auto" autoplay></video>
      <button class="add-image" onclick="captureImage(8)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Capture Image</button>
      <button class="add-image" onclick="stopCamera(8)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Stop Camera</button>
      <button class="reverse-camera" onclick="switchCamera(8)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">🔄 Switch Camera</button>
      <canvas id="canvas-8" style="display: none;"></canvas>
    </div>
  </td>
</tr>

<tr id="row-9">
  <td>2.6</td>
   <td class="observation_text">
    Vital Computer Card 3<input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
  </td>
  
  <td class="select">
    <select id="status-dropdown" onchange="highlightSelect(this)" style="width: 180px; padding: 5px; font-size: 14px; margin-bottom: 10px;">
      <option value="Select">Select</option>
      <option value="Matching">Matching</option>
      <option value="Not Matching">Not Matching</option>
      <option value="Not Installed">Not Installed</option>
    </select>
  </td>
  <td class="remarks">
    <textarea placeholder="Verify with IC" rows="2" cols="20" style="width: 180px; height: 50px; padding: 5px; font-size: 14px; margin-bottom: 10px;"></textarea><br>
  </td>
  <td style="padding-right: 10px;">
    <button class="add-image" onclick="showUploadOptions(9)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Add Image</button>
    <div class="upload-options" id="upload-options-9" style="display: none;">
      <button class="add-image" onclick="startCamera(9)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Camera</button>
      <label for="file-input-9" class="upload-label" style="cursor: pointer; padding: 5px 10px; font-size: 14px;">Upload from Device</label>
      <input type="file" id="file-input-9" accept="image/*" multiple onchange="displayImages(this, 9)" style="display: none;">
    </div>
      <!-- Container for multiple images --> 
      <div id="image-container-9"></div>
      <!-- Camera Container -->
    <div id="camera-container-9" style="display: none;">
      <video id="camera-9" width="100%" height="auto" autoplay></video>
      <button class="add-image" onclick="captureImage(9)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Capture Image</button>
      <button class="add-image" onclick="stopCamera(9)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">Stop Camera</button>
      <button class="reverse-camera" onclick="switchCamera(9)" style="margin-left: 10px; padding: 5px 10px; font-size: 14px; cursor: pointer;">🔄 Switch Camera</button>
      <canvas id="canvas-9" style="display: none;"></canvas>
    </div>
  </td>
</tr>
<tr id="row-10">
  <td>2.7</td>
  <td class="observation_text">
     Voter Card 1<input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
  </td>
  <td class="select">
    <select id="status-dropdown" onchange="highlightSelect(this)">
      <option value="Select">Select</option>
      <option value="Matching">Matching</option>
      <option value="Not Matching">Not Matching</option>
      <option value="Not Installed">Not Installed</option>
    </select>
  </td>
  <td class="remarks">
    <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
  </td>
  <td>
    <button class="add-image" onclick="showUploadOptions(10)">Add Image</button>
    <div class="upload-options" id="upload-options-10" style="display: none;">
      <button class="add-image" onclick="startCamera(10)">Camera</button>
      <label for="file-input-10" class="upload-label" style="cursor: pointer; padding: 5px 10px; font-size: 14px;">Upload from Device</label>
      <input type="file" id="file-input-10" accept="image/*" multiple onchange="displayImages(this, 10)">
   </div>
      <!-- Container for multiple images --> 
      <div id="image-container-10"></div>
      <!-- Camera Container -->
    <div id="camera-container-10" style="display: none;">
      <video id="camera-10" width="100%" height="auto" autoplay></video>
      <button class="add-image" onclick="captureImage(10)">Capture Image</button>
      <button class="add-image" onclick="stopCamera(10)">Stop Camera</button>
      <button class="reverse-camera" onclick="switchCamera(10)">🔄 Switch Camera</button>
      <canvas id="canvas-10" style="display: none;"></canvas>
    </div>
  </td>
</tr>

<tr id="row-11">
  <td>2.8</td>
  <td class="observation_text">
    Voter Card 2<input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
  </td>
  <td class="select">
    <select id="status-dropdown" onchange="highlightSelect(this)">
      <option value="Select">Select</option>
      <option value="Matching">Matching</option>
      <option value="Not Matching">Not Matching</option>
      <option value="Not Installed">Not Installed</option>
    </select>
  </td>
  <td class="remarks">
    <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
  </td>
  <td>
    <button class="add-image" onclick="showUploadOptions(11)">Add Image</button>
    <div class="upload-options" id="upload-options-11" style="display: none;">
      <button class="add-image" onclick="startCamera(11)">Camera</button>
      <label for="file-input-11" class="upload-label" style="cursor: pointer; padding: 5px 10px; font-size: 14px;">Upload from Device</label>
      <input type="file" id="file-input-11" accept="image/*" multiple onchange="displayImages(this, 11)">
    </div>
      <!-- Container for multiple images --> 
      <div id="image-container-11"></div>
      <!-- Camera Container -->
    <div id="camera-container-11" style="display: none;">
      <video id="camera-11" width="100%" height="auto" autoplay></video>
      <button class="add-image" onclick="captureImage(11)">Capture Image</button>
      <button class="add-image" onclick="stopCamera(11)">Stop Camera</button>
      <button class="reverse-camera" onclick="switchCamera(11)">🔄 Switch Camera</button>
      <canvas id="canvas-11" style="display: none;"></canvas>
    </div>
  </td>
</tr>

<tr id="row-12">
  <td>2.9</td>
  <td class="observation_text">
   Vital Gateway Card 1 <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
  
  </td>
  <td class="select">
    <select id="status-dropdown" onchange="highlightSelect(this)">
      <option value="Select">Select</option>
      <option value="Matching">Matching</option>
      <option value="Not Matching">Not Matching</option>
      <option value="Not Installed">Not Installed</option>
    </select>
  </td>
  <td class="remarks">
    <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
  </td>
  <td>
    <button class="add-image" onclick="showUploadOptions(12)">Add Image</button>
    <div class="upload-options" id="upload-options-12" style="display: none;">
      <button class="add-image" onclick="startCamera(12)">Camera</button>
      <label for="file-input-12" class="upload-label" style="cursor: pointer; padding: 5px 10px; font-size: 14px;">Upload from Device</label>
      <input type="file" id="file-input-12" accept="image/*" multiple onchange="displayImages(this, 12)">
    </div>
      <!-- Container for multiple images --> 
      <div id="image-container-12"></div>
      <!-- Camera Container -->
    <div id="camera-container-12" style="display: none;">
      <video id="camera-12" width="100%" height="auto" autoplay></video>
      <button class="add-image" onclick="captureImage(12)">Capture Image</button>
      <button class="add-image" onclick="stopCamera(12)">Stop Camera</button>
      <button class="reverse-camera" onclick="switchCamera(12)">🔄 Switch Camera</button>
      <canvas id="canvas-12" style="display: none;"></canvas>
    </div>
  </td>
</tr>

          </tr>
          <tr id="row-13">
            <td>2.10</td>
           <td class="observation_text">Vital Gateway Card 2
           <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
           
          </td>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
              <td>
       <button class="add-image" onclick="showUploadOptions(13)">Add Image</button>
<div class="upload-options" id="upload-options-13" style="display: none;">
  <button class="add-image" onclick="startCamera(13)">Camera</button>
  <label for="file-input-13" class="upload-label" style="cursor: pointer; padding: 5px 10px; font-size: 14px;">Upload from Device</label>
  <input type="file" id="file-input-13" accept="image/*" multiple onchange="displayImages(this, 13)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-13"></div>
      <!-- Camera Container -->
<div id="camera-container-13" style="display: none;">
  <video id="camera-13" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(13)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(13)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(13)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-13" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>

          </tr>
          <tr id="row-14">
            <td >2.11</td>
           <td class="observation_text"> Integrated Data Logger Card (IDL)
           <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
   oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/> 
          </td>

        
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
             <td>
       <button class="add-image" onclick="showUploadOptions(14)">Add Image</button>
<div class="upload-options" id="upload-options-14" style="display: none;">
  <button class="add-image" onclick="startCamera(14)">Camera</button>
  <label for="file-input-14" class="upload-label" style="cursor: pointer; padding: 5px 10px; font-size: 14px;">Upload from Device</label>
  <input type="file" id="file-input-14" accept="image/*" multiple onchange="displayImages(this, 14)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-14"></div>
      <!-- Camera Container -->
<div id="camera-container-14" style="display: none;">
  <video id="camera-14" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(14)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(14)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(14)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-14" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>


          </tr>
          <tr id="row-15">
            <td>2.12</td>
           <td class="observation_text"> Dual GSM Card
        <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>  

            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
          <td>
       <button class="add-image" onclick="showUploadOptions(15)">Add Image</button>
<div class="upload-options" id="upload-options-15" style="display: none;">
  <button class="add-image" onclick="startCamera(15)">Camera</button>
 <label for="file-input-15" class="upload-label" style="cursor: pointer; padding: 5px 10px; font-size: 14px;">Upload from Device</label>
  <input type="file" id="file-input-15" accept="image/*" multiple onchange="displayImages(this, 15)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-15"></div>
      <!-- Camera Container -->
<div id="camera-container-15" style="display: none;">
  <video id="camera-15" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(15)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(15)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(15)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-15" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>


          </tr>
          <tr id="row-16">
            <td>2.13</td>
           <td class="observation_text">
  Field Scanner Card 1
  <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
  </div>
</td>

            <td class="select">
             <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
            <td>
       <button class="add-image" onclick="showUploadOptions(16)">Add Image</button>
<div class="upload-options" id="upload-options-16" style="display: none;">
  <button class="add-image" onclick="startCamera(16)">Camera</button>
  <label for="file-input-16" class="upload-label" style="cursor: pointer; padding: 5px 10px; font-size: 14px;">Upload from Device</label>
  <input type="file" id="file-input-16" accept="image/*" multiple onchange="displayImages(this, 16)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-16"></div>
      <!-- Camera Container -->
<div id="camera-container-16" style="display: none;">
  <video id="camera-16" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(16)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(16)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(16)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-16" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>


          </tr>
          <tr id="row-17">
            <td>2.14</td>
           <td class="observation_text">Field Scanner Card 2
          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
   oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
            <td>
       <button class="add-image" onclick="showUploadOptions(17)">Add Image</button>
<div class="upload-options" id="upload-options-17" style="display: none;">
  <button class="add-image" onclick="startCamera(17)">Camera</button>
 <label for="file-input-17" class="upload-label" style="cursor: pointer; padding: 5px 10px; font-size: 14px;">Upload from Device</label>
  <input type="file" id="file-input-17" accept="image/*" multiple onchange="displayImages(this, 17)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-17"></div>
      <!-- Camera Container -->
<div id="camera-container-17" style="display: none;">
  <video id="camera-17" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(17)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(17)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(17)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-17" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>

          </tr>
          <tr id="row-18">
            <td>2.15</td>
           <td class="observation_text">Field Scanner Card 3
          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(18)">Add Image</button>
<div class="upload-options" id="upload-options-18" style="display: none;">
  <button class="add-image" onclick="startCamera(18)">Camera</button>
<label for="file-input-18" class="upload-label" style="cursor: pointer; padding: 5px 10px; font-size: 14px;">Upload from Device</label>
  <input type="file" id="file-input-18" accept="image/*" onchange="displayImages(this, 18)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-18"></div>
      <!-- Camera Container -->
<div id="camera-container-18" style="display: none;">
  <video id="camera-18" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(18)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(18)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(18)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-18" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>


          </tr>
          <tr id="row-19">
            <td>2.16</td>
           <td class="observation_text">Field Scanner Card 4
           <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(19)">Add Image</button>
<div class="upload-options" id="upload-options-19" style="display: none;">
  <button class="add-image" onclick="startCamera(19)">Camera</button>
  <label for="file-input-19" class="upload-label" style="cursor: pointer; padding: 5px 10px; font-size: 14px;">Upload from Device</label>
  <input type="file" id="file-input-19" accept="image/*" multiple onchange="displayImages(this, 19)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-19"></div>
      <!-- Camera Container -->
<div id="camera-container-19" style="display: none;">
  <video id="camera-19" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(19)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(19)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(19)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-19" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>

          </tr>
          <tr id="row-20">
            <td>2.17</td>
           <td class="observation_text">Field Scanner Card 5
          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
    oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
            <td>
       <button class="add-image" onclick="showUploadOptions(20)">Add Image</button>
<div class="upload-options" id="upload-options-20" style="display: none;">
  <button class="add-image" onclick="startCamera(20)">Camera</button>
 <label for="file-input-20" class="upload-label" style="cursor: pointer; padding: 5px 10px; font-size: 14px;">Upload from Device</label>
  <input type="file" id="file-input-20" accept="image/*" multiple onchange="displayImages(this, 20)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-20"></div>
      <!-- Camera Container -->
<div id="camera-container-20" style="display: none;">
  <video id="camera-20" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(20)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(20)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(20)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-20" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>


          </tr>
          <tr id="row-21">
            <td>2.18</td>
           <td class="observation_text">Field Scanner Card 6
          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
            <td>
       <button class="add-image" onclick="showUploadOptions(21)">Add Image</button>
<div class="upload-options" id="upload-options-21" style="display: none;">
  <button class="add-image" onclick="startCamera(21)">Camera</button>
 <label for="file-input-21" class="upload-label" style="cursor: pointer; padding: 5px 10px; font-size: 14px;">Upload from Device</label>
  <input type="file" id="file-input-21" accept="image/*" multiple onchange="displayImages(this, 21)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-21"></div>
      <!-- Camera Container -->
<div id="camera-container-21" style="display: none;">
  <video id="camera-21" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(21)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(21)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(21)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-21" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>

          </tr>

          <tr id="row-22">
            <td>2.19</td>
           <td class = "observation_text">Field Scanner Card 7
          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(22)">Add Image</button>
<div class="upload-options" id="upload-options-22" style="display: none;">
  <button class="add-image" onclick="startCamera(22)">Camera</button>
  <label for="file-input-22" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-22" accept="image/*" multiple onchange="displayImages(this, 22)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-22"></div>
      <!-- Camera Container -->
<div id="camera-container-22" style="display: none;">
  <video id="camera-22" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(22)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(22)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(22)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-22" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

          
          <tr id="row-222">
            <td>2.20</td>
           <td class = "observation_text">Field Scanner Card 8
          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(222)">Add Image</button>
<div class="upload-options" id="upload-options-222" style="display: none;">
  <button class="add-image" onclick="startCamera(222)">Camera</button>
  <label for="file-input-222" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-222" accept="image/*" multiple onchange="displayImages(this, 222)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-222"></div>
      <!-- Camera Container -->
<div id="camera-container-222" style="display: none;">
  <video id="camera-222" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(222)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(222)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(222)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-222" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

          
          <tr id="row-223">
            <td>2.21</td>
           <td class = "observation_text">SMOCIP Unit
          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(223)">Add Image</button>
<div class="upload-options" id="upload-options-223" style="display: none;">
  <button class="add-image" onclick="startCamera(223)">Camera</button>
  <label for="file-input-223" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-223" accept="image/*" multiple onchange="displayImages(this, 223)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-223"></div>
      <!-- Camera Container -->
<div id="camera-container-223" style="display: none;">
  <video id="camera-223" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(223)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(223)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(223)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-223" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

            <tr id="row-224">
            <td>2.22</td>
           <td class = "observation_text">Station Radio Power Supply card-1
          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(224)">Add Image</button>
<div class="upload-options" id="upload-options-224" style="display: none;">
  <button class="add-image" onclick="startCamera(224)">Camera</button>
  <label for="file-input-224" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-224" accept="image/*" multiple onchange="displayImages(this, 224)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-224"></div>
      <!-- Camera Container -->
<div id="camera-container-224" style="display: none;">
  <video id="camera-224" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(224)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(224)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(224)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-224" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

            <tr id="row-225">
            <td>2.23</td>
           <td class = "observation_text">Next Gen/. Cal Amp Radio Modem
          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(225)">Add Image</button>
<div class="upload-options" id="upload-options-225" style="display: none;">
  <button class="add-image" onclick="startCamera(225)">Camera</button>
  <label for="file-input-225" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-225" accept="image/*" multiple onchange="displayImages(this, 225)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-225"></div>
      <!-- Camera Container -->
<div id="camera-container-225" style="display: none;">
  <video id="camera-225" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(225)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(225)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(225)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-225" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

           <tr id="row-226">
            <td>2.24</td>
           <td class = "observation_text">Station Radio Power Supply card-1
          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(226)">Add Image</button>
<div class="upload-options" id="upload-options-226" style="display: none;">
  <button class="add-image" onclick="startCamera(226)">Camera</button>
  <label for="file-input-226" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-226" accept="image/*" multiple onchange="displayImages(this, 226)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-226"></div>
      <!-- Camera Container -->
<div id="camera-container-226" style="display: none;">
  <video id="camera-226" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(226)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(226)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(226)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-226" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

           <tr id="row-227">
            <td>2.25</td>
           <td class = "observation_text">GPS & GSM Antenna 1
          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(227)">Add Image</button>
<div class="upload-options" id="upload-options-227" style="display: none;">
  <button class="add-image" onclick="startCamera(227)">Camera</button>
  <label for="file-input-227" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-227" accept="image/*" multiple onchange="displayImages(this, 227)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-227"></div>
      <!-- Camera Container -->
<div id="camera-container-227" style="display: none;">
  <video id="camera-227" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(227)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(227)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(227)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-227" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

           <tr id="row-228">
            <td>2.26</td>
           <td class = "observation_text">GPS & GSM Antenna 2
          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(228)">Add Image</button>
<div class="upload-options" id="upload-options-228" style="display: none;">
  <button class="add-image" onclick="startCamera(228)">Camera</button>
  <label for="file-input-228" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-228" accept="image/*" multiple onchange="displayImages(this, 228)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-228"></div>
      <!-- Camera Container -->
<div id="camera-container-228" style="display: none;">
  <video id="camera-228" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(228)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(228)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(228)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-228" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

          <tr id="row-2229">
            <td>2.27</td>
           <td class = "observation_text">DPS Card 1
          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(2229)">Add Image</button>
<div class="upload-options" id="upload-options-2229" style="display: none;">
  <button class="add-image" onclick="startCamera(2229)">Camera</button>
  <label for="file-input-2229" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-2229" accept="image/*" multiple onchange="displayImages(this, 2229)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-2229"></div>
      <!-- Camera Container -->
<div id="camera-container-2229" style="display: none;">
  <video id="camera-2229" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(2229)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(2229)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(2229)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-2229" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

          <tr id="row-229">
            <td>2.28</td>
           <td class = "observation_text">DPS Card 2

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(229)">Add Image</button>
<div class="upload-options" id="upload-options-229" style="display: none;">
  <button class="add-image" onclick="startCamera(229)">Camera</button>
  <label for="file-input-229" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-229" accept="image/*" multiple onchange="displayImages(this, 229)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-229"></div>
      <!-- Camera Container -->
<div id="camera-container-229" style="display: none;">
  <video id="camera-229" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(229)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(229)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(229)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-229" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

          <tr id="row-230">
            <td>2.29</td>
           <td class = "observation_text">EMI Filter 1

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(230)">Add Image</button>
<div class="upload-options" id="upload-options-230" style="display: none;">
  <button class="add-image" onclick="startCamera(230)">Camera</button>
  <label for="file-input-230" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-230" accept="image/*" multiple onchange="displayImages(this, 230)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-230"></div>
      <!-- Camera Container -->
<div id="camera-container-230" style="display: none;">
  <video id="camera-230" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(230)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(230)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(230)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-230" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

          <tr id="row-231">
            <td>2.30</td>
           <td class = "observation_text">EMI Filter 2

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(231)">Add Image</button>
<div class="upload-options" id="upload-options-231" style="display: none;">
  <button class="add-image" onclick="startCamera(231)">Camera</button>
  <label for="file-input-231" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-231" accept="image/*" multiple onchange="displayImages(this, 231)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-231"></div>
      <!-- Camera Container -->
<div id="camera-container-231" style="display: none;">
  <video id="camera-231" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(231)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(231)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(231)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-231" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

            <tr id="row-232">
            <td>2.31</td>
           <td class = "observation_text">Media Converter 1

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(232)">Add Image</button>
<div class="upload-options" id="upload-options-232" style="display: none;">
  <button class="add-image" onclick="startCamera(232)">Camera</button>
  <label for="file-input-232" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-232" accept="image/*" multiple onchange="displayImages(this, 232)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-232"></div>
      <!-- Camera Container -->
<div id="camera-container-232" style="display: none;">
  <video id="camera-232" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(232)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(232)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(232)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-232" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

            <tr id="row-233">
            <td>2.32</td>
           <td class = "observation_text">Media Converter 2

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(233)">Add Image</button>
<div class="upload-options" id="upload-options-233" style="display: none;">
  <button class="add-image" onclick="startCamera(233)">Camera</button>
  <label for="file-input-233" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-233" accept="image/*" multiple onchange="displayImages(this, 233)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-233"></div>
      <!-- Camera Container -->
<div id="camera-container-233" style="display: none;">
  <video id="camera-233" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(233)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(233)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(233)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-233" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

          
            <tr id="row-234">
            <td>2.33</td>
           <td class = "observation_text">Media Converter 3

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(234)">Add Image</button>
<div class="upload-options" id="upload-options-234" style="display: none;">
  <button class="add-image" onclick="startCamera(234)">Camera</button>
  <label for="file-input-234" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-234" accept="image/*" multiple onchange="displayImages(this, 234)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-234"></div>
      <!-- Camera Container -->
<div id="camera-container-234" style="display: none;">
  <video id="camera-234" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(234)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(234)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(234)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-234" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

           <tr id="row-235">
            <td>2.34</td>
           <td class = "observation_text">Cable Extender

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(235)">Add Image</button>
<div class="upload-options" id="upload-options-235" style="display: none;">
  <button class="add-image" onclick="startCamera(235)">Camera</button>
  <label for="file-input-235" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-235" accept="image/*" multiple onchange="displayImages(this, 235)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-235"></div>
      <!-- Camera Container -->
<div id="camera-container-235" style="display: none;">
  <video id="camera-235" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(235)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(235)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(235)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-235" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

          <tr id="row-240">
            <td>2.35</td>
           <td class = "observation_text">RIU-COM 1

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(240)">Add Image</button>
<div class="upload-options" id="upload-options-240" style="display: none;">
  <button class="add-image" onclick="startCamera(240)">Camera</button>
  <label for="file-input-240" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-240" accept="image/*" multiple onchange="displayImages(this, 240)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-240"></div>
      <!-- Camera Container -->
<div id="camera-container-240" style="display: none;">
  <video id="camera-240" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(240)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(240)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(240)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-240" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

          <tr id="row-236">
            <td>2.36</td>
           <td class = "observation_text">RIU-COM 2

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(236)">Add Image</button>
<div class="upload-options" id="upload-options-236" style="display: none;">
  <button class="add-image" onclick="startCamera(236)">Camera</button>
  <label for="file-input-236" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-236" accept="image/*" multiple onchange="displayImages(this, 236)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-236"></div>
      <!-- Camera Container -->
<div id="camera-container-236" style="display: none;">
  <video id="camera-236" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(236)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(236)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(236)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-236" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

          
          <tr id="row-237">
            <td>2.37</td>
           <td class = "observation_text">FIU Termination Card 1

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(237)">Add Image</button>
<div class="upload-options" id="upload-options-237" style="display: none;">
  <button class="add-image" onclick="startCamera(237)">Camera</button>
  <label for="file-input-237" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-237" accept="image/*" multiple onchange="displayImages(this, 237)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-237"></div>
      <!-- Camera Container -->
<div id="camera-container-237" style="display: none;">
  <video id="camera-237" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(237)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(237)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(237)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-237" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

          
          <tr id="row-238">
            <td>2.38</td>
           <td class = "observation_text">FIU Termination Card 2

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/>
            <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(238)">Add Image</button>
<div class="upload-options" id="upload-options-238" style="display: none;">
  <button class="add-image" onclick="startCamera(238)">Camera</button>
  <label for="file-input-238" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-238" accept="image/*" multiple onchange="displayImages(this, 238)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-238"></div>
      <!-- Camera Container -->
<div id="camera-container-238" style="display: none;">
  <video id="camera-238" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(238)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(238)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(238)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-238" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

          
          <tr id="row-239">
            <td>2.39</td>
           <td class = "observation_text">FIU Termination Card 3

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/> <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(239)">Add Image</button>
<div class="upload-options" id="upload-options-239" style="display: none;">
  <button class="add-image" onclick="startCamera(239)">Camera</button>
  <label for="file-input-239" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-239" accept="image/*" multiple onchange="displayImages(this, 239)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-239"></div>
      <!-- Camera Container -->
<div id="camera-container-239" style="display: none;">
  <video id="camera-239" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(239)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(239)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(239)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-239" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

          
          <tr id="row-2390">
            <td>2.40</td>
           <td class = "observation_text">FIU Termination Card 4

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/> <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(2390)">Add Image</button>
<div class="upload-options" id="upload-options-2390" style="display: none;">
  <button class="add-image" onclick="startCamera(2390)">Camera</button>
  <label for="file-input-2390" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-2390" accept="image/*" multiple onchange="displayImages(this, 2390)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-2390"></div>
      <!-- Camera Container -->
<div id="camera-container-2390" style="display: none;">
  <video id="camera-239" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(2390)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(2390)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(2390)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-2390" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

          <tr id="row-2391">
            <td>2.41</td>
           <td class = "observation_text">FIU Termination Card 5

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/> <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(2390)">Add Image</button>
<div class="upload-options" id="upload-options-2390" style="display: none;">
  <button class="add-image" onclick="startCamera(2390)">Camera</button>
  <label for="file-input-2390" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-2390" accept="image/*" multiple onchange="displayImages(this, 2390)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-2390"></div>
      <!-- Camera Container -->
<div id="camera-container-2390" style="display: none;">
  <video id="camera-239" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(2390)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(2390)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(2390)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-2390" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>


          <tr id="row-2392">
            <td>2.42</td>
           <td class = "observation_text">FIU Termination Card 6

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/> <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(2390)">Add Image</button>
<div class="upload-options" id="upload-options-2390" style="display: none;">
  <button class="add-image" onclick="startCamera(2390)">Camera</button>
  <label for="file-input-2390" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-2390" accept="image/*" multiple onchange="displayImages(this, 2390)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-2390"></div>
      <!-- Camera Container -->
<div id="camera-container-2390" style="display: none;">
  <video id="camera-239" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(2390)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(2390)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(2390)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-2390" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

          <tr id="row-2393">
            <td>2.43</td>
           <td class = "observation_text">FIU Termination Card 7

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/> <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(2390)">Add Image</button>
<div class="upload-options" id="upload-options-2390" style="display: none;">
  <button class="add-image" onclick="startCamera(2390)">Camera</button>
  <label for="file-input-2390" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-2390" accept="image/*" multiple onchange="displayImages(this, 2390)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-2390"></div>
      <!-- Camera Container -->
<div id="camera-container-2390" style="display: none;">
  <video id="camera-239" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(2390)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(2390)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(2390)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-2390" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>


         <tr id="row-2394">
            <td>2.44</td>
           <td class = "observation_text">FIU Termination Card 8

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/> <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(2390)">Add Image</button>
<div class="upload-options" id="upload-options-2390" style="display: none;">
  <button class="add-image" onclick="startCamera(2390)">Camera</button>
  <label for="file-input-2390" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-2390" accept="image/*" multiple onchange="displayImages(this, 2390)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-2390"></div>
      <!-- Camera Container -->
<div id="camera-container-2390" style="display: none;">
  <video id="camera-239" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(2390)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(2390)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(2390)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-2390" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>


        <tr id="row-2395">
            <td>2.45</td>
           <td class = "observation_text">PDU Box

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/> <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(2390)">Add Image</button>
<div class="upload-options" id="upload-options-2390" style="display: none;">
  <button class="add-image" onclick="startCamera(2390)">Camera</button>
  <label for="file-input-2390" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-2390" accept="image/*" multiple onchange="displayImages(this, 2390)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-2390"></div>
      <!-- Camera Container -->
<div id="camera-container-2390" style="display: none;">
  <video id="camera-239" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(2390)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(2390)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(2390)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-2390" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

         <tr id="row-2396">
            <td>2.46</td>
           <td class = "observation_text">RTU 1

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/> <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(2390)">Add Image</button>
<div class="upload-options" id="upload-options-2390" style="display: none;">
  <button class="add-image" onclick="startCamera(2390)">Camera</button>
  <label for="file-input-2390" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-2390" accept="image/*" multiple onchange="displayImages(this, 2390)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-2390"></div>
      <!-- Camera Container -->
<div id="camera-container-2390" style="display: none;">
  <video id="camera-239" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(2390)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(2390)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(2390)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-2390" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

        
        <tr id="row-2397">
            <td>2.47</td>
           <td class = "observation_text">RTU 2

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/> <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(2390)">Add Image</button>
<div class="upload-options" id="upload-options-2390" style="display: none;">
  <button class="add-image" onclick="startCamera(2390)">Camera</button>
  <label for="file-input-2390" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-2390" accept="image/*" multiple onchange="displayImages(this, 2390)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-2390"></div>
      <!-- Camera Container -->
<div id="camera-container-2390" style="display: none;">
  <video id="camera-239" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(2390)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(2390)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(2390)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-2390" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

        <tr id="row-2398">
            <td>2.48</td>
           <td class = "observation_text">RADIO 1

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/> <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(2390)">Add Image</button>
<div class="upload-options" id="upload-options-2390" style="display: none;">
  <button class="add-image" onclick="startCamera(2390)">Camera</button>
  <label for="file-input-2390" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-2390" accept="image/*" multiple onchange="displayImages(this, 2390)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-2390"></div>
      <!-- Camera Container -->
<div id="camera-container-2390" style="display: none;">
  <video id="camera-239" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(2390)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(2390)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(2390)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-2390" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>


        <tr id="row-2399">
            <td>2.49</td>
           <td class = "observation_text">RADIO 2

          <input 
  type="text" 
  id="kavach-main-unit" 
  name="barcode_kavach_main_unit" 
  pattern="^\d{10,15}$" 
  title="Enter a number between 10 to 15 digits" 
  placeholder="Scan Barcode" 
  style="width: 180px; padding: 5px; font-size: 14px;" 
  oninput="
    if(this.value.length > 15) {
      this.value = this.value.slice(-15);
    }
    toggleNotInstalledOption(this);
  "
/> <td class="select">
              <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Matching">Matching</option>
                <option value="Not Matching">Not Matching</option>
                <option value="Not Installed">Not Installed</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </td>
            <td class="remarks">
              <textarea placeholder="Verify with IC" rows="2" cols="20"></textarea><br>
            </td>
           <td>
       <button class="add-image" onclick="showUploadOptions(2390)">Add Image</button>
<div class="upload-options" id="upload-options-2390" style="display: none;">
  <button class="add-image" onclick="startCamera(2390)">Camera</button>
  <label for="file-input-2390" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-2390" accept="image/*" multiple onchange="displayImages(this, 2390)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-2390"></div>
      <!-- Camera Container -->
<div id="camera-container-2390" style="display: none;">
  <video id="camera-239" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(2390)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(2390)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(2390)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-2390" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
          </tr>

          
        </tbody>
      </table>
      </div>
      <div class="action-buttons">
        <!-- New UPDATE button: -->
      <button type="button" 
              id="update-btn" 
              style="background-color: blue; color: white; display: none;" 
              onclick="updateObservation('2_0')">
        Update
      </button>
    <button type="button" id= "save-btn" style = "display: inline-block;" onclick="saveObservation('2_0')">Save</button>
     <button id="get-details-btn" onclick="getDetails()">Get Details</button>
</div>`;


  } else if (section === "3.0") {
   // For all other sections, add Save Observation button
    mainContent.innerHTML += `
      <h3 class="section-heading" > Loco Kavach Observations</h3>
       <div class="table-container">
      <table class="observations" id="observations-section-3_0">
        <thead>
          <tr>
            <th>S_No</th>
            <th>Description</th>
            <th>Observation</th>
            <th>Remarks/Comments</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody id="observations-tbody-3_0">
          <tr id="row-23">
              <td>3.1</td>
              <td class="observation_text">Visual Checks</td>
              <td class="select">
                 <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Connected">Connected</option>
                <option value="Not Connected">Not Connected</option>
              </select>
              </td>
              <td class="remarks">
                  <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
              </td>
             <td>
       <button class="add-image" onclick="showUploadOptions(23)">Add Image</button>
<div class="upload-options" id="upload-options-23" style="display: none;">
  <button class="add-image" onclick="startCamera(23)">Camera</button>
  <label for="file-input-23" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-23" accept="image/*" multiple onchange="displayImages(this, 23)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-23"></div>
      <!-- Camera Container -->
<div id="camera-container-23" style="display: none;">
  <video id="camera-23" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(23)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(23)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(23)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-23" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
</tr>
<tr id="row-24">
      <td>3.2</td>
      <td class="observation_text">Verification of RF Antenna Fixing and LMR Cable Routing</td>
      <td class="select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(24)">Add Image</button>
<div class="upload-options" id="upload-options-24" style="display: none;">
  <button class="add-image" onclick="startCamera(24)">Camera</button>
  <label for="file-input-24" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-24" accept="image/*" multiple onchange="displayImages(this, 24)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-24"></div>
      <!-- Camera Container -->
<div id="camera-container-24" style="display: none;">
  <video id="camera-24" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(24)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(24)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(24)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-24" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

    <tr id="row-25">
      <td>3.3</td>
      <td class="observation_text">Verification of Antenna Fixing</td>
      <td class="select">
     <select id="status-dropdown"  onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(25)">Add Image</button>
<div class="upload-options" id="upload-options-25" style="display: none;">
  <button class="add-image" onclick="startCamera(25)">Camera</button>
  <label for="file-input-25" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-25" accept="image/*" multiple onchange="displayImages(this, 25)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-25"></div>
      <!-- Camera Container -->
<div id="camera-container-25" style="display: none;">
  <video id="camera-25" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(25)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(25)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(25)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-25" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>
    <tr id="row-26">
      <td>3.4</td>
      <td class="observation_text">Verify the RF Cable joining to Antenna</td>
      <td>
         <select id="status-dropdown"  onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(26)">Add Image</button>
<div class="upload-options" id="upload-options-26" style="display: none;">
  <button class="add-image" onclick="startCamera(26)">Camera</button>
  <label for="file-input-26" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-26" accept="image/*" multiple onchange="displayImages(this, 26)">
</div>
<!-- Container for multiple images --> 
<div id="image-container-26"></div>
<!-- Camera Container -->
<div id="camera-container-26" style="display: none;">
  <video id="camera-26" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(26)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(26)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(26)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-26" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>
  <tr id="row-27">
      <td>3.5</td>
      <td class="observation_text">Tie the cables to die pole antenna by using stainless steel cable tie at four locations.</td>
      <td>
         <select id="status-dropdown"  onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(27)">Add Image</button>
<div class="upload-options" id="upload-options-27" style="display: none;">
  <button class="add-image" onclick="startCamera(27)">Camera</button>
  <label for="file-input-27" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-27" accept="image/*" multiple onchange="displayImages(this, 27)">
</div>
<!-- Container for multiple images --> 
<div id="image-container-27"></div>
<!-- Camera Container -->
<div id="camera-container-27" style="display: none;">
  <video id="camera-27" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(27)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(27)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(27)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-27" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
  </tr>
<tr id="row-435">
      <td>3.6</td>
      <td class="observation_text">LMR 600 cables routing by using feeder clamps.
      <td>
         <select id="status-dropdown"  onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(435)">Add Image</button>
<div class="upload-options" id="upload-options-435" style="display: none;">
  <button class="add-image" onclick="startCamera(435)">Camera</button>
  <label for="file-input-435" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-435" accept="image/*" multiple onchange="displayImages(this, 435)">
</div>
<!-- Container for multiple images --> 
<div id="image-container-435"></div>
<!-- Camera Container -->
<div id="camera-container-435" style="display: none;">
  <video id="camera-435" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(435)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(435)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(435)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-435" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
  </tr>
<tr id="row-436">
      <td>3.7</td>
      <td class="observation_text">Installation of RTU Box and connections with identification</td>
      <td>
         <select id="status-dropdown"  onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(436)">Add Image</button>
<div class="upload-options" id="upload-options-436" style="display: none;">
  <button class="add-image" onclick="startCamera(436)">Camera</button>
  <label for="file-input-436" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-436" accept="image/*" multiple onchange="displayImages(this, 436)">
</div>
<!-- Container for multiple images --> 
<div id="image-container-436"></div>
<!-- Camera Container -->
<div id="camera-container-436" style="display: none;">
  <video id="camera-436" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(436)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(436)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(436)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-436" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
  </tr>

    <tr id="row-28">
      <td>3.8</td>
      <td class="observation_text">Visual inspection, Identification and Radios functioning</td>
      <td>
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Matching">Matching</option>
          <option value="Not Matching">Not Matching</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(28)">Add Image</button>
<div class="upload-options" id="upload-options-28" style="display: none;">
  <button class="add-image" onclick="startCamera(28)">Camera</button>
  <label for="file-input-28" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-28" accept="image/*" multiple onchange="displayImages(this, 28)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-28"></div>
      <!-- Camera Container -->
<div id="camera-container-28" style="display: none;">
  <video id="camera-28" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(28)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(28)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(28)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-28" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>
    <tr id="row-29">
      <td>3.9</td>
      <td class="observation_text">LMR cable fixing</td>
      <td class="select">
           <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Torquing done">Torquing done</option>
          <option value="Torquing Not done">Torquing Not done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(29)">Add Image</button>
<div class="upload-options" id="upload-options-29" style="display: none;">
  <button class="add-image" onclick="startCamera(29)">Camera</button>
  <label for="file-input-29" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-29" accept="image/*" multiple onchange="displayImages(this, 29)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-29"></div>
      <!-- Camera Container -->
<div id="camera-container-29" style="display: none;">
  <video id="camera-29" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(29)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(29)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(29)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-29" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>
    <tr id="row-30">
      <td>3.10</td>
      <td class="observation_text">Verification of RTU box Fixing on platform.</td>
      <td class="select">
         <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Connected">Connected</option>
                <option value="Not Connected">Not Connected</option>
              </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
     <td>
       <button class="add-image" onclick="showUploadOptions(30)">Add Image</button>
<div class="upload-options" id="upload-options-30" style="display: none;">
  <button class="add-image" onclick="startCamera(30)">Camera</button>
  <label for="file-input-30" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-30" accept="image/*" multiple onchange="displayImages(this, 30)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-30"></div>
      <!-- Camera Container -->
<div id="camera-container-30" style="display: none;">
  <video id="camera-30" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(30)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(30)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(30)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-30" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>
    <tr id="row-31">
      <td>3.11</td>
      <td class="observation_text">Tie the cables to structure by using stainless steel cable ties.</td>
      <td>
         <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(31)">Add Image</button>
<div class="upload-options" id="upload-options-31" style="display: none;">
  <button class="add-image" onclick="startCamera(31)">Camera</button>
  <label for="file-input-31" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-31" accept="image/*" multiple onchange="displayImages(this, 31)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-31"></div>
      <!-- Camera Container -->
<div id="camera-container-31" style="display: none;">
  <video id="camera-31" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(31)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(31)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(31)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-31" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>
    <tr id="row-32">
      <td>3.12</td>
      <td class="observation_text">Radios power supply 110V</td>
      <td class="select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Metal clamps implemented">Metal clamps implemented</option>
          <option value="Metal clamps not implemented">Metal clamps not implemented</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(32)">Add Image</button>
<div class="upload-options" id="upload-options-32" style="display: none;">
  <button class="add-image" onclick="startCamera(32)">Camera</button>
  <label for="file-input-32" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-32" accept="image/*" multiple onchange="displayImages(this, 32)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-32"></div>
      <!-- Camera Container -->
<div id="camera-container-32" style="display: none;">
  <video id="camera-32" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(32)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(32)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(32)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-32" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>
    <tr id="row-33">
      <td>3.13</td>
      <td class ="observation_text">Verification of RTU Earthing</td>
      <td class="select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Cables Connected">Cables Connected</option>
          <option value="Cables Not Connected">Cables Not Connected</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
     <td>
       <button class="add-image" onclick="showUploadOptions(33)">Add Image</button>
<div class="upload-options" id="upload-options-33" style="display: none;">
  <button class="add-image" onclick="startCamera(33)">Camera</button>
  <label for="file-input-33" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-33" accept="image/*" multiple onchange="displayImages(this, 33)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-33"></div>
      <!-- Camera Container -->
<div id="camera-container-33" style="display: none;">
  <video id="camera-33" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(33)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(33)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(33)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-33" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>
  <tr id="row-1333">
      <td>3.14</td>
      <td class ="observation_text">Verification of Tower</td>
      <td class="select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
     <td>
       <button class="add-image" onclick="showUploadOptions(1333)">Add Image</button>
<div class="upload-options" id="upload-options-1333" style="display: none;">
  <button class="add-image" onclick="startCamera(1333)">Camera</button>
  <label for="file-input-1333" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-1333" accept="image/*" multiple onchange="displayImages(this, 1333)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-1333"></div>
      <!-- Camera Container -->
<div id="camera-container-1333" style="display: none;">
  <video id="camera-1333" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(1333)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(1333)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(1333)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-1333" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>
 <tr id="row-2333">
      <td>3.15</td>
      <td class ="observation_text">Tower Foundation & Fencing</td>
      <td class="select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
     <td>
       <button class="add-image" onclick="showUploadOptions(2333)">Add Image</button>
<div class="upload-options" id="upload-options-2333" style="display: none;">
  <button class="add-image" onclick="startCamera(2333)">Camera</button>
  <label for="file-input-2333" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-2333" accept="image/*" multiple onchange="displayImages(this, 2333)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-2333"></div>
      <!-- Camera Container -->
<div id="camera-container-2333" style="display: none;">
  <video id="camera-2333" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(2333)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(2333)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(2333)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-2333" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>
 <tr id="row-3333">
      <td>3.16</td>
      <td class ="observation_text">Ladder Fixing</td>
      <td class="select">
         <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
     <td>
       <button class="add-image" onclick="showUploadOptions(3333)">Add Image</button>
<div class="upload-options" id="upload-options-3333" style="display: none;">
  <button class="add-image" onclick="startCamera(3333)">Camera</button>
  <label for="file-input-3333" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-3333" accept="image/*" multiple onchange="displayImages(this, 3333)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-3333"></div>
      <!-- Camera Container -->
<div id="camera-container-3333" style="display: none;">
  <video id="camera-3333" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(3333)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(3333)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(3333)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-3333" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

     <tr id="row-3334">
      <td>3.17</td>
      <td class ="observation_text">RTU Plat form entrance </td>
      <td class="select">
         <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
     <td>
       <button class="add-image" onclick="showUploadOptions(3333)">Add Image</button>
<div class="upload-options" id="upload-options-3333" style="display: none;">
  <button class="add-image" onclick="startCamera(3333)">Camera</button>
  <label for="file-input-3333" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-3333" accept="image/*" multiple onchange="displayImages(this, 3333)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-3333"></div>
      <!-- Camera Container -->
<div id="camera-container-3333" style="display: none;">
  <video id="camera-3333" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(3333)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(3333)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(3333)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-3333" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>


    <tr id="row-3335">
      <td>3.18</td>
      <td class ="observation_text">GI Earthing strip routing </td>
      <td class="select">
         <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
     <td>
       <button class="add-image" onclick="showUploadOptions(3333)">Add Image</button>
<div class="upload-options" id="upload-options-3333" style="display: none;">
  <button class="add-image" onclick="startCamera(3333)">Camera</button>
  <label for="file-input-3333" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-3333" accept="image/*" multiple onchange="displayImages(this, 3333)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-3333"></div>
      <!-- Camera Container -->
<div id="camera-container-3333" style="display: none;">
  <video id="camera-3333" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(3333)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(3333)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(3333)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-3333" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

    <tr id="row-3336">
      <td>3.19</td>
      <td class ="observation_text">Verification of Tower and RTU Earth pit arrangement with brazing. </td>
      <td class="select">
         <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
     <td>
       <button class="add-image" onclick="showUploadOptions(3333)">Add Image</button>
<div class="upload-options" id="upload-options-3333" style="display: none;">
  <button class="add-image" onclick="startCamera(3333)">Camera</button>
  <label for="file-input-3333" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-3333" accept="image/*" multiple onchange="displayImages(this, 3333)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-3333"></div>
      <!-- Camera Container -->
<div id="camera-container-3333" style="display: none;">
  <video id="camera-3333" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(3333)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(3333)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(3333)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-3333" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

     <tr id="row-3337">
      <td>3.20</td>
      <td class ="observation_text">Earthing for Tower as per Spec. < 2Ω</td>
      <td class="select">
         <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
     <td>
       <button class="add-image" onclick="showUploadOptions(3333)">Add Image</button>
<div class="upload-options" id="upload-options-3333" style="display: none;">
  <button class="add-image" onclick="startCamera(3333)">Camera</button>
  <label for="file-input-3333" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-3333" accept="image/*" multiple onchange="displayImages(this, 3333)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-3333"></div>
      <!-- Camera Container -->
<div id="camera-container-3333" style="display: none;">
  <video id="camera-3333" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(3333)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(3333)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(3333)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-3333" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

    <tr id="row-3338">
      <td>3.21</td>
      <td class ="observation_text">Verification of Aviation Warning Lamp, Functioning and power supply 110V</td>
      <td class="select">
         <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
     <td>
       <button class="add-image" onclick="showUploadOptions(3333)">Add Image</button>
<div class="upload-options" id="upload-options-3333" style="display: none;">
  <button class="add-image" onclick="startCamera(3333)">Camera</button>
  <label for="file-input-3333" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-3333" accept="image/*" multiple onchange="displayImages(this, 3333)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-3333"></div>
      <!-- Camera Container -->
<div id="camera-container-3333" style="display: none;">
  <video id="camera-3333" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(3333)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(3333)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(3333)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-3333" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>



        </tbody>
      </table>
      </div>
     <div class="action-buttons">
       <!-- New UPDATE button: -->
      <button type="button" 
              id="update-btn" 
              style="background-color: blue; color: white; display:none;" 
              onclick="updateObservation('3_0')">
        Update
      </button>
        <button type="button" id= "save-btn" style = "display: inline-block;" onclick="if(validateMandatoryImages('3_0')) { saveObservation('3_0'); }">Save</button>
        <button id="get-details-btn" onclick="getDetails()">Get Details</button>
      </div>
    ;`

  } else if (section === "4.0") {
    // For all other sections, add Save Observation button
    mainContent.innerHTML += `
      <h3 class="section-heading" > EMI Filter Box Observations</h3>
       <div class="table-container">
      <table class="observations" id="observations-section-4_0">
        <thead>
          <tr>
            <th>S_No</th>
            <th>Description</th>
            <th>Observation</th>
            <th>Remarks/Comments</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody id="observations-tbody-4_0">
          <tr id="row-34">
      <td>4.1</td>
      <td class="observation_text">Visual Checks (Ex.Equipment labels, External appearance, Dents, Shade, Rust, Cable entries at STCAS to be closed properly with rubber gaskets/grommets in STCAS)</td>
       <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Fixed">Fixed</option>
          <option value="Not Fixed">Not Fixed</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(34)">Add Image</button>
<div class="upload-options" id="upload-options-34" style="display: none;">
  <button class="add-image" onclick="startCamera(34)">Camera</button>
  <label for="file-input-34" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-34" accept="image/*" multiple onchange="displayImages(this, 34)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-34"></div>
      <!-- Camera Container -->
<div id="camera-container-34" style="display: none;">
  <video id="camera-34" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(34)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(34)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(34)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-34" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>


    <tr id="row-35">
      <td>4.2</td>
      <td class="observation_text">Verification of equipment placement and cable routing as per Relay Room Layout.</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

     <tr id="row-351">
      <td>4.3</td>
      <td class="observation_text">Verification of Connections as per Power Supply Diagram  cum Load Calculation</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

    <tr id="row-352">
      <td>4.4</td>
      <td class="observation_text">Verification of Cable size and connectivity as per diagram</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>


    <tr id="row-353">
      <td>4.5</td>
      <td class="observation_text">Implementation of Ferrule Lug 0.75mm</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>


    <tr id="row-354">
      <td>4.6</td>
      <td class="observation_text">Implementation of Lug 2.5Sqmm</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>


    <tr id="row-355">
      <td>4.7</td>
      <td class="observation_text">Implementation of Media Converter</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

    <tr id="row-356">
      <td>4.8</td>
      <td class="observation_text">Verification of 48V SMPS Charger & Battery Installation</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

     <tr id="row-357">
      <td>4.9</td>
      <td class="observation_text">MCB 2P Installed in IPS room</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

    <tr id="row-358">
      <td>4.10</td>
      <td class="observation_text">TCAS system I/P110V DC supply</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

    <tr id="row-359">
      <td>4.11</td>
      <td class="observation_text">Cards Functional Checking as per ATR</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

     <tr id="row-360">
      <td>4.12</td>
      <td class="observation_text">Review of PCCL Report</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

    <tr id="row-361">
      <td>4.13</td>
      <td class="observation_text">Earth Resistance of STCAS is ≤ 1Ω ( to be followed as per PCCL)</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

    <tr id="row-362">
      <td>4.14</td>
      <td class="observation_text">Verification of PDU Box fixing and wiring.</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

    <tr id="row-363">
      <td>4.15</td>
      <td class="observation_text">Identification for Fuse, MCB’s etc.</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>


    <tr id="row-364">
      <td>4.16</td>
      <td class="observation_text">Verification of cable  routing</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

    <tr id="row-365">
      <td>4.17</td>
      <td class="observation_text">Implementation of glands/ grommets.</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>


     <tr id="row-366">
      <td>4.18</td>
      <td class="observation_text">Earthing</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

    <tr id="row-367">
      <td>4.19</td>
      <td class="observation_text">Verification of Voltage </td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>


    <tr id="row-368">
      <td>4.20</td>
      <td class="observation_text">Verification of Fuse Ratings as per PSD Rating Table </td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>


     <tr id="row-369">
      <td>4.21</td>
      <td class="observation_text">Verification of MCB Ratings as per PSD Rating Table</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

    <tr id="row-370">
      <td>4.22</td>
      <td class="observation_text">Verification of DC-DC Converter installation </td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

     <tr id="row-371">
      <td>4.23</td>
      <td class="observation_text">Identification </td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

    <tr id="row-372">
      <td>4.24</td>
      <td class="observation_text">Implementation of glands/ grommets.</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

    <tr id="row-373">
      <td>4.25</td>
      <td class="observation_text">Voltage Input and Output</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

     <tr id="row-374">
      <td>4.26</td>
      <td class="observation_text">Verification of GPS / GSM Antenna Fixing & Wiring</td>
        <td class = "select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing Done</option>
          <option value="Routing Not Done">Routing Not Done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(35)">Add Image</button>
<div class="upload-options" id="upload-options-35" style="display: none;">
  <button class="add-image" onclick="startCamera(35)">Camera</button>
  <label for="file-input-35" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-35" accept="image/*" multiple onchange="displayImages(this, 35)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-35"></div>
      <!-- Camera Container -->
<div id="camera-container-35" style="display: none;">
  <video id="camera-35" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(35)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(35)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(35)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-35" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>


        </tbody>
      </table>
      </div>
     <div class="action-buttons">
       <!-- New UPDATE button: -->
      <button type="button" 
              id="update-btn" 
              style="background-color: blue; color: white; display:none;" 
              onclick="updateObservation('4_0')">
        Update
      </button>
        <button type="button" id= "save-btn" style = "display: inline-block;" onclick="if(validateMandatoryImages('4_0')) { saveObservation('4_0'); }">Save</button>
        <button id="get-details-btn" onclick="getDetails()">Get Details</button>
      </div>
    ;`
  } else if (section === "5.0") {
    // For all other sections, add Save Observation button
    mainContent.innerHTML += `
      <h3 class="section-heading">RIB AND CAB INPUT BOX Observations</h3>
       <div class="table-container">
      <table class="observations" id="observations-section-5_0">
        <thead>
          <tr>
            <th>S_No</th>
            <th>Description</th>
            <th>Observation</th>
            <th>Remarks/Comments</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody id="observations-tbody-5_0">
          <tr id="row-36">
      <td>5.1</td>
      <td class="observation_text">Visual Checks (Ferrules/ Stickering to be done for easily identification of cables).</td>
      <td class="select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
     <td>
       <button class="add-image" onclick="showUploadOptions(36)">Add Image</button>
<div class="upload-options" id="upload-options-36" style="display: none;">
  <button class="add-image" onclick="startCamera(36)">Camera</button>
  <label for="file-input-36" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-36" accept="image/*" multiple onchange="displayImages(this, 36)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-36"></div>
      <!-- Camera Container -->
<div id="camera-container-36" style="display: none;">
  <video id="camera-36" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(36)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(36)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(36)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-36" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

    <tr id="row-37">
      <td>5.2</td>
      <td class="observation_text">Total Qty of Relay panels and repeater relays used.</td>
      <td class="select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(37)">Add Image</button>
<div class="upload-options" id="upload-options-37" style="display: none;">
  <button class="add-image" onclick="startCamera(37)">Camera</button>
  <label for="file-input-37" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-37" accept="image/*" multiple onchange="displayImages(this, 37)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-37"></div>
      <!-- Camera Container -->
<div id="camera-container-37" style="display: none;">
  <video id="camera-37" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(37)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(37)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(37)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-37" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>
    <tr id="row-38">
      <td>5.3</td>
      <td class="observation_text">Verification of Relay rack and interfaces are connected as per relay wiring drawing.</td>
      <td class="select">
        <select id="status-dropdown"  onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(38)">Add Image</button>
<div class="upload-options" id="upload-options-38" style="display: none;">
  <button class="add-image" onclick="startCamera(38)">Camera</button>
  <label for="file-input-38" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-38" accept="image/*" multiple onchange="displayImages(this, 38)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-38"></div>
      <!-- Camera Container -->
<div id="camera-container-38" style="display: none;">
  <video id="camera-38" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(38)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(38)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(38)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-38" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>
    <tr id="row-39">
      <td>5.4</td>
      <td class="observation_text">Verify slow blowing fuse placement and Fuse rating (2A)</td>
      <td class="select">
           <select id="status-dropdown"  onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>     
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(39)">Add Image</button>
<div class="upload-options" id="upload-options-39" style="display: none;">
  <button class="add-image" onclick="startCamera(39)">Camera</button>
  <label for="file-input-39" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-39" accept="image/*" multiple onchange="displayImages(this, 39)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-39"></div>
      <!-- Camera Container -->
<div id="camera-container-39" style="display: none;">
  <video id="camera-39" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(39)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(39)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(39)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-39" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>
<tr id="row-1339">
      <td>5.5</td>
      <td class="observation_text">Verification of Relay Contact 24V supply (18VDA to 26VDA) </td>
      <td class="select">
          <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing done</option>
          <option value="Routing Not Done">Routing Not done</option>
        </select>     
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(1339)">Add Image</button>
<div class="upload-options" id="upload-options-1339" style="display: none;">
  <button class="add-image" onclick="startCamera(1339)">Camera</button>
  <label for="file-input-1339" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-1339" accept="image/*" multiple onchange="displayImages(this, 1339)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-1339"></div>
      <!-- Camera Container -->
<div id="camera-container-1339" style="display: none;">
  <video id="camera-1339" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(1339)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(1339)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(1339)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-1339" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

    <tr id="row-40">
      <td>5.6</td>
      <td class="observation_text">Verification of Data Logger connectivity</td>
      <td class="select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Connected">Connected</option>
          <option value="Not Connected">Not Connected</option>
        </select>

      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(40)">Add Image</button>
<div class="upload-options" id="upload-options-40" style="display: none;">
  <button class="add-image" onclick="startCamera(40)">Camera</button>
  <label for="file-input-40" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-40" accept="image/*" multiple onchange="displayImages(this, 40)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-40"></div>
      <!-- Camera Container -->
<div id="camera-container-40" style="display: none;">
  <video id="camera-40" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(40)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(40)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(40)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-40" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
   
    </tr>
   

    </tbody>
      </table>
      </div>
      <div class="action-buttons">
        <!-- New UPDATE button: -->
      <button type="button" 
              id="update-btn" 
              style="background-color: blue; color: white; display: none;" 
              onclick="updateObservation('5_0')">
        Update
      </button>
       <button type="button" id= "save-btn" style = "display: inline-block;"  onclick="if(validateMandatoryImages('5_0')) { saveObservation('5_0'); }">Save</button>
        <button id="get-details-btn" onclick="getDetails()">Get Details</button>
      </div>
    ;`

  }
  else if (section === "6.0") {
    // For all other sections, add Save Observation button
    mainContent.innerHTML += `
      <h3 class="section-heading" > DMI (LP-OCIP) Observations</h3>
       <div  class="table-container">
      <table class="observations" id="observations-section-6_0">
        <thead>
          <tr>
            <th>S_No</th>
            <th>Description</th>
            <th>Observation</th>
            <th>Remarks/Comments</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody id="observations-tbody-6_0">
          <tr id="row-41">
      <td>6.1</td>
      <td class="observation_text">Visual Checks </td>
       <td class="select">
       <select id="status-dropdown" onchange="highlightSelect(this)">
                <option value="Select">Select</option>
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
     <td>
       <button class="add-image" onclick="showUploadOptions(41)">Add Image</button>
<div class="upload-options" id="upload-options-41" style="display: none;">
  <button class="add-image" onclick="startCamera(41)">Camera</button>
  <label for="file-input-41" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-41" accept="image/*" multiple onchange="displayImages(this, 41)">
</div>
      <!-- Container for multiple images --> 
      <div id="image-container-41"></div>
      <!-- Camera Container -->
<div id="camera-container-41" style="display: none;">
  <video id="camera-41" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(41)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(41)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(41)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-41" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

    <tr id="row-42">
      <td>6.2</td>
      <td class="observation_text">Verification of SMOCIP Unit fixing, Connectivity & Fibre Splicing and Key on off position</td>
      <td class="select">
         <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(42)">Add Image</button>
<div class="upload-options" id="upload-options-42" style="display: none;">
  <button class="add-image" onclick="startCamera(42)">Camera</button>
  <label for="file-input-42" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-42" accept="image/*" multiple onchange="displayImages(this, 42)">
</div>
<!-- Container for multiple images --> 
<div id="image-container-42"></div>
<!-- Camera Container -->
<div id="camera-container-42" style="display: none;">
  <video id="camera-42" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(42)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(42)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(42)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-42" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>
    <tr id="row-43">
      <td>6.3</td>
      <td class="observation_text">SMOCIP Health Status</td>
      <td class="select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Torquing done">Torquing done</option>
          <option value="Torquing Not done">Torquing Not done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(43)">Add Image</button>
<div class="upload-options" id="upload-options-43" style="display: none;">
  <button class="add-image" onclick="startCamera(43)">Camera</button>
  <label for="file-input-43" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-43" accept="image/*" multiple onchange="displayImages(this, 43)">
</div>
<!-- Container for multiple images --> 
<div id="image-container-43"></div>
<!-- Camera Container -->
<div id="camera-container-43" style="display: none;">
  <video id="camera-43" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(43)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(43)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(43)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-43" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>
    <tr id="row-44">
      <td>6.4</td>
      <td class="observation_text">SMOCIP Earthing</td>
      <td class="select">
         <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(44)">Add Image</button>
<div class="upload-options" id="upload-options-44" style="display: none;">
  <button class="add-image" onclick="startCamera(44)">Camera</button>
  <label for="file-input-44" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-44" accept="image/*" multiple onchange="displayImages(this, 44)">
</div>
<!-- Container for multiple images --> 
<div id="image-container-44"></div>
<!-- Camera Container -->
<div id="camera-container-44" style="display: none;">
  <video id="camera-44" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(44)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(44)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(44)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-44" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>
    <tr id="row-45">
      <td>6.5</td>
      <td class="observation_text">Checksum verification as per FAT Report.</td>
      <td class="select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Applied">Applied</option>
          <option value="Not Applied">Not Applied</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(45)">Add Image</button>
<div class="upload-options" id="upload-options-45" style="display: none;">
  <button class="add-image" onclick="startCamera(45)">Camera</button>
  <label for="file-input-45" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-45" accept="image/*" multiple onchange="displayImages(this, 45)">
</div>
<!-- Container for multiple images --> 
<div id="image-container-45"></div>
<!-- Camera Container -->
<div id="camera-container-45" style="display: none;">
  <video id="camera-45" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(45)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(45)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(45)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-45" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>
  
    </tbody>
      </table>
      </div>
      <div class="action-buttons">
        <!-- New UPDATE button: -->
      <button type="button" 
              id="update-btn" 
              style="background-color: blue; color: white; display: none;" 
              onclick="updateObservation('6_0')">
        Update
      </button>
         <button type="button" id= "save-btn" style = "display: inline-block;" onclick="if(validateMandatoryImages('6_0')) { saveObservation('6_0'); }">Save</button>
         <button id="get-details-btn" onclick="getDetails()">Get Details</button>
      </div>
    ;`
  } else if (section === "7.0") {
    // For all other sections, add Save Observation button
    mainContent.innerHTML += `
      <h3 class="section-heading">RFID PS Unit Observations</h3>
      <div class="table-container"> 
      <table class="observations" id="observations-section-7_0">
        <thead>
          <tr>
            <th>S_No</th>
            <th>Description</th>
            <th>Observation</th>
            <th>Remarks/Comments</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody id="observations-tbody-7_0">
          <tr id="row-51">
      <td>7.1</td>
      <td class="observation_text">Visual Checks (Cracks, Shade, No oil, Center Placement, Play and Tag Number & ABS location on TAG )</td>
      <td class="select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Torquing done">Torquing done</option>
          <option value="Torquing Not done">Torquing Not done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(51)">Add Image</button>
<div class="upload-options" id="upload-options-51" style="display: none;">
  <button class="add-image" onclick="startCamera(51)">Camera</button>
  <label for="file-input-51" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-51" accept="image/*" multiple onchange="displayImages(this, 51)">
</div>
<!-- Container for multiple images --> 
<div id="image-container-51"></div>
<!-- Camera Container -->
<div id="camera-container-51" style="display: none;">
  <video id="camera-51" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(51)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(51)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(51)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-51" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>

    <tr id="row-52">
      <td>7.2</td>
      <td class="observation_text">Verification of RFID TAG fixing
Fixing proper Brackets (Point sleeper Bracket & Normal Sleeper Bracket) as per drawing no 5 16 67 0490,106, CC Apran TCAS/2021_02_15 & RDSO Drawing No. SDO/S&T/TCAS/008</td>
      <td class="select">
         <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(52)">Add Image</button>
<div class="upload-options" id="upload-options-52" style="display: none;">
  <button class="add-image" onclick="startCamera(52)">Camera</button>
  <label for="file-input-52" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-52" accept="image/*" multiple onchange="displayImages(this, 52)">
</div>
<!-- Container for multiple images --> 
<div id="image-container-52"></div>
<!-- Camera Container -->
<div id="camera-container-52" style="display: none;">
  <video id="camera-52" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(52)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(52)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(52)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-52" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
    </tr>
    <tr id="row-53">
      <td>7.3</td>
      <td class="observation_text">Verification of Tag Program  as per RFID Tag layout</td>
      <td class="select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Routing Done">Routing done</option>
          <option value="Routing Not Done">Routing Not done</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
      <td>
       <button class="add-image" onclick="showUploadOptions(53)">Add Image</button>
       <div class="upload-options" id="upload-options-53" style="display: none;">
       <button class="add-image" onclick="startCamera(53)">Camera</button>
       <label for="file-input-53" class="upload-label">Upload from Device</label>
       <input type="file" id="file-input-53" accept="image/*" multiple onchange="displayImages(this, 53)">
       </div>
      <!-- Container for multiple images --> 
      <div id="image-container-53"></div>
      <!-- Camera Container -->
      <div id="camera-container-53" style="display: none;">
      <video id="camera-53" width="100%" height="auto" autoplay></video>
      <button class="add-image" onclick="captureImage(53)">Capture Image</button>
      <button class="add-image" onclick="stopCamera(53)">Stop Camera</button>
      <button class="reverse-camera" onclick="switchCamera(53)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
      <canvas id="canvas-53" style="display: none;"></canvas> <!-- Canvas to capture the image -->
      </div>
    </tr>
    <tr id="row-54">
      <td>7.4</td>
      <td class="observation_text">Verification of RFID Tag Placement</td>
      <td class="select">
        <select id="status-dropdown" onchange="highlightSelect(this)">
          <option value="Select">Select</option>
          <option value="Locked">Locked</option>
          <option value="Not Locked">Not Locked</option>
        </select>
      </td>
      <td class="remarks">
        <textarea placeholder="Add comments here if Not OK..." rows="2" cols="20"></textarea><br>
      </td>
       <td>
       <button class="add-image" onclick="showUploadOptions(54)">Add Image</button>
<div class="upload-options" id="upload-options-54" style="display: none;">
  <button class="add-image" onclick="startCamera(54)">Camera</button>
  <label for="file-input-54" class="upload-label">Upload from Device</label>
  <input type="file" id="file-input-54" accept="image/*" multiple onchange="displayImages(this, 54)">
</div>
<!-- Container for multiple images --> 
<div id="image-container-54"></div>
<!-- Camera Container -->
<div id="camera-container-54" style="display: none;">
  <video id="camera-54" width="100%" height="auto" autoplay></video>
  <button class="add-image" onclick="captureImage(54)">Capture Image</button>
  <button class="add-image" onclick="stopCamera(54)">Stop Camera</button>
  <button class="reverse-camera" onclick="switchCamera(54)">🔄 Switch Camera</button> <!-- Reverse Camera Icon -->
  <canvas id="canvas-54" style="display: none;"></canvas> <!-- Canvas to capture the image -->
</div>
       </tr>
     </tbody>
      </table>
      </div>
      <div class="action-buttons">
        <!-- New UPDATE button: -->
      <button type="button" 
              id="update-btn" 
              style="background-color: blue; color: white; display:none;" 
              onclick="updateObservation('7_0')">
        Update
      </button>
        <button type="button" id= "save-btn" style = "display: inline-block;"  onclick="if(validateMandatoryImages('7_0')) { saveObservation('7_0'); }">Save</button>
         <button id="get-details-btn" onclick="getDetails()">Get Details</button>
      </div>
    ;`
  }  

}

// Function to handle the logout
function logout() {
  window.location.href = "login.html"; // Replace with your actual login page URL
}

// Event listener for dynamic shed name update

document.addEventListener("DOMContentLoaded", function () {
  function initDivisionLogic() {
    // Attempt to get the newly loaded or dynamically injected selects
    const zoneSelect = document.getElementById("zone");
    const divisionSelect = document.getElementById("division");

    // If they don't exist yet (because the form is injected later), re-check soon
    if (!divisionSelect || !zoneSelect) {
      console.log("Waiting for #zone and #division to appear...");
      setTimeout(initDivisionLogic, 100);
      return;
    }

    // Now that we have them, gather the <option data-zone="...">
    const allDivisionOptions = Array.from(
      divisionSelect.querySelectorAll("option[data-zone]")
    );

    // Expose a global function so inline onchange="updateDivisionNames()" works
    window.updateDivisionNames = function () {
      if (!zoneSelect || !divisionSelect) return;

      const selectedZone = zoneSelect.value;
      console.log("Selected Zone:", selectedZone);

      // Reset to a single 'Select' placeholder
      divisionSelect.innerHTML = '<option value="" disabled selected>Select</option>';

      // Inject only those options whose data-zone matches
      allDivisionOptions.forEach(option => {
        if (option.getAttribute("data-zone") === selectedZone) {
          divisionSelect.appendChild(option.cloneNode(true));
        }
      });

      // Optionally disable if no valid division
      divisionSelect.disabled = !selectedZone;
    };

    // If a division is already selected (e.g. from session), update immediately
    window.updateDivisionNames();
  }

  // Try to attach logic now; if the elements aren't there, we'll retry
  initDivisionLogic();
});


async function generateReport() {
  // Remove the beforeunload listener so that it won't trigger when clicking the button.
  window.removeEventListener("beforeunload", beforeUnloadHandler);

  const stationId = document.getElementById("station-id").value;
  const division = document.getElementById("division").value;
  const zone = document.getElementById("zone").value;

  if (!stationId || !division || !zone) {
    alert("Please fill all the fields.");
    return;
  }

  const response = await fetch("generateReport.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      "station-id": stationId,
      "division": division,
      "zone": zone,
    }),
  });

  const data = await response.json();

  if (data.success) {
    // Store the fetched data in sessionStorage
    sessionStorage.setItem("stationDetails", JSON.stringify(data.stationDetails));
    sessionStorage.setItem(
      "observationsData",
      JSON.stringify(data.observations)
    );

    // Redirect to the observations page
    window.location.href = "observations.html";
  } else {
    alert(data.message || "Failed to generate the report");
  }

  if (data.success) {
    // Optional: Display Loco Details and Observations on console
    console.log(data.stationDetails);
    console.log(data.observations);
  } else {
    alert(data.message);
  }
}


function showUploadOptions(rowId) {
  const uploadOptions = document.getElementById(`upload-options-${rowId}`);
  if (!uploadOptions) return;
  uploadOptions.style.display =
    uploadOptions.style.display === "none" ? "block" : "none";
}

function highlightSelect(selectElement) {
  selectElement.style.backgroundColor = ""; // default

  const value = selectElement.value;
  if (
    value === "Not Available" ||
    value === "No" ||
    value === "Not Connected" ||
    value === "Not Secured" ||
    value === "Not Fixed" ||
    value === "Not Applied" ||
    value === "Routing Not Done" ||
    value === "Torquing Not done" ||
    value === "Not Matching" ||
    value === "Not ok" ||
    value === "Not Installed"
  ) {
    selectElement.style.backgroundColor = "red";
  } else if (
    value === "Available" ||
    value === "Yes" ||
    value === "Secured" ||
    value === "Fixed" ||
    value === "Applied" ||
    value === "Routing Done" ||
    value === "Torquing done" ||
    value === "Matching" ||
    value === "Installed" ||
    value === "Verified and ok" ||
    value === "Not Applicable" ||
    value === "Connected"
  ) {
    selectElement.style.backgroundColor = "green";
  } else if (value === "Positioning done") {
    selectElement.style.backgroundColor = "green";
  } else if (value === "Positioning Not done") {
    selectElement.style.backgroundColor = "red";
  } else if (value === "Earthing Done") {
    selectElement.style.backgroundColor = "green";
  } else if (value === "Earthing not done") {
    selectElement.style.backgroundColor = "red";
  } else if (value === "Installed") {
    selectElement.style.backgroundColor = "yellow";
  } else if (value === "Welding done") {
    selectElement.style.backgroundColor = "green";
  } else if (value === "Welding not done") {
    selectElement.style.backgroundColor = "red";
  } else if (selectElement.value === "Locked") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Not Locked") {
    selectElement.style.backgroundColor = "red";
  }else if (selectElement.value === "Metal clamps implemented") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Metal clamps not implemented") {
    selectElement.style.backgroundColor = "red";
  }else if (selectElement.value === "Cables Connected") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Cables Not Connected") {
    selectElement.style.backgroundColor = "red";
  }
}

// ---------------------------------------------------------------------------
// The "completeData" function
function completeData() {
  sessionStorage.removeItem("stationInfo");
  sessionStorage.removeItem("observations");
  alert(
    "Data has been saved and cleared. You can now enter information for a new loco."
  );
  document.getElementById("main-content").innerHTML = "";
}

function validateBarcode(input) {
  // Get the value from the input
  let value = input.value;

  // Remove any non-numeric characters
  value = value.replace(/\D/g, '');

  // Trim to the last 15 digits
  if (value.length > 15) {
    value = value.slice(-15);
  }

  // Update the input value with the last 15 digits
  input.value = value;
}

// ---------------------------------------------------------------------------
// Save Loco Info
async function saveLocoInfo(section) {
  const stationID = document.getElementById("station-id").value;
  const stationName = document.getElementById("station-name").value;
  const zone = document.getElementById("zone").value;
  const division = document.getElementById("division").value;
  const initial_date = document.getElementById("initial-date").value;
  const updated_date = document.getElementById("updated-date").value;

  if (
    !stationID ||
    !stationName ||
    !zone ||
    !division ||
    !initial_date ||
    !updated_date
  ) {
    alert("Please fill out all fields before saving.");
    return;
  }

  const stationData = {
    stationID: stationID,
    stationName: stationName,
    zone: zone,
    division: division,
    initial_date: initial_date,
    updated_date: updated_date,
  };

  // Save to sessionStorage
  sessionStorage.setItem("stationInfo", JSON.stringify(stationData));

  try {
    const response = await fetch("connect.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "station-id": stationID,
        "station-name": stationName,
        "zone": zone,
        "division": division,
        "initial-date": initial_date,
        "updated-date": updated_date,
      }),
    });

    const data = await response.json();
    console.log("Response:", data);

    if (data.success) {
      showModal("Loco info saved successfully!");
      // Once saved, no unsaved changes
      unsavedChanges = false;
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while saving the data.");
  }

  enableButtons();
}
document.addEventListener("click", function (event) {
  // Check if a "Get Details" button was clicked
  if (event.target.id === "get-details-btn") {
    // Remove highlight from all buttons
    document.querySelectorAll("#get-details-btn").forEach(btn => btn.classList.remove("highlight"));

    // Check if the button belongs to section "0.0" (using a data attribute)
    if (event.target.dataset.section === "0.0") {
      event.target.classList.add("highlight");
    }
  }
});


async function checkAndHighlightSections(stationId, zone, division) {
  // List of section IDs you want to check.
  // Adjust this list as needed.
  const sectionIds = ['2.0', '3.0', '4.0', '5.0', '6.0', '7.0'];

  for (const sectionId of sectionIds) {
    // Check if observations exist for this section.
    const exists = await checkExistingObservations(stationId, division, zone, sectionId);

    // Convert sectionId to a button ID.
    // For example: "1_0" becomes "button-1" and "2.0" becomes "button-2".
    let buttonId;
    if (sectionId.indexOf('_') !== -1) {
      buttonId = "button-" + sectionId.split('_')[0];
    } else if (sectionId.indexOf('.') !== -1) {
      buttonId = "button-" + sectionId.split('.')[0];
    } else {
      buttonId = "button-" + sectionId;
    }

    // Get the sidebar button by its ID.
    const button = document.getElementById(buttonId);

    if (button) {
      if (exists) {
        // When the section is filled, change the background color (light green) and enable the button.
        button.style.backgroundColor = "#b2ebf2";
        button.disabled = false;
      } else {
        // Otherwise, reset the background and keep it disabled.
        button.style.backgroundColor = "";
        button.disabled = false;
      }
    }
  }
}


// Function to check if observations exist for a given section
async function checkExistingObservations(stationId, division, zone, sectionId) {
  try {
    const requestData = { stationId, division, zone, sectionId };
    console.log("🚀 Sending request to check existing observations:", requestData);

    const response = await fetch("checkObservations.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    console.log("✅ Response from checkObservations.php:", data);

    return data.exists;
  } catch (error) {
    console.error("❌ Error checking existing observations:", error);
    return false;
  }
}

async function saveObservation(section) {
  const stationId = document.getElementById("station-id")?.value.trim();
  const zone = document.getElementById("zone")?.value.trim();
  const division = document.getElementById("division")?.value.trim();

  const saveBtn = document.querySelector(`#save-btn`);
  if (saveBtn) saveBtn.disabled = true;

  // ✅ Validate loco info
  if (!stationId || !zone || !division) {
    alert("⚠️ Please enter Loco ID, Shed Name, and Railway Division.");
    if (saveBtn) saveBtn.disabled = false;
    return;
  }

  try {
    const exists = await checkExistingObservations(stationId, division, zone, section);
    if (exists === true) {
      alert("⚠️ Observations already exist for this section.");
      if (saveBtn) saveBtn.disabled = false;
      return;
    }
  } catch (e) {
    alert("⚠️ Unable to verify existing observations. Try again.");
    console.error("Check failed:", e);
    if (saveBtn) saveBtn.disabled = false;
    return;
  }

  const formData = new FormData();
  formData.append("station-id", stationId);
  formData.append("station-name", document.getElementById("station-name")?.value || "");
  formData.append("intial-date", document.getElementById("initial-date")?.value || "");
  formData.append("division", division);
  formData.append("zone", zone);
  formData.append("updated-date", document.getElementById("updated-date")?.value || "");
  formData.append("section-id", section);

  const rows = document.querySelectorAll(`#observations-section-${section} tbody tr`);
  const observations = [];

  let anyDropdownSelected = false;

  for (const row of rows) {
    const S_no = row.querySelector("td:first-child")?.innerText.trim() || "";
    const obsField = row.querySelector(".observation_text");

    if (!obsField) {
      alert(`❌ Missing description field for S.No ${S_no}`);
      if (saveBtn) saveBtn.disabled = false;
      return;
    }

    const clone = obsField.cloneNode(true);
    clone.querySelectorAll("input").forEach(i => i.remove());
    const descriptionHtml = clone.innerHTML.trim();

    if (!descriptionHtml || descriptionHtml.toUpperCase() === "N/A") {
      alert(`⚠️ Description cannot be empty or "N/A" for S.No ${S_no}`);
      if (saveBtn) saveBtn.disabled = false;
      return;
    }

    const barcode = row.querySelector("input[type='text']")?.value.trim() || "";
    const text = (descriptionHtml + " " + barcode).trim();
    const remarks = row.querySelector(".remarks textarea")?.value.trim() || "";
    const status = row.querySelector("select")?.value || "";

    if (status && status !== "Select") {
      anyDropdownSelected = true;
    }

    const rowId = row.id.replace("row-", "");
    let imagePaths = [];

    try {
      imagePaths = await uploadDeviceImages(rowId);
    } catch (e) {
      alert(`❌ Image upload failed for row ${S_no}`);
      console.error("Image upload error:", e);
      if (saveBtn) saveBtn.disabled = false;
      return;
    }

    observations.push({
      S_no,
      observation_text: text,
      remarks,
      observation_status: status,
      image_paths: imagePaths,
    });
  }

  // ✅ Check if at least one observation status is selected
  if (!anyDropdownSelected) {
    alert("⚠️ Please select at least one observation status before saving.");
    if (saveBtn) saveBtn.disabled = false;
    return;
  }

  formData.append("observations", JSON.stringify(observations));

  if (!confirm("💾 Do you want to save observations?")) {
    if (saveBtn) saveBtn.disabled = false;
    return;
  }

  try {
    const response = await fetch(`section${section}.php`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("❌ Network error while saving observations.");

    const data = await response.json();

    if (data.success) {
      document.getElementById("messageBox").innerText = "🎉 Observations saved successfully!";
      setTimeout(() => {
        document.getElementById("messageBox").innerText = "";
      }, 2000);

      unsavedChanges = false;

      const getDetailsBtn = document.querySelector(`#get-details-btn`);
      const updateBtn = document.querySelector(`#update-btn`);

      if (saveBtn) saveBtn.style.display = 'none';
      if (getDetailsBtn) getDetailsBtn.style.display = 'inline-block';
      if (updateBtn) updateBtn.style.display = 'none';
    } else {
      alert(data.message || "❌ Server returned failure.");
    }
  } catch (error) {
    alert("❌ Error saving observations.");
    console.error(error);
  } finally {
    if (saveBtn) saveBtn.disabled = false;
  }
}
// Function to get unique section_ids along with their S_no
function getSectionIDWithSno(observations) {
  const sectionMap = {};
  observations.forEach(observation => {
    if (!sectionMap[observation.section_id]) {
      sectionMap[observation.section_id] = [];
    }
    sectionMap[observation.section_id].push(observation.S_no);
  });
  return Object.keys(sectionMap).map(section_id => ({
    section_id: section_id,
    sno: sectionMap[section_id]
  }));
}

// Function to populate loco details
function populateStationDetails(stationDetails) {
  console.log("Station Details Response:", stationDetails);

  // Check if session storage already contains loco details
  sessionStorage.setItem("stationDetails", JSON.stringify(stationDetails));

  // Populate the form fields with the loco details
  const stationNameInput = document.getElementById("station-name");
  const initialDateInput = document.getElementById("initial-date");
  const updateDateInput = document.getElementById("updated-date");

  if (stationNameInput) stationNameInput.value = stationDetails.station_name || "";
  
  
  // Always use current date when editing
  if (initialDateInput) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    initialDateInput.value = `${year}-${month}-${day}`;
  }
  if (updateDateInput) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    updateDateInput.value = `${year}-${month}-${day}`;
  }
}

// Enable buttons dynamically based on section IDs
function enableSectionButtons(sectionID) {
  const button = document.getElementById(`button-${sectionID}`);
  if (button) {
    button.disabled = false;
  } else {
    console.warn(`Button not found for section: ${sectionID}`);
  }
}

// — after you fetch your data, do something like:
//    window.allObservations = fetchedArray;
//    updateSections(window.allObservations, "2_0", ["2.1","2.2",…]);

// Global store of everything you've fetched
window.allObservations = [];

// Enable buttons dynamically based on section IDs
function enableSectionButtons(sectionID) {
  const button = document.getElementById(`button-${sectionID}`);
  if (button) {
    button.disabled = false;
  } else {
    console.warn(`Button not found for section: ${sectionID}`);
  }
}

// Global object to store edited barcode values keyed by rowId.
window.editedBarcodes = window.editedBarcodes || {};

/**
 * Called on each barcode input. Saves the new value, then re-renders
 * just that section so the table reflects the fresh code.
 */
function updateEditedBarcode(rowId, value, sectionID, sno) {
  window.editedBarcodes[rowId] = value;
  // re-render only this section:
  updateSections(window.allObservations, sectionID, sno);
}

/**
 * Filter & render a single section's table.
 */
function updateSections(observations, sectionID, sno) {
  const sectionContainer = document.getElementById(`observations-section-${sectionID}`);
  if (!sectionContainer) {
    console.warn(`⚠️ Section container not found for sectionID: ${sectionID}`);
    return;
  }
  enableSectionButtons(sectionID);
  const filtered = observations.filter(o => o.section_id === sectionID);
  if (filtered.length) {
    updateObservationsTable(sectionID, filtered, sno);
  } else {
    console.warn(`⚠️ No observations for section ${sectionID}`);
  }
}

/**
 * Rebuilds the <tbody> for one section.
 */
// Call this on input so the updated value is saved globally.
function updateEditedBarcode(rowId, value) {
  console.log("Updating barcode for row", rowId, "to:", value);
  window.editedBarcodes[rowId] = value;
}

function updateObservationsTable(sectionID, observations, sno) {
  const tbody = document.getElementById(`observations-tbody-${sectionID}`);
  if (!tbody) {
    console.error(`Table body #observations-tbody-${sectionID} not found.`);
    return;
  }

  tbody.innerHTML = "";

  // Filter observations for the current section.
  const filteredObservations = observations.filter(obs => obs.section_id === sectionID);

  // For each serial number, find an existing observation or create a default one.
  const allRows = sno.map(snoValue => {
    return filteredObservations.find(obs => obs.S_no === snoValue) || { S_no: snoValue, section_id: sectionID };
  });

  allRows.forEach((observation) => {
    const S_no = observation.S_no;
    let rowId = observation.rowId || S_no;

    // Only for section "2_0", override the barcode with any edited value.
    if (sectionID === "2_0" && S_no !== "2.1" && window.editedBarcodes && window.editedBarcodes[rowId] !== undefined) {
      console.log(`Row ${rowId} using edited barcode: ${window.editedBarcodes[rowId]}`);
      observation.barcode = window.editedBarcodes[rowId];
    }

    const dropdownOptions = getDropdownOptions(S_no, observation.observation_status);

    let imageHTML = "";
    if (observation.images && observation.images.length > 0) {
      imageHTML = observation.images
        .map((imgPath, idx) => `
          <div class="image-container" style="position: relative; display: inline-block;">
            <img
              id="captured-image-${rowId}-${idx}"
              src="${imgPath}"
              alt="Uploaded Image"
              width="100"
              style="margin:5px;"
              onerror="console.error('Error loading image:', this.src')">
            <span style="position:absolute; top:0; right:0; cursor:pointer; color:red; font-weight:bold;" onclick="deleteImage(event, '${sectionID}', '${S_no}', '${imgPath}')">&times;</span>
          </div>
        `).join("");
    }

    const imageUploadBlock = `
      <div class="image-container" id="image-container-${rowId}">
        ${imageHTML}
      </div>
      <button type="button" class="add-image" onclick="showUploadOptions('${rowId}')">
        Add/Update Image
      </button>
      <div class="upload-options" id="upload-options-${rowId}" style="display: none;">
        <button class="add-image" onclick="startCamera('${rowId}')">Camera</button>
        <label for="file-input-${rowId}" class="upload-label">Upload from Device</label>
        <input
          type="file"
          id="file-input-${rowId}"
          name="images[]"
          accept="image/*"
          multiple
          style="display:none;"
          onchange="displayImages(this, '${rowId}')">
      </div>
      <div id="camera-container-${rowId}" style="display: none;">
        <video id="camera-${rowId}" width="100%" height="auto" autoplay></video>
        <button class="add-image" onclick="captureImage('${rowId}')">Capture Image</button>
        <button class="add-image" onclick="stopCamera('${rowId}')">Stop Camera</button>
        <button class="reverse-camera" onclick="switchCamera('${rowId}')">🔄 Switch Camera</button>
        <canvas id="canvas-${rowId}" style="display: none;"></canvas>
      </div>
    `;

    // For the observation text cell, include the barcode input field only for section "2_0"
    let observationContent = observation.observation_text || "N/A";
    if (sectionID === "2_0" && S_no !== "2.1") {
      observationContent += `<br>
        <input
          type="text"
          id="barcode-input-${rowId}"
          name="barcode_kavach_main_unit"
          pattern="^\\d{10,15}$"
          title="Enter a number between 10 to 15 digits"
          placeholder="Scan Barcode"
          style="width: 180px; padding: 5px; font-size: 14px;"
          value="${observation.barcode || ''}"
oninput="
  // Keep only digits
  let cleaned = this.value.replace(/\D/g, '');
  if (cleaned.length > 15) cleaned = cleaned.slice(-15);
  this.value = cleaned;

  // Only update if barcode is between 10 and 15 digits
  if (cleaned.length >= 10 && cleaned.length <= 15) {
    updateEditedBarcode('${rowId}', cleaned);
  } else {
    delete window.editedBarcodes['${rowId}'];
  }

  toggleNotInstalledOption(this);
"
/>`;
    }

    const row = document.createElement("tr");
    row.setAttribute("data-sno", S_no);
    row.setAttribute("id", `row-${rowId}`);

    row.innerHTML = `
      <td>${S_no}</td>
      <td class="observation_text">${observationContent}</td>
      <td>
        <select name="observation-status-${rowId}" id="status-${rowId}" onchange="highlightSelect(this); markDataAsUnsaved();">
          ${dropdownOptions}
        </select>
      </td>
      <td class="remarks">
        <textarea rows="2" cols="20" oninput="enableUpdateButton(); markDataAsUnsaved();">${observation.remarks || ""}</textarea>
      </td>
      ${sectionID !== "1_0" ? `<td>${imageUploadBlock}</td>` : ""}
    `;
        // ❌ Skip appending the row if description is empty or "N/A"
    if (!observationContent || observationContent.trim() === "N/A") {
      console.warn(`❌ Skipping row ${S_no} due to invalid description`);
      return;
    }


    tbody.appendChild(row);

    setTimeout(() => {
      const statusDropdown = document.getElementById(`status-${rowId}`);
      if (statusDropdown) {
        let valueToSet = observation.observation_status?.trim() || "Select";
        console.log(`Row ${rowId}: Setting dropdown value to "${valueToSet}"`);
        statusDropdown.value = valueToSet;

        const optionsArray = Array.from(statusDropdown.options).map(opt => opt.value);
        console.log(`Row ${rowId} options:`, optionsArray);

        highlightSelect(statusDropdown);
      }
    }, 100);
  });
}

function deleteImage(event, sectionID, s_no, imgPath) {
  event.preventDefault();
  event.stopPropagation();

  if (!confirm("Are you sure you want to delete this image?")) return;

  const stationId = document.getElementById("station-id").value;
  const relativePath = imgPath.replace(/^.*\/uploads\//, 'uploads/');

  fetch('deleteImage.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ station_id: stationId, s_no, imgPath: relativePath })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert("Image deleted successfully.");

      // Remove the image element from DOM directly
      const imgContainer = event.target.closest('.image-container');
      if (imgContainer) {
        imgContainer.remove();
      }

      // Also update the observation object to remove this image
      const obs = observations.find(o => o.S_no === s_no && o.section_id === sectionID);
      if (obs && obs.images) {
        obs.images = obs.images.filter(path => path !== imgPath);
      }

    } else {
      alert("Failed to delete image: " + data.message);
    }
  })
  .catch(error => console.error('Error deleting image:', error));
}







// Function to update only the description part (if needed)
function updateObservationText(rowId, barcodeValue) {
  // Look for a span with class "description" within the observation cell.
  const descriptionSpan = document.querySelector(`#row-${rowId} td.observation_text .description`);
  if (descriptionSpan) {
    // For example, if you want to update the description to reflect the barcode:
    // (Adjust the logic as needed—you might simply leave the description unchanged.)
    descriptionSpan.textContent = `Updated Barcode: ${barcodeValue}`;
  }
}

// Function to handle barcode scanning
function handleBarcodeScan(rowId, barcodeValue) {
  // Update the input field's value
  const barcodeInput = document.querySelector(`#row-${rowId} input[name="barcode_kavach_main_unit"]`);
  if (barcodeInput) {
    barcodeInput.value = barcodeValue;
    updateEditedBarcode(rowId, barcodeValue);
  }
  // Optionally update the display of the description
  updateObservationText(rowId, barcodeValue);
}


// Enable update button if any changes occur
function enableUpdateButton() {
  document.getElementById("update-button").disabled = false;
}

// Function to track changes in inputs (used for enabling the update button)
function trackChanges(element, isFile = false) {
  let initialValue = element.getAttribute("data-initial");
  let currentValue = isFile ? element.files.length > 0 : element.value;
  
  if (initialValue != currentValue) {
    document.getElementById("update-button").disabled = false;
  }
}

// Function to delete an image





function toggleNotInstalledOption(inputElement) {
  // Find the row containing this input
  const row = inputElement.closest('tr');
  if (!row) return;

  // Grab the dropdown in the same row
  const dropdown = row.querySelector('select');
  if (!dropdown) return;

  // Locate the "Not Installed" <option> in that dropdown
  const notInstalledOption = [...dropdown.options].find(
    option => option.value === 'Not Installed'
  );
  if (!notInstalledOption) return; // fixed typo: using notInstalledOption

  // If there's any text in the barcode input, disable "Not Installed"
  if (inputElement.value.trim() !== '') {
    notInstalledOption.disabled = true;

    // If the dropdown was already set to "Not Installed", reset it
    if (dropdown.value === 'Not Installed') {
      dropdown.value = 'Select';
    }
  } else {
    // If input is empty, re-enable "Not Installed"
    notInstalledOption.disabled = false;
  }
}

// Example dummy function for the select change event
function highlightSelect(selectElement) {
  // Dummy function; add your highlighting code here if needed.
  console.log("Dropdown changed to:", selectElement.value);
}
// Function to format observation description
function formatDescription(observationText) {
  let normalized = observationText.trim();

  // Match trailing numbers
  const trailingMatch = normalized.match(/(\d+\s*)+$/);
  if (!trailingMatch) return normalized; // No trailing numbers found, return the original text

  const trailingNumbers = trailingMatch[0].trim().split(/\s+/); // Split trailing numbers
  const labelsText = normalized.substring(0, trailingMatch.index).trim(); // Get text before the trailing numbers

  // Match labels that end with a colon
  const labels = labelsText.match(/[^:]+:/g);
  if (!labels) return normalized; // No labels found, return the original text

  // Return formatted string combining labels and numbers
  return labels.slice(0, trailingNumbers.length)
    .map((label, i) => label.trim() + trailingNumbers[i]) // Combine each label with its corresponding number
    .join(" , ");
}

// Function to fetch updated details when clicking "Get Details"
function getDetails() {
  let stationID = document.getElementById("station-id").value.trim();
  let zone = document.getElementById("zone").value.trim();
  let division = document.getElementById("division").value.trim();

  if (!stationID || !zone || !division) {
    alert("Please fill in all the fields.");
    return;
  }

  console.log("📢 Fetching details for:", { stationID, zone, division });

  $.ajax({
    url: "generateReport.php",
    type: "POST",
    data: {
      "station-id": stationID,
      "division": division,
      "zone": zone,
    },
    dataType: "json",
    success: async function (response) {
      console.log("✅ Server Response:", response);

      if (!response.success) {
        console.warn("⚠️ No details found:", response.message);
        alert(response.message);
        return;
      }

      console.log("🚂 Loco Details Found:", response.stationDetails);
      populateStationDetails(response.stationDetails);

      let sectionWiseSno = {};

      response.observations.forEach((observation) => {
        let sectionID = observation.section_id;
        if (!sectionWiseSno[sectionID]) {
          sectionWiseSno[sectionID] = [];
        }
        sectionWiseSno[sectionID].push(observation.S_no);
      });

      console.log("📌 Section-wise S_no mapping:", sectionWiseSno);

      Object.keys(sectionWiseSno).forEach((sectionID) => {
        updateSections(response.observations, sectionID, sectionWiseSno[sectionID]);

        let updateBtn = document.getElementById(`update-btn-${sectionID}`);
        if (updateBtn) {
          updateBtn.disabled = false;
        }
      });

      setTimeout(() => {
        response.observations.forEach((observation) => {
          if (observation.images && observation.images.length > 0) {
            console.log(`📸 Displaying images for S_no: ${observation.S_no}`, observation.images);
            displayImagesWithDelete(observation.images, observation.rowId);
          }
        });
      }, 500);

      await checkAndHighlightSections(stationID, zone, division);

      // Hide Save button and show Update button when Get Details is clicked
      document.getElementById('save-btn').style.display = 'none';
      document.getElementById('update-btn').style.display = 'inline-block'; // Show Update button
    },
    error: function (xhr, status, error) {
      console.error("❌ Error fetching data from server:", status, error);
      alert("There was an error fetching the data.");
    },
  });
}

// Modified displayImages function to include delete icon
function displayImagesWithDelete(images, rowId) {
  const imageContainer = document.getElementById(`image-container-${rowId}`);
  if (imageContainer) {
    images.forEach((imgPath, idx) => {
      const imgHTML = `
        <div class="image-container">
          <img
            id="captured-image-${rowId}-${idx}"
            src="${imgPath}"
            alt="Uploaded Image"
            width="100"
            style="display:block; margin:5px;"
            onerror="console.error('Error loading image:', this.src)">
          <button type="button" onclick="deleteImage('${rowId}', '${imgPath}')">Delete</button>
        </div>
      `;
      imageContainer.innerHTML += imgHTML;
    });
  }
}


/**
 * Update existing observations for a given section.
 * Uses rowFiles map, deletedImagesMap, uploadImages helper,
 * and preserves multi-file uploads from device and camera captures.
 */
async function updateObservation(section) {
  // 1) Section mapping (optional index)
  const sectionMapping = {
    "2_0": 1,  "3_0": 2,  "4_0": 3,
    "5_0": 4,  "6_0": 5,  "7_0": 6
  };

  // 2) Section‐level fields
  const stationId          = document.getElementById("station-id").value;
  const zone       = document.getElementById("zone").value;
  const division = document.getElementById("division").value;

  if (sectionMapping[section] === undefined) {
    alert("Invalid section provided.");
    return;
  }

  // 3) Mandatory‐images check
  if (!validateMandatoryImages(section)) return;

  // 4) Build base FormData
  const formData = new FormData();
  formData.append("station-id",          stationId);
  formData.append("station-name",        document.getElementById("station-name").value);
  formData.append("initial-date",       document.getElementById("initial-date").value);
  formData.append("zone", zone);
  formData.append("division",        division);
  formData.append("updated-date",  document.getElementById("updated-date").value);
  formData.append("section-id",       section);
  formData.append("action",           "update");
  formData.append("section_index",    sectionMapping[section]);

  // 5) Gather per-row observations
  const observations = [];
  let hasChanges = false;
  const rows = document.querySelectorAll(`#observations-section-${section} tbody tr`);

  for (const row of rows) {
    const rowId = row.id.replace("row-", "");
    const S_no  = row.querySelector("td:nth-child(1)")?.innerText.trim() || "";

    // 5a) Text, barcode (for 2_0), remarks, status
    let observationText = row.querySelector(".observation_text")?.textContent.trim() || "";
    let barcodeValue    = "";
    if (section === "2_0") {
      const bcInput = row.querySelector("input[name='barcode_kavach_main_unit']");
      if (bcInput) {
        barcodeValue = bcInput.value.trim().slice(-15);
        if (bcInput.dataset.initialValue !== barcodeValue) hasChanges = true;
      }
    }

    const remarks           = row.querySelector(".remarks textarea")?.value.trim() || "";
    const observationStatus = row.querySelector("select")?.value || "";
    if (observationStatus && observationStatus !== "Select") hasChanges = true;
    if (observationText || remarks || barcodeValue)        hasChanges = true;
    if (!observationStatus && !remarks && !barcodeValue && !observationText) continue;

    // 5b) Gather ALL images currently in the container
    const existingPaths = [];
    const imgContainer  = document.getElementById(`image-container-${rowId}`);
    if (imgContainer) {
      imgContainer.querySelectorAll("img").forEach(img => {
        const rel = img.src.replace(/^.*\/uploads\//, "uploads/");
        existingPaths.push(rel);
      });
    }

    // 5c) Deleted images
    const deletedPaths = Array.from(deletedImagesMap[rowId] || []);

    // 5d) Upload new Files/Blobs from rowFiles map
    let uploadedPaths = [];
    const newFiles = rowFiles.get(rowId) || [];
    if (newFiles.length) {
      try {
        uploadedPaths = await uploadImages(newFiles);
        rowFiles.set(rowId, []); // clear queue
      } catch (err) {
        alert(`❌ Failed to upload images for row ${rowId}: ${err}`);
        return;
      }
    }

    // 5e) Consolidate final image list
    const allImages = [
      ...existingPaths.filter(p => !deletedPaths.includes(p)),
      ...uploadedPaths
    ];

    observations.push({
      S_no,
      observation_text:  observationText,
      barcode:           barcodeValue,
      remarks,
      observation_status: observationStatus,
      image_paths:       allImages,
      deleted_images:    deletedPaths
    });
  }

  // 6) Abort if no modifications
  if (!hasChanges) {
    alert("No changes detected. Modify at least one entry before updating.");
    return;
  }

  // 7) Append JSON payload
  formData.append("observations", JSON.stringify(observations));

  // 8) Submit update
  try {
    const resp = await fetch("updateObservations.php", { method: "POST", body: formData });
    const text = await resp.text();
    let data;
    try { data = JSON.parse(text); }
    catch { throw new Error("Server returned non-JSON response"); }

    if (data.success) {
      alert("✅ Observations updated successfully!");
      unsavedChanges = false;
      getDetails();
    } else {
      alert(`Error from server: ${data.message}`);
    }
  } catch (err) {
    console.error("Error updating observations:", err);
    alert("An error occurred during update: " + err.message);
  }
}
// Function to enable section buttons dynamically
function enableSectionButtons(sectionID) {
  // Extract only the main section number (before underscore, if present)
  const sectionNumber = sectionID.split("_")[0];

  const button = document.getElementById(`button-${sectionNumber}`);
  if (button) {
    button.disabled = false;
  } else {
    console.warn(`Button not found for section: ${sectionID}`);
  }
}

// Build the dropdown options (your function provided earlier)
function getDropdownOptions(sno, observationStatus) {
  let isSelected = !observationStatus || observationStatus.trim() === "" || observationStatus.trim() === "Select";
  let defaultOption = `<option value="Select" ${isSelected ? "selected" : ""}>Select</option>`;
  
  if (!sno || typeof sno !== "string") {
    console.error("Invalid S_no value:", sno);
    return defaultOption;
  }  
const specificOptions = {
    "2.1": ["Present", "Not Present"],
"2.38,2.39,2.40,2.41,2.42,2.43,2.44,2.45,2.46,2.47,2.48,2.49" : ["Matching", "Not Matching", "Not Installed", "Not Applicable"],    "2.2,2.3,2.4,2.5,2.6,2.7,2.8,2.9,2.10,2.11,2.12,2.13,2.14,2.15,2.16,2.17,2.18,2.19,2.20,2.21,2.22,2.23,2.24,2.25,2.26,2.27,2.28,2.29,2.30,2.31,2.32,2.33,2.34,2.35,2.36,2.37": ["Matching", "Not Matching", "Not Installed"],
    "3.6": ["Matching", "Not Matching"],
    "3.3,3.4,3.5,3.12,6.2,6.4,7.2,3.12,3.13,3.14,3.15,3.16,3.17,3.18,3.19,3.20,3.21,5.1,5.2,5.3,5.4": ["Yes", "No"],
    "3.1,3.8,5.6": ["Connected", "Not Connected"],
    "3.2,6.1": ["Available", "Not Available"],
    "6.5": ["Applied", "Not Applied"],
    "4.2,7.3,3.9,5.5": ["Routing Done", "Routing Not Done"],
    "4.1,4.3,4.4,4.5,4.6,4.7,4.8,4.9,4.10,4.11,4.12,4.13,4.14,4.15,4.16,4.17,4.18,4.19,4.20,4.21,4.22,4.23,4.24,4.25,4.26": ["Fixed", "Not Fixed"],
    "6.3,7.1,3.7": ["Torquing done", "Torquing Not done"],
    "7.4":["Locked" , "Not Locked"],
    "3.11" :["Cables Connected", "Cables Not Connected"],
    "3.10" : ["Metal clamps implemented","Metal clamps not implemented"]
    
  };


  for (const [key, values] of Object.entries(specificOptions)) {
    const keys = key.split(",").map(k => k.trim());
    for (const k of keys) {
      if (k.includes("-")) {
        const [start, end] = k.split("-").map(Number);
        const numSno = parseFloat(sno);
        if (numSno >= start && numSno <= end) {
          const matchedOptions = values.map(value =>
            `<option value="${value}" ${observationStatus?.trim() === value ? "selected" : ""}>${value}</option>`
          ).join("\n");
          return defaultOption + "\n" + matchedOptions;
        }
      } else if (sno === k) {
        const matchedOptions = values.map(value =>
          `<option value="${value}" ${observationStatus?.trim() === value ? "selected" : ""}>${value}</option>`
        ).join("\n");
        return defaultOption + "\n" + matchedOptions;
      }
    }
  }

  return defaultOption;
}





function formatDescription(description) {
  let normalized = description.trim();
  const trailingMatch = normalized.match(/(\d+\s*)+$/);
  if (!trailingMatch) return normalized;

  const trailingNumbers = trailingMatch[0].trim().split(/\s+/);
  const labelsText = normalized.substring(0, trailingMatch.index).trim();
  const labels = labelsText.match(/[^:]+:/g);
  if (!labels) return normalized;

  return labels.slice(0, trailingNumbers.length)
    .map((label, i) => label.trim() + trailingNumbers[i])
    .join(" , ");
}



function showModal() {
  const modal = document.getElementById("success-modal");
  modal.style.display = "block"; // Show modal
  setTimeout(() => {
    modal.style.display = "none"; // Hide modal after 3 seconds
  }, 3000);
}

// Helper function to handle input selection (only one checked)
function onlyOneChecked(target, name) {
  const checkboxes = document.getElementsByName(name);
  checkboxes.forEach((checkbox) => {
    if (checkbox !== target) checkbox.checked = false;
  });
}

// Event listener to load default loco info (if any) when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
  const locoInfo = JSON.parse(sessionStorage.getItem("stationInfo"));

  if (locoInfo) {
    showSection("0.0"); // Default section to load
  }
});

function showUploadOptions(rowId) {
  const uploadBox = document.getElementById(`upload-options-${rowId}`);
  if (!uploadBox) {
    console.warn(`Upload options not found for rowId: ${rowId}`);
    return;
  }
  uploadBox.style.display = uploadBox.style.display === "none" ? "block" : "none";
}


let currentCamera = "environment"; // Default to back camera
let observations = [];

// ✅ Start Camera
async function startCamera(rowId) {
  const cameraContainer = document.getElementById(`camera-container-${rowId}`);
  const video = document.getElementById(`camera-${rowId}`);

  if (!video || !cameraContainer) {
    console.error(`❌ Missing camera elements for row ${rowId}`);
    return;
  }

  try {
    const constraints = {
      video: { facingMode: currentCamera },
      audio: false,
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    cameraContainer.style.display = "block";
    console.log(`🎥 Camera started (Mode: ${currentCamera})`);
  } catch (error) {
    console.error("🚨 Error starting the camera:", error);
    alert("⚠️ Unable to access the camera. Please check permissions.");
  }
}

// ✅ Stop Camera
function stopCamera(rowId) {
  const video = document.getElementById(`camera-${rowId}`);
  if (!video) return;

  if (video.srcObject) {
    video.srcObject.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
  }

  const cameraContainer = document.getElementById(`camera-container-${rowId}`);
  if (cameraContainer) cameraContainer.style.display = "none";

  console.log("🛑 Camera stopped.");
}

function enableButtons() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => (button.disabled = false));
}

// ✅ Capture Image
function captureImage(rowId) {
  const canvas = document.getElementById(`canvas-${rowId}`);
  const video = document.getElementById(`camera-${rowId}`);
  const imageContainer = document.getElementById(`image-container-${rowId}`);

  if (!canvas || !video || !imageContainer) {
    console.error(`❌ Missing elements for row ${rowId}`);
    return;
  }

  if (video.videoWidth === 0 || video.videoHeight === 0) {
    alert("⚠️ Camera not active. Please start the camera first.");
    return;
  }

  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  console.log("📸 Capturing image...");
  
  canvas.toBlob((blob) => {
    if (!blob) {
      console.error("⚠️ Failed to create image blob.");
      return;
    }

    // Log the blob size and type to confirm it was created correctly
    console.log("📝 Image blob created. Size:", blob.size, "Type:", blob.type);
    
    // Upload the captured image
    uploadCapturedImage(blob, rowId, imageContainer);
  }, "image/png");

  stopCamera(rowId); // Stop the camera only after the image is captured
}

// ✅ Upload Captured Image and Add to rowFiles
function uploadCapturedImage(blob, rowId, imageContainer) {
  const formData = new FormData();
  formData.append("images[]", blob, `capture-${rowId}.png`);

  console.log("📤 Uploading captured image...");

  fetch("upload.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("📜 Upload response:", data);
      
      if (data.success && data.file_paths && data.file_paths.length > 0) {
        const imageUrl = data.file_paths[0];

        // Add the captured image URL to the image container and rowFiles map
        addImageWithDeleteIcon(imageUrl, imageContainer, rowId); // Use reusable function
        updateObservations(rowId, imageUrl);

        // Add captured image URL to rowFiles (if it's not already in there)
        const files = rowFiles.get(rowId) || [];
        files.push(imageUrl);  // Add imageUrl from captured image
        rowFiles.set(rowId, files);

        console.log(`✅ Image uploaded: ${imageUrl}`);
      } else {
        alert(`⚠️ Capture upload failed: ${data.message || "Unknown error"}`);
      }
    })
    .catch((error) => {
      console.error("🚨 Error uploading image:", error);
      alert("⚠️ Image upload failed.");
    });
}


async function uploadDeviceImages(rowId) {
  let imagePaths = [];

  const imageContainer = document.getElementById(`image-container-${rowId}`);
  if (imageContainer) {
    const imgs = imageContainer.querySelectorAll("img");
    for (const img of imgs) {
      const src = img.getAttribute("src");
      if (src.startsWith("data:image")) {
        // Optional: convert base64 to blob + upload here if needed
        console.warn("Base64 image detected. Already uploaded via camera.");
      } else {
        const relative = src.replace(/^.*\/uploads\//, "uploads/");
        imagePaths.push(relative);
      }
    }
  }

  // Then upload files from rowFiles map (device uploads)
  const files = rowFiles.get(rowId) || [];
  if (files.length > 0) {
    const fd = new FormData();
    files.forEach(f => fd.append("images[]", f));

    try {
      const response = await fetch("upload.php", {
        method: "POST",
        body: fd
      });
      const data = await response.json();
      if (data.success && data.file_paths) {
        data.file_paths.forEach(path => {
          imagePaths.push(path);
        });
      } else {
        alert("❌ Upload failed.");
        return [];
      }
    } catch (err) {
      console.error("❌ Upload error:", err);
      return [];
    }
  }

  return imagePaths;
}

// ✅ Reusable function to add image with delete icon
function addImageWithDeleteIcon(imageUrl, imageContainer, rowId) {
  const wrapper = document.createElement("div");
  wrapper.style.display = "inline-block";
  wrapper.style.position = "relative";
  wrapper.style.margin = "5px";

  const img = document.createElement("img");
  img.src = imageUrl;
  img.style.width = "100px";
  img.style.display = "block";
  img.style.border = "1px solid #ccc";

  // Create delete icon
  const deleteIcon = document.createElement("span");
  deleteIcon.innerHTML = "&times;"; // × symbol
  deleteIcon.style.position = "absolute";
  deleteIcon.style.top = "-8px";
  deleteIcon.style.right = "-8px";
  deleteIcon.style.backgroundColor = "#f44336";
  deleteIcon.style.color = "#fff";
  deleteIcon.style.width = "20px";
  deleteIcon.style.height = "20px";
  deleteIcon.style.borderRadius = "50%";
  deleteIcon.style.cursor = "pointer";
  deleteIcon.style.textAlign = "center";
  deleteIcon.style.lineHeight = "20px";
  deleteIcon.style.fontWeight = "bold";
  deleteIcon.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";

  deleteIcon.onclick = () => {
    wrapper.remove();
    console.log("✅ Deleted image:", imageUrl);
    removeImageFromObservations(rowId, imageUrl); // optional backend logic
  };

  wrapper.appendChild(img);
  wrapper.appendChild(deleteIcon);
  imageContainer.appendChild(wrapper);
}

// Optional: Function to remove image from backend observations (if needed)
function removeImageFromObservations(rowId, imageUrl) {
  // Implement backend deletion logic here
  fetch("deleteImage.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ rowId, imageUrl })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log("🗑️ Image removed from backend.");
      } else {
        console.error("⚠️ Failed to remove image from backend:", data.message);
      }
    })
    .catch(error => {
      console.error("🚨 Error in removing image from backend:", error);
    });
}


// ✅ Update Observations Array
function updateObservations(rowId, imagePath) {
  let observation = observations.find((obs) => obs.S_no === rowId);

  if (observation) {
    observation.image_path = imagePath;
  } else {
    observations.push({
      S_no: rowId,
      observation_text: "",
      remarks: "",
      observation_status: "",
      image_path: imagePath,
    });
  }

  console.log("📜 Updated Observations:", observations);
}

// ✅ Switch Camera (Front/Back)
function switchCamera(rowId) {
  currentCamera = currentCamera === "environment" ? "user" : "environment";
  stopCamera(rowId);
  startCamera(rowId);
}

// Step 1: Function to handle file upload
function handleFileUpload(rowId, imgElementId) {
  const files = rowFiles.get(rowId); // Get the list of files for the specific row
  if (!files || files.length === 0) {
    alert("No files selected for upload.");
    return;
  }

  const formData = new FormData();

  // Step 2: Append each file with a unique name (timestamp to avoid overwriting)
  files.forEach((file) => {
    console.log(`📤 Adding ${file.name} to formData...`);

    // Append file with a unique identifier
    const timestamp = Date.now();
    formData.append("images[]", file, `${file.name.split('.')[0]}_${timestamp}.${file.name.split('.').pop()}`);
  });

  console.log('🔄 Sending images to upload.php...');

  // Step 3: Send the request to upload.php via Fetch API
  fetch("upload.php", { method: "POST", body: formData })
    .then((response) => response.json())
    .then((data) => {
      console.log("Upload Response:", data); // Debugging log
      if (data.success) {
        // Step 4: If upload is successful, update the image elements with the uploaded file paths
        const imgElement = document.getElementById(imgElementId);

        // Check if the file paths are returned as expected
        data.file_paths.forEach((filePath) => {
          // Display uploaded image(s)
          const img = document.createElement("img");
          img.src = filePath; // Use the returned file path
          img.style.display = "block";
          imgElement.appendChild(img); // Append to the imgElement
        });
      } else {
        alert("Upload failed: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
      alert("An error occurred during file upload.");
    });
}

// at top of your script:
const rowFiles = new Map();  // rowId → Array<File>
function displayImages(inputElement, rowId) {
  rowId = String(rowId); // ✅ Always treat rowId as a string
  console.log(`📥 Triggered displayImages for row ${rowId}`);

  const imageContainer = document.getElementById(`image-container-${rowId}`);
  if (!imageContainer) {
    console.error(`❌ Image container not found for rowId: ${rowId}`);
    return;
  }

  const newFiles = Array.from(inputElement.files);
  if (newFiles.length === 0) {
    console.warn("⚠️ No files selected for upload.");
    return;
  }

  const existing = rowFiles.get(rowId) || [];
  existing.push(...newFiles);
  rowFiles.set(rowId, existing);
  console.log(`📦 After pick, row ${rowId} has ${existing.length} total files`);

  newFiles.forEach(file => {
    console.log(`🔍 Reading file: ${file.name}`);
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      console.log(`🖼️ Preview ready for: ${file.name}`);

      const wrapper = document.createElement("div");
      Object.assign(wrapper.style, {
        display: "inline-block", position: "relative", margin: "5px"
      });

      const img = document.createElement("img");
      img.src = imageUrl;
      Object.assign(img.style, { width: "100px", border: "1px solid #ccc" });

      const del = document.createElement("span");
      del.innerHTML = "&times;";
      Object.assign(del.style, {
        position: "absolute", top: "-8px", right: "-8px",
        backgroundColor: "#f44336", color: "#fff",
        width: "20px", height: "20px", borderRadius: "50%",
        cursor: "pointer", textAlign: "center", lineHeight: "20px",
        fontWeight: "bold", boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
      });

      del.onclick = () => {
        wrapper.remove();
        const arr = rowFiles.get(rowId).filter(f => f !== file);
        rowFiles.set(rowId, arr);
        console.log(`🗑️ Deleted file ${file.name}; ${arr.length} remain for row ${rowId}`);
      };

      wrapper.append(img, del);
      imageContainer.append(wrapper);
    };
    reader.readAsDataURL(file);
  });
}
function uploadImages(files) {
  return new Promise((resolve, reject) => {
    if (!files || files.length === 0) {
      return resolve([]); // nothing to do
    }

    const formData = new FormData();
    let appended = 0;

    files.forEach((f, idx) => {
      // only append File or Blob instances
      if (f instanceof File || f instanceof Blob) {
        // preserve original name if available, else give a default
        const filename = f.name || `capture_${idx}.png`;
        console.log(`📤 Adding ${filename} to formData…`);
        formData.append('images[]', f, filename);
        appended++;
      } else {
        console.log(`⚠️ Skipping non-file entry at index ${idx}:`, f);
      }
    });

    if (appended === 0) {
      console.log('⚠️ No valid File/Blob objects to upload.');
      return resolve([]);
    }

    console.log('🔄 Sending images to upload.php…');
    fetch('upload.php', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        console.log('✅ Response from server:', data);
        if (data.success) {
          resolve(data.file_paths);
        } else {
          console.error('❌ Image upload failed:', data.message);
          reject(data.message);
        }
      })
      .catch(err => {
        console.error('🚨 Upload error:', err);
        reject('Upload failed due to a network or server error.');
      });
  });
}
function highlightSelect(selectElement) {
  if (selectElement.value === "Not Available") {
    selectElement.style.backgroundColor = "red";
  } else if (selectElement.value === "Available") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Present") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Not Present") {
    selectElement.style.backgroundColor = "red";
  } else if (selectElement.value === "Yes") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "No") {
    selectElement.style.backgroundColor = "red";
  } else if (selectElement.value === "Applied") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Not Applied") {
    selectElement.style.backgroundColor = "red";
  } else if (selectElement.value === "Routing Done") {
    selectElement.style.backgroundColor = "Green";
  } else if (selectElement.value === "Routing Not Done") {
    selectElement.style.backgroundColor = "red";
  } else if (selectElement.value === "Fixed") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Not Fixed") {
    selectElement.style.backgroundColor = "red";
  } else if (selectElement.value === "Secured") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Not Secured") {
    selectElement.style.backgroundColor = "red";
  } else if (selectElement.value === "Installed") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Not Installed") {
    selectElement.style.backgroundColor = "yellow";
  } else if (selectElement.value === "Connected") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Not Connected") {
    selectElement.style.backgroundColor = "red";
  } else if (selectElement.value === "Aligned") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Not Aligned") {
    selectElement.style.backgroundColor = "red";
  } else if (selectElement.value === "Torquing done") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Torquing Not done") {
    selectElement.style.backgroundColor = "red";
  } else if (selectElement.value === "Positioning done") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Positioning Not done") {
    selectElement.style.backgroundColor = "red";
  } else if (selectElement.value === "Configured") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Not Configured") {
    selectElement.style.backgroundColor = "red";
  } else if (selectElement.value === "NA") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Welding done") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Welding not done") {
    selectElement.style.backgroundColor = "red";
  } else if (selectElement.value === "Matching") {
    selectElement.style.backgroundColor = "Green";
  } else if (selectElement.value === "Not Matching") {
    selectElement.style.backgroundColor = "red";
  } else if (selectElement.value === "Coating done") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Coating Not done") {
    selectElement.style.backgroundColor = "red";
  } else if (selectElement.value === "Earthing done") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Earthing Not done") {
    selectElement.style.backgroundColor = "red";
  } else if (selectElement.value === "Locked") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Not Locked") {
    selectElement.style.backgroundColor = "red";
  }else if (selectElement.value === "Metal clamps implemented") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Metal clamps not implemented") {
    selectElement.style.backgroundColor = "red";
  }else if (selectElement.value === "Cables Connected") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Cables Not Connected") {
    selectElement.style.backgroundColor = "red";
  } else if (selectElement.value === "Not Applicable") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Verified and ok") {
    selectElement.style.backgroundColor = "green";
  } else if (selectElement.value === "Not ok") {
    selectElement.style.backgroundColor = "red";
  } else {
    selectElement.style.backgroundColor = "";
  }
  
}

const deletedImagesMap = {}; // Tracks deleted image URLs for each observationID



/*document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".sidebar .button");

  buttons.forEach(button => {
    button.addEventListener("click", function () {
      // Remove 'active' class from all buttons
      buttons.forEach(btn => btn.classList.remove("active"));

      // Add 'active' class to the clicked button
      this.classList.add("active");
    });
  });
});*/


// 1) define per‑section lists of S_no that require an image
const mandatoryImageRowsBySection = {
  "3_0": ["3.1","3.5","3.7","3.8","3.11"],
  "4_0": ["4.1","4.2"],
  "5_0": ["5.2","5.3","5.4","5.5"],
  "6_0": ["6.2","6.3","6.6","6.8","6.9","6.10"],
  "7_0": ["7.1","7.3"],

};
function validateMandatoryImages(sectionID) {
  const mandatory = mandatoryImageRowsBySection[sectionID] || [];
  const tbody     = document.querySelector(`#observations-tbody-${sectionID}`);
  const missing   = [];

  if (!tbody) return true;

  tbody.querySelectorAll("tr").forEach(tr => {
    const sno = tr.cells[0]?.textContent.trim();
    if (!mandatory.includes(sno)) return;       // not one of the must‑have rows

    const sel = tr.querySelector("select");
    if (!sel || sel.value === "Select") return; // still default → skip

    // **NEW**: look for any <img> in the 5th cell
    const imgCell = tr.cells[4];
    const imgs    = imgCell?.querySelectorAll("img") || [];

    if (imgs.length === 0) {
      missing.push(sno);
    }
  });

  if (missing.length) {
    alert(`🚫 Image required for rows: ${missing.join(", ")}`);
    return false;
  }
  return true;
}




// Function to ensure only one checkbox is selected at a time for a given group
function onlyOneChecked(checkbox, groupClass) {
  // Get all checkboxes in the same group
  const checkboxes = document.querySelectorAll(`.${groupClass}`);

  // Count how many checkboxes in the group are checked
  const checkedCount = Array.from(checkboxes).filter(
    (box) => box.checked
  ).length;

  // If more than one checkbox is checked, uncheck all others
  if (checkedCount > 1) {
    checkboxes.forEach((box) => {
      if (box !== checkbox) {
        box.checked = false; // Uncheck other checkboxes
      }
    });
  }
}





