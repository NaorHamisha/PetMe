import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Register from "./components/accounts/Register";
import Login from "./components/accounts/Login";
import {AuthProvider} from "./contexts/AuthContext";
import ErrorMessage from "./components/layouts/ErrorMessage";
import WithPrivateRoute from "./utils/WithPrivateRoute";
import Home from "./components/home/Home";
import React from "react";
import WithoutNav from "./components/layouts/WithoutNav";
import WithNav from "./components/layouts/WithNav";
import Cart from "./components/cart/Cart";
import Management from "./components/admin/Management";
import MyOrders from "./components/orders/MyOrders";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ErrorMessage/>
                <Routes>
                    <Route path='/' element={<Navigate to='/login' replace/>}/>
                    <Route element={<WithoutNav/>}>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Route>
                    <Route element={<WithNav/>}>
                        <Route path="/home" element={<WithPrivateRoute><Home/></WithPrivateRoute>}/>
                        <Route path="/cart" element={<WithPrivateRoute><Cart/></WithPrivateRoute>}/>
                        <Route path="/orders" element={<WithPrivateRoute><MyOrders/></WithPrivateRoute>}/>
                        <Route path="/management" element={<WithPrivateRoute><Management/></WithPrivateRoute>}/>
                    </Route>
                    <Route path='*' element={<Navigate to='/login' replace/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
