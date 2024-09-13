// Simple test script (e.g., in a test component or console)

import { connectWallet } from './eth';

async function testConnectWallet() {
  try {
    const address = await connectWallet();
    console.log('Connected address:', address);
  } catch (error) {
    console.error('Error connecting wallet:', error);
  }
}

testConnectWallet();
