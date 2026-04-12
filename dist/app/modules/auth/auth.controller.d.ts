import type { Request, Response, NextFunction } from "express";
export declare const AuthController: {
    credentialsLogin: (req: Request, res: Response, next: NextFunction) => void;
    getNewAccessToken: (req: Request, res: Response, next: NextFunction) => void;
    logout: (req: Request, res: Response, next: NextFunction) => void;
    resetPassword: (req: Request, res: Response, next: NextFunction) => void;
    googleCallbackController: (req: Request, res: Response, next: NextFunction) => void;
    forgetPassword: (req: Request, res: Response, next: NextFunction) => void;
    setPassword: (req: Request, res: Response, next: NextFunction) => void;
    verifyEmail: (req: Request, res: Response, next: NextFunction) => void;
    resendVerification: (req: Request, res: Response, next: NextFunction) => void;
};
//# sourceMappingURL=auth.controller.d.ts.map