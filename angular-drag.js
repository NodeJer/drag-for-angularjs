/**
* drag Module
*
* Description
*/
angular.module('drag', []).

directive('drag', function(){
	return {
		link: function($scope, $element, $attrs) {
			var $doc = angular.element(document);
			var mouseX = 0,
				mouseY = 0,
				moveX = 0,
				moveY = 0,
				x=0, y=0;

			$element.css({
				left: $element[0].offsetLeft+'px',
				top: $element[0].offsetTop+'px'
			}).css('margin', 0);


			$element.on('mousedown', function(ev){
				ev.preventDefault();

				var offsetLeft = $element[0].offsetLeft;
				var offsetTop = $element[0].offsetTop;

				mouseX = ev.clientX;
				mouseY = ev.clientY;

				if(this.setCapture){
					this.setCapture();
				}
				

				$doc.on('mousemove', function(ev){
					moveX = ev.clientX - mouseX;
					moveY = ev.clientY - mouseY;

					x = offsetLeft+moveX;
					y = offsetTop+moveY;

					if($attrs.limitX == 'true'){
						var maxX = $doc[0].documentElement.clientWidth-$element[0].offsetWidth;

						if(x <= 0){
							x = 0;
						}
						else if(x >= maxX){
							x = maxX;
						}
					}
					if($attrs.limitY == 'true'){
						var maxY = $doc[0].documentElement.clientHeight-$element[0].offsetHeight;
						
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

				$doc.on('mouseup', function(){
					if(this.releaseCapture){
						this.releaseCapture();
					}
					$doc.off('mousemove mouseup');
				});
			});
		}
	};
});