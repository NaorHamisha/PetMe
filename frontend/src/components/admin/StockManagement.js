import {useEffect, useState} from 'react';
import {Card} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components';
import useGet from '../../utils/requests/useGet';
import usePut from '../../utils/requests/usePut';
import AsyncDataLoaderWrapper from '../appearence/AsyncDataLoaderWrapper';

export default function StockManagement() {
    const [spinnerText, setSpinnerText] = useState('Loading stock...');
    const [selectedStock, setSelectedStock] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [shouldFetchPutData, setShouldFetchPutData] = useState(false);
    const [shouldFetchGetData, setShouldFetchGetData] = useState(true);
    const {data, loading} = useGet(
        'getAllStocks',
        {},
        shouldFetchGetData,
        setShouldFetchGetData
    );

    usePut(
        'updateStockByProductId',
        {
            product: selectedStock?.product._id,
            quantity: parseInt(selectedQuantity),
        },
        shouldFetchPutData,
        setShouldFetchPutData
    );

    const handleProductChosen = (stock) => {
        setSelectedStock(stock);
        setSelectedQuantity(stock.quantity);
    };

    const handleQuantityChange = (quantity) => {
        setSelectedQuantity(quantity);
    };

    const handleSave = () => {
        setSpinnerText('Updating stock...');
        setShouldFetchPutData(true);
        setShouldFetchGetData(true);
    };

    useEffect(() => {
        if (!shouldFetchGetData) {
            setShouldFetchGetData(false);
        }
    }, [shouldFetchGetData]);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const filteredData = data?.filter((stock) =>
        stock.product.description.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <Card className="align-items-baseline">
            <Body>
                <Card.Title>Stock Management</Card.Title>
                <AsyncDataLoaderWrapper loading={loading} text={spinnerText}>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown">Products</Dropdown.Toggle>
                        <DropdownMenu>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="search"
                                value={searchValue}
                                onChange={handleSearch}
                            />
                            {filteredData?.map((stock) => (
                                <Dropdown.Item
                                    key={stock.product._id}
                                    className="text-end"
                                    onClick={() => handleProductChosen(stock)}
                                >
                                    <Image src={stock.product.image}/>
                                    {stock.product.description}
                                </Dropdown.Item>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    {selectedStock && (
                        <>
                            <div className="d-flex flex-column mt-1">
                                <h6>Product chosen:</h6>
                                <div className="d-flex flex-row">
                                    <div>
                                        <img
                                            src={selectedStock.product.image}
                                            alt="Product Image"
                                            style={{width: '5rem', height: '5rem'}}
                                        />
                                    </div>
                                    <div>
                                        <h5> {selectedStock.product.name}</h5>
                                        <h6> {selectedStock.product.description}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-row mt-1">
                                <Input
                                    className="form-control"
                                    type="number"
                                    value={selectedQuantity}
                                    onChange={(e) => handleQuantityChange(e.target.value)}
                                />
                                <button className="btn btn-primary" onClick={handleSave}>
                                    Save
                                </button>
                            </div>
                        </>
                    )}
                </AsyncDataLoaderWrapper>
            </Body>
        </Card>
    );
}

const Body = styled(Card.Body)`
  width: fit-content;
`;

const DropdownMenu = styled(Dropdown.Menu)`
  max-height: 25rem;
  overflow-y: scroll;
`;

const Input = styled.input`
  width: 30%;
`;

const Image = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  float: left;
`;
