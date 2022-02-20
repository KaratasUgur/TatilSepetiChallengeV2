import React, {useEffect, useState, Suspense} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Text,
} from 'react-native';
import axios from 'axios';
//import Card from '../../components/Card';
const CardLazy = React.lazy(() => import('../../components/Card'));
const MainScreen = () => {
  const [hotels, setHotels] = useState([]);
  const [activityIndicatorStatus, setActivityIndicatorStatus] = useState(true);
  const [isMomentumScrrolEnd, setMomentumScrollEnd] = useState(false);
  const [footerSpinnerFlag, setFooterSpinnerFlag] = useState(false);

  useEffect(() => {
    getData()
      .then(dataList => {
        if (dataList.length != 0) {
          setHotels(dataList);
        }
      })
      .then(() => setActivityIndicatorStatus(false))
      .catch(error => console.log('err:', error.message));
  }, []);

  const getData = async () => {
    try {
      const result = await axios.get(
        'https://gist.githubusercontent.com/yasaricli/de2282f01c739a5c8fcbffbb9116e277/raw/69d329b80be71c502d4a7c00142a4e324f86d602/hotels.json',
      );
      return result.data;
    } catch (e) {
      console.log('failed message', e.message);
      return [];
    }
  };

  const getMoreData = () => {
    if (!isMomentumScrrolEnd) {
      setFooterSpinnerFlag(true);
      getData()
        .then(dataList => {
          if (dataList.length != 0) {
            //setHotels([...hotels, ...dataList]);
            let temp = hotels;
            dataList.forEach(hotel => temp.push(hotel));
            setHotels(temp);
          }
        })
        .catch(() => {
          console.log('failed message', e.message);
          return [];
        });
    }
  };

  const footerIndicator = () => {
    return (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator
          size={'large'}
          animating={footerSpinnerFlag}
          color={'aqua'}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {activityIndicatorStatus ? (
        <ActivityIndicator size={'large'} color={'aqua'} />
      ) : (
        <FlatList
          data={hotels}
          renderItem={({item}) => (
            <Suspense fallback={null}>
              <CardLazy info={item} />
            </Suspense>
          )}
          keyExtractor={({hotelId}, index) => `${hotelId}-${index}`}
          onEndReached={() => getMoreData()}
          initialNumToRender={4}
          onEndReachedThreshold={0.2}
          onMomentumScrollEnd={() => setMomentumScrollEnd(false)}
          ListFooterComponent={footerIndicator}
          contentContainerStyle={{marginBottom: 20}}
          extraData={true}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E1E6ED',
    width: '100%',
    height: '100%',
  },
});
export default MainScreen;
