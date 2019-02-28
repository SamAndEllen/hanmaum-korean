import * as React from 'react';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';

import { View, StyleSheet, Text } from 'react-native';
import { Card, Button } from 'react-native-material-ui';

enum VoiceState {
  Normal, 
  Record,
  Listen
}

interface Props {}
interface State {
  state: VoiceState; 
  isRecord: boolean;
  voice: string;
  question: string;
}
export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      state: VoiceState.Normal,
      isRecord: false,
      voice: undefined,
      question: '',
    };

    Voice.onSpeechStart = this._onSpeechStart;
    Voice.onSpeechEnd = this._onSpeechEnd;
    Voice.onSpeechResults = this._onSpeechResults;
    Voice.onSpeechError = this._onSpeechError;
  }

  componentWillMount() {
    this.setState({
      question: '1947년, 사해 두루마리가 발견되었을 때 고고학자들은 새 문서가 발견될 때마다 발견자에게 보상을 주기 시작했습니다.'
    });
  }

  render() {
    const { isRecord, voice } = this.state;
    const buttonLabel = isRecord ? '중지' : '읽기평가';
    const buttonIcon = isRecord ? 'mic-off' : 'mic';
    const voiceLabel = voice
      ? voice
      : isRecord
      ? '무엇이든 말해보세요...'
      : 'press Start button';

    return (
      <Card>
        <Text style={styles.titleStyle}>[ 한국어 읽기(올바르게 발음하기) 평가 ]</Text>
        <Text style={styles.subTtitleStyle}>1. 아래의 한국어 문장을 (필요하면 몇 번 들어본 후) 올바르게 발음하면서 큰소리로 읽으시오.</Text>
        <Text style={styles.contentStyle}>{this.state.question}</Text>
        {/* <Text>{voiceLabel}</Text> */}
        <View style={styles.rowContainer}>
            <View style={styles.button}>
              <Button primary icon="radio" onPress={this._onOriginListen} text="원본 듣기연습" />
            </View>
            <View style={styles.button}>
              <Button primary icon={buttonIcon} onPress={this._onRecordVoice} text={buttonLabel} />
            </View>
        </View>
      </Card>
    );
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  private _onSpeechStart = event => {
    console.log('onSpeechStart');
    this.setState({
      voice: '',
    });
  };
  private _onSpeechEnd = event => {
    console.log('onSpeechEnd');
  };
  private _onSpeechResults = event => {
    console.log('onSpeechResults');
    this.setState({
      voice: event.value[0],
    });
  };
  private _onSpeechError = event => {
    console.log('_onSpeechError');
    console.log(event.error);
  };

  private _onRecordVoice = () => {
    const { isRecord } = this.state;
    if (isRecord) {
      Voice.stop();
    } else {
      Voice.start('ko-KR');
    }
    this.setState({
      isRecord: !isRecord,
    });
  };

  private _onOriginListen = () => {
    if(this.state.state != VoiceState.Record){
      Tts.stop();
      Tts.setDefaultLanguage('ko-KR');
      Tts.getInitStatus().then(() => {
      Tts.speak(this.state.question);
    });
    Tts.addEventListener('tts-start', (event) => {
      console.log("start", event)
      this.setState({
        state: VoiceState.Listen
      })
    });
    Tts.addEventListener('tts-finish', (event) => {
      console.log("finish", event)
      this.setState({
        state: VoiceState.Normal
      })
    });
    Tts.addEventListener('tts-cancel', (event) => {
      console.log("cancel", event)
      this.setState({
        state: VoiceState.Normal
      })
    });
    }
    
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
  contentStyle: {
      fontSize: 14,
      padding: 20,
      margin: 20,
      marginTop: 0,
      backgroundColor: '#e0e0e0',
  },
  rowContainer: {
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
      marginHorizontal: 8,
  },
});