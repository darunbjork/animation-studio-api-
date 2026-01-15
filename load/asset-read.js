import http from 'k6/http';
import { check, sleep } from 'k6';
import { getAuthToken } from './auth-utils.js';

const BASE_URL = 'http://localhost:4000';
const TEST_USER_EMAIL = 'test@example.com';
const TEST_USER_PASSWORD = 'password'; // Replace with actual test user password if different

export default function () {
  const authToken = getAuthToken(BASE_URL, TEST_USER_EMAIL, TEST_USER_PASSWORD);
  check(authToken, { 'Auth token obtained': (token) => token !== null });

  if (authToken) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    const res = http.get(`${BASE_URL}/assets`, { headers });
    check(res, { 'status was 200': (r) => r.status == 200 });
  }
  sleep(1);
}
