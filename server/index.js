import express from "express";
import cors from "cors";
import pg from "pg";
import bodyParser from "body-parser";
import db_ from "./db.js";

//Constants
const port = 5000;
const app = express();
const db = db_;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ROUTES
db.connect();

// CREATE TODO
app.post("/todos", async (req,res)=>{
    try{
        console.log(req.body);
        const { description } = req.body;
        const newTodo = await db.query("INSERT INTO todo (description) VALUES($1)  RETURNING *",[description]);
        console.log(newTodo.rows[0].todo_id);
        res.send("Done")
    }catch(err){
        console.error(err.message);
    }
})

// GET ALL TODO
app.get('/todos',async(req,res)=>{
    try{
        const allTodos = await db.query("SELECT * FROM todo ORDER BY todo_id ASC ");
        console.log(allTodos.rows);
        res.json(allTodos.rows)
    }catch(err){
        console.log(err);
    }
})

// GET A TODO
app.get("/todos/:id", async (req,res)=>{
    try{
        const { id } = req.params;
        console.log(id);
        
        const todo = await db.query("SELECT * FROM todo WHERE todo_id = $1",[id]);
        res.json(todo.rows[0])
        console.log(todo);
    }catch(err){
        console.error(err.message);
    }
})


// UPDATE A TODO
app.put("/todos/:id",async (req,res)=>{
    try{
        const { id } = req.params;
        const { description } = req.body;
        console.log(req.body);
        const updateTodo =  await db.query("UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",[description,id]);
        res.json(updateTodo.rows[0])
     }catch(err){
        console.error(err.message);
    }
})


// DELETE A TODO
app.delete("/todos/:id",async (req,res)=>{
    try{
        const { id } = req.params;
        const deleteTodo =  await db.query("DELETE from todo WHERE todo_id = $1",[id]);
        res.send("Todo was deleted")
     }catch(err){
        console.error(err.message);
    }
})

// SET APP TO LISTEN ON PORT 3000
app.listen(port,()=>{
    console.log(`Server has started on port ${port}`);
})