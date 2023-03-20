import {useAuth} from "../../contexts/AuthContext";
import {useEffect, useState} from "react";
import useGet from "../../utils/requests/useGet";
import {ContentWrapper} from "../home/Home";
import AsyncDataLoaderWrapper from "../appearence/AsyncDataLoaderWrapper";
import moment from "moment/moment";
import styled from "styled-components";
import {Card} from "react-bootstrap";
import {SearchButton, SearchContainer, SearchForm, SearchInput} from "../home/Catalog";

export default function OrdersView() {
    const {
        data,
        loading,
        error
    } = useGet('getAllOrders');

    const [orderedBySearch, setOrderedBySearch] = useState("");
    const [minProductsSearch, setMinProductsSearch] = useState("");
    const [minOrderPriceSearch, setMinOrderPriceSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFilteredData(data.filter(order =>
            (order.user.name.toLowerCase().includes(orderedBySearch ? orderedBySearch.toLowerCase() : "")) &&
            (minProductsSearch ? order.products.length >= minProductsSearch : true) &&
            (minOrderPriceSearch ? order.total >= minOrderPriceSearch : true)));
    };

    return (
        <Card className="align-items-center">
            <Body>
                <Card.Title>All Orders</Card.Title>
                <SearchContainer>
                    <SearchForm onSubmit={handleFormSubmit}>
                        <SearchInput className="form-control"
                                     type="text"
                                     placeholder="Ordered By..."
                                     value={orderedBySearch}
                                     onChange={(e) => setOrderedBySearch(e.target.value)}/>
                        <SearchInput className="form-control"
                                     type="number"
                                     placeholder="Minimum Products Per Order..."
                                     value={minProductsSearch}
                                     onChange={(e) => setMinProductsSearch(e.target.value)}/>
                        <SearchInput className="form-control"
                                     type="number"
                                     placeholder="Minimum Order Price..."
                                     value={minOrderPriceSearch}
                                     onChange={(e) => setMinOrderPriceSearch(e.target.value)}/>
                        <SearchButton type='submit' variant="info">Search</SearchButton>
                    </SearchForm>
                </SearchContainer>
                <AsyncDataLoaderWrapper loading={loading} text="loading orders...">
                    {filteredData && filteredData.map(order =>
                        <OrdersWrapper>
                            <Order>
                                <OrderHeader>
                                    <h5>Ordered by: {order.user.name}, {order.user.mail}, {order.user.address}</h5>
                                </OrderHeader>
                                <OrderProducts>
                                    {order.products.map(product =>
                                        <OrderProduct>
                                            <div>
                                                <Image src={product.product.image}></Image>
                                            </div>
                                            <Details>
                                                <h6>{product.product.name}</h6>
                                                <h7>{product.product.description}</h7>
                                            </Details>
                                            <Price>
                                                <h6>{product.product.price}₪</h6>
                                                <h6>X{product.quantity}</h6>
                                            </Price>
                                        </OrderProduct>
                                    )}
                                </OrderProducts>
                                <OrderFooter>
                                    <h6>Ordered at {moment(order.date).format('YYYY-MM-DD')}</h6>
                                    <h5>Total: {order.total}₪</h5>
                                </OrderFooter>
                            </Order>
                        </OrdersWrapper>
                    )}
                </AsyncDataLoaderWrapper>
            </Body>
        </Card>
    );
}
const OrderHeader = styled.div`
`;

const Body = styled(Card.Body)`
  width: 100%;
`;
const Details = styled.div`
  width: fit-content;
  margin: 0 0 1em 2em;
`;

const Price = styled.h5`
  margin-left: auto;
  margin-top: auto;
  text-align: end;
`;

const Image = styled.img`
  height: 100%;
`;
const OrderProduct = styled.div`
  height: 5rem;
  display: flex;
  margin: 1em 0 0 0;
`;

const OrderProducts = styled.div`
  margin: 0 4em 0 4em;
`;

const Order = styled.div`
  border-bottom: 1px solid #abb9be;
`;

const OrdersWrapper = styled.div`
  margin: 2rem;
`;

const OrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1em 0 1em 0;
`;
