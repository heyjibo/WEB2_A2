// Wait for the DOM content to load before executing the script
document.addEventListener('DOMContentLoaded', async () => {
  const fundraisersContainer = document.getElementById('fundraiserTable').getElementsByTagName('tbody')[0];

  try {
    const response = await fetch('/api'); // Fetch all fundraisers from the API
    const fundraisers = await response.json();

    // Iterate over the fetched fundraisers and add them to the table
    fundraisers.forEach(fundraiser => {
      const row = fundraisersContainer.insertRow();
      row.insertCell(0).textContent = fundraiser.FUNDRAISE_ID;
      row.insertCell(1).textContent = fundraiser.ORGANIZER;
      row.insertCell(2).textContent = fundraiser.CAPTION;
      row.insertCell(3).textContent = fundraiser.TARGET_FUNDING;
      row.insertCell(4).textContent = fundraiser.CURRENT_FUNDING;
      row.insertCell(5).textContent = fundraiser.CITY;
      row.insertCell(6).textContent = fundraiser.ACTIVE ? 'Active' : 'Inactive';
      row.insertCell(7).textContent = fundraiser.CATEGORY_NAME;
    });
  } catch (error) {
    console.error('Error fetching fundraisers:', error);
  }
});

// Function to navigate to the search page
function searchForm() {
  window.location.href = "search.html";
}