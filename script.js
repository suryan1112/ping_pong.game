var bottom_chance=true;
var towards_right=true;
var red_score=0;
var blue_score=0;
document.getElementById("loose").volume=0.5;
function reset_game(){
    document.getElementById("red-score").textContent="0";
    document.getElementById("blue-score").textContent="0";
    red_score=0; blue_score=0;

}
document.addEventListener("keydown",function(event){
    console.log(event.keyCode)
    var upper_block=document.getElementById("upper");
    var lower_block=document.getElementById("lower");
    var current_pos_up=upper_block.getBoundingClientRect();
    var current_pos_do=lower_block.getBoundingClientRect();
    if(event.keyCode==65){
        if(current_pos_up.x>30)
        upper_block.style.left =(current_pos_up.x-40)+"px";
    }
    if(event.keyCode==68){
        if(current_pos_up.x+current_pos_up.width+30<window.innerWidth)
        upper_block.style.left =(current_pos_up.x+20)+"px";
    }
    if(event.keyCode==37){
        if(current_pos_do.x>30)
        lower_block.style.left =(current_pos_do.x-40)+"px";
    }
    if(event.keyCode==39){
        if(current_pos_do.x+current_pos_do.width+30<window.innerWidth)
        lower_block.style.left =(current_pos_do.x+20)+"px";
    }
    if(event.keyCode==13){
        var id=setInterval(function(){
            var current_pos_down=lower_block.getBoundingClientRect().x;
            var current_pos_upper=upper_block.getBoundingClientRect().x;

            var ball=this.document.getElementById("ball");
            var current_pos=ball.getBoundingClientRect();
            if(bottom_chance){ 
                if(towards_right){ 
                    ball.style.left=(current_pos.x+10)+"px";
                    if(current_pos.x>=window.innerWidth-90) towards_right=false;
                }
                else{   
                    ball.style.left=(current_pos.x-20)+"px";
                    if(current_pos.x<=30) towards_right=true;
                }
                ball.style.top=(current_pos.y+10)+"px";
                if(current_pos.y>window.innerHeight-140){
                    if((current_pos_down>=current_pos.x+50 || current_pos_down<current_pos.x-200) && current_pos.y>window.innerHeight-115){
                        // ball.style.animation="myanimation 0.5s";
                        red_score++;
                        document.getElementById("red-score").textContent=red_score;
                        document.getElementById("loose").play()
                        if(red_score==5){
                            setTimeout(() => {
                                alert("🥳 ❤️ ~ RED WINS ~ ❤️ 🥳");
                                reset_game()
                            }, 500);}
                            
                        clearInterval(id);
                        bottom_chance=false;
                    }
                    else if(current_pos_down<current_pos.x+50 && current_pos_down>current_pos.x-200){
                        bottom_chance=false;
                        document.getElementById("strike-audio").play();
                    }
                }
            }
            else{ 
                if(towards_right){ 
                    ball.style.left=(current_pos.x+10)+"px";
                    if(current_pos.x>=window.innerWidth-90) towards_right=false;
                }
                else{   
                    ball.style.left=(current_pos.x-20)+"px";
                    if(current_pos.x<=30) towards_right=true;
                }
                ball.style.top=(current_pos.y-20)+"px";
                if(current_pos.y<=75){
                    if((current_pos_upper>=current_pos.x+50 || current_pos_upper<current_pos.x-200) && current_pos.y<=50){
                        blue_score++;
                        document.getElementById("loose").play()
                        document.getElementById("blue-score").textContent=blue_score;
                        if(blue_score==5){
                            setTimeout(() => {
                                alert("🥳💙 ~ BLUE WINS ~ 💙🥳");
                                reset_game();
                            }, 500);}
                        
                        clearInterval(id);
                        bottom_chance=true;
                    }
                    else if(current_pos_upper<current_pos.x+50 && current_pos_upper>current_pos.x-200){
                        bottom_chance=true;
                        document.getElementById("strike-audio").play();
                    }
                } 
            }
        },50);
    }
})
// document.getElementsByClassName("class").addEventListener("keypress",function(event))
