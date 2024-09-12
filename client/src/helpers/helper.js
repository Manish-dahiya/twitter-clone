
export const decodeToken = (token) => {
  try {
    const arrayToken = token.split('.');
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    return tokenPayload.id
  } catch (error) {
    console.error("Error decoding token", error);
    return null;
  }
};
