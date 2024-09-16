import React, { useState, useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import { PaystackButton } from 'react-paystack'; // Import PaystackButton
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';
import Header from '../components/Header';
import Footer from '../components/Footer';

function OrderScreen({ match, history }) {
    const orderId = match.params.id;
    const dispatch = useDispatch();

    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, error, loading } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    }

    const addPayPalScript = () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}`; // Use environment variable
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        }

        if (!order || successPay || order._id !== Number(orderId) || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid && order.paymentMethod === 'PayPal') {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, order, orderId, successPay, successDeliver, history, userInfo]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    };
    // const getFormattedDate = (dateString) => {
    //     const date = new Date(dateString);
    
    //     // Subtract 1 hour from the UTC time
    //     const correctedDate = new Date(date.getTime() - 60 * 60 * 1000); // Subtract 1 hour
    
    //     const getOrdinalSuffix = (day) => {
    //         if (day > 3 && day < 21) return "th";
    //         switch (day % 10) {
    //             case 1: return "st";
    //             case 2: return "nd";
    //             case 3: return "rd";
    //             default: return "th";
    //         }
    //     };
    
    //     const day = correctedDate.getDate();
    //     const ordinalDay = day + getOrdinalSuffix(day);
    //     const month = correctedDate.toLocaleString("default", { month: "long" });
    //     const year = correctedDate.getFullYear();
    
    //     // Format time as 12-hour clock
    //     const time = correctedDate.toLocaleString("en-US", {
    //         hour: "2-digit",
    //         minute: "2-digit",
    //         hour12: true,
    //     });
    
    //     return `${ordinalDay} ${month}, ${year} : ${time}`;
    // };
    
    const getFormattedDate = (dateString) => {
        const date = new Date(dateString);
    
        const getOrdinalSuffix = (day) => {
            if (day > 3 && day < 21) return "th";
            switch (day % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        };
    
        const day = date.getDate();
        const ordinalDay = day + getOrdinalSuffix(day);
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
    
        // Adjust the time to your local time zone (system's local time zone)
        const time = date.toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    
        return `${ordinalDay} ${month}, ${year} : ${time}`;
    };
    
    
    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <Header/>
            <div className='w-[95%] mx-auto'>
            <h1>Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Shipping: </strong>
                                {order?.shippingAddress?.address},  {order?.shippingAddress?.city}
                                {'  '}
                                {order?.shippingAddress?.postalCode},
                                {'  '}
                                {order?.shippingAddress?.country}
                            </p>

                            {order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
    <Message variant='success'>
        Paid on {getFormattedDate(order.paidAt)}
    </Message>
) : (
    <Message variant='warning'>Not Paid</Message>
)}

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message variant='info'>Order is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} X ₦{item.price} = ₦{(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card >
                        <ListGroup variant='flush' >
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row className='justify-between'>
                                    <Col>Items:</Col>
                                    <Col className='text-right'>₦{order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row className='justify-between'>
                                    <Col>Shipping:</Col>
                                    <Col className='text-right'>₦{order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row className='justify-between'>
                                    <Col>Tax:</Col>
                                    <Col className='text-right'>₦{order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row className='justify-between'>
                                    <Col>Total:</Col>
                                    <Col className='text-right'>₦{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}

                                    {order.paymentMethod === 'PayPal'  ? (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    ) : null}

                                    {order.paymentMethod === 'Paystack' && (
                                        <PaystackButton
                                            email='oguntoyeadebola21@gmail.com' // Replace with dynamic email if available
                                            amount={order.totalPrice * 100} // Paystack accepts amount in kobo (smallest unit)
                                            publicKey={process.env.REACT_APP_PAYSTACK_PUBLIC_KEY}
                                            text="Pay with Paystack"
                                            onSuccess={successPaymentHandler}
                                            onClose={() => console.log('Payment closed')}
                                            className='btn-block bg-red-500 text-white py-2'
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn btn-block'
                                    onClick={deliverHandler}
                                >
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
            <Footer/>
        </div>
      
    );
}

export default OrderScreen;
