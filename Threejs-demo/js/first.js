/**
 * Created by michaelchan on 2015/2/11.
 */
var webglScene,css3dScene,camera,webglRenderer,css3dRenderer,light,controls;
var divWidht = 200;
var divHeight = 200;
var r = 630;
var yzt = [];
var col = 10;
var row = 10;
var sp = 0;

init();
animate();

function initThree(){
    webglScene = new THREE.Scene();
    webglRenderer = new THREE.WebGLRenderer();
    webglRenderer.setSize(window.innerWidth,window.innerHeight);
    webglRenderer.domElement.style.position = 'absolute';
    webglRenderer.domElement.style.top = 0;
    document.getElementById('container').appendChild(webglRenderer.domElement);

    css3dScene = new THREE.Scene();
    css3dRenderer = new THREE.CSS3DRenderer();
    css3dRenderer.setSize(window.innerWidth,window.innerHeight);
    css3dRenderer.domElement.style.position = 'absolute';
    css3dRenderer.domElement.style.top = 0;
    document.getElementById('container').appendChild(css3dRenderer.domElement);
}


function initCamera(){
    camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,1,5000);

    camera.position.z = 1000;
   // camera.lookAt({x:0,y:0,z:-2000});

    controls = new THREE.TrackballControls(camera);
}




function initWebglObject(){
    var geometry = new THREE.BoxGeometry( 10, 10, 10 );
    var material = new THREE.MeshBasicMaterial( { color:'rgba(255,255,0,0.5)' } );
    var mesh = new THREE.Mesh( geometry, material );
    webglScene.add( mesh );
   var gridHelper = new THREE.GridHelper( 700,50 );
    gridHelper.setColors( 0x0000ff, 0x808080 );
    gridHelper.position.y = -250;
  webglScene.add( gridHelper );

}

function initCss3dObject(){
    var ele = document.createElement('div');
    ele.style.width = divWidht+'px';
    ele.style.height = divHeight+'px';
    ele.style.backgroundColor = 'rgba(0,255,255,0.7)';

    var obj = new THREE.CSS3DObject(ele);



    //css3dScene.add(obj);
    ele.addEventListener('click',function(event){
         alert(180/(Math.PI/Math.atan(divWidht/2*r)));
        for(var i=0; i<360;i+=90){
            console.log(Math.cos(i)*r);
        }
        console.log(Math.cos(Math.PI/180*180));

    });

}
function initC(){
    var c = 180/(Math.PI/Math.atan(divWidht/2*r));
    var phi = Math.PI/180;
    for(var j=0; j<5; j++){

        for(var i= 0,k=1; i<360;i+=18){
            var ele = document.createElement('div');
            ele.style.width = divWidht+'px';
            ele.style.height = divHeight+'px';
            ele.style.backgroundColor = 'rgba(0,255,255,0.7)';
           // ele.textContent = 20*j+i/18+1;
            var img = document.createElement('img');
            img.src = 'image/p/'+(20*j+i/18+1)+'.jpg';
            img.style.width = divWidht+'px';
            img.style.height = divHeight+'px';
            ele.appendChild(img);
            var obj = new THREE.CSS3DObject(ele);
            obj.position.x = Math.cos(i*phi)*r;
            obj.position.z = Math.sin(i*phi)*r;
            obj.position.y = divHeight*2-divHeight*j;
            obj.lookAt(new THREE.Vector3(0,obj.position.y,0));
            var obj3D = new Object();
            obj3D.rotation = obj.rotation;
            obj3D.position = obj.position;
            yzt.push(obj3D);
            css3dScene.add(obj);
        }
    }
}

function initEvent(){

    var buttons = document.getElementsByTagName('button');
    for(var i=0; i<buttons.length; i++){
        buttons[i].addEventListener('click',tra,false);
    }

}
function tra(event){
    var id = event.target.id;
    switch(id){
        case 't1':
            move(1);
            break;
        case 't2':
            move(2);
            break;
        case 't3':
            move(3);
            break;
    }

}
function move(id){
    TWEEN.removeAll();

    var child = css3dScene.children;

    switch (id){

        case 1:
            for(var i=0;i<child.length; i++){
                tween = new TWEEN.Tween(child[i].rotation)
                    .to({x:yzt[i].rotation.x.toFixed(4),y:yzt[i].rotation.y.toFixed(4),z:yzt[i].rotation.z.toFixed(4)},1000)
                    .delay(100*i)
                    .onUpdate( render ).start();



                tween = new TWEEN.Tween(child[i].position)
                    .to({x:yzt[i].position.x.toFixed(4),y:yzt[i].position.y.toFixed(4),z:yzt[i].position.z.toFixed(4)},2000)
                    .delay(100*i)
                    .onUpdate( render ).start();
            }
            break;
        case 2:

            for(var i=0;i<child.length; i++){
                tween = new TWEEN.Tween(child[i].rotation)
                    .to({x: Math.PI/2, y:0,z:0},1000)
                    .delay(60*i)
                    .onUpdate( render ).start();
                var xx = (i%col)*(divHeight+sp)-((col-1)*(divWidht+sp))/2;
                var  yy = Math.floor(i/col)*(divHeight+sp) - ((row-1)*(divHeight+sp))/2;



                tween = new TWEEN.Tween(child[i].position)
                    .to({x: xx, y:-250,z:yy},2000)
                    .delay(60*i)
                    .onUpdate( render ).start();
            }
            break;
        case 3:
           // var col = 5,sp = 0, row = 20;


            for(var i=0;i<child.length; i++){

               var xx = (i%col)*(divHeight+sp)-((col-1)*(divWidht+sp))/2;
               var zz = Math.floor(i/col)*(divHeight+sp) - ((row-1)*(divHeight+sp))/2;

                tween = new TWEEN.Tween(child[i].rotation)
                    .to({x: 0, y:0,z:0},1000)
                    .delay(100*i)
                    .onUpdate( render ).start();



                tween = new TWEEN.Tween(child[i].position)
                    .to({x: xx, y:200,z:zz},2000)
                    .delay(100*i)
                    .onUpdate( render ).start();
            }



            break;
    }



}

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    TWEEN.update();
    //css3dScene.rotation.y+=0.0005;
    render();

}
function render(){
    webglRenderer.render(webglScene,camera);
    css3dRenderer.render(css3dScene,camera);
}

function init(){
    initThree();
    initCamera();
    initWebglObject();
    initCss3dObject();
    initC();
    initEvent();
}