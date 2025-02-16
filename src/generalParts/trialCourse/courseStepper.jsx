"use client"

import * as React from "react"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepButton from "@mui/material/StepButton"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import CreateCourseForm from "./createForm"

const steps = ["Add Course Details", "Add Lessons And Sections", "Review"]

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [completed, setCompleted] = React.useState({})

  const totalSteps = () => {
    return steps.length
  }

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  }

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1
    setActiveStep(newActiveStep)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStep = (step) => () => {
    setActiveStep(step)
  }

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    })
    handleNext()
  }

  const handleReset = () => {
    setActiveStep(0)
    setCompleted({})
  }

  return (
    <Box className="flex flex-col justify-start bg-slate-100 min-h-screen w-full p-4 md:p-8">
      <Box className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-4 md:p-6 flex flex-col h-full">
        <Stepper nonLinear activeStep={activeStep} className="mb-6 bg-yellow-100 p-4 rounded-lg" alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        <Box className="flex-grow flex flex-col items-center justify-start overflow-y-auto">
          {allStepsCompleted() ? (
            <Box className="text-center">
              <Typography className="mt-2 mb-4">All steps completed - you're finished</Typography>
              <Button onClick={handleReset} variant="contained" color="primary">
                Reset
              </Button>
            </Box>
          ) : (
            <Box className="w-full flex flex-col items-center">
              {activeStep === 0 && <CreateCourseForm />}

              <Box className="w-full flex justify-between items-center mt-6 ">
                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                  Back
                </Button>
                <Box className={"flex gap-3"}>
                  <Button onClick={handleNext} className="mr-2" variant="contained" color="primary" >
                    Next
                  </Button>
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography variant="caption" className="ml-2">
                        Step {activeStep + 1} already completed
                      </Typography>
                    ) : (
                      <Button onClick={handleComplete} variant="contained" color="secondary" className="">
                        {completedSteps() === totalSteps() - 1 ? "Finish" : "Complete Step"}
                      </Button>
                    ))}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

