export function dataRandomSort(data: any) {
  let sortData: any = [];

  const copyData = [...data];

  if (data.length > 1) {
    const [movieStream, tvStream] = copyData;
    const movieData = movieStream.data.results;
    const tvData = tvStream.data.results;
    const concat = movieData.concat(tvData);
    sortData = concat;
  } else sortData = copyData[0].data.results;

  return sortData.sort(() => Math.random() - 0.5);
}
