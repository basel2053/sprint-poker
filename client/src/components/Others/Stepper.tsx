import {
  Box,
  Stepper,
  Step,
  StepSeparator,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepTitle,
  StepNumber,
  StepDescription,
} from '@chakra-ui/react';

interface Step {
  title: string;
  description: string;
}

interface FormStepperProps {
  steps: Step[];
  activeStep: number;
}

export const FormStepper: React.FC<FormStepperProps> = ({ steps, activeStep }) => {
  return (
    <Stepper index={activeStep} colorScheme="teal">
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};
