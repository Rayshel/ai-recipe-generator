import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App({ signOut, user }) {
  return (
    <div>
      <h1>Welcome {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
      {/* Rest of your app here */}
    </div>
  );
}

export default withAuthenticator(App);
