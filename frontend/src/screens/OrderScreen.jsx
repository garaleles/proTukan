import { Link, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from '../slices/ordersApiSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (order && order.isPaid) {
      toast.success('Siparişiniz Ödendi');
    }
  }, [order]);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Sipariş - {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Teslimat Adresi</h2>
              <p>
                <strong>Adres: </strong>
                {order.shippingAddress.address},{order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Teslim Edildi {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Teslim Edilmedi</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Ödeme Yöntemi</h2>
              <p>
                <strong>Yöntem: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Ödendi {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Ödenmedi</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Sipariş Ürünleri</h2>
              {order.orderItems.length === 0 ? (
                <Message>Siparişiniz Yok.</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} TL = {item.qty * item.price}{' '}
                          TL
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
                  <Col>{order.itemsPrice} TL</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Kargo</Col>
                  <Col>{order.shippingPrice} TL</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Vergi</Col>
                  <Col>{order.taxPrice} TL</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Toplam</Col>
                  <Col>{order.totalPrice} TL</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {order.paymentMethod === 'KrediKarti' ? (
                    <Button type='button' className='btn btn-block'>
                      Kredi Kartı ile Öde
                    </Button>
                  ) : (
                    <Button type='button' className='btn btn-block'>
                      Kredi Kartı ile Öde
                    </Button>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
