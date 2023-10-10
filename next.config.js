/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    output: 'export',
    experimental:{
        serverActions: true
    }
}

module.exports = nextConfig
 
