const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());

app.post("/urls", (req, res) => {
  const formData = req.body;
  console.log("Received form data:", formData);
  res.json({
    redirectPath: "/frontend/index.html",
    name: formData.usernameInput,
  });
});

app.use("/downloadInstagramVideo", (req, res, next) => {
  const url = req.body.VideoUrl;

  const data = {
    q: url,
    t: "media",
    lang: "en",
  };
  const headers = {
    ":authority": "v3.saveig.app",
    ":method": "POST",
    ":path": "/api/ajaxSearch",
    ":scheme": "https",
    Accept: "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en-US,en;q=0.9,ta;q=0.8",
    "Content-Length": "102",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Origin: "https://saveig.app",
    Referer: "https://saveig.app/",
    "Sec-Ch-Ua":
      '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
    "Sec-Ch-Ua-Mobile": "?1",
    "Sec-Ch-Ua-Platform": '"Android"',
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
  };
  const like = null;
  fetch("https://v3.saveig.app/api/ajaxSearch", {
    method: "POST",
    headers: headers,
    body: new URLSearchParams(data).toString(),
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((data) => {
      like = data.url;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
  res.status(200).json({ videoUrl: link });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
