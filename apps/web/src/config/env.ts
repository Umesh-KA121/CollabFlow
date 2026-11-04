const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error('VITE_API_URL is missing from the environment');
}

export const env = {
  API_URL: apiUrl,
};
