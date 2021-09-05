import React, { useState, useEffect } from 'react'
import { FormProps, JobSurveyInterface, initialSurveyState } from '../../utils'
import './Review.css'
// import { sampleData } from '../../sample'          // use only when styling

const Review: React.FC<FormProps> = ({ randomID }) => {
    // url for fetching 
    const fetchURL = `http://localhost:6969/review/${randomID}`     // comment out when styling


    // state values, one stores state of loading, other stores the recieved item
    const [loading, setLoading] = useState<boolean>(true)                                   // comment out when styling
    const [review, setReview] = useState<JobSurveyInterface>(initialSurveyState)            // comment out when styling



    // fetches data from the fetchURL  
    const getData = async () => {                                   // comment out when styling (the whole function)
        const response = await fetch(fetchURL)
        const dataRecieved = await response.json()
        setReview(dataRecieved)
        setLoading(false)
        console.log(dataRecieved)
    }

    
    useEffect(() => {                                                // comment out when styling
        getData()
        // eslint-disable-next-line
    }, [])

    // const review: JobSurveyInterface = sampleData   // used only when styling


    // Function for returning "Yes" for true and "No" for false
    const morphWantChange = (): string => {
        if (review.miscellaneous.want_change === true) {
            return "Yes"
        }
        return "No"
    }



    // render
    return <>
        {loading ? <h1>Loading...</h1> : <div className="review-container">
            <h1>Thanks for your response</h1>
            <p>These are the answers you entered</p>
            <section className="responses">
                <section className="personal-info">
                    <h1>Personal Information</h1>
                    <div className="info">
                        <li><strong>First name:</strong> {review.personal.first_name}</li>
                        <li><strong>Last name:</strong> {review.personal.last_name}</li>
                        <li><strong>Company:</strong> {review.personal.company}</li>
                        <li><strong>Role at the company:</strong> {review.personal.role}</li>
                        <li><strong>Email:</strong> {review.personal.email}</li>
                        <li><strong>Date:</strong> {review.personal.date}</li>
                    </div>
                </section>

                <section className="subjective-info">
                    <h1>Subjective Responses</h1>
                    <div className="info">
                        <li>
                            <h4 className="question">Do you feel valued at work?</h4>
                            <p className="answer">{review.subjective_answers.valued_at_work}</p>
                        </li>
                        <li>
                            <h4 className="question">Do you have the necessary resources to perform your job well? </h4>
                            <p className="answer">{review.subjective_answers.resources_available_or_not}</p>
                        </li>
                        <li>
                            <h4 className="question">Does your job cause you stress and anxiety?</h4>
                            <p className="answer">{review.subjective_answers.stress_anxiety}</p>
                        </li>
                        <li>
                            <h4 className="question">Are sufficient efforts being made to solicit colleague opinion and feedback?</h4>
                            <p className="answer">{review.subjective_answers.sufficient_efforts}</p>
                        </li>
                    </div>
                </section>
                <section className="miscellaneous-info">
                    <h1>Miscellaneous Responses</h1>
                    <div className="info">
                        <li>
                            <h4 className="question">How would you rate your salary?</h4>
                            <p className="answer">{review.miscellaneous.salary}</p>
                        </li>
                        <li>
                            <h4 className="question">How satisfied are you with your job</h4>
                            <p className="answer">{review.miscellaneous.salary}</p>
                        </li>
                        <li>
                            <h4 className="question">Anything you would like to change in your work environment?</h4>
                            <p className="answer">{morphWantChange()}</p>
                        </li>
                        {review.miscellaneous.want_change && <li>
                            <h4 className="question">If yes, what would you like to change?</h4>
                            <p className="answer">{review.miscellaneous.suggestions}</p>
                        </li>}
                    </div>
                </section>
            </section>
        </div>}
    </>
}

export default Review
