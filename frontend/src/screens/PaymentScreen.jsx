import React from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'


function PaymentScreen() {
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h2>Payment</h2>
    </FormContainer>
  )
}

export default PaymentScreen