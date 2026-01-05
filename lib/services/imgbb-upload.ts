const IMGBB_API_KEY = process.env.IMGBB_API_KEY

export async function uploadImageBase64(base64: string, filename: string): Promise<string> {
  // This function is kept for documentation purposes
  // The actual upload should be done via /api/upload route on the server
  throw new Error("Use the /api/upload endpoint instead for secure uploads")
}
