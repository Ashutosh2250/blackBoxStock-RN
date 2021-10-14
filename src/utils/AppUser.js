class AppUser {
    static appInstance = null;
    /**
    * @returns {AppUser}
    */
    static getInstance() {
        if (this.appInstance == null) {
            AppUser.appInstance = new AppUser();
        }
        return this.appInstance;
    }
    token = "";
    userId = "";
    userDetails = "";
    email = "";
    phone = "";
    userName = "";
    name = "";
    fcmToken = null;
    notif = null
}
export default AppUser;