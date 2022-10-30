import ekRequest from "../request"

export function getHouseDetail(houseId) {
  return ekRequest.get({
    url: '/detail/infos',
    params: {
      houseId
    }
  })
} 