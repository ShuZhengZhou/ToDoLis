var DisplayedIncidentsList: string[] = [];
const mainSection: HTMLElement = document.getElementById("Main")!;
const listSection: HTMLElement = document.getElementById("List")!;

async function fetchData() {
  console.log("FetchData");
  type Data = {
    incidents: {
      name: string;
      type: string;
      context: string;
      CreatedAt: string;
      Deadline: string;
      PIC: string;
      status: string;
      _id: string;
    }[];
  };

  const response = await fetch("/incidents");
  const data: Data = await response.json();

  const IncidentsList = data.incidents;
  console.log(IncidentsList);

  
  // Display the incidents data on the page
  IncidentsList.forEach((incident) => {

    if (DisplayedIncidentsList.includes(incident._id)) {
      return;
    } else {
      DisplayedIncidentsList.push(incident._id);
    }

    const incidentDiv = document.createElement("div");
    incidentDiv.setAttribute("id", `Incident_${incident._id}`);
    incidentDiv.innerHTML = `
        <h3>${incident.name}</h3>
        <p>Type: ${incident.type}</p>
        <p>Context: ${incident.context}</p>
        <p>Created At: ${new Date(incident.CreatedAt).toLocaleString()}</p>
        <p>Deadline: ${new Date(incident.Deadline).toLocaleString()}</p>
        <p>PIC: ${incident.PIC}</p>
        <p id="Status_${incident._id}">Status: ${incident.status}</p>
        <button class="deleteBtn" id="${
          incident._id
        }" onclick="deleteIncident(id)">Delete</button>
        <div class="dropdown">
          <button class="dropbtn" id="${incident._id}">Change Status</button>
          <div class="dropdown-content">
            <button class="updateBtn" id="${
              incident._id
            },New" onclick="updateIncident(id)">New</button>
            <button class="updateBtn" id="${
              incident._id
            },Completed" onclick="updateIncident(id)">Completed</button>
            <button class="updateBtn" id="${
              incident._id
            },In Progress" onclick="updateIncident(id)">In progress</button>
          </div>
        </div>
      `;
    listSection.appendChild(incidentDiv);
  });
}

// Add this function to your fetchData.js file
async function submitForm() {
  const name: String = (<HTMLInputElement>document.getElementById("name"))
    .value!;
  const type: String = (<HTMLInputElement>document.getElementById("type"))
    .value;
  const context: String = (<HTMLInputElement>document.getElementById("context"))
    .value;
  const Deadline: String = (<HTMLInputElement>(
    document.getElementById("deadline")
  )).value;
  const PIC: String = (<HTMLInputElement>document.getElementById("pic")).value;

  if (!name || !type || !Deadline || !PIC) {
    const errorMessage: HTMLElement = document.getElementById("error-message")!;
    errorMessage.textContent = "Please fill out all required fields";
    errorMessage.style.color = "red";
    return;
  }

  const incidentData = {
    name,
    type,
    context,
    Deadline,
    PIC,
  };

  const response = await fetch("/createIncident", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(incidentData),
  });

  if (response.status === 200) {
    alert("Incident created successfully");
  } else {
    alert("Error creating incident");
  }
  fetchData();
}

async function deleteIncident(id: string) {
  const incidentId = id;
  const response = await fetch(`/deleteIncident/${incidentId}`, {
    method: "DELETE",
  });
  if (response.status === 200) {
    alert("Incident deleted successfully");
  } else {
    alert("Error deleting incident");
  }
  
  removeDivElementById("Incident_" + id);

}

async function updateIncident(id: String) {
  const tempArr = id.split(",");
  const incidentId = tempArr[0];
  const tgtStatus = tempArr[1];
  const response = await fetch(`/updateIncident/${incidentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newStatus: tgtStatus }),
  });
  if (response.status === 200) {
    alert("Incident updated successfully");
  } else {
    //alert('Error updating incident');
  }

  const DisplayedStatus: HTMLElement = document.getElementById(`Status_${incidentId}`)!;
  DisplayedStatus.textContent = 'Status: ' + tgtStatus;
}

function refresh() {
  listSection.innerHTML = "";
  DisplayedIncidentsList = [];
  fetchData();
}

function removeDivElementById(id: string): void {
  // Find the div element with the provided id
  const divElement = document.getElementById(id);

  // Check if the element exists
  if (divElement) {
    // Get the parent node of the div element
    const parentElement = divElement.parentNode;

    // Remove the div element from the parent node
    if (parentElement) {
      parentElement.removeChild(divElement);
    }
  }
}

document.addEventListener("DOMContentLoaded", fetchData);
