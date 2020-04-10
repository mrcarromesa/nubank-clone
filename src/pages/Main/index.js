import React from 'react';

// imports animations
import { Animated, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
// imports animations

import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '../../components/Header';
import Tabs from '../../components/Tabs';

import Menu from '../../components/Menu';

import {
  Container,
  Content,
  Card,
  CardHeader,
  CardContent,
  Title,
  Description,
  CardFooter,
  Annotation,
} from './styles';

export default function Main() {
  let offset = 0;

  const translateY = new Animated.Value(0);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    {
      useNativeDriver: true,
    }
  );

  function onHandlerStateChange(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      // irá armazenar o quanto que o usuário arrastou
      const { translationY } = event.nativeEvent;
      offset += translationY;

      // Quando o usuario passar de 100px coloca como aberto
      if (translationY >= 100) {
        opened = true;
      } else {
        // opened = false;
        // Quando o usuario estiver com menos de 100px o valor será o presente na offset
        translateY.setValue(offset);
        // removemos o offset
        translateY.setOffset(0);
        // reset o offset
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? 380 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });

      /* // caso o usuário moveu 100px ou mais para baixo e soltou
      if (translationY >= 100) {
        // entendemos que ele quer abrir.
        opened = true;
      } */
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <Menu translateY={translateY} />

        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Card
            style={{
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [
                      -300,
                      0,
                      Dimensions.get('window').height - 300,
                    ],
                    outputRange: [
                      -50,
                      0,
                      Dimensions.get('window').height - 300,
                    ],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}
          >
            <CardHeader>
              <Icon name="attach-money" size={28} color="#666" />
              <Icon name="visibility-off" size={28} color="#666" />
            </CardHeader>
            <CardContent>
              <Title>Saldo disponível</Title>
              <Description>R$ 500,59</Description>
            </CardContent>
            <CardFooter>
              <Annotation>
                Transferência de R$ 20,00 recebida de Carlos Rodolfo Mengel
                Santos hoje às 23:00h
              </Annotation>
            </CardFooter>
          </Card>
        </PanGestureHandler>
      </Content>
      <Tabs translateY={translateY} />
    </Container>
  );
}
