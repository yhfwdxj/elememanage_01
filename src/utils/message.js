export const message = (mes, type, dangerouslyUseHTMLString = false) => {
  ElMessage({
    message: mes,
    type,
    dangerouslyUseHTMLString,
    duration: 2000,
    center: true
  })
}