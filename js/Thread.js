import {
  NativeModules,
  DeviceEventEmitter,
} from 'react-native';

const { ThreadManager } = NativeModules;

export default class Thread {
  constructor(jsPath) {
    if (!jsPath || !jsPath.endsWith('.js')) {
      throw new Error('Invalid path for thread. Only js files are supported');
    }

    DeviceEventEmitter.addListener(`Thread1`, (message) => {
      !!message && this.onmessage && this.onmessage(message);
    });

    // this.id = ThreadManager.startThread(jsPath.replace(".js", ""))
    //   .then(id => {
    //     DeviceEventEmitter.addListener(`Thread${id}`, (message) => {
    //       !!message && this.onmessage && this.onmessage(message);
    //     });
    //     return id;
    //   })
    //   .catch(err => { throw new Error(err) });
  }

  postMessage(message) {
    ThreadManager.postThreadMessage(1, message)
  }

  terminate() {
    ThreadManager.stopThread(1)
  }
}
