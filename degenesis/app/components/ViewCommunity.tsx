'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ViewCommunity() {
  const [community, setCommunity] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("feedme:viewCommunity");
    if (!stored) {
      router.push("/"); // Fallback if no community stored
      return;
    }
    setCommunity(JSON.parse(stored));
  }, [router]);

  if (!community) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white rounded-xl border border-gray-100">
      <h1 className="text-2xl font-bold mb-2">{community.name}</h1>
      <p className="text-gray-700 mb-4">{community.description}</p>
      <Image
        src="/feedme.webp"
        alt="Community"
        width={100}
        height={100}
        className="rounded-md"
      />
      <p className="mt-4 text-sm text-gray-500">
        Total Members: {community.members}
      </p>
    </div>
  );
}
