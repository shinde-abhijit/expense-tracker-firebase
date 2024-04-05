import React from 'react'

export const useGetUserInfo = () => {
    const { name, profilePhoto, userID, isAuth, email } = JSON.parse(localStorage.getItem("auth"))

    return { name, profilePhoto, userID, isAuth, email };
}

export default useGetUserInfo
