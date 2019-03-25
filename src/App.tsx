import React, { Component } from 'react';
import Speech from './Speech';
import Tts from './Tts';

import styled from 'styled-components/native';
const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #f5fcff;
`;
import { ScrollView } from "react-native";
import { COLOR, ThemeContext, getTheme, Toolbar } from 'react-native-material-ui';

// you can set your style right here, it'll be propagated to application
const uiTheme = {
  fontFamily: 'System',
  palette: {
    primaryColor: COLOR.blue800,
  },
  toolbar: {
    container: {
      height: 80,
      paddingTop: 30,
      marginBottom: 30
    },
  }
};

export default class Main extends Component {
  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <Container>
        <Toolbar
          centerElement="Korean Language"
        />
        <ScrollView 
        horizontal={false}
        >
          <Speech />
          <Tts />
          </ScrollView>
        </Container>
      </ThemeContext.Provider>
    );
  }
}