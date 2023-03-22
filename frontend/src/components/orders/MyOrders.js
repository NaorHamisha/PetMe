import useGet from "../../utils/requests/useGet";
import {useAuth} from "../../contexts/AuthContext";
import {useEffect, useState} from "react";
import {ContentWrapper} from "../home/Home";
import AsyncDataLoaderWrapper from "../appearence/AsyncDataLoaderWrapper";
import moment from "moment";
import styled from "styled-components";

export default function MyOrders() {
  const {userMetadata} = useAuth();
  const [shouldFetch, setShouldFetch] = useState(false);
  const {
        data,
        loading,
        error
      } = useGet('orders/byUserId', {userId: userMetadata?._id}, shouldFetch, setShouldFetch);
      useEffect(() => {
        if (Object.keys(userMetadata).length !== 0) {
          setShouldFetch(true);
        }
      }, [userMetadata]);
      
      
      return (<ContentWrapper>
            <AsyncDataLoaderWrapper loading={loading} text="loading cart...">
                {data && data.map(order =>
                    <OrdersWrapper>
                        <Order>
                            <OrderProducts>
                                {order.products.map(product =>
                                    <OrderProduct>
                                        <div>
                                            <Image src={product.product.image}></Image>
                                        </div>
                                        <Details>
                                            <h6>{product.product.name}</h6>
                                            <h6>{product.product.description}</h6>
                                        </Details>
                                        <Price>
                                            <h6>{product.product.price}₪</h6>
                                            <h6>X{product.quantity}</h6>
                                        </Price>
                                    </OrderProduct>
                                )}
                            </OrderProducts>
                            <OrderFooter>
                                <OrderedAt>Ordered at {moment(order.date).format('YYYY-MM-DD')}</OrderedAt>
                                <h5>Total: {order.total}₪</h5>
                            </OrderFooter>
                        </Order>
                    </OrdersWrapper>
                )}
            </AsyncDataLoaderWrapper>
        </ContentWrapper>
    );
  }
  export const nn = 1;

  const Details = styled.div`
  width: fit-content;
  margin: 0 0 1em 2em;
  max-height: 50px;
`;

const Price = styled.h5`
  margin-left: auto;
  margin-top: auto;
  text-align: end;
`;

const OrderedAt = styled.h6`
  background-color: #FFDA29;
  border-radius: 6px;
`;

const Image = styled.img`
  height: 100%;
`;
const OrderProduct = styled.div`
  height: 5rem;
  display: flex;
  margin: 5em 0 0 0;
`;

const OrderProducts = styled.div`
  margin: 0 4em 0 4em;
`;

const Order = styled.div`
  border-bottom: 1px solid #abb9be;
`;

const OrdersWrapper = styled.div`
  margin: 2rem 30rem 2rem 30rem;
  border-style: groove;
`;

const OrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1em 0 1em 0;
`;
