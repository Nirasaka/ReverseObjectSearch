window.onload = () => {
    let child = document.getElementById("child");
    child.style.left = 172 + "px";
    child.style.right = 0;
    zoomable(child);
    moveable(child);
    resettable(child);
}

let zoomable = (element, options) => {
    let {minScale, maxScale, magnification} = {
        minScale: 0.5, 
        maxScale: 2, 
        magnification: -0.0025,
        ...options
    }
    let scale = 1;
    element.style.transform = "scale(1)";

    let zoomElement = (event) => {
        event.preventDefault(); //ページスクロール禁止

        const w1 = element.clientWidth;
        const h1 = element.clientHeight;

        //現在の拡大率
        let s1 = Number(/(?<=\().*?(?=\))/.exec(element.style.transform));
        //parentとの差
        let gX = Number(/.*?(?=px)/.exec(element.style.left));
        let gY = Number(/.*?(?=px)/.exec(element.style.top));
        //画像の中点
        let cX = w1/2 + gX;
        let cY = h1/2 + gY;
        //ポインタの座標
        let pX = event.pageX - element.parentElement.offsetLeft;
        let pY = event.pageY - element.parentElement.offsetTop;
        //中点とポインタの距離
        let dX = pX - cX;
        let dY = pY - cY;

        //画像のサイズ変更と現在位置への移動
        scale += event.deltaY * magnification;
        scale = Math.min(Math.max(minScale, scale), maxScale);
        element.style.left = gX + dX * (1 - scale/s1) + "px";
        element.style.top = gY + dY * (1 - scale/s1) + "px";
        element.style.transform = `scale(${scale})`;
    };

    element.addEventListener("wheel", zoomElement);
}

let moveable = (element) => {
  element.style.position = "absolute";
  let x1;
  let y1;
  let px1;
  let py1;

  let moveElement = (event) => {
    //画像のドラッグ禁止
    event.preventDefault();
    element.ondragstart = false; 

    element.style.left = x1 + event.pageX - px1 + "px";
    element.style.top = y1 + event.pageY - py1 + "px";
  };

  element.addEventListener("mousedown", (event) => {
    x1 = Number(/.*?(?=px)/.exec(element.style.left));
    y1 = Number(/.*?(?=px)/.exec(element.style.top));
    px1 = event.pageX;
    py1 = event.pageY;

    element.addEventListener("mousemove", moveElement);
  });
  element.addEventListener("mouseup", () => {
    element.removeEventListener("mousemove", moveElement);
  });
}

let resettable = (element) => {
  let resetElement = (event) => {
    event.preventDefault();

    element.style.transform = "scale(1)";
    element.style.left = 172 + "px";
    element.style.top = 0;
  };

  element.parentElement.addEventListener("dblclick", resetElement);
}

let toggleButton = document.getElementById("obj_checkbox");
toggleButton.addEventListener("change",function(){
    let objBorder = document.getElementsByClassName("tag_border");
    if(this.checked){
        for(let i=0;i<objBorder.length;i++){
            objBorder[i].style.display = "block";
        }
    }else{
        for(let i=0;i<objBorder.length;i++){
            objBorder[i].style.display = "none";
        }
    }
});




const target = document.querySelectorAll(".tag_border");

for(let i=0;i<target.length;i++){
  target[i].addEventListener("mouseover",()=>{
    const target_title = document.getElementById("target_title");
    const target_info = document.getElementById("target_info");
    const target_img = document.getElementById("target_img");
    target_img.src = "img1.png";

    switch(event.target.id){
      case "cheese_cake_pot":
        target_title.innerHTML = "チーズケーキ鍋";
        target_info.innerHTML="ネギ、豆腐、キノコと共にチーズケーキが投入された闇鍋。" 
        
        target_img.style.objectPosition = "61% 100%";
      break;
    }
  },false);
}
