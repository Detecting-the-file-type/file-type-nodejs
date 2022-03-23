const express = require("express");
const multer = require("multer");
const fs = require("fs");

// set express and port
const app = express(); // call the express
const PORT = 5000;
app.use(express.json()); // Json data

// For Upload file use diskStorage method
// const path = require("path");
// const storage = multer.diskStorage({
// Destination to store image
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, Date.now() + path.extname(file.originalname));
// file.fieldname is name of the field (image)
// path.extname get the uploaded file extension
//   }
// });

// Get the buffer of the file use memoryStorage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 10000000, // 1000000 Bytes = 1 MB
  // },
  // fileFilter(req, file, cb) {
  //   if (!file.originalname.match(/\.(PNG|png|jpg|jpeg)$/)) {
  //     // upload only png and jpg format
  //     return cb(new Error("Please upload a Image"));
  //   }
  //   cb(undefined, true);
  // },
});

// Multer
// Upload an image
app.post("/image", upload.single("image"), async (req, res) => {
  try {
    if (req.file) {
      // fs.writeFile("file.txt", req.file.buffer.toString("hex"), function (err) {
      //   if (err) throw err;
      //   console.log("Saved!");
      // });
      // fs.readFile("./file.txt", function (err, data) {
      //   if (err) throw err;

      // PNG
      // 89504e470d0a1a0a
      // Jpg
      let data = await req.file.buffer.toString("hex");
      if (data) {
        if (
          data.includes("ffd8ff") ||
          data.includes("47494638") ||
          data.includes("89504e470d0a1a0a") ||
          data.includes("424d")
        ) {
          res.status(200).send("It's an image");
        } else {
          res.status(404).send("It's not an image");
        }
      }
      // });
    } else {
      res.status(404).send("There is no file");
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Upload a video
app.post("/video", upload.single("video"), async (req, res) => {
  try {
    if (req.file) {
      console.log(req.file);
      // fs.writeFile("file.txt", req.file.buffer.toString("hex"), function (err) {
      //   if (err) throw err;
      //   console.log("Saved!");
      // });
      // fs.readFile("./file.txt", function (err, data) {
      //   if (err) throw err;

      // MP4
      // 6674797069736F6D
      // 6674797033677035
      // 667479704d534e56
      // 667479706d703432
      let data = await req.file.buffer.toString("hex");
      if (data) {
        if (
          data.includes("6674797069736F6D") ||
          data.includes("6674797033677035") ||
          data.includes("667479704d534e56") ||
          data.includes("667479706d703432") 

        ) {
          res.status(200).send("video");
        } else {
          res.status(404).send("not video");
        }
      }

      // });
    } else {
      res.status(404).send("There is no file");
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

////////////////////////////////////////////////////
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
