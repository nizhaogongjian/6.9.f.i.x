$(document).ready(function(){
	MoPopup.init();
	MoSearch.init();
	MoTab.init();
	MoNav.init();
	MoNumber.init();
	if($('.fn-expand').length)
		$('.fn-expand').click(function(){
			var box = $(this).attr('expand-box'), css = $(this).attr('expand-class'), des = $(this).attr('expand-desc'), html = $(this).html();
			des = des && des.split('|') || ['Xem thĂªm','RĂºt gá»n'];
			if($('#'+box).hasClass(css)){
				$('#'+box).removeClass(css);
				$(this).html(html.replace(des[0],des[1]).replace('icon-dropdown','icon-rutgon'));
			} else {
				$('#'+box).addClass(css);
				$(this).html(html.replace(des[1],des[0]).replace('icon-rutgon','icon-dropdown'));
			}
			return false;
		});
	if($('.fn-tab').length)
		$('.fn-tab').click(function(){
			var box = $(this).attr('tab-content');
			box = box.split(',');
			$('#'+box[0]).removeClass('none');
			for(var i=1; i<box.length; i++) $('#'+box[i]).addClass('none');
			return false;
		});
	var con = $('.fn-autoload');
	if(con.length){
		con.each(function(){
			new MoAutoLoad($(this));
		});
	}
	var sel =$('.fn-select-link');
	if(sel.length>0)
		sel.on('change', function(e){
			location.href= $(this).val();
			return false;
		});
	ZMEInfo.renderZMEAvatar();
	$('.fnDesktopSwitch').on('click', function(){
		setCookie('IS_MOBILE', 0, 7);
	});
	MoFeedBack.init();
	if(!getCookie('__mp3sessid')) {
		setCookie('__mp3sessid', getUid(), {
			expires: 0,
			domain: '.mp3.zing.vn'
		});
	}
});
if(!mconsole){
	var mconsole = {
		log:function(data){
			if($('#debug').length<1) $('body').append('<div id="debug"></div>');
			$('#debug').removeClass('none').append(' '+data);
		},
		clear:function(){
			$('#debug').html('');
		}
	}
}
MoNav = {
	init:function(){
		var _this = this;
		$('.fn-body-mask').on('click',function(){
			_this.show()
			return false;
		});
		$('.fn-nav-show').on('click',function(){
			_this.show();
			MoSearch.close();
			return false;
		});
	},
	show:function(){
		var nav =  $('#fnNav');
		if(nav.hasClass('none')){
			nav.removeClass('none');
			$('#fnWrapper').addClass('slideshowing').css('height',$('#fnNav').height()+'px');
		} else {
			this.hide();
		}
		return this;
	},
	hide:function(){
		$('#fnNav').addClass('none');
		$('#fnWrapper').removeClass('slideshowing').css('height','auto');
	}
};
var ZMEInfo = {
	uid:[],
	elId:[],
	aSize:[],
	listId:[],
	listUname:[],
	renderZMEAvatar:function(){
		var k = document.getElementsByTagName('i');
		var time = new Date();
		time = time.getTime();
		for (var i=0; i<k.length; i++){
			var el =$(k[i]);
			if(el.hasClass('fn-zme-info')){
				var elId = el.attr('id')?el.attr('id'):'ZMEA'+time+'_'+i;
				var aSize = el.attr('zme-avatar-size')?el.attr('zme-avatar-size'):50;
				el.attr('id', elId);
				if(el.attr('zme-uname')) this.listUname.push(el.attr('zme-uname')+'?'+elId);
				else this.listId.push(el.attr('zme-uid')+'?'+elId);
				this.aSize.push(aSize);
			}
		}
		var ava_list_id = '';
		var ava_list = '';
		if(this.listId.length){
			ava_list_id = this.listId.join('|,');
			this.listId = [];
		}
		if(this.listUname.length){
			ava_list = this.listUname.join('|,');
			this.listUname = [];
		}
		if(ava_list_id.length || ava_list.length){
			var url = 'http://widget.me.zing.vn/api/widget?method=getMixEx&size=50&ava_list='+ava_list+'&displaylist=&displaylist_ex=&ava_list_id='+ava_list_id;
			var script = document.createElement("script");
			script.setAttribute("src",url);
			script.setAttribute("type", "text/javascript");
			script.setAttribute("charset", "utf-8");
			var body_element = document.getElementsByTagName("body");
			body_element[0].appendChild(script);
		}
	},
	formatDateTime: function(t) {
		var e = [[11, 'sĂ¡ng'], [14, 'trÆ°a'], [19, 'chiá»u']],
		f = ['Chá»§ Nháº­t', 'Thá»© Hai', 'Thá»© Ba', 'Thá»© TÆ°', 'Thá»© NÄƒm', 'Thá»© SĂ¡u', 'Thá»© Báº£y'],
		g = new Date(),
		j = new Date(t * 1000),
		d = Math.floor(g.getTime() / 1000) - t;
		if (d < 60) return (d < 0 ? 0 : d).toString() + ' giĂ¢y trÆ°á»›c';
		if ( d < 3600) return Math.floor(d / 60) + ' phĂºt trÆ°á»›c';
		if (d < 43200) return Math.floor(d / 3600) + ' tiáº¿ng trÆ°á»›c';
		var h = j.getHours(),
		m = this.fill2(j.getMinutes());
		if (d < 518400) {
			var b = 'tá»‘i';
			for (var i = 0; i < 3; i++)
				if (h < e[i][0]) {
					b = e[i][1];
					break
				}
			d = (g.getDay() + 7 - j.getDay()) % 7;
			var k = '';
			if (d == 0)
				k = 'hĂ´m nay';
			else if (d == 1)
				k = 'hĂ´m qua';
			else k = f[j.getDay()];
			return (h % 12).toString() + ':' + m + ' ' + b + ' ' + k;
		}
		h = this.fill2(h);
		return h + ':' + m + ' ' + this.fill2(j.getDate()) + '/' + this.fill2(j.getMonth()+1) + '/' + j.getFullYear();
	},
	fill2: function(value) {
		return value < 10 ? ('0' + value) : value;
	}
};
function fA(id,val,uname,dname){
	var el = $('#'+id);
	if(el.length){
		var img = $('#'+el.attr('zme-avatar'));
		var link = $('#'+el.attr('zme-link'));
		var eD = $('#'+el.attr('zme-dname'));
		var zme = 'http://me.zing.vn/';
		if(img.length){
			if(img[0].tagName=='IMG') img.attr('src',val);
		}
		if(link.length){
			if(link[0].tagName=='A') link.attr('href',zme+uname);
		}
		if(eD.length){
			eD.html(dname)
			if(eD[0].tagName=='A') eD.attr('href',zme+uname);
		}
		el.remove();
	}

}
var MoAutoLoad = function(con){
	if(con.attr('id')) this.conId = con.attr('id');
	else {
		var d = new Date();
		this.conId = 'fnAutoLoad'+ d.getMilliseconds();
		con.attr('id', this.conId);
	}
	this.src = con.attr('autoload-src');
	this.last = con.children().length;
	if(con.attr('autoload-loading')) this.loadingId = con.attr('autoload-loading');
	this.triggerHdl().trigger();
}
MoAutoLoad.prototype = {
	src:'',
	conId:'conId',
	loadingId:'loading',
	last:0,
	bz:false,
	full:false,
	load:function(cb){
		if(!this.bz){
			var _this = this;
			this.bz = true;
			$('#'+_this.loadingId).removeClass('none');
			$.getJSON(this.src+'&offset='+this.last, function(data, status, xhr){
				if(status=='success'){
					_this.last+=data.items;
					$('#'+_this.conId).append(data.html);
					$('.fn-formattime').each(function(){
						var val = $(this).html();
						var regEx = /\d+/;
						var match = regEx.exec(val);
						if(match){
							val = val.replace(match[0], ZMEInfo.formatDateTime(match[0]));
							$(this).html(val);
							$(this).removeClass('fn-formattime');
						}
					});
					MoNumber.init();
					ZMEInfo.renderZMEAvatar();
					_this.full = _this.last>=data.total;
					$.isFunction(cb) && cb();
				}
				_this.bz = false;
				$('#'+_this.loadingId).addClass('none');
			});
		}
		return this;
	},
	triggerHdl:function(){
		var offset = $('#'+this.conId).offset();
		if(!offset.height) offset.height = 0;
		if(window.pageYOffset + window.innerHeight > offset.height + offset.top - 500){
			this.load();
		}
		return this;
	},
	trigger:function(){
		var _this = this;
		$(window).on('scroll',function(){
			if(!_this.full &&!$('#'+_this.conId).hasClass('none')) _this.triggerHdl();
		});
		return this;
	}
};

var MoNumber = {
	init:function(){
		this.format();
	},
	format:function(){
		var _this = this;
		if($('.fn-number').length){
			$('.fn-number').each(function(){
				$(this).html(_this.addCommas($(this).html())).removeClass('fn-number');
			});
		}
	},
	addCommas:function(nStr) {
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	},
	getRaw:function(num){
		return num.replace(',','');
	}
};
var MoTab = {
	init:function(){
		if($('.fn-tab').length>0) {
			$('.fn-tab').on('click',function(){
				$('.fn-tab').removeClass('active');
				var box = $(this).addClass('active').attr('tab-content');
				box = box.split(',');
				$('#'+box[0]).removeClass('none');
				for(var i=1; i<box.length; i++) $('#'+box[i]).addClass('none');
				return false;
			});
		}
	}
};

var MoLogin = {
	show:function(fn){
		if(!MO.ACCOUNT_NAME){
			var ret = encodeURI(location.href);
			location.href=MO.MO_URL+'/user/login?ret='+ret;
		}
		if($.isFunction(fn)) fn();
		return true;
	}
};
var MoSearch = {
	init:function(){
		var _this = this;
		$('#fnSearchReset').on('click',function(){
			$('#q').val('');
			$('#q')[0].focus();
			return false;
		});
		$('#fnSearchSubmit').on('click',function(){
			var k = $('#q').val();
			if(k.length>1) {
				_this.addHistory(k);
				$('#frmSearch').submit();
			}
			return false;
		});
		$('#frmSearch').on('submit',function(){
			var k = $('#q').val();
			if(k.length>1) {
				_this.addHistory(k);
				this.submit();
			}
			return false;
		});
		$('#q').on('keydown', function(e){
			var k = $('#q').val().trim();
			k+=String.fromCharCode(e.keyCode);
			if(k.length<3) {
				if(e.keyCode == 32){
					_this.getSuggest(k);
				} else {
					_this.getHistory(k);
				}
			} else {
				_this.getSuggest(k);
			}
		}).on('focus',function(){
			MoNav.hide();
			$('#fnPage').addClass('search-focused');
			$('#fnBody').addClass('none');
			$('#fnSuggestContainer').removeClass('none');
			$('#fnSearchReset').removeClass('none');
			if(MoDevice.isiOS()){
				$('header').css('position','fixed');
				window.scroll(0, 0);
			}
			//			$('#fnSuggestContainer').css('margin-top',0);
			_this.getHistory($('#q').val().trim());
			$(this).attr('placeholder','');
			this.focus();
			var k = $('#q').val().trim();
			if(k.length<3) {
				_this.getHistory(k);
			} else _this.getSuggest(k);

			return false;
		}).on('blur',function(){
			$(this).attr('placeholder','TĂ¬m kiáº¿m');
			$('#fnPage').removeClass('search-focused');
			return false;
		});
		$('#fnSuggestContainer').on('click',function(){
			_this.close();
		}).on('touchmove ',function(){
			$('#fnPage').removeClass('search-focused');
		});
		$('.fnSuggestClose').on('click',function(){
			_this.close();
			return false;
		});
		$('.fnSuggestClear').on('click',function(){
			localStorage.removeItem('mo.suggest');
			$('#fnSuggestHistory').html('').addClass('none');
			return false;
		});
	},
	close:function(){
		$('#fnSuggestContainer').addClass('none');
		$('#fnSuggest').addClass('none');
		$('#fnSuggestHistory').addClass('none');
		$('.fnSuggestClear').addClass('none');
		$('#fnSearchReset').addClass('none');
		$('#fnBody').removeClass('none');
	},
	getHistory:function(k){
		$('#fnSuggest').addClass('none');
		$('#fnSuggestHistory').addClass('none');
		var kHistory = localStorage.getItem('mo.suggest');
		var items='';
		if(kHistory){
			kHistory = kHistory.split('|');
			if(k){
				k = k.toLowerCase();
				for(var i=0; i<kHistory.length; i++){
					if(kHistory[i].trim().toLowerCase().search(k) !=-1) {
						items+='<li><a href="'+WEB_URL+'/'+encodeURI(kHistory[i])+'.tag/">'+kHistory[i].replace(/\+/g," ")+'</a></li>';
					}
				}
			} else {
				for(var i=0; i<kHistory.length; i++){
					items+='<li><a href="'+WEB_URL+'/'+encodeURI(kHistory[i])+'.tag/">'+kHistory[i].replace(/\+/g," ")+'</a></li>';
				}
			}
			if(items.length>10){
				$('#fnSuggestContainer').removeClass('none');
				$('#fnSuggestHistory').html('<ul>'+items+'</ul>').removeClass('none');
				$('.fnSuggestClear').removeClass('none');
			}
		}
	},
	addHistory:function(k){
		var kHistory = localStorage.getItem('mo.suggest');
		if(kHistory){
			kHistory = kHistory.split('|');
			var has = false;
			k = k.replace(/\s+/g,"+").replace(/\'/g, "'").replace(/\"/g, '"').toLowerCase();
			for(var i=0; i<kHistory.length; i++){
				if(k==kHistory[i].trim().replace(/\s+/g,"+").replace(/\'/g, "'").replace(/\"/g, '"').toLowerCase()) {
					has = true;
					break;
				}
			}
			if(!has) kHistory.push(k);
			kHistory = kHistory.join('|');
		} else {
			kHistory = k.replace(/\s+/g,"+").replace(/\'/g, "'").replace(/\"/g, '"').toLowerCase();
		}
		//					localStorage.removeItem('mo.suggest');
		localStorage.setItem('mo.suggest',kHistory);
	},
	getSuggest:function(k){
		var _this = this;
		$.getJSON(MO.MO_URL + "/suggest/search?term="+k, function(data, status, xhr){
			if(status=='success'){
				_this.buildSuggest(data);
			}
		});
	},
	buildSuggest:function(data){
		var length = 0, items='', k = $('#q').val().trim()
		var item = '', link = '';
		var regEx;
		if(data.artist && data.artist.list){
			regEx = /\s*\(\(.+\)\)/;
			for(var i=0; i < data.artist.list.length; i++){
				item = data.artist.list[i];
				item.name = item.name.replace(regEx,'');
				link = '/nghe-si/'+item.name.stripViet('-').replace(/--+/g,'-').trim('-');
				items+='<li><a href="'+link+'" class="icon-singer fn-highlight" highlight-word="'+k+'">'+item.name+'</a></li>';
				length++;
			}
		}
		if(data.song && data.song.list){
			regEx = /\s*\+.+/;
			for(var i=0; i < data.song.list.length; i++){
				item = data.song.list[i];
				//					item.name = item.name.replace(regEx,'');
				item.name = item.name.replace('+','-');
				link = '/bai-hat/'+item.name.stripViet('-').replace(/--+/g,'-').trim('-')+'-'+item.artist.replace(',',' ft ').stripViet('-').replace(/--+/g,'-').trim('-')+'/'+item.object_id+'.html';
				items+='<li><a href="'+link+'" class="icon-songs fn-highlight" highlight-word="'+k+'">'+item.name+'</a></li>';
				length++;
			}
		}
		if(data.album && data.album.list){
			for(var i=0; i < data.album.list.length; i++){
				item = data.album.list[i];
				item.name = item.name.replace('+','-');
				link = '/album/'+item.name.stripViet('-').replace(/--+/g,'-').trim('-')+'-'+item.artist.replace(',',' ft ').stripViet('-').replace(/--+/g,'-').trim('-')+'/'+item.object_id+'.html';
				items+='<li><a href="'+link+'" class="icon-album fn-highlight" highlight-word="'+k+'">'+item.name+'</a></li>';
				length++;
			}
		}
		if(data.video && data.video.list){
			for(var i=0; i < data.video.list.length; i++){
				item = data.video.list[i];
				item.name = item.name.replace('+','-');
				link = '/video-clip/'+item.name.stripViet('-').replace(/--+/g,'-').trim('-')+'-'+item.artist.replace(',',' ft ').stripViet('-').replace(/--+/g,'-').trim('-')+'/'+item.object_id+'.html';
				items+='<li><a href="'+link+'" class="icon-video fn-highlight" highlight-word="'+k+'">'+item.name+'</a></li>';
				length++;
			}
		}
		$('#fnSuggestHistory').addClass('none');
		$('#fnSuggest').html('<ul>'+items+'</ul>').removeClass('none');
		$('#fnSuggestContainer').removeClass('none');
		this.highlight();
	},
	highlight:function(){
		$('.fn-highlight').each(function(){
			var q = $(this).attr('highlight-word');
			var c = $(this).html();
			var qLen = q.length, cLength=c.length;
			if(qLen && cLength){
				var cNew = c.split(' ');
				var cSV = c.toLowerCase().stripViet().split(' ');
				var qSV = q.toLowerCase().stripViet().split(' ');
				var pos = -1;
				for(var i=0; i<cSV.length; i++){
					for(var j=0; j<cSV.length; j++){
						pos = cSV[j].indexOf(qSV[i]);
						if(pos>-1) cNew[j] = '<strong>'+cNew[j]+'</strong>';
					}
				}
				$(this).html(cNew.join(' '));
			}
			$(this).removeClass('fn-highlight');
		});
	}

};
var MoShare = {
	init:function(){
		if($('.fn-share').length) {
			$('.fn-share').on('click',function(e){
				$('#fnShareBox').removeClass('none');
				$('#fnWrapper').addClass('none');
				$('#fnPopup').removeClass('none');
				var o = $(this);
				$('#fnShareZingMe').attr('href', 'http://link.apps.zing.vn/share?u='+o.attr('share-url'));
				$('#fnShareFB').attr('href', 'https://www.facebook.com/sharer/sharer.php?u='+o.attr('share-url'));
				$('#fnShareGoogle').attr('href', 'https://plus.google.com/share?url='+o.attr('share-url'));
				return false;
			});
		}
	}
};
var MoLike =  {
	init:function(){
		var _this = this;
		this.stats();
		if($('a.fn-like').length){
			$('a.fn-like').on('click', function(){
				var o = $(this);
				MoLogin.show(function(){
					_this.getToken(function(){
						_this.stats(function(){
							_this.pushLike(o);
						});
					});
				});
				return false;
			});
		}
	},
	pushLike:function(tar){
		var _this = this;
		var url = '', uid = tar.attr('like-uid'), token = tar.attr('like-token'), key = tar.attr('like-key');
		var unlike = true;
		if(tar.attr('like-like')=='true' || tar.attr('like-like')==true) {
			url = 'http://like.mp3.zing.vn/unlike?uid='+uid+'&sid='+key+'&token='+token+'&callback=?';
		} else {
			unlike = false;
			url = 'http://like.mp3.zing.vn/like?uid='+uid+'&sid='+key+'&token='+token+'&callback=?';
		}
		$.getJSON(url,
			function(like) {
				if(typeof like === 'object' && !like.error) {
					if(unlike) {
						tar.removeClass('liked').attr('like-like',false);
						_this.changeLike(-1);
					} else {
						tar.addClass('liked').attr('like-like',true);
						_this.changeLike(1);
					}
				}
			}
			);
	},
	stats:function(fn){
		var o = $('#fnLikenum');
		$.getJSON('http://like.mp3.zing.vn/get?uid='+o.attr('like-uid')+'&sid='+o.attr('like-key')+'&token='+o.attr('like-token')+'&callback=?', function(data, status, xhr){
			if(status=='success'){
				o.html(MoNumber.addCommas(data.total));
				if(data.like) $('#fnLike').addClass('liked').attr('like-like',true);
				else $('#fnLike').attr('like-like',false);
				if($.isFunction(fn)) fn();
			}
		});
	},
	changeLike:function(num){
		var l = 1;
		try {
			l = parseInt(MoNumber.getRaw($('#fnLikenum').html()));
		} catch(e){}
		$('#fnLikenum').html(MoNumber.addCommas(l+num));
	},
	show:function(likes){
		$('#fnLikenum').html(MoNumber.addCommas(likes));
	},
	getLike:function(){
		if($('li.fn-likenum').length){
			$('li.fn-likenum').each(function(){
				var o = $(this);
				$.getJSON('http://like.mp3.zing.vn/get?uid='+o.attr('like-uid')+'&sid='+o.attr('like-key')+'&token='+o.attr('like-token')+'&callback=?', function(data, status, xhr){
					if(status=='success'){
						o.html(MoNumber.addCommas(data.total)).removeClass('fn-likenum');
					}
				});
			});
		}
	},
	getToken:function(fn){
		$.get(MP3.MP3_URL + '/ajax/like/token?id='+$('#fnLike').attr('like-oid')+'&callback=?',
			function (data) {
				if (!data.error) {
					$('#fnLikenum').attr("like-key",data.token).attr("like-key",data.key);
					$('#fnLike').attr("like-token",data.token).attr("like-key",data.key);
					if($.isFunction(fn)) fn();
				}
			});

	}

};
var MoFormat = {
	substr:function(s,l){
		if(s.length>l){
			s= s.substring(0,l);
			if(s.lastIndexOf(' ')!=-1) s = s.substring(0,s.lastIndexOf(' '));
			s+='...';
		}
		return s;
	}
};
var MoMsgBox = {
	show:function(msg, error, only){
		$('#fnMsgError').html(msg);
		MoPopup.show($('#fnMsgBox'), only);
	}
};
var MoDevice = {
	isiOS:function(){
		var iOS = false,
		iDevice = ['iPad', 'iPhone', 'iPod'];
		for ( var i = 0; i < iDevice.length ; i++ ) {
			if( navigator.platform === iDevice[i] ){
				iOS = true;
				break;
			}
		}
		return iOS;
	}
};
var MoPopup = {
	init:function(){
		$('.fnCloseBox').on('click', function(){
			var only = $(this).attr('close-only') || false;
			MoPopup.close($('#'+$(this).attr('close-box')), only);
			return false;
		});
	},
	close:function(box, only){
		box.addClass('none');
		if(!only){
			$('#fnWrapper').removeClass('none');
			$('#fnPopup').addClass('none');
		}
	},
	show:function(box, only){
		$('#fnWrapper').addClass('none');
		$('#fnPopup').removeClass('none');
		if(only){
			$('#fnPopup').children().addClass('none');
		}
		box.removeClass('none');
	}
};
var MoFeedBack = {
	init:function(){
		var _this = this;
		document.frmFb.link.value = location.href;
		document.frmFb.browser.value = navigator.userAgent;
		$('.fnFbShow').on('click', function(){
			MoPopup.show($('#fnFbBox'));
			return false;
		});
		$('#fnFbSubject').on('change',function(){
			var sel = this.options[this.selectedIndex];
			$('#fnFbSubjectLabel').html(sel.text);
		});
		$('.fnFbSubmit').on('click', function(){
			_this.post(document.frmFb);
			return false;
		});
	},
	post:function(frm) {
		if(frm.link.value.length<10) frm.link.value = location.href;
		if(!frm.subject.value) {
			this.showMsg('Vui lĂ²ng chá»n loáº¡i pháº£n há»“i');
			frm.subject.focus();
		} else if(frm.content.value.length<10) {
			this.showMsg('Ná»™i dung pháº£n há»“i cáº§n Ă­t nháº¥t 10 kĂ½ tá»±');
			frm.content.focus();
		} else {
			$.post($(frm).attr('action'), $(frm).serialize(),
				function(data) {
					if(data.msg){
						MoFeedBack.showMsg(data.msg);
					}
				},'json');
		}
	},
	showMsg:function(msg, error){
		MoMsgBox.show(msg);
	}
};
function getUid() {
	return 'xxxxxxxxxxxx'.replace(/[x]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	}).toUpperCase();
}