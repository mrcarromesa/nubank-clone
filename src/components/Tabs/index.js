import React from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, TabsContainer, TabItem, TabText } from './styles';

export default function Tabs({ translateY }) {
  return (
    <Container
      style={{
        opacity: translateY.interpolate({
          inputRange: [0, 200],
          outputRange: [1, 0.2],
          extrapolate: 'clamp',
        }),
        transform: [
          {
            translateY: translateY.interpolate({
              inputRange: [0, 200],
              outputRange: [0, 50],
              extrapolate: 'clamp',
            }),
          },
        ],
      }}
    >
      <TabsContainer>
        <TabItem>
          <Icon name="person-add" size={24} color="#fff" />
          <TabText>Indicar amigos</TabText>
        </TabItem>
        <TabItem>
          <Icon name="chat-bubble-outline" size={24} color="#fff" />
          <TabText>Cobrar</TabText>
        </TabItem>
        <TabItem>
          <Icon name="arrow-downward" size={24} color="#fff" />
          <TabText>Depositar</TabText>
        </TabItem>
        <TabItem>
          <Icon name="arrow-upward" size={24} color="#fff" />
          <TabText>Transferir</TabText>
        </TabItem>
        <TabItem>
          <Icon name="lock" size={24} color="#fff" />
          <TabText>Bloquear Cartão</TabText>
        </TabItem>
      </TabsContainer>
    </Container>
  );
}

Tabs.propTypes = {
  translateY: PropTypes.instanceOf(Animated.Value).isRequired,
};
