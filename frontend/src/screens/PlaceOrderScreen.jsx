import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import {toast} from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {useCreateOrderMutation} from '../slices/ordersApiSlice';
import {clearCartItems} from '../slices/cartSlice';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const {shippingAddress, paymentMethod, cartItems} = cart;


    useEffect(() => {
        if(!paymentMethod){
            navigate('/payment');
        }else if(!shippingAddress){
            navigate('/shipping');
        }

    }, [navigate, shippingAddress, paymentMethod]);

    const dispatch = useDispatch();
    const [createOrder, {isLoading, error}] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress ,navigate]);

    const placeOrderHandler =async () => {
         try {
           const res= await createOrder({
                orderItems: cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
           }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
         } catch (error) {
                toast.error(error.message);
         }
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Adres</h2>
                            <p>
                                <strong>Adres: </strong>
                                {shippingAddress.address}, {shippingAddress.city}{' '}
                                {shippingAddress.postalCode},{' '}
                                {shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Ödeme Yöntemi</h2>
                            <strong>Yöntem: </strong>
                            {paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Sipariş Özeti</h2>
                            {cartItems.length === 0 ? (
                                <Message>Sepetiniz boş</Message>
                            ) : (
                            <ListGroup variant='flush'>
                                {cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={2}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fluid
                                                    rounded
                                                />
                                            </Col>
                                            <Col>
                                                <Link
                                                    to={`/product/${item.product}`}
                                                >
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x {item.price} ={' '}
                                                {item.qty * item.price} TL
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
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Sipariş Özeti</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Ürünler</Col>
                                    <Col>{cart.itemsPrice} TL</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Kargo</Col>
                                    <Col>{cart.shippingPrice} TL</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Vergi</Col>
                                    <Col>{cart.taxPrice} TL</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Toplam</Col>
                                    <Col>{cart.totalPrice} TL</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Siparişi Ver
                                </Button>
                                {isLoading && <Loader />}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>

            </Row>


        </>
     );

}

export default PlaceOrderScreen;