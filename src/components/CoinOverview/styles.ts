import styled from "styled-components";
import { ReactComponent as ArrowIc } from "../../assets/arrowIc.svg";

export const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

export const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  margin: 30px 20px;
  justify-content: space-between;
`;

export const BackIcStyle = styled(ArrowIc)`
  width: 40px;
  height: 40px;
  fill: ${(props) => props.theme.accentColor};
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 40px;
  color: ${(props) => props.theme.accentColor};
  font-weight: 600;
`;

export const RightComponent = styled.div`
  width: 40px;
  height: 40px;
  visibility: hidden;
`;

export const Loader = styled.span`
  text-align: center;
  display: block;
`;

export const Overview = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 16px 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  line-height: 1.3;
`;

export const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  span:first-child {
    color: ${(props) => props.theme.subTextColor};
    font-size: 10px;
    font-weight: 400;
    margin-bottom: 2px;
  }
`;

export const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 40px 0px;
  gap: 16px;
`;

export const Tab = styled.span<{ $isActive: Boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) =>
    props.$isActive ? props.theme.accentColor : props.theme.subTextColor};
  a {
    display: block;
  }
`;
