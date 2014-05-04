'use strict';

angular.module('ichingApp')
  .controller('zhanbu', function ($scope) {
  	$scope.liuyao = [
  	{'up':0},
  	{'up':0},
  	{'up':0},
  	{'up':0},
  	{'up':0},
  	{'up':0}];

  	$scope.getCurLocation = function(){
  		if (navigator.geolocation)
	    {
	        navigator.geolocation.getCurrentPosition(function(position){
	            $scope.latitude = position.coords.latitude;
	            $scope.longitude = position.coords.longitude;
	        });
	    }
  	}

  	$scope.getCurLocation();

  	$scope.getZhanBu = function(){
  		var now=new Date();
		$scope.sizhu = new Object();
        curTZ = now.getTimezoneOffset()/60; //时区 -8为北京时
        curJD = now/86400000-10957.5 - curTZ/24; //J2000起算的儒略日数(当前本地时间)
        JD.setFromJD(curJD+J2000);

        var t = now.getHours();
        var jd = JD.JD(year2Ayear(JD.Y), JD.M, JD.D + t/24);
        obb.mingLiBaZi(jd + curTZ/24-J2000, $scope.longitude/radd, $scope.sizhu );

        var first_yao = iching.zheng2yinyang(parseInt($scope.liuyao[0].up));
        var second_yao = iching.zheng2yinyang(parseInt($scope.liuyao[1].up));
        var third_yao = iching.zheng2yinyang(parseInt($scope.liuyao[2].up));
        var fourth_yao = iching.zheng2yinyang(parseInt($scope.liuyao[3].up));
        var fifth_yao = iching.zheng2yinyang(parseInt($scope.liuyao[4].up));
        var sixth_yao = iching.zheng2yinyang(parseInt($scope.liuyao[5].up));

        $scope.up_trigram = iching.yinyang2trigram(fourth_yao,fifth_yao,sixth_yao);
		$scope.up_index = iching.Trigram.indexOf($scope.up_trigram);
        $scope.up_symbol = iching.Trigram_symbol[$scope.up_index];
        $scope.down_trigram = iching.yinyang2trigram(first_yao,second_yao,third_yao);
        $scope.low_index = iching.Trigram.indexOf($scope.down_trigram);
        $scope.low_symbol = iching.Trigram_symbol[$scope.low_index];
        $scope.hexagram_symbol = iching.Hexagram_name[$scope.up_index+$scope.low_index*8];
        $scope.gong_name = iching.getGongName(iching.Hexagram[$scope.up_index+$scope.low_index*8]);
        $scope.gong_index = iching.Trigram_name.indexOf($scope.gong_name);
        $scope.wuxing = iching.Trigram_wuxing[$scope.gong_index];
        iching.drawTrigrams('#gua-zhanbu', $scope.up_trigram, $scope.down_trigram, $scope.sizhu.bz_jr.substr(0,1));
  	}
});