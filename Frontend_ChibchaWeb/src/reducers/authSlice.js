import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    rol: null,
}

const loadStateFromLocalStorage = () => {
    try {
        const serializedSorage = localStorage.getItem("authState")
        return serializedSorage ? JSON.parse(serializedSorage) : initialState
    } catch (error) {
        return initialState
    }
}

const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem("authState", serializedState)
    } catch (error) {
        console.error(error)
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: loadStateFromLocalStorage(),
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user
            state.isAuthenticated = true
            state.rol = action.payload.user.rol
            saveStateToLocalStorage(state)
        },
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
            state.rol = null
            localStorage.removeItem("authState")
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer