// See https://github.com/typicode/json-server#module
const jsonServer = require("json-server");

const app = jsonServer.create();
const auth = require("json-server-auth");

const router = jsonServer.router("tmp/db.json");
app.db = router.db;
const rules = auth.rewriter({
  // Permission rules
  users: 660,
  carts: 660,
});

// You must apply the middlewares in the following order
app.use(rules);

const middlewares = jsonServer.defaults();
app.use("/", middlewares);

app.use(auth);
app.use(router);

app.listen(3000, () => {
  console.log("JSON Server is running");
});

// Export the Server API
module.exports = app;
