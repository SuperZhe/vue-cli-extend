// 时间过滤器
import DateMethods from "@/lib/date.js";
// 继承公用方法里面的时间操作
class DateFliters extends DateMethods {
  constructor() {
    super();
  }
}
let date = new DateFliters();
let flitersMethods = {
  // 转换日期
  formatDate: date.formatDate,
  // 格式化之后带时分秒
  formatDateHms: date.formatDateHms
};
export default flitersMethods;
