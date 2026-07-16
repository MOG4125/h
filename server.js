const express=require("express");
const fs=require("fs");

const app=express();

app.use(express.json());
app.use(express.static("."));

const FILE="posts.json";

app.get("/posts",(req,res)=>{
    const posts=JSON.parse(fs.readFileSync(FILE));
    res.json(posts);
});

app.post("/post",(req,res)=>{

    const posts=JSON.parse(fs.readFileSync(FILE));

    posts.push(req.body.text);

    fs.writeFileSync(FILE,JSON.stringify(posts,null,2));

    res.sendStatus(200);
});

app.listen(3000,()=>{
    console.log("Running on http://localhost:3000");
});
