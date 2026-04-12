import type { Response } from "express";
export interface AuthTokenInfo {
    accessToken: string;
    refreshToken?: string;
}
export declare const setAuthCookie: (res: Response, tokenInfo: AuthTokenInfo) => void;
//# sourceMappingURL=setCookie.d.ts.map