const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
// app.use(cors());

app.use(cors({
  origin: '*'
}));

let multer = require('multer');
const path = require('path');
var liverurlnew = './src/image';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === 'profile_pic') {
        cb(null,liverurlnew+"/profile_pic");
      } 
     
      
    },
    filename: (req, file, cb) => {
      const filename = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
      cb(null, filename);
    },
  });

  const upload = multer({
    storage:storage
})

const record_db = require("./db_functions");

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get('/', function (req, res) {
  res.send('<h1>Welcome to Mapozone World!</h1>');
});

app.get("/:a/:b", (req, res) => {
  record_db
    .getRecordsByName(req.params.a, req.params.b)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/register", upload.single('profile_pic'), (req, res) => {
  // Assuming req.body contains registration data
  const registrationData = req.body;

  // Get the uploaded filename from req.file
  const profilePicFilename = req.file.filename;

  record_db
    .register(registrationData, profilePicFilename) // Pass the filename to the register function
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
// Assuming you have defined the register function and multer setup above

// ... Other imports and configurations

// Your registration route


// ... Your other routes and application logic

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


app.post("/login", (req, res) => {
  record_db
    .login(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
