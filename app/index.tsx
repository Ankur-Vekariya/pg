import { Redirect } from "expo-router";
import { useSelector } from "react-redux";

const Index = () => {
  const user = useSelector((state) => state.user.auth);
  console.log("in index file =================", user);

  if (!user?.session?.access_token) {
    return <Redirect href="/login/" />;
  } else {
    return <Redirect href="/(tabs)" />;
  }
};
export default Index;
