import { Dispatch, useState } from "react";

declare interface ReturnedData<T> {
  value: T;
  setValue: Dispatch<T>;
}

const useInput = <T>(defaultValue: T): ReturnedData<T> => {
  const [value, setValue] = useState(defaultValue);

  return { value, setValue };
};

export default useInput;
