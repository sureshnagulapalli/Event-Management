export class AuthContent {
    private authData = {
        userId: '',
        token: '',
        tokenExpiration: 0
    }
    getData() {
        return this.authData;
    }
    
    setLoginData(loginInfo: {userId: string, token: string, tokenExpiration: number}) {
        this.authData.userId = loginInfo.userId;
        this.authData.token = loginInfo.token;
        this.authData.tokenExpiration = loginInfo.tokenExpiration;
        localStorage.setItem('token', loginInfo.token);
        localStorage.setItem('user', loginInfo.userId);
    }

    setLogoutData() {
        this.authData.token = '';
        this.authData.userId = '';
        this.authData.tokenExpiration = 0;

        localStorage.clear();
    }
}