import SalesGraph from './SalesGraph';
import StockManagement from './StockManagement';
import OrdersView from "./OrdersView";
import styled from "styled-components";
import {Col, Row} from "react-bootstrap";
import {ContentWrapper} from "../home/Home";
import OrdersByUsers from "./OrdersByUsers";

export default function Management() {
    return (
        <ContentWrapper>
            <ManagementContainer xs={1} md={1} className="g-xxl-4">
                <Col><StockManagement/></Col>
                <Col><OrdersByUsers/></Col>
                <Col><SalesGraph/></Col>
                <Col><OrdersView/></Col>
            </ManagementContainer>
        </ContentWrapper>
    );
}

const ManagementContainer = styled(Row)`
  margin: 2em 10em 2em 10em;
`;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;