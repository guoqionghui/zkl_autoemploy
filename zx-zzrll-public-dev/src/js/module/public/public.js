/*入职审批状态*/
var aprovalState=[
  		{value:"",text:"请选择"},
        {value:"AI",text:"审批中"},
        {value:"AB",text:"返回申请人"},
        {value:"AN",text:"审批不通过"},
        {value:"AY",text:"审批完成待缴费"},
        {value:"PY",text:"审批完成已缴费"}
];
var aprovalState1=[
		{value:"",text:"请选择"},
        {value:"AU",text:"待审批"}
];


/*离职审批状态*/
var aprovalState2=[
		{value:"",text:"请选择"},
        {value:"LB",text:"审批中"},
        {value:"LC",text:"返回发起人"},
        {value:"LD",text:"审批不通过"},
        {value:"LF",text:"审批完成待销号"},
        {value:"LG",text:"已销号"}
];
var aprovalState3=[
		{value:"",text:"请选择"},
        {value:"LA",text:"待审批"}
];
/*开发银行类型*/
// var accountBankName=[
// 		{type:"0100",text:"工商银行"},{type:"0400",text:"农业银行"},{type:"0200",text:"中国银行"},
// 		{type:"0300",text:"建设银行"},{type:"0600",text:"招商银行"},{type:"1400",text:"广发银行"},
// 		{type:"28",text:"广州银行"},{type:"1100",text:"光大银行"},{type:"05",text:"北京银行"},
// 		{type:"0900",text:"浦发银行"},{type:"0700",text:"民生银行"},{type:"1500",text:"中信银行"},
// 		{type:"1000",text:"交通银行"},{type:"08",text:"华夏银行"},{type:"2500",text:"平安银行"},
// 		{type:"2200",text:"邮储银行"},{type:"1900",text:"兴业银行"}
// ];
//银行卡的类型："借记卡","存折","储蓄卡","银行卡"
var bankCardKind=[
		{type:"01",text:"借记卡"},
		{type:"02",text:"存折"},
		{type:"03",text:"储蓄卡"},
		{type:"04",text:"银行卡"},
];
/*公共证件类型*/
var IDKinds=[
		{PROCFLG01 :"1",text:"身份证"},
//		{PROCFLG01 :"2",text:"中国护照"},
	 	{PROCFLG01 :"3",text:"军官证"},
	 	{PROCFLG01 :"4",text:"港澳回乡证"},
	 	{PROCFLG01 :"5",text:"其他"},
//	 	{PROCFLG01 :"6",text:"出生证"},
//	 	{PROCFLG01 :"7",text:"户口本"},
//	 	{PROCFLG01 :"8",text:"士兵证"},
	 	{PROCFLG01 :"9",text:"台胞证"}, 
	 	{PROCFLG01 :"A",text:"外国人永久居留身份证"},
	 
];
/*公共证件类型结束*/
/*身份证地区数组开始*/
   var aCity = {11: "北京",12: "天津",13: "河北",14: "山西",15: "内蒙古",21: "辽宁",22: "吉林",23: "黑龙江",31: "上海",32: "江苏",
      	33: "浙江",34: "安徽",35: "福建",36: "江西",37: "山东",41: "河南",42: "湖北",43: "湖南",44: "广东",45: "广西",46: "海南",
      	50: "重庆",51: "四川",52: "贵州",53: "云南",54: "西藏",61: "陕西",62: "甘肃",63: "青海",64: "宁夏",65: "新疆",71: "台湾",
      	81: "香港",82: "澳门",91: "国外"
 }
/*身份证地区数组结束*/
/*申请职级开始*/
var jobData=[
		      {value: '0',text: '寿险顾问'}, 
		      {value: '1',text: '业务主任'},
		      {value: '2',text: '业务经理'}, 
		      {value: '3',text: '资深业务经理'},
		      {value: '4',text: '业务总监'}			
					
];
/*申请职级结束*/
/*您所属办公室职场开始*/
var apt1=[
                {value:"0",text:"分公司0"},
                {value:"1",text:"分公司1"},
];
var apt2=[
                {value:"0",text:"中支0"},
                {value:"1",text:"中支1"},
];
var apt3=[
            {value:"0",text:"营销服务部门0"},
            {value:"1",text:"营销服务部门1"},
];
/*您所属办公室职场结束*/
/*银行名称结束*/
function removesessionStorage() {
	sessionStorage.clear();
}
