const Admin = require("../models/admin.model");
// const Op = db.sequelize.Op;
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs')
const jwtConfig = require('../config/jwt')
const jwt = require('../utils/jwt')
const { isEmail } = require('../validations/Validator')
const { EMAIL_VALIDATION_ERROR, USER_ALREADY_EXISTS_ERROR } = require('../constant/Messages')
const { sendEmail } = require('../common/SendEmail');
const { DATE } = require("sequelize");
const { formatCustomDate } = require("../common");

// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body.title) {
//       res.status(400).send({
//         message: "Content can not be empty!"
//       });
//       return;
//     }

//     // Create a Tutorial
//     const tutorial = {
//       title: req.body.title,
//       description: req.body.description,
//       published: req.body.published ? req.body.published : false
//     };

//     // Save Tutorial in the database
//     User.create(tutorial)
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the Tutorial."
//         });
//       });
//   };
// Create a Tutorial
// const tutorial = {
//     title: req.body.title,
//     description: req.body.description,
//     published: req.body.published ? req.body.published : false
// };

// Save Tutorial in the database
//   Tutorial.create(tutorial)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Tutorial."
//       });
//     });
// };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  db.findAll().then((data) => {
    const formattedData = data.map((record) => {
      return {
        ...record.toJSON(), // Convert Sequelize instance to plain object
        createdAt: formatCustomDate(record.createdAt, 'MM-DD-YYYY HH:mm:ss') // Format the createdAt date
      };
    });
    res.send(formattedData)
  }).catch((error) => {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving tutorials."
    });
  })
}


exports.create = async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { name, username, password } = req.body;
    // Validate user input
    if (!(name && username && password)) {
      res.status(400).send("All input is required");
    } else {
      let nameDB = name.trim().toLowerCase();
      let usernameDB = username.trim().toLowerCase();
      let passwordDB = password.trim();
      let encryptedPassword = await bcrypt.hash(passwordDB, 10);

      const user = await db.create({
        name: nameDB,
        username: usernameDB,
        password: encryptedPassword,
      });


      const token = jwt.sign(
        { id: "user._id", username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      res.status(201).json(user);
    }

  } catch (err) {
    console.log(err);
  }

}

exports.login = async (req, res) => {
  try {
    const adminFound = await Admin.findOne({
      where: {
        [Op.or]: [{ username: req?.body?.username }],
      },
    });

    if (!adminFound) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatched = await bcrypt.compare(req.body.password, adminFound.password);
    if (!isMatched) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.createToken({ id: adminFound.id });
    const refreshToken = jwt.createRefreshToken({ id: adminFound.id });

    await Admin.update(
      { refresh_token: refreshToken, lastLogin: new Date().toISOString() },
      { where: { id: adminFound.id } }
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    });

    return res.json({
      uniqueID: adminFound.id,
      name: adminFound.name,
      access_token: token,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      expires_in: jwtConfig.ttl,
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


exports.refreshToken = async (req, res) => {
  console.log('i am calling')
  console.log(req.cookies)
  const { refreshToken } = req.cookies;

  console.log('i am calling')
  console.log(refreshToken)

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh Token not provided' });
  }

  try {
    const decoded = jwt.verifyToken(refreshToken, jwtConfig.secret);

    // Optionally, validate if the refresh token exists in your database
    const adminFound = await db.findOne({
      where: {
        id: decoded.id,
        refresh_token: refreshToken,
      },
    });

    if (!adminFound) {
      return res.status(403).json({ message: 'Invalid Refresh Token' });
    }

    // Generate a new access token
    const newAccessToken = jwt.createToken({ id: adminFound.id });

    // Optionally, generate a new refresh token
    const newRefreshToken = jwt.createRefreshToken({ id: adminFound.id });

    // Update refresh token in the database if a new one is generated
    await db.update(
      { refresh_token: newRefreshToken },
      { where: { id: adminFound.id } }
    );

    // Set the new refresh token in the cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    });

    // Return the new access token
    return res.json({
      access_token: newAccessToken,
      token_type: 'Bearer',
      expires_in: jwtConfig.ttl,
    });
  } catch (error) {
    console.error('Error during token refresh:', error);
    return res.status(403).json({ message: 'Invalid or Expired Refresh Token' });
  }
};


// exports.findAll = (req, res) => {
//   const title = req.query.title;
//   var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

//   User.findAll({ where: condition })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };

// Find a single Tutorial with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Tutorial.findByPk(id)
//     .then(data => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find Tutorial with id=${id}.`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving Tutorial with id=" + id
//       });
//     });
// };

// Update a Tutorial by the id in the request
// exports.update = (req, res) => {
//   const id = req.params.id;

//   Tutorial.update(req.body, {
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Tutorial was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Tutorial with id=" + id
//       });
//     });
// };

// Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Tutorial.destroy({
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Tutorial was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Tutorial with id=" + id
//       });
//     });
// };

// Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   Tutorial.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Tutorials were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     });
// };

// find all published Tutorial
// exports.findAllPublished = (req, res) => {
//   Tutorial.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };
