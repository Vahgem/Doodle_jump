document.addEventListener('DOMContentLoaded', ()=> {
    const grid=document.querySelector('.grid')
    const doodler=document.createElement('div')
    let doodleLeftSpace=50
    let isGameOver=false
    let platformCount=5
    let platforms=[]
    let upTimerId
    let downTimerId
    let isjumping=true
    let startPoint=150
    let isGoingLeft=false
    let isGoingRight=false
    let doodleDownSpace=startPoint
    let LeftTimerID
    let RightTimerID
    let score=0

    class Platform{
    constructor(newplatformBottom){
        this.bottom = newplatformBottom
        this.left=Math.random()*315
        this.visual =document.createElement('div')

        const visual= this.visual
        visual.classList.add('platform')
        visual.style.left=this.left+'px';
        visual.style.bottom=this.bottom+'px'
        grid.appendChild(visual)
    }
}

    function createDoodler(){
        grid.appendChild(doodler)
        doodler.classList.add ('doodler')
        doodleLeftSpace=platforms[0].left
        doodler.style.left= doodleLeftSpace+'px'
        doodler.style.bottom=doodleDownSpace+'px'
    }
    function createPlatforms() {
        for(let i=0;i<platformCount;i++){
            let platformGap = 600/platformCount
            let newplatformBottom=100+ i*platformGap
            let newplatform= new Platform(newplatformBottom)
            platforms.push(newplatform)
            console.log(platforms)
        }
    }
    function movePlatforms() {
        if(doodleDownSpace > 0){
            platforms.forEach(platform => {
                platform.bottom-=4
                let visual=platform.visual
                visual.style.bottom=platform.bottom + 'px'
            if(platform.bottom < 10){
                let firstPlatform = platforms[0].visual
                firstPlatform.classList.remove('platform')
                score++
                platforms.shift()
                let newPlatform = new Platform(600)
                platforms.push(newPlatform)
            }
            })
        }
    }
    function jump(){
        isjumping=true;
        clearTimeout(downTimerId)
        upTimerId =setInterval(function(){
            doodleDownSpace+=20
            if(doodleDownSpace>600)
            doodleDownSpace=600
            doodler.style.bottom=doodleDownSpace+'px'
            if(doodleDownSpace > startPoint + 200){
            fall()
            }

        },20 )
    }
    function fall(){
        isjumping=false
        clearInterval(upTimerId)
        downTimerId=setInterval( function (){
            doodleDownSpace-=5;
            doodler.style.bottom=doodleDownSpace+'px'
            if(doodleDownSpace<=0){
                gameover()

            }
            platforms.forEach(platform => {
                if(
                    (doodleDownSpace>=platform.bottom)&&
                    (doodleDownSpace <=(platform.bottom+15))&&
                    ((doodleLeftSpace +60)>=platform.left)&&
                    (doodleLeftSpace<=(platform.left+85))
                    ){
                        startPoint=doodleDownSpace
                        jump()
                    }
            })
        },20)
    }
    function moveLeft(){
        if(isGoingRight){
        clearInterval(RightTimerID)
        isGoingRight=false}
        isGoingLeft=true
        LeftTimerID=setInterval(function(){
            if(doodleLeftSpace>=0){
            doodleLeftSpace -= 5;
            doodler.style.left=doodleLeftSpace + 'px'
        }else moveRight()
        },20)
    }
    
    function moveRight() {
        if(isGoingLeft){
        clearInterval(LeftTimerID)
        isGoingLeft=false}
        isGoingRight=true
        RightTimerID=setInterval(function(){
            if(doodleLeftSpace <= 340){
            doodleLeftSpace += 5;
            doodler.style.left=doodleLeftSpace+'px'
        }  else moveLeft()
        },20)
    }
    function control(e){
        if(e.key==="ArrowLeft"){
            moveLeft()
        }
        else if(e.key==="ArrowRight"){
            moveRight()
        }
        else if(e.key==="ArrowUp"){
            moveStraight()
            
        }
    }
    function moveStraight(){
        isGoingLeft=false
        isGoingRight=false
        clearInterval(LeftTimerID)
        clearInterval(RightTimerID)
    }
    function gameover() {
        isGameOver=true
        while(grid.firstChild){
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML=score;
        clearInterval(upTimerId)
        clearInterval(downTimerId)
        clearInterval(LeftTimerID)
        clearInterval(RightTimerID)
    }
    function start(){
        if(!isGameOver){          
            createPlatforms()
            createDoodler()
            setInterval(movePlatforms,20)
           jump()
           document.addEventListener('keyup', control)
        }
    }
    start()

})