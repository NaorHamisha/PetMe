import {ContentWrapper} from "../home/Home";
import styled from "styled-components";
import {Button, Row, Col} from "react-bootstrap";
import {useEffect, useMemo, useState} from "react";
import useGet from "../../utils/requests/useGet";
import {useAuth} from "../../contexts/AuthContext";
import AsyncDataLoaderWrapper from "../appearence/AsyncDataLoaderWrapper";
import usePost from "../../utils/requests/usePost";


export default function Cart() {
  const {userMetadata} = useAuth();
  const [shouldFetch, setShouldFetch] = useState(false);
  const {data, loading} = useGet(`carts/getCartById`, {id: userMetadata?._id}, shouldFetch, setShouldFetch);
  const [productId, setProductId] = useState()
  const [shouldIncrease, setShouldIncrease] = useState(false);
  usePost('carts/addProduct', {
      userId: userMetadata?._id,
      productId: productId
  }, shouldIncrease, setShouldIncrease, () => setShouldFetch(true))
  const [shouldDecrease, setShouldDecrease] = useState(false);
  usePost('carts/removeProductFromCart', {
      userId: userMetadata?._id,
      productId: productId
  }, shouldDecrease, setShouldDecrease, () => setShouldFetch(true));

  const [shouldEmptyCart, setShouldEmptyCart] = useState(false);
  usePost('carts/emptyCart', {
      userId: userMetadata?._id
  }, shouldEmptyCart, setShouldEmptyCart, () => setShouldFetch(true))
  const [order, setOrder] = useState({});
  const [shouldCreateOrder, setShouldCreateOrder] = useState(false);
  usePost('orders', order, shouldCreateOrder, setShouldCreateOrder, () => setShouldEmptyCart(true));
  const totalPrice = useMemo(() => data?.products?.map(p => p.product.price * p.quantity).reduce((a, b) => a + b, 0), [data]);
  useEffect(() => {
    if (Object.keys(userMetadata).length !== 0) {
        setShouldFetch(true);
    }
  }, [userMetadata]);

  useEffect(() => {
      if (!shouldFetch) {
          setShouldFetch(false);
      }
  }, [shouldFetch]);

  const decreaseQuantity = (id) => {
    setProductId(id);
    setShouldDecrease(true);
  }

  const increaseQuantity = (id) => {
    setProductId(id);
    setShouldIncrease(true);
  }

  const emptyCart = () => {
    setShouldEmptyCart(true);
  }

const orderCart = () => {
  setOrder({
      user: data.user,
      products: data.products,
      date: Date.now(),
      total: totalPrice
  });
  setShouldCreateOrder(true);
}

    return (
        <ContentWrapper>
          <AsyncDataLoaderWrapper loading={loading} text="loading cart...">
              <CartWrapper>
                  {data && data.products?.map(p =>
                      <CartProduct>
                          <div>
                            <Image src={p.product.image}></Image>
                          </div>
                          <Details>
                              <h4>{p.product.name}</h4>
                              <h6>{p.product.description}</h6>
                              <div>
                                    <Button onClick={() => decreaseQuantity(p.product._id)}
                                            variant="info">-</Button>{' '}
                                    <Button variant="outline-dark" disabled>{p.quantity}</Button>{' '}
                                    <Button variant="warning" onClick={() => increaseQuantity(p.product._id)}>+</Button>
                              </div>
                          </Details>
                          <Price>{p.product.price}₪</Price>
                      </CartProduct>
                  )}
                  {data?.products?.length === 0 && <div><h2 style={{color: 'orange'}}>The cart is empty now. <br/>
                  Let's feed our friends!!</h2></div>}
                  {data && data.products?.length !== 0 &&
                        <CartFooter>
                          <Row>
                            
                            <Price>Total: {totalPrice}₪</Price>
                          </Row>
                          <Row>
                            <Col>
                            
                            <EmptyCartButton variant="warning" onClick={() => emptyCart()}>Empty
                                Cart</EmptyCartButton>
                            </Col>
                            <Col>
                            <OrderNowButton variant="primary" onClick={() => orderCart()}>Order
                                Now</OrderNowButton>
                            </Col>
                          </Row>
                        </CartFooter>
                    }
              </CartWrapper>
            </AsyncDataLoaderWrapper>
        </ContentWrapper>
    );
}

const EmptyCartButton = styled(Button)`
  margin-right: auto;
`;


const OrderNowButton = styled(Button)`
  display: flex;
`;

const Details = styled.div`
  width: fit-content;
  margin: 2em 0 1em 2em;
`;

const Price = styled.h5`
  margin-left: auto;
  margin-top: auto;
`;

const CartFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 2rm;
  padding-top: 50px;
`;

const CartWrapper = styled.div`
  margin: 2rem 30rem 2rem 30rem;
`;

const Image = styled.img`
  height: 100%;
`;

const CartProduct = styled.div`
  border-bottom: 1px solid #abb9be;
  height: 10rem;
  display: flex;
  padding: 30px;
`;


