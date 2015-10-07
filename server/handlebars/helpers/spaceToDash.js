module.exports = function (content) {


  return content
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/>/g, '')
    .replace(/&/g, '')
    .replace(/"/g, '')
    .replace(/'/g, '')
    .replace(/“/g, '')
    .replace(/”/g, '')
    .replace(/,/g, '')
    .replace(/</g, '');



}