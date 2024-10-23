const express =require("express");
const app= express();
const port = 8080;
const path = require("path");
const {v4:uuidv4} = require('uuid');
const methodOverride= require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


app.listen(port, () =>{
    console.log("listening on port 8080");
});

app.get("/posts", (req, res)=> {
    res.render("index.ejs",{posts});
});

let posts =[
    {
        id:uuidv4(),
        username: "Payoshni",
        content:"I got a new internship"
    },
    {
        id:uuidv4(),
        username: "Maithili",
        content:"I love coding"
    },
    {
        id:uuidv4(),
        username: "Piyu",
        content:"I am a developer"
    }
];
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
 
app.post("/posts",(req,res)=>{
    let id= uuidv4();
    let {username, content} = req.body;
    posts.push({username, content, id});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res)=>{
     let{id} = req.params;
     let info = posts.find((p)=> id ===p.id);
     res.render("show.ejs",{info});
    
});
app.get("/posts/:id/edit", (req, res)=> {
    let {id} = req.params;
    let info = posts.find((p)=> id === p.id);
    res.render("edit.ejs" ,{info});   
});

app.delete("/posts/:id",(req, res)=> {
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
});

 app.patch("/posts/:id", (req, res)=> {
    let {id} = req.params;
    let newContent = req.body.content;
     let info = posts.find((p) => id === p.id);
     info.content = newContent;
     console.log(newContent);
    console.log(info);
    // res.send("patch request working");
     res.redirect("/posts");
 });

 