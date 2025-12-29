import { createContext, useState } from "react";
export const AppContext = createContext();
const AppContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const values = {
    user,
    setUser,
  };
  return (
    <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
