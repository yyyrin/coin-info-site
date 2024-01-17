import { useRecoilValue } from "recoil";
import { tickersDataAtom } from "../atoms";
import styled from "styled-components";
import { ReactComponent as ArrowUpIc } from "../assets/arrowTrendUpIc.svg";
import { ReactComponent as ArrowDownIc } from "../assets/arrowTrendDownIc.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

const AthContainer = styled.div`
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

const Column = styled.div`
  flex-direction: column;
`;

const SubText = styled.p`
  color: ${(props) => props.theme.subTextColor};
  font-size: 14px;
  font-weight: 600;
`;

const MainText = styled.text`
  font-size: 30px;
  font-weight: 500;
`;

const Blocks = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const Block = styled.div`
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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 32px;
`;

const ArrowUpIcStyle = styled(ArrowUpIc)`
  width: 40px;
  height: 40px;
  fill: #e6094b;
`;

const ArrowDownIcStyle = styled(ArrowDownIc)`
  width: 40px;
  height: 40px;
  fill: #09e669;
`;

interface TrendBlockProps {
  label: string;
  percentChange: number | undefined;
}

const TrendBlock = ({ label, percentChange }: TrendBlockProps) => {
  return (
    <Block>
      <SubText>{label}</SubText>
      {percentChange ? (
        <ContentWrapper
          style={{
            color: percentChange > 0 ? "#e6094b" : "#09e669",
          }}
        >
          <p>{percentChange}%</p>
          {percentChange > 0 ? <ArrowUpIcStyle /> : <ArrowDownIcStyle />}
        </ContentWrapper>
      ) : null}
    </Block>
  );
};

const Price = () => {
  const tickersData = useRecoilValue(tickersDataAtom);

  // 최고가 달성일 날짜와 시간을 포맷팅하는 함수
  const formatAthDate = (athDate: string | undefined): string | null => {
    if (!athDate) return null;

    const date = new Date(athDate);
    const formattedDate = `${date.getFullYear()}. ${
      date.getMonth() + 1
    }. ${date.getDate()}. ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    return formattedDate;
  };

  return (
    <Container>
      <AthContainer>
        <Column>
          <SubText>{formatAthDate(tickersData?.quotes.USD.ath_date)}</SubText>
          <SubText>최고가 달성</SubText>
        </Column>
        <MainText>${tickersData?.quotes.USD.ath_price.toFixed(3)}</MainText>
      </AthContainer>
      <Blocks>
        <TrendBlock
          label="1시간 전보다"
          percentChange={tickersData?.quotes.USD.percent_change_1h}
        />
        <TrendBlock
          label="6시간 전보다"
          percentChange={tickersData?.quotes.USD.percent_change_6h}
        />
      </Blocks>
      <Blocks>
        <TrendBlock
          label="12시간 전보다"
          percentChange={tickersData?.quotes.USD.percent_change_12h}
        />
        <TrendBlock
          label="24시간 전보다"
          percentChange={tickersData?.quotes.USD.percent_change_24h}
        />
      </Blocks>
      <Blocks>
        <TrendBlock
          label="7일 전보다"
          percentChange={tickersData?.quotes.USD.percent_change_7d}
        />
        <TrendBlock
          label="30일 전보다"
          percentChange={tickersData?.quotes.USD.percent_change_30d}
        />
      </Blocks>
    </Container>
  );
};

export default Price;
