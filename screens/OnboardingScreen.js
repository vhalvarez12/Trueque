import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Dimensions, FlatList, View, Image, Text, TouchableOpacity } from 'react-native';
import { darkGreen } from '../components/Constants';
const { width, height } = Dimensions.get('window');
const COLORS = { primary: '#fffaf2', white: '#fff', black:'#000000', turquesa:'#0ffff7', green:'#88ffad',grey:'#82877c'};
const slides = [

   {
      id: ' 1 ',
      image: require("../screens/src/images/1.png"),
      title: "Crea tu cuenta",
      subtitle: "¡Para mirar productos que pueden ser tuyos! ",
   },
   {

      id: ' 2 ',
      image: require("../screens/src/images/2.png"),
      title: 'Elige un producto',
      subtitle: " Para hacer TRUEQUE e intercambiar tu producto",
   },
   {
      id: ' 3 ',
      image: require("../screens/src/images/3.png"),
      title: "¡Contacta e intercambia!",
      subtitle: " ¡Los productos que desees y cuando lo desees! ",
   },
];
const Slide = ({ item }) => {
   return (
      <View style={{ alignItems: "center" }}>
         <Image
            source={item?.image}
            // Existe un error en el emulador web, funciona al poner 400% para web, 75% para emulador móvil
            style={{ height:'75%', width, resizeMode: 'contain'} }
         />
         <Text style={styles.title}>{item.title}</Text>
         <Text style={styles.subtitle}>{item.subtitle}</Text>


      </View>
   );

};

const OnboardingScreen = ({ navigation }) => {
   const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
   const ref = React.useRef(null);

   const Footer = () => {
      return (
         <View
            style={{
               height: height * 0.25,
               justifyContent: 'space-between',
               paddingHorizontal: 20,
            }}>
            <View
               style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 20,
               }}>
               {slides.map((_, index) => (
                  <View key={index} style={[
                     styles.indicator,
                     currentSlideIndex == index && {
                        backgroundColor: COLORS.black,
                        width: 25, 

                     },
                  ]}
                  />
               ))}
            </View>
            <View style={{ marginBottom: 20 }}>
               {
                  currentSlideIndex == slides.length - 1 ? (
                     <View style={{ height: 50 }}>
                        <TouchableOpacity style={[styles.btn]} onPress={()=>navigation.replace("LoginScreen1")}>
                           <Text style={{ fontWeight: 'bold', fontsize: 15, color: COLORS.black }} >
                              EMPEZAR
                           </Text>
                        </TouchableOpacity>
                     </View>
                  ) : (
                     <View style={{ flexDirection: 'row' }} >
                        <TouchableOpacity
                           onPress={skip}
                           style={[styles.btn,
                           {
                              backgroundColor: 'transparent',
                              borderWidth: 1,
                              borderColor: COLORS.black
                           },
                           ]}>
                           <Text
                              style={{
                                 fontWeight: 'bold',
                                 fontSize: 15,
                                 color: COLORS.black
                              }}>
                              OMITIR
                           </Text>
                        </TouchableOpacity>

                        <View style={{ width: 15 }} />
                        <TouchableOpacity style={[styles.btn]} onPress={goNextSlide}>
                           <Text style={{ fontWeight: 'bold', fontSize: 15, color: COLORS.white }}>SIGUIENTE</Text>
                        </TouchableOpacity>
                     </View>)



               }



            </View>
         </View>
      );
   };
   const updateCurrentSlideIndex = e => {
      const contentOffsetX = e.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(contentOffsetX / width);
      setCurrentSlideIndex(currentIndex);
   };
   const goNextSlide = () => {
      const nextSlideIndex = currentSlideIndex + 1;
      if (nextSlideIndex != slides.length) {
         const offset = nextSlideIndex * width;
         ref?.current?.scrollToOffset({ offset });
         setCurrentSlideIndex(nextSlideIndex);
      }

   };
   const skip = () => {
      const lastSlideIndex = slides.length - 1;
      const offset = lastSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(lastSlideIndex);

   };



   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }} >
         <StatusBar backgroundColor={COLORS.primary} />
         <FlatList
            ref={ref}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            pagingEnabled
            data={slides}
            contentContainerStyle={{ height: height * 0.65 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            bounces={false}
            renderItem={({ item }) => <Slide item={item} />}
         />
         <Footer />
      </SafeAreaView >
   );
};

const styles = StyleSheet.create({
   title: {
      color: COLORS.black,
      fontSize: 22,
      fontweight: 'bold',
      marginTop: 20,
      textAlign: "center",
   },
   subtitle: {
      color: COLORS.black,
      fonesia: 13,
      marginTop: 10,
      maxwidth: '70%',
      textAlign: 'center',
      lineHeight: 23,
   },
   image: {
      height: '100%',
      width: '100%',
      resizeMode: 'contain',
    },
   indicator: {
      height: 2.5,
      width: 10,
      backgroundColor: "grey",
      marginHorizontal: 3,
      borderRadius: 2,
   },
   btn: {
      flex: 1,
      height: 50,
      borderRadius: 15,
      backgroundColor: darkGreen,
      justifyContent: 'center',
      alignItems: 'center',
   },
});
export default OnboardingScreen;