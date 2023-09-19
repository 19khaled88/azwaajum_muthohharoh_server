/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath:'',
    distDir:'build',
    generateBuildId:async()=>{
        return 'my-id-build'
    },
    eslint:{
        ignoreDuringBuilds:true
    },
    // trailingSlash:true,
    env:{
        customKey:'my-value'
    }
}

module.exports = nextConfig
