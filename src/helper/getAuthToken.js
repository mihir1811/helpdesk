function getAuthToken() {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      return storedToken;
    } else {
      console.warn('No auth token found in local storage');
      return null; // Or return undefined, based on your needs
    }
  }
export default getAuthToken