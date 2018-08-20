var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    expressSanitizer= require("express-sanitizer"),
    List            = require("./models/list");

app.use(express.static("assets"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/list_app", {useNewUrlParser: true});
app.use(expressSanitizer());

app.get("/", function(req, res){
    res.redirect("/list");
});

app.get("/list", function(req, res){
    List.find({}, function(err, foundList){
        if (err){
            console.log(err);
            res.send("cannot connect to database...");
        } else {
            res.render("index", {list: foundList});
        }
    });
});

app.post("/additem", function(req, res){
    
    // cleans up items so that malicious code is not passed
    req.body.item = req.sanitize(req.body.item);
    
    // adds item to database
    List.create(req.body, function(err, newList){
        if(err){
            console.log(err);
        } else {
            // redirect to index
            res.redirect("/list");
        }
    });
});

app.post("/removeitem", function(req, res){
    List.findByIdAndRemove(req.body.id, function (err, deletedItem){
        if(err){
            console.log("Failed to DELETE item with id: " + req.body.id);
        }
        res.redirect("/list");

    });
});

app.post("/updateitem", function(req, res){

    List.findByIdAndUpdate(req.body.id, {isToggled: req.body.isToggled}, function(err, updatedItem){
        if(err){
            console.log("Failed to UPDATE item with id: " + req.body.id);
        }
        res.redirect("/list");
    });
});

app.get("*", function(req, res){
    res.redirect("/list");
});

//////

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Fire this turkey up!");
});