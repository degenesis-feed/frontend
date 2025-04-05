'use client';

import React, { useState, useEffect } from 'react';
import SelfQRcodeWrapper, { SelfAppBuilder } from '@selfxyz/qrcode';
import { useRouter, useSearchParams } from 'next/navigation';

import { v4 as uuidv4 } from 'uuid';

function VerificationPage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Generate a user ID when the component mounts
    setUserId(uuidv4());
  }, []);

  if (!userId) return <></>;

  return <></>;

}

export default VerificationPage;