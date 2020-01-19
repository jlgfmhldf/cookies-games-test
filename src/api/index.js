export const getArticles = ({ id, count }) => {
  const access_token = 'bdd3e910bdd3e910bdd3e9101bbdbcdbc8bbdd3bdd3e910e3f769d46b031001ca6ee7cd';
  const cors_helper = 'https://cors-anywhere.herokuapp.com/'

  return fetch(`${cors_helper}api.vk.com/method/wall.get?domain=${id}&access_token=${access_token}&count=${count}&v=5.85`)
    .then(data => data.json())
}


