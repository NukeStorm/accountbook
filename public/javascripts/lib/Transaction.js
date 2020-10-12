/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
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
