import React, {useEffect, useState} from "react";
import SalesGraph from './SalesGraph';
import StockManagement from './StockManagement';
import OrdersView from "./OrdersView";
import styled from "styled-components";
import {Col, Row} from "react-bootstrap";
import {ContentWrapper} from "../home/Home";
import OrdersByUsers from "./OrdersByUsers";

export default function Management({liveUsersAomunt}) {
  const [liveUsers, setLiveUsers] = useState();

  useEffect(() => {
    setLiveUsers(liveUsersAomunt)
  });
  
    return (
        <ContentWrapper>
            <ManagementContainer xs={1} md={1} className="g-xxl-4">
                <Col>
                    <Wrapper>
                      <LiveUsersTitle>

                          Amount of live connected user: {liveUsers} 
                      </LiveUsersTitle>
                    </Wrapper>
                </Col>
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
  text-align: center;
`;

const LiveUsersTitle = styled.h4`
  color: brown;
  background-color: #FFDA29;
  border-radius: 6px;
`;