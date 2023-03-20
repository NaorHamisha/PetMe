import {Card} from "react-bootstrap";
import styled from "styled-components";
import useGet from "../../utils/requests/useGet";

export default function OrdersByUsers() {
    const {data, loading, error} = useGet('getOrdersByUser');
    console.log(data);
    return (
        <Card className="align-items-baseline">
            <Body>
                <Card.Title>Orders By Users</Card.Title>
                <ItemsWrapper>
                    {data && data.map(item =>
                        <Item>
                            <OrderInfo>
                                <h3>{item.user}</h3>
                                <div>id: {item.userId}</div>
                                <div>email: {item.userMail}</div>
                            </OrderInfo>
                            <OrdersAmount>Orders Amount: {item.orderCount}</OrdersAmount>
                        </Item>
                    )}
                </ItemsWrapper>
            </Body>
        </Card>);
}
const OrderInfo = styled.div`
  margin: 1em 1em 1em 1em;
  width: 30em;
`;

const OrdersAmount = styled.h4`
  margin: 1em 1em 1em 1em;
`;

const Item = styled.div`
  margin: 1em 1em 1em 1em;
  display: flex;
  border-bottom: 1px solid #abb9be;
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2em 0 2em;
`;

const Body = styled(Card.Body)`
  width: 100%;
`;
