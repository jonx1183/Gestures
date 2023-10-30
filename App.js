import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {useSharedValue, useAnimatedGestureHandler, useAnimatedStyle, withSpring} from 'react-native-reanimated';

export default function App() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGestureEvent= useAnimatedGestureHandler({
    onStart:(_,context) =>{
    console.log("Nothing is happining! " +translateX.value)
    context.translateX = translateX.value
    context.translateY = translateX.value
    },

    onActive:(event,context) =>{
      translateX.value = context.translateX + event.translationX
      translateY.value = context.translateY + event.translationY
    },

    onEnd:() =>{
        translateX.value = withSpring(0)
        translateY.value = withSpring(0)
    }
    })

    const animateStyle = useAnimatedStyle(() =>{
      return {
        transform: [
          {translateX: translateX.value},
          {translateY: translateY.value} 
        ]
      }

    })  



//function onGestureEvent(event){
  //const {translationX, translationY} = event.nativeEvent;
  //console.log("X " + translationX);
  //console.log("Y " + translationY);
//}

  return (
    <GestureHandlerRootView style={styles.rootView}>
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[animateStyle, styles.myStyle]}>
        <Text>Console</Text>
        </Animated.View>
      </PanGestureHandler>
      <StatusBar style="auto" />
    </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  myStyle:{

  },
  rootView:{
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
