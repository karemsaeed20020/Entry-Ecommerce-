


export interface BackendUserData {
    name: string;
    email: string;
    avatar?: string;
    authProvider: string;
    authUid: string;
    isOAuthUser: boolean;
}