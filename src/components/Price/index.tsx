import { useRecoilValue } from "recoil";
import { tickersDataAtom } from "../../atoms";
import * as style from "./styles";
import TrendBlock from "./TrendBlock";

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
    <style.Container>
      <style.AthContainer>
        <style.Column>
          <style.SubText>
            {formatAthDate(tickersData?.quotes.USD.ath_date)}
          </style.SubText>
          <style.SubText>최고가 달성</style.SubText>
        </style.Column>
        <style.MainText>
          ${tickersData?.quotes.USD.ath_price.toFixed(3)}
        </style.MainText>
      </style.AthContainer>
      <style.Blocks>
        <TrendBlock
          label="1시간 전보다"
          percentChange={tickersData?.quotes.USD.percent_change_1h}
        />
        <TrendBlock
          label="6시간 전보다"
          percentChange={tickersData?.quotes.USD.percent_change_6h}
        />
      </style.Blocks>
      <style.Blocks>
        <TrendBlock
          label="12시간 전보다"
          percentChange={tickersData?.quotes.USD.percent_change_12h}
        />
        <TrendBlock
          label="24시간 전보다"
          percentChange={tickersData?.quotes.USD.percent_change_24h}
        />
      </style.Blocks>
      <style.Blocks>
        <TrendBlock
          label="7일 전보다"
          percentChange={tickersData?.quotes.USD.percent_change_7d}
        />
        <TrendBlock
          label="30일 전보다"
          percentChange={tickersData?.quotes.USD.percent_change_30d}
        />
      </style.Blocks>
    </style.Container>
  );
};

export default Price;
