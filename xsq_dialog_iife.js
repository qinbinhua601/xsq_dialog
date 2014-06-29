/**
 * Author : Alex Q
 * Usage  : to init different styled dialog box [0] login/register [1] normal message box 
 * Date   : 2014-4-22 
 * Hint   : jQuery.js is required
 * Update : 2014-6-29
 *
 */


/**
 * [checkLibs description]
 *  pre check the libs required
 */
(function checkLibs($){
	//jquery tabs 
	if(!$.fn.tabs){
		alert("pls include the jquery ui tabs");
	}
	//jquery dialog
	if(!$.fn.dialog){
		alert("pls include the jquery ui dialog");
	}	
	//validateform.js
	if(!$.fn.Validform){
		alert("pls include the validateform.js");
	}
})(jQuery);

//START of [xsq_dialog]

/**
 * [xsq_dialog description]
 *	dialog boxes for xsq
 */
var xsq_dialog	=(function($){
	/**
	 * [_options description] [jQuery UI dialog] options
	 * 
	 * _options to be used for initializing
	 */
	var _options = {
		//mode : 0
		'login_register':{
			// appendTo:'#overlay',	
			autoOpen:true,
			draggable:false,
			closeOnEscape:true,
			closeText:"close",
			width:"490px",
			title:"西十区",
			show: { effect: "blind", duration: 700 },
			hide: {	effect: "explode", durantion: 700}
		},
		//mode : 1
		'normal':{
			title:"西十区",
			draggable:false,
			closeText:"close",
			show: { effect: "blind", duration: 700 },
			hide: {	effect: "explode", durantion: 700}
		}
	};

	/**
	 * [init description]
	 * 	
	 *  mode: 0 [default] [description] login & register dialog box !
	 *	mode: 1 [normal]  [description] empty div # xsq_dialog 
	 *  mode: 2 ...
	 *
	 * e.g. init(mode,content,custom_option)
	 */
	
	var init = function(){
		//default value of  mode: 1 | content[optional] 		| custom_option[optional]
		//					mode: 0 | custom_option[optional] 
		var mode = 0;
		var content =undefined;
		var custom_option = undefined;

		//give the param accoiding to [var] mode 
		if(arguments.length){
			mode = (typeof(arguments[0])==='number') ? arguments[0]: parseInt(arguments[0]);
			content = (arguments[0] === 1) ? arguments[1] : undefined;
			custom_option = (arguments[0] === 1) ? arguments[2] : arguments[1];
		}
		switch(mode){
			case 1:
				_xsq_normal(content,custom_option);
				break;
			case 2:
				break;
			default:
				_xsq_login_register(custom_option);
				break;
		}
	};

	/**
	 * [_xsq_login_register description]
	 *
	 * call for the xsq login & register dialog box
	 * 
	 */
	var _xsq_login_register = function(option){
		var option = (arguments[0] === undefined)?_options['login_register']:arguments[0];
		// var option = (arguments[0]===undefined)?_options['login_register']:arguments[0];
		var html = '	<div id="xsq_dialog"> <div id="tabs"> <ul> <li><a href="#tabs-1">请先登录</a></li> <li><a href="#tabs-2">没有账号，注册</a></li> </ul> <div id="tabs-1"><form action="/member/authAjax_new.php" name="form2" id="form2" method="post" ><input type="hidden" name="act" value="log"/> <input type="hidden" name="toUrl" value=""/> <ul> <li>请输入您的账号</li> <li> <input type="text" name="lg_a1" id="lg_a1"> </li> <li>请输入您的密码</li> <li> <input type="password" name="lg_a2" id="lg_a2"> </li> <li>请输入验证码</li> <li><input type="text" name="authCode" id="auth" class="auth"><img title="看不清？点击更换" class="vdimgck" src="/member/authCode_ex.php" alt=""></li> <li><input id="xsq_lg" type="submit" value="登 录"></li> </ul> </form> </div> <div id="tabs-2"> <!-- <form action="/member/register.php" name="form1" id="form1" method="post"> --> <form action="/member/authAjax_new.php" name="form1" id="form1" method="post"> <input type="hidden" name="reg" value=""/><ul> <li>请输入您的账号</li> <li> <input type="text" id="lr_a2" name="lr_a2"/> </li> <li> <span style="margin-right:63px;">请输入您的密码</span><i class="orange">*密码由6-20个字母、数字和特殊字符组成*</i> </li> <li> <input type="password" id="lr_a3" class="inputxt" name="lr_a3"> <div class="passwordStrength"><span>弱</span><span>中</span><span class="last">强</span></div> </li> <li>请再次输入密码</li> <li> <input type="password" id="lr_a4" name="lr_a4" /> </li> <li> <input type="radio" id="promotecode">推广码（可不填） </li> <input id="tuiguang" type="text" class="ipt" name="frm" style="display:none"> <li>请输入验证码</li> <li> <input type="text" class="auth" name ="authCode"><img title="看不清？点击更换" class="vdimgck" src="/member/authCode_ex.php" alt=""> </li> <li> <input checked="checked" value="1" type="checkbox" id="know" name="sd">我已阅读并接受 </li> <li> <a href="http://www.xishiqutest.com/html/agreement_all.html" class="orange" target="_blank">《西十区用户服务协议》</a> </li> <div class="blank20"></div> <li> <input id="xsq_lr" type="submit" value="注 册"> </li> </ul> </form> </div> </div> </div> <div> </div>';
		//remove the #xsq_dialog div if exsited
		//before inserting the new div to the body node 
		if($('#xsq_dialog')){
			$('#xsq_dialog').remove();
		}
		$("body").append(html);
		//activate the 1st panel [login] 
		$( '#tabs' ).tabs({active:0});

		$('#xsq_dialog').dialog(option);	

		//bind a click event for the promocode
		$('#promotecode').click(function(){
			if($(this)[0].checked){
				$('#tuiguang').show();
			}
		});
		//bind a refresh click event for the authcode img [click for refreshing]
		$('img.vdimgck').click(function(){
			this.src += '?';
		});

		//form 1
		//3=> 侧边提示(会在当前元素的siblings对象中查找显示提示信息的对象，表单以ajax提交时会弹出自定义提示框显示表单提交状态)；
		var form1 = $("#form2").Validform({
			btnSubmit:"#xsq_lg",
			tiptype:3,
			postonce:true,
			ajaxPost:true,
			datatype:{
				"s4":function(gets,obj,curform,regxp){
					if(gets.length!=4){
						return "验证码必须为4位";
					}
				}
			},
			beforeSubmit:function(curform){
				// window.qbh = curform;
				curform[0][1].value = window.location.href;
				// console.log(curform);
			},
			callback:function(data){
				$.Hidemsg();
				var type = data.status;
				if(type == "y"){
					window.location.reload();
				}
				else{
					$.Showmsg(data.info);
				}
			}
		});
		form1.addRule([
		    {
		        ele:"#lg_a1",
		        datatype:"m|e,max32",
		        nullmsg:"请输入用户名！"
		    },
		    {
		        ele:"#lg_a2",
		        datatype:"*6-20",
		        nullmsg:"请输入密码！",
		        errormsg:"密码至少6个字符,最多20个字符！"
		    },
		    {
		    	ele:".auth",
		    	datatype:"s4",
		    	ajaxurl:"/member/checkUser.php",
		    	nullmsg:"请输入验证码！"
		    }
		]);

		//form 2
		var form2 =$("#form1").Validform(
			{
				btnSubmit:"#xsq_lr",
				tiptype:3,
				postonce:true,
				ajaxPost:true,
				datatype:{
					"max32":function(gets,obj,curform,regxp){
						if(gets.length>32){
							return "用户名不能超过32位";
						}
					},
					"s4":function(gets,obj,curform,regxp){
						if(gets.length!=4){
							return "验证码必须为4位";
						}
					}
				},
				usePlugin:{
					passwordstrength:{
						minLen:6,
						maxLen:20
					}
				},
				beforeSubmit:function(curform){
					window.qbh = curform;
					curform[0][0].value = window.location.href;
					console.log(curform);
				},
				callback:function(data){
					$.Hidemsg();
					var type = data.status;				
					if(type == "y"){
						window.location.reload();
					}
					else{
						$.Showmsg(data.info);
					}
					console.log("info" + data.info);
					console.log("status" + data.status);
				}
			}
		);
		form2.addRule([
			{
				ele:"#lr_a2",
				datatype:"m|e",
				ajaxurl:"/member/checkUser.php",
				nullmsg:"请您填写邮件地址或手机号码!",
				errormsg:"请输入有效的email地址或手机号码!"
			},
			{
				ele:"#lr_a3",
				datatype:"*6-20",
				plugin:"passwordStrength",
				nullmsg:"密码不能为空"
			},
			{
				ele:"#lr_a4",
				datatype:"*",
				nullmsg:"确认密码不能为空。",
				errormsg:"您两次输入的账号密码不一致!",
				recheck:"lr_a3"
			},
		    {
		    	ele:".auth",
		    	datatype:"s4",
		    	ajaxurl:"/member/checkUser.php",
		    	nullmsg:"请输入验证码！"
		    }
		]);	

	};

	/**
	 * [_xsq_normal description]
	 * @param  [string] content [description] the inner content of the msgbox
	 * call the normal xsq message box 
	 */
	var _xsq_normal = function(content,option){
		var content = (arguments[0]  === undefined) ? ' <div><p>default content of the normal message box! </p><p style="text-align:right;">Alex Q</p></div>':content;
		var option = (arguments[1] === undefined)?_options['normal']:arguments[1];

		// if(content == 'undefined'){
		// 	content = '<div>adfasfasdf</div>';
		// }
		var html = '<div id="xsq_dialog">'+content +'</div>';
		//remove the #xsq_dialog div before inserting
		//if exsited
		if($('#xsq_dialog')){
			$('#xsq_dialog').remove();
		}
		$('body').append(html);
		$('#xsq_dialog').dialog(option);
	};
	/**
	 * [xsq_msg_box description]
	 * @param  {[type]} content [description] message box
	 * @return {[type]}         [description]
	 */
	var xsq_msg_box = function(content){
		$.Tipmsg.tit =  "西十区提示";
		$.Showmsg(content);
	};

	/**
	 * [getOptions description]
	 * mode = 0		=>	"login_register"
	 * @return [object] _options["login_register"] [description] 
	 * mode = 1     =>	"normal"                        
	 * @return [object] _options["normal"] [description]
	 * 
	 * e.g. 	xsq_dialog.get_options(mode) | mode =1 | mode =0 |mode not specified == mode =0
	 */
	var get_options = function(){
		//default mode is 0 => login_register dialog
		var mode = 0;
		if(arguments.length){
			mode = (typeof(arguments[0])==='number') ? arguments[0]: parseInt(arguments[0]);
		}
		switch(mode){
			case 0:
				return _options["login_register"];
				break;
			case 1:
				return _options["normal"];
				break;
			default:
				break;
		}
	};

	return {		
		init : init,
		msg_box : xsq_msg_box,
		get_options : get_options
		// _options : _options,
		// _xsq_login_register : _xsq_login_register,
		// _xsq_normal : _xsq_normal
	};
})(jQuery);

//END of [xsq_dialog]



