define("app", ["angular"], function(angular) {
    var app = angular.module("app", ['ui.router','ngAnimate','ui.bootstrap']);
    app.run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {

                // It's very handy to add references to $state and $stateParams to the $rootScope
                // so that you can access them from any scope within your applications.For example,
                // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
                // to active whenever 'contacts.list' or one of its decendents is active.
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    );
    app.config(
        [          '$stateProvider', '$urlRouterProvider','$httpProvider',
        function($stateProvider, $urlRouterProvider,$httpProvider) {
        //$locationProvider.html5Mode(true);
        //$routeProvider.when('/', {controller:'ListController', templateUrl:'html/list.html'}).when('/a', {controller:'AddController', templateUrl:'html/add.html'}).otherwise({redirectTo:'/'});
   // Initialize get if not there
	   if (!$httpProvider.defaults.headers.get) {
	       $httpProvider.defaults.headers.get = {};
	   }
	   // Enables Request.IsAjaxRequest() in ASP.NET MVC
	   $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
	   // Disable IE ajax request caching
	   $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
	   $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('home',{
                url: "/",
                //abstract: true,
                templateUrl:"html/list.html",
                controller: 'ListController'
            })
            .state('docs',{
                url: "/docs",
                templateUrl: "html/add.html",
                controller: 'DocsController'
          })
            .state('anli',{
                url: "/anli",
                templateUrl: "html/anli.html",
                controller: 'AnliController'
          });
    }]);


app.controller('home.modal', ['$modalInstance','$timeout', function($uibModalInstance,$timeout) {
  $timeout(function(){
  	 $uibModalInstance.dismiss('cancel');
  }, 3000);


}]);

app.controller(
        'ListController',function($scope,$log,$uibModal) {



 				$log.info('Modal dismissed at: 77777777' + new Date());
                var arr=new Array();
                arr.push({'imgurl':'http://www.guimobile.net/blog/uploads/2012/04/104222211.jpg','title':'蓝宇ionic+requirejs＋cordova','context':'这是一个为了快捷开发的高性能Hybrid App前端框架,跨平台支持android、ios、windows、linux等，丰富的案例源码。'});
                arr.push({'imgurl':'http://www.ionic.wang/statics/index/images/top_right.png','title':'ionic框架','context':'国外优秀的hybrid app框架，提供编译、angularjs编程、丰富的UI组件'});
                arr.push({'imgurl':'http://images.csdn.net/20141212/548809ed379e4.jpg','title':'angularjs','context':'国外一个优秀的js mvc框架，jquery大都数仅仅用于展现，而angularjs可以做一个完整的web应用'});
                arr.push({'imgurl':'http://images.cnitblog.com/blog/595984/201401/05214706-9c29aad04efe428cb8f95920a26d3548.jpg','title':'requirejs','context':'国外优秀的JS按需加载插件，用于解决大型项目中SPA性能不够'});
                arr.push({'imgurl':'http://files.colabug.com/forum/201405/12/100836gyn6h1652vmvmpnz.jpg','title':'cordova','context':'混合app中负责调用手机硬件的组件库，如：相机、蓝牙、二维码'});



                arr.push({'imgurl':'http://z.k1982.com/sc_img/201303/201303101259082262.jpg','title':'蓝宇Hybrid App','context':'采用的是国外技术，先进、成熟度高、广大支持、技术持续更新等优点，整合起来的生产框架'});
                arr.push({'imgurl':'http://news.xinhuanet.com/info/2013-05/18/132391309_81n.jpg','title':'国内Hybrid App','context':'由于资金和技术社区支持度低，技术难以走在前列容易淘汰，也会造成性能和BUG不断'});
                arr.push({'imgurl':'http://z.k1982.com/sc_img/201303/201303101259082262.jpg','title':'蓝宇web/web App','context':'采用angularjs+requirejs前端编程有自己的MVC层,一个应用一次性加载在客户端运行，大大降低服务器负担，访问所有页面都不需要请求服务器，无读条'});
                arr.push({'imgurl':'http://news.xinhuanet.com/info/2013-05/18/132391309_81n.jpg','title':'传统web/web App','context':'一个应用有多个页面，每次都要请求服务器输出页面,大量页面操作造成服务器负担，另外每个页面会有一到几十秒的读条，用户体验差'});
                arr.push({'imgurl':'http://images.51cto.com/files/uploadimg/20120706/1333210.jpg','title':'JQUERY','context':'android、ios、windows、linux已支持'});
                arr.push({'imgurl':'http://echarts.baidu.com/doc/asset/img/example/EChartsTheme.jpg','title':'ECHART,highcharts','context':'android、ios、windows、linux已支持'});
                arr.push({'imgurl':'http://www.th7.cn/d/file/p/2015/02/11/5a3b050109cf9acf76ae10a29d146704.jpg','title':'angularui','context':'android、ios、windows、linux已支持'});
                arr.push({'imgurl':'http://i.kejik.com/1442645910.png','title':'bootstrap','context':'android、ios、windows、linux已支持'});
                arr.push({'imgurl':'http://img.web07.cn/UpImg/Png/201302/08/png306568080419271.png','title':'附件上传','context':'android、ios、windows、linux已支持'});
                arr.push({'imgurl':'http://pic15.nipic.com/20110704/7669294_170639686146_2.jpg','title':'蓝牙4.0','context':'android、ios已支持'});
                arr.push({'imgurl':'http://pic.baike.soso.com/p/20140416/20140416032200-325687908.jpg','title':'拍照','context':'整合中'});
                arr.push({'imgurl':'http://www.onlinedown.net/zt/as116/img/weidache.png','title':'录音','context':'整合中'});
                arr.push({'imgurl':'http://photocdn.sohu.com/20131121/Img390511842.jpg','title':'二维码扫描','context':'整合中'});
                arr.push({'imgurl':'http://img0.pconline.com.cn/pconline/1106/07/2434683_photostream.png','title':'消息推送','context':'整合中'});
                $scope.items=arr;
                console.log(arr);
                //removeClass(document.getElementById("nav-a"), "active");
                //removeClass(document.getElementById("nav-b"), "active");
                //removeClass(document.getElementById("nav-c"), "active");
                //showLoader();
                //scrollTop();






            }
    );


    app.controller('DocsController', ['$scope', '$location', '$http','Page','viewSlideIndex', '$timeout',
            function ($scope, $http, $location, Page, viewSlideIndex, $timeout, lang){
                //scrollTop();





            }]
    );
    app.controller('AnliController',
            function ($scope,$uibModal){
                //scrollTop();
				    var modalInstance = $uibModal.open({
				      animation: true,
				      templateUrl: 'myModalContent.html',
				      controller: 'home.modal as vm',
				      size: 'sm',
				      resolve: {
				        items: function () {
				          return $scope.items;
				        }
				      }
				    });




            }
    );
    return app;
 });
function getLangWords(lang, $scope) {
    lang.getWords().then(function(data) {
        $scope.lang = data;
    });
}