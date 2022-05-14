const API_END_POINT = 'https://api.thecatapi.com';

const request = async url => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`HTTP 에러: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const api = {
  getCatImage: async () => request(`${API_END_POINT}/v1/images/search?format=json`),
};

export default api;
