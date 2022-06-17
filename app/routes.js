module.exports = function (app, passport, db) {
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

  // PROFILE SECTION =========================
  //   app.get("/profile", isLoggedIn, function (req, res) {
  //     db.collection("messages")
  //       .find()
  //       .toArray((err, result) => {
  //         if (err) return console.log(err);
  //         res.render("profile.ejs", {
  //           user: req.user,
  //           messages: result,
  //         });
  //       });
  //   });

  // LOGOUT ==============================
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // message board routes ===============================================================

  app.post("/messages", (req, res) => {
    db.collection("messages").insertOne(
      { name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown: 0 },
      (err, result) => {
        if (err) return console.log(err);
        res.redirect("/profile");
      }
    );
  });

  app.put("/messages", (req, res) => {
    db.collection("messages").findOneAndUpdate(
      { name: req.body.results, msg: req.body.msg },

      (err, result) => {
        if (err) return res.send(err);
        res.send(result);
      }
    );
  });

  app.put("/dislike", (req, res) => {
    db.collection("messages").findOneAndUpdate(
      { name: req.body.name, msg: req.body.msg },
      {
        $set: {
          thumbUp: req.body.thumbUp - 1,
        },
      },
      {
        sort: { _id: -1 },
        upsert: true,
      },
      (err, result) => {
        if (err) return res.send(err);
        res.send(result);
      }
    );
  });

  app.delete("/messages", (req, res) => {
    db.collection("messages").findOneAndDelete(
      { name: req.body.name, msg: req.body.msg },
      (err, result) => {
        if (err) return res.send(500, err);
        res.send("Message deleted!");
      }
    );
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
  // Grocery Store Results Page

  app.get("/groceryStoreResults", (req, res) => {
    const mockData = {
      name: "Grocery Store",
      email: "grocerystore101@gmail.com",
    };

    res.render("groceryStoreResults.ejs", { mockData });
    // { message: req.flash('loginMessage') })
  });

  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/groceryStoreResults", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );
  // CMart

  app.get("/cmart", (req, res) => {
    db.collection("posts")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        console.log(result);
        res.render("cmart.ejs", {
          posts: result,
        });
      });
    // { message: req.flash('loginMessage') })
  });

  // User Profile
  // tells the db to find the user with that specific id
  app.get("/profile", isLoggedIn, (req, res) => {
        db.collection("posts")
          .find()
          .toArray((err, result) => {
			let user = req.user._id;
			console.log("this is the user", user)
			console.log(result)
			// let usersFavorites = result.filter(fave => fave.favorites.includes(user)) 
            if (err) return console.log(err);
            res.render("profile.ejs", {
              posts: result,
            //   favorites: usersFavorites,
            });
          });
    // { message: req.flash('loginMessage') })
  });

  app.post("/makePost", upload.single("file"), async (req, res) => {
    let user = req.user._id;
    let photo;
    try {
      photo = await cloudinary.uploader.upload(req.file.path);
      db.collection("posts").save(
        {
          user: user,
          foodDescription: req.body.foodDescription,
          yesBuySnackAgain: req.body.yesBuySnackAgain,
          noBuySnackAgain: req.body.noBuySnackAgain,
          photo: photo.secure_url,
		  favorites:[]
        },
        (err, result) => {
          if (err) return console.log(err);
          console.log("You Posted!");
          res.redirect("/cmart");
        }
      );
    } catch (err) {
      console.log(err);
    }
  });
  app.put("/addFavorite", (req, res) => {
    // Object Destructuring (pulling values out of an object into their own variables)
    const { postId } = req.body;
    console.log(postId);
    try {
      // 	console.log(req.user.local.email)
      // 	const user = db.collection('users').findOne({email: req.user.local.email})
      // 	console.log(user)
      // 	console.log(user.local)
      // 	console.log(user.favorites)

      // 	db.collection('users').findOneAndUpdate({email: req.user.local.email}, { $push: { favorites:postId }})
      // 	console.log('we made the update')
      // 	res.status(200)

      db.collection("post").findOneAndUpdate(
        { _id: ObjectID(req.body._id)},
        {
          $push: {
            favorites: req.user._id,
          }
        },
        {
          sort: { _id: -1 },
          upsert: false,
        },
        (err, result) => {
          if (err) return res.send(err);
          console.log(result);
          res.send(result);
        }
      );
    } catch (err) {
      console.log(err);
    }

	
	app.post("/makePost", upload.single("file-to-upload"), (req, res) => {
		let user = req.user._id;
		db.collection("posts").save(
		  {
			caption: req.body.caption,
			img: "images/uploads/" + req.file.filename,
			postedBy: user,
		  },
		  (err, result) => {
			if (err) return console.log(err);
			console.log("saved to database");
			res.redirect("/profile");
		  }
		);
	  });
	
	

	
	
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
      successRedirect: "/", // redirect to the secure profile section
      failureRedirect: "/", // redirect back to the signup page if there is an error
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
