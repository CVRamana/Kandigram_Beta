import * as React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import  DataRenderComponent  from "../Common/DataRenderComponent";

interface FlatListComponentProps { }

class FlatListComponent extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Text>FlatListComponent</Text>
                <FlatList
                data={{}}
                renderItem={({})=>{
                    return (
                        <DataRenderComponent
                        name={"jhgdsjh"}
                        img={"hgwdjhg"}
                        />
                    )
                }}
                />

            </View>
        );
    }
};

export default FlatListComponent;

const styles = StyleSheet.create({
    container: {}
});
