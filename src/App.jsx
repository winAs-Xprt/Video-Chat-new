import {
  CallingState,
  ParticipantView,
  SpeakerLayout,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  CallControls, // Import CallControls here
} from '@stream-io/video-react-sdk';
import { StreamTheme } from '@stream-io/video-react-sdk';

const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL05vbV9Bbm9yIiwidXNlcl9pZCI6Ik5vbV9Bbm9yIiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3MzA3NDU4NDMsImV4cCI6MTczMTM1MDY0M30.cjvPD6RFZUE_l08ZytZUnSo3DnTKCtHoPShfH78YpN4';
const userId = 'Nom_Anor';
const callId = 'p4qFJ6ZUJ5LP';

const user = {
  id: userId,
  name: 'Oliver',
  image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('default', callId);
call.join({ create: true });

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme style={{ position: 'relative' }}>
      <SpeakerLayout participantsBarPosition='bottom' />
      <CallControls /> {/* CallControls component is now defined */}
    </StreamTheme>
  );
};

export default function App() {
  return (
    <div className="str-video">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <MyUILayout />
        </StreamCall>
      </StreamVideo>
    </div>
  );
}

export const MyParticipantList = ({ participants }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
        width: '100vw',
      }}
    >
      {participants.map((participant) => (
        <div
          key={participant.sessionId}
          style={{ width: '100%', aspectRatio: '3 / 2' }}
        >
          <ParticipantView muteAudio participant={participant} />
        </div>
      ))}
    </div>
  );
};

export const MyFloatingLocalParticipant = ({ participant }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        width: '250px',
        height: '135px',
        boxShadow: 'rgba(0,0,0,0.1) 0px 0px 10px 3px',
        borderRadius: '12px',
      }}
    >
      {participant && <ParticipantView muteAudio participant={participant} />}
    </div>
  );
};
