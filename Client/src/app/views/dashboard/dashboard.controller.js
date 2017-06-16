export class DashboardController {
    constructor ($http, $localStorage,toastr) {
      'ngInject';
      this.$localStorage=$localStorage;
      this.$http = $http;
      this.toastr = toastr;
      this.api = "http://localhost:3000/api/";
      this.init();
      console.log("USER FOUNT:",  this.user);
    }

    init(){
        var that = this;

        //obtain all users
        this.$http.get(this.api + "/user")
            .then((users)=>{
                that.userList = users.data;
            }).catch((err)=>{

            })
        //obtain all songs
        this.$http.get(this.api + "/song")
            .then((song)=>{
                that.songList = song.data;
            }).catch((err)=>{

            })
        //obtain all playlists
        this.$http.get(this.api + "/playlist")
            .then((playlist)=>{
                that.playlistList = playlist.data;
            }).catch((err)=>{

            })
    }

    addToFavorites(item){
        var endpoint = this.api + "profile/addFavoriteSong/" + this.$localStorage.user.profile._id;
        var queryParams = "?songId="+item._id;
        this.$http.post(endpoint + queryParams)
            .then((songAdded)=>{
                this.toastr.success(item.name + " - added to favorites", "Song Added",{
                    timeOut:300
                });
            }).catch((error)=>{
                this.toastr.error(error.data.message, "Whoops!",{
                    timeOut:300
                });
            })
    }

    addToFriends(item){
        var endpoint = this.api + "profile/addFriend/" + this.$localStorage.user.profile._id;
        var queryParams = "?userId="+item._id;
        this.$http.post(endpoint + queryParams)
            .then((songAdded)=>{
                this.toastr.success(item.name + " - added to friends", "Friend Added",{
                    timeOut:300
                });
            }).catch((error)=>{
                this.toastr.error(error.data.message, "Whoops!",{
                    timeOut:300
                });
            })
    }

    addPlaylist(item){
        console.log("playlyst: ", item);
        var endpoint = this.api + "profile/addPlaylist/" + this.$localStorage.user.profile._id;
        var queryParams = "?playlistId="+item._id;
        this.$http.post(endpoint + queryParams)
            .then((songAdded)=>{
                this.toastr.success(item.name + " - added", "playlist Added",{
                    timeOut:300
                });
            }).catch((error)=>{
                this.toastr.error(error.data.message, "Whoops!",{
                    timeOut:300
                });
            })
    }

    obtainUserInfo(){
        var favorites = this.user.profile.favorites;
        var playlist = this.user.profile.playlist;
        var friends = this.user.profile.friends;
    }

    // obtainSong(item){
    //     console.log("Item selected: ", item);
    // }
    //
    // obtainFriend(item){
    //     console.log("Item selected: ", item);
    // }
    //
    // obtainPlaylist(item){
    //     console.log("Item selected: ", item);
    // }

    clear(item){
        console.log("Item to clear; ", item);
    }
}
