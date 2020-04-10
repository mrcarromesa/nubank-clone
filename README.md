<h1>Nubank Clone</h1>

- Seguindo tutorial: [Clonando interface do Nubank (+ ANIMAÇÕES) com React Native | Diego Fernandes](https://www.youtube.com/watch?v=DDm0M_rZLJo)

- Utilizar o repositório: [Preparando o ambiente](https://github.com/mrcarromesa/react-native-ambiente-conceitos) que já possuí uma estrutura básica para não ter que começar do zero.

- Antes de iniciar o código vamos instalar e configurar uma biblioteca:

[Getting Started](https://software-mansion.github.io/react-native-gesture-handler/docs/getting-started.html)

- Nesse atual projeto já possuí instalada a dependencia do `react-native-gesture-handler`, caso não houvesse só executar o comando:

```bash
yarn add react-native-gesture-handler
```

- Após isso é necessário realizar o link através do comando:

```bash
react-native link react-native-gesture-handler
```

- Alterar o arquivo: `android/app/src/main/java/nome/do/pacote/MainActivity.java` adicionando o que se pede na documentação, vc pode acessar o arquivo aqui no projeto para verificar o que foi adicionado.


---

<h2>Ajustar o arquivo src/routes.js</h2>

- Altere para o seguinte:

```js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

```

- Inicie ajustando o arquivo `src/pages/Main/styles.js` e o arquivo `src/pages/Main/index.js`

- No arquivo `src/index.js` Ajuste o `StatusBar`:

```js
<StatusBar barStyle="light-content" backgroundColor="#8b10ae" />
```

- Isso é para deixar o texto da statusbar do ios branca e o fundo da status bar no andorid com o roxo.

---

<h2>Criar componentes</h2>

- Crie os seguintes componentes:

- `src/components/Header/index.js` e adicionar o arquivo `styles.js`
- `src/components/Tabs/index.js` e adicionar o arquivo `styles.js`

- As imagens da logo estão na pasta `src/assets/`

- No arquivo `src/components/Header/index.js` foi importado o `react-native-vector-icons`, utilizando especificamente a fonte `MaterialIcons`, instruções de como cofigurar no repositorio: [Preparando o ambiente](https://github.com/mrcarromesa/react-native-ambiente-conceitos


----

<h2>Ajuste no iPhone X</h2>

Para evitar que os elementos fiquem colados no topo no iOS com o corte e ou próximo da barrinha para arrastar para cima, utilizamos a lib `react-native-iphone-x-helper`:

```bash
yarn add react-native-iphone-x-helper
```

- Utilizaremos no arquivo `src/pages/Main/styles.js`:

```js
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
//..
`
padding-top: ${getStatusBarHeight}px;
`
```

- Terminado o `Header` será feito as tabs que fica no footer da aplicação.


---

<h2>Tabs</h2>

- Um dos componentes será `ScrollView` e a estilização dele é um pouco diferente, porisso podemos utilizar o seguinte:

```js
export const TabsContainer = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: { paddingLeft: 10, paddingRight: 20 },
  showsHorizontalScrollIndicator: false,
})``;
```

- Você poderá visualizar o código desse componente em `src/components/Tabs/`

---

<h2>Menu Component</h2>

- Criar os arquivos `src/components/Menu/index.js` e `src/components/Menu/styles.js`

- Importar o gerador de qrcode [QRCode](https://github.com/awesomejerry/react-native-qrcode-svg)

```bash
yarn add react-native-svg
react-native link react-native-svg
yarn add react-native-qrcode-svg
```

- Acessar a pasta `ios/` e executar o comando:

```bash
pod install
```

Vamos importar no arquivo `src/components/Menu/index. js`

```js
import QRCode from 'react-native-qrcode-svg';
```

No arquivo `src/components/Menu/styles.js` podemos adicionar:

```js
import { StyleSheet } from 'react-native';
```

- E dentro dessa lib temos a medida `StyleSheet.hairlineWidth` o qual é do tamanho de um fio de cabelo, ótimo para utilizar como borda de separador.


---

<h1>Animações</h1>

- No arquivo `src/index.js` iremos importar as libs de animação:

```js
import { Animated } from 'react-native'; // Api de animações do react-native api bem robusta
import { PanGestureHandler, State } from 'react-native-gesture-handler'; // Ele utiliza a api Animated do react-native e facilita muitas coisas para o desenvolvimento com animacoes
```

- o `PanGestureHandler` detcta quando o usuário arrasta alguma coisa

- o `State` é uma constante que tem algumas informações que será necessário utilizar

- Para começar a trabalahar com animações:
  - Qual o item que queremos detectar quando o usuário arrastar ele para baixo nesse caso? Será o item `<Card>` do arquivo `src/index.js`, dessa forma inserimos o componente `PangestureHandler` 'embrulhando' esse item `<Card>`.

- o `PanGestureHandler` recebe os propriedades que são obrigatórios:
  - onGestureEvent
    - recebe uma variavé que será do tipo `Animated.event()` o qual irá capturar o evento que o usuário está realizando e passar a atualização do posicionamento do elemento e passar para uma variavel `global`
  - onHandlerStateChange
    - chama uma function enviando um parametro com o `event` o qual contem todas as informações do evento que aconteceu quando e enquanto o usuário for arrastando.

- Também criamos uma variavel de controle:

```js
const translateY = new Animated.Value(0);
```

- ela recebe `new Animated.Value(0)`, ao invés de zero pois o `Animated` quer irá controlar o valor da variavel.
- Se fosse utilizado o `useState` a cada alteração dessa variavél a tela inteira seria reenderizada cada alteração, e não apenas o item que queremos animar, por isso é utilizado o `new Animated.Value`

- Utilizando o `Animated.event()`:

```js
const translateY = new Animated.Value(0);
const animatedEvent = Animated.event(
    [
      {
        // Obtem as coordenadas eixo Y e X e insere na variavél
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    {
      // Utilizar a thread nativa do dispositivo para melhor peformance, não utilizar quando for algo especifico de css, mas na maioria dos caso dá para utilizar.
      useNativeDriver: true,
    }
  );
```

---

No arquivo `src/pages/Main/index.js` precisamos transformar o elemento Card em um `Animated.View`, para isso no arquivo `src/pages/Main/styles.js` importamos:

```js
import { Animated } from 'react-native';
```

e estilizamos o elemento assim:

```js
export const Card = styled(Animated.View)`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  margin: 0 20px;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
`;
```

- E no arquivo `src/pages/Main/index.js` no component `Card` para vermos algum efeito inserimos o seguinte:

```js
<Card
    style={{
      transform: [
        {
          translateY,
        },
      ],
    }}
  >
```

- A propriedade transform com a propriedade translate do css que  serve para mover um elemento sem ocupar espaço de outro elemento

- No momento quais os problemas:
  - estou podendo arrastar o elemnto tanto para cima quanto para baixo sem fim
  - Quando clico no card ele volta para posição inicial

- Então vamos resolver esses problemas

---

<h2>Limitar a posição máxima inicial e final do elemento</h2>

- Para tal utilizaremos a propriedade do Animated.Value() chamada `interpolate` que recebe um objeto com duas propriedades do tipo array:
  - inputRange: Informo os intervalos ao qual a animação irá caminhar
  - outputRange: Informa os valores equivalentes conforme ordem respectiva do item inputRange
  - extrapolate: caso o valor for `clamp`, ele irá até o primeiro e último valor do outputRange.

- Caso tenhamos o `inputRange` e `outputRange`:

{
  inputRange: [-100, 0, 300],
  outputRange: [-50, 0, 300]
}

no caso quando na propriedade entrar `-100` irá sair -50, quando entrar `0` irá sair `0`, quando entrar `300`, irá sair `300`.

- No arquivo `src/pages/Main/index.js` iremos ajustar o seguinte para o componente `Card` :

```js
<Card
  style={{
    transform: [
      {
        translateY: translateY.interpolate({
          inputRange: [
            -300,
            0,
            300,
          ],
          outputRange: [
            -50,
            0,
            300,
          ],
          extrapolate: 'clamp',
        }),
      },
    ],
  }}
>
```

---

<h2>Animando o component Menu</h2>

- No arquivo `src/components/Menu/styles.js` ajustar o import do `react-native`:

```js
import { StyleSheet, Animated } from 'react-native';
```

- e o component `Container`:

```js
export const Container = styled(Animated.ScrollView).attrs({
  contentContainerStyle: { alignItems: 'center' },
})`
  margin: 0 30px;
`;
```

- No arquivo `src/components/Menu/index.js` ajustar:

```js
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
    {/* .. */}
  </Container>
  );
}
```

---

**Ajuste para erro eslint**

- Para corrigir erros de proptypes do eslint, instale a lib:

```bash
yarn add prop-types
```


- No arquivo `src/components/Menu/index.js` import:

```js
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
```
- e no final do arquivo adicione:

```js
Menu.propTypes = {
  translateY: PropTypes.oneOfType([
    PropTypes.instanceOf(Animated.Value),
    PropTypes.func,
    PropTypes.element,
    PropTypes.any,
  ]).isRequired,
};
```

---

<h2>Animando o component Tabs</h2>

- Ajustar o arquivo `src/pages/components/Tabs/styles.js` adicionar o import:

```js
import { Animated } from 'react-native';
```

- Ajustar o component `Container`:

```js
export const Container = styled(Animated.View)`
  height: 100px;
  margin-top: 20px;
`;
```

- No arquivo `src/components/Tabs/index.js` ajustar:

```js
export default function Tabs({translateY}) {}
```

---

**Ajuste para erro eslint**

- No arquivo `src/components/Tabs/index.js` import:

```js
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
```
- e no final do arquivo adicione:

```js
Tabs.propTypes = {
  translateY: PropTypes.oneOfType([
    PropTypes.instanceOf(Animated.Value),
    PropTypes.func,
    PropTypes.element,
    PropTypes.any,
  ]).isRequired,
};
```

---


<h2>Mantendo a ultima posição do card ao arrastar</h2>

- No arquivo `src/pages/Main/index.js`, crie uma variavel `let offset = 0;`

- Na function `onHandlerStateChange(event)` vamos adicionar um if:

```js
function onHandlerStateChange(event) {
  if (event.nativeEvent.oldState === State.ACTIVE) {
  }
}
```

- O evento `onHandlerStateChange` é disparado quando usuário:
  - iniciar a animação,
  - quando parar a animação,
  - quando está no meio da animação

- No if estou verificando se o evento anterior era ativo, pois agora não é mais, porque o usuário parou de realizar a animação. Ou seja como se o usuário finalizasse a animação, levantesse o dedo de sobre a tela nesse  caso.

- Dentro do if vamos inserir o seguinte:

```js
function onHandlerStateChange(event) {
  if (event.nativeEvent.oldState === State.ACTIVE) {
    // irá armazenar o quanto que o usuário arrastou
    const { translationY } = event.nativeEvent;
    offset += translateY;

    // Continuar a animação a partir do offset e não do zero
    translateY.setOffset(offset);
    translateY.setValue(0);
  }
}
```

- Ali na variavel translationY vamos obter o valor de quanto que o usuário arrastou, e adicionando ou atualizando o valor para o offset.

- Nesse caso o que acontece quando o usuário arrasta o elemento ex.: 30px para baixo e para o valor de translationY é restado para 0, nesse caso é necessário somar sempre o valor e inserir em outra variavel, como está sendo feita no offset, no caso ficará assim

| Ação |  translationY | offset | translateY  |
|------|---------------|--------| ------------|
|Arrastar para baixo | 30 | 0 |   30          |
| Parou de arrastar  | 0  | 30 |  0           |
| Arrastar para baixo| `offset` + 30 | 60 | 60|


---

- Agora atenção a essa linha de código:

```js
translateY.setOffset(offset);
translateY.setValue(0);
```

**Observe que é o `translateY` e não o `translationY`**

- Com essas duas linhas vamos conseguir continuar arrastando o componente independete da posição que ele finalizou.

- Qaundo queremos continuar de onde parou a animação ele não volta para posição inicial dele, mas sim continua de onde parou. Porque setamos o `setOffset`, dessa forma quando finaliza a animação a próima animação irá começar desse novo ponto, e não mais do zero. Pois setamos o novo ponto inicial dela.

o `setValue` é para ele restartar o valor da variavel `translateY` para zero e não para o valor que o usuário arrastou.

---
<h2>Realizando a animação sozinha a partir de um certo ponto</h2>

- Para isso iremos inserir uma variavel e um segundo if e mais uma animação na function `onHandlerStateChange(event)`:

```js
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
```

<h2>Resultado:</h2>

[![Assitir ao vídeo](./repo/img_mobile.png)](https://youtu.be/nggwBBXDpYg)

