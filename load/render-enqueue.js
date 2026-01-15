import http from 'k6/http';

export default function () {
  http.post(
    'http://localhost:4000/renders',
    JSON.stringify({ assetId: '123', version: 1 }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
