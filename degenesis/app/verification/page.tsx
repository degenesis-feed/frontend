'use client';

import React, { useState, useEffect } from 'react';
import SelfQRcodeWrapper, { SelfAppBuilder } from '@selfxyz/qrcode';
// import { v4 as uuidv4 } from 'uuid';

function VerificationPage() {
  // const [userId, setUserId] = useState<string | null>(null);
return <></>

  // const [address, setAddress] = useState("0xAA6C32B4C3B869201A3e162F24bBe37BCacB02D9");

  // // useEffect(() => {
  // //   // Generate a user ID when the component mounts
  // //   setUserId(uuidv4());
  // // }, []);

  // // if (!userId) return null;

  // //   Create the SelfApp configuration
  // const selfApp = new SelfAppBuilder({
  //   appName: "FeedMe",
  //   scope: "feedme",
  //   endpoint: "https://bc75-111-235-226-130.ngrok-free.app/api/verify",
  //   userId: address,
  //   userIdType: "hex",
  //   disclosures: {
  //       minimumAge: 18,
  //     }
  // }).build();

  // return (
  //   <div className="verification-container">
  //     <h1>Verify Your Identity</h1>
  //     <p>Scan this QR code with the Self app to verify your identity</p>
      
  //     <SelfQRcodeWrapper
  //       selfApp={selfApp}
  //       onSuccess={() => {
  //         // Handle successful verification
  //         console.log("Verification successful!");
  //         // Redirect or update UI
  //       }}
  //       size={350}
  //     />
      
  //   </div>
  // );
}

export default VerificationPage;