var state={
	score:[]
};

var questBank={
	qSetOne : [
	{
		Q:"4 + ? = 10",
		answer: 6,
		options:[6,5,9,3]
	},
	{
		Q:"10 - ? = 0",
		answer: 10,
		options:[6,10,3,5]
	},
	{
		Q:"6 * ? = 6",
		answer: 1,
		options:[1,6,0,9]
	},
	{
		Q:"100 + ? = 150",
		answer: 50,
		options:[100,50,20,3]
	},
	{
		Q:"20 - 20 = ?",
		answer: 0,
		options:[20,0,10,30]
	}
	]
};

toastr.options = {
	"closeButton": false,
	"debug": false,
	"newestOnTop": false,
	"progressBar": false,
	"positionClass": "toast-top-full-width",
	"preventDuplicates": false,
	"onclick": null,
	"showDuration": "300",
	"hideDuration": "1000",
	"timeOut": "2000",
	"extendedTimeOut": "1000",
	"showEasing": "swing",
	"hideEasing": "linear",
	"showMethod": "fadeIn",
	"hideMethod": "fadeOut"
};

var numOfQuest=5;
var optionPreText = '<input type="radio" id="';
var optionPostText = '" name="option">';

var getQObject=function(obj, qSetNum, qNum){
	var tempObj;
	Object.keys(obj).map(function(key){
		if(key == qSetNum)  tempObj= obj[key][qNum-1];
	});
	return tempObj;
}

var getQuestion = function(qObj){
	return qObj['Q'];
}

var getOptions = function(qObj){
	return qObj['options'];
}

var getAnswer = function(qObj){
	return qObj['answer'];
}

var getScore = function(scoreArr) {
	var retVal=0;
	scoreArr.forEach(function(val){
		if(val) retVal++;
	});
	return retVal;
}

var renderList = function(Obj, qSetNum, qCount, qClass){
	var qObj= getQObject(Obj, qSetNum, qCount);
	qClass.text("Question: " + getQuestion(qObj));
	var options = getOptions(qObj);
	options.forEach(function(value,index){
		var tempId= "#option"+(index+1);
		$(tempId).parent().html(optionPreText+"option"+(index+1)+'" value="'+value+optionPostText+" "+value);
	});
	return qObj;
}




$(function() {

	$('.startBtn').on('click', function(e){
		window.location.href="quest.html";
	});
	
	var qCount=1, flag= false, qObject;
	var qClass= $('.js-quest');
	var aClass= $('.js-correct-ans');
	var sClass= $('.js-scoreDiv');

	qObject = renderList(questBank, 'qSetOne', qCount, qClass);

	$('.questDiv span').html(qCount+" out of question 5");

	$('form#js-quiz-form').on('submit', function(e){
		e.preventDefault();



		if($('input:radio[name=option]:checked').val() == getAnswer(qObject))
		{
			if(qCount==numOfQuest){
			state.score.push(flag);
			$('.container').hide();
			$('.incorrectDiv').hide();
			$('.js-final-score').text('Overall Score: You have '+getScore(state.score)+' correct Answers Out of 5');
			state.score.forEach(function(val, index){
				var tempVal= val?'correct':'incorrect';
				$('.js-A-Section').append('<span class="block">'+ tempVal + '</span>');
			});
			$('.js-summary').show();
	
		}
		else{
		toastr.success('YaY, you are awesome!');
		qCount++;
		qObject= renderList(questBank, 'qSetOne', qCount, qClass);
		flag= true;
		}
	}
	else{
		flag= false;
		toastr.error("Sorry, Your answer is incorrect");
		$('.incorrectDiv').addClass('block');
		$('.incorrectDiv').slideToggle('slow');
		aClass.text("Sorry, Your answer is incorrect.The correct answer is "+ getAnswer(qObject));
	}
	state.score.push(flag);
	sClass.text( getScore(state.score)+" Out of 5 correct");
	$('.questDiv span').html(qCount+" out of question 5");

	});

	$('#next').click(function(e){
		if(qCount==numOfQuest) 
		{
				$('.container').hide();
				$('.incorrectDiv').hide();
				$('.js-final-score').text('Overall Score: You have '+getScore(state.score)+' correct Answers Out of 5');
				state.score.forEach(function(val, index){
						var tempVal= val?'correct':'incorrect';
				$('.js-A-Section').append('<span class="block">'+ tempVal + '</span>');
					});
				$('.js-summary').show();
	

			}
			else{
				console.log("Hurray!!!");
				$('.incorrectDiv').slideToggle('slow');
				qCount++;
				qObject= renderList(questBank, 'qSetOne', qCount, qClass);
				$('.questDiv span').html(qCount+" out of question 5");
			}

		});
		
});