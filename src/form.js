import React, { useState } from 'react'
import './style/form.css'

const INITIAL_STATE = {
    name: "",
    email: "",
    subject: "",
    message: "",
  }
  
 
const VALIDATION = {
  name: [
    {
      isValid: (value) => !!value,
      message: 'This field is required.'
    },  
  ],
  email: [
    {
      isValid: (value) => !!value,
      message: 'This field is required.',
    },
    {
      isValid: (value) => /\S+@\S+\.\S+/.test(value),
      message: 'Invalid email.',
    },
  ],
  message: [
    {
      isValid: (value) => !!value,
      message: 'This field is required.',
    },
  ],
};

const getErrorFields = (form) =>
  Object.keys(form).reduce((acc, key) => {
    if (!VALIDATION[key]) return acc;

    const errorsPerField = VALIDATION[key]
      // get a list of potential errors for each field
      // by running through all the checks
      .map((validation) => ({
        isValid: validation.isValid(form[key]),
        message: validation.message,
      }))
      // only keep the errors
      .filter((errorPerField) => !errorPerField.isValid);

    return { ...acc, [key]: errorsPerField };
  }, {});

const Form = (props) => {
  
  const [form, setForm] = useState(INITIAL_STATE)
  const resultMessage = document.getElementById("message")
  const errorFields = getErrorFields(form);
  
  const handleChange = (e) => {
    const updatedForm = {...form, [e.target.id]: e.target.value}
    setForm(updatedForm)
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    
    try {
      let res = await fetch("https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries", {
        method: "POST",
        body: JSON.stringify({
          form
        }),
      });
      if (res.status === 200 || res.status === 201) {
        resultMessage.innerHTML = "Submission was successful"
        setInterval(() => resultMessage.innerHTML = "", 1000)
      } else {
        resultMessage.innerHTML = "Submission failed"
        setInterval(() => resultMessage.innerHTML = "", 1000)
      }
    } catch (err) {
      alert(err);
    }
    const hasErrors = Object.values(errorFields).flat().length > 0;
    if (hasErrors) return;

    props.submitForm(form)
    setForm(INITIAL_STATE)
  
  };
    
    
  return(
    <form onSubmit={handleSubmit}>
      <h4 id="message"> </h4>
      <h1>Contact-Us</h1>
      <div className="item">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" placeholder="Enter your name" value={form.name} onChange={handleChange}/>
        {errorFields.name?.length ? (
        <span style={{ color: 'red' }}>{errorFields.name[0].message}</span>) : null}
      </div>
      
      <div className="item">
        <label htmlFor="email">Email</label>
        <input id="email" type="text" placeholder="Enter your email" value={form.email} onChange={handleChange}/>
        {errorFields.email?.length ? (
        <span style={{ color: 'red' }}>{errorFields.email[0].message}</span>) : null}
      </div>
      
      <div className="item">
        <label htmlFor="subject">Subject</label>
        <input id="subject" type="text" placeholder="Enter your subject" value={form.subject} onChange={handleChange}/>
      </div>
      
      <div className="item">
        <label htmlFor="message">Message</label>
        <textarea id="message" placeholder="Enter your message" value={form.message} onChange={handleChange}/>
        {errorFields.message?.length ? (
        <span style={{ color: 'red' }}>{errorFields.message[0].message}</span>) : null}
      </div>
      
      <button type="submit">Submit</button>
    </form>  
  )
}

export default Form