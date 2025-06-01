// src/utils/parseJwt.js
export default function parseJwt(token) {
    try {
      // JWT format: header.payload.signature
      const base64Url = token.split('.')[1];
      if (!base64Url) return null;
  
      // Replace URL-safe characters, then decode
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }
  