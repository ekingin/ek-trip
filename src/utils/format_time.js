import dayjs from "dayjs";

// 格式化日期
export function formatDate(date, format = 'MM月DD日') {
  return dayjs(date).format(format)
}

// 获取两个日期的时间差
export function getDateDiff(startDate, endDate) {
  return dayjs(startDate).diff(endDate, 'day')
}