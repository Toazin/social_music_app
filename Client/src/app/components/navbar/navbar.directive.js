export function NavbarDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/navbar/navbar.html',
    scope: {
        creationDate: '='
    },
    controller: NavbarController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class NavbarController {
  constructor (moment, $localStorage, $state) {
    'ngInject';
    this.$storage = $localStorage;
    this.stateName = this.$storage.stateName;
    this.$state = $state;
    this.user = this.$storage.user;
  }

  logout(){
      this.$storage.user =undefined;
      this.$storage.stateName = "login";
      console.log(this.$storage);
      this.$state.go('login');
  }

  goToProfile(){
      console.log("PRIFLE");
      this.$storage.stateName = "Profile";
      this.$state.go('profile');
  }
  goToDashboard(){
      console.log("DASHBOARD");
      this.$storage.stateName = "Dashboard";
      this.$state.go('dashboard');
  }

}
