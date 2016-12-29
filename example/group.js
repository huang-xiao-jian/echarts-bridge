/* global bk, echarts */
(function () {
  'use strict';
  
  let element1 = document.querySelector('.echarts-box');
  let element2 = document.querySelector('.echarts-box-sibling');
  
  let options1 = {
    tooltip : {
      trigger: 'axis'
    },
    legend: {
      data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    },
    xAxis : [
      {
        type : 'category',
        boundaryGap : false,
        data : ['周一','周二','周三','周四','周五','周六','周日']
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'邮件营销',
        type:'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data:[120, 132, 101, 134, 90, 230, 210]
      },
      {
        name:'联盟广告',
        type:'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data:[220, 182, 191, 234, 290, 330, 310]
      },
      {
        name:'视频广告',
        type:'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data:[150, 232, 201, 154, 190, 330, 410]
      },
      {
        name:'直接访问',
        type:'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data:[320, 332, 301, 334, 390, 330, 320]
      },
      {
        name:'搜索引擎',
        type:'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data:[820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  };
  
  let options2 = {
    title: {
      text: '堆叠区域图'
    },
    tooltip : {
      trigger: 'axis'
    },
    legend: {
      data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    },
    xAxis : [
      {
        type : 'category',
        data : ['周一','周二','周三','周四','周五','周六','周日']
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'邮件营销',
        type:'bar',
        data:[120, 132, 101, 134, 90, 230, 210]
      },
      {
        name:'联盟广告',
        type:'bar',
        data:[220, 182, 191, 234, 290, 330, 310]
      },
      {
        name:'视频广告',
        type:'bar',
        data:[150, 232, 201, 154, 190, 330, 410]
      },
      {
        name:'直接访问',
        type:'bar',
        data:[320, 332, 301, 334, 390, 330, 320]
      },
      {
        name:'搜索引擎',
        type:'bar',
        data:[820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  };

  let stream1 = Reflect.construct(bk.echarts.Bridge, []);
  let stream2 = Reflect.construct(bk.echarts.Bridge, []);
  
  stream1.group = 'example';
  stream2.group = 'example';
  
  stream1.setOption(options1).connect(element1).setOption({title: {text: '广告来源'}});
  stream2.connect(element2).showLoading();
  setTimeout(() => {
    stream2.hideLoading().setOption(options2).setOption({title: {text: '广告收益'}});
  }, 1500);
  
  setTimeout(() => {
    echarts.connect([stream1, stream2]);
  }, 5000);
})();