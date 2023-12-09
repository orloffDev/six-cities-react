import { render, screen} from '@testing-library/react';
import {Provider} from "react-redux";
import Logo from "./logo";
import {configureMockStore} from "@jedmao/redux-mock-store";
import {makeFakeStore} from "../../utils/mocks";
import {createMemoryHistory} from "history";
import App from "../app/app";
import {AppRoute} from "../../const";

const mockStore = configureMockStore();
const store = mockStore(makeFakeStore());

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <App>
      <Logo />
    </App>
  </Provider>
);

describe('Component: Logo', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Main);
    render(fakeApp);
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });
});
