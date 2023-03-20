import React from 'react';
import {Outlet} from 'react-router';
import Navigation from "./Navigation";

export default function WithNav() {
    return (
        <>
            <Navigation/>
            <Outlet/>
        </>
    );
};
