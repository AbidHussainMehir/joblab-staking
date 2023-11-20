import axios from "axios";
import Cookies from "universal-cookie";

export default async function handler(req: any, res: any) {
  const cookies = new Cookies(req.headers.cookie);
  const accessToken = cookies.get("accessToken");

  if (!accessToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const response = await axios.get("https://api.joblab.ai/user/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.status(200).json(response.data);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
