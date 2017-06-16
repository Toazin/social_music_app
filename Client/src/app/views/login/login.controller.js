export class LoginController {
    constructor ($http,lodash, $state, $localStorage) {
      'ngInject';
      this.$http = $http;
      this._ = lodash;
      this.$localStorage = $localStorage;
      this.$state = $state;
      this.api = "http://localhost:3000/api/";
    }

    singIn(){
        //check username
        var that = this;
        this.$http.get(this.api + "user")
            .then((users)=>{
                var list = users.data;
                var found = this._.find(list,{'username':this.username});
                if(found){
                    this.$localStorage.user = found;
                    this.$localStorage.stateName = "Dashboard";
                    // console.log(this.$localStorage);
                    this.$state.go('dashboard');
                }else{
                    console.log("NO EXISTE");
                }

            },(error)=>{
                console.log("Error: ", error);
            })
        //obtain user and profile

        //local storage

        //change state
    }

    register(){
        //check validUsername

        //create new Username

        //local storage

        // change state
    }

    goToDashboard(){

    }

}
