async function encryptData(data: any): Promise<string> {
    const jsonString = JSON.stringify(data);
    const encodedString = btoa(jsonString);
  
    const sha256Digest = async (message: string): Promise<ArrayBuffer> => {
      const encoder = new TextEncoder();
      const data = encoder.encode(message);
      return window.crypto.subtle.digest('SHA-256', data);
    };
  
    const buffer = await sha256Digest(encodedString);
    const encryptedString = Array.from(new Uint8Array(buffer))
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  
    return encryptedString;
  }