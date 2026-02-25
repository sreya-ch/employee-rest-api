const express=require('express');
const app=express();
app.use(express.json());
const employees = [
  { id: 1, name: "john", role: "Developer" }
];

app.get('/employees',(req,res)=>{
    res.status(200).send(employees);
})

app.get('/employees/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const employee = employees.find(emp => emp.id === id);
    if(!employee){
        return res.status(404).send("Employee not found");
    }
    res.send(employee);
})

app.post('/employees',(req,res)=>{

    const newEmployee = {
        id: employees.length + 1,
        ...req.body
    };

    employees.push(newEmployee);

    res.status(201).send(newEmployee);
})
app.put('/employees/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const index = employees.findIndex(emp => emp.id === id);

    if(index === -1){
        return res.status(404).json({ message: "Employee not found" });
    }

   
    if(!req.body.name || !req.body.role){
        return res.status(400).json({ message: "Both name and role are required" });
    }

    employees[index] = {
        ...employees[index],
        name: req.body.name,
        role: req.body.role
    };

    res.status(200).json(employees[index]);
});
app.delete('/employees/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const index = employees.findIndex(emp => emp.id === id);

    if (index === -1) {
        return res.status(404).send("Employee not found");
    }

    employees.splice(index, 1);

    res.send(employees);
});
app.listen(3000,()=>{
    console.log("server created at port 3000");
})

