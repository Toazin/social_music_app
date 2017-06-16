export class ProfileController {
  constructor ($http, $localStorage) {
    'ngInject';
    this.$http = $http;
    this.$localStorage = $localStorage;
    this.api = "http://localhost:3000/api/";
    this.init();
  }

  init(){
      var that = this;
      this.user = this.$localStorage.user;
      this.$http.get(this.api + "profile/" + this.user.profile._id)
          .then((profile)=>{
              console.log(profile);
              this.userProfile = profile.data;
              this.favorites = this.userProfile.favorites;
              this.friends = this.userProfile.friends;
              this.playlists = this.userProfile.playlists;
              console.log("FAVORITES: ", this.favorites);
          })
          .catch((err)=>{
              console.log("error:", err);
          })
  }
}
