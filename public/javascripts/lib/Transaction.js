/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
/* 토큰 헤더에 담는 코드 - 테스트용, 변경 예정
export default function checkAuthToken() {
  const token = sessionStorage.getItem('token');
  if (clientToken) {
    axios.defaults.headers.common['x-auth-token'] = clientToken;
  }
  delete axios.defaults.headers.common['x-auth-token'];
  const header = {
    headers: {
      'content-type': 'application/json',
    },
  };
}
*/

export async function loadMonthAccountHistory(monthstr) {
  const apiurl = `/api/v1/content/list/currentmonth/${monthstr}`;
  let res = await axios.get(apiurl);
  res = res.data.res;
  return res;
}

export async function addAccountHistory(history) {
  const apiurl = '/api/v1/content/add';
  try {
    let res = await axios.post(apiurl, history);
    res = res.data.res;

    return res;
  } catch (e) {
    return false;
  }
}
export async function modifyAccountHistory(history) {
  const apiurl = '/api/v1/content/modify';
  try {
    let res = await axios.put(apiurl, history);
    res = res.data.res;

    return res;
  } catch (e) {
    return false;
  }
}
export async function removeAccountHistory(history) {
  const apiurl = '/api/v1/content/delete';

  try {
    let res = await axios.delete(apiurl, { params: history });
    res = res.data.res;
    return res;
  } catch (e) {
    return false;
  }
}

export async function getCategoryList(typeid) {
  const apiurl = `/api/v1/category/list/${typeid}`;
  // eslint-disable-next-line no-undef
  try {
    let res = await axios.get(apiurl);
    res = res.data.res;
    return res;
  } catch (e) {
    return null;
  }
}

export async function getCategoryTypeList() {
  const apiurl = '/api/v1/category/type/list';
  // eslint-disable-next-line no-undef
  try {
    let res = await axios.get(apiurl);
    res = res.data.res;
    return res;
  } catch (e) {
    return null;
  }
}
export async function loadMonthStatistic(monthstr) {
  const apiurl = `/api/v1/stastics/category/${monthstr}`;
  let res = await axios.get(apiurl);
  res = res.data.res;
  return res;
}

// 회원가입 시도
export async function signup(userData = {}) {
  const apiurl = '/api/v1/user/signup';
  const res = await axios.post(apiurl, userData);
  return res.data.res;
}

// 로그인을 시도하여 jwt토큰을 얻어옴
export async function getLoginToken(loginData = {}) {
  const apiurl = '/api/v1/auth/tokens';
  const res = await axios.post(apiurl, loginData);
  return res.data;
}
