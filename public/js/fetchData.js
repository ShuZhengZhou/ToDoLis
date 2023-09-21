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
        <button class="deleteBtn" id="${incident._id}">Delete</button>
        <div class="dropdown">
          <button class="dropbtn" id="${incident._id}">Change Status</button>
          <div class="dropdown-content">
            <button class="updateBtn" id="${incident._id},New" data-tgtStatus="New">New</button>
            <button class="updateBtn" id="${incident._id},Completed" data-tgtStatus="Completed">Completed</button>
            <button class="updateBtn" id="${incident._id},In Progress" data-tgtStatus="In progress">In progress</button>
          </div>
        </div>
      `;
      listSection.appendChild(incidentDiv);
    });
  }


  // Add this function to your fetchData.js file
async function submitForm(event) {
  event.preventDefault();
  const incidentData = {
    name: document.getElementById('name').value,
    type: document.getElementById('type').value,
    context: document.getElementById('context').value,
    Deadline: document.getElementById('deadline').value,
    PIC: document.getElementById('pic').value
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
      //document.getElementById('incidentForm').reset();
      //fetchData();
  } else {
    alert('Error creating incident');
  }
    
  fetchData();
}

listSection.addEventListener('click', async function(event) {
  if (event.target.classList.contains('deleteBtn')) {
    const incidentId = event.target.id;
    const response = await fetch(`/deleteIncident/${incidentId}`, { method: 'DELETE' });
    if (response.status === 200) {
      alert('Incident deleted successfully');
    } else {
      alert('Error deleting incident');
    }
  }
  else if (event.target.classList.contains('updateBtn')) {
    const tempArr = event.target.id.split(",");
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
  }
  refresh();
});


function refresh() {
  listSection.innerHTML = '';
  DisplayedIncidents = [];
  fetchData();
}

document.addEventListener("DOMContentLoaded", fetchData());
document.getElementById('submitBtn').addEventListener('click', submitForm);

