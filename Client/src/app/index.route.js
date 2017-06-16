export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('profile', {
      url: '/profile',
      templateUrl: 'app/views/profile/profile.html',
      controller: 'ProfileController',
      controllerAs: 'profile'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'app/views/dashboard/dashboard.html',
      controller: 'DashboardController',
      controllerAs: 'dashboard'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/views/login/login.html',
      controller: 'LoginController',
      controllerAs: 'login'
    });

  $urlRouterProvider.otherwise('/');
}
