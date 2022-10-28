import ekRequest from "../request"

export function getAllCities() {
  return ekRequest.get({
    url: '/city/all'
  })
}