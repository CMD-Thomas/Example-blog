var removePostBtn = document.getElementById('remove-post');

$('#myModal').on('show.bs.modal', function(e) {
    postId = e.relatedTarget.id;
	removePostBtn.onclick = function(){
		window.location = "delete/" + postId;    
	}
});

    var windowHeight = window.outerHeight + 50;
    document.body.style.height = windowHeight;
