$(document).ready(function() {
	$.getJSON("tweets-clean.json", function(data) {
		var tweets = [];
		$.each(data, function(key, val) {
			tweets.push("<li id='" + val.id + "'><div class='item'>"
						 + "<img src='" + val.user.profile_image_url
						 + "' onError=\"this.onerror=null;this.src='http://tech.china.com/zh_cn/science/lishi/11025917/20070904/images/14319978_2007090411065136850600.jpg';\" />"
						 + "<p class='p1'>" + val.text + "</p></div></li>");
		});

		$( "<ul/>", {
			"id": "tweets_list",
			html: tweets.join("")
		}).appendTo("#tweets");


		var tags = [];
		$.each(data, function(key, val) {

			$.each(val.entities.hashtags, function(k, v) {
				tags.push("<li><div class='item'><p class='p2'>#" + v.text + "</p></div></li>");
			});

		});

		$( "<ul/>", {
			"id": "tags_list",
			html: tags.join("")
		}).appendTo("#tags");
	})
});

function tick() {
	$('#tweets_list li:first').animate( {'opacity':0}, 200, function () {
		$(this).appendTo($('#tweets_list')).css('opacity', 1);
	});

	$('#tags_list li:first').animate( {'opacity':0}, 200, function () {
		$(this).appendTo($('#tags_list')).css('opacity', 1);
	});
}
setInterval(function(){ tick () }, 3000);
