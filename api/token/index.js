export default async function handler(req, res) {
  const response = await fetch("https://identity.passkit.com/connect/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: "4ESldObW3QiEzdyFsf9LUa",
      client_secret: "47RCJidZ0P1zOkMnvd6vv3osWVuDcGXtEapcBOpO",
      grant_type: "client_credentials",
      scope: "api"
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return res.status(response.status).json({ error: "Internal server error", details: data });
  }

  return res.status(200).json(data);
}
