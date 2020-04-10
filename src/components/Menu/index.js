import React from 'react';
import { Animated } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

import {
  Container,
  Code,
  Nav,
  NavItem,
  NavText,
  SignOutButton,
  SignOutButtonText,
} from './styles';

export default function Menu({ translateY }) {
  return (
    <Container
      style={{
        opacity: translateY.interpolate({
          inputRange: [0, 100, 250],
          outputRange: [0, 0.1, 1],
          extrapolate: 'clamp',
        }),
        transform: [
          {
            translateY: translateY.interpolate({
              inputRange: [0, 200],
              outputRange: [-50, 0],
              extrapolate: 'clamp',
            }),
          },
        ],
      }}
    >
      <Code>
        <QRCode
          value="Rodolfo"
          color="#8b10ae"
          backgroundColor="#fff"
          size={80}
        />
      </Code>
      <Nav>
        <NavItem>
          <Icon name="help-outline" size={20} color="#fff" />
          <NavText>Me Ajuda</NavText>
        </NavItem>
        <NavItem>
          <Icon name="person-outline" size={20} color="#fff" />
          <NavText>Perfil</NavText>
        </NavItem>
        <NavItem>
          <Icon name="credit-card" size={20} color="#fff" />
          <NavText>Configurar Cartão</NavText>
        </NavItem>
        <NavItem>
          <Icon name="smartphone" size={20} color="#fff" />
          <NavText>Configurações do app</NavText>
        </NavItem>
      </Nav>

      <SignOutButton onPress={() => {}}>
        <SignOutButtonText>SAIR DO APP</SignOutButtonText>
      </SignOutButton>
    </Container>
  );
}

Menu.propTypes = {
  translateY: PropTypes.oneOfType([
    PropTypes.instanceOf(Animated.Value),
    PropTypes.func,
    PropTypes.element,
    PropTypes.any,
  ]).isRequired,
};
