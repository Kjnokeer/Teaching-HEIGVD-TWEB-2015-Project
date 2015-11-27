angular.module("app", ["chart.js", "ui.router", "ncy-angular-breadcrumb"])
   .factory('socket', function(socketFactory) {
      return socketFactory();
   })
   .config(function($stateProvider) {
      $stateProvider.state('home', {
         templateUrl: 'partials/home/home.html',
         url: '/home',
         ncyBreadcrumb: {
            label: 'Home'
         }
      });
      $stateProvider.state('questionnaires', {
         templateUrl: 'partials/home/questionnaires.html',
         url: '/questionnaires',
         ncyBreadcrumb: {
            label: 'Questionnaires'
         }
      });
      $stateProvider.state('statistiques', {
         templateUrl: 'partials/home/statistiques.html',
         url: '/statistiques',
         ncyBreadcrumb: {
            label: 'Statistiques'
         }
      });
      $stateProvider.state('gestion', {
         templateUrl: 'partials/home/gestion.html',
         url: '/gestion',
         ncyBreadcrumb: {
            label: 'Gestion du compte'
         }
      });
   });