// Wait for the DOM content to load before executing the script
document.addEventListener('DOMContentLoaded', async () => {
  const fundraiserDetailsContainer = document.getElementById('fundraiserDetails');
  const queryParams = new URLSearchParams(window.location.search);
  const fundraiserId = queryParams.get('id');

  // If no fundraiser ID is present, display a not found message
  if (!fundraiserId) {
    fundraiserDetailsContainer.innerHTML = '<p>Fundraiser not found.</p>';
    return;
  }

  try {
    // Fetch fundraiser details from the API using the fundraiser ID
    const response = await fetch(`/api/fundraiser/${fundraiserId}`);
    const fundraiser = await response.json();

    // If no fundraiser data is returned, display a not found message
    if (!fundraiser) {
      fundraiserDetailsContainer.innerHTML = '<p>Fundraiser not found.</p>';
    } else {
      // Display the fetched fundraiser details in the container
      fundraiserDetailsContainer.innerHTML = `
        <p>ID: ${fundraiser.FUNDRAISE_ID}</p>
        <p>Organizer: ${fundraiser.ORGANIZER}</p>
        <p>Description: ${fundraiser.CAPTION}</p>
        <p>Target Funding: $${fundraiser.TARGET_FUNDING}</p>
        <p>Current Funding: $${fundraiser.CURRENT_FUNDING}</p>
        <p>City: ${fundraiser.CITY}</p>
        <p>Active: ${fundraiser.ACTIVE ? 'Yes' : 'No'}</p>
      `;
    }
  } catch (error) {
    console.error('Error fetching fundraiser details:', error);
    fundraiserDetailsContainer.innerHTML = '<p>Failed to load fundraiser details.</p>';
  }
});

// Function to show a message that the donate feature is under construction
function donate() {
  alert('This feature is under construction.');
}

// Function to navigate back to the search page
function Back() {
  window.location.href = "search.html";
}