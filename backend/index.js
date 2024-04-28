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
        // Insert event into database
        const q = "INSERT INTO events (`titreEv`, `descEv`, `coverEv`, `datedebEv`, `datefinEv`, `catEv`,`userId`,`adminid`,lieuEv) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)";
        const values = [titreEv, descEv, coverEv, datedebEv, datefinEv, catEv, userId, adminid,lieuEv];

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
        const q = "UPDATE events SET `titreEv`= ?, `descEv`= ?, `coverEv`= ?, `datedebEv`= ?, `datefinEv`= ?, `catEv`= ? , `lieuEv`=?  WHERE numEv= ?";
        const values = [titreEv, descEv, coverEv, datedebEv, datefinEv, catEv, lieuEv,eventId];

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



app.post('/etudiants', (req, res) => {
    const { nomUt, emailUt, passwordUt, specEt, anneeEt, cycleEt, matricule } = req.body;

    // Hasher le mot de passe
    const hashedPassword = bcrypt.hashSync(passwordUt, 10);

    // Insérer les données de l'utilisateur dans la table "users"
    const insertUserQuery = "INSERT INTO users (`nomUt`, `emailUt`, `passwordUt`) VALUES (?, ?, ?)";
    const userValues = [nomUt, emailUt, hashedPassword];

    db.query(insertUserQuery, userValues, (err, userResult) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // Récupérer l'ID de l'utilisateur inséré
        const numUt = userResult.insertId;

        // Insérer les données de l'étudiant dans la table "etudiants" avec la clé étrangère numUt
        const insertEtudiantQuery = "INSERT INTO etudiants (`numEt`, `specEt`,  `anneeEt`, `cycleEt`,`matricule`) VALUES ( ?, ?, ?, ?, ?)";
        const etudiantValues = [numUt, specEt, anneeEt, cycleEt, matricule];

        db.query(insertEtudiantQuery, etudiantValues, (err, etudiantResult) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            return res.json("Étudiant a été créé avec succès");
        });
    });
});

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



app.post('/ensignants',verifyToken, (req, res) => {
    const { nomUt, emailUt, passwordUt, depEn, numBurEn, gradeEn, lienedtEn } = req.body;

    // Hasher le mot de passe
    const hashedPassword = bcrypt.hashSync(passwordUt, 10);

    // Insérer les données de l'utilisateur dans la table "users"
    const insertUserQuery = "INSERT INTO users (`nomUt`, `emailUt`, `passwordUt`) VALUES (?, ?, ?)";
    const userValues = [nomUt, emailUt, hashedPassword];

    db.query(insertUserQuery, userValues, (err, userResult) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // Récupérer l'ID de l'utilisateur inséré
        const numUt = userResult.insertId;

        // Insérer les données de l'étudiant dans la table "etudiants" avec la clé étrangère numUt
        const insertEnsignatQuery = "INSERT INTO ensignants (`numEn`, `depEn`, `numBurEn`, `gradeEn`, `lienedtEn`) VALUES ( ?, ?, ?, ?, ?)";
        const ensignantValues = [numUt, depEn, numBurEn, gradeEn, lienedtEn];

        db.query(insertEnsignatQuery, ensignantValues, (err, etudiantResult) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            return res.json("ensignants a été créé avec succès");
        });
    });
});

app.post('/clubs',verifyToken, (req, res) => {
    const { nomUt, emailUt, passwordUt, designationCl, domaineCl, localCl, descCl } = req.body;

    // Hasher le mot de passe
    const hashedPassword = bcrypt.hashSync(passwordUt, 10);

    // Insérer les données de l'utilisateur dans la table "users"
    const insertUserQuery = "INSERT INTO users (`nomUt`, `emailUt`, `passwordUt`) VALUES (?, ?, ?)";
    const userValues = [nomUt, emailUt, hashedPassword];

    db.query(insertUserQuery, userValues, (err, userResult) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // Récupérer l'ID de l'utilisateur inséré
        const numUt = userResult.insertId;

        // Insérer les données de l'étudiant dans la table "etudiants" avec la clé étrangère numUt
        const insertClubsQuery = "INSERT INTO clubs (`numCl`, `designationCl`, `domaineCl`, `localCl`) VALUES ( ?, ?, ?, ?)";
        const clubsValues = [numUt, designationCl, domaineCl, localCl, descCl];

        db.query(insertClubsQuery, clubsValues, (err, etudiantResult) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            return res.json("clubs a été créé avec succès");
        });
    });
});

app.post('/entreprises', (req, res) => {
    const { nomUt, emailUt, passwordUt, designationEntr, siegesocEntr, domaineEntr, telEntr } = req.body;

    // Hasher le mot de passe
    const hashedPassword = bcrypt.hashSync(passwordUt, 10);

    // Insérer les données de l'utilisateur dans la table "users"
    const insertUserQuery = "INSERT INTO users (`nomUt`, `emailUt`, `passwordUt`) VALUES (?, ?, ?)";
    const userValues = [nomUt, emailUt, hashedPassword];

    db.query(insertUserQuery, userValues, (err, userResult) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // Récupérer l'ID de l'utilisateur inséré
        const numUt = userResult.insertId;

        // Insérer les données de l'étudiant dans la table "etudiants" avec la clé étrangère numUt
        const insertCompanyQuery = "INSERT INTO entreprises (`numEntr`, `designationEntr`, `siegesocEntr`, `domaineEntr`, `telEntr`) VALUES ( ?, ?, ?, ?, ?)";
        const companiesValues = [numUt, designationEntr, siegesocEntr, domaineEntr, telEntr];

        db.query(insertCompanyQuery, companiesValues, (err, companyResult) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            return res.json("company a été créé avec succès");
        });
    });
});


// ensignants
app.get('/ensignants/:numEn', (req, res) => {
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

        const getensignantQuery = "SELECT * FROM ensignants WHERE numEn = ?";

        db.query(getensignantQuery, [userId], (err, ensignantResult) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            const ensignantData = {
                ...userData,
                ensignant: ensignantResult[0]
            };

            return res.json(ensignantData);
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
            ensignants.numEn AS ensignant_id,
            users.nomUt
        FROM 
            posts
        LEFT JOIN 
            etudiants ON posts.userId = etudiants.numEt 
        LEFT JOIN 
            ensignants ON posts.idens = ensignants.numEn     
        JOIN 
            users ON users.numUt = COALESCE(etudiants.numEt, ensignants.numEn)
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



app.listen(8800, () => {
    console.log('App listening on porttt 8800!');
});