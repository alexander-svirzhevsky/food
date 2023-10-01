export const getToken = <T>(key: string): T | null => {
  try {
    const jsonData = localStorage.getItem(key);
    if (!jsonData) {
      return null
    }

    return JSON.parse(jsonData);
  } catch (e) {
    console.log(e)
    return null;
  }
}

export const saveToken = <T>(state: T, key: string) => {
  localStorage.setItem(key, JSON.stringify(state))
}