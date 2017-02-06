/*global setInterval clearInterval setTimeout clearTimeout */

import React from 'react';
import Item from '../item/Item';
import Controls from '../controls/Controls';
import Webcam from '../../webcam';
import { css } from 'aphrodite/no-important';
import Style from './me.style';

const hodor = 'https://raw.githubusercontent.com/kolodny/babel-plugin-hodor/master/hodor.jpg';
const TWO_MINTUES_MS = (2 * 60) * 1000;

export default class MeView extends React.Component {

  constructor(props) {
    super(props);
    this.takeScreenshotTask = undefined;
    this.autoScreenshotTask = undefined;
  }

  render() {
    if (this.props.cameraIsActive) {
      return (
        <div>
          <Item image={this.props.me.image || hodor} />
          <div className={css(Style.popOutWebcamStyle)}>
            <Controls />
            <Webcam ref='webcam' audio={false} onUserMedia={() => {
              if (this.props.requestAutomaticScreenshot && this.props.cameraIsActive) {
                const takeScreenshot = (webcam, user) => () => {
                  const screenshot = webcam.getScreenshot();
                  this.props.screenshot(user, screenshot);
                };

                if (this.takeScreenshotTask) {
                  clearTimeout(this.takeScreenshotTask);
                }

                this.takeScreenshotTask = setTimeout(takeScreenshot(
                    this.refs.webcam, this.props.user
                ), 5000);
              }
            }}/>
          </div>
        </div>
      );
    }

    if (this.props.me.image) {
      return (
        <div className={css(Style.container)}>
          <Controls />
          <Item image={this.props.me.image} lastSeen={Date.now()} />
        </div>
      );
    } else {
      return (
        <div className={css(Style.container)}>
          <Controls />
          <Item lastSeen={Date.now()}/>
        </div>
      );
    }
  }

  componentDidMount() {
    const autoScreenshot = () => {
      if (!this.props.requestAutomaticScreenshot) {
        this.props.automaticScreenshot();
      }
    };
    this.autoScreenshotTask = setInterval(autoScreenshot, TWO_MINTUES_MS);
  }

  componentDidUpdate() {
    if (this.props.requestManualScreenshot) {
      const screenshot = this.refs.webcam.getScreenshot();
      const user = this.props.user;
      this.props.screenshot(user, screenshot);
    }
  }

  componentWillUnmount() {
    if (this.autoScreenshotTask) {
      clearInterval(this.autoScreenshotTask);
    }
  }

}