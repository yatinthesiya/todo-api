const express=require("express");

const app=express();


// ==============================
// MIDDLEWARE
// ==============================
app.use(express.json())

const logger=(req,res,next)=>{
console.log(`${req.method} -> ${req.url}`);
next();
};

// ==============================
// DATA (fake database for now)
// ==============================
let todos = [
  { id: 1, title: 'Learn Node.js', done: false },
  { id: 2, title: 'Build an API',  done: false },
  { id: 3, title: 'Buy groceries',  done: false },
  
];


// ==============================
// ROUTES
// ==============================

// GET all todos

app.get('/todos',(req,res)=>{
  res.status(200).json(todos);
});

// GET single todo by id
app.get('/todos/:id',(req,res)=>{
  const id =Number(req.params.id);
  const todo= todos.find(t=>t.id===id);

  if(!todo){
    return res.status(400).json({message:"Todo not found"});
  }

  res.status(200).json(todo);
});
// POST create a new todo
app.post('/todos',(req,res)=>{
  const { title } =req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newtodo={
    id:todos.length + 1,
    title,
    done:false
  };
  
  todos.push(newTodo);
  res.status(200).json({message:"Tdo-created!",todo:newTodo});
});

// PUT update a todo by id

app.put('/todos/:id',(req,res)=>{
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const { title,done } =req.body;
  if (title !== undefined) todo.title = title;
  if (done  !== undefined) todo.done  = done;
  res.status(200).json({ message: 'Todo updated!', todo });
});

// DELETE a todo by id

app.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos.splice(index, 1);
  res.status(200).json({ message: 'Todo deleted!' });
});

app.listen(3200,()=>{
  console.log("Server running on port 3200 🚀")
});
