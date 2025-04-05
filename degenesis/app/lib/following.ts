export async function fetchFollowing(wallet: string): Promise<string[]> {
    const url = `https://feedme-backend.vercel.app/v1/following/${wallet}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch following list");
    return res.json(); // list of wallet addresses
  }
  
  export async function fetchFeed(wallet: string) {
    const url = `https://feedme-backend.vercel.app/v1/feed/${wallet}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch feed for ${wallet}`);
    return res.json(); // list of tweets
  }
  