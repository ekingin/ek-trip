// vite中加载本地图片
export const getLocalImgUrl = (imgUrl) => {
  return new URL(`../assets/img/${imgUrl}`, import.meta.url).href
}