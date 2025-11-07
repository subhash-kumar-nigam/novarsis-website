const db = require("../models/gallery.model");
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Function to generate a unique folder name
const generateFolderName = () => {
  return new Date().toISOString().replace(/[-:TZ.]/g, '');
};

var folderName;
var ControllerNaming = 'Gallery';

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    folderName = generateFolderName();
    const uploadPath = path.join('gallery', folderName);
    fs.mkdirSync(uploadPath, { recursive: true }); // Create folder if it doesn't exist
    cb(null, uploadPath); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname; // Unique file name
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

exports.create = async (req, res) => {
  const id = req.params.id;
  console.log(id)


  try {

    upload.fields([{ name: 'image', maxCount: 1 }])(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send("File upload error");
      }

      const { name } = req.body;

      console.log(req.body)
      const image = req.files['image'] ? req.files['image'][0] : null;
      const contact = await db.create({
        name: name,
        image: image ? folderName + '/' + image.filename : null,
      });

      res.status(201).json(contact);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

exports.findAll = (req, res) => {
  db.findAll({
    order: [['createdAt', 'DESC']]
  })
  .then((data) => res.send(data))
  .catch((error) => {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving galleries."
    });
  });
};


exports.findOne = (req, res) => {
  const id = req.params.id;
  db.findOne({
    where: { id: id }
  })
  .then((data) => res.send(data))
  .catch((error) => {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving gallery."
    });
  });
};


//   Update a Contact US by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    // Update textual information
    const updateResult = await db.update(req.body, {
      where: { id: id }
    });

    // Check if images are provided in the request
    // if (req.files && (req.files['pdf'] || req.files['image'])) {
    //   const product = await db.findByPk(id);

    //   // Delete existing images if needed
    //   if (product) {
    //     if (req.files['pdf']) {
    //       // Handle PDF update or deletion
    //       // Delete existing PDF
    //       if (product.download_link) {
    //         fs.unlinkSync(path.join(__dirname, '..', 'uploads', product.download_link));
    //       }
    //       // Save new PDF
    //       product.download_link = folderName + '/' + req.files['pdf'][0].filename;
    //     }

    //     if (req.files['image']) {
    //       // Handle image update or deletion
    //       // Delete existing image
    //       if (product.image) {
    //         fs.unlinkSync(path.join(__dirname, '..', 'uploads', product.image));
    //       }
    //       // Save new image
    //       product.image = folderName + '/' + req.files['image'][0].filename;
    //     }

    //     await product.save();
    //   }
    // }

    if (updateResult == 1) {
      res.send({
        message: "Product was updated successfully."
      });
    } else {
      res.status(404).send({
        message: `Cannot update product with id=${id}. Maybe product was not found or req.body is empty!`
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error updating product with id=" + id
    });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  db.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `${ControllerNaming} was deleted successfully`
        });
      } else {
        res.send({
          message: `Cannot delete ${ControllerNaming} with id=${id}. Maybe ${ControllerNaming} was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete ${ControllerNamming}  with id=${id}`
      });
    });
};