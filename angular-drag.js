/**
* drag Module
*
* Description
*/
angular.module('drag', []).

directive('drag', ['$document', function($document){
	return {
		scope:{
			limitX: '=',
			limitY:'='
		},
		
		link: function($scope, $element, $attrs) {

			var mouseX = 0,
				mouseY = 0,
				moveX = 0,
				moveY = 0,
				x=0, y=0;

			$element.on('mousedown touchstart', function(ev){
				ev.preventDefault();

				ev = (ev.touches && ev.touches[0]) || ev;

				var offsetLeft = $element[0].offsetLeft;
				var offsetTop = $element[0].offsetTop;

				mouseX = ev.clientX;
				mouseY = ev.clientY;

				if(this.setCapture){
					this.setCapture();
				}

				$document.on('mousemove touchmove', function(ev){
					ev = (ev.touches && ev.touches[0]) || ev;

					moveX = ev.clientX - mouseX;
					moveY = ev.clientY - mouseY;

					x = offsetLeft+moveX;
					y = offsetTop+moveY;

					if($scope.limitX){
						var maxX = $document[0].documentElement.clientWidth-$element[0].offsetWidth;

						if(x <= 0){
							x = 0;
						}
						else if(x >= maxX){
							x = maxX;
						}
					}
					if($scope.limitY){
						var maxY = $document[0].documentElement.clientHeight-$element[0].offsetHeight;
						
						if(y <= 0){
							y = 0;
						}
						else if(y >= maxY){
							y = maxY;
						}
					}

					$element.css('left', x+'px');
					$element.css('top', y+'px');
				});

				$document.on('mouseup touchend', function(){
					if(this.releaseCapture){
						this.releaseCapture();
					}
					$document.off('mousemove mouseup touchend touchmove');
				});
			});
		}
	};
}]);
