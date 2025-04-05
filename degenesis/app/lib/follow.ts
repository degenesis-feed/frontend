// lib/follow.ts
export async function followUser(walletAddress: string, wallet: string, {
    follower, whoToFollow, profileOrCommunity = "profile",
}: {
    follower: string;
    whoToFollow: string;
    profileOrCommunity?: "profile" | "community";
}) {
    const url = `https://feedme-backend.vercel.app/v1/follow?follower=${follower}&who_to_follow=${whoToFollow}&profile_or_community=${profileOrCommunity}`;
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to follow user");
    }
  
    return await response.json();
  }
  
export async function unfollowUser({
    follower,
    whoToUnfollow,
    profileOrCommunity = "profile",
  }: {
    follower: string;
    whoToUnfollow: string;
    profileOrCommunity?: "profile" | "community";
  }) {
    const url = `https://feedme-backend.vercel.app/v1/unfollow?follower=${follower}&who_to_unfollow=${whoToUnfollow}&profile_or_community=${profileOrCommunity}`;
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to unfollow user");
    }
  
    return await response.json();
  }  