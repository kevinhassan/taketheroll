var myApp = angular.module('taketheroll', ['ngRoute']);
//define address to communicate with API
myApp.constant("api_link",'http://localhost:3000');

myApp.config(function($routeProvider, $httpProvider) {
  $httpProvider.interceptors.push('TokenInterceptor');

  $routeProvider
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl',
      access: {
        requiredLogin: false
      }
    }).when('/admin', {
      templateUrl: 'partials/home.html',
      controller: 'AdminCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/admin/register', {
      templateUrl: 'partials/home.html',
      controller: 'AdminCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/admin/students', {
      templateUrl: 'partials/listStudents.html',
      controller: 'StudentCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/admin/students/:idStudent', {
      templateUrl: 'partials/profile.html',
      controller: 'StudentCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/admin/students/:idStudent/absences', {
      templateUrl: 'partials/home.html',
      controller: 'AdminCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/admin/students/:idStudent/absences/:idAbsence', {
      templateUrl: 'partials/home.html',
      controller: 'AdminCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/admin/students/:idStudent/lates', {
      templateUrl: 'partials/home.html',
      controller: 'AdminCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/admin/students/:idStudent/lates/:idLates', {
      templateUrl: 'partials/home.html',
      controller: 'AdminCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/admin/courses', {
      templateUrl: 'partials/listCourses.html',
      controller: 'CourseCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/admin/courses/:idCourse/absences', {
      templateUrl: 'partials/home.html',
      controller: 'AdminCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/admin/courses/:idCourse/absences/:idAbsence', {
      templateUrl: 'partials/home.html',
      controller: 'AdminCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/admin/courses/:idCourse/lates', {
      templateUrl: 'partials/home.html',
      controller: 'AdminCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/admin/courses/:idCourse/lates/:idLates', {
      templateUrl: 'partials/home.html',
      controller: 'AdminCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/student', {
      templateUrl: 'partials/home.html',
      controller: 'StudentCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/student/absences', {
      templateUrl: 'partials/home.html',
      controller: 'StudentCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/student/absences/:idAbsence', {
      templateUrl: 'partials/home.html',
      controller: 'StudentCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/student/lates', {
      templateUrl: 'partials/home.html',
      controller: 'StudentCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/student/lates/idLates', {
      templateUrl: 'partials/home.html',
      controller: 'StudentCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/student/lates/idLates', {
      templateUrl: 'partials/home.html',
      controller: 'StudentCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/teacher', {
      templateUrl: 'partials/home.html',
      controller: 'TeacherCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/teacher/courses', {
      templateUrl: 'partials/listCourses.html',
      controller: 'CourseCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/teacher/courses/idCourse', {
      templateUrl: 'partials/home.html',
      controller: 'TeacherCtrl',
      access: {
        requiredLogin: true
      }
    }).otherwise({
      redirectTo: '/login'
    });
});

myApp.run(function($rootScope, $window, $location, AuthenticationFactory) {
  // when the page refreshes, check if the user is already logged in
  AuthenticationFactory.check();

  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
      $location.path("/login");
    } else {
      // check if user object exists else fetch it. This is incase of a page refresh
      if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
      if (!AuthenticationFactory.userRole) AuthenticationFactory.userRole = $window.sessionStorage.userRole;
    }
  });

  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = AuthenticationFactory.isLogged;
    $rootScope.role = AuthenticationFactory.userRole;
    // if the user is already logged in, take him to the home page
    if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
      $location.path('/');
    }
  });
});
