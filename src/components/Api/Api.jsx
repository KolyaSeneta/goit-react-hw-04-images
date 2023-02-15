import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api`;

export const Api = async (inputValue, pageNr) => {
  const response = await axios.get(`/?q=${inputValue}&page=${pageNr}&key=15963346-ad2ef4852e1004dd885e00ad5&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits.map(image => {
    return {
      id: image.id,
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
      tags: image.tags,
    };
  });
};