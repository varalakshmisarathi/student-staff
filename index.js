const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyparser.json());
let staffDetail = [
  {
    "id":1,
    "name":"staff1"
},
{
    "id":2,
    "name":"staff2"
}
]
let studentDetail = [
  {
    "id":1,
    "name":"lakshmi",
    "staffid":1
},
{
    "id":2,
    "name":"varalakshmi",
    "staffid":"2"
}
]
app.post("/studentDetail", (req, res) => {
  studentDetail.push(req.body);
  res.json({ message: "studentdetail created successfully!" })
});
app.get("/studentDetail", (req, res) => {
  res.send(studentDetail)
})
app.post("/staffDetail", (req, res) => {
  staffDetail.push(req.body);
  res.json({ message: "staffdetail created successfully!" })
});

app.get("/staffdetail", (req, res) => {
  let staff = staffDetail.map((data) => {
    let count = studentDetail.filter((entry) => entry.staffid === data.id);
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      studentCount: count.length
    }
  })
  res.json(staff)
})

app.put("/studentDetail/:id", (req, res) => {
  console.log(req.params.id);
  studentDetail.forEach((element) => {
    if (element.id == req.params.id) {
      element.name = req.body.name;
      res.status(200).send({ message: "updated" })
    }
  })
})

app.delete("/delete/:id", (req, res) => {
  let filtervalue = studentDetail.filter((element) => {
    if (element.id == req.params.id) {
      return element;
    }
  })[0];

  studentDetail = filtervalue;
  res.send(studentDetail);
});
app.listen(process.env.PORT || port, () => {
  console.log(`server is listening ${port}`);
});