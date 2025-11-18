import { nanoid } from "nanoid";
import URL from "../models/url.js";
async function handlegenerateUrl(req, res) {
  const short_id = nanoid(8);
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ sms: "Url Required" });
  } else {
    URL.create({
      shortId: short_id,
      redirectUrl: body.url,
      visitHistory: [],
    });

    return res.status(200).json({
      sms: `Url created Succesfull with id: ${short_id}`,
    });
  }
}

async function redirectUrls(req, res) {
  const shortId = req.params.short_id;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: [{ time: Date.now() }],
      },
    }
  );
  return res.redirect(entry.redirectUrl);
}

export { handlegenerateUrl, redirectUrls };
