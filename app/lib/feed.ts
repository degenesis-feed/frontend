export async function fetchOwnFeed(walletAddress: string) {
    const response = await fetch(
      `https://feedme-backend.vercel.app/v1/feed/${walletAddress}`
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch own feed");
    }
  
    const result = await response.json();
  
    // Flatten the outer array
    return result.flat(); // returns FeedEvent[]
  }
  