export async function signupUser(wallet: string, description: string) {
    const url = `https://feedme-backend.vercel.app/v1/signUp?wallet=${wallet}&description=${encodeURIComponent(description)}`;
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to sign up user");
    }
  
    return await response.json(); // { message, value: null }
  }
  