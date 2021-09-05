const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const port = 6969

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// MONGOOSE CONNECTION AND MODELLING
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/ProjectDB');
}

const jobSurveySchema = new mongoose.Schema({
    personal: {
        first_name: String,
        last_name: String,
        email: String,
        date: String,
        company: String,
        role: String
    },
    subjective_answers: {
        valued_at_work: String,
        resources_available_or_not: String,
        stress_anxiety: String,
        sufficient_efforts: String,
    },
    miscellaneous: {
        job_satisfaction: String,
        salary: String,
        want_change: Boolean,
        suggestions: String,
    },
    randomID: String
})

const JobSurvey = mongoose.model('jobsurveyitem', jobSurveySchema)

// ROUTES
app.post('/send-data', async (req, res) => {
    const recievedData = new JobSurvey(req.body)
    try {
        await recievedData.save()
    } catch (error) {
        console.log(error)
    }
})

app.get('/review/:randomID', (req, res) => {
    JobSurvey.findOne({randomID: req.params.randomID}, (err, result) => {
        if (err) {
            res.send(err)
        }
        console.log(result)
        res.send(result)
    })
})


//STARTING THE SERVER
app.listen(port, () => {
    console.log(`Running at http://localhost:${port}/`)
})
