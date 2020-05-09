
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