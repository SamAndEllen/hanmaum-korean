import * as React from 'react';
import Tts from 'react-native-tts';

import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Card, Button } from 'react-native-material-ui';

interface Props {}
interface State {
  isRecord: boolean;
  voice: string;
  question: string;
}
export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isRecord: false,
      voice: undefined,
      question: '',
    };
  }

  componentWillMount() {
    this.setState({
      question: '수 천년간 사람들은 자신들이 살고있는 세계에 대해 거의 알지 못했다. 산, 정글, 바다, 얼음으로 뒤덮힌 넓은 땅은 그들이 여행하기에 힘들게 만들었다.'
    });
  }

  render() {
    const { isRecord, voice } = this.state;
    const buttonLabel = isRecord ? '중지' : '읽기평가';
    const voiceLabel = voice
      ? voice
      : isRecord
      ? '무엇이든 말해보세요...'
      : 'press Start button';

    return (
      <Card>
        <Text style={styles.titleStyle}>[ 한국어 받아쓰기 평가 ]</Text>
        <Text style={styles.subTtitleStyle}>1. 다음 녹음을 들으면서 그 내용을 입력(타이핑)하시오.</Text>
        <Button primary icon="radio" onPress={this._onOriginListen} text="듣기평가" />
        <View>
          <UselessTextInputMultiline />
        </View>
      </Card>
    );
  }
  
  private _onOriginListen = () => {
    Tts.stop();
    Tts.setDefaultLanguage('ko-KR');
    // Tts.setDefaultRate(0.5);
    Tts.getInitStatus().then(() => {
      Tts.speak(this.state.question);
    });
    Tts.addEventListener('tts-start', (event) => console.log("start", event));
    Tts.addEventListener('tts-finish', (event) => console.log("finish", event));
    Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));
  }
}

class UselessTextInput extends React.Component {
  render() {
    return (
      <TextInput
        {...this.props}
        editable = {true}
        maxLength = {120}
      />
    );
  }
}

class UselessTextInputMultiline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  // If you type something in the text box that is a color, the background will change to that
  // color.
  render() {
    return (
     <View style={styles.uselessTextInput}
     >
       <UselessTextInput
         multiline = {true}
         numberOfLines = {4}
         onChangeText={(text) => this.setState({text})}
         value={this.state.text}
       />
     </View>
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: {
      fontSize: 20,
      fontWeight: '700',
      margin: 20,
      marginBottom: 10,
  },
  subTtitleStyle: {
      fontSize: 14,
      fontWeight: '700',
      margin: 20,
      marginTop: 0,
  },
  uselessTextInput: {
      fontSize: 14,
      margin: 20,
      borderBottomColor: '#000000',
      borderBottomWidth: 2
  },
});