// Adjust BASE_URL to your backend host/port.
// For local Android emulator use http://10.0.2.2:8080
const BASE_URL = process.env.REACT_APP_API_BASE || 'http://localhost:8080/api/v1/products';

async function postAggregate(payload) {
  const url = `${BASE_URL}/aggregate`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text().catch(() => null);
    let message = `HTTP ${res.status}`;
    try {
      const json = JSON.parse(text);
      message = json.message || json.error || JSON.stringify(json);
    } catch {
      if (text) message = text;
    }
    throw new Error(message);
  }
  return res.json();
}

export default { postAggregate };