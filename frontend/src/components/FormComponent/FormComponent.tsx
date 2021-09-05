import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './FormComponent.css'

// importing prop interface
import { FormProps } from '../../utils'

// importing interfaces
import { JobSurveyInterface, PersonalInterface, SubjectiveInterface, MiscellaneousInterface } from '../../utils'

// importing initial states
import { initialPersonal, initialSubjective, initialMiscellaneous } from '../../utils'

//style for some labels only
const selectLabelStyles: object = {
    marginRight: "5px",
    marginTop: "0px",
    fontSize: "1.1rem"
}


//URL for post request
const postURL = 'http://localhost:6969/send-data'

// FUNCTIONAL COMPONENT
const FormComponent: React.FC<FormProps> = ({ randomID }) => {

    // STATE VALUES FOR VARIOUS INPUTS, NAMED AFTER THEIR SECTIONS
    const [personal, setPersonal] = useState<PersonalInterface>(initialPersonal)
    const [subjective, setSubjective] = useState<SubjectiveInterface>(initialSubjective)
    const [miscellaneous, setMiscellaneous] = useState<MiscellaneousInterface>(initialMiscellaneous)



    // HANDLES CHANGES FOR INPUTS IN SECTION: PERSONAL
    const changePersonal = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget
        setPersonal(prev => {
            return {
                ...prev,
                [target.name]: target.value
            }
        })
    }



    // HANDLES CHANGES FOR INPUTS IN SECTION: SUBJECTIVE
    const changeSubjective = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget
        setSubjective(prev => {
            return {
                ...prev,
                [target.name]: target.value
            }
        })
    }



    // HANDLES CHANGES FOR INPUTS IN SECTION:
    const changeMiscellaneous = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = e.currentTarget

        let valueToInsert: string | boolean = target.value

        if (target.name === 'want_change') {
            if (target.value === 'Yes') {
                valueToInsert = true
            } else if (target.value === 'No') {
                valueToInsert = false
            }
        }

        setMiscellaneous(prev => {
            return {
                ...prev,
                [target.name]: valueToInsert
            }
        })
    }




    // SUBMISSION OF DATA 
    const submitInformation = () => {
        const enteredData: JobSurveyInterface = {
            personal,
            miscellaneous,
            subjective_answers: subjective,
            randomID
        }
        console.log(enteredData)
        axios.post(postURL, enteredData)
        alert("Information has been successfully submitted")

        setPersonal(initialPersonal)
        setSubjective(initialSubjective)
        setMiscellaneous(initialMiscellaneous)
    }


    

    //RENDER
    return <main>
        <h1>Job Satisfaction Survey</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium doloremque dignissimos in ad nemo error praesentium, earum ipsam nam facilis, voluptatem alias repellat quaerat magnam labore a inventore omnis sapiente.</p>
        <div className="form">
            <section className="personal">
                <div className="labels">
                    <li><label>First Name</label></li>
                    <li><label>Last Name</label></li>
                    <li><label>Company</label></li>
                    <li> <label>Role</label></li>
                    <li><label>Email</label></li>
                    <li><label>Date</label></li>
                </div>
                <div className="inputs">
                    <li><input type="text" name="first_name" value={personal.first_name} onChange={changePersonal} /></li>
                    <li><input type="text" name="last_name" value={personal.last_name} onChange={changePersonal} /></li>
                    <li><input type="text" name="company" value={personal.company} onChange={changePersonal} /></li>
                    <li><input type="text" name="role" value={personal.role} onChange={changePersonal} /></li>
                    <li><input type="email" name="email" value={personal.email} onChange={changePersonal} /></li>
                    <li><input type="date" name="date" value={personal.date} onChange={changePersonal} /></li>
                </div>
            </section>

            <section className="subjective-answers">
                <li>
                    <h1>Do you feel valued at work?</h1>
                    <span><input type="radio" name="valued_at_work" value="Yes" onChange={changeSubjective} /><label>Yes</label></span>
                    <span><input type="radio" name="valued_at_work" value="No" onChange={changeSubjective} /><label>No</label></span>
                </li>
                <li>
                    <h1>Do you have the necessary resources to perform your job well?</h1>
                    <span><input type="radio" name="resources_available_or_not" value="Yes" onChange={changeSubjective} /><label>Yes</label></span>
                    <span><input type="radio" name="resources_available_or_not" value="No" onChange={changeSubjective} /><label>No</label></span>
                </li>
                <li>
                    <h1>Does your job cause you stress and anxiety?</h1>
                    <span><input type="radio" name="stress_anxiety" value="Yes" onChange={changeSubjective} /><label>Yes</label></span>
                    <span><input type="radio" name="stress_anxiety" value="No" onChange={changeSubjective} /><label>No</label></span>
                </li>
                <li>
                    <h1>Are sufficient efforts being made to solicit colleague opinion and feedback?</h1>
                    <span><input type="radio" name="sufficient_efforts" value="Yes" onChange={changeSubjective} /><label>Yes</label></span>
                    <span><input type="radio" name="sufficient_efforts" value="No" onChange={changeSubjective} /><label>No</label></span>
                </li>
            </section>

            <section className="miscellaneous">
                <section className="salary">
                    <h2>How would you rate your salary?</h2>
                    <li>
                        <input type="radio" name="salary" value="Very Poor" onChange={changeMiscellaneous} />
                        <label style={selectLabelStyles}>Very Poor</label>
                    </li>
                    <li>
                        <input type="radio" name="salary" value="Poor" onChange={changeMiscellaneous} />
                        <label style={selectLabelStyles}>Poor</label>
                    </li>
                    <li>
                        <input type="radio" name="salary" value="Average" onChange={changeMiscellaneous} />
                        <label style={selectLabelStyles}>Average</label>
                    </li>
                    <li>
                        <input type="radio" name="salary" value="Good" onChange={changeMiscellaneous} />
                        <label style={selectLabelStyles}>Good</label>
                    </li>
                    <li>
                        <input type="radio" name="salary" value="Excellent" onChange={changeMiscellaneous} />
                        <label style={selectLabelStyles}>Excellent</label>
                    </li>
                </section>

                <section className="job-satisfaction">
                    <h3>How satisfied are you with your job?</h3>
                    <li>
                        <input type="radio" name="job_satisfaction" value="Very satisfied" onChange={changeMiscellaneous} />
                        <label style={selectLabelStyles}>Very satisfied</label>
                    </li>
                    <li>
                        <input type="radio" name="job_satisfaction" value="Somewhat satisfied" onChange={changeMiscellaneous} />
                        <label style={selectLabelStyles}>Somewhat satisfied</label>
                    </li>
                    <li>
                        <input type="radio" name="job_satisfaction" value="Neutral" onChange={changeMiscellaneous} />
                        <label style={selectLabelStyles}>Neutral</label>
                    </li>
                    <li>
                        <input type="radio" name="job_satisfaction" value="Somewhat dissatisfied" onChange={changeMiscellaneous} />
                        <label style={selectLabelStyles}>Somewhat dissatisfied</label>
                    </li>
                    <li>
                        <input type="radio" name="job_satisfaction" value="Very dissatisfied" onChange={changeMiscellaneous} />
                        <label style={selectLabelStyles}>Very dissatisfied</label>
                    </li>
                </section>

                <section className="suggestions">
                    <h1>Anything you would like to change in your work environment?</h1>
                    <div className="option">
                        <li><input type="radio" name="want_change" value="Yes" onChange={changeMiscellaneous} /><label>Yes</label></li>
                        <li><input type="radio" name="want_change" value="No" onChange={changeMiscellaneous} /><label>No</label></li>
                    </div>
                    {miscellaneous.want_change && <div className="extra-suggestions">
                        <h1>If yes, what would you like to change?</h1>
                        <textarea name="suggestions" value={miscellaneous.suggestions} onChange={changeMiscellaneous} />
                    </div>}
                </section>
            </section>

            <Link to="/review"><button className="submit" onClick={submitInformation}>Submit</button></Link>
        </div>
    </main >
}

export default FormComponent
