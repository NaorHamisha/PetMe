import {Button, Form, Row, Modal} from 'react-bootstrap';
import Product from '../product/Product';
import styled from 'styled-components';
import useGet from '../../utils/requests/useGet';
import AsyncDataLoaderWrapper from '../appearence/AsyncDataLoaderWrapper';
import {useEffect, useState} from "react";


export default function Catalog() {
    const {data, loading} = useGet('getAllStocks');
    const [brandSearch, setBrandSearch] = useState("");
    const [descriptionSearch, setDescriptionSearch] = useState("");
    const [maxPriceSearch, setMaxPriceSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


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
        <AsyncDataLoaderWrapper loading={loading} text="Loading products...">
            <CatalogContainer>
            <FilterButton variant="warning" onClick={handleShow}>
                Use me for filter <i class="bi bi-funnel"></i>
            </FilterButton>
                  
                <Row xs={1} md={4} className="g-5">
                    {filteredData && filteredData.map((stock) => (
                        <Product key={stock.product._id} product={stock.product} quantity={stock.quantity}/>
                    ))}
                </Row>
            </CatalogContainer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filtering options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
                    <Form onSubmit={handleFormSubmit}>

                        <SearchInput className="form-control"
                                     type="text"
                                     placeholder="Brand..."
                                     value={brandSearch}
                                     onChange={(e) => setBrandSearch(e.target.value)}/>

                        <SearchInput className="form-control"
                                     type="text"
                                     placeholder="Description..."
                                     value={descriptionSearch}
                                     onChange={(e) => setDescriptionSearch(e.target.value)}/>
                        <SearchInput className="form-control"
                                     type="number"
                                     id=""
                                     placeholder="Max Price"
                                     value={maxPriceSearch}
                                     onChange={(e) => setMaxPriceSearch(e.target.value)}/>
                        <Button type='submit' variant="warning" onClick={handleClose}>Search</Button>

                    </Form>
                      </Row>

        </Modal.Body>
      </Modal>
        </AsyncDataLoaderWrapper>
    );
}

export const SearchInput = styled.input`
  // width: 20rem;
  // margin: 1em 2em 1em 2em;
  margin-bottom: 20px;
`;

export const SearchForm = styled(Form)`
  display: flex;
  `;
  
  export const SearchButton = styled(Button)`
  width: 20rem;
  margin: 1em 0 1em auto;
  `;
  
  export const SearchContainer = styled(Row)`
  margin: 1em 10em 1em 0;
`;
  export const FilterButton = styled(Button)`
  margin: 30px;
`;

const CatalogContainer = styled.div`
  margin: 0 13rem 0 13rem;
`;
