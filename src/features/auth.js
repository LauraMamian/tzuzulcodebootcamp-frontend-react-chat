import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { post } from "../api"

// login funciona como un action
export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    console.log(userData)
    console.log(thunkAPI)

    const data = await post("/api/auth/login", userData)
    return data
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        // Se recomienda que el estado inicial sea un objeto
        // No se recomiendan listas, pueden generar bugs y no notificar el cambio de estado
        // Para usar listas: items:[]
        logged: false,
        user: {} //Objeto vacio
    },
    // los reducers son metodos sincronos
    reducers: {
        login: (state, action) => {
            // Reducer
            // Programacion funcional -> middleware
            // Debido al middleware que se implementa por detras, se puede mutar el estado actual
            state.logged = true
            state.user = action.payload
        },
        logout: function (state, action) {
            state.logged = false
            state.user = {}
        }
    },
    // Los extraReducers se usan para gestionar reducers asincronos
    // Se puede realizar de distintas maneras
    // extraReducers: (builder) =>{ }
    // extraReducers:function(builder){}
    // extraReducers: {
    //    [login.fullfilled]: (state, action) => {},
    //    [login.pending]: (state, action) => {},
    //    [login.rejected]: (state, action) => {},
    //}
    extraReducers(builder) {
        builder.addCase(login.fulfilled, (state, action) => {
            // Se actualiza el estado
            state.logged = true
            state.user = action.payload.user
        })
        builder.addCase(login.pending, (state, action) => {
            console.log("Loading...")
        })
        builder.addCase(login.rejected, (state, action) => {
            console.log("Error")
        })
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer