export const refreshToken = async token => {
  const result = await fetch(`https://securetoken.googleapis.com/v1/token?key=${process.env.API_KEY}`, {
    method: 'POST',
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: token,
    }),
  });
  const { id_token, refresh_token } = await result.json();
  sessionStorage.setItem('refreshToken', refresh_token);

  return id_token;
};
