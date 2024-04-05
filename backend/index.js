const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("./models/Admin.js");
const Candidate = require("./models/Candidate.js");
const Questions = require("./models/Questions.js");
const cookieParser = require("cookie-parser");
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 4000;

require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use("/tmp", express.static("tmp"));

var whitelist = ["http://localhost:3000", "http://localhost:4100"];
var corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

app.use(cors(corsOptions));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "tmp");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.array("photos", 100), function (req, res, next) {
    try {
        const uploadedFiles = [];
        for (let i = 0; i < req.files.length; i++) {
            const { path, filename } = req.files[i];
            uploadedFiles.push({ url: filename, isUploaded: false });
        }
        res.json(uploadedFiles);
    } catch (err) {
        console.log("error", err);
        res.json("error occurs");
    }
});

app.delete("/api/upload/:fileName", async (req, res) => {
    console.log("here");
    try {
        const fileName = req.params.fileName;
        const filePath = path.join(__dirname, "uploads", fileName);

        const data = await Place.findById(id);
        console.log(filePath);

        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Delete the file
            fs.unlinkSync(filePath);
            res.status(200).json({ message: "File deleted successfully." });
        } else {
            res.status(404).json({ error: "File not found." });
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
});

app.delete("/api/delete/:imagename", async (req, res) => {
    try {
        if (!req.params.imagename) {
            console.log("No file received");
            return res.status(400).json({ message: "Error! Image name not provided." });
        }

        console.log("File received:", req.params.imagename);

        // Delete the file asynchronously
        fs.unlink("cache/" + req.params.imagename, (err) => {
            if (err) {
                console.error("Error deleting file from cache:", err);
            }
        });
        fs.unlink("uploads/" + req.params.imagename, (err) => {
            if (err) {
                console.error("Error deleting file from uploads:", err);
            }
        });

        // Assuming `id` is retrieved from somewhere

        // Assuming you want to retrieve data after deletion
        const data = await Place.find(id);

        console.log("Successfully deleted image:", req.params.imagename);
        return res.status(200).json({ message: "Successfully deleted image.", data });
    } catch (err) {
        console.error("Error deleting image:", err);
        return res.status(500).json({ message: "Error deleting image.", error: err.message });
    }
});
// async function uploadToS3(path, originalFilename, mimetype) {
//     const client = new S3Client({
//         region: "us-east-1",
//         credentials: {
//             accessKeyId: process.env.S3_ACCESS_KEY,
//             secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//         },
//     });
//     const parts = originalFilename.split(".");
//     const ext = parts[parts.length - 1];
//     const newFilename = Date.now() + "." + ext;
//     await client.send(
//         new PutObjectCommand({
//             Bucket: bucket,
//             Body: fs.readFileSync(path),
//             Key: newFilename,
//             ContentType: mimetype,
//             ACL: "public-read",
//         })
//     );
//     return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
// }

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, jwtSecret, {}, async (err, userData) => {
                if (err) {
                    // Sending an error response
                    return res.status(500).json({ error: err.message }); // Sending error message as JSON
                }
                resolve(userData);
            });
        }
    });
}

app.post("/api/register", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { name, email, password } = req.body;

    try {
        const data = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json({ data });
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post("/api/login", async (req, res) => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        const { email, password } = req.body;
        const userDoc = await User.findOne({ email });
        if (userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password);
            if (passOk) {
                jwt.sign(
                    {
                        email: userDoc.email,
                        id: userDoc._id,
                    },
                    jwtSecret,
                    {},
                    (err, token) => {
                        if (err) {
                            // Sending an error response
                            return res.status(500).json({ error: err.message }); // Sending error message as JSON
                        }
                        res.status(200).json({ data: { user: userDoc, token } });
                    }
                );
            } else {
                res.status(422).json("pass not ok");
            }
        } else {
            res.status(404).json({ message: "not found" });
        }
    } catch (e) {
        console.log("error", e);
        return res.status(401).json({ error: errorMessage });
    }
});

app.get("/api/profile", (req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        mongoose.connect(process.env.MONGO_URL);

        const token = authHeader.split(" ")[1];

        if (token) {
            jwt.verify(token, jwtSecret, {}, async (err, userData) => {
                if (err) {
                    // Sending an error response
                    return res.status(500).json({ error: err }); // Sending error message as JSON
                }

                const { name, email, _id } = await User.findById(userData.id);
                const data = { name, email, _id };

                res.status(200).json({ data });
            });
        }
    } else {
        res.json(null);
    }
});

app.post("/api/logout", (req, res) => {
    res.cookie("token", "").json(true);
});

// app.post("/api/upload-by-link", async (req, res) => {
//   const { link } = req.body;
//   const newName = "photo" + Date.now() + ".jpg";
//   await imageDownloader.image({
//     url: link,
//     dest: "/tmp/" + newName,
//   });
//   const url = await uploadToS3(
//     "/tmp/" + newName,
//     newName,
//     mime.lookup("/tmp/" + newName)
//   );
//   res.json(url);
// });

app.get("/api/user-places", (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            const { id } = userData;
            const data = await Place.find({ owner: id });
            res.json({ data });
        });
    } else {
        res.sendStatus(401);
    }
});

app.get("/api/users", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, jwtSecret, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            try {
                const data = await User.find();
                res.status(200).json({ data });
            } catch (error) {
                // Handle any errors that occur during database query or response sending
                console.error(error);
                res.status(500).send("Internal Server Error");
            }
        });
    } else {
        res.sendStatus(401);
    }
});

app.get("/api/places/:id", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { id } = req.params;
    const data = await Place.findById(id);
    res.json({ data });
});

app.post("/api/places", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const { title, address, addedPhotos, description, categories, price, perks, extraInfo, checkIn, checkOut, maxGuests } = req.body;
        const token = authHeader.split(" ")[1];

        if (!checkIn || !checkOut) {
            return res.status(400).json({ message: "Both checkIn and checkOut are required." });
        }

        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Process uploaded photos
            const uploadedPhotos = [];
            for (const photo of addedPhotos) {
                // Move the photo to the uploads folder
                const oldPath = path.join(__dirname, "tmp", photo.url); // Assuming photo is the file path
                const newPath = path.join(__dirname, "uploads", path.basename(photo.url));
                fs.renameSync(oldPath, newPath);
                // Add photo to uploadedPhotos with isUploaded set to true
                uploadedPhotos.push({ url: path.basename(photo.url), isUploaded: true });
            }

            // Create place with uploaded photos
            const data = await Place.create({
                owner: userData.id,
                price,
                title,
                address,
                photos: uploadedPhotos,
                description,
                perks,
                categories,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
            });
            res.json({ data });
        });
    } else {
        res.sendStatus(401);
    }
});

app.put("/api/places", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        const { id, title, address, addedPhotos, description, perks, categories, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;

        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                // Sending an error response
                return res.status(500).json({ error: err.message }); // Sending error message as JSON
            }
            const data = await Place.findById(id);
            if (userData.id === data.owner.toString()) {
                // Update photos and set isUploaded to true for new photos
                const updatedPhotos = data?.photos?.map((photo) => {
                    if (addedPhotos?.includes(photo)) {
                        return { ...photo, isUploaded: true };
                    }
                    return photo;
                });

                // Add new photos to the list
                for (const photo of addedPhotos) {
                    if (!data.photos.some((existingPhoto) => existingPhoto.url === photo.url && photo.isUploaded)) {
                        console.log("photo url", photo.url, photo.isUploaded);

                        const oldPath = path.join(__dirname, "tmp", photo.url);
                        const newPath = path.join(__dirname, "uploads", path.basename(photo.url));
                        fs.renameSync(oldPath, newPath);
                        updatedPhotos.push({ ...photo, isUploaded: true });
                    }
                }

                data.set({
                    title,
                    address,
                    photos: updatedPhotos,
                    description,
                    perks,
                    categories,
                    extraInfo,
                    checkIn,
                    checkOut,
                    maxGuests,
                    price,
                });
                await data.save();
                res.json({ data });
            }
        });
    } else {
        res.sendStatus(401);
    }
});
app.get("/api/places", async function getPlaces(req, res) {
    try {
        mongoose.connect(process.env.MONGO_URL);

        let query = {};

        if (req.query.category && req.query.category !== "null") {
            query.categories = req.query.category;
        }

        if (req.query.title) {
            query.title = { $regex: new RegExp(req.query.title, "i") };
        }

        const places = await Place.find(query);

        res.json(places);
    } catch (error) {
        console.error("Error fetching places:", error);
        res.status(500).json({ error: "Error fetching places" });
    }
});

app.post("/api/bookings", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromReq(req);
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;

    if (!checkIn || !checkOut || !phone) {
        return res.json({ data: { message: "Talbaruudig buren songon uu" } });
    }
    Booking.create({
        place,
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        price,
        user: userData.id,
    })
        .then((data) => {
            res.json({ data });
        })
        .catch((err) => {
            throw err;
        });
});

app.get("/api/bookings", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromReq(req);
    res.json({ data: await Booking.find({ user: userData.id }).populate("place") });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
