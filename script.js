
function getCategory(e){
    // e.preventDefault();
    const value = $(e).val();
    switch(value){
        case 'web':
            $("a#enterQuizBtn").attr("href", "web.html");
            console.log('web.html');
            break;
        case 'football':
            $("a#enterQuizBtn").attr("href", "football.html");
            console.log('football.html');
            break;
        case 'music':
            $("a#enterQuizBtn").attr("href", "music.html");
            console.log('music.html');
            break;
        default:
            console.log(null);
    }

}

   // variable declaration
   let score = 0;
   let progressScore = 0;
   let errorProgressScore = 20;
   let questionNumber = 0;
   let chosenAnswer = false;

// method executed after page loads
$(document).ready(function (){
   const q = question(questionNumber);

   $('.totalQ').html(webQuiz.length);
   $('.currentQ').html(questionNumber+1);
   $('.question').html(q.question);
   q.options.forEach((option, i) => {
       const opt = `   <div class="col-6 mb-3 text-left" id="opt" data-option="${option}">
                           <div class="custom-control custom-checkbox bg-secondary" value="${option}" id="customControl${i+1}">
                               <input type="checkbox" class="custom-control-input"  value="${option}" onclick="checkAnswer(this)" id="customCheck${i+1}">
                               <label class="custom-control-label" for="customCheck${i+1}">${option}</label>
                           </div>
                       </div>`
       $('#options').append(opt);
   })
   $('#nextQuizBtn').addClass('btn-secondary disabled')
});

// method to go to next question
let next = function (){
   // console.log(questionNumber);
   nextQuestion(questionNumber);
   // console.log(questionNumber);
}

// method that provides the next question
function nextQuestion(no){
   chosenAnswer = false;
   $('#nextQuizBtn').removeClass('btn-primary').addClass('btn-secondary disabled');
   questionNumber = no + 1;
   if(questionNumber < 5) {
       $('.currentQ').html(questionNumber+1);
       const currentQ = question(questionNumber);
       $('.question').html(currentQ.question);
       $('#options').html('');

       $.each(currentQ.options, function(i, option){
           const opt = `<div class="col-6 mb-3 p-2 text-left" id="opt" data-option="${option}">
                           <div class="custom-control custom-checkbox bg-secondary" value="${option}" id="customControl${i+1}">
                               <input type="checkbox" class="custom-control-input" value="${option}" onclick="checkAnswer(this)"  id="customCheck${i+1}">
                               <label class="custom-control-label" for="customCheck${i+1}">${option}</label>
                           </div>
                       </div>`
           $('#options').append(opt);
       })
       if(questionNumber === 4) {
           $('#nextQuizBtn').html('Submit').attr('onclick', 'endQuiz()');;
       }
   } else {
       endQuiz();
   }
}

function question(no) {
   return {
       question: webQuiz[no].question,
       options: webQuiz[no].options,
       correctOption: webQuiz[no].correctOption
   };
}


function endQuiz(){
   $('.endQuiz').html('');
   var leadText;
   var bgStyle;
   if(score <= 40){
       // console.log(score);
       leadText = 'Thank you for trying';
       bgStyle = 'border-warning';
   } else {
       // console.log(score);
       leadText = "You've done very well";
       bgStyle = 'border-success';
   }
   const message = `
                   <div class="jumbotron text-center">
                       <h1 class="display-4">Quiz is over!</h1>
                       <p class="lead">${leadText}</p>
                       <hr class="my-4">
                       <div class="${bgStyle} bg-transparent text-center bold p-auto mx-auto my-2 
                           rounded-circle" style="width: 100px; height: 100px; font-size:2.5rem;">
                           ${score}
                       </div>
                       <a class="btn btn-primary btn-md" onclick="reload_page()" role="button">Try Again!</a>
                       <a class="btn btn-outline-primary btn-md" href="/index.html" role="button">Home</a>
                   </div>
                   `;
   $('.endQuiz').html(message);
   // console.log('it is finished');
}
function reload_page() {
   window.location.reload();
}

function checkAnswer(e){
  if (chosenAnswer === false) {
      chosenAnswer = true;
      $('#nextQuizBtn').removeClass('btn-secondary disabled').addClass('btn-primary');
       // console.log($(e).val());
       let i = $(e).data('id');
       if(webQuiz[questionNumber].correctOption === $(e).val()){
           // console.log('correct');
           $(e).parent().remove("bg-secondary");
           $(e).parent().addClass("border border-success bg-success");
           score = score + 20;
           progressScore = 20;
           $('.score').html(score);
           const progress = `<div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="${progressScore}" aria-valuemin="0" aria-valuemax="100" style="width: ${progressScore}%"></div>`
           $('.progress').append(progress);
           // console.log(score);
       } else {
           // console.log('wrong');
           $(e).parent().remove("bg-secondary");
           $(e).parent().addClass("border border-danger bg-danger");
           const errorProgress = `<div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="${errorProgressScore}" aria-valuemin="0" aria-valuemax="100" style="width: ${errorProgressScore}%"></div>`
           $('.progress').append(errorProgress);
           $("div>#opt").each(function(i){
               if(webQuiz[questionNumber].correctOption === $(this).data('option')){
                   $(`div>#opt>#customControl${i+1}`).remove("bg-secondary");
                   $(`div>#opt>#customControl${i+1}`).addClass("border border-success bg-success");
                   return false;
               }
           });
       }
  }
}