import { BrowserRouter, Switch, Route } from "react-router-dom";
import CoinDetailPage from "./pages/CoinDetailPage";
import HomePage from "./pages/HomePage";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/:coinId">
          <CoinDetailPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
