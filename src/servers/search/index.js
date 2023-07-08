import hyRetsuet from "../request/config";

export function getList() {
  return hyRetsuet.get({
    url: "api/v1/technical/list",
  });
}

export function getLadderList() {
  return hyRetsuet.get({
    url: "admin/api/v1/service_type/ladderlist",
  });
}

export function getAddrList(
  pageNum = 1,
  id = "",
  id2 = "",
  keywords = "",
  dataOrigin = ""
) {
  return hyRetsuet.get({
    url: `/api/v1/service/list?pageNum=${pageNum}&pageSize=10&keywords=${keywords}&serviceTypeId=${id}&serviceTypeId2=&technicalId=${id2}&province=&dataOrigin=${dataOrigin}&logicStatus=1`,
  });
}

// export function getAddrList(
//   pageNum = 1,
//   id = "",
//   id2 = "",
//   keywords = "",
//   dataOrigin = ""
// ) {
//   return hyRetsuet.get({
//     url: `api/v1/service/list?pageNum=${pageNum}&pageSize=10&keywords=${keywords}&serviceTypeId=${id}&serviceTypeId2=&technicalId=&province=${id2}&dataOrigin=${dataOrigin}&logicStatus=1`,
//   });
// }
