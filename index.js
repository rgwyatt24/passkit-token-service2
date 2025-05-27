import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const response = await fetch("https://identity.passkit.com/connect/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        client_id: process.env.PASSKIT_CLIENT_ID,
        client_secret: process.env.PASSKIT_CLIENT_SECRET,
        grant_type: "client_credentials",
        scope: "api"
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
