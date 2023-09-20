var DisplayedIncidents = [];

async function fetchData() {
    const response = await fetch('/incidents');
    const data = await response.json();
    const incidents = data.incidents;
  
    // Display the incidents data on the page
    const mainSection = document.getElementById('Main');
    incidents.forEach(incident => {
       if (DisplayedIncidents.includes(incident.name)) {
        return;
       } else {
        DisplayedIncidents.push(incident.name);
       } 

      const incidentDiv = document.createElement('div');
      incidentDiv.innerHTML = `
        <h3>${incident.name}</h3>
        <p>Type: ${incident.type}</p>
        <p>Context: ${incident.context}</p>
        <p>Created At: ${new Date(incident.CreatedAt).toLocaleString()}</p>
        <p>Deadline: ${new Date(incident.Deadline).toLocaleString()}</p>
        <p>PIC: ${incident.PIC}</p>
      `;
      
      mainSection.appendChild(incidentDiv);
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
      document.getElementById('incidentForm').reset();
      fetchData();
    } else {
      alert('Error creating incident');
    }
    refresh();
  }

  
  document.addEventListener("DOMContentLoaded", fetchData());
  document.getElementById('incidentForm').addEventListener('submit', submitForm);
  
