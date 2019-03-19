## 项目信息
#### 1`.所有表单基本组件放置位置`
`components/SelfComponent`
***
#### `2.基本组件名称对照表`

| 名称  | 功能 |
| --- | --- | 
|InputField|带有错误提示功能的输入框
|MultiSelect|多项选择
|SingleSelect|单项选择
|DatePicker|本土化的日期选择器
|DescriptionInput|描述类文本输入框
|CheckBoxDouble|双选复选框
|RadioButton|双选单选按钮
***
#### 3`. 三大界面情况表`

##### `一.项目管理`
`主要文件名`

| 名称  | 功能 |
| --- | --- | 
|BuildProjectMain|新建工程
|EditProjectMain|编辑工程

`所在文件位置：components/BuildProject`


`相关数据字典`

`BuildProjectMain`

 名称  | 功能 | 备注 |
| --- | --- |  --- |
|ProjectID|项目编号|系统自动生成
|ProjectName|项目名称|
|ProjectType|项目类型|业务需求项目，系统架构优化
|ProjectMembers|项目成员|从团队成员中选择
|ProjectHead|项目负责人|从团队成员中选择
|ProjectStartTime|项目开始时间|
|ProjectEndTime|项目结束时间|
|ProjectBuildTime|项目创建时间|
|ProjectStatus|项目状态|未开始，进行中，已开始
|ProjectDescription|项目描述|

`EditProjectMain`

 名称  | 功能 | 备注 |
| --- | --- |  --- |
|ProjectID|项目编号|系统自动生成
|ProjectName|项目名称|
|ProjectType|项目类型|业务需求项目，系统架构优化
|ProjectMembers|项目成员|从团队成员中选择
|ProjectHead|项目负责人|从团队成员中选择
|ProjectStartTime|项目开始时间|
|ProjectEndTime|项目结束时间|
|ProjectBuildTime|项目创建时间|
|ProjectStatus|项目状态|未开始，进行中，已开始

`项目概览`

 名称  | 功能 | 备注 |
| --- | --- |  --- |
|ProjectID|查看项目负责人|
|ProjectID|查看包含的需求|按照不同阶段分别显示
|ProjectID|包含的版本数|
|ProjectID|任务数|
|ProjectID|项目成员|
---

#### `二.需求管理`

`主要文件名`

| 名称  | 功能 |
| --- | --- | 
|BuildDemandMain|新建需求
|EditDemandMain|编辑编辑

`所在文件位置：components/BuildDemand`

---
`相关数据字典`

| 名称  | 功能 | 备注 |
| --- | --- |  --- |
|DemandID|需求ID|自动生成
|BusinessNum|业务编号|
|DemandName|需求名称|
|DemandType|需求类型|下拉框：外部需求，内部需求
|DemandAcceptTime|需求受理时间|需求关联版本后自动更新为当前时间
|DemandStatus|需求状态|下拉框：未评审、评审通过、评审未通过、已提测、已发布、已上线
|DemandMember|需求人员|从用户信息中选取，也可以输入sysnew账号模糊匹配
|DemandScale|需求规模|下拉框：小型、中型、大型，默认是小型
|DemandPriority|需求优先级|下拉框：p1\p2\p3,默认是p3
|AssociatedVersion|关联版本|从版本信息中选取
|DemandPassTime|需求评审通过时间|状态为评审通过后自动填入
|ExternalSys|涉及外部系统|
|WithBM|是否涉及BM控制台|checkbox
|WithUAT|是否需要UAT|checkbox
|DemandFromDepart|需求来源部门|
|DemandNote|需求备注|
|DemandDevHead|需求分派开发负责人|从用户信息中查找，也可以输入sysnew账号模糊匹配
|BusinessTrack|是否业务量跟踪|
|TrafficStatic|业务量统计方式|

---
##### `后续生成属性`

| 名称  | 功能 | 备注 |
| --- | --- |  --- |
|AssociatedTasks|关联任务|
|DemandCreateTime|需求创建时间|
|DemandCreatePerson|创建人|
|UpdateTime|更新时间|
|UpdatePerson|更新人|
|ContinuousTestResult|持续集成测试结果|
|AssociatedDoc|关联研发文档|开发方案、持续集成案例、上线检查表
|ProjectID|项目ID|
|OrganizeID|组织架构ID|

---
#### `需求筛选1`



`需求人员、版本负责人、系统管理员、管理人员视角筛选`

`以下为查询条件`

1. ###### 业务编号  
2. ###### 需求名称
2. ###### 需求类型     \下拉框：外部需求、内部优化
2. ###### 需求受理时间起止范围   \日历框选取
2. ###### 需求状态   \下拉框
2. ###### 需求规模   \下拉框：小型、大型、中型，默认是小型
2. ###### 需求优先级   \下拉框：p1、p2、p3
2. ###### 关联版本   \从版本信息中选取
2. ###### 需求评审通过起始时间   \日历框选取
2. ###### 需求负责人   \从用户信息中选取，也可输入sysnew账号
2. ###### 开发负责人   \从用户信息中选取，也可输入sysnew账号
2. ###### 是否涉及BM控制台   
2. ###### 是否需要UAT   
2. ###### 是否已走查
2. ###### 是否生成子任务   
2. ###### 是否子需求 
2. ###### 是否完成方案评审

`备注：可查看需求关联的任务状态   `

`相关数据字典`

| 名称  | 功能 | 备注 |
| --- | --- |  --- |
|BusinessNum|业务编号|
|DemandName|需求名称|
|DemandType|需求类型|
|DemandAcceptStartTime|需求受理查询起始时间|
|DemandAcceptEndTime|需求受理查询结束时间|
|DemandStatus|需求状态|
|DemandScale|需求规模|
|DemandPriority|需求优先级|
|AssociatedVersion|关联版本|
|DemandPassStartTime|需求评审通过查询起始时间|
|DemandPassEndTime|需求评审通过查询结束时间|
|DemandDemHead|需求负责人|
|DemandDevHead|开发负责人|
|WithBM|是否涉及BM控制台|
|WithUAT|是否需要UAT|
|WithCheck|是否已走查|
|WithProductChildTask|是否生成子任务|
|WithChildDemand|是否子需求|
|WithPlanReview|是否完成方案评审|

---
#### `需求筛选2`


`开发人员视角筛选`

`以下为查询条件`

1. ######业务编号
1. ######需求名称
1. ######需求类型
1. ######需求状态  \下拉框
1. ######需求优先级
1. ######关联版本
1. ######开发负责人
1. ######是否涉及BM控制台
1. ######是否UAT

`相关数据字典`

| 名称  | 功能 | 备注 |
| --- | --- |  --- |
|BusinessNum|业务编号|
|DemandName|需求名称|
|DemandType|需求类型|
|DemandStatus|需求状态|
|DemandPriority|需求优先级|
|AssociatedVersion|关联版本|
|DemandDevHead|开发负责人|
|WithBM|是否涉及BM控制台|
|WithUAT|是否UAT|
*****
#### 单条需求数据查看
*****
#### 拆分子需求
*****
#### 其他辅助功能

*****
#### 需求状态机
*****


#### `三.任务管理`

`主要文件名`

| 名称  | 功能 |
| --- | --- | 
|BuildMissionMain|新建任务
|EditMissionMain|编辑任务

`所在文件位置：components/BuildMission`

---
`相关数据字典`

| 名称  | 功能 | 备注 |
| --- | --- |  --- |
|MissionID|任务ID|
|MissionName|任务名称|
|BelongProject|所属项目|已有项目选择
|MissionType|任务类型|下拉框：需求评审任务，需求开发任务，上线任务，个人其他任务
|MissionLevel|任务级别|总任务，子任务
|MissionHead|任务负责人|
|MissionPriority|优先级|高、普通、默认、低
|MissionDescription|任务描述|
|MissionDeadLine|截止时间|默认填写提测时间，日历框
|InvolveModule|涉及模块|
|AssociatedVersion|关联版本|
|AssociatedDemand|关联需求|
|AssociatedMission|关联任务|
|EstimateWorkHours|预估投入工时|
|ModulePushHead|模块提交负责人|
|BranchTag|模块branchtag号|

`备注：新建任务类型只能是个人任务`

---





