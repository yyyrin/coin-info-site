import "styled-components";

// styled components의 테마 정의 확장
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    cardBgColor: string;
    subTextColor: string;
  }
}
