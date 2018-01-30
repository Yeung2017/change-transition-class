# change-transition-class
基于jQuery的向元素添加css过渡效果并且当display为none时仍然适用
## 安装依赖
```
yarn
```
## build
```
yarn build
```
将在dist目录下输出build后的jquery.change-transition-class.js的文件
## 运行demo
```
yarn start
```
demo在demo目录下，服务器运行后可以在http://localhost:1234/demo.html进行查看
##完整示例
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    body {
      margin: 0;
    }
    .wrapper {
      position: relative;
      left: 0;
      top: 0;
      width: 1000px;
      margin: 0 auto;
    }
    .box {
      position: absolute;
      left: 50%;
      width: 200px;
      height: 86px;
      margin-left: -100px;
    }

    /* 可以约定.fade表示该元素要启css用过渡,且.fade表示过渡开始的状态 */
    .box.fade {
      opacity: 0;
      transform: translate3d(-100px,0,0);
      transition: transform 3s ease-out, opacity 3s ease-out;
    }

    /* 约定.fade.in表示过渡结束的状态 */
    .box.fade.in {
      opacity: 1;
      transform: translate3d(0,0,0);
    }

    .box--01 {
      top: 100px;
      background-color:royalblue;
    }
    .box--02 {
      top: 200px;
      background-color: brown;
    }
    .btn {
      display: block;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <button id="btn" class="btn">显示/隐藏</button>
    <div class="box box--01 fade" style="display:none;"></div>
    <div class="box box--02 fade"></div>
  </div>
  <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
  <script src="../dist/jquery.change-transition-class.js"></script>
  <script>
    $(function(){
      $(document).on('click','#btn',function(){
        $('.box--01').hasClass('in') ? $('.box').transitionClassToHide('in',function(){
          console.log('隐藏完毕');
          console.log($(this));
        }) : $('.box').transitionClassToShow('in',function(){
          console.log('显示完毕');
          console.log($(this));
        }); 
      });
    });
  </script>
</body>
</html>
```