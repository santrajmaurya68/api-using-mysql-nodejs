const express = require("express");
const con = require("./config");
const app = express();

app.use(express.json());
app.get("/", (req, resp) => {
  con.query("select * from employee", (err, result) => {
    if (err) { resp.send("error in api") }
    else { resp.send(result)
    console.log(result) }
  })
});
app.post("/", (req, resp) => {
    const data = req.body;
    con.query("INSERT INTO employee SET ?", data, (error, results, fields) => {
      if (error) throw error;
      resp.send(results)
    })
  });
  app.put("/:id",(req,resp)=>{
    const data= [req.body.name,req.body.jobtails,req.body.Phonenumber,req.params.email,
        req.body.Adress,req.body.city,req.body.state,req.params.reletionship,req.params.id];
    con.query("UPDATE employee SET name = ?, jobtails = ?, Phonenumber = ? ,email=?,Adress = ?, city = ?, state = ? ,reletionship=?  WHERE id = ?",
    data,(error,results,fields)=>{
      if(error) throw error;
      resp.send(results)
    })
})
app.delete("/:id",(req,resp)=>{
    con.query("DELETE FROM employee WHERE id = "+ req.params.id, (err, results) => {
        if (err) throw error;
        resp.send(results);
      })
})
app.listen("5000")