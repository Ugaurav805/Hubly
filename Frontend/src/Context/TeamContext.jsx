import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const savedMembers = JSON.parse(localStorage.getItem("teamMembers")) || [];
    setTeamMembers(savedMembers);
  }, []);

  useEffect(() => {
    localStorage.setItem("teamMembers", JSON.stringify(teamMembers));
  }, [teamMembers]);

  return (
    <TeamContext.Provider value={{ teamMembers, setTeamMembers }}>
      {children}
    </TeamContext.Provider>
  );
};
