import http from 'k6/http';

export function getAuthToken(baseUrl, email, password) {
  const loginRes = http.post(
    `${baseUrl}/auth/login`,
    JSON.stringify({ email, password }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (loginRes.status === 200 && loginRes.json() && loginRes.json().token) {
    return loginRes.json().token;
  }

  console.error(
    `Failed to get auth token. Status: ${loginRes.status}, Body: ${loginRes.body}`
  );
  return null;
}
