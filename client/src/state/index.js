import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    mode: "light",
    user: null,
    token: null,
    posts: [],
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    //A function that modifies the global state
    reducers: {
        //In redux, we use the state object to replace the initialState object instead of directly modifying the state.
        setMode: (state) =>{
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        //Action is the params of the function
        setLogin: (state, action) =>{
            //user and token is the parameter
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) =>{
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) =>{
            if(state.user){
                state.user.friends = action.payload.friends;
            }
            else{
                console.error("user friends non-existent")
            }
        },
        setPosts: (state, action) =>{
            state.posts = action.payload.posts;
        },
        setPost: (state, action) =>{
            const updatedPosts = state.posts.map((post) => {
                if(post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        }
    }
})

export const {setMode, setLogin, setLogout, setFriends, setPost, setPosts} = authSlice.actions;
export default authSlice.reducers;