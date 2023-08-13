import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
      <FormContainer>
        <h1>Giriş Yap</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className='my-2' controlId='email'>
            <Form.Label>E-Posta Adresi</Form.Label>
            <Form.Control
                type='email'
                placeholder='E-Posta Adresinizi Giriniz'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='password'>
            <Form.Label>Şifre</Form.Label>
            <Form.Control
                type='password'
                placeholder='Şifrenizi Giriniz'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button disabled={isLoading} type='submit' variant='primary'>
            Giriş Yap
          </Button>

          {isLoading && <Loader />}
        </Form>

        <Row className='py-3'>
          <Col>
            Henüz kayıtlı değil misiniz?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Kayıt Ol
            </Link>
          </Col>
        </Row>
      </FormContainer>
  );
};
export default LoginScreen;
