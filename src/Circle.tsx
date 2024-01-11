import { useState } from "react";
import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string; // required
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string; // optional props
}

const Circle = ({ bgColor, borderColor }: CircleProps) => {
  // state의 type을 지정하려면 Generics 안에 타입 지정
  // 일반적으로 초기값을 지정하면 타입스크립트가 자동으로 타입을 유추하기 때문에 굳이 지정해 주지 않아도 됨
  // 상태가 undefined 또는 null이 될 수도 있거나 객체 또는 배열일 때는 지정해 주는 것이 좋음
  const [value, setValue] = useState<number | null>(null);

  return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor} />;
};

export default Circle;
