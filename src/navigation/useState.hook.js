import useData from "./useData.hook";

export default function useState() {
  const data = useData();
  return data.state;
}
