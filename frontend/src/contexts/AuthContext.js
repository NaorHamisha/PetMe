import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";

import auth from "../config/Firebase";
import axios from "axios";
import {rolesEnum} from "../components/accounts/Roles";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [error, setError] = useState("");
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userMetadata, setUserMetadata] = useState({});

    function register(email, password, name, phoneNumber, address, role) {
        return createUserWithEmailAndPassword(auth, email, password).then((r) => {
            axios.post('http://localhost:3005/users', {
                uid: r.user.uid,
                name: name,
                mail: email,
                phoneNumber: phoneNumber,
                address: address,
                role: role
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${r.user.accessToken}`,
                }
            }).then(res => setUserMetadata(res.data));
        });
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function updateUserProfile(user, profile) {
        return updateProfile(user, profile);
    }

    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        currentUser && axios.get(`http://localhost:3005/users/user/${currentUser?.uid}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentUser?.accessToken}`,
            },
            params: {uid: currentUser?.uid}
        }).then((r) => {
            setIsAdmin(r.data.role === rolesEnum.Admin);
            setUserMetadata(r?.data);
        })
    }, [currentUser])

    const value = {
        currentUser,
        login,
        register,
        error,
        setError,
        updateUserProfile,
        logout,
        isAdmin,
        userMetadata
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
