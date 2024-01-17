import { BrowserRouter, Switch, Route } from "react-router-dom";
import CoinDetailPage from "./pages/CoinDetailPage";
import HomePage from "./pages/HomePage";

const Router = () => {
  return (
    <BrowserRouter>
      {/* Switch: 한 번에 하나의 Route를 렌더링, react-router-dom 버전 6부터 Routes로 변경 */}
      <Switch>
        {/* /:coinId => 사용자가 접속한 URL에서 해당 부분에 어떠한 값이 들어가면 그 값을 변수로 인식 */}
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
