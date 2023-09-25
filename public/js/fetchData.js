var DisplayedIncidents = [];
const mainSection = document.getElementById('Main');
const listSection = document.getElementById('List');

async function fetchData() {
    const response = await fetch('/incidents');
    const data = await response.json();
    const incidents = data.incidents;
  
    // Display the incidents data on the page
    incidents.forEach(incident => {
       if (DisplayedIncidents.includes(incident._id)) {
        return;
       } else {
        DisplayedIncidents.push(incident._id);
       }

      const incidentDiv = document.createElement('div');
      incidentDiv.innerHTML = `
        <h3>${incident.name}</h3>
        <p>Type: ${incident.type}</p>
        <p>Context: ${incident.context}</p>
        <p>Created At: ${new Date(incident.CreatedAt).toLocaleString()}</p>
        <p>Deadline: ${new Date(incident.Deadline).toLocaleString()}</p>
        <p>PIC: ${incident.PIC}</p>
        <p>Status: ${incident.status}</p>
        <button class="deleteBtn" id="${incident._id}" onclick="deleteIncident(id)">Delete</button>
        <div class="dropdown">
          <button class="dropbtn" id="${incident._id}">Change Status</button>
          <div class="dropdown-content">
            <button class="updateBtn" id="${incident._id},New" onclick="updateIncident(id)">New</button>
            <button class="updateBtn" id="${incident._id},Completed" onclick="updateIncident(id)">Completed</button>
            <button class="updateBtn" id="${incident._id},In Progress" onclick="updateIncident(id)">In progress</button>
          </div>
        </div>
      `;
      listSection.appendChild(incidentDiv);
    });
  }


  // Add this function to your fetchData.js file
async function submitForm() {

  const name = document.getElementById('name').value;
  const type = document.getElementById('type').value;
  const context =  document.getElementById('context').value;
  const Deadline =  document.getElementById('deadline').value;
  const PIC =  document.getElementById('pic').value;

  if (!name || !type || !Deadline || !PIC) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = "Please fill out all required fields";
    errorMessage.style.color = 'red';
    return;
  }

  const incidentData = {
    name,
    type,
    context,
    Deadline,
    PIC
  };
  
  const response = await fetch('/createIncident', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(incidentData)
  });
  
  if (response.status === 200) {
    alert('Incident created successfully');
  } else {
    alert('Error creating incident');
  }
  fetchData();
}


async function deleteIncident(id) {
  const incidentId = id;
  const response = await fetch(`/deleteIncident/${incidentId}`, { method: 'DELETE'});
  if (response.status === 200) {
    alert('Incident deleted successfully');
  } else {
    alert('Error deleting incident');
  }
  refresh();
}

async function updateIncident(id) {
  const tempArr = id.split(",");
    const incidentId = tempArr[0];
    const tgtStatus = tempArr[1];
    const response = await fetch(`/updateIncident/${incidentId}`, { 
      method: 'PUT' ,
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({ newStatus: tgtStatus })
    });
    if (response === 200) {
      alert('Incident updated successfully');
    } else {
      //alert('Error updating incident');
    }
  
  refresh();
}

function refresh() {
  listSection.innerHTML = '';
  DisplayedIncidents = [];
  fetchData();
}

document.addEventListener("DOMContentLoaded", fetchData());

