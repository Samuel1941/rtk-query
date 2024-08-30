/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8080/api/:path*', // Redirige las solicitudes a tu backend
        },
      ];
    },
  };
  
  export default nextConfig;