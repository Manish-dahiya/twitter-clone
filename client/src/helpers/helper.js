
export const decodeToken = (token) => {
  try {
    const arrayToken = token.split('.');
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    console.log(tokenPayload.id)
    return tokenPayload.id
  } catch (error) {
    console.error("Error decoding token", error);
    return null;
  }
};
