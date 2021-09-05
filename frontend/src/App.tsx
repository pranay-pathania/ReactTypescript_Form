import React from 'react'
import FormComponent from './components/FormComponent/FormComponent'
import Review from './components/Review/Review'
import { BrowserRouter, Route } from 'react-router-dom'
import { randomisedReferenceID } from './utils'
import './App.css'

const randomID = randomisedReferenceID()

const App: React.FC = () => {
  return <BrowserRouter>
    {/* route fot the form component */}
    <Route path="/" exact>
      <FormComponent randomID={randomID}/>
    </Route>
    
    {/* route for viewing data after submission */}
    <Route path="/review" exact>
      <Review randomID={randomID}/>
    </Route>

  </BrowserRouter>
}

export default App
