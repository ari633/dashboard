const BASE_URL = "https://5fcc400351f70e00161f23fb.mockapi.io";

export function getAllCompanies() {
  return fetch(`${BASE_URL}/api/v1/companies`).then((res) => res.json());
}

export function getCompany(id) {
  return fetch(`${BASE_URL}/api/v1/companies/${id}`).then((res) => res.json());
}

export function updateCompany(id, payload) {
  return fetch(`${BASE_URL}/api/v1/companies/${id}`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload), 
  }).then(response => response.json());
}