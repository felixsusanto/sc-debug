import socketClusterClient from 'socketcluster-client';

type PubSubHooks = 
  | 'record'
  | 'stopRecord'
;
type RPCHooks = 
  | 'sendRecording'
;

const initConnection = () => {
  const socket = socketClusterClient.create();

  

  const sendRecording = async(data: any) => {
    let result;
    try {
      result = await socket.invoke('sendRecording', data);
    } catch(e) {
      console.error(e);
    }
  };

  (async() => {
    const channelRecord = socket.subscribe('record');
    for await (let data of channelRecord) {
      if (data === 'start') {
        // do some recording
      }
      if (data === 'stop') {
        // stop
        sendRecording('somedata');
      }
    }
  })();

  return {
    sendRecording
  }
  
};

export default initConnection;