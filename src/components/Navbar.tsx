"use client";

import {
    Box,
    Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { User } from "@/types";
import UserInfoForm from "./UserInfoForm";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import UserMenu from "@/components/UserMenu";

export default function Navbar() {
    const router = useRouter();
    // State for current user
    const [user, setUser] = useState<User>();
    // State for showing and hiding the user info form
    const [isOpenForm, setIsOpenForm] = useState(false);

    // Handler to open the user info form
    const handleOpenForm = () => setIsOpenForm(true);
    // Handler to close the user info form
    const handleCloseForm = () => setIsOpenForm(false);

    // Handler to update the user
    const updateUser = (newData: User) => {
        setUser(newData);
    }

    // Handler to log out the user
    const logOutHandler = () => {
        deleteCookie("user");
        router.push("/");
    };

    // Set the user from cookies, initially when component renders
    useEffect(() => {
        const cookieUser = getCookie('user');

        if (cookieUser) {
            setUser(JSON.parse(cookieUser))
        }

    }, [])

    return (
        <Box position="fixed" top={0} left={0} right={0} zIndex={1000}>
            <Box
                sx={{
                    p: 4,
                    display: "flex",
                    justifyContent: "flex-end",
                    bgColor: "blackAlpha.700",
                }}
            >
                {/* User Menu */}
                <UserMenu user={user} openForm={handleOpenForm} logOutHandler={logOutHandler} />
            </Box>
            <Divider />

            {/* User Info Form, shown only when `isOpenForm` state is true and `user` is present*/}
            {(isOpenForm && user) && (
                <UserInfoForm user={user} isOpen={isOpenForm} onClose={handleCloseForm} updateUser={updateUser} />
            )}
        </Box>
    );
}
