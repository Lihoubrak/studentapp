import base64 from "base-64";
const fetchUserToken = async (auth) => {
  if (auth) {
    try {
      const trimmedToken = auth.trim();
      const decodedToken = JSON.parse(
        base64.decode(trimmedToken.split(".")[1])
      );

      if (!decodedToken || !decodedToken.id) {
        console.error("Invalid or missing user ID in the decoded token.");
        return null;
      }
      return decodedToken;
    } catch (error) {
      console.error("Error fetching user ID from token:", error);
      return null;
    }
  }
};
export default fetchUserToken;
