export const isCookieExpired = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('access_token='));
    return !token;
  };