$(function() {
  //ボタンがクリックされたら処理が走ります。
  $('.btns button:nth-child(-n+2)').on('click',function() {
                $('.chara').css('border', '7px solid #FFC0CB')
    });
  });



function btnFunc() {
	$('.chara').css('border', '7px solid #98FB98')
}

function checkText() {
	const inputText = document.getElementById('mytext');
    //入力ボックスの内容を表示する
    alert(inputText.value);
 
}

function jsontest(){ 
	$.ajax({
          url: "./json/text.json",
          type: "GET",
          dataType: "json",
        })
          .done(function (data) {
            // success
            //取得jsonデータ
            var data_stringify = JSON.stringify(data);
            var data_json = JSON.parse(data_stringify);
            //jsonデータから各データを取得
            var data_id = data_json[0]["id"];
            var data_title = data_json[0]["title"];
            //出力
            //$("#id").text(data_id);
            //$("#title").text(data_title);
			output("jsonから持って来て",'me');
			setTimeout( ()=> {
				output(data_title, 'bot');
    		}, 1000);
          })
          .fail(function (data) {
            // error
            console.log("error");
	});

}

function Artifact(N){ 
	$.ajax({
          url: "./json/text2.json",
          type: "GET",
          dataType: "json",
        })
          .done(function (data) {
            // success
            //取得jsonデータ
            var data_stringify = JSON.stringify(data);
            var data_json = JSON.parse(data_stringify);
            //jsonデータから各データを取得
			var data_sum = data_json[0]["sum"];
            var data_name = data_json[1]["name"];
            var data_type = data_json[1]["type"];
			var data_value = data_json[1]["value"];
			
			var ent_sum = 0;
			var att_sum = 0;
			var rel_sum = 0;
			var mul_sum = 0;
			
			var ent_sum_1 = 0;
			var att_sum_1 = 0;
			var rel_sum_1 = 0;
			var mul_sum_1 = 0;
            //出力
            $("#id").text(data_name);
            $("#title").text(data_type);
			
			for(i=1;i<data_sum+1;i++){
				data_name = data_json[i]["name"];
            	data_type = data_json[i]["type"];
				data_value = data_json[i]["value"];
				//output('名前は'+data_name, 'bot');
				switch(data_type){
					case 'ent':
						ent_sum++;
						if(data_value==1) ent_sum_1++;
						break;
					case 'att':
						att_sum++;
						if(data_value==1) att_sum_1++;
						break;
					case 'rel':
						rel_sum++;
						if(data_value==1) rel_sum_1++;
						break;
					case 'mul':
						mul_sum++;
						if(data_value==1) mul_sum_1++;
						break;
					default:
					output('jsonファイルに誤りがあるみたい…', 'bot');	
				}
			}
			
			var min=Math.min(ent_sum_1/ent_sum, att_sum_1/att_sum, rel_sum_1/rel_sum,mul_sum_1/mul_sum);
			if(N==0){
			output("結果を教えて",'me');
			setTimeout( ()=> {
			//output('実体：'+ent_sum_1+'/'+ent_sum, 'bot');
			//output('属性：'+att_sum_1+'/'+att_sum, 'bot');
			//output('関連：'+rel_sum_1+'/'+rel_sum, 'bot');
			//output('多重度：'+mul_sum_1+'/'+mul_sum, 'bot');
			output('合計：'+(ent_sum_1+att_sum_1+mul_sum_1+rel_sum_1)+'/'+data_sum, 'bot');
			}, 1000);
			}
			if(N==1){
			output("苦手箇所を教えて",'me');
			setTimeout( ()=> {
			var bad='';
			if(ent_sum_1/ent_sum==min){
				bad=bad+'実体,';
			}
			if(att_sum_1/att_sum==min){
				bad=bad+'属性,';
			}
			if(rel_sum_1/rel_sum==min){
				bad=bad+'関連,';
			}
			if(mul_sum_1/mul_sum==min){
				bad=bad+'多重度,';
			}
			output(bad.slice( 0, -1 )+'の理解がイマイチみたい。', 'bot');
			}, 1000);
			}
          })
          .fail(function (data) {
            // error
            console.log("error");
	});

}
          




function output(val,person) {
    const ul = document.getElementById('chat-ul');
    const li = document.createElement('li');
    // このdivにテキストを指定
    const div = document.createElement('div');
	const div_img = document.createElement('div');
	const span = document.createElement('span');
	const artifact = document.createElement('img');
	artifact.src="image2.png";
	artifact.alt="";
    div.textContent = val;
	span.textContent = '2020.12.12 21:11';
	//alert(div.textContent);
	if (person === 'me') {
    	div.classList.add('mymessage');
    	li.classList.add('message-area');
		li.classList.add('me');
		span.classList.add('date');
    	ul.appendChild(li);
		li.appendChild(div);
		div.appendChild(span);
	}else if(person === 'bot'){
		div_img.classList.add('user-image');
		div_img.setAttribute('style', "background-image: url(img.jpg);");
		div.classList.add('message');
    	li.classList.add('message-area');
		li.classList.add('you');
		span.classList.add('date');
    	ul.appendChild(li);
		li.appendChild(div_img);
		li.appendChild(div);
		div.appendChild(span);
	}else if(person === 'photo'){
		div_img.classList.add('user-image');
		div_img.setAttribute('style', "background-image: url(img.jpg);");
		div.classList.add('message');
    	li.classList.add('message-area');
		li.classList.add('you');
		span.classList.add('date');
    	ul.appendChild(li);
		li.appendChild(div_img);
		li.appendChild(div);
		div.appendChild(artifact);
		div.appendChild(span);
	
	}
    
}


function exapmple(){
	output('成果物の例が欲しい','me');
	setTimeout( ()=> {
	output('バリエーション増やしたいね','photo');
	}, 1000);
}

	
function formsend() {
	const inputText = document.getElementById('mytext');
	const echo =inputText.value;
    if (!inputText.value) return false;
    // 自分のテキストを送信
	output(inputText.value,'me');
	setTimeout( ()=> {
		output(echo, 'bot');
        echo = '';
    }, 1000);
    
    setTimeout( ()=> {
        // 入力内を空欄にする
        inputText.value = '';
    }, 1);
}

