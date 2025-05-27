export default async function handler(req, res) {
  try {
    const clientId = process.env.PASSKIT_CLIENT_ID;
    const clientSecret = process.env.PASSKIT_CLIENT_SECRET;

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const response = await fetch("https://login.passkit.io/token", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials"
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to get token");
    }

    res.status(200).json({ accessToken: data.access_token });
  } catch (err) {
    res.status(500).json({ error: "Token fetch failed", details: err.message });
  }
}
