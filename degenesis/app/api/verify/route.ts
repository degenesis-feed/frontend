import { NextRequest, NextResponse } from 'next/server';
import { getUserIdentifier, SelfBackendVerifier } from '@selfxyz/core';

// Named export for POST request
export async function POST(req: NextRequest) {
  try {
    const { proof, publicSignals } = await req.json(); // Parse JSON body from the request

    if (!proof || !publicSignals) {
      return NextResponse.json(
        { message: 'Proof and publicSignals are required' },
        { status: 400 }
      );
    }

    // Extract user ID from the proof
    const userId = await getUserIdentifier(publicSignals);
    console.log("Extracted userId:", userId);

    // Initialize and configure the verifier
    const selfBackendVerifier = new SelfBackendVerifier(
      'feedme', 
      "https://fac0-111-235-226-130.ngrok-free.app/api/verify", // Replace with ngrok URL
      "uuid", // You may replace this with an actual userId or other identifier if required
      true // Assuming `true` is the verification flag
    );

    selfBackendVerifier.setMinimumAge(18);

    // Verify the proof
    const result = await selfBackendVerifier.verify(proof, publicSignals);
    
    if (result.isValid) {
      // Return successful verification response
      return NextResponse.json({
        status: 'success',
        result: true,
        credentialSubject: result.credentialSubject
      });
    } else {
      // Return failed verification response
      return NextResponse.json({
        status: 'error',
        result: false,
        message: 'Verification failed',
        details: result.isValidDetails
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error verifying proof:', error);
    return NextResponse.json({
      status: 'error',
      result: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
