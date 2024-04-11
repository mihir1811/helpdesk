import { useSelector } from "react-redux";

export const Title = () => {
  const selectedTab = useSelector((state) => state.selectedTab);
  return (
    <>
      <p className="text-3xl font-bold">{selectedTab}</p>
    </>
  );
};
