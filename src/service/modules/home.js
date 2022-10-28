import ekRequest from '../request'

export function getHotSuggests() {
  return ekRequest.get({
    url: "/home/hotSuggests"
  })
}

export function getCategories() {
  return ekRequest.get({
    url: '/home/categories'
  })
}

export function getHouseList(currentPage) {
  return ekRequest.get({
    url: '/home/houseList',
    params: {
      page: currentPage
    }
  })
}