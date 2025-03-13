const SpotifyWebApi = require("spotify-web-api-node");
const router = require("express").Router();
const demoData = require("./demoData");

router.use((req, res, next) => {
  if (req.headers.cookie) {
    const values = req.headers.cookie.split(";").reduce((res, item) => {
      const data = item.trim().split("=");
      return { ...res, [data[0]]: data[1] };
    }, {});
    req.cookies = values;
  } else req.cookies = {};
  next();
});

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: `${process.env.BASEURL}/callback`,
});

const requiresToken = (req, res, next) => {
  if (req.cookies.access_token) return next();
  return res.redirect("/authorize");
};

const redirectIfAuth = (req, res, next) => {
  if (!req.cookies.access_token) return next();
  return res.redirect("/");
};

router.get("/", async (req, res) => {
  let resData = {
    items: demoData,
    loggedin: req.cookies.access_token !== undefined,
  };
  if (req.cookies.access_token) {
    await spotifyApi.setAccessToken(req.cookies.access_token);
    try {
      const data = await spotifyApi.getMyTopTracks({
        limit: 12
      });
      resData.items = data.body.items.map((obj) => ({
        uri: obj.uri,
        name: obj.name,
        artists: obj.artists.map((a) => a.name).join(", "),
        img_url: obj.album.images[1].url,
        preview_url: obj.preview_url,
      }));
    } catch (err) {
      console.error(err);
      return res.render("index", { error: err });
    }
  }
  return res.render("index", resData);
});

router.get("/authorize", redirectIfAuth, function (req, res) {
  var originBasedSpotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: `https://${req.hostname}/callback`,
});
  res.redirect(
    originBasedSpotifyApi.createAuthorizeURL(
      ["user-top-read", "user-read-recently-played"],
      null,
      false
    )
  );
});

// Exchange Authorization Code for an Access Token
router.get("/callback", redirectIfAuth, function (req, res) {
  var authorizationCode = req.query.code;

  spotifyApi.authorizationCodeGrant(authorizationCode).then(
    (data) => {
      res
        .cookie("access_token", data.body.access_token, {
          httpOnly: true,
          secure: true,
          maxAge: 64000,
        })
        .cookie("refresh_token", data.body.refresh_token, {
          httpOnly: true,
          secure: true,
          maxAge: 64000,
        })
        .redirect("/");
    },
    (err) => {
      console.log(
        "Something went wrong when retrieving the access token!",
        err.message
      );
      res.sendStatus(501);
    }
  );
});

module.exports = router;
