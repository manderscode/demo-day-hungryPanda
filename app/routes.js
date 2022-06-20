module.exports = function (app, passport, db, ObjectId) {
  const cloudinary = require("../config/cloudinary");
  const upload = require("../config/multer"); // this is a module AKA another js file you're using from an external source

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get("/", function (req, res) {
    db.collection("users")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
      });

    res.render("homepage.ejs");
  });

  // LOGOUT ==============================
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get("/login", function (req, res) {
    res.render("login.ejs", { message: req.flash("loginMessage") });
  });

  // process the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );
  // **GROCERY STORES LOCATION RESULTS PAGE**-----------------------------------------
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/groceryStoreResults", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

  // **CMART FEED PAGE***----------------------------------------------------------------
  app.get("/cmartFeed", (req, res) => {
    db.collection("posts")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("cmartFeed.ejs", {
          posts: result,
        });
      });
    // { message: req.flash('loginMessage') })
  });

  // **CMART**----------------------------------------------
  app.post("/cmart", (req, res) => {
    console.log(req.query);
    db.collection("posts").toArray((err, result) => {
      if (err) return console.log(err);
      console.log(result);
      res.render("profile.ejs", {
        posts: result,
      });
    });
    // { message: req.flash('loginMessage') })
  });

  // **USER PROFILE**---------------------------------------------------
  app.get("/profile", isLoggedIn, (req, res) => {
    db.collection("posts")
      .find()
      .toArray((err, result) => {
        // filtering out the posts made by the user and seeing if it's equivalent to their specific user id
        let userPosts = result.filter(
          (posts) => posts.user === req.user._id.toString()
        );
        //the favorites array couldn't be compared to the userId originally b/c they weren't the same type, therefore we had to map it and then it turned it into a string first prior to comparing with the userId as a string
        const favorites = result.filter((post) =>
          post.favorites
            .map((favorite) => favorite.toString())
            .includes(req.user._id.toString())
        );

        if (err) return console.log(err);
        res.render("profile.ejs", {
          user: req.user,
          posts: userPosts,
          favorites: favorites,
        });
      });
    // { message: req.flash('loginMessage') })
  });

  app.post("/makePost", upload.single("file"), async (req, res) => {
    // let user = req.user._id;
    // console.log("this is the user's name", req.body.name)

    let photo;
    try {
      photo = await cloudinary.uploader.upload(req.file.path);
      db.collection("posts").save(
        {
          user: req.body.userID,
          userName: req.body.userName,
          foodDescription: req.body.foodDescription,
          buySnackAgain: req.body.buySnackAgain,
          snackCategory: req.body.snackCategory,
          photo: photo.secure_url,
          cloudinaryId: photo.public_id,
          favorites: [],
        },
        (err, result) => {
          if (err) return console.log(err);
          console.log("You Posted!");
          res.redirect("/cmartFeed");
        }
      );
    } catch (err) {
      console.log(err);
    }
  });

  app.put("/addFavorite/:_id", (req, res) => {
    db.collection("posts").findOneAndUpdate(
      { _id: ObjectId(req.params._id) },
      {
        $push: {
          favorites: req.user._id,
        },
      },
      {
        sort: { _id: -1 },
        upsert: false,
      },
      (err, result) => {
        console.log(err);
        console.log("pushed????");
        if (err) return res.send(err);
        console.log(result);
        res.redirect("/profile");
      }
    );
  });

  app.delete("/deletePost/:_id/:cloudinary", async (req, res) => {
    console.log("here is delete request", req.params._id);
    try {
      // const posts = await db.collection("posts").find({_id: ObjectId(req.params._id)})
      console.log("this is posts");
      await cloudinary.uploader.destroy(req.params.cloudinary);

      await db
        .collection("posts")
        .findOneAndDelete({ _id: ObjectId(req.params._id) }, (err, result) => {
          if (err) return res.send(500, err);
          res.redirect("/profile");
        });
    } catch (err) {
      if (err) return res.send(500, err);
      res.redirect("/profile");
    }
  });

  //**SAVORY FILTER **-----------------------------------------------------
  app.get("/savory", isLoggedIn, (req, res) => {
    db.collection("posts")
      .find()
      .toArray((err, result) => {
        let userPosts = result.filter(
          (posts) => posts.user === req.user._id.toString()
        );
        const savory = result.filter((posts) => posts.savory !== null);
        if (err) return console.log(err);
        res.render("profile.ejs", {
          user: req.user,
          posts: userPosts,
          savory: savory,
        });
      });
    // { message: req.flash('loginMessage') })
  });

  // SIGNUP =================================
  // show the signup form
  app.get("/signup", function (req, res) {
    res.render("signup.ejs", { message: req.flash("signupMessage") });
  });

  // process the signup form
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/cmartFeed", // redirect to the secure profile section
      failureRedirect: "/signup", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get("/unlink/local", isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect("/profile");
    });
  });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/");
}
