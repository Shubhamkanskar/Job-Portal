const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
require("dotenv").config()


//middleware
app.use(express.json())
app.use(cors())


//mongoDB

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xuknwpv.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        //create db 
        const db = client.db("mernJobPortal")
        const jobCollections = db.collection("DemoJobs")
        //post a job
        app.post("/post-job", async (req, res) => {
            try {
                const body = req.body;
                body.createAt = new Date();
                const result = await jobCollections.insertOne(body);
                if (result.insertedId) {
                    return res.status(200).send(result);
                } else {
                    return res.status(404).send({ message: "Cannot insert job! Try again", status: false });
                }
            } catch (error) {
                console.error(error);
                return res.status(500).send({ message: "Internal Server Error", status: false });
            }
        });

        //get all jobs

        app.get("/all-jobs", async (req, res) => {
            const jobs = await jobCollections.find().toArray();
            res.send(jobs);
        });


        //get jobs by email

        app.get("/myJobs/:email", async (req, res) => {
            const jobs = await jobCollections.find({ postedBy: req.params.email }).toArray();
            res.send(jobs)
        })

        //delete a jobs
        app.delete("/job/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };

            try {
                const result = await jobCollections.deleteOne(filter);
                res.send(result);
            } catch (error) {
                console.error("Error deleting job:", error.message);
                res.status(500).send("Internal Server Error");
                // Handle the error in a way that makes sense for your application.
            }
        });


        //get single job using id 

        app.get("/all-jobs/:id", async (req, res) => {
            try {
                const id = req.params.id;

                // Validate if it's a valid ObjectId
                if (!ObjectId.isValid(id)) {
                    return res.status(400).send({ message: "Invalid ObjectId format", status: false });
                }

                const job = await jobCollections.findOne({
                    _id: new ObjectId(id)
                });

                if (job) {
                    res.send(job);
                } else {
                    res.status(404).send({ message: "Job not found", status: false });
                }
            } catch (error) {
                console.error("Error fetching job:", error.message);
                res.status(500).send("Internal Server Error");
                // Handle the error in a way that makes sense for your application.
            }
        });
        //update a jobs
        app.patch("/update-job/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const jobdata = req.body

                const filter = { _id: new ObjectId(id) }
                const options = { upsert: true }
                const updateJob = {
                    $set: {
                        ...jobdata
                    }
                }

                const result = await jobCollections.updateOne(filter, updateJob, options);

                if (result.matchedCount > 0) {
                    res.json({ acknowledged: true, message: "Job updated successfully" });
                } else {
                    res.status(404).json({ acknowledged: false, message: "Job not found" });
                }
            } catch (error) {
                console.error("Error updating job:", error);
                res.status(500).json({ acknowledged: false, message: "Error updating job" });
            }
        });


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
/*         await client.close();
 */    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
// At the end of your script, you can listen for termination signals and close the connection
process.on('SIGINT', async () => {
    await client.close();
    process.exit();
});
