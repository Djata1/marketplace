let express = require("express");
let compression = require("compression");
let multer = require("multer");
let mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;
let ObjectId = mongodb.ObjectID;
let sha1 = require("sha1");
let upload = multer({
  dest: __dirname + "/public/images"
});

let app = express();
app.use(compression());
let cookieParser = require("cookie-parser");
app.use(cookieParser());
let reloadMagic = require("./reload-magic.js");
reloadMagic(app);
let sessions = {};
let dbo = undefined;
// let loadCart = undefined;
const secrets = require("./secrets.json");
const stripe = require("stripe")(secrets.stripe);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets

// Your endpoints go after this line
let url =
  "mongodb+srv://djata:djata@cluster0-tirpt.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    dbo = client.db("personal-fullstack-dev");
  })
  .catch(err => console.log(err));
//session
app.get("/session", async (req, res) => {
  let sessionID = req.cookies.sid;
  let username = sessions[sessionID];

  if (username) {
    try {
      let user = await dbo.collection("users").findOne({ username: username });
      console.log("user", user);
      return res.send(
        JSON.stringify({ success: true, username, cart: user.cart })
      );
    } catch (err) {
      console.log("error", err);
      res.send(JSON.stringify({ success: false }));
    }
  }
  res.send(JSON.stringify({ success: false }));
});
//get item
app.get("/foundItem", upload.none(), async (req, res) => {
  let itemId = req.query.id;
  try {
    let item = await dbo.collection("items").findOne({ _id: ObjectId(itemId) });
    if (!item) {
      console.log("not found item");
      res.send(JSON.stringify({ success: false }));
    } else {
      res.send(JSON.stringify({ success: true, item: item }));
    }
  } catch (err) {
    console.log("error", err);
  }
});

//get Items
app.get("/items", async (req, res) => {
  try {
    let items = await dbo
      .collection("items")
      .find({})
      .toArray();
    if (!items) {
      console.log("not found items");
      res.send(JSON.stringify({ success: false }));
    }
    console.log("all the items:", items);
    res.send(JSON.stringify({ success: true, items }));
  } catch (err) {
    console.log("error", err);
    res.send(JSON.stringify({ success: false }));
  }
});
//get Farms
app.get("/farms", async (req, res) => {
  try {
    let farms = await dbo
      .collection("farms")
      .find({})
      .toArray();
    if (!farms) {
      console.log("not found farms");
      res.send(JSON.stringify({ success: false }));
    }
    console.log("all the farms:", farms);
    res.send(JSON.stringify({ success: true, farms }));
  } catch (err) {
    console.log("error", err);
    res.send(JSON.stringify({ success: false }));
  }
});
//get cart

let loadCart = async (req, res) => {
  console.log("i'm in the load cart function");
  let sessionId = req.cookies.sid;
  let username = sessions[sessionId];
  try {
    let user = await dbo.collection("users").findOne({ username: username });

    console.log("user", user);
    let items = await dbo
      .collection("items")
      .find({
        _id: {
          $in: user.cart.map(Object => {
            return ObjectId(Object.itemId);
          })
        }
      })
      .toArray();
    const itemsQty = items.map(item => {
      return {
        ...item,
        qty: user.cart.find(objectCart => {
          return objectCart.itemId.toString() === item._id.toString();
        }).qty
      };
    });
    console.log("qty:", itemsQty);
    console.log("items", items);
    console.log("load cart success");
    res.send(JSON.stringify({ success: true, cart: itemsQty }));
  } catch (err) {
    console.log("error", err);
    res.send(JSON.stringify({ success: false }));
  }
};

app.get("/cart/load", loadCart);
//payement
app.post("/payment", upload.none(), async (req, res) => {
  try {
    const { amount, source, receipt_email } = req.body;

    const charge = await stripe.charges.create({
      amount,
      currency: "usd",
      source,
      receipt_email
    });

    if (!charge) throw new Error("charge unsuccessful");

    res.send(
      JSON.stringify({
        message: "charge posted successfully",
        charge
      })
    );
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

//cart incrementQty
app.post("/cart/incrementQty", upload.none(), async (req, res) => {
  console.log("i'm in the incrementQty cart function");
  let id = req.body.itemId;
  console.log("id", id);
  let sessionId = req.cookies.sid;
  console.log("sessionId", sessionId);
  let username = sessions[sessionId];
  console.log("username", username);

  try {
    let result = await dbo.collection("users").updateOne(
      {
        username: username,
        cart: { $elemMatch: { itemId: ObjectId(id) } }
      },
      { $inc: { "cart.$.qty": +1 } }
    );

    res.send(JSON.stringify({ success: true }));
  } catch (err) {
    console.log("error", err);
    res.send(JSON.stringify({ success: false }));
  }
});
// cart decrementQty
app.post("/cart/decrementQty", upload.none(), async (req, res) => {
  console.log("i'm in the incrementQty cart function");
  let id = req.body.itemId;
  console.log("id", id);
  let sessionId = req.cookies.sid;
  console.log("sessionId", sessionId);
  let username = sessions[sessionId];
  console.log("username", username);

  try {
    let result = await dbo.collection("users").updateOne(
      {
        username: username,
        cart: { $elemMatch: { itemId: ObjectId(id) } }
      },
      { $inc: { "cart.$.qty": -1 } }
    );

    res.send(JSON.stringify({ success: true }));
  } catch (err) {
    console.log("error", err);
    res.send(JSON.stringify({ success: false }));
  }
});
// delete cart
app.post("/cart/delete", upload.none(), async (req, res) => {
  console.log("i'm in the delete cart function");
  let id = req.body.itemId;
  console.log("id", id);
  let sessionId = req.cookies.sid;
  console.log("sessionId", sessionId);
  let username = sessions[sessionId];
  console.log("username", username);

  try {
    // let result = await dbo.collection("users").updateOne(
    //   {
    //     username: username,
    //     cart: { $elemMatch: { itemId: ObjectId(id), qty: { $gte: 1 } } }
    //   },
    //   { $inc: { "cart.$.qty": -1 } }
    // );
    // if (result.modifiedCount === 0) {
    await dbo
      .collection("users")
      .updateOne(
        { username: username },
        { $pull: { cart: { itemId: ObjectId(id) } } }
      );
    // }

    res.send(JSON.stringify({ success: true }));
  } catch (err) {
    console.log("error", err);
    res.send(JSON.stringify({ success: false }));
  }
});
//signup
app.post("/signup", upload.none(), async (req, res) => {
  console.log("i'm in the signup form");
  let name = req.body.username;
  let pwd = req.body.password;
  let type = req.body.type;

  try {
    let user = await dbo.collection("users").findOne({ username: name });

    if (user) {
      console.log("alraidy existe");
      res.send(JSON.stringify({ success: false, message: "user takend" }));
      return;
    }

    await dbo.collection("users").insertOne({
      username: name,
      password: sha1(pwd),
      type: type,
      cart: []
    });
    console.log("insert success");
    let sessionId = generateSessionId();
    sessions[sessionId] = name;
    res.cookie("sid", sessionId);
    res.send(JSON.stringify({ success: true, username: name, cart: [] }));
  } catch (err) {
    console.log("error", err);
    res.send(JSON.stringify({ success: false, message: "error" }));
    return;
  }
});
let generateSessionId = () => Math.floor(Math.random() * 100000000);
//login
app.post("/login", upload.none(), async (req, res) => {
  console.log("i'm in the login form");
  let name = req.body.username;
  let pwd = req.body.password;
  console.log(req.body);
  try {
    let user = await dbo.collection("users").findOne({ username: name });
    if (!user) {
      console.log("user not found");
      res.send(JSON.stringify({ success: false }));
      return;
    }

    let sessionId = generateSessionId();
    sessions[sessionId] = name;
    res.cookie("sid", sessionId);
    console.log("session ID", sessionId);
    res.send(
      JSON.stringify({ success: true, username: name, cart: user.cart })
    );
  } catch (err) {
    console.log("error", err);
    res.send(JSON.stringify({ success: false }));
  }
});

//add item
app.post("/item/add", upload.array("image"), async (req, res) => {
  console.log("i'm in the add item function");
  let nameCategory = req.body.name;
  let type = req.body.type;
  let price = req.body.price;
  let description = req.body.description;
  let location = req.body.location;
  let files = req.files;
  let categories = [];
  console.log("object:", req.body);
  categories.push(nameCategory, type);
  const filepaths = files.map(file => "/images/" + file.filename);
  try {
    await dbo.collection("items").insertOne({
      price: price,
      description: description,
      location: location,
      images: filepaths,
      reviews: [],
      categories
    });

    console.log("insertion reussi");
    res.send(JSON.stringify({ success: true }));
  } catch (err) {
    console.log("error:", err);
    res.send(JSON.stringify({ success: false }));
  }
});
// add category
app.post("/category/add", upload.none(), async (req, res) => {
  let itemId = req.body.itemId;
  let nameCategory = req.body.name;
  let type = req.body.type;

  try {
    let item = await dbo.collection("items").findOne({ _id: ObjectId(itemId) });
    await dbo.collection("items").updateOne(
      { _id: ObjectId(itemId) },
      {
        $push: {
          categories: { name: nameCategory, type: type }
        }
      }
    );
    res.send(JSON.stringify({ success: true }));
  } catch (err) {
    console.log("error:", err);
  }
});
//add farm
app.post("/farm/add", upload.single("image"), async (req, res) => {
  console.log("i'm in the add Farm function");
  let sessionId = req.cookies.sid;
  console.log("sessionID", sessionId);

  let name = sessions[sessionId];
  console.log("Nom", name);
  let size = req.body.size;
  let description = req.body.description;
  let location = req.body.location;
  let file = req.file;
  console.log("object:", req.body);
  let user = await dbo.collection("users").findOne({ username: name });
  console.log("user", user);
  try {
    await dbo.collection("farms").insertOne({
      size: size,
      description: description,
      location: location,
      image: "/images/" + file.filename,
      userId: ObjectId(user.userId)
    });
    console.log("insertion reussi");
    res.send(JSON.stringify({ success: true }));
  } catch (err) {
    console.log("error:", err);
    res.send(JSON.stringify({ success: false }));
  }
});

//cart add
app.post("/cart/add", upload.none(), async (req, res) => {
  let sessionID = req.cookies.sid;
  let username = sessions[sessionID];
  let id = req.body.itemId;

  try {
    let result = await dbo
      .collection("users")
      .updateOne(
        { username: username, cart: { $elemMatch: { itemId: ObjectId(id) } } },
        { $inc: { "cart.$.qty": 1 } }
      );
    if (result.modifiedCount === 0)
      await dbo
        .collection("users")
        .updateOne(
          { username: username },
          { $push: { cart: { itemId: ObjectId(id), qty: 1 } } }
        );
    res.send(JSON.stringify({ success: true }));
  } catch (err) {
    console.log("error:", err);
  }
});
//review add
app.post("/review/add", upload.none(), async (req, res) => {
  let itemId = req.body.itemId;
  let rating = req.body.rating;
  let description = req.body.description;

  try {
    let item = await dbo.collection("items").findOne({ _id: ObjectId(itemId) });
    await dbo
      .collection("items")
      .updateOne(
        { _id: ObjectId(itemId) },
        { $push: { reviews: { rating: rating, description: description } } }
      );
    res.send(JSON.stringify({ success: true }));
  } catch (err) {
    console.log("error:", err);
  }
});
//logout
app.post("/logout", upload.none(), (req, res) => {
  console.log("i'm in the logout function");
  let sessionId = req.cookies.sid;
  delete sessions[sessionId];
  res.send(JSON.stringify({ success: true }));
});

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
