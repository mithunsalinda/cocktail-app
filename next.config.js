/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    images: { unoptimized: true},
    //output: 'export',
    experimental:{
        serverActions: true
    }
}

module.exports = nextConfig
 
