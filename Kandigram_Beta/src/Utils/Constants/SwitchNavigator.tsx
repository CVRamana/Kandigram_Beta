import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";

const RootNavigator = createAppContainer(
    createSwitchNavigator({
        AuthFlow: AuthNavigator,
        TabNavigator: TabNavigator,
        
    },
        { 
            initialRouteName: "AuthFlow"
         }
         ));
export default RootNavigator;