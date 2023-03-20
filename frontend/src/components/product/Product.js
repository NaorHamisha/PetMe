import Card from 'react-bootstrap/Card';
import styled from "styled-components";
import {Col} from "react-bootstrap";
import {useEffect, useState} from "react";
import auth from "../../config/Firebase";
import {io} from "socket.io-client";
import useGet from "../../utils/requests/useGet";
import usePost from "../../utils/requests/usePost";
import {useAuth} from "../../contexts/AuthContext";
import AsyncDataLoaderWrapper from "../appearence/AsyncDataLoaderWrapper";

export default function Product(
    {product, quantity}
) {
  const [productQuantity, setProductQuantity] = useState(quantity);
  const {userMetadata} = useAuth();
  const [shouldFetch, setShouldFetch] = useState(false);
  const {data, loading, error} = usePost('addProductToCart', {
        userId: userMetadata?._id,
        productId: product._id
    }, shouldFetch, setShouldFetch)

  useEffect(() => {
      (async function() {
          const user = auth.currentUser;
          const token = user && (await user.getIdToken());
          const socket = io('http://localhost:3002', {
              "force new connection" : true,
              transports : ['websocket'],
              extraHeaders: {
                  Authorization: `Bearer ${token}`,
              }
          });
          socket.on("connect", () => {
              console.log(socket.id);
          });
          socket.on('connect_error', ()=> {
              setTimeout(() => socket.connect(), 5000);
          });
          socket.on('stockUpdated-' + product._id, (data) => {
              console.log(data);
              setProductQuantity(data.newStock.quantity);
          });
      })()
  }, [])

    const addToCart = () => {
        setShouldFetch(true);
    };

    return (
        <Col>
            <CardWithHover>
                <Card.Img variant="top" src={product.image}/>
                <AddToCartHover>
                    <AsyncDataLoaderWrapper loading={loading} text='adding item to cart...'>
                        <AddToCart onClick={addToCart}><b>+</b> Add to Cart </AddToCart>
                    </AsyncDataLoaderWrapper>
                </AddToCartHover>
                <CardBody style={{backgroundColor: 'beige'}}>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Subtitle>
                        <div>{product.price} ₪</div>
                        <div>({productQuantity} left)</div>
                    </Subtitle>
                </CardBody>
            </CardWithHover>
        </Col>
    );
}

const CardBody = styled(Card.Body)`
  width: 100%;
`;

const Subtitle = styled(Card.Subtitle)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const AddToCart = styled.div`
  cursor: pointer;
  height: fit-content;
  width: fit-content;
  padding: 1rem 1rem 1rem 1rem;
  background: rgba(33, 37, 41, 0.76);
  color: #FFFFFF;
`;
const AddToCartHover = styled.div`
  visibility: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  display: flex;
  transition: opacity .2s, visibility .2s;
`;

const CardWithHover = styled(Card)`
  align-items: start;
  border: 0;

  &:hover ${AddToCartHover} {
    visibility: visible;
    opacity: 1;
  }
`;
