'use client';

import React, { useState, useEffect } from 'react';
import SelfQRcodeWrapper, { SelfAppBuilder } from '@selfxyz/qrcode';
import { useRouter, useSearchParams } from 'next/navigation';

import { v4 as uuidv4 } from 'uuid';

function VerificationPage() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState<string | null>(null);
  const communityId = searchParams.get("communityId");
  const verificationType = searchParams.get("type");

  useEffect(() => {
    setUserId(uuidv4());
  }, []);


  useEffect(() => {
    // Generate a user ID when the component mounts
    setUserId(uuidv4());
  }, []);

  if (!userId) return null;

  //   Create the SelfApp configuration
  const selfApp = new SelfAppBuilder({
    appName: "FeedMe",
    scope: "feedme",
    endpoint: "https://fac0-111-235-226-130.ngrok-free.app/api/verify",
    userId,
    disclosures: {
        minimumAge: 18,
      }
  }).build();

  return (
    <div className="verification-container">
      <h1>Verify Your Identity</h1>
      <p>Scan this QR code with the Self app to verify your identity</p>
      
      <SelfQRcodeWrapper
        selfApp={selfApp}
        onSuccess={() => {
          // Handle successful verification
          console.log("Verification successful!");
          router.push(`/community/${communityId}`); // ✅ redirect after proof
          // Redirect or update UI
        }}
        size={350}
      />
      
      <p className="text-sm text-gray-500">
        User ID: {userId.substring(0, 8)}...
      </p>
    </div>
  );
}

export default VerificationPage;