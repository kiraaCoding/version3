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

            // Maintenant que l'étudiant est créé avec succès, nous allons recommander des événements/ateliers
            // Récupérer les préférences de l'utilisateur nouvellement créé depuis la base de données
            const getUserPreferencesQuery = `
            SELECT specEt AS preference1, anneeEt AS preference2, cycleEt AS preference3
            FROM etudiants
            WHERE numEt = ?
        `;

            db.query(getUserPreferencesQuery, [numUt], async (err, userPreferences) => {
                console.log(userPreferences);
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
                console.log(preferences)
                

                const getUsersPreferencesQuery = `
                    SELECT specEt AS preference1, anneeEt AS preference2, cycleEt AS preference3
                    FROM etudiants
                `;

                db.query(getUsersPreferencesQuery, async (err, usersPreferences3) => {
                    if (err) {
                        console.error('Error fetching users preferences:', err);
                        return res.status(500).json({ error: "Internal Server Error" });
                    }

                    // Extract numerical preferences from user data
                    const preferences3 = usersPreferences3.map(pref => [
                        preferenceMappings[pref.preference1],   // Convert preferences to numerical values
                        preferenceMappings[pref.preference2],
                        preferenceMappings[pref.preference3],
                        // Add more preferences if necessary
                    ]);

                    console.log(preferences3);

    // Now 'preferences' contains preferences of all students in the etudiants table
    // Perform clustering, calculate centroids, extract cluster labels, and recommend events as before
});

                

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

                    // Proceed with extracting the cluster labels
                    const userCluster = centroids.map(centroid => {
                        // Trouver l'indice du centroid le plus proche
                        console.log(centroid);
                        const distances = clusters.map(cluster => Math.sqrt(cluster.reduce((acc, val, i) => acc + Math.pow(val - centroid[i], 2), 0)));
                        const minDistanceIndex = distances.indexOf(Math.min(...distances));
                        return minDistanceIndex;
                    });

                    // En fonction du cluster de l'utilisateur, recommander des événements/ateliers
                    // Vous pouvez avoir une table distincte pour les événements/ateliers avec des catégories
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

                        // Renvoyer les événements/ateliers recommandés
                        return res.json({ message: "Étudiant créé avec succès", recommendedEvents });
                        console.log(recommendedEvents);
                    });
                } catch (error) {
                    console.error('Erreur lors du clustering :', error);
                    return res.status(500).json({ error: "Internal Server Error" });
                }
            });
        });
    });
});