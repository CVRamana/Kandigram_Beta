import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { vh, vw } from './ResponsiveScreen';

interface DataRenderComponentProps { }

class DataRenderComponent extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: "row" }}>
                    <View >
                        <Image style={styles.img}
                        />
                    </View>
                    <View style={{
                        width: vw(208),
                        height: vh(72),
                    }}>
                        <Text> festivalmylife This looks like so much fun! Great to meet you guys.  </Text>
                    </View>
                    <View>
                        <Image
                            style={styles.like}
                        />
                    </View>
                </View>
                <View style={{
                    marginLeft: vw(73),
                    flexDirection: "row",
                }}>
                    <Text> 15 min</Text>
                    <Text> reply</Text>

                </View>
            </View>
        );
    }
};

export default DataRenderComponent;

const styles = StyleSheet.create({
    container: {
        // flexDirection:"row"
    },
    img: {
        height: vh(40),
        width: vw(40),
        borderRadius: vw(20),
        backgroundColor: "grey"
    }, like: {
        height: vh(28),
        width: vw(28),

    }
});
