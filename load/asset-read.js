import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const res = http.get('http://localhost:4000/assets');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
