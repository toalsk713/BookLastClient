

	function insertComment() {

		$.ajax({
			url: "http://localhost:7070/book/bookReview",
			type: "GET",
			dataType: "jsonp",
			jsonp: "callback",
			data: {
				isbn: localStorage.isbn,
				review: $("[type=review]").val()
			},
			success: function () {
				alert("정상적으로 등록되었습니다.");
				$("#review").val(" ");
				location.reload();
			},
			error: function () {
				alert("서평등록 에러 발생!!");
			}
		});
	}


	$(function(){

		var isbn = localStorage.isbn;

		$.ajax({
			url : "http://localhost:7070/book/printReview",
			type : "GET",
			dataType : "jsonp",
			jsonp : "callback",
			data : {
				isbn : isbn
			},
			success : function(result){

				for(var i=0; i < result.length; i++){

					var tr = $("<tr></tr>").attr("data-isbn",result[i].isbn);
					var seqTd = result[i].seq;
					var idTd = $("<td></td>").text(result[i].id);
					var contentTd = $("<td></td>").text(result[i].content);
					var deletebtn = $("<span id='"+seqTd+"' class='glyphicon glyphicon-remove'></span>");
					deletebtn.on("click", deleteReview);
					var deleteTd = $("<td></td>").append(deletebtn);

					//tr.append(seqTd);
					tr.append(idTd);
					tr.append(contentTd);
					tr.append(deleteTd);

					$("#myTbody").append(tr);

				}
			}
			,
			error : function(){
				alert("뭔가 이상함");
			}
		})
	});



	function deleteReview(){

		$.ajax({
			url : "http://localhost:7070/book/deleteReview",
			type : "GET",
			dataType : "jsonp",
			jsonp : "callback",
			data : {
				deleteReviewNo: $(this).attr("id")
			},
			success : function(){
				alert("서평이 삭제되었습니다.");
				location.reload();
			},
			error : function(){
				alert("삭제 에러 발생!!");
			}
		});

	}




	function searchBook(){
		//입력상자에 키가 입력되면 무조건 호출
		//우리가 원하는 건 enter key를 입력했을 때 서버와 통신
		if(event.keyCode == 13){
			//사용자가 입력한 ISBN번호를 가져와서
			//AJAX로 서버프로그램을 호출

			$.ajax({
				url : "http://localhost:7070/book/bookList",
				type : "GET",
				dataType : "jsonp",
				jsonp : "callback",
				data : {
					keyword : $("#place").val()
				},
				success : function(result){

					for(var i = 0; i<result.length; i++) {

						var tr = $("<tr></tr>").attr("data-isbn",result[i].isbn);

						var titleTd = $("<td></td>").text(result[i].title);
						var authorTd = $("<td></td>").text(result[i].author);

						//서평
						var commentbtn = $("<input />").attr("type","button").attr("value","서평").attr("id","comment").attr("class","btn-xs, btn-warning");
						var commentTd = $("<td></td>").append(commentbtn);
						
						tr.append(titleTd);
						tr.append(authorTd);
						tr.append(commentTd);

						$("tbody").append(tr);
					}
				},
				error : function(){
					alert("뭔가 이상함");
				}

			});
		}
	}


