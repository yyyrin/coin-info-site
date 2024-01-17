import styled from "styled-components";
import { ReactComponent as ArrowUpIc } from "../../assets/arrowTrendUpIc.svg";
import { ReactComponent as ArrowDownIc } from "../../assets/arrowTrendDownIc.svg";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

export const AthContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 30px 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  line-height: 1.3;
`;

export const Column = styled.div`
  flex-direction: column;
`;

export const SubText = styled.p`
  color: ${(props) => props.theme.subTextColor};
  font-size: 14px;
  font-weight: 600;
`;

export const MainText = styled.p`
  font-size: 30px;
  font-weight: 500;
`;

export const Blocks = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 20px 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  line-height: 1.3;
  gap: 8px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 32px;
`;

export const ArrowUpIcStyle = styled(ArrowUpIc)`
  width: 40px;
  height: 40px;
  fill: #e6094b;
`;

export const ArrowDownIcStyle = styled(ArrowDownIc)`
  width: 40px;
  height: 40px;
  fill: #09e669;
`;