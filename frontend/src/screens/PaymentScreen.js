import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';
import Header from '../components/Header';
import Footer from '../components/Footer';

function PaymentScreen({ history }) {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState(null);

    // Redirect to shipping if no address
    if (!shippingAddress.address) {
        history.push('/shipping');
    }

    // Handle submission for PayPal or Paystack
    const submitHandler = (e) => {
        e.preventDefault();
        if (paymentMethod) {
            dispatch(savePaymentMethod(paymentMethod));
            history.push('/placeorder');
        }
    };

    return (
      <div className='min-h-screen'>
        <Header/>
        <FormContainer className='w-[95%] mx-auto min-h-screen'>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler} className='h-screen'>
                <Form.Group>
                    <Form.Label as="legend">Select Payment Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="PayPal or Credit Card"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked={paymentMethod === 'PayPal'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />

                        <Form.Check
                            type="radio"
                            label="Paystack"
                            id="Paystack"
                            name="paymentMethod"
                            value="Paystack"
                            checked={paymentMethod === 'Paystack'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                {paymentMethod !==null &&
                    <Button type="submit" variant="primary" >
                    Continue
                </Button>
                }
            
            </Form>
        </FormContainer>
        <Footer/>
      </div>
    );
}

export default PaymentScreen;
