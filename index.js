const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const objectID = mongodb.ObjectID;

const dbURL = "mongodb+srv://collegeRecords:vignesh26@cluster0.akbh9.mongodb.net/collegeRecords?retryWrites=true&w=majority";



app.get("/", (req, res) => {
  res.send("<h1>Student and Staff Backend Running..! </h1>");
});

app.post("/StudentCreation", (req, res) => {
  mongoClient.connect(dbURL, (err, client) => {
    client
      .db("studentRecords")
      .collection("studentDetails")
      .insertOne(req.body, (err, data) => {
        if (err) throw err;
        client.close();
        console.log("Student Created successfully, Connection closed");
        res.status(200).json({
          message: "Student Created..!!",
        });
      });
  });
});

app.post("/StaffCreation", (req, res) => {
  mongoClient.connect(dbURL, (err, client) => {
    client
      .db('studentRecords')
      .collection("staffDetails")
      .insertOne(req.body, (err, data) => {
        if (err) throw err
        client.close()
        console.log('User Created successfully, Connection closed')
        res.status(200).json({
          message: 'User Created..!!'
        })
      })
  })
});

app.get("/Students", (req, res) => {
  mongoClient.connect(dbURL, (err, client) => {
    if (err) throw err;
    let db = client.db("studentRecords");
    db.collection("studentDetails")
      .find()
      .toArray()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(404).json({
          message: "No data Found or some error happen",
          error: err,
        });
      });
  });
});

app.get("/GetAllStaff", (req, res) => {
  mongoClient.connect(dbURL, (err, client) => {
    if (err) throw err
    let db = client.db('studentRecords')
    db.collection("staffDetails")
      .find()
      .toArray()
      .then(Data => {
        db.collection("studentDetails")
          .find()
          .toArray()
          .then(data1 => {
            let staff = Data.map((data) => {
              let count = data1.filter((item) => item.staff_id == data.id)
                .length;
              return {
                _id:data._id,
                id: data.id,
                name: data.name,
                email: data.email,
                student_count: count,
              };
            });
            res.status(200).json(staff)
          })
        //res.status(200).json(data)
      })
      .catch(err => {
        res.status(404).json({
          message: 'No data Found or some error happen',
          error: err
        })
      })
  })
});

app.put("/StudentCreation/:id", (req, res) => {
  mongoClient.connect(dbURL, (err, client) => {
    if (err) throw err;
    client
      .db("studentRecords")
      .collection("studentDetails")
      .findOneAndUpdate({ _id: objectID(req.params.id) }, { $set: req.body })
      .then((data) => {
        console.log("Student data update successfully..!!");
        client.close();
        res.status(200).json({
          message: "Student data updated..!!",
        });
      });
  });
});

app.delete("/StudentCreation/:id", (req, res) => {
  mongoClient.connect(dbURL, (err, client) => {
    if (err) throw err;
    client
      .db("studentRecords")
      .collection("studentDetails")
      .deleteOne({ _id: objectID(req.params.id) }, (err, data) => {
        if (err) throw err;
        client.close();
        res.status(200).json({
          message: "Student deleted...!!",
        });
      });
  });
});

app.put("/StaffCreation/:id", (req, res) => {
  mongoClient.connect(dbURL, (err, client) => {
    if (err) throw err;
    client
      .db("studentRecords")
      .collection("staffDetails")
      .findOneAndUpdate({ _id: objectID(req.params.id) }, { $set: req.body })
      .then((data) => {
        console.log("Staff data update successfully..!!");
        client.close();
        res.status(200).json({
          message: "Staff data updated..!!",
        });
      });
  });
});

app.delete("/StaffCreation/:id", (req, res) => {
  mongoClient.connect(dbURL, (err, client) => {
    if (err) throw err;
    client
      .db("studentRecords")
      .collection("staffDetails")
      .deleteOne({ _id: objectID(req.params.id) }, (err, data) => {
        if (err) throw err;
        client.close();
        res.status(200).json({
          message: "Staff deleted...!!",
        });
      });
  });
});

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});