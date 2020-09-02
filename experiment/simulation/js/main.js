function main(){
    let loaderio = document.querySelector('.preloader');

        loaderio.parentNode.removeChild(loaderio);
    
    var algo = {
        variableName: ['array_size', 'front', 'rear', 'i', 'queue', 'data', 'queue[rear]',
                      'queue[i]', '*i.value'],
        colorCode: [{key:'Main', color:'grey'},
                    {key:'enQueue', color:'grey'},
                    {key:'deQueue', color:'grey'},
                    {key:'isFull', color:'grey'},
                    {key:'isEmpty', color:'grey'},
                    {key:'display', color:'grey'},
                    {key:'Step', color:'green'},
                    {key:'Start', color:'blue'},
                    {key:'End', color:'blue'},
                    {key:'Declare', color:'blue'},
                    {key:'Display', color:'blue'},
                    {key:'Read', color:'blue'},
                    {key:'Initialize', color:'blue'},
                    {key:'If', color:'blue'},
                    {key:'Else', color:'blue'},
                    {key:'and', color:'blue'},
                    {key:'global', color:'purple'},
                    {key:'pointer', color:'purple'},
                    {key:'variable', color:'purple'},
                    {key:'array', color:'purple'},
                    {key:'equals', color:'skyblue'},
                    {key:'equals', color:'blue'},
                    {key:'<-', color:'grey'}],
        text: `Main
          {5} Step 1: Start
          {5} Step 2: Declare global pointer variable front and rear
          {5} Step 3: End

        enQueue
           {5} Step 1: Start
           {5} Step 2: create new node *t
           {5} Step 2: If t equals null
                      {22} Display Queue is full
                   {19} Else
                      {22} Declare variable data
                      {22} Display enter value
                      {22} Read variable data
                      {22} Set *t.value <- data
                      {22} If front equals null
                          {27} front <- t
                          {27} rear <- t 
                      {22} Else
                          {27} *rear.next <- t
                          {27} rear <- *rear.next
           {5} Step 3: End

        deQueue
           {5} Step 1: Start
           {5} Step 2: If front equals null
                      {22} Display Queue is empty
                   {19} Else
                      {22} Declare node pointer *t
                      {22} Set t <- front
                      {22} Set front <- *front.next
                      {22} Free t
          {5} Step 3: End

        isEmpty
           {5} Step 1: Start
           {5} Step 2: If front equals null
                     {22} Display Queue is empty
                   {19} Else
                      {22} Display Queue is not empty
           {5} Step 3: End

        display 
           {5} Step 1: Start
           {5} Step 2: If front not equals null
                     {22} 2.1: Declare node pointer *i 
                     {29} Set i <- front
                     {22} 2.2: Repeat the step until i not equals null
                          {29} Display value at i is *i.value
                          {29} Set i <- *i.next
                     {19} Else
                         {22} Display Queue is empty           
          {5} Step 3: End`,
        lines: 0,

        codeFormater: function(){
            let _this = this;
            let codeTxt = this.text.split('\n');
            let currentLine = 0;
            codeTxt.forEach(function(item, index){
                currentLine++;
                let line = item.trim().split(' ');
                let div = document.createElement('div');
                let previousKey = '';
                let string = false;
                div.classList.add('code-line-text');
                line.forEach(function(item, index){

                  let space = item.match(/\{[0-9]+\}/);
                  if(space != null){
                      space = '&nbsp;'.repeat(parseInt(item.slice(1, space[0].length-1)));
                      let span_ = document.createElement('span');
                      span_.innerHTML = space;
                      div.appendChild(span_);
                  }
                  else{
                  let span = document.createElement('span');
                  if(previousKey == 'Step' && item.search(/[0-9]:/) >= 0){
                      span.classList.add('color-green');
                  }
                  else if(string && _this.variableName.indexOf(item) < 0){
                      span.classList.add('color-yellow');
                  }
                  else{
                      span.classList.add('color-' + _this.findColor(item));
                  }
                  let text = item;
                  previousKey = text;
                  text == 'Display' ? string = true : ''; 
                  span.textContent = text;
                  index != line.length - 1 ? span.innerHTML += '&nbsp;' : '';

                  div.appendChild(span);    
                  }


                });
                document.querySelector('.code-text').appendChild(div);
            });
            this.lines = currentLine + 5;
        },

        rowFormater: function(){
            for(let x = 1; x <= this.lines; x++){
                let div1 = document.createElement('div');
                div1.classList.add('line-no');
                let span1 = document.createElement('span');
                span1.classList.add('current');
                let span2 = document.createElement('span');
                span2.classList.add('row-no');
                span2.textContent = x;
                div1.appendChild(span1);
                div1.appendChild(span2);
                document.querySelector('.editor .line').appendChild(div1);
            }
        },
        findColor: function(key){
            let color = 'blue';
            this.colorCode.forEach(function(item, index){
                if(item['key'] == key){
                    color = item['color'];
                }

            });
            if(color == 'blue'){

                if(this.variableName.indexOf(key.replace(',', '')) >=0){
                    color = 'blue';
                }
                if(color == 'blue' && key.search(/(\-|\+)*[0-9]+/g) >= 0){

                    color = 'skyblue';
                }
                if(color == 'blue' && key.search(/(\+|\-|\(|\))+/g) >= 0){
                    color = 'grey';
                }
            }
            return color;
        }
    }
    algo.codeFormater();
    algo.rowFormater();

    let editorDiv = document.querySelector('.editor');

    function gotoLine(line, duration, callback = null, skip = false){
        setTimeout(function(){
            let lineDiv = document.querySelectorAll('.editor .code-line-text');
            let lineNoDiv = document.querySelectorAll('.editor .line-no');

            for(let x = 0; x < lineDiv.length; x++){
                lineDiv[x].classList.remove('active');
                lineDiv[x].classList.remove('skip');
            }
            for(let x = 0; x < lineNoDiv.length; x++){
                lineNoDiv[x].childNodes[0].classList.remove('active');
                lineNoDiv[x].childNodes[0].classList.remove('skip');
            }
            if(line != 0){

                    lineDiv[line - 1].classList.add('active');
                    if(skip){
                        lineDiv[line - 1].classList.add('skip');
                    }
                    lineNoDiv[line - 1].childNodes[0].classList.add('active');
                    if(skip){
                        lineNoDiv[line - 1].childNodes[0].classList.add('skip');
                    }

                    let codeDiv = document.querySelector('.code-text').offsetTop;
                    let rowDiv = lineDiv[line - 1].offsetTop;

                    if((rowDiv - codeDiv + 13) > editorDiv.scrollTop && 
                        (rowDiv - codeDiv + 13) < editorDiv.scrollTop + 500){
                        //console.log('visible', (rowDiv - codeDiv + 13) , editorDiv.scrollTop);
                    }
                    else{
                        //console.log((rowDiv - codeDiv + 13) , editorDiv.scrollTop);
                        editorDiv.scroll(0, (rowDiv - codeDiv + 13) - 5);
                    }

                    if(callback){
                        callback();
                    }

            }else{
                if(callback){
                        callback();
                    }
            }
        }, duration);

    }
    /******************************** queue ***************************************/
    let terminal = document.querySelector('.commands-line');
    let enQueueelm = document.querySelector('.operations .enqueue-function');
    let deQueueelm = document.querySelector('.operations .dequeue-function');
    let isEmpty = document.querySelector('.operations .isempty-function');
    let display = document.querySelector('.operations .display-function');
    
    var questionDone = [];
    let program = true;
    let started = false;
    
    var queue = {
        size: 5,
        address: [],
        front: null,
        rear: null,
        enQueue: function(_this, e){
          let address = 0;
          let globalThis = this;
          gotoLine(6, 1000);  
          gotoLine(7, 2000);  
          gotoLine(8, 3000, function(){
              if(globalThis.rear == globalThis.size){
                  createVariable('*t', 'null', '5304', 'free');
                  gotoLine(9, 1000);
                  gotoLine(10, 2000, function(){
                   let div1 = document.createElement('div');
                    div1.classList.add('code-text');
                    let p1 = document.createElement('p');
                    p1.textContent = 'command>_';
                    p1.textContent = 'command>_';
                    p1.classList.add('user');
                    let p2 = document.createElement('p');
                    p2.textContent = ' Queue is full ';
                    div1.appendChild(p1);
                    div1.appendChild(p2);
                    terminal.appendChild(div1);
                      scrollTerminal();
                });
                gotoLine(11, 3000, function(){}, true);
                gotoLine(12, 4000, function(){}, true);
                gotoLine(13, 5000, function(){}, true);
                gotoLine(14, 6000, function(){}, true);
                gotoLine(15, 7000, function(){}, true);
                gotoLine(16, 8000, function(){}, true);
                gotoLine(17, 9000, function(){}, true);
                gotoLine(18, 10000, function(){}, true);
                gotoLine(19, 11000, function(){}, true);
                gotoLine(20, 12000, function(){}, true);
                gotoLine(21, 13000, function(){}, true);
                gotoLine(22, 14000, function(){
                    let t = document.querySelector('.memory .t');
                    t.parentNode.removeChild(t);
                });
                gotoLine(0, 15000, start_);
                setTimeout(function(){
                if(!questionDone.includes(1)){
                            questionDone.push(1);
                            askme(1);
                }
                 }, 15500);
              }else{
                  if(globalThis.rear != null){
                      let div0 = document.createElement('div');
                      div0.classList.add('node-next');
                      div0.style.opacity = '0';
                      let div01 = document.createElement('div');
                      div01.classList.add('line');
                      div0.appendChild(div01);
                      document.querySelector('.array-graphical').appendChild(div0);
                      address = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
                      while(address % 2!=0 && !globalThis.address.includes(address)){
                          address = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
                      }
                      console.log(address);
                      
                      createVariable('*t',address, '5304', 'used');
                  }
                  else{
                      address = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
                      while(address % 2!=0 && !globalThis.address.includes(address)){
                          address = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
                      }
                      //console.log(address);
                      globalThis.address.push(address);
                      
                      //console.log(globalThis.address);
                      createVariable('*t', address, '5304', 'used');
                  }
                  // creating node 
                  let div1 = document.createElement('div');
                  div1.classList.add('byte');
                  
                  let div2 = document.createElement('div');
                  div2.classList.add('value');
                  let div21 = document.createElement('div');
                  div21.classList.add('text');
                  div21.textContent = '0';
                  div2.appendChild(div21);
                  
                  let div3 = document.createElement('div');
                  div3.classList.add('next');
                  let div31 = document.createElement('div');
                  div31.classList.add('name');
                  div31.textContent = 'next';
                  div3.appendChild(div31);
                  
                  let div32 = document.createElement('div');
                  div32.classList.add('text');
                  div32.textContent = 'null';
                  div3.appendChild(div32);
                  
                  div1.appendChild(div2);
                  div1.appendChild(div3);
                  
                  document.querySelector('.array-graphical').appendChild(div1);
                  
                  div1 = document.createElement('div');
                  div1.classList.add('number');
                  if(globalThis.rear == null){
                  div1.textContent = address;
                  }else{
                      div1.textContent = address;
                      div1.style.marginLeft = '30px';
                  }
                  
                  document.querySelector('.index-no').appendChild(div1);
                  
                  
              }
          });
            
          gotoLine(9, 4000);
          if(globalThis.rear == globalThis.size){
              
          }else{
              gotoLine(10, 5000, function(){}, true);
              gotoLine(11, 6000);
              gotoLine(12, 7000, function(){
                   createVariable('data', '', '5304', 'free');
              });
              gotoLine(13, 8000, function(){
                    let div1 = document.createElement('div');
                    div1.classList.add('code-text');
                    let p1 = document.createElement('p');
                    p1.textContent = 'command>_';
                    p1.classList.add('user');
                    let p2 = document.createElement('p');
                    p2.textContent = ' enter value ';
                    let input = document.createElement('input');
                    input.setAttribute('type', 'text');
                    input.classList.add('getCommand');
                    div1.appendChild(p1);
                    div1.appendChild(p2);
                    div1.appendChild(input);
                    terminal.appendChild(div1);
                  scrollTerminal();
                  
                    
                    
              });
              let inputVal = 0;
              gotoLine(14, 9000, function(){
                  let getCommand = document.querySelector('.getCommand');
                  getCommand.focus();
                  
                  getCommand.addEventListener('input', function(e){
                     if(this.value.length > 0 && this.value.length < 3){ }
                      else{
                        this.value = '';
                      } 
                   });
                  
                   getCommand.addEventListener('keypress', function(e){
                     if(this.value.length > 0 && this.value.length < 3){
                           if(e != undefined && e.keyCode == 13){
                                this.blur();
                                let span = this.previousSibling;
                                let data  = this.value;
                                inputVal = data;
                                span.textContent = span.textContent + ' ' + data;
                                document.querySelector('.memory .data').classList.remove('free');
                                document.querySelector('.memory .data').classList.add('used');
                                document.querySelector('.memory .data .vvalue > span').textContent = data;
                                this.parentNode.removeChild(this);
                               
                                gotoLine(15, 1000, function(){
                                     let nodes = document.querySelectorAll('.array-graphical .byte');
                                     nodes[nodes.length - 1].childNodes[0].childNodes[0].textContent = inputVal;

                                });
                               
                                gotoLine(16, 2000)
                                if(globalThis.front == null){
                                  globalThis.rear = 0;
                                  globalThis.front = 0;
                                  gotoLine(17, 3000, function(){
                                     document.querySelector('.memory .front').classList.add('used');
                                     document.querySelector('.memory .front').classList.remove('free');
                                     document.querySelector('.memory .front .vvalue > span').textContent = address;
                                  });
                                  gotoLine(18, 4000, function(){
                                     document.querySelector('.memory .rear').classList.add('used');
                                     document.querySelector('.memory .rear').classList.remove('free');
                                     document.querySelector('.memory .rear .vvalue > span').textContent = address;
                                     document.querySelector('.array-pointer').classList.add('animate');
                                      
                                     document.querySelectorAll('.array-graphical .byte')[globalThis.rear].classList.add('active');
                                     document.querySelector('.array-pointer .rear i').classList.add('active');
                                     document.querySelector('.array-pointer .front i').classList.add('active');
                                    
                                     let indexNo = document.querySelectorAll('.index-no .number');
                                     indexNo[globalThis.rear].classList.add('active');
                                      
                                     setTimeout(function(){
                                        document.querySelectorAll('.array-graphical .byte')[globalThis.rear].classList.remove('active'); 
                                        document.querySelector('.array-pointer .rear i').classList.remove('active');
                                        document.querySelector('.array-pointer .front i').classList.remove('active'); 
                                     }, 500);
                                  });

                                  gotoLine(19, 5000, function(){}, true);
                                  gotoLine(20, 6000, function(){}, true);
                                  gotoLine(21, 7000, function(){}, true);
                                  gotoLine(22, 8000, function(){
                                      let t = document.querySelector('.memory .t');
                                      t.parentNode.removeChild(t);
                                      
                                      t = document.querySelector('.memory .data');
                                      t.parentNode.removeChild(t);
                                  });
                                  gotoLine(0, 9000, start_);
                                    setTimeout(function(){
                                    if(!questionDone.includes(1)){
                                                questionDone.push(1);
                                                askme(1);
                                    }
                                     }, 9500);
                                    
                                  
                                }else{
                                  
                                  gotoLine(17, 3000, function(){}, true);
                                  gotoLine(18, 4000, function(){}, true);
                                  gotoLine(19, 5000);
                                  gotoLine(20, 6000, function(){
                                      let nodes = document.querySelectorAll('.array-graphical .byte');
                                      nodes[globalThis.rear].childNodes[1].classList.add('used');
                                      nodes[globalThis.rear].childNodes[1].childNodes[1].textContent = address;
                                      let indexes = document.querySelectorAll('.array-graphical .node-next');
                                      indexes[globalThis.rear].style.opacity = '1';
                                      
                                  });
                                  gotoLine(21, 7000, function(){
                                      if(globalThis.rear == 0){
                                      document.querySelector('.array-pointer .front').classList.add('move_0');
                                      }
                                      let indexes = document.querySelectorAll('.index-no .number');
                                      let nodes = document.querySelectorAll('.array-graphical .byte');
                                      document.querySelector('.memory .rear .vvalue > span').textContent = address;
                                      if(globalThis.rear != 0){
                                           document.querySelector('.array-pointer .rear').classList.remove('move_' + globalThis.rear);
                                           indexes[globalThis.rear].classList.remove('active');
                                      }
                                      
                                      globalThis.rear += 1;
                                      nodes[globalThis.rear].classList.add('active');
                                      document.querySelector('.array-pointer .rear').classList.add('move_' + globalThis.rear);
                                      document.querySelector('.array-pointer .rear i').classList.add('active');
                                      
                                      indexes[globalThis.rear].classList.add('active');
                                      setTimeout(function(){
                                          nodes[globalThis.rear].classList.remove('active');
                                          document.querySelector('.array-pointer .rear i').classList.remove('active');
                                      }, 500);
                                      
                                  });
                                
                                  gotoLine(22, 8000, function(){
                                      let t = document.querySelector('.memory .t');
                                      t.parentNode.removeChild(t);
                                      
                                      t = document.querySelector('.memory .data');
                                      t.parentNode.removeChild(t);
                                  });
                                  gotoLine(0, 9000, start_);
                                  setTimeout(function(){
                                    if(!questionDone.includes(1)){
                                                questionDone.push(1);
                                                askme(1);
                                    }
                                     }, 9500);
                                }
                                
                           }
                     }
                   });
              });
              
              
          }
          
        },
        deQueue: function(_this, e){
            let globalthis = this;
            gotoLine(24, 1000);
            gotoLine(25, 2000);
            gotoLine(26, 3000);
            if(globalthis.front == null){
                gotoLine(27, 4000, function(){
                    let div1 = document.createElement('div');
                    div1.classList.add('code-text');
                    let p1 = document.createElement('p');
                    p1.textContent = 'command>_';
                    p1.classList.add('user');
                    let p2 = document.createElement('p');
                    p2.textContent = ' Queue is empty ';
                    div1.appendChild(p1);
                    div1.appendChild(p2);
                    terminal.appendChild(div1);
                    scrollTerminal();
                });
                gotoLine(28, 5000, function(){}, true);
                gotoLine(29, 6000, function(){}, true);
                gotoLine(30, 7000, function(){}, true);
                gotoLine(31, 8000, function(){}, true);
                gotoLine(32, 9000, function(){}, true);
                gotoLine(33, 10000);
                gotoLine(0, 11000, start_);
                setTimeout(function(){
                if(!questionDone.includes(2)){
                            questionDone.push(2);
                            askme(2);
                }
                 }, 11500);
            }else{
                 gotoLine(27, 4000, function(){}, true);
                 gotoLine(28, 5000);
                 gotoLine(29, 6000, function(){
                     createVariable('*t', 'null', '5304', 'free');
                 });
                 gotoLine(30, 7000, function(){
                     let frontPointTo = document.querySelector('.memory .front .vvalue > span').textContent;
                     document.querySelector('.memory .t .vvalue > span').textContent = frontPointTo;
                     document.querySelector('.memory .t').classList.add('used');
                     document.querySelector('.memory .t').classList.remove('free');
                 });
                gotoLine(31, 8000, function(){
                   if(globalthis.front == globalthis.rear){
                       document.querySelector('.memory .front .vvalue > span').textContent = 'null';
                       document.querySelector('.memory .front').classList.add('free');
                       document.querySelector('.memory .front').classList.remove('used');
                       document.querySelector('.array-pointer .front').style.opacity = '0';
                   } else{
                       let nodeNextAddr = document.querySelector('.array-graphical .byte').childNodes[1].childNodes[1].textContent;
                       document.querySelector('.memory .front .vvalue > span').textContent = nodeNextAddr ;
                       if(globalthis.front + 1 == globalthis.rear){
                           document.querySelector('.array-pointer .front').classList.add('move_01');
                           document.querySelector('.array-pointer .rear').classList.add('move_01');
                           document.querySelector('.array-pointer .rear').classList.remove('move_1');
                           
                       }else{
                          document.querySelector('.array-pointer .front').classList.add('move_1');
                       }
                       document.querySelector('.array-pointer .front i').classList.add('active');
                       
                       document.querySelector('.array-pointer .front').classList.remove('move_0');
                       document.querySelectorAll('.index-no .number')[globalthis.front].classList.remove('active');
                       document.querySelectorAll('.index-no .number')[globalthis.front + 1].classList.add('active');
                       document.querySelectorAll('.array-graphical .byte')[globalthis.front + 1].classList.add('active');
                       setTimeout(function(){
                           document.querySelectorAll('.array-graphical .byte')[globalthis.front + 1].classList.remove('active');
                           document.querySelector('.array-pointer .front i').classList.remove('active');
                           
                       }, 500);
                   }
                });
                
                gotoLine(32, 9000, function(){
                   if(globalthis.front == globalthis.rear){
                       let div = document.querySelector('.array-graphical .byte');
                       let indexno = document.querySelector('.index-no .number');
                       div.parentNode.removeChild(div);
                       indexno.parentNode.removeChild(indexno);
                       document.querySelector('.memory .rear .vvalue > span').textContent = 'null';
                       document.querySelector('.memory .rear').classList.remove('used'); 
                       document.querySelector('.memory .rear').classList.add('free');
                       document.querySelector('.array-pointer').classList.remove('animate');
                       setTimeout(function(){
                           document.querySelector('.array-pointer .front').style.opacity = '1';
                           globalthis.rear = null;
                           globalthis.front = null;
                           globalthis.address = [];
                       }, 1000);
                       
                       
                   }else{
                       let div = document.querySelector('.array-graphical .byte');
                       let indexno = document.querySelector('.index-no .number');
                       let nodeNext = document.querySelector('.array-graphical .node-next')
                       div.parentNode.removeChild(div);
                       indexno.parentNode.removeChild(indexno);
                       nodeNext.parentNode.removeChild(nodeNext);
                       
                       indexno = document.querySelector('.index-no .number');
                       indexno.style.marginLeft = '0px';
                       if(globalthis.rear == globalthis.front + 1){
                           document.querySelector('.array-pointer .front').classList.remove('move_01');
                           document.querySelector('.array-pointer .rear').classList.remove('move_01');
                       }else{
                       document.querySelector('.array-pointer .front').classList.add('move_0');
                       document.querySelector('.array-pointer .front').classList.remove('move_1');
                       document.querySelector('.array-pointer .rear').classList.add('move_' + (globalthis.rear - 1));
                       document.querySelector('.array-pointer .rear').classList.remove('move_' + globalthis.rear);
                       }
                       globalthis.rear -= 1;
                       
                   } 
                });
                
                gotoLine(33, 10000, function(){
                    let div = document.querySelector('.memory .t');
                    div.parentNode.removeChild(div);
                });
                gotoLine(0, 11000, start_);
                setTimeout(function(){
                if(!questionDone.includes(2)){
                            questionDone.push(2);
                            askme(2);
                }
                 }, 11500);
                
            }
        },
        isEmpty: function(_this, e){
            let globathis = this;
            gotoLine(35, 1000);
            gotoLine(36, 2000);
            gotoLine(37, 3000);
            
            if(this.front == null){
                gotoLine(38, 4000, function(){
                    let div1 = document.createElement('div');
                    div1.classList.add('code-text');
                    let p1 = document.createElement('p');
                    p1.textContent = 'command>_';
                    p1.classList.add('user');
                    let p2 = document.createElement('p');
                    p2.textContent = ' Queue is empty ';
                    div1.appendChild(p1);
                    div1.appendChild(p2);
                    terminal.appendChild(div1);
                    scrollTerminal();
                });
                gotoLine(39, 5000, function(){}, true);
                gotoLine(40, 6000, function(){}, true);
                
            }else{
               gotoLine(38, 4000, function(){}, true);
               gotoLine(39, 5000);
               gotoLine(40, 6000, function(){
                    let div1 = document.createElement('div');
                    div1.classList.add('code-text');
                    let p1 = document.createElement('p');
                    p1.textContent = 'command>_';
                    p1.classList.add('user');
                    let p2 = document.createElement('p');
                    p2.textContent = ' Queue is not empty ';
                    div1.appendChild(p1);
                    div1.appendChild(p2);
                    terminal.appendChild(div1);
                   scrollTerminal();
                });
                
            }
            gotoLine(41, 7000);
            gotoLine(0, 8000, start_);
            setTimeout(function(){
                if(!questionDone.includes(3)){
                            questionDone.push(3);
                            askme(3);
                }
            }, 8500);
            
        },
        dipslay: function(_this, e){
            let globalthis = this;
            gotoLine(43, 1000);
            gotoLine(44, 2000);
            gotoLine(45, 3000);
            if(this.front == null){
                gotoLine(46, 4000, function(){}, true);
                gotoLine(47, 5000, function(){}, true);
                gotoLine(48, 6000, function(){}, true);
                gotoLine(49, 7000, function(){}, true);
                gotoLine(50, 8000, function(){}, true);
                gotoLine(51, 9000);
                gotoLine(52, 10000, function(){
                    let div1 = document.createElement('div');
                    div1.classList.add('code-text');
                    let p1 = document.createElement('p');
                    p1.textContent = 'command>_';
                    p1.classList.add('user');
                    let p2 = document.createElement('p');
                    p2.textContent = ' Queue is empty ';
                    div1.appendChild(p1);
                    div1.appendChild(p2);
                    terminal.appendChild(div1);
                    scrollTerminal();
                });
                gotoLine(53, 11000);
                gotoLine(0, 12000, start_);
                setTimeout(function(){
                if(!questionDone.includes(4)){
                            questionDone.push(4);
                            askme(4);
                }
            }, 8500);
                
            }else{
                gotoLine(46, 4000, function(){
                    createVariable('*i', 'null', '5838', 'free');   
                });
                let nodes;
                let indexes;
                gotoLine(47, 5000, function(){
                    nodes = document.querySelectorAll('.array-graphical .byte');
                    indexes = document.querySelectorAll('.index-no .number');
                    document.querySelector('.memory .i .vvalue > span').textContent = indexes[0].textContent;
                    
                    document.querySelector('.memory .i').classList.remove('free');
                    document.querySelector('.memory .i').classList.add('used');
                });
                gotoLine(48, 6000, function(){;
                let timecount = 1000;                             
                for(let x = 0; x < indexes.length; x++){
                gotoLine(49, timecount, function(){
                    let div1 = document.createElement('div');
                    div1.classList.add('code-text');
                    let p1 = document.createElement('p');
                    p1.textContent = 'command>_';
                    p1.classList.add('user');
                    let p2 = document.createElement('p');
                    p2.textContent = ' Value at ' + indexes[x].textContent + ' is ' + (nodes[x].childNodes[0].childNodes[0].textContent);
                    div1.appendChild(p1);
                    div1.appendChild(p2);
                    terminal.appendChild(div1);
                    scrollTerminal();
                    
                });
                timecount += 1000;
                gotoLine(50, timecount, function(){
                    if(indexes[x + 1]){
                    document.querySelector('.memory .i .vvalue > span').textContent = indexes[x + 1].textContent;
                    }else{
                        document.querySelector('.memory .i .vvalue > span').textContent = 'null';
                        document.querySelector('.memory .i').classList.add('free');
                        document.querySelector('.memory .i').classList.remove('used');
                    }
                });
                    
                timecount += 1000;
                    
                } 
                gotoLine(51, timecount, function(){}, true);
                timecount += 1000;
                gotoLine(52, timecount, function(){}, true);
                timecount += 1000;
                gotoLine(53, timecount, function(){
                    let div =  document.querySelector('.memory .i');
                    div.parentNode.removeChild(div);
                    
                });
                timecount += 1000;
                gotoLine(0, timecount, start_);
                setTimeout(function(){
                if(!questionDone.includes(4)){
                            questionDone.push(4);
                            askme(4);
                }
                }, timecount+500);
                });
            }
        }
    }
    enQueueelm.addEventListener('click', function(e){
        if(!program){
        stop_();
        queue.enQueue(this, e);
        }
    });
    deQueueelm.addEventListener('click', function(e){
        if(!program){
        stop_();
        queue.deQueue(this, e);
        }
    });
    isEmpty.addEventListener('click', function(e){
        if(!program){
        stop_();
        queue.isEmpty(this, e);
        }
    });
    display.addEventListener('click', function(e){
        if(!program){
        stop_();
        queue.dipslay(this, e);
        }
    });
    /********************************  bash **************************************/
    var start = document.querySelector('header .run');
    start.addEventListener('click', function(e){
        if(!program || !started){
            started = true;
            startMain(this, e);
        }
    });

    function startMain(_this, e){
        if(_this.classList.contains('active')){
            stop_();
            
            _this.classList.remove('active');
            _this.childNodes[1].style.display = 'inline-block';
            _this.childNodes[3].style.display = 'none';
            _this.childNodes[5].textContent = 'Run';
            
            
            document.querySelector('.array-pointer').classList.remove('animate');
            
            setTimeout(function(){
                document.querySelector('.array-graphical').innerHTML = '';
                
                document.querySelector('.index-no').innerHTML = '';
                document.querySelector('.memory').innerHTML = '';
                document.querySelector('.array-pointer .front').setAttribute('class','pointer front');
                document.querySelector('.array-pointer .rear').setAttribute('class','pointer rear');
                document.querySelector('.commands-line').innerHTML = '';
                _this.classList.remove('disabled');
            }, 500);
            
            
            queue.size = 5;
            queue.front = null;
            queue.rear = null;
            queue.address = [];
            program = true;
            started = false;
        }else{
            _this.classList.add('disabled');
            _this.classList.add('active');
            _this.childNodes[1].style.display = 'none';
            _this.childNodes[3].style.display = 'inline-block';
            _this.childNodes[5].textContent = 'Stop';
            Main();
        }
    }

    //////////////////////// algo functions /////////////////////////////
    function start_(){
        document.querySelector('header .run').classList.remove('disabled');
        let cmd = document.querySelectorAll('.operations .cmd');
        for(let x=0; x < cmd.length; x++){
            cmd[x].classList.remove('disabled');
        }
        program = false;
    }
    function stop_(){
        program = true;
        document.querySelector('header .run').classList.add('disabled');
        let cmd = document.querySelectorAll('.operations .cmd');
        for(let x=0; x < cmd.length; x++){
            cmd[x].classList.add('disabled');
        }
    }
    
    
    function Main(){

        gotoLine(1, 1000);
        gotoLine(2, 2000);
        gotoLine(3, 3000,  function(){
            createVariable('*front', 'null', '5304', 'free');
            createVariable('*rear', 'null', '5108', 'free');
        });
        gotoLine(4, 4000);
        gotoLine(0, 5000, start_);
    }

    function createVariable(name, value, address, type){
        let memory = document.querySelector('.memory');
        let div = document.createElement('div');
        div.classList.add('variable');
        div.classList.add(type);
        div.classList.add(name.replace('*', ''));
        let div2 = document.createElement('div');
        let span = document.createElement('span');

        span.textContent = name;
        div2.className = 'vname';
        div2.appendChild(span);
        div.appendChild(div2);

        div2 = document.createElement('div');
        span = document.createElement('span');
        span.textContent = value;
        div2.className = 'vvalue';
        div2.appendChild(span);
        div.appendChild(div2);

        memory.appendChild(div);

    }
    
    


terminal.addEventListener('click', function(){
    let getCommand = document.querySelector('.getCommand');
    if(getCommand != null){
        getCommand.focus();
    }
});


document.querySelector('.reload-terminal').addEventListener('click', function(){
           document.querySelector('.commands-line').innerHTML = '';
            
        });

function scrollTerminal(){
            let terminal = document.querySelector('.bash .command');
            terminal.scrollTop = terminal.scrollHeight;
        }




            let correct = 0;
        let options = document.querySelectorAll('.askme .checkbox input');
        
       function askme(questionNo){
            let question = document.querySelector('.askme .question > h4');
            let option_ = document.querySelectorAll('.checkbox label');
            switch (questionNo){
                case 1:
                    question.textContent = 'Q. In linked list implementation of queue, if only front pointer is maintained, which of the following operation take worst case linear time?';
                    option_[0].childNodes[0].textContent = 'Insertion.';
                    option_[1].childNodes[0].textContent = 'Deletion.';
                    option_[2].childNodes[0].textContent = 'To empty a queue.';
                    option_[3].childNodes[0].textContent = 'Both Insertion and To empty a queue.';
                    correct = 3;
                    break;
                case 2:
                    question.textContent = 'Q. In linked list implementation of a queue, where does a new element be inserted?';
                    option_[0].childNodes[0].textContent = 'At the head of link list.';
                    option_[1].childNodes[0].textContent = 'At the centre position in the link list.';
                    option_[2].childNodes[0].textContent = 'At the tail of the link list.';
                    option_[3].childNodes[0].textContent = 'At any position in the linked list.';
                    correct = 2;
                    break;
                case 3:
                    question.textContent = 'Q. In linked list implementation of a queue, front and rear pointers are tracked. Which of these pointers will change during an insertion into EMPTY queue?';
                    option_[0].childNodes[0].textContent = 'Only front pointer.';
                    option_[1].childNodes[0].textContent = 'Only rear pointer.';
                    option_[2].childNodes[0].textContent = 'Both front and rear pointer.';
                    option_[3].childNodes[0].textContent = 'No pointer will be changed.';
                    correct = 2;
                    break;
                case 4:
                    question.textContent = 'Q. In linked list implementation of a queue, the important condition for a queue to be empty is?';
                    option_[0].childNodes[0].textContent = 'FRONT is null.';
                    option_[1].childNodes[0].textContent = 'Front equals -1.';
                    option_[2].childNodes[0].textContent = 'Front equals Array size - 1';
                    option_[3].childNodes[0].textContent = 'FRONT==REAR-1.';
                    correct = 0;
                    break;
                    
                    
            }
            document.querySelector('.askme').style.display = 'flex';
        }
        
        
        function checkAnswer(index){
            for(let x = 0; x < options.length; x++){
                if(index != x){
                    options[x].checked = false;
                    options[x].nextSibling.nextSibling.classList.remove('false')
                }
                
            }
            if(index != correct){
                    options[index].nextSibling.nextSibling.classList.add('false');
            }else{
                setTimeout(function(){
                    document.querySelector('.askme').style.display = 'none';
                    for(let x = 0; x < options.length; x++){
                            options[x].checked = false;
                            options[x].nextSibling.nextSibling.classList.remove('false')
                    }
                }, 1000);
                
                
            }
        }
        
        for(let x = 0; x < options.length; x++){
            options[x].addEventListener('change', function(){
                checkAnswer(x);
            });
        }

       document.querySelector('.simulater').addEventListener('click', function(){
           document.querySelector('.information').classList.add('animate');
       });
       document.querySelector('.theory').addEventListener('click', function(){
           document.querySelector('.information').classList.remove('animate');
       });









}
window.addEventListener('load', main);