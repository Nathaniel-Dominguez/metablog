$(document).ready(function() {
	$('.delete-btn').click(function(e) {
		e.preventDefault();
		var url = $(this).attr('href')

		$.ajax({
			url: url,
			method: 'DELETE'
		}).done(function(res) {
			//console.log('zuccess', res);
			window.location = '/' + url.split('/')[1];
		}).fail(function(err) {
			console.log('cuck the zuck', err);
		})
	});
});