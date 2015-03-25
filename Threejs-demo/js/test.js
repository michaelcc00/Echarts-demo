/**
 * Created by michaelchan on 2015/2/5.
 */
var scene,camera,renderer;

var controls;
var grid = [];
init(1);
animate();
function init(ec){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(10,window.innerWidth/window.innerHeight,1,10000);
    camera.position.z = 30000;



    controls = new THREE.TrackballControls(camera);
    //scene.rotation.y = -90;
    //scene.rotation.x = 80;

  /*  var chartsEle = document.createElement('div');
    chartsEle.style.width = '600px';
    chartsEle.style.height = '400px';
    chartsEle.style.backgroundColor = 'rgba(255,255,0,0.5)';
    document.body.appendChild(chartsEle);
    var option = getOption();
    var chart = ec.init(chartsEle);
    chart.setOption(option);
    var obj1 = new THREE.CSS3DObject(chartsEle);
    obj1.position.x = 100;
    obj1.position.y = 100;
    obj1.position.z = 100;
    scene.add(obj1);*/
    var width = 640;
    var height = 480;
    var col = 5;
    var row = 5;
    var sp = 150;
    var fullWidth = width * col;
    var fullHeight = height * row;

// A
   // camera.setViewOffset( fullWidth, fullHeight, width * 0, height * 0, width, height );
    for(var j=0; j<3; j++){




        for(var i=0; i<25;i++){
            var ele = document.createElement('div');
            ele.style.width = width+'px';
            ele.style.height = height+'px';

            //ele.textContent = j*50+i;
           // ele.style.backgroundColor = 'rgba('+r+','+g+','+b+',0.5)';
            //ele.innerHTML = '<img src="image/1.jpg" width="100px" height="100px"/>';
            var img = document.createElement('img');
           // img.src = 'image/p/'+(i+(j*25))+'.jpg';
            img.src = 'image/1.jpg';
            img.style.width = width+'px';
            img.style.height = height+'px';
            ele.appendChild(img);

            var obj = new THREE.CSS3DObject(ele);
            obj.position.x = (i%col)*(width+sp)-((col-1)*(width+sp))/2;
            obj.position.y = Math.floor(i/col)*(height+sp) - ((row-1)*(height+sp))/2;
            obj.position.z = j*2000 - 2000;
            var object3D = new THREE.Object3D();
            object3D.position = obj.position;
            grid.push(object3D);


            //obj.position.z = 0;
          //obj.rotation.y = Math.PI/2;
            /*  obj.rotation.y = Math.random();
             obj.rotation.z = Math.random();
             obj.scale.x = Math.random() + 0.5;
             obj.scale.y = Math.random() + 0.5;*/
            scene.add(obj);
        }

    }




    renderer = new THREE.CSS3DRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 500;
    controls.maxDistance = 26000;
    controls.addEventListener( 'change', render );
    var gridHelper = new THREE.GridHelper( 200, 10 );
    scene.add( gridHelper );
    //scene.visible = false;

    document.getElementById('container').appendChild( renderer.domElement );
    render();
    var button = document.getElementById( 't1' );
    var button2 = document.getElementById( 't2' );
    var button3 = document.getElementById( 't3' );
    button.addEventListener( 'click', function ( event ) {
        TWEEN.removeAll();
        var child = scene.children;
       /* tween = new TWEEN.Tween(child.position)
            .to({ x:child.position.x,y:child.position.y,z:child.position.z,rotation: 360}, 2000)
           .delay(1000)
            .onUpdate( render ).start();*/
        for(var i=0;i<child.length; i++){
            tween = new TWEEN.Tween(child[i].rotation)
                .to({x: 0, y:Math.PI,z:0},1000)
                .delay(50*i)
                .onUpdate( render ).start();
        }






    }, false );
    button2.addEventListener( 'click', function ( event ) {
        TWEEN.removeAll();
        var child = scene.children;

        for(var i=0;i<child.length; i++){
            tween = new TWEEN.Tween(child[i].position)
                .to({x: 0, y:0,z:0},2000)
                //.delay(100)
                .onUpdate( render ).start();


        }






    }, false );

    button3.addEventListener( 'click', function ( event ) {
        TWEEN.removeAll();
        var child = scene.children;

        for(var i=0;i<child.length; i++){
            tween = new TWEEN.Tween(child[i].position)
                .to({x: Math.random()*5000-2500, y:Math.random()*5000-2500,z:Math.random()*20000-20000},2000)
                //.delay(100)
                .onUpdate( render ).start();


        }






    }, false );

}

function test(ec){
    var chartsEle = document.createElement('div');
    chartsEle.style.height = '400px';
    chartsEle.style.width = '300px';
    chartsEle.style.backgroundColor = 'rgba(255,255,0,0.5)';
    var img = document.createElement('img');
    img.src = 'image/1.jpg';
    chartsEle.appendChild(img);
    document.body.appendChild(chartsEle);

}


function initEcharts(){
    require.config({
        paths: {
            echarts: './js'
        }
    });
    require(
        [
            'echarts',
            'echarts/chart/bar',
            'echarts/chart/line',
            'echarts/chart/pie'

        ],init
    );
}
function animate() {

    requestAnimationFrame( animate );
    TWEEN.update(  );
    //scene.rotation.y +=0.002;
   // scene.rotation.y +=0.1;
    render();

    controls.update();

}
function render(){
    renderer.render(scene,camera);

}

function getOption(){
    var option = {
        backgroundColor: 'rgba(255,255,255,0.8)',
        title : {
            text: '',
            subtext: ''
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['蒸发量','降水量']
        },
        toolbox: {
            show : false,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'蒸发量',
                type:'bar',
                data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'降水量',
                type:'bar',
                data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                markPoint : {
                    data : [
                        {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                        {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                }
            }
        ]
    };
    return option;

}