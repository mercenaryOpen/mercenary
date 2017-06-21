function jsDateDiff(publishTime) {
    publishTime = new Date(publishTime).getTime() / 1000;
    var d_minutes, d_hours, d_days;
    var timeNow = parseInt(new Date().getTime() / 1000);
    var d;
    d = timeNow - publishTime;
    d_days = parseInt(d / 86400);
    d_hours = parseInt(d / 3600);
    d_minutes = parseInt(d / 60);
    if (d_days > 0 && d_days < 4) {
        return d_days + "天前";
    } else if (d_days <= 0 && d_hours > 0) {
        return d_hours + "小时前";
    } else if (d_hours <= 0 && d_minutes > 0) {
        return d_minutes + "分钟前";
    } else {
        var s = new Date(publishTime * 1000);
        // s.getFullYear()+"年";
        return (s.getMonth() + 1) + "月" + s.getDate() + "日";
    }
}

function fnCloseWin() {
    api.closeWin();
}

function fnOpenTermsWin() {
    var url = "";
    var name = "";
    api.openWin({
        name: 'terms',
        url: '../terms.html',
        pageParam: {
            name: 'terms',
            url: url,
        }
    });
}

function fnOpenDialogBoxWebView() {
    var dialogBox = api.require('dialogBox');
    dialogBox.webView({
        // 点击遮罩层是否关闭弹窗
        tapClose: true,
        // 加载的页面地址 支持http和widget
        path: 'http://www.mercenary.com.cn',
        // 文本框的可配置文本
        texts: {
            // 上方标题
            title: '服务协议',
            // 左边按钮文字
            leftBtnTitle: '我同意',
            // 右边按钮文字
            rightBtnTitle: '我不同意',
        },
        // input 对话框样式配置
        styles: {
            // 对话框整体背景配置 支持 rgb和img
            bg: '#fff',

            corner: 2,
            w: 300,
            h: 280,
            title: {
                h: 44,
                size: 14,
                color: '#000'
            },
            upDividingLine: {
                width: 0.5,
                color: '#696969',
            },
            webView: {
                h: 192,
                bg: '#fff',
            },
            downDividingLine: {
                width: 0.5,
                color: '#696969',
            },
            left: {
                bg: 'rgba(0,0,0,0)',
                color: '#007FFF',
                size: 12,
            },
            right: {
                bg: 'rgba(0,0,0,0)',
                color: '#007FFF',
                size: 12,
            }
        }
    }, function(ret) {

        api.alert({
            msg: JSON.stringify(ret)
        });

        // 点击左边的按钮
        if (ret.eventType == 'left') {
            var dialogBox = api.require('dialogBox');
            dialogBox.close({
                dialogName: 'webView'
            });
        }
        // 点击右边的按钮
        if (ret.eventType == 'right') {
            var dialogBox = api.require('dialogBox');
            dialogBox.close({
                dialogName: 'webView'
            });
        }
    });
}

function fnPersonalCenter() {
    var personalCenter = api.require('personalCenter');

    var btnArray = [{
        // 按钮背景图片
        'bgImg': 'widget://res/personalCenter/personal_btn_nor.png',
        // 按钮点击的图片
        'selectedImg': 'widget://res/personalCenter/personal_btn_sele.png',
        // 选中时按钮的图片
        'lightImg': 'widget://res/personalCenter/personal_btn_light.png',
        // 按钮标题
        'title': '钱包',
        // 按钮上的数据
        'count': '0.00',
        // titleColor:              //（可选项）字符串类型；按钮上的标题颜色，支持 rgb、rgba、#；默认：#AAAAAA
        // titleLightColor:         //（可选项）字符串类型；按钮选中标题的颜色，支持 rgb、rgba、#；默认：#A4D3EE
        // countColor:              //（可选项）字符串类型；按钮上数字颜色，支持 rgb、rgba、#；默认：#FFFFFF
        // countLightColor:         //（可选项）字符串类型；按钮上数字选中颜色，支持 rgb、rgba、#；默认：#A4D3EE
    }, {
        'bgImg': 'widget://res/personalCenter/personal_btn_nor.png',
        'selectedImg': 'widget://res/personalCenter/personal_btn_sele.png',
        'lightImg': 'widget://res/personalCenter/personal_btn_light.png',
        'title': '优惠券',
        'count': '5 张'
    }, {
        'bgImg': 'widget://res/personalCenter/personal_btn_nor.png',
        'selectedImg': 'widget://res/personalCenter/personal_btn_sele.png',
        'lightImg': 'widget://res/personalCenter/personal_btn_light.png',
        'title': '信用',
        'count': '100'
    }];

    var count = 382;

    var y = 44;

    personalCenter.open({
        // 个人中心视图上边距屏幕位置 默认0
        'y': y,
        // 视图的高度 默认220 不能小于220
        'h': 220,
        // 头像图片的路径  图片会被缓存到本地
        'imgPath': 'widget://res/personalCenter/d7d1d308fe165b984c09728e7118e9f1.jpg',
        // 头像占位图片的路径
        'placeholderImg': 'widget://res/personalCenter/profile_default.png',
        // 用户名
        'userName': 'APICloud',
        // 用户名字体大小 默认值：13
        'userNameSize': 13,
        //  用户名和积分的字体颜色 默认 #FFFFFF
        'userColor': '#FFFFFF',
        'count': count,
        // 头像按钮参数  若不传则不显示修改按钮
        'modButton': {
            'bgImg': 'widget://res/personalCenter/mod_normal.png',
            'lightImg': 'widget://res/personalCenter/mod_click.png'
        },

        // 下边按钮的参数信息
        'btnArray': btnArray,
    }, function(ret, err) {
        /* 头像修改按钮. */
        if (btnArray.length === ret.click) {
            fnGetPicture();
        };
    })
};


// 自带拍照  但是拍照 选图只能二选一
function fnGetPicture() {
    api.confirm({
        title: '提示',
        msg: '您想从哪里获取图片',
        buttons: ['相机', '图库', '取消'],
    }, function(ret, err) {
        if (3 == ret.buttonIndex) {
            return;
        }

        var sourceType = 'album';

        if (1 == ret.buttonIndex) {
            sourceType = 'camera';
        }

        api.getPicture({
            sourceType: sourceType,
            encodingType: 'jpg',
            mediaValue: 'pic',
        }, function(ret, err) {
            if (ret) {
                console.log(JSON.stringify(ret));
            } else {
                console.log(JSON.stringify(err));
            }
        });
    });
}


function fnVueInitItems() {
    var maincontent = new Vue({
        el: '#maincontent',
        created() {
            this.findItems = [{
                username: "祁缘"
            }, {
                username: "祁缘11"
            }, ]
        },
        data: {
            findItems: [],
            pageSize: 10,
            page: 1
        },
        methods: {
            fnAjaxFind: function() {
                var tempArray = [{
                    username: "祁缘",
                }, {
                    username: "祁缘11",
                }, {
                    username: "祁缘1111",
                }, {
                    username: "祁缘111111",
                }, {
                    username: "祁缘11111111",
                }, ];

                for (var i = 0; i < tempArray.length; i++) {
                    this.findItems.push(tempArray[i]);
                }

            },
            fnOpenGrabSingleWin: function(type) {
                var winName = 'grabSingle_' + type;
                api.openWin({
                    name: winName,
                    url: winName + '.html',
                    pageParam: {
                        name: 'test'
                    }
                });
            },
        },

    });
    return maincontent
}

// 下拉刷新
function fnDropDownRefresh(maincontent) {
    api.setRefreshHeaderInfo({
        // 设置是否可见
        visible: true,
        // 上拉刷新时的图片地址
        loadingImg: 'widget://image/loading_more.png',
        // 背景颜色
        bgColor: '#ccc',
        // 文本颜色
        textColor: '#fff',
        // 下拉文字描述
        textDown: '下拉刷新...',
        textUp: '松开刷新...',
        // 是否显示更新时间
        showTime: true,
    }, function(ret, err) {
        //在这里从服务器加载数据，加载完成后调用api.refreshHeaderLoadDone()方法恢复组件到默认状态
        maincontent.fnAjaxFind();
        api.refreshHeaderLoadDone();
    });
}

//上拉加载 (自己监听页面是否达到底部)
function fnPullUpRoad(maincontent) {
    api.addEventListener({
        name: 'scrolltobottom',
        extra: {
            threshold: 0 //设置距离底部多少距离时触发，默认值为0，数字类型
        }
    }, function(ret, err) {
        maincontent.fnAjaxFind();
    });
}
