import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import {Card, Form, Wrapper} from "./AuthStyle";
import {rolesEnum} from "./Roles";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const {currentUser, register, setError} = useAuth();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');


    useEffect(() => {
        if (currentUser) {
            navigate("/home");
        }
    }, [currentUser, navigate]);

    async function handleFormSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            setError('');
            setLoading(true);
            await register(email, password, name, phoneNumber, address, rolesEnum.Customer);
            navigate("/home");
        } catch (e) {
            console.log(e)
            setError("Failed to register");
        }

        setLoading(false);
    }

    return (
        <Wrapper>
            <Card>
                <Form onSubmit={handleFormSubmit}>
                    <h3>Register</h3>
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
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="name"
                            onChange={(e) => setName(e.target.value)}
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
                    <div className="mb-3">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            required
                            placeholder="Confirm password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Phone Number</label>
                        <input
                            type="number"
                            className="form-control"
                            required
                            placeholder="phone"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Address</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="address"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" disabled={loading} className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                        Already have an account?  <a href="/login">Login</a>
                    </p>
                </Form>
            </Card>
        </Wrapper>
    );
}