/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-10 18:39:33
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-10-10 18:40:58
 */
const toString = (obj: echarts.EChartOption) => {
  let result = JSON.stringify(obj);

  result = result.replace(/\\n/g, '').replace(/\\\"/g, '"'); //最后一个replace将release模式中莫名生成的\"转换成"
  result = unescape(result.replace(/\\u/g, '%u'));
  return result.replace('"$$', '').replace('$$"', '');
};

export { toString };
