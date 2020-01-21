import actionTypes from "../Utils/Constants/actionTypes";
const initialState = {
    uid: "",
    coverImg: '',
    ProfileImg: '',
    OfflineKandies:["hi","ugjhg"]
}
const PersistReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.offlineAction:
            return (Object as any).assign({}, state, { uid: action.uid })
        case actionTypes.offlineCoverImg:
            return (Object as any).assign({}, state, { coverImg: action.coverImg })
        case actionTypes.offlineProfileImg:
            return (Object as any).assign({}, state, { profileImg: action.profileImg })
        case actionTypes.offlineKandies:
            return (Object as any ).assign({},state,{OfflineKandies: action.OfflineKandies})
        default:
            return state
    }
}
export default PersistReducer