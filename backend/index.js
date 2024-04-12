const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("./models/Admin.js");
const Candidate = require("./models/Candidate.js");
const Interview = require("./models/Interview.js");
const HrOfficer = require("./models/HrOfficer.js");
const Result = require("./models/Result.js");
const Education = require("./models/Education.js");
const ForeignLanguage = require("./models/ForeignLanguage.js");
const WorkExperience = require("./models/WorkExperience.js");
const Course = require("./models/Course.js");
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
app.post("/api/admin/login", async (req, res) => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        const { userName, password } = req.body;
        const adminDoc = await Admin.findOne({ userName }); // Corrected variable name to adminDoc
        if (adminDoc) {
            const passOk = bcrypt.compareSync(password, adminDoc.password); // Compare password using bcrypt
            if (passOk) {
                jwt.sign(
                    {
                        userName: adminDoc.userName, // Corrected to adminDoc.userName
                        id: adminDoc._id,
                    },
                    jwtSecret,
                    {},
                    (err, token) => {
                        if (err) {
                            return res.status(500).json({ error: err.message });
                        }
                        res.status(200).json({ data: { admin: adminDoc, token } }); // Corrected to adminDoc
                    }
                );
            } else {
                res.status(422).json("Password incorrect"); // Corrected response message
            }
        } else {
            res.status(404).json({ message: "Admin not found" }); // Corrected response message
        }
    } catch (e) {
        console.error("Error:", e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/api/admin/register", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { userName, password } = req.body;

    try {
        const data = await Admin.create({
            userName,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json({ data });
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post("/api/register", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { userName, email, password } = req.body;

    try {
        const data = await HrOfficer.create({
            userName,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json({ data });
    } catch (e) {
        res.status(422).json(e);
    }
});

app.get("/api/admins", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, jwtSecret, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            try {
                let query = {}; // Initialize an empty query object
                if (req.query.searchWord) {
                    // If userName is provided in query params, add it to the query object
                    query.userName = req.query.searchWord;
                }

                const data = await Admin.find(query); // Use the query object to filter the results
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

app.post("/api/login", async (req, res) => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        const { userName, password } = req.body;
        const userDoc = await HrOfficer.findOne({ userName });
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

                const { name, email, _id } = await Admin.findById(userData.id);
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

app.get("/api/hr", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, jwtSecret, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            try {
                let query = {}; // Initialize an empty query object
                if (req.query.searchWord) {
                    // If userName is provided in query params, add it to the query object
                    query.userName = req.query.searchWord;
                }

                const data = await HrOfficer.find(query); // Use the query object to filter the results
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

app.delete("/api/admins/:id", async (req, res) => {
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json({ message: "Admin deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/interview", upload.none(), async (req, res) => {
    console.log("here");
    mongoose.connect(process.env.MONGO_URL);
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, jwtSecret, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            try {
                // Assuming req.body contains the necessary data for creating a new HR entry
                const { candidateId, hrOfficerId, talkingSkill, appearance, advantage, disadvantage, skills } = req.body;

                // Create a new HR officer instance
                const newInterview = new Interview({
                    hr: hrOfficerId,
                    candidateId: candidateId,
                    date: new Date(),
                });

                await newInterview.save();

                const rate = (parseInt(talkingSkill) + parseInt(appearance) + parseInt(advantage) + parseInt(disadvantage) + parseInt(skills)) / 5;

                const result = new Result({
                    interViewQuestionId: newInterview._id,
                    talkingSkill: talkingSkill,
                    appearance: appearance,
                    advantage: advantage,
                    disadvantage: disadvantage,
                    skills: skills,
                    rate: rate,
                });

                await result.save();

                newInterview.resultId.push(result._id);
                await newInterview.save();

                res.status(201).json({ message: "HR officer created successfully" });
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

app.delete("/api/interview/:id", async (req, res) => {
    try {
        const deletedAdmin = await Interview.findByIdAndDelete(req.params.id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Interview not found" });
        }
        res.json({ message: "Interview deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/interview/:id", async (req, res) => {
    try {
        const interview = await Interview.findById(req.params.id).populate("candidateId").populate("hr").populate("resultId");
        if (!interview) {
            return res.status(404).json({ message: "interview not found" });
        }
        res.json({ data: interview });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update interview endpoint
app.put("/api/interview/:id", upload.none(), async (req, res) => {
    try {
        const interviewId = req.params.id;
        const { talkingSkill, appearance, advantage, disadvantage, skills } = req.body;

        // Find the interview by ID
        const interview = await Interview.findById(interviewId);

        if (!interview) {
            return res.status(404).json({ message: "Interview not found" });
        }

        // Update interview data
        interview.talkingSkill = talkingSkill;
        interview.appearance = appearance;
        interview.advantage = advantage;
        interview.disadvantage = disadvantage;
        interview.skills = skills;

        // Recalculate rate
        const rate = (talkingSkill + appearance + advantage + disadvantage + skills) / 5;

        // Update result associated with the interview
        const result = await Result.findOne({ interViewQuestionId: interviewId });

        if (!result) {
            return res.status(404).json({ message: "Result not found" });
        }

        result.talkingSkill = talkingSkill;
        result.appearance = appearance;
        result.advantage = advantage;
        result.disadvantage = disadvantage;
        result.skills = skills;
        result.rate = rate;

        // Save changes
        await interview.save();
        await result.save();

        res.json({ message: "Interview updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/api/admins", upload.none(), async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, jwtSecret, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            try {
                // Assuming req.body contains the necessary data for creating a new HR entry
                const { userName, password } = req.body;

                const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

                // Create a new HR officer instance
                const newHrOfficer = new Admin({
                    userName,
                    password: hashedPassword,
                });

                await newHrOfficer.save();

                res.status(201).json({ message: "HR officer created successfully" });
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

app.put("/api/admins/:id", upload.none(), async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, jwtSecret, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            try {
                // Assuming req.body contains the updated data for the HR officer
                const { userName, password } = req.body;
                const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

                // Find the HR officer by ID
                const hrOfficer = await Admin.findById(req.params.id);

                if (!hrOfficer) {
                    return res.status(404).json({ message: "HR officer not found" });
                }

                // Update HR officer's information
                hrOfficer.userName = userName;
                hrOfficer.password = hashedPassword;

                // Save the updated HR officer
                await hrOfficer.save();

                res.status(200).json({ message: "HR officer updated successfully" });
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

app.post("/api/hr", upload.none(), async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, jwtSecret, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            try {
                // Assuming req.body contains the necessary data for creating a new HR entry
                const { userName, password } = req.body;

                const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

                // Create a new HR officer instance
                const newHrOfficer = new HrOfficer({
                    userName,
                    password: hashedPassword,
                });

                await newHrOfficer.save();

                res.status(201).json({ message: "HR officer created successfully" });
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

// Update HR officer endpoint
app.put("/api/hr/:id", upload.none(), async (req, res) => {
    try {
        const hrOfficerId = req.params.id;
        const { userName, password } = req.body;

        // Find the HR officer by ID
        const hrOfficer = await HrOfficer.findById(hrOfficerId);

        if (!hrOfficer) {
            return res.status(404).json({ message: "HR officer not found" });
        }

        // Update HR officer data
        hrOfficer.userName = userName;

        if (password) {
            const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
            hrOfficer.password = hashedPassword;
        }

        // Save changes
        await hrOfficer.save();

        res.json({ message: "HR officer updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.delete("/api/hr/:id", async (req, res) => {
    try {
        const deletedHr = await HrOfficer.findByIdAndDelete(req.params.id);
        if (!deletedHr) {
            return res.status(404).json({ message: "Hr not found" });
        }
        res.json({ message: "Hr deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/hr/:id", async (req, res) => {
    try {
        const hr = await HrOfficer.findById(req.params.id);
        if (!hr) {
            return res.status(404).json({ message: "Hr not found" });
        }
        res.json({ data: hr });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/admins/:id", async (req, res) => {
    try {
        const hr = await Admin.findById(req.params.id);
        if (!hr) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json({ data: hr });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/candidate", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, jwtSecret, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            try {
                // Assuming req.body contains the necessary data for creating a new HR entry
                // Create a new HR officer instance
                const newCandidate = new Candidate({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                });

                await newCandidate.save();

                const newEducation = new Education({
                    country: req.body.country,
                    school: req.body.school,
                    educationDegrees: req.body.educationDegrees,
                    startDate: req.body.educationStartDate,
                    endDate: req.body.educationEndDate,
                    job: req.body.job,
                    gpa: req.body.gpa,
                });

                await newEducation.save();

                newCandidate.education.push(newEducation._id);

                const newCourse = new Course({
                    courseName: req.body.courseName,
                    startDate: req.body.courseStartDate,
                    endDate: req.body.courseEndDate,
                    acquiredSkill: req.body.acquiredSkill,
                    companyName: req.body.companyName,
                });

                await newCourse.save();

                newCandidate.courses.push(newCourse._id);

                const newForeignLangauge = new ForeignLanguage({
                    languageName: req.body.languageName,
                    reading: req.body.reading,
                    listening: req.body.listening,
                    writing: req.body.writing,
                    speaking: req.body.speaking,
                });

                await newForeignLangauge.save();

                newCandidate.foreignLanguages.push(newForeignLangauge._id);

                const newWorkExperience = new WorkExperience({
                    company: req.body.company,
                    role: req.body.role,
                    startDate: req.body.workStartDate,
                    endDate: req.body.workEndDate,
                    quitJobReason: req.body.quitJobReason,
                });

                await newWorkExperience.save();

                newCandidate.workExperiences.push(newWorkExperience._id);

                await newCandidate.save();

                res.status(201).json({ message: "Candidate created successfully" });
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

// Update candidate endpoint
app.put("/api/candidate/:id", async (req, res) => {
    try {
        const candidateId = req.params.id;

        // Find the candidate by ID
        const candidate = await Candidate.findById(candidateId);

        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        // Update candidate data
        candidate.firstName = req.body.firstName || candidate.firstName;
        candidate.lastName = req.body.lastName || candidate.lastName;
        candidate.email = req.body.email || candidate.email;
        candidate.phoneNumber = req.body.phoneNumber || candidate.phoneNumber;

        // Update candidate's education
        const education = await Education.findOneAndUpdate(
            { _id: { $in: candidate.education } },
            {
                country: req.body.country || education.country,
                school: req.body.school || education.school,
                educationDegrees: req.body.educationDegrees || education.educationDegrees,
                startDate: req.body.educationStartDate || education.startDate,
                endDate: req.body.educationEndDate || education.endDate,
                job: req.body.job || education.job,
                gpa: req.body.gpa || education.gpa,
            },
            { new: true }
        );

        // Update candidate's courses
        const course = await Course.findOneAndUpdate(
            { _id: { $in: candidate.courses } },
            {
                courseName: req.body.courseName || course.courseName,
                startDate: req.body.courseStartDate || course.startDate,
                endDate: req.body.courseEndDate || course.endDate,
                acquiredSkill: req.body.acquiredSkill || course.acquiredSkill,
                companyName: req.body.companyName || course.companyName,
            },
            { new: true }
        );

        // Update candidate's foreign languages
        const foreignLanguage = await ForeignLanguage.findOneAndUpdate(
            { _id: { $in: candidate.foreignLanguages } },
            {
                languageName: req.body.languageName || foreignLanguage.languageName,
                reading: req.body.reading || foreignLanguage.reading,
                listening: req.body.listening || foreignLanguage.listening,
                writing: req.body.writing || foreignLanguage.writing,
                speaking: req.body.speaking || foreignLanguage.speaking,
            },
            { new: true }
        );

        // Update candidate's work experiences
        const workExperience = await WorkExperience.findOneAndUpdate(
            { _id: { $in: candidate.workExperiences } },
            {
                company: req.body.company || workExperience.company,
                role: req.body.role || workExperience.role,
                startDate: req.body.workStartDate || workExperience.startDate,
                endDate: req.body.workEndDate || workExperience.endDate,
                quitJobReason: req.body.quitJobReason || workExperience.quitJobReason,
            },
            { new: true }
        );

        // Save changes
        await candidate.save();

        res.json({ message: "Candidate updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/api/candidate", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, jwtSecret, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            try {
                let query = {}; // Initialize an empty query object
                if (req.query.searchWord) {
                    // If userName is provided in query params, add it to the query object
                    query.firstName = req.query.searchWord;
                }
                const data = await Candidate.find(query).populate("education").populate("courses").populate("workExperiences").populate("foreignLanguages");
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

app.delete("/api/candidate/:id", async (req, res) => {
    try {
        const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);
        if (!deletedCandidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }
        res.json({ message: "Candidate deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/candidate/:id", async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }
        res.json({ data: candidate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/interview", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const data = await Interview.find().populate("candidateId").populate("hr").populate("resultId");
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
