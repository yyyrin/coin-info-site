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
  text?: string;
}

const Circle = ({
  bgColor,
  borderColor,
  text = "default text", // default 값 설정
}: CircleProps) => {
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
};

export default Circle;
