import { Router } from '@angular/router';
import { TreeNode } from 'primeng/primeng';
import { Http } from '@angular/http';
import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class DoTreeService {
    imagePath: any;
    constructor(private http: Http, private router: Router, private zone: NgZone) { }

    getFiles(files) {
        return this.http.get(files)
            .toPromise()
            .then(res => <TreeNode[]>res.json().data);
    }

    treeNetWork = [
        {
            'label': '网络设施',
            'data': 'nw6',
            'styleClass': '',
        },
        {
            'label': '信息服务',
            'data': 'nw7',
            'styleClass': '',
        },
        {
            'label': '数字经济',
            'data': 'nw10',
            'styleClass': '',
        },
        {
            'label': '技术产业',
            'data': 'nw8',
            'styleClass': '',
        },
        {
            'label': '网络安全',
            'data': 'nw9',
            'styleClass': '',
        },
        {
            'label': '信息资源',
            'data': '#',
            'styleClass': 'disAbleLi',
        },
        {
            'label': '网络社会',
            'data': '#',
            'styleClass': 'disAbleLi',
        },
        {
            'label': '网络文化',
            'data': '#',
            'styleClass': 'disAbleLi',
        },
    ];
    treeNetWorkTwo = [
        {
            'label': '规划对标',
            'data': 'nw5',
            'styleClass': '',
        },
        {
            'label': '宽带中国',
            'data': 'nw2',
            'styleClass': '',
        },
        {
            'label': '提速降费',
            'data': 'nw4',
            'styleClass': '',
        },
        {
            'label': '互联网+',
            'data': 'nw3',
            'styleClass': '',
        },
    ];
    macroLibrarye = [
        {
            'label': '年度数据 ',
            'data': 'assets/images/data1.png',
            'styleClass': '',
        },
        {
            'label': '季度数据 ',
            'data': 'assets/images/data1.png',
            'styleClass': '',
        },
        {
            'label': '月度数据 ',
            'data': 'assets/images/data1.png',
            'styleClass': '',
        },
    ];
    regionLibrary = [
        {
            'label': '年度数据',
            'data': 'assets/images/data1.png',
            'styleClass': '',
        },
        {
            'label': '季度数据',
            'data': 'assets/images/data1.png',
            'styleClass': '',
        },
        {
            'label': '月度数据',
            'data': 'assets/images/data1.png',
            'styleClass': '',
        },
    ];
    industryLibrary = [
        {
            'label': '中国制造2025重点领域',
            'data': '#',
            'styleClass': '',
            'children': [{
                'label': '手机',
                'data': 'assets/images/data2.png',
                'styleClass': '',
            },
            {
                'label': '新一代信息技术-集成电路',
                'data': 'assets/images/data3.png',
                'styleClass': '',
            },
            {
                'label': '新能源汽车',
                'data': 'assets/images/data2.png',
                'styleClass': '',
            },
            {
                'label': '机器人',
                'data': 'assets/images/data2.png',
                'styleClass': '',
            },
            {
                'label': '农机装备',
                'data': 'assets/images/data4.png',
                'styleClass': '',
            },
            {
                'label': '电力设备',
                'data': 'assets/images/data2.png',
                'styleClass': '',
            },
            ],
        },
        {
            'label': '传统行业',
            'data': '#',
            'styleClass': '',
            'children': [{
                'label': '钢铁',
                'data': 'assets/images/data5.png',
                'styleClass': '',
            },
            {
                'label': '纺织',
                'data': 'assets/images/data2.png',
                'styleClass': '',
            },
            {
                'label': '医药',
                'data': 'assets/images/data2.png',
                'styleClass': '',
            },
            ],
        },
        {
            'label': '国民经济行业分类',
            'data': '#',
            'styleClass': '',
            'children': [{
                'label': '煤炭开采和洗选业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            },
            {
                'label': '石油和天然气开采业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '黑色金属矿采选业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '有色金属矿采选业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '非金属矿采选业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '开采辅助活动',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '其他采矿业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '农副食品加工业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '食品制造业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '酒、饮料和精制茶制造业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '烟草制品业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '纺织业',
                'data': '#',
                'styleClass': '',
            }, {
                'label': '纺织服装、服饰业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '皮革、毛皮、羽毛及其制品和制鞋业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '木材加工及木、竹、藤、棕、草制品业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '家具制造业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '造纸及纸制品业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '印刷和记录媒介复制业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '文教、工美、体育和娱乐用品制造业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '石油加工、炼焦及核燃料加工业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '化学原料及化学制品制造业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '医药制造业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '化学纤维制造业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '橡胶和塑料制品业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '非金属矿物制品业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '黑色金属冶炼及压延加工业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '有色金属冶炼及压延加工业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '金属制品业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '通用设备制造业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '专用设备制造业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '汽车制造业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '铁路、船舶、航空航天和其他运输设备制造业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '电气机械及器材制造业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '通信设备、计算机及其他电子设备制造业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '仪器仪表制造业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '其他制造业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '废弃资源综合利用业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '金属制品、机械和设备修理业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '电力、热力的生产和供应业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '燃气生产和供应业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }, {
                'label': '水的生产和供应业',
                'data': 'assets/images/data1.png',
                'styleClass': '',
            }],
        },
    ];
    enterpriseLibrary = [
        {
            'label': '企业工商信息',
            'data': 'assets/images/data6.png',
            'styleClass': '',
            'children': [],
        },
        {
            'label': '企业生产经营信息',
            'data': '#',
            'styleClass': '',
            'children': [{
                'label': '生产信息',
                'data': 'assets/images/data7.png',
                'styleClass': '',
            },
            {
                'label': '效益信息',
                'data': 'assets/images/data7.png',
                'styleClass': '',
            }],
        },
        {
            'label': '企业标签',
            'data': 'assets/images/data8.png',
            'styleClass': '',
            'children': [],
        },
    ];
    ParkLibrary = [
        {
            'label': '园区基本信息',
            'data': '#',
            'styleClass': '',
            'children': [{
                'label': '地理信息',
                'data': 'assets/images/data7.png',
                'styleClass': '',
            },
            {
                'label': '规划信息',
                'data': 'assets/images/data7.png',
                'styleClass': '',
            }, {
                'label': '七通一平信息',
                'data': 'assets/images/data7.png',
                'styleClass': '',
            }, {
                'label': '联系方式信息',
                'data': 'assets/images/data7.png',
                'styleClass': '',
            }],
        },
        {
            'label': '园区经济指标',
            'data': '#',
            'styleClass': '',
            'children': [{
                'label': '当期数据',
                'data': 'assets/images/data7.png',
                'styleClass': '',
            },
            {
                'label': '累计数据',
                'data': 'assets/images/data7.png',
                'styleClass': '',
            }],
        },
    ];
    internationaLibrary = [
        {
            'label': '世界',
            'data': 'assets/images/data8.png',
            'styleClass': '',
        },
        {
            'label': '中国',
            'data': 'assets/images/data8.png',
            'styleClass': '',
        },
    ];
    productLibrary = [
        {
            'label': '全国数据',
            'data': 'assets/images/data1.png',
            'styleClass': '',
        },
        {
            'label': '各省数据',
            'data': 'assets/images/data1.png',
            'styleClass': '',
        },
    ];

    treeContainer = [
        {
            'label': '制造业创新中心建设工程',
            'data': '#',
            'styleClass': 'disAbleLi',
        },
        {
            'label': '智能制造工程',
            'data': 'mf3',
            'styleClass': '',
        },
        {
            'label': '工业强基工程',
            'data': 'mf12',
            'styleClass': '',
        },
        {
            'label': '绿色制造工程',
            'data': 'mf13',
            'styleClass': '',
        },
        {
            'label': '高端装备创新工程',
            'data': '#',
            'styleClass': 'disAbleLi',
        },
    ];
    treeContainerTwo = [
        {
            'label': '新一代信息技术产业',
            'data': '#',
            'styleClass': '',
            'expanded': true,
            'children': [{
                'label': '手机',
                'data': 'mf10',
                'styleClass': '',
            },
            {
                'label': '集成电路',
                'data': 'mf6',
                'styleClass': '',
            }],
        },
        {
            'label': '高档数控机床和机器人',
            'data': '#',
            'styleClass': 'disAbleLi',
            'children': [],
        },
        {
            'label': '航空航天装备',
            'data': '#',
            'styleClass': 'disAbleLi',
            'children': [],
        },
        {
            'label': '海洋工程装备及高技术船舶',
            'data': '#',
            'styleClass': 'disAbleLi',
            'children': [],
        },
        {
            'label': '先进轨道交通装备',
            'data': '#',
            'styleClass': 'disAbleLi',
            'children': [],
        },
        {
            'label': '节能与新能源汽车',
            'data': 'mf5',
            'styleClass': '',
            'children': [],
        },
        {
            'label': '电力装备',
            'data': '#',
            'styleClass': 'disAbleLi',
            'children': [],
        },
        {
            'label': '农机装备',
            'data': '#',
            'styleClass': 'disAbleLi',
            'children': [],
        },
        {
            'label': '新材料',
            'data': '#',
            'styleClass': 'disAbleLi',
            'children': [],
        },
        {
            'label': '生物医药及高性能医疗器械',
            'data': '#',
            'styleClass': 'disAbleLi',
            'children': [],
        },
    ];
    treeContainerThree = [
        {
            'label': '总体监测',
            'data': 'mf8',
            'styleClass': '',
            'children': [],
        },
        {
            'label': '区域监测',
            'data': '#',
            'styleClass': '',
            'expanded': true,
            'children': [{
                'label': '分省市产业布局',
                'data': 'mf11',
                'styleClass': '',
            },
            {
                'label': '县域工业竞争力',
                'data': 'mf9',
                'styleClass': '',
            },
            {
                'label': '广东运行监测',
                'data': 'mf7',
                'styleClass': '',
            },
            {
                'label': '贵州运行监测',
                'data': '#',
                'styleClass': 'disAbleLi',
            }],
        },
    ];

    treeNetWorkJump(url) {
        this.zone.run(() => this.router.navigate(['pages/' + url]));
    }
    // treeDataJump(param) {
    //     this.imagePath = param;
    // }
}
