import { type IUser } from "../modules/user/user.interface.js";
export declare const createTokens: (user: Partial<IUser>) => {
    accessToken: string;
    refreshToken: string;
};
export declare const createNewAccessTokenWithRefreshToken: (refreshToken: string) => Promise<{
    accessToken: string;
}>;
//# sourceMappingURL=userTokens.d.ts.map