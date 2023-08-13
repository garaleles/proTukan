import {useState} from 'react'
import { Form, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {saveShippingAddress} from '../slices/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress?.address ||'')
    const [city, setCity] = useState(shippingAddress?.city ||'')
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode ||'')
    const [country, setCountry] = useState(shippingAddress?.country ||'')

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
    }


    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Teslimat Bilgileri</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address' classname='my-2'>
                    <Form.Label>Adres</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Adresinizi giriniz'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='city' classname='my-2'>
                    <Form.Label>Şehir</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Şehir giriniz'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode' classname='my-2'>
                    <Form.Label>Posta Kodu</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Posta kodu giriniz'
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='country' classname='my-2'>
                    <Form.Label>Ülke</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ülke giriniz'
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-3'>
                    Devam Et
                </Button>

            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
