export default function addHistory(type: any, id: any) {
  const historyData = localStorage.getItem("historyData");
  const addData = { type, id };

  if (!historyData) {
    const data = [addData];
    localStorage.setItem("historyData", JSON.stringify(data));
  } else {
    const getData = JSON.parse(historyData);
    let copyData = [...getData];

    const findIndex = getData.findIndex(
      (val: any) => val.type === addData.type && val.id === addData.id
    );

    if (findIndex != -1) {
      const splice = [...getData];
      splice.splice(findIndex, 1);
      copyData = [...splice];
    }

    copyData.unshift(addData);
    localStorage.setItem("historyData", JSON.stringify(copyData));
  }
}
