## 需求格式
 1. 固定的初始化数据,从后台拉数据<br/>
`{"demandType":[],`<br/>
`"demandStatus":[],`<br/>
`"demandMember":[],`<br/>
`"demandScale":[],`<br/>
`"demandPriority":[],`<br/>
`"associatedVersion":[],`<br/>
`"demandDevHead":[],`<br/>
`"dataMuiTable":{demandID":{"内容参考编辑需求"},demandID":{"内容参考编辑需求"},demandID":{"内容参考编辑需求"},demandID":{"内容参考编辑需求"},}`<br/>
`}`<br/>
ps：目前前端的dataMuiTable还没有修改
 1. 编辑请求，从后台拉数据，同时也是新建需求向后台发的数据<br/>
 `{"demandID":16,`<br/>
 `"businessNum":16,`<br/>
 `"taskName":"",`<br/>
 `"demandType":"",`<br/>
 `"demandAcceptTime":"",`<br/>
 `"demandStatus":"",`<br/>
 `"demandMember":"",`<br/>
 `"demandScale":"",`<br/>
 `"demandPriority":"",`<br/>
 `"associatedVersion":"",`<br/>
 `"demandPassTime":"",`<br/>
 `"externalSys":"",`<br/>
 `"withBM":"",`<br/>
 `"withUAT":"",`<br/>
 `"demandFromDepart":"",`<br/>
 `"demandNote":"",`<br/>
 `"demandDevHead":"",`<br/>
 `"businessTrack":"",`<br/>
 `"trafficStatic":"",}`<br/>
 
   3.动态获取列表，从后台拉数据，<br/>
   `{"demandID":{"内容参考编辑需求"},` <br/>
   `"demandID":{"内容参考编辑需求"},` <br/>
   `"demandID":{"内容参考编辑需求"},` <br/>
   `"demandID":{"内容参考编辑需求"},` <br/>
   `"demandID":{"内容参考编辑需求"},` <br/>
   `"demandID":{"内容参考编辑需求"},}` <br/>
 
 ps:一姐提出的要求前后不一致，需要校验具体要求数据：后来添加的<br/>
 demandPassStartTime：需求评审起止时间，追加<br/>demandDemHead： 需求负责人 ，追加<br/>
 需求新建时编号如何生成<br/>
ps:时间格式要求："2019/3/2"<br/>
    4. 筛选请求，向后台发数据<br/>
    筛选请求1<br/>
    `{"businessNum":16,` <br/>
    `"taskName":"",`<br/>
    `"demandType":"",`<br/>
    `"demandAcceptStartTime":"",`<br/>
    `"demandAcceptEndTime":"",`<br/>
    `"demandStatus":"",`<br/>
    `"demandScale":"",`<br/>
    `"demandPriority":"",`<br/>
    `"associatedVersion":"",`<br/>
    `"demandPassStartTime":"",`<br/>
    `"demandPassEndTime":"",`<br/>
    `"demandDemHead":"",`<br/>
    `"withBM":"",`<br/>
    `"withUAT":"",`<br/>
    `"withCheck":"",`<br/>
    `"withProductChildTask":"",`<br/>
    `"withChildDemand":"",`<br/>
    `"withPlanReview":""}`<br/>
    筛选请求2,向后台发数据<br/>
    `{"businessNum":16,` <br/>
    `"taskName":"",`<br/>
    `"demandType":"",`<br/>
    `"demandStatus":"",`<br/>
    `"demandPriority":"",`<br/>
    `"associatedVersion":"",`<br/>
    `"demandDevHead":"",`<br/>
    `"withBM":"",`<br/>
    `"withUAT":"",}`<br/>
    两个筛选接受需求对象放入MuiTable里面，该对象格式就按照**编辑需求**的格式来写
 ## 项目格式
 1. 固定初始化数据，从后台拉数据<br/>
    `{"projectType":[],` <br/>
     `"projectMembers":[],`<br/>
     `"projectHead":[],`<br/>
     `"projectStatus":[],}`<br/>
 1. 编辑项目，从后台拉数据,也是新建的时候向后台拉取数据<br/>
 `{"projectID":"",` <br/>
 `"projectName":"",`<br/>
 `"projectType":"",`<br/>
 `"projectMembers":"",`<br/>
 `"projectHead":"",`<br/>
 `"projectStartTime":"",`<br/>
 `"projectEndTime":"",`<br/>
 `"projectBuildTime":"",`<br/>
 `"projectStatus":"",`<br/>
 `"projectDescription":"",}`<br/>
 1. 动态获取列表，从后台拉数据，
 
   `{"projectID":{"内容参考编辑项目"},` <br/>
   `projectID":{"内容参考编辑项目"},` <br/>
   `projectID":{"内容参考编辑项目"},` <br/>
   `projectID":{"内容参考编辑项目"},` <br/>
   `projectID":{"内容参考编辑项目"},}` <br/>
   
 ## 任务格式
   1. 固定初始化数据，从后台拉数据<br/>
   `{"belongProject":[],` <br/>
   `"taskType":[],`<br/>
   `"missionLevel":[],`<br/>
   `"missionHead":[],`<br/>
   `"missionPriority":[],`<br/>
   `"associatedVersion":[],`<br/>
   `"involveModule":[],`<br/>
   `"associatedDemand":[],`<br/>
   `"associatedMission":[],`<br/>
   `"modulePushHead":[],`<br/>
   `"taskStatus":[],`<br/>
   `"tasks":[{"taskCode":"","taskName":"","belongProject":"","taskType":"","missionLevel":"","missionHead":"","missionPriority":"","missionDescription":"","taskDeadLine":"","involveModule":"","associatedVersion":"","associatedDemand":"","associatedMission":"","estimateWorkHours":"","modulePushHead":"","branchTag":""},{}...],`<br/>
   `"demands":[{"tasks":},{}...],`<br/>
   2. 编辑子任务，向后台发送数据<br/>
   `{"taskName":"",` <br/>
    `"missionHead":"",`<br/>
    `"missionStartTime":"",`<br/>
    `"missionEndTime":"",`<br/>
    `"taskType":"",`<br/>
    `"plan":"",}`<br/>
   3. 我的任务列表动态拉取，从后台拉取数据<br/>
      `"tasks":[{"taskCode":"","taskName":"","belongProject":"","taskType":"","missionLevel":"","missionHead":"","missionPriority":"","missionDescription":"","taskDeadLine":"","involveModule":"","associatedVersion":"","associatedDemand":"","associatedMission":"","estimateWorkHours":"","modulePushHead":"","branchTag":""},{}...],`<br/>
    ps:要不要把所有信息拉取进来，还是只要任务卡片想要展示的信息
   4. 开发需求任务中子任务列表动态拉取，从后台拉数据<br/>
   `[{"taskName":"","taskOwner":"","demandID":"","tasks":{"develop":["taskContent":"","taskName":"","taskId":""],
   "plan":[],"integration":[],"goTest":[]}},{}...]`
   5. 发送编辑方案数据到后台<br/>
`{"overallSchemeDescription":"",` <br/>
   `"externalSystemPortAdjust":"",`<br/>
   `"isOrNotSupportGrayScale":"",`<br/>
   `"disasterImpactAssessment":"",`<br/>
   `"productImpactAssessment":"",........`<br/>
   ps：这里的名称需要商议 <br/>
   这里的大小写转换还未完成
 