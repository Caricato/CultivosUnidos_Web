import rolesinfo from "@/assets/js/rolesinfo.js";
import userTypes from "@/assets/js/users"

export const getFilteredRoutes = (user) => {
  let filteredRoles = [];
  for (let index in userTypes) {
    const { id, name } = userTypes[index]
    const username = user ? user[name] : ''
     if (username) {
      const objrole = rolesinfo.find((obj) => obj.id === id);
      filteredRoles.push(objrole);
    }
  }
  return filteredRoles;
};

export const getLoginRoute = (user) => {
  const routes = getFilteredRoutes(user)
  if (routes.length === 1) {
    return routes[0].route
  } else {
    return '/roles'
  }
};
