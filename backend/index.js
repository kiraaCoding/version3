import  express, { json, query }  from "express"
import  mysql  from "mysql";
import  cors  from "cors";
import bcrypt, { compareSync } from 'bcrypt';
import bodyParser from 'body-parser';
import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import  dotenv  from "dotenv";
// import kmeans from 'node-kmeans';
// import { KMeans } from "sklearn"
// import { kmeans } from "ml-kmeans";
import KMeans from "kmeans-js";
import nodemailer from 'nodemailer';
import Randomstring from "randomstring";



 
dotenv.config();
const app = express()
const db =mysql.createConnection({

    host:'localhost',
    user:"root",
    password:"2003khirakhira",
    database:"test"

                                }) 
                            
app.use(express.json());
app.use(cors());
app.use('/media', express.static('media'))


          
cloudinary.config({ 
  cloud_name: 'dkcy4kyym', 
  api_key: '213391185732297', 
  api_secret: '1FifCILPyPL6j7U7b7oRdOyTHPg' 
});

const port = process.env.PORT || 3000;
// Configure multer for file upload
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Function to upload image to Cloudinary
const uploadToCloudinary = async (imageFile) => {
    try {
        const result = await cloudinary.uploader.upload(imageFile.path);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error uploading image to Cloudinary");
    }
};

const uploadImageMiddleware = async (req, res, next) => {
    console.log("inside middleware");
    if (req.file) {
        try {
            const imagePath = req.file.path;
            const result = await uploadToCloudinary(imagePath);
            console.log("uploadToCloudinary result:", result);
            req.body.coverEv = result.secure_url; // Update req.body to include the Cloudinary URL
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            return res.status(500).json({ error: "Error uploading image to Cloudinary" });
        }
    }
    next(); // Move to the next middleware or route handler
};

// Middleware function to verify JWT token
// const verifyToken = (req, res, next) => {
//     const secretKey = crypto.randomBytes(32).toString('hex');
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.status(401).json({ error: 'Unauthorized' });
//     }

//     try {
//         const decoded = jwt.verify(token, secretKey);
//         req.userId = decoded.userId; // Attach userId to request object
//         next();
//     } catch (error) {
//         return res.status(403).json({ error: 'Invalid token' });
//     }
// };



function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ error: 'Token is required' });

    jwt.verify(token.split(' ')[1],  process.env.JWT_SECRET, (err, decoded) => {
        console.log(token.split(' ')[1])
        if (err) return res.status(403).json({ error: 'Failed to authenticate token' });
        req.userId = decoded.userId;
        next();
    });
}





// Example route protected by JWT authentication
app.get('/protected-route', verifyToken, (req, res) => {
    // Access userId from request object
    const userId = req.userId;

    // Your route logic here...
});


app.post("/events", upload.single("coverEv"), uploadImageMiddleware, async (req, res) => {
    // Check request body for required fields
    const { titreEv, descEv, datedebEv, datefinEv, catEv, coverEv, userId, adminid ,lieuEv } = req.body;

    // Validate request body
    if (!titreEv || !descEv || !datedebEv || !datefinEv || !catEv || !coverEv) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        let datefinEvAdjusted = new Date(new Date(datefinEv).getTime() + (24 * 60 * 60 * 1000));
        let datedebEvAdjusted = new Date(new Date(datedebEv).getTime() + (24 * 60 * 60 * 1000));
        // Insert event into database
        const q = "INSERT INTO events (`titreEv`, `descEv`, `coverEv`, `datedebEv`, `datefinEv`, `catEv`,`userId`,`adminid`,lieuEv) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)";
        const values = [titreEv, descEv, coverEv, datedebEvAdjusted, datefinEvAdjusted, catEv, userId, adminid,lieuEv];

        db.query(q, values, (err, data) => {
            if (err) {
                console.error("Failed to create event:", err);
                return res.status(500).json({ error: "Failed to create event" });
            }
            console.log("Event has been created");
            return res.json("Event has been created");
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/events/:numEv", upload.single("coverEv"), uploadImageMiddleware, async (req, res) => {
    const eventId = req.params.numEv;
    const userId = req.userId;

    // Check request body for required fields
    const { titreEv, descEv, datedebEv, datefinEv, catEv, coverEv,lieuEv } = req.body;

    // Validate request body
    if (!titreEv || !descEv || !datedebEv || !datefinEv || !catEv || !coverEv ) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        let datefinEvAdjusted = new Date(new Date(datefinEv).getTime() + (24 * 60 * 60 * 1000));
        let datedebEvAdjusted = new Date(new Date(datedebEv).getTime() + (24 * 60 * 60 * 1000));
        const q = "UPDATE events SET `titreEv`= ?, `descEv`= ?, `coverEv`= ?, `datedebEv`= ?, `datefinEv`= ?, `catEv`= ? , `lieuEv`=?  WHERE numEv= ?";
        const values = [titreEv, descEv, coverEv, datedebEvAdjusted, datefinEvAdjusted, catEv, lieuEv,eventId];

        db.query(q, values, (err, data) => {
            if (err) {
                console.error("Failed to update event:", err);
                return res.status(500).json({ error: "Failed to update event" });
            }
            console.log("Event has been updated");
            return res.json("Event has been updated successfully");
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});









                                app.get('/',(req, res)=>{
                                    res.json("hello  this is the backed will serv uu")
                                });
                                
                                app.get('/events',(req, res)=>{
                                    const q= "SELECT * FROM events"
                                    db.query(q,(err,data)=>{
                                        if (err) return res.json(err)
                                        return res.json(data)
                                        
                                    })
                                    
                                })
                                
                                
//     app.post('/login', (req, res) => {
//         const { nomUt, passwordUt } = req.body;
//         db.query('SELECT * FROM users WHERE nomUt = ?', [nomUt], async (err, results) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).json({ error: 'Internal Server Error' });
//             }

//             if (results.length === 0) {
//                 return res.status(401).json({ error: 'Invalid credentials' });
//             }

//             const user = results[0];
//             const hashedPassword = user.passwordUt;

//             try {
//                 const match = await bcrypt.compare(passwordUt, hashedPassword);
//                 if (match) {
//                     return res.json({ user });
//                 } else {
//                     return res.status(401).json({ error: 'Invalid credentials' });
//                 }
//             } catch (bcryptErr) {
//                 console.error(bcryptErr);
//                 return res.status(500).json({ error: 'Internal Server Error' });
//             }
//         });
// });


app.post('/login', (req, res) => {
    const { nomUt, passwordUt } = req.body;
    db.query('SELECT * FROM users WHERE nomUt = ?', [nomUt], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = results[0];
        const hashedPassword = user.passwordUt;
        console.log(user)
        

        try {
            const match = await bcrypt.compare(passwordUt, hashedPassword);
            if (match) {
                // Créer un jeton JWT
                // const secretKey = crypto.randomBytes(32).toString('hex');
                const token = jwt.sign({ userId: user.numUt, role: user.nomUt }, process.env.JWT_SECRET, { expiresIn: '24h' });
                console.log(token)
                console.log(user.numUt)
                return res.json({ userId: user.numUt, username: user.nomUt, token });

                // return res.json({ token });
            } else {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (bcryptErr) {
            console.error(bcryptErr);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

app.put('/etudiants/:numEt', (req, res) => {
    // Récupérer l'ID de l'étudiant à partir de l'URL
    const { numEt } = req.params;
    console.log(numEt);

    // Récupérer les données mises à jour depuis le corps de la requête
    const updatedData = req.body;    console.log(updatedData);

    // Exemple de requête SQL UPDATE pour mettre à jour les données dans la base de données
    const updateQuery = `
        UPDATE etudiants AS e
        INNER JOIN users AS u ON e.numEt = u.numUt
        SET u.nomUt = ?, u.emailUt = ?, u.passwordUt = ?, e.specEt = ?, e.anneeEt = ?, e.cycleEt = ?, e.matricule = ?
        WHERE e.numEt = ?; 
    `;
    const hashedPassword = bcrypt.hashSync(updatedData.updatedData.password, 10);

    // Exemple de valeurs pour la requête SQL UPDATE
    const values = [
        
        updatedData.updatedData.username,
        updatedData.updatedData.email,
        hashedPassword,
        updatedData.updatedData.Speciality,
        updatedData.updatedData.Year,
        updatedData.updatedData.Cycle,
        updatedData.updatedData.Matricule,
        numEt 
        // Utiliser l'ID de l'étudiant comme identifiant dans la requête SQL UPDATE
    ];
    console.log(values)

    // Exécuter la requête SQL UPDATE dans la base de données
    db.query(updateQuery, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour des données :', err);
            return res.status(500).json({ error: 'Erreur interne du serveur lors de la mise à jour des données' });
        }
        console.log("Résultat de la requête :", result);
        // Si la mise à jour est réussie, renvoyer une réponse de succès
        return res.status(200).json({ message: 'Les données ont été mises à jour avec succès' });
    });
});





// app.post('/etudiants', (req, res) => {
//     const { nomUt, emailUt, passwordUt, specEt, anneeEt, cycleEt, matricule } = req.body;

//     // Hasher le mot de passe
//     const hashedPassword = bcrypt.hashSync(passwordUt, 10);

//     // Insérer les données de l'utilisateur dans la table "users"
//     const insertUserQuery = "INSERT INTO users (`nomUt`, `emailUt`, `passwordUt`) VALUES (?, ?, ?)";
//     const userValues = [nomUt, emailUt, hashedPassword];

//     db.query(insertUserQuery, userValues, (err, userResult) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json({ error: "Internal Server Error" });
//         }

//         // Récupérer l'ID de l'utilisateur inséré
//         const numUt = userResult.insertId;

//         // Insérer les données de l'étudiant dans la table "etudiants" avec la clé étrangère numUt
//         const insertEtudiantQuery = "INSERT INTO etudiants (`numEt`, `specEt`,  `anneeEt`, `cycleEt`,`matricule`) VALUES ( ?, ?, ?, ?, ?)";
//         const etudiantValues = [numUt, specEt, anneeEt, cycleEt, matricule];

//         db.query(insertEtudiantQuery, etudiantValues, (err, etudiantResult) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({ error: "Internal Server Error" });
//             }
//             return res.json("Étudiant a été créé avec succès");
//         });
//     });
// });

// app.get('/etudiants/:numEt', (req, res) => {
//     const userId = req.params.numEt;

//     // Fetch user data from the "users" table using the user ID
//     const getUserQuery = "SELECT * FROM users WHERE numUt = ?";
    
//     db.query(getUserQuery, [userId], (err, userResult) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json({ error: "Internal Server Error" });
//         }

//         if (userResult.length === 0) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         const userData = userResult[0];

//         // Fetch student data from the "etudiants" table using the user ID
//         const getEtudiantQuery = "SELECT * FROM etudiants WHERE numEt = ?";

//         db.query(getEtudiantQuery, [userId], (err, etudiantResult) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({ error: "Internal Server Error" });
//             }

//             // Combine user data with student data
//             const studentData = {
//                 ...userData,
//                 etudiant: etudiantResult[0] // Assuming only one student entry per user
//             };

//             return res.json(studentData);
//         });
//     });
// });




app.get('/etudiants/:numEt',verifyToken, (req, res) => {
    const userId = req.params.numEt;

    // Fetch user data from the "users" table using the user ID
    const getUserQuery = "SELECT * FROM users WHERE numUt = ?";
    
    db.query(getUserQuery, [userId], (err, userResult) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (userResult.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const userData = userResult[0];

        // Fetch student data from the "etudiants" table using the user ID
        const getEtudiantQuery = "SELECT * FROM etudiants WHERE numEt = ?";

        db.query(getEtudiantQuery, [userId], (err, etudiantResult) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            // Combine user data with student data
            const studentData = {
                ...userData,
                etudiant: etudiantResult[0] // Assuming only one student entry per user
            };

            return res.json(studentData);
        });
    });
});


// app.get('/etudiants',(req, res)=>{
//     const q= "SELECT * FROM etudiants"
//     db.query(q,(err,data)=>{
        
//         if (err) return res.json(err)
//         return res.json(data)
        
//     })
    
// })

app.get('/etudiants', (req, res) => {
    // Fetch all user data and associated student data using JOIN query
    const getAllUsersAndStudentsQuery = `
        SELECT users.*, etudiants.*
        FROM users
        INNER JOIN etudiants ON users.numUt = etudiants.numEt
    `;
    
    db.query(getAllUsersAndStudentsQuery, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "No students found" });
        }

        // Construct the response object with user and student data
        const responseData = results.map(row => ({
            user: {
                userId: row.numUt,
                username: row.nomUt,
                email: row.emailUt,
                // Assuming you don't want to send password back to the client
                password: row.passwordUt 
            },
            student: {

                // studentId: row.studentId,
                studentSpec: row.specEt,
                studentYear:row.anneeEt,
                Cycle : row.cycleEt,
                Matricule : row.matricule,

                

                // ...
            }
        }));

        return res.json(responseData);
    });
});

app.delete("/etudiants/:numEt",(req,res)=>{
    const etudiantId=req.params.numEt;
    const q= "DELETE FROM etudiants WHERE numEt = ?"
    db.query(q,[etudiantId],(err,data)=>{
        if (err) return res.json(err)
        return res.json("etudiant have been delated")
        
    })
})


//ensignants

// app.post('/enseignants', (req, res) => {
//     const { nomUt, emailUt, passwordUt, depEn, numBurEn, gradeEn, lienedtEn } = req.body;

//     // Hasher le mot de passe
//     const hashedPassword = bcrypt.hashSync(passwordUt, 10);

//     // Insérer les données de l'utilisateur dans la table "users"
//     const insertUserQuery = "INSERT INTO users (`nomUt`, `emailUt`, `passwordUt`) VALUES (?, ?, ?)";
//     const userValues = [nomUt, emailUt, hashedPassword];

//     db.query(insertUserQuery, userValues, (err, userResult) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json({ error: "Internal Server Error" });
//         }

//         // Récupérer l'ID de l'utilisateur inséré
//         const numUt = userResult.insertId;

//         // Insérer les données de l'étudiant dans la table "etudiants" avec la clé étrangère numUt
//         const insertEnsignatQuery = "INSERT INTO enseignants (`numEn`, `depEn`, `numBurEn`, `gradeEn`, `lienedtEn`) VALUES ( ?, ?, ?, ?, ?)";
//         const enseignantValues = [numUt, depEn, numBurEn, gradeEn, lienedtEn];

//         db.query(insertEnsignatQuery, enseignantValues, (err, etudiantResult) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({ error: "Internal Server Error" });
//             }
//             return res.json("enseignants a été créé avec succès");
//         });
//     });
// });

// Créer un transporteur SMTP réutilisable
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'khirakhira620@gmail.com',
        pass: 'sjdmeubsutykouum'
    }
});

// const emailVerificationCodes = {};
// Endpoint pour la création d'un nouvel enseignant
app.post('/enseignants', (req, res) => {
    // Extract data from request body
    const { nomUt, emailUt, passwordUt, depEn, numBurEn, gradeEn, lienedtEn } = req.body;

    // Générer un code aléatoire
    const verificationCode = Randomstring.generate(6); // Génère un code de 6 caractères

    // Enregistrer le code dans une variable de session ou une base de données temporaire
    // Ici, nous le stockons simplement dans une variable pour la démonstration
    const insertCodeQuery = "INSERT INTO email_verification_codes (email, verification_code) VALUES (?, ?)";
    const insertCodeValues = [emailUt, verificationCode];
    try {
         db.query(insertCodeQuery, insertCodeValues);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    // Envoyer le code de vérification par email
    const mailOptions = {
        from: 'khirakhira620@gmail.com',
        to: emailUt,
        subject: 'Code de vérification pour inscription',
        text: `Votre code de vérification pour l'inscription est : ${verificationCode}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        // Si l'email de vérification est envoyé avec succès, informez l'utilisateur
        return res.json("Un code de vérification a été envoyé à votre adresse email.");
    });
});

// Endpoint pour vérifier le code de vérification entré par l'utilisateur
// Endpoint pour vérifier le code de vérification entré par l'utilisateur
app.post('/checkVerificationCode', async (req, res) => {
    const { email, verificationCode, nomUt, emailUt, passwordUt, depEn, numBurEn, gradeEn, lienedtEn } = req.body;

    try {
        const selectCodeQuery = "SELECT verification_code FROM email_verification_codes WHERE email = ?";
        db.query(selectCodeQuery, [email], (err, rows) => {
            if (err) {
                console.error("Erreur lors de la récupération du code de vérification depuis la base de données :", err);
                return res.status(500).json({ error: "Erreur interne du serveur lors de la récupération du code de vérification." });
            }

            if (rows.length === 0) {
                return res.status(400).json({ error: "Aucun code de vérification associé à cet e-mail." });
            }

            const storedVerificationCode = rows[0].verification_code;

            if (verificationCode === storedVerificationCode) {
                console.log(passwordUt);
                const hashedPassword = bcrypt.hashSync(passwordUt, 10);

                const insertUserQuery = "INSERT INTO users (`nomUt`, `emailUt`, `passwordUt`) VALUES (?, ?, ?)";
                const userValues = [nomUt, emailUt, hashedPassword];

                db.query(insertUserQuery, userValues, (err, userResult) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ error: "Internal Server Error" });
                    }

                    const numUt = userResult.insertId;

                    const insertEnsignatQuery = "INSERT INTO enseignants (`numEn`, `depEn`, `numBurEn`, `gradeEn`, `lienedtEn`) VALUES (?, ?, ?, ?, ?)";
                    const enseignantValues = [numUt, depEn, numBurEn, gradeEn, lienedtEn];

                    db.query(insertEnsignatQuery, enseignantValues, (err, etudiantResult) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ error: "Internal Server Error" });
                        }
                        return res.json("Enseignant créé avec succès.");
                    });
                });
            } else {
                return res.status(400).json({ error: "Le code de vérification est incorrect." });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});





app.get('/enseignants', (req, res) => {
    // Récupérer toutes les données des utilisateurs et des enseignants associés en utilisant une requête JOIN
    const getAllUsersAndTeachersQuery = `
        SELECT users.*, enseignants.*
        FROM users
        INNER JOIN enseignants ON users.numUt = enseignants.numEn
    `;
    
    db.query(getAllUsersAndTeachersQuery, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "No teachers found" });
        }

        // Construire l'objet de réponse avec les données utilisateur et enseignant
        const responseData = results.map(row => ({
            user: {
                userId: row.numUt,
                username: row.nomUt,
                email: row.emailUt,
                // En supposant que vous ne voulez pas renvoyer le mot de passe au client
                password: row.passwordUt 
            },
            teacher: {
                department: row.depEn,
                officeNumber: row.numBurEn,
                grade: row.gradeEn,
                scheduleLink: row.lienedtEn,
                // Ajoutez d'autres champs de l'enseignant selon vos besoins
            }
        }));

        return res.json(responseData);
    });
});
app.put('/enseignants/:numEn', (req, res) => {
    // Récupérer l'ID de l'enseignant à partir de l'URL
    const { numEn } = req.params;

    // Récupérer les données mises à jour depuis le corps de la requête
    const updatedData = req.body;

    // Exemple de requête SQL UPDATE pour mettre à jour les données dans la base de données
    const updateQuery = `
        UPDATE enseignants AS e
        INNER JOIN users AS u ON e.numEn = u.numUt
        SET u.nomUt = ?, u.emailUt = ?, u.passwordUt = ?, e.depEn = ?, e.numBurEn = ?, e.gradeEn = ?, e.lienedtEn = ?
        WHERE e.numEn = ?; 
    `;
    const hashedPassword = bcrypt.hashSync(updatedData.updatedData.password, 10);

    // Exemple de valeurs pour la requête SQL UPDATE
    const values = [
        updatedData.updatedData.username,
        updatedData.updatedData.email,
        hashedPassword,
        updatedData.updatedData.department,
        updatedData.updatedData.officeNumber,
        updatedData.updatedData.grade,
        updatedData.updatedData.scheduleLink,
        numEn // Utiliser l'ID de l'enseignant comme identifiant dans la requête SQL UPDATE
    ];

    // Exécuter la requête SQL UPDATE dans la base de données
    db.query(updateQuery, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour des données :', err);
            return res.status(500).json({ error: 'Erreur interne du serveur lors de la mise à jour des données' });
        }

        // Si la mise à jour est réussie, renvoyer une réponse de succès
        return res.status(200).json({ message: 'Les données ont été mises à jour avec succès' });
    });
});
app.delete("/enseignants/:numEn", (req, res) => {
    const enseignantId = req.params.numEn;
    const query = "DELETE FROM enseignants WHERE numEn = ?";
    
    db.query(query, [enseignantId], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erreur interne du serveur lors de la suppression de l'enseignant" });
        }
        
        return res.status(200).json({ message: "L'enseignant a été supprimé avec succès" });
    });
});



//clubs


// app.post('/clubs',verifyToken, (req, res) => {
//     const { nomUt, emailUt, passwordUt, designationCl, domaineCl, localCl, descCl } = req.body;

//     // Hasher le mot de passe
//     const hashedPassword = bcrypt.hashSync(passwordUt, 10);

//     // Insérer les données de l'utilisateur dans la table "users"
//     const insertUserQuery = "INSERT INTO users (`nomUt`, `emailUt`, `passwordUt`) VALUES (?, ?, ?)";
//     const userValues = [nomUt, emailUt, hashedPassword];

//     db.query(insertUserQuery, userValues, (err, userResult) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json({ error: "Internal Server Error" });
//         }

//         // Récupérer l'ID de l'utilisateur inséré
//         const numUt = userResult.insertId;

//         // Insérer les données de l'étudiant dans la table "etudiants" avec la clé étrangère numUt
//         const insertClubsQuery = "INSERT INTO clubs (`numCl`, `designationCl`, `domaineCl`, `localCl`) VALUES ( ?, ?, ?, ?)";
//         const clubsValues = [numUt, designationCl, domaineCl, localCl, descCl];

//         db.query(insertClubsQuery, clubsValues, (err, etudiantResult) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({ error: "Internal Server Error" });
//             }
//             return res.json("clubs a été créé avec succès");
//         });
//     });
// });
app.post('/clubs', (req, res) => {
    const { nomUt, emailUt, passwordUt, designationCl, domaineCl, localCl, descCl } = req.body;

    // Générer un code aléatoire de vérification
    const verificationCode = Randomstring.generate(6);

    // Insérer le code de vérification dans la base de données
    const insertCodeQuery = "INSERT INTO email_verification_codes (email, verification_code) VALUES (?, ?)";
    const insertCodeValues = [emailUt, verificationCode];
    try {
        db.query(insertCodeQuery, insertCodeValues);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }

    // Envoyer le code de vérification par email
    const mailOptions = {
        from: 'khirakhira620@gmail.com',
        to: emailUt,
        subject: 'Code de vérification pour inscription',
        text: `Votre code de vérification pour l'inscription est : ${verificationCode}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json("Un code de vérification a été envoyé à votre adresse email.");
    });
});

// Endpoint pour vérifier le code de vérification entré par l'utilisateur
app.post('/checkVerificationCodeClub', async (req, res) => {
    const { emailUt, verificationCode, nomUt, passwordUt, designationCl, domaineCl, localCl, descCl } = req.body;

    try {
        // Récupérer le code de vérification enregistré dans la base de données pour l'email donné
        const selectCodeQuery = "SELECT verification_code FROM email_verification_codes WHERE email = ?";
        db.query(selectCodeQuery, [emailUt], (err, rows) => {
            if (err) {
                console.error("Erreur lors de la récupération du code de vérification depuis la base de données :", err);
                return res.status(500).json({ error: "Erreur interne du serveur lors de la récupération du code de vérification." });
            }

            if (rows.length === 0) {
                return res.status(400).json({ error: "Aucun code de vérification associé à cet e-mail." });
            }

            const storedVerificationCode = rows[0].verification_code;

            // Vérifier si le code entré par l'utilisateur correspond au code enregistré
            if (verificationCode === storedVerificationCode) {
                // Hasher le mot de passe
                const hashedPassword = bcrypt.hashSync(passwordUt, 10);

                // Insérer les données de l'utilisateur dans la table "users"
                const insertUserQuery = "INSERT INTO users (`nomUt`, `emailUt`, `passwordUt`) VALUES (?, ?, ?)";
                const userValues = [nomUt, emailUt, hashedPassword];

                db.query(insertUserQuery, userValues, (err, userResult) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: "Internal Server Error" });
                    }

                    // Récupérer l'ID de l'utilisateur inséré
                    const numUt = userResult.insertId;

                    // Insérer les données du club dans la table "clubs"
                    const insertClubQuery = "INSERT INTO clubs (`numCl`, `designationCl`, `domaineCl`, `localCl`) VALUES (?, ?, ?, ?)";
                    const clubValues = [numUt, designationCl, domaineCl, localCl, descCl];

                    db.query(insertClubQuery, clubValues, (err, clubResult) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ error: "Internal Server Error" });
                        }
                        return res.json("Club créé avec succès.");
                    });
                });
            } else {
                return res.status(400).json({ error: "Le code de vérification est incorrect." });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/clubs', (req, res) => {
    // Requête SQL pour récupérer tous les clubs avec les données de l'utilisateur associées
    const getAllClubsQuery = `
        SELECT users.*, clubs.*
        FROM users
        INNER JOIN clubs ON users.numUt = clubs.numCl
    `;
    
    db.query(getAllClubsQuery, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "No clubs found" });
        }

        // Construire l'objet de réponse avec les données de l'utilisateur et des clubs
        const responseData = results.map(row => ({
            user: {
                userId: row.numUt,
                username: row.nomUt,
                email: row.emailUt,
                // Assuming you don't want to send password back to the client
                password: row.passwordUt 
            },
            club: {
                clubId: row.numCl,
                designation: row.designationCl,
                domaine: row.domaineCl,
                localisation: row.localCl,
                description: row.descrCl
                // Add more properties if needed
            }
        }));

        return res.json(responseData);
    });
});
app.put('/clubs/:numCl',  (req, res) => {
    // Récupérer l'ID du club à partir de l'URL
    const { numCl } = req.params;
    console.log(numCl)

    // Récupérer les données mises à jour depuis le corps de la requête
    const updatedData = req.body;

    // Exemple de requête SQL UPDATE pour mettre à jour les données dans la base de données
    const updateQuery = `
        UPDATE clubs AS e
        INNER JOIN users AS u ON e.numCl = u.numUt
        SET u.nomUt = ?, u.emailUt = ?, u.passwordUt = ?, designationCl = ?, domaineCl = ?, localCl = ?, descrCl = ?
        WHERE e.numCl = ?; 
    `;
    const hashedPassword = bcrypt.hashSync(updatedData.updatedData.password, 10);
    // Exemple de valeurs pour la requête SQL UPDATE
    const values = [
        updatedData.updatedData.username,
        updatedData.updatedData.email,
        hashedPassword,
        updatedData.updatedData.designation,
        updatedData.updatedData.domaine,
        updatedData.updatedData.localisation,
        updatedData.updatedData.description,
        numCl // Utiliser l'ID du club comme identifiant dans la requête SQL UPDATE
    ];

    // Exécuter la requête SQL UPDATE dans la base de données
    db.query(updateQuery, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour des données :', err);
            return res.status(500).json({ error: 'Erreur interne du serveur lors de la mise à jour des données' });
        }

        // Si la mise à jour est réussie, renvoyer une réponse de succès
        return res.status(200).json({ message: 'Les données ont été mises à jour avec succès' });
    });
});
app.delete('/clubs/:numCl', (req, res) => {
    // Récupérer l'ID du club à supprimer à partir de l'URL
    const { numCl } = req.params;

    // Requête SQL DELETE pour supprimer le club correspondant à l'ID donné
    const deleteQuery = `
        DELETE FROM clubs
        WHERE numCl = ?; 
    `;

    // Exécuter la requête SQL DELETE dans la base de données
    db.query(deleteQuery, [numCl], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression du club :', err);
            return res.status(500).json({ error: 'Erreur interne du serveur lors de la suppression du club' });
        }

        // Vérifier si des lignes ont été affectées (c'est-à-dire si le club existait et a été supprimé)
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Club non trouvé' });
        }

        // Si la suppression est réussie, renvoyer une réponse de succès
        return res.status(200).json({ message: 'Le club a été supprimé avec succès' });
    });
});




// //companies
// app.post('/entreprises', (req, res) => {
//     const { nomUt, emailUt, passwordUt, designationEntr, siegesocEntr, domaineEntr, telEntr } = req.body;

//     // Hasher le mot de passe
//     const hashedPassword = bcrypt.hashSync(passwordUt, 10);

//     // Insérer les données de l'utilisateur dans la table "users"
//     const insertUserQuery = "INSERT INTO users (`nomUt`, `emailUt`, `passwordUt`) VALUES (?, ?, ?)";
//     const userValues = [nomUt, emailUt, hashedPassword];

//     db.query(insertUserQuery, userValues, (err, userResult) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json({ error: "Internal Server Error" });
//         }

//         // Récupérer l'ID de l'utilisateur inséré
//         const numUt = userResult.insertId;

//         // Insérer les données de l'étudiant dans la table "etudiants" avec la clé étrangère numUt
//         const insertCompanyQuery = "INSERT INTO entreprises (`numEntr`, `designationEntr`, `siegesocEntr`, `domaineEntr`, `telEntr`) VALUES ( ?, ?, ?, ?, ?)";
//         const companiesValues = [numUt, designationEntr, siegesocEntr, domaineEntr, telEntr];

//         db.query(insertCompanyQuery, companiesValues, (err, companyResult) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({ error: "Internal Server Error" });
//             }
//             return res.json("company a été créé avec succès");
//         });
//     });
// });
app.post('/entreprises', (req, res) => {
    const { nomUt, emailUt, passwordUt, designationEntr, siegesocEntr, domaineEntr, telEntr } = req.body;

    // Générer un code aléatoire de vérification
    const verificationCode = Randomstring.generate(6);

    // Insérer le code de vérification dans la base de données
    const insertCodeQuery = "INSERT INTO email_verification_codes (email, verification_code) VALUES (?, ?)";
    const insertCodeValues = [emailUt, verificationCode];
    try {
        db.query(insertCodeQuery, insertCodeValues);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }

    // Envoyer le code de vérification par email
    const mailOptions = {
        from: 'khirakhira620@gmail.com',
        to: emailUt,
        subject: 'Code de vérification pour inscription',
        text: `Votre code de vérification pour l'inscription est : ${verificationCode}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json("Un code de vérification a été envoyé à votre adresse email.");
    });
});

// Endpoint pour vérifier le code de vérification entré par l'utilisateur
app.post('/checkVerificationCodeC', async (req, res) => {
    const { emailUt, verificationCode, nomUt, passwordUt, designationEntr, siegesocEntr, domaineEntr, telEntr } = req.body;

    try {
        // Récupérer le code de vérification enregistré dans la base de données pour l'email donné
        const selectCodeQuery = "SELECT verification_code FROM email_verification_codes WHERE email = ?";
        db.query(selectCodeQuery, [emailUt], (err, rows) => {
            if (err) {
                console.error("Erreur lors de la récupération du code de vérification depuis la base de données :", err);
                return res.status(500).json({ error: "Erreur interne du serveur lors de la récupération du code de vérification." });
            }

            if (rows.length === 0) {
                return res.status(400).json({ error: "Aucun code de vérification associé à cet e-mail." });
            }

            const storedVerificationCode = rows[0].verification_code;

            // Vérifier si le code entré par l'utilisateur correspond au code enregistré
            if (verificationCode === storedVerificationCode) {
                // Hasher le mot de passe
                const hashedPassword = bcrypt.hashSync(passwordUt, 10);

                // Insérer les données de l'utilisateur dans la table "users"
                const insertUserQuery = "INSERT INTO users (`nomUt`, `emailUt`, `passwordUt`) VALUES (?, ?, ?)";
                const userValues = [nomUt, emailUt, hashedPassword];

                db.query(insertUserQuery, userValues, (err, userResult) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: "Internal Server Error" });
                    }

                    // Récupérer l'ID de l'utilisateur inséré
                    const numUt = userResult.insertId;

                    // Insérer les données de l'entreprise dans la table "entreprises"
                    const insertCompanyQuery = "INSERT INTO entreprises (`numEntr`, `designationEntr`, `siegesocEntr`, `domaineEntr`, `telEntr`) VALUES (?, ?, ?, ?, ?)";
                    const companyValues = [numUt, designationEntr, siegesocEntr, domaineEntr, telEntr];
                    console.log(companyValues);

                    db.query(insertCompanyQuery, companyValues, (err, companyResult) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ error: "Internal Server Error" });
                        }
                        return res.json("Entreprise créée avec succès.");
                    });
                });
            } else {
                return res.status(400).json({ error: "Le code de vérification est incorrect." });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/entreprises', (req, res) => {
    // Requête SQL pour récupérer toutes les entreprises avec les données de l'utilisateur associées
    const getAllEntreprisesQuery = `
        SELECT users.*, entreprises.*
        FROM users
        INNER JOIN entreprises ON users.numUt = entreprises.numEntr
    `;
    
    db.query(getAllEntreprisesQuery, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Aucune entreprise trouvée" });
        }

        // Construire l'objet de réponse avec les données de l'utilisateur et des entreprises
        const responseData = results.map(row => ({
            user: {
                userId: row.numUt,
                username: row.nomUt,
                email: row.emailUt,
                // Assuming you don't want to send password back to the client
                password: row.passwordUt 
            },
            entreprise: {
                entrepriseId: row.numEntr,
                designation: row.designationEntr,
                siegesocial: row.siegesocEntr,
                domaine: row.domaineEntr,
                telephone: row.telEntr
                // Ajouter d'autres propriétés si nécessaire
            }
        }));

        return res.json(responseData);
    });
});
app.put('/entreprises/:numEntr',  (req, res) => {
    // Récupérer l'ID de l'entreprise à partir de l'URL
    const { numEntr } = req.params;

    // Récupérer les données mises à jour depuis le corps de la requête
    const updatedData = req.body;

    // Exemple de requête SQL UPDATE pour mettre à jour les données de l'entreprise dans la base de données
    const updateQuery = `
        UPDATE entreprises AS e
        INNER JOIN users AS u ON e.numEntr = u.numUt
        SET u.nomUt = ?, u.emailUt = ?, u.passwordUt = ?, e.designationEntr = ?, e.siegesocEntr = ?, e.domaineEntr = ?, e.telEntr = ?
        WHERE e.numEntr = ?; 
    `;
    const hashedPassword = bcrypt.hashSync(updatedData.updatedData.password, 10);
    // Exemple de valeurs pour la requête SQL UPDATE
    const values = [
        updatedData.updatedData.username,
        updatedData.updatedData.email,
        hashedPassword,
        updatedData.updatedData.designation,
        updatedData.updatedData.siegesocial,
        updatedData.updatedData.domaine,
        updatedData.updatedData.telephone,
        numEntr // Utiliser l'ID de l'entreprise comme identifiant dans la requête SQL UPDATE
    ];

    // Exécuter la requête SQL UPDATE dans la base de données
    db.query(updateQuery, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour des données de l\'entreprise :', err);
            return res.status(500).json({ error: 'Erreur interne du serveur lors de la mise à jour des données de l\'entreprise' });
        }

        // Si la mise à jour est réussie, renvoyer une réponse de succès
        return res.status(200).json({ message: 'Les données de l\'entreprise ont été mises à jour avec succès' });
    });
});
app.delete('/entreprises/:numEntr',  (req, res) => {
    // Récupérer l'ID de l'entreprise à supprimer à partir de l'URL
    const { numEntr } = req.params;

    // Requête SQL DELETE pour supprimer l'entreprise correspondant à l'ID donné
    const deleteQuery = `
        DELETE entreprises, users
        FROM entreprises
        INNER JOIN users ON entreprises.numEntr = users.numUt
        WHERE entreprises.numEntr = ?;
    `;

    // Exécuter la requête SQL DELETE dans la base de données
    db.query(deleteQuery, [numEntr], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'entreprise :', err);
            return res.status(500).json({ error: 'Erreur interne du serveur lors de la suppression de l\'entreprise' });
        }

        // Vérifier si des lignes ont été affectées (c'est-à-dire si l'entreprise existait et a été supprimée)
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Entreprise non trouvée' });
        }

        // Si la suppression est réussie, renvoyer une réponse de succès
        return res.status(200).json({ message: 'L\'entreprise a été supprimée avec succès' });
    });
});





// enseignants
app.get('/enseignants/:numEn', (req, res) => {
    const userId = req.params.numEn;

    const getUserQuery = "SELECT * FROM users WHERE numUt = ?";
    
    db.query(getUserQuery, [userId], (err, userResult) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (userResult.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const userData = userResult[0];

        const getenseignantQuery = "SELECT * FROM enseignants WHERE numEn = ?";

        db.query(getenseignantQuery, [userId], (err, enseignantResult) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            const enseignantData = {
                ...userData,
                enseignant: enseignantResult[0]
            };

            return res.json(enseignantData);
        });
    });
});

// Clubs
app.get('/clubs/:numCl', (req, res) => {
    const userId = req.params.numClub;

    const getUserQuery = "SELECT * FROM users WHERE numUt = ?";
    
    db.query(getUserQuery, [userId], (err, userResult) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (userResult.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const userData = userResult[0];

        const getClubQuery = "SELECT * FROM clubs WHERE numCl = ?";

        db.query(getClubQuery, [userId], (err, clubResult) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            const clubData = {
                ...userData,
                club: clubResult[0]
            };

            return res.json(clubData);
        });
    });
});

// Entreprises
app.get('/entreprises/:numEntr',  (req, res) => {
    const userId = req.params.numEntreprise;

    const getUserQuery = "SELECT * FROM users WHERE numUt = ?";
    
    db.query(getUserQuery, [userId], (err, userResult) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (userResult.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const userData = userResult[0];

        const getEntrepriseQuery = "SELECT * FROM entreprises WHERE numEntr = ?";

        db.query(getEntrepriseQuery, [userId], (err, entrepriseResult) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            const entrepriseData = {
                ...userData,
                entreprise: entrepriseResult[0]
            };

            return res.json(entrepriseData);
        });
    });
});




app.delete("/events/:numEv",(req,res)=>{
    const eventId=req.params.numEv;
    const q= "DELETE FROM events WHERE numEv = ?"
    db.query(q,[eventId],(err,data)=>{
        if (err) return res.json(err)
        return res.json("events have been delated")
        
    })
})

//Formation 
app.get("/", (req, res) => {
    res.json("hello this is the backend!");
});

app.get("/Formations", (req, res) => {
    const q = "SELECT * FROM formation";
    
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/Formations", (req, res) => {
    const q = "INSERT INTO formation (imgform,datedebform,datefinform,typeform,localform,userId) VALUES (?)"; 
    const values = [
        req.body.imgform,
        req.body.datedebform,
        req.body.datefinform,
        req.body.typeform,
        req.body.localform,
        req.body.userId
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("workshop has been created successfully!!");
    });
});

app.delete("/formation/:numform", (req, res) => {
    const numForm = req.params.numform;
    const q = "DELETE FROM formation WHERE numform=?";

    db.query(q, [numForm], (err, data) => {
        if (err) return res.json(err);
        return res.json("workshop has been deleted successfully!!");
    });
});

app.put("/formation/:numform", (req, res) => {
    const numForm = req.params.numform;
    const q = "UPDATE formation SET `imgform`=?,`datedebform`=?, `datefinform`=?, `typeform`=?,`localform`=? WHERE numform=?";
    const values = [
        req.body.imgform,
        req.body.datedebform,
        req.body.datefinform,
        req.body.typeform,
        req.body.localform,+
        numForm 
    ];


    db.query(q, values, (err, data) => {
        if (err) {
            return res.json(err); 
        }
        
        return res.json("workshop has been updated successfully!!");
    });
});

//Publication

app.get("/publications", (req, res) => {
    const q = `
        SELECT 
            posts.*, 
            etudiants.numEt AS etudiant_id,
            enseignants.numEn AS enseignant_id,
            users.nomUt
        FROM 
            posts
        LEFT JOIN 
            etudiants ON posts.userId = etudiants.numEt 
        LEFT JOIN 
            enseignants ON posts.idens = enseignants.numEn     
        JOIN 
            users ON users.numUt = COALESCE(etudiants.numEt, enseignants.numEn)
    `;
    
    db.query(q, (err, data) => { 
        if (err) return res.json(err);
        return res.json(data);
    });
});


app.post("/publications", (req, res) => {
    const q = "INSERT INTO posts (dateP, typeP, descriptionP, img, userId,idens) VALUES (?)"; 
    const values = [
        req.body.dateP,
        req.body.typeP,
        req.body.descriptionP,
        req.body.img,
        req.body.userId,
        req.body.idens,

    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("La publication a été créée avec succès!!");
    });
});

app.delete("/publications/:id", (req, res) => {
    const id = req.params.id;
    const q = "DELETE FROM posts WHERE id=?";

    db.query(q, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json("La publication a été supprimée avec succès!!");
    });
});

app.put("/publications/:id", (req, res) => {
    const id = req.params.id;
    const q = "UPDATE posts SET `typeP`=?, `descriptionP`=?, `img`=? WHERE id=?";
    const values = [
        req.body.typeP,
        req.body.descriptionP,
        req.body.img,
        id
    ];

    db.query(q, values, (err, data) => {
        if (err) {
            return res.json(err); 
        }
        
        return res.json("La publication a été mise à jour avec succès!!");
    });
});



// Get likes for a specific post
export const getLikes = (req, res) => {
    const q = "SELECT userId FROM likes WHERE postId = ?";
  
    db.query(q, [req.params.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map(like => like.userId));
    });
};

// Add a like to a post
export const addLike = (req, res) => {
    const q = "INSERT INTO likes (userId, postId) VALUES (?, ?)";
    const values = [req.body.userId, req.body.postId];
  
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been liked.");
    });
};

// Remove a like from a post
export const deleteLike = (req, res) => {
    const q = "DELETE FROM likes WHERE userId = ? AND postId = ?";
  
    db.query(q, [req.body.userId, req.params.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been disliked.");
    });
};


// announce 
app.get("/announces", (req, res) => {
    const q = `
        SELECT 
            announce.*, 
            administration.numadmin AS admin_id,
            enseignants.numEn AS enseignant_id,
            users.nomUt
        FROM 
            announce
        LEFT JOIN 
            administration ON announce.admin = administration.numadmin 
        LEFT JOIN 
            enseignants ON announce.ens = enseignants.numEn     
        JOIN 
            users ON users.numUt = COALESCE(administration.numadmin, enseignants.numEn)
    `;
    
    db.query(q, (err, data) => { 
        if (err) return res.json(err);
        return res.json(data);
    });
});


app.post("/announces", (req, res) => {
    const q = "INSERT INTO announce (descriptionA,dateA,admin,ens) VALUES (?)"; 
    const values = [
        req.body.descriptionA,
        req.body.dateA,
        req.body.admin,
        req.body.ens,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("L'announce a été créée avec succès!!");
    });
});

app.delete("/announces/:numA", (req, res) => {
    const numA= req.params.numA;
    const q = "DELETE FROM announce WHERE numA=?";

    db.query(q, [numA], (err, data) => {
        if (err) return res.json(err);
        return res.json("L'announce a été supprimée avec succès!!");
    });
});

app.put("/announces/:numA", (req, res) => {
    const numA = req.params.numA;
    const q = "UPDATE announce SET `descriptionA`=? WHERE numA=?";
    const values = [
    
        req.body.descriptionA,
        numA
    ];

    db.query(q, values, (err, data) => {
        if (err) {
            return res.json(err); 
        }
        
        return res.json("L'announce été mise à jour avec succès!!");
    });
});

// stage
app.get("/stages", (req, res) => {
    const q = `
    SELECT 
        stage.*, 
        entreprises.designationEntr
    FROM 
        stage
    JOIN 
        entreprises ON stage.userId = entreprises.numEntr;
     
    `;
    
    db.query(q, (err, data) => { 
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/stages", (req, res) => {
    const q = "INSERT INTO stage (datedebS,datefinS,themeS,userId) VALUES (?)"; 
    const values = [
        req.body.datedebS,
        req.body.datefinS,
        req.body.themeS,
        req.body.userId,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Le stage a été créé avec succès!!");
    });
});

app.delete("/stages/:numS", (req, res) => {
    const numS= req.params.numS;
    const q = "DELETE FROM stage WHERE numS=?";

    db.query(q, [numS], (err, data) => {
        if (err) return res.json(err);
        return res.json("Le stage a été supprimé avec succès!!");
    });
});

app.put("/stages/:numS", (req, res) => {
    const numS = req.params.numS;
    const q = "UPDATE stage SET `datedebS`=?,`datefinS`=? ,`themeS`=? WHERE numS=?";
    const values = [
    
        req.body.datedebS,
        req.body.datefinS,
        req.body.themeS,
        numS
    ];

    db.query(q, values, (err, data) => {
        if (err) {
            return res.json(err); 
        }
        
        return res.json("Le stage a été mis à jour avec succès!!");
    });
});


//sujet pfe
app.get("/sujetpfes", (req, res) => {
    const q = `
    SELECT 
        sujet_pfe.*, 
        pfe_interne.ens AS encadrantInterne,
        pfe_externe.pfens AS encadrantExterne,
        CONCAT_WS(' ', userEnseignantInterne.nomUt) AS nomEnseignantInterne,
        CONCAT_WS(' ', userEnseignantExterne.nomUt) AS nomEnseignantExterne,
        CONCAT_WS(' ', employeExterne.nom, employeExterne.prenom) AS nomEmploye,
        entreprises.designationEntr AS entrepriseNom
    FROM 
        sujet_pfe
    LEFT JOIN 
        pfe_interne ON sujet_pfe.numsujet = pfe_interne.idpfe_interne
    LEFT JOIN 
        pfe_externe ON sujet_pfe.numsujet = pfe_externe.idpfe_externe
    LEFT JOIN 
        enseignants AS enseignantInterne ON pfe_interne.ens = enseignantInterne.numEn
    LEFT JOIN 
        enseignants AS enseignantExterne ON pfe_externe.pfens = enseignantExterne.numEn
    LEFT JOIN 
        employe AS employeExterne ON pfe_externe.pfemp = employeExterne.numemp
    LEFT JOIN 
        entreprises ON employeExterne.ent = entreprises.numEntr
    LEFT JOIN 
        users AS userEnseignantInterne ON enseignantInterne.numEn = userEnseignantInterne.numUt
    LEFT JOIN 
        users AS userEnseignantExterne ON enseignantExterne.numEn = userEnseignantExterne.numUt
    `;
    
    db.query(q, (err, data) => { 
        if (err) return res.json(err);
        return res.json(data);
    });
});

//recommendation system
const preferenceMappings = {
    'Informatique general': 1,
    'acad': 2,
    'isil': 3,
    'gtr': 4,
    'l1': 4,
    'l2': 5,
    'l3': 6,
    'm1': 7,
    'm2': 8,
    'licence': 9,
    'master': 10,
    // Ajoutez d'autres catégories avec leurs valeurs numériques respectives
};


// Point de terminaison pour enregistrer un nouvel étudiant et recommander des événements/ateliers
app.post('/etudiants', async (req, res) => {
    const { nomUt, emailUt, passwordUt, specEt, anneeEt, cycleEt, matricule } = req.body;

    // Hasher le mot de passe
    const hashedPassword = bcrypt.hashSync(passwordUt, 10);

    // Insérer les données de l'utilisateur dans la table "users"
    const insertUserQuery = "INSERT INTO users (`nomUt`, `emailUt`, `passwordUt`) VALUES (?, ?, ?)";
    const userValues = [nomUt, emailUt, hashedPassword];

    db.query(insertUserQuery, userValues, async (err, userResult) => {
        if (err) {
            console.error('Erreur lors de l\'insertion de l\'utilisateur :', err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // Récupérer l'ID de l'utilisateur inséré
        const numUt = userResult.insertId;
        console.log(numUt)

        // Insérer les données de l'étudiant dans la table "etudiants" avec la clé étrangère numUt
        const insertEtudiantQuery = "INSERT INTO etudiants (`numEt`, `specEt`,  `anneeEt`, `cycleEt`,`matricule`) VALUES (?, ?, ?, ?, ?)";
        const etudiantValues = [numUt, specEt, anneeEt, cycleEt, matricule];

        db.query(insertEtudiantQuery, etudiantValues, async (err, etudiantResult) => {
            if (err) {
                console.error('Erreur lors de l\'insertion de l\'étudiant :', err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            // Récupérer les préférences de l'utilisateur nouvellement créé depuis la base de données
            const getUserPreferencesQuery = `
                SELECT specEt AS preference1, anneeEt AS preference2, cycleEt AS preference3
                FROM etudiants
                WHERE numEt = ?
            `;

            db.query(getUserPreferencesQuery, [numUt], async (err, userPreferences) => {
                if (err) {
                    console.error('Erreur lors de la récupération des préférences de l\'utilisateur :', err);
                    return res.status(500).json({ error: "Internal Server Error" });
                }

                // Extraire les préférences numériques des données utilisateur
                const preferences = userPreferences.map(pref => [
                    preferenceMappings[pref.preference1],   // Convertir les préférences en valeurs numériques
                    preferenceMappings[pref.preference2],
                    preferenceMappings[pref.preference3],
                    // Ajouter plus de préférences si nécessaire
                ]);
                console.log(preferences);

                // Récupérer les préférences de tous les étudiants depuis la base de données
                const getUsersPreferencesQuery = `
                    SELECT specEt AS preference1, anneeEt AS preference2, cycleEt AS preference3
                    FROM etudiants
                `;

                db.query(getUsersPreferencesQuery, async (err, usersPreferences) => {
                    if (err) {
                        console.error('Erreur lors de la récupération des préférences des étudiants :', err);
                        return res.status(500).json({ error: "Internal Server Error" });
                    }

                    // Extraire les préférences numériques des données des autres étudiants
                    const preferences3 = usersPreferences.map(pref => [
                        preferenceMappings[pref.preference1],   // Convertir les préférences en valeurs numériques
                        preferenceMappings[pref.preference2],
                        preferenceMappings[pref.preference3],
                        // Ajouter plus de préférences si nécessaire
                    ]);

                    console.log(preferences3);

                    // Fusionner les préférences de l'utilisateur nouvellement créé avec les préférences des autres étudiants
                    const preferences2 = preferences3.concat(preferences);

                    // Perform clustering
                // Perform clustering
                const kmeans = new KMeans();
                
                try {
                    // Perform clustering
                    const clusters = kmeans.cluster(preferences2, 3);

                    console.log(clusters);

                    // Check if clustering was successful
                    if (!clusters || clusters.length === 0) {
                        console.error('Erreur lors du clustering : les données de cluster sont indéfinies');
                        return res.status(500).json({ error: "Internal Server Error" });
                    }
                    const centroids = [];

                    // Iterate through each cluster
                    for (let i = 0; i < clusters.length; i++) {
                        const cluster = clusters[i];
                        // Check if the cluster is not empty and is an array
                        if (cluster && Array.isArray(cluster) && cluster.length > 0) {
                            // Initialize array to store sum of each dimension
                            const sum = new Array(cluster.length).fill(0);
                    
                            // Calculate the sum of each dimension for all points in the cluster
                            for (let j = 0; j < cluster.length; j++) {
                                const point = cluster[j];
                                if (typeof point === 'number') {
                                    sum[j] += point;
                                } else if (Array.isArray(point)) {
                                    // Add each dimension of the point to the corresponding dimension of the sum array
                                    for (let k = 0; k < point.length; k++) {
                                        sum[k] += point[k];
                                    }
                                } else {
                                    console.error('Invalid point in cluster:', point);
                                }
                            }
                    
                            // Calculate centroid by dividing each element of the sum array by the number of points in the cluster
                            const numPoints = cluster.length;
                            const centroid = sum.map(val => val / numPoints);
                    
                            // Push centroid to centroids array
                            centroids.push(centroid);
                        } else {
                            console.error('Cluster is empty or not an array');
                        }
                    }
                    // Check if centroids are available
                    if (!centroids || centroids.length === 0) {
                        console.error('Erreur lors du clustering : les centroids sont indéfinis');
                        return res.status(500).json({ error: "Internal Server Error" });
                    }
                    console.log(centroids);

                    // Sauvegarder les préférences de l'utilisateur et les événements dans la table user_prefrences_event
                    const userEventsValues = centroids.map(centroid => {
                        return [numUt, preferences.join(','), preferences2.join(','), centroid.join(',')];
                    });

                    const insertUserEventsQuery = "INSERT INTO user_preferences_event (`numEt`, `user_preferences`, `event_preferences`, `user_cluster_centroid`) VALUES ?";
                    db.query(insertUserEventsQuery, [userEventsValues], async (err, userEventsResult) => {
                        if (err) {
                            console.error('Erreur lors de l\'insertion des préférences utilisateur et événements :', err);
                            return res.status(500).json({ error: "Internal Server Error" });
                        }

                        console.log('Préférences utilisateur et événements sauvegardées avec succès');
                        const userCluster = centroids.map(centroid => {
                            // Trouver l'indice du centroid le plus proche
                            console.log(centroid);
                            const distances = clusters.map(cluster => Math.sqrt(cluster.reduce((acc, val, i) => acc + Math.pow(val - centroid[i], 2), 0)));
                            const minDistanceIndex = distances.indexOf(Math.min(...distances));
                            return minDistanceIndex;
                        });
                        // En fonction du cluster de l'utilisateur, recommander des événements/ateliers
                        // Récupérer les événements/ateliers recommandés pour le cluster de l'utilisateur depuis la table user_prefrences_event
                        const flatCentroids = centroids.flat();

                        const recommendedEventsQuery = `
                        SELECT *
                        FROM events
                        WHERE catEv= "hackathon"  -- Ajuster cette requête pour correspondre à votre schéma de base de données
                        LIMIT 5;  -- Exemple: Recommander les 5 premiers événements
                    `;

                    // Récupérer les événements/ateliers recommandés pour le cluster de l'utilisateur
                    db.query(recommendedEventsQuery, [userCluster], async (err, recommendedEvents) => {
                        if (err) {
                            console.error('Erreur lors de la récupération des événements recommandés :', err);
                            return res.status(500).json({ error: "Internal Server Error" });
                        }
                    
                        // Renvoyer les événements recommandés
                        return res.json({ message: "Étudiant créé avec succès", recommendedEvents });
                        });
                    });
                } catch (error) {
                    console.error('Erreur lors du clustering :', error);
                    return res.status(500).json({ error: "Internal Server Error" });
                }
                });
            });
        });
    });
});



app.listen(8800, () => {
    console.log('App listening on porttt 8800!');
});