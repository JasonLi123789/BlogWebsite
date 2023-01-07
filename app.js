const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")

const homeStartingContent = "Everyone Can Share their Story right here!!!";
const aboutContent =  "";
const contactContent = "Name: Jason Li";
                      

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts = [];

app.get("/",function(req, res){
    res.render("home", {
    startingContent: homeStartingContent, 
    posts: posts
  });
});

app.get("/about",function(req, res){
  res.render("about", {AboutContent: aboutContent});
});

app.get("/contact",function(req, res){
  res.render("contact", {ContactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post={
    title:  req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect("/"); //back to the home page
});

app.get("/posts/:postName", function(req, res){
  const requestTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if(storedTitle===requestTitle){
      res.render("post", {
        title: post.title,
        content: post.content
      })
    }
  })
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
