import {Button, Form, Row} from 'react-bootstrap';
import Product from '../product/Product';
import styled from 'styled-components';
import useGet from '../../utils/requests/useGet';
import AsyncDataLoaderWrapper from '../appearence/AsyncDataLoaderWrapper';
import {useEffect, useState} from "react";

export default function Catalog() {
    const {data, loading} = useGet('getAllStocks');
    const [brandSearch, setBrandSearch] = useState("");


    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFilteredData(data.map(item => item).filter(product =>
            (product.product.name.toLowerCase().includes(brandSearch ? brandSearch.toLowerCase() : "")) &&
            (product.product.description.toLowerCase().includes(descriptionSearch ? descriptionSearch.toLowerCase() : "")) &&
            (maxPriceSearch && maxPriceSearch !== 0 ? product.product.price <= maxPriceSearch : true)));
    };

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
}
