export interface LoginSuccess {
    accessToken: string;
    refreshToken: string;
}

export interface LoginFail {
    message: string;
    error: string;
    statusCode: number;
}