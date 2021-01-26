/* eslint-disable complexity */
/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-10 18:39:33
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-14 17:55:43
 */
import { toString } from './utils';
import { EchartsProps } from '../index';

export default function renderChart(props: EchartsProps, isFirst: boolean) {
  const height = `${props.height || 400}px`;
  const width = props.width ? `${props.width}px` : 'auto';
  const option = props.option || {};

  if (isFirst) {
    return `
      document.getElementById('main').style.height = "${height}";
      document.getElementById('main').style.width = "${width}";
      myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(${toString(option)});
      ${
        props.option.series &&
        props.option.series[0].type === 'pie' &&
        `myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: 0
          });`
      }
      myChart.on('click', function (params) {
        if(params.dataIndex !== 0 && params.seriesType === 'pie'){
          myChart.dispatchAction({
            type: 'downplay',
            dataIndex: 0,
          });
        }
      });
      true;
    `;
  } else {
    return `
      document.getElementById('main').style.height = "${height}";
      document.getElementById('main').style.width = "${width}";
      myChart.clear();
      myChart.resize();
      myChart.setOption(${toString(option)});
      true;
    `;
  }
}
