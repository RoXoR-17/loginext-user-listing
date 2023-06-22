export const USER_API_ENDPOINT = "https://jsonplaceholder.typicode.com/users";

export const getAvatarUrl = (username = "") =>
  `https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy`;
