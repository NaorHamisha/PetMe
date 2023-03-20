import {useAuth} from "../../contexts/AuthContext";
import {Alert} from "react-bootstrap";
import styled from "styled-components";

export default function ErrorMessage() {
    const {error, setError} = useAuth();

    return (
        error && (
            <ErrorAlert variant='danger' onClose={() => setError('')} dismissible>
                Error: {error}
            </ErrorAlert>
        )
    );
}

const ErrorAlert = styled(Alert)`
    margin: 3em 3em 0 3em;
`;