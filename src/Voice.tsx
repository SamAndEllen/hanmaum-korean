import * as React from 'react';
import Voice from 'react-native-voice';

import { StyleSheet, Text } from 'react-native';
import { Card, Button } from 'react-native-material-ui';

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontWeight: '700',
    margin: 32
  }
});

interface Props {}
interface State {
  isRecord: boolean;
  voice: string;
}
export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isRecord: false,
      voice: undefined,
    };

    Voice.onSpeechStart = this._onSpeechStart;
    Voice.onSpeechEnd = this._onSpeechEnd;
    Voice.onSpeechResults = this._onSpeechResults;
    Voice.onSpeechError = this._onSpeechError;
  }
  render() {
    const { isRecord, voice } = this.state;
    const buttonLabel = isRecord ? 'Stop' : 'Start';
    const voiceLabel = voice
      ? voice
      : isRecord
      ? '무엇이든 말해보세요...'
      : 'press Start button';

    return (
      <Card>
        <Text style={styles.textStyle}>{voiceLabel}</Text>
        <Button primary onPress={this._onRecordVoice} text={buttonLabel} />
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
}
