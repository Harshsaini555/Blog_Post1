const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const methodoverride = require('method-override');

const { v4: uuidv4 } = require('uuid');

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodoverride("_method"));

let data = [
    {
        id: uuidv4(),
        title:"Mastering React: Tips for Beginners",
        content:"React is a powerful JavaScript library for building user interfaces. If you're just starting, focus on understanding components, state management, and hooks to create dynamic web applications efficiently."
    },
    {
        id: uuidv4(),
        title:"The Importance of Cybersecurity in 2025",
        content:"As cyber threats evolve, protecting personal and business data is more crucial than ever. Implementing strong passwords, multi-factor authentication, and regular security updates can help safeguard digital assets"
    },
    {
        id: uuidv4(),
        title:"The Future of AI", 
        content:"Artificial Intelligence is revolutionizing industries, from healthcare to finance. With advancements in machine learning and automation, AI is shaping the way we live, work, and interact daily."
    },
];



app.get("/", (req, res)=>{
    res.render("home.ejs", {data});
})

app.get("/new", (req,res) => {
    res.render("new.ejs");
})

app.post("/", (req, res) => {
    const {title, content} = req.body;
    data.push({id: uuidv4(), title, content});
    res.redirect("/");
})

app.patch("/:id", (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = data.find((post) => post.id === id);
    post.title = title;
    post.content = content;
    res.redirect("/");
})

app.get("/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = data.find((post) => post.id === id);
    res.render("edit.ejs", { post });
})

app.delete("/:id", (req,res) => {
    const {id} = req.params;
    data = data.filter((post) => post.id !== id);
    res.redirect("/");
})