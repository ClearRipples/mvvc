(function(){
	var project = 'project/';

	window.getViewTemplatePath = function(path){
		return 'text!' + project + 'views/' + path + '.html';
	};

	require.config({
		baseUrl: '../',
		pathes:{
			'View': project + 'views'
		}
	});

	require(['AbstractApp'], function(App){
		//实例化 APP
		var app = new App({
			//选择 pushState 或者 hashChange
			hasPushState: false,
			'defaultView': 'index',
			'viewRootPath': '' + project + 'views'
		});
	});
})();