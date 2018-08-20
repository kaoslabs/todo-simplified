var trashcan = '<i class="fas fa-trash-alt"></i>';

init();

//run at start
function init(){
	//add delete spans to all existing lis
	
}


//Check off specific todos by clicking
$('ul').on('click', 'li', function(){
	$(this).toggleClass('completed');
	$.post("/updateitem", {id: $(this).attr("name"), isToggled: ($(this).attr("class") === "completed")});
});

//Delete todos by clicking trashcan
$('ul').on('click', 'span', function(event){
	//stopPropagation() kills event bubbling!
	//i.e. it will keep .completed from toggling!
	event.stopPropagation();
	//slide up then remove entire <li>
	$(this).parent().slideUp(500,function(){
		$.post("/removeitem", {id: $(this).attr("name")});
		$(this).remove();
	});
//	console.log($(this).parent().index());
});

// //Add new <li> todo item
$("input[type='text']").on('keypress', function(event) {
	//check if enter (13) was pressed
	if (event.which === 13){
		//grab new todo text from input
		var todoText = $(this).val();
		//check that text todoText isn't empty
		if (todoText){
			//create a new li and add to ul
			$('ul').append(
				$("<li>").append(
				//throw in a <span> at front containing trashcan
					$("<span>").append(
						trashcan
					)
				).append(
				//then add the text
					" " + todoText
				)
			);
			$.post("/additem", {item: todoText, isToggled: false});
			//empty the textbox
			$(this).val("");
		}
	}
});

//Plus-sign logic - drop down todo input bar
$('h1 i').on('click', function(){
	$("input[type='text']").fadeToggle();
});