/* eslint-disable import/prefer-default-export */
// 숫자를 미국식 표기법(3자리마다 , 추가) 문자열로 변환
export function convertNumberFormat(number) {
  return Number(number).toLocaleString('en');
}

// date undefined , null이면 현재 달 문자열 반환
// date객체를 YYYY-MM형식 문자열로 변환
export function getMonthStr(date) {
  let now = null;
  if (date) now = new Date(date);
  else now = new Date();
  const currentMonthStr = [now.getFullYear(), `0${now.getMonth() + 1}`.slice(-2)].join('-');
  return currentMonthStr;
}

// 해당 연도 월의 날짜수를 반환
export function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// RGB code생성하는 함수
export function toRGBCode(red = 255, blue = 255, green = 255) {
  return `#${red.toString(16)}${blue.toString(16)}${green.toString(16)}`;
}
