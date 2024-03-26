import _ from "lodash";
export function paginate(songs, currentPage, pageSize) {
  const startIndex = (currentPage - 1) * pageSize;
  return _(songs).slice(startIndex).take(pageSize).value();
}
