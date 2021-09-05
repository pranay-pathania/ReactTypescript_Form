/* GENERATES A RANDOM CODE FOR ACCESSING USER'S ANSWERS AFTER SUBMISSION */
export const randomisedReferenceID = (): string => {
    const hex: string = "0123456789abcdef"
    const reqLength: number = 10
    let returnID: string = ""
    for (let i: number = 0; i < reqLength; i++) {
        returnID += (hex.substr(Math.floor(Math.random() * (hex.length)), 1))
    }
    return returnID
}

/* PROPS FOR FORM COMPONENT AND REVIEW*/
export interface FormProps {
    randomID: string
}

/* INTERFACES FOR VARIOUS INPUTS RECIEVED FROM USER */

//for inputs from section: personal
export interface PersonalInterface {
    first_name: string,
    last_name: string,
    email: string,
    date: string,
    company: string,
    role: string
}

//for inputs from section: subjective
export interface SubjectiveInterface {
    valued_at_work: string,
    resources_available_or_not: string,
    stress_anxiety: string,
    sufficient_efforts: string,
}

//for inputs from section: miscellaneous
export interface MiscellaneousInterface {
    job_satisfaction: string,
    salary: string,
    want_change: boolean,
    suggestions: string,
}

//final input format
export interface JobSurveyInterface {
    personal: PersonalInterface,
    subjective_answers: SubjectiveInterface,
    miscellaneous: MiscellaneousInterface,
    randomID: string
}


/* ALL INITIAL INPUT STATE VALUES */

//for inputs from section: personal
export const initialPersonal: PersonalInterface = {
    first_name: '',
    last_name: '',
    email: '',
    date: '',
    company: '',
    role: ''
}

//for inputs from section: subjective
export const initialSubjective: SubjectiveInterface = {
    valued_at_work: '',
    resources_available_or_not: '',
    stress_anxiety: '',
    sufficient_efforts: '',
}

//for inputs from section: miscellaneous
export const initialMiscellaneous: MiscellaneousInterface = {
    job_satisfaction: '',
    salary: '',
    suggestions: '',
    want_change: false,
}

//final input initial state
export const initialSurveyState: JobSurveyInterface = {
    personal: initialPersonal,
    subjective_answers: initialSubjective,
    miscellaneous: initialMiscellaneous,
    randomID: ''
}
