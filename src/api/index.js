const isNumeric = (n) => !isNaN(parseFloat(n) && isFinite(n));

const isOwnerId = (id) => {
  return isNumeric(id);
}

export const getArticles = ({ id, count, offset }) => {
  const access_token = 'bdd3e910bdd3e910bdd3e9101bbdbcdbc8bbdd3bdd3e910e3f769d46b031001ca6ee7cd';
  const cors_helper = 'https://cors-anywhere.herokuapp.com/'

  let url = `${cors_helper}api.vk.com/method/wall.get?&access_token=${access_token}&count=${count}&offset=${offset}&v=5.85`;

  if (isOwnerId(id)) {
    url  += `&owner_id=${id}`
  } else {
    url  += `&domain=${id}`
  }

  return fetch(url)
    .then(data => data.json())
}
