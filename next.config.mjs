/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      AIRTABLE_API_TOKEN: process.env.AIRTABLE_API_TOKEN
    },
  };
  
  export default nextConfig;
  