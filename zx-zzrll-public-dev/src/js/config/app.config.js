var app = {
    contentID :'global-content',
    modalContentID: 'global-popups',
    requestData:{},//用来保存之前旧版本通过地址栏直接发送的数据
    basePath: GloConfig.basePath,
    removeEventNS:'.sino_curr_event',
    route:{
       'default':'zx_register',////如果lacation.hash为空 默认加载的页面
	  'zx_register':{
            title:'登录页面',
            hideHeadTitle:'1',
          	 noMenubar:'1',
            html:'html/module/main/zx_Register.html',
            js:['js/module/public/mui.picker.js',
            'js/module/public/mui.poppicker.js',
            'js/module/main/zx_Register.js']
        },
        'zx_job_application':{
            title:'上岗申请页面',
            hideHeadTitle:'1',
          	//noMenubar:'1',
            html:'html/module/main/zx_Job-application.html',
            js:['js/module/main/zx_Job-application.js']
        },
          'zx_job_applicationios':{
            title:'上岗申请页面',
            hideHeadTitle:'1',
          	//noMenubar:'1',
            html:'html/module/main/zx_Job-applicationios.html',
            js:['js/module/main/zx_Job-applicationios.js','js/module/public/exif.js']
        },
         'zx_quitappylecode':{
            title:'离职申请页面',
            hideHeadTitle:'1',
          	//noMenubar:'1',
            html:'html/module/LeaveOffice/zx_QuitappyleCode.html',
            js:['js/module/LeaveOffice/zx_QuitappyleCode.js']
        },
         'zx_submitinfo':{
            title:'离职提交申请页面',
            hideHeadTitle:'1',
          	//noMenubar:'1',
            html:'html/module/LeaveOffice/zx_SubmitQuitappyle.html',
          	js:[
          	'js/module/LeaveOffice/mui.min.js',
            'js/module/LeaveOffice/mui.zoom.js',
            'js/module/LeaveOffice/mui.previewimage.js',
          	'js/module/LeaveOffice/zx_SubmitQuitappyle.js',
          	'js/module/main/signature_pad.js']
        },
         'zx_submitinfoaz':{
            title:'离职提交申请页面',
            hideHeadTitle:'1',
          	//noMenubar:'1',
            html:'html/module/LeaveOffice/zx_SubmitQuitappyle_az.html',
          	js:['js/module/LeaveOffice/zx_SubmitQuitappyle_az.js','js/module/main/signature_pad.js']
        },
         'zx_approvePay':{
            title:'审批缴费页面',
            hideHeadTitle:'1',
          	//noMenubar:'1',
            html:'html/module/main/zx_ApprovePay.html',
          	js:['js/module/main/zx_ApprovePay.js']
        },
        'zx_bankAlipay':{
            title:'银行卡支付页面',
            hideHeadTitle:'1',
          	//noMenubar:'1',
            html:'html/module/main/zx_Bankalipay.html',
          	js:[
          	  'js/module/main/city.data-3.js',
	            'js/module/muiJs/mui.min.js',
	            'js/module/public/mui.picker.js',
	            'js/module/public/mui.poppicker.js',
	             'js/module/public/mui.dtpicker.js',
          		'js/module/main/zx_Bankalipay.js']
        },
        'zx_leaveBossAudit':{
            title:'离职申请最高主管审批',
            hideHeadTitle:'1',
          	 //noMenubar:'1',
            html:'html/module/LeaveOffice/zx_leaveBossAudit.html',
            js:['js/module/muiJs/mui.min.js',
            'js/module/LeaveOffice/mui.zoom.js',
            'js/module/LeaveOffice/mui.previewimage.js',
            'js/module/LeaveOffice/zx_leaveBossAudit.js',
            ]
        },
         'zx_commonAudit':{
            title:'普通外勤审批',
            hideHeadTitle:'1',
          	 //noMenubar:'1',
            html:'html/module/main/zx_commonAudit.html',
            js:['js/module/muiJs/mui.min.js','js/module/main/zx_commonAudit.js']
        },
          'zx_commonAudittow':{
            title:'普通外勤审批',
            hideHeadTitle:'1',
          	 //noMenubar:'1',
            html:'html/module/main/zx_commonAudit_tow.html',
           js:['js/module/muiJs/mui.min.js','js/module/main/zx_commonAudittow.js']
        },
        'zx_inforRegister':{
            title:'信息录入',
            hideHeadTitle:'1',
          	 //noMenubar:'1',
            html:'html/module/main/zx_inforRegister.html',
            js:[
           'js/module/main/city.data-3.js',
            'js/module/muiJs/mui.min.js',
            'js/module/public/mui.picker.js',
            'js/module/public/mui.poppicker.js',
             'js/module/public/mui.dtpicker.js',
            'js/module/main/zx_inforRegister.js'
            ]
        },
         'zx_manage':{
            title:'管理',
            hideHeadTitle:'1',
//        	noMenubar:'1',
            html:'html/module/main/zx_manage.html',
            js:[
            'js/module/main/zx_manage.js']
        },
        'zx_approval':{
            title:'审批',
            hideHeadTitle:'1',
//        	noMenubar:'1',
            html:'html/module/main/zx_approval.html',
            js:[
            'js/module/main/zx_approval.js']
        },
        'zx_approval_list':{
            title:'审批列表',
            hideHeadTitle:'1',
//        	noMenubar:'1',
            html:'html/module/main/zx_approval_list.html',
            js:[
            'js/module/public/mui.poppicker.js',
            'js/module/public/mui.picker.js',
            'js/module/public/mui.dtpicker.js',
            'js/module/main/zx_approval_list.js']
        },
           'zx_lzapproval_list':{
            title:'离职审批列表',
            hideHeadTitle:'1',
//        	noMenubar:'1',
            html:'html/module/LeaveOffice/zx_lzapproval_list.html',
            js:[
            'js/module/public/mui.poppicker.js',
            'js/module/public/mui.picker.js',
            'js/module/public/mui.dtpicker.js',
            'js/module/LeaveOffice/zx_lzapproval_list.js']
        },
        'zx_signInformation':{
            title:'资料签署',
            hideHeadTitle:'1',
//        	noMenubar:'1',
            html:'html/module/main/zx_signInformation.html',
            js:[
            'js/module/public/mui.poppicker.js',
            'js/module/public/mui.picker.js',
            'js/module/public/mui.dtpicker.js',
            'js/module/main/signature_pad.js',
            'js/module/main/zx_signInformation.js']
        },
        'zx_read-infoContentF':{
            title:'资料1',
            hideHeadTitle:'1',
//        	noMenubar:'1',
            html:'html/module/main/zx_read-infoContentF.html',
            js:[
            'js/module/main/zx_read-infoContentF.js'
            ]
        },
        'zx_read-infoContentS':{
            title:'资料2',
            hideHeadTitle:'1',
//        	noMenubar:'1',
            html:'html/module/main/zx_read-infoContentS.html',
            js:[
            'js/module/main/zx_read-infoContentS.js'
            ]
        },
        'zx_read-infoContentT':{
            title:'资料3',
            hideHeadTitle:'1',
//        	noMenubar:'1',
            html:'html/module/main/zx_read-infoContentT.html',
            js:[
            'js/module/main/zx_read-infoContentT.js'
            ]
        },
        'zx_agencyContract':{
            title:'代理合同',
            hideHeadTitle:'1',
//        	noMenubar:'1',
            html:'html/module/main/zx_agencyContract.html',
            js:[
            'js/module/main/zx_agencyContract.js',
            ]
        },
        'zx_lzapproval':{
            title:'离职审批状态',
            hideHeadTitle:'1',
//        	noMenubar:'1',
            html:'html/module/LeaveOffice/zx_lzapproval.html',
            js:[
            'js/module/LeaveOffice/zx_lzapproval.js',
            ]
        },
        'zx_demo':{
            title:'测试',
            hideHeadTitle:'1',
//        	noMenubar:'1',
            html:'html/module/main/zx_demo.html',
            js:[
                'js/module/main/zx_demo.js',
            ]
        },
//         'zx_demo2':{
//             title:'测试',
//             hideHeadTitle:'1',
// //          noMenubar:'1',
//             html:'html/module/main/zx_demo2.html',
//             js:[
//                 'js/module/main/zx_demo2.js',
//             ]
//         }
        
    },
    //全局的弹出框 只负责加载相关页面以及 js
    //通过 sino.modal.exec(id,fn)来调用 如果页面中不存在 则会进行加载 @see sino.modal.exec
    //show方法 执行顺序为 加载hmtl 加载js 执行fun 如果fun函数不存在 则加载后执行$('#id').show()
    modal:{

    }
};