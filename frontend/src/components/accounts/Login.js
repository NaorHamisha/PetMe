import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import styled from "styled-components";
import ErrorMessage from "../layouts/ErrorMessage";
import {Card, Form, Wrapper} from "./AuthStyle";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {currentUser, login, setError} = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            console.log(currentUser)
            navigate("/home");
        }
    }, [currentUser]);


    async function handleFormSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate("/home");
        } catch (e) {
            console.log(e)
            setError("Failed to login");
        }

        setLoading(false);
    }

    return (
        <Wrapper>
            <Card style={{backgroundColor: "cadetblue"}}>
                <Form onSubmit={handleFormSubmit}>
                    <h3>Login</h3>
                    <div className="mb-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            required
                            placeholder="Enter email address"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            required
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" disabled={loading} className="btn" style={{color: 'white', backgroundColor: "#FFDA29"}}>
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                        Don't have an account? <a href="/register">Register here</a>
                    </p>
                </Form>
            </Card>
        </Wrapper>
    );
}
