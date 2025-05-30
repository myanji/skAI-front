import { useState } from "react";

const useSelectIndex = () => {
  const [selectIndex, setSelectIndex] = useState(null);

  const onClickBtn = (index) => {
    setSelectIndex(index);
  };

  return { selectIndex, onClickBtn };
};

export default useSelectIndex;
