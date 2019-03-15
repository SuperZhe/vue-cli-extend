// 时间方法

import dayjs from "dayjs";

class Date {
  /**
   * 时间转换
   * @params {Number} [timestamp] 时间戳/date数据
   * @return 返回数据为格式化之后的时间（2018-12-03）
   */
  formatDate(timestamp) {
    return dayjs(timestamp).format("YYYY-MM-DD");
  }
  /**
   * 格式化之后带时分秒
   * @param {String/Number} [val] 时间戳/date数据
   * @return 返回数据为格式化之后的时间（2018-12-03 12:00:01）
   */
  formatDateHms(val) {
    return dayjs(val).format("YYYY-MM-DD hh:mm:ss");
  }
  /**
   * 获取两个对象时间差
   * @param {String/Number}[startTime] 开始时间 减数
   * @param {String/Number}[endime] 结束时间 被减数
   * @param {String} [type] 确认返回的结果为天数还是月数 默认为天
   */
  DateDiff(time1, time2, type = "day") {
    return dayjs(time2).diff(dayjs(time1), type);
  }
  /**
   * 计算加上几个月之后得到的格式化之后的结果
   * @param {String} [value] 初始日期
   * @param {Number/String} [addDate] 需要添加的月数
   * @return {String} 返回时间相加之后的格式化之后的时间
   */
  addDate(value, addDate) {
    return dayjs(value)
      .add(addDate, "month")
      .format("YYYY-MM-DD");
  }
}

export default Date;
