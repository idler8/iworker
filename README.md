# iworker
webworker的简单应用

simple-web-worker的作者好像已经不活跃了，为了用到更方便的webworker建立了本仓库

## 安装方法
```
  npm i i-web-worker
```
## 调用方法
```javascript
  const A = function(data){
    console.log('A',data);
  }
  function B(data){
    console.log('B',data)
    A('A is Run in B');
  }
  import IWorker from 'i-web-worker';
  let worker = new IWorker();
  worker.set(A);
  worker.set(B);
  worker.run('A','A is Run');
  //A A is Run
  worker.run('B','B is Run');
  //B B is Run
  //A A is Run in B
```