import { Redirect } from "expo-router";

const Index = () => {
  console.log("in index file =================");

  return <Redirect href="/login/" />;
};
export default Index;
