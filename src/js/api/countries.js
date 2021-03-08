const api = url => {
  return fetch(url).then(response => response.json()).catch(error => {
    // error handling
  });
};

export default api;
