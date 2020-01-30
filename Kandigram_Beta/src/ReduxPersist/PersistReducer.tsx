import actionTypes from "../Utils/Constants/actionTypes";
const initialState = {
    uid: "",
    coverImg: '',
    profileImg: '',
    OfflineKandies: []
}
const PersistReducer = (state = initialState, action: any) => {

    switch (action.type) {

        case actionTypes.offlineAction:
            return (Object as any).assign({}, state, { uid: action.uid })

        case actionTypes.offlineCoverImg:
            return (Object as any).assign({}, state, { coverImg: action.coverImg })

        case actionTypes.offlineProfileImg:
            return (Object as any).assign({}, state, { profileImg: action.profileImg })
            break

        case actionTypes.offlineKandies:
            debugger
            return (Object as any).assign({}, state, { OfflineKandies: action.OfflineKandies })

        case actionTypes.Offline_Uploaded:
            return (Object as any).assign({},state,{ OfflineKandies: action.OfflineKandies })

        case actionTypes.Delete_PersistAction:
            // debugger
            return (Object as any).assign({}, state, {
                uid: action.uid,
                coverImg: action.coverImg,
                profileImg: action.profileImg,
                OfflineKandies: action.OfflineKandies


            })

        default:
            return state
    }
}

export default PersistReducer