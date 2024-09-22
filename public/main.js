// public/main.js

// Example: Fetch properties from the backend
async function fetchProperties() {
    try {
      const response = await fetch('/api/properties');
      const properties = await response.json();
      console.log(properties);
      // You can now use this data to update the DOM
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  }
  
  // Call the function to fetch properties when the page loads
  window.onload = fetchProperties;
  