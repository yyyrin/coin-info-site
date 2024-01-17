import * as style from "./styles";

interface TrendBlockProps {
  label: string;
  percentChange: number | undefined;
}

const TrendBlock = ({ label, percentChange }: TrendBlockProps) => {
  return (
    <style.Block>
      <style.SubText>{label}</style.SubText>
      {percentChange ? (
        <style.ContentWrapper
          style={{
            color: percentChange > 0 ? "#e6094b" : "#09e669",
          }}
        >
          <p>{percentChange}%</p>
          {percentChange > 0 ? (
            <style.ArrowUpIcStyle />
          ) : (
            <style.ArrowDownIcStyle />
          )}
        </style.ContentWrapper>
      ) : null}
    </style.Block>
  );
};

export default TrendBlock;
