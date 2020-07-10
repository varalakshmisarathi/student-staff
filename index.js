const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = 5000;

app.use(bodyparser.json());
let staffDetail = []
let studentDetail = []
app.post("/studentDetail", (req, res) => {
  studentDetail.push(req.body);
  res.json({ message: "studentCreation created successfully!" })
});
app.get("/studentDetail", (req, res) => {
  res.send(studentDetail)
})
app.post("/staffDetail", (req, res) => {
  staffDetail.push(req.body);
  res.json({ message: "staffCreation created successfully!" })
});

app.get("/getstaffdetail", (req, res) => {
  let staff = staffDetail.map((data) => {
    let count = studentDetail.filter((item) => item.staffid === data.id);
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

app.delete("/remove/:id", (req, res) => {
  let filterval = studentDetail.filter((element) => {
    if (element.id == req.params.id) {
      return element;
    }
  })[0];

  studentDetail = filterval;
  res.send(studentDetail);
});
app.listen(process.env.PORT || port, () => {
  console.log(`server is listening ${port}`);
});