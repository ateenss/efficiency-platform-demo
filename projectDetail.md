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
|projectID|项目编号|系统自动生成
|projectName|项目名称|
|projectType|项目类型|业务需求项目，系统架构优化
|projectMembers|项目成员|从团队成员中选择
|projectHead|项目负责人|从团队成员中选择
|projectStartTime|项目开始时间|
|projectEndTime|项目结束时间|
|projectBuildTime|项目创建时间|
|projectStatus|项目状态|未开始，进行中，已开始
|projectDescription|项目描述|

`EditProjectMain`

 名称  | 功能 | 备注 |
| --- | --- |  --- |
|projectID|项目编号|系统自动生成
|projectName|项目名称|
|projectType|项目类型|业务需求项目，系统架构优化
|projectMembers|项目成员|从团队成员中选择
|projectHead|项目负责人|从团队成员中选择
|projectStartTime|项目开始时间|
|projectEndTime|项目结束时间|
|projectBuildTime|项目创建时间|
|projectStatus|项目状态|未开始，进行中，已开始

`项目概览`

 名称  | 功能 | 备注 |
| --- | --- |  --- |
|projectID|查看项目负责人|
|projectID|查看包含的需求|按照不同阶段分别显示
|projectID|包含的版本数|
|projectID|任务数|
|projectID|项目成员|
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
|demandID|需求ID|自动生成
|businessNum|业务编号|
|taskName|需求名称|
|demandType|需求类型|下拉框：外部需求，内部需求
|demandAcceptTime|需求受理时间|需求关联版本后自动更新为当前时间
|demandStatus|需求状态|下拉框：未评审、评审通过、评审未通过、已提测、已发布、已上线
|demandMember|需求人员|从用户信息中选取，也可以输入sysnew账号模糊匹配
|demandScale|需求规模|下拉框：小型、中型、大型，默认是小型
|demandPriority|需求优先级|下拉框：p1\p2\p3,默认是p3
|associatedVersion|关联版本|从版本信息中选取
|demandPassTime|需求评审通过时间|状态为评审通过后自动填入
|externalSys|涉及外部系统|
|withBM|是否涉及BM控制台|checkbox
|withUAT|是否需要UAT|checkbox
|demandFromDepart|需求来源部门|
|demandNote|需求备注|
|demandDevHead|需求分派开发负责人|从用户信息中查找，也可以输入sysnew账号模糊匹配
|businessTrack|是否业务量跟踪|
|trafficStatic|业务量统计方式|

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
|projectID|项目ID|
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
|businessNum|业务编号|
|taskName|需求名称|
|demandType|需求类型|
|DemandAcceptStartTime|需求受理查询起始时间|
|DemandAcceptEndTime|需求受理查询结束时间|
|demandStatus|需求状态|
|demandScale|需求规模|
|demandPriority|需求优先级|
|associatedVersion|关联版本|
|demandPassStartTime|需求评审通过查询起始时间|
|demandPassEndTime|需求评审通过查询结束时间|
|demandDemHead|需求负责人|
|demandDevHead|开发负责人|
|withBM|是否涉及BM控制台|
|withUAT|是否需要UAT|
|withCheck|是否已走查|
|withProductChildTask|是否生成子任务|
|withChildDemand|是否子需求|
|withPlanReview|是否完成方案评审|

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
|businessNum|业务编号|
|taskName|需求名称|
|demandType|需求类型|
|demandStatus|需求状态|
|demandPriority|需求优先级|
|associatedVersion|关联版本|
|demandDevHead|开发负责人|
|withBM|是否涉及BM控制台|
|withUAT|是否UAT|
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
|taskName|任务名称|
|belongProject|所属项目|已有项目选择
|taskType|任务类型|下拉框：需求评审任务，需求开发任务，上线任务，个人其他任务
|missionLevel|任务级别|总任务，子任务
|missionHead|任务负责人|
|missionPriority|优先级|高、普通、默认、低
|MissionDescription|任务描述|
|taskDeadLine|截止时间|默认填写提测时间，日历框
|involveModule|涉及模块|
|associatedVersion|关联版本|
|associatedDemand|关联需求|
|associatedMission|关联任务|
|estimateWorkHours|预估投入工时|
|modulePushHead|模块提交负责人|
|branchTag|模块branchtag号|

`备注：新建任务类型只能是个人任务`

---





