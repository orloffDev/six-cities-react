import WelcomeScreen from '../../pages/welcome-screen/welcome-screen';

type AppProps = {
  placesFound: number;
}

function App({placesFound}: AppProps): JSX.Element {
  return (
    <WelcomeScreen placesFound={placesFound} />
  );
}

export default App;
