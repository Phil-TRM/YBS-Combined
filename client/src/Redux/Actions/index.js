export const setMasterData=(data)=>{
    return{
        type:"SET_MASTER",
        data:data
    }
}
export const setUserData=(data)=>{
    return{
        type:"SET_USERDATA",
        data:data
    }
}
export const setUserBasic=(data)=>{
    return{
        type:"SET_BASIC",
        data:data
    }
}
export const setUserPosts=(data)=>{
    return{
        type:"SET_USER_POST",
        data:data
    }
}
export const setPosts=(data)=>{
    return{
        type:"SET_POSTS",
        data:data
    }
}