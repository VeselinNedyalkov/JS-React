import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];


function App() {
  //this need to be here and always change state by using set'name')!!!!
  //use state only when you need to rerander information
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    //always use call back func when updating data
    step > 1 ? setStep((s) => s - 1) : setStep(1);
  }

  function handleNext() {
    step < 3 ? setStep((s) => s + 1) : setStep(3);
  }


  return (
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>&times;</button>

      {isOpen &&
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}> 3</div >
          </div >

          <StepMessage step={step}>
            {messages[step - 1]}
          </StepMessage>

          <div className="buttons">
            <Button bgColor='#7950f2' textColor="#fff"
              onClick={handlePrevious} > <span>👈</span> Previous </Button>
            <Button bgColor='#7950f2' textColor="#fff"
              onClick={handleNext} > Previous <span>👉</span></Button>
          </div>
        </div>
      }
    </>
  )
}

function StepMessage({ step, children }) {
  return (<div className="message">
    <h3>Step {step}</h3>
    : {children}
  </div>)
}

function Button({ textColor, bgColor, onClick, children }) {
  return <button
    style={{ backgroundColor: bgColor, color: textColor }}
    onClick={onClick} >
    {children}
  </button>
}

export default App;
