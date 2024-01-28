export type ITokenData = {
    id: string
    email: string
}

export type loginResponse = {
    accessToken: string
    refreshToken:string
    // expires_in:string
}

export type registerResponse = {
    accessToken: string
    refreshToken:string
}
export type refreshTokenResponse = {
    accessToken: string
    refreshToken:string
}