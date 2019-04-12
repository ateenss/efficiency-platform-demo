
import React from "react";
import EditQuill from "../SelfComponent/EditQuill"
import Grid from '@material-ui/core/Grid';
import MultiLineInput from "../SelfComponent/MultiLineInput"

export const demandplan=(classes,planContent,getContent)=>(
    <Grid container spacing={8}>
        <Grid item xs={12}>
            <Grid container spacing={8}>
                <Grid item xs={12} className={classes.quillWrapper}>
                    <EditQuill
                        classStyle={classes.quillIn}
                        nameIn="overallPlan"
                        placeholder="请输入整体方案描述"
                        onChange={getContent}
                        defaultValue={planContent.overallPlan}
                    />
                </Grid>
                <Grid item xs={3}>
                    <MultiLineInput fullWidth disabled
                                    InputLabelName="外部系统接口调整"
                                    nameIn="outerSysInterfaceChange"
                                    onChange={getContent}
                                    defaultValue={planContent.outerSysInterfaceChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <MultiLineInput fullWidth disabled
                                    InputLabelName="是否支持灰度功能"
                                    nameIn="supportGrayEnv"
                                    onChange={getContent}
                                    defaultValue={planContent.supportGrayEnv}
                    />
                </Grid>
                <Grid item xs={3}>
                    <MultiLineInput fullWidth disabled
                                    InputLabelName="灾备影响性评估"
                                    nameIn="disasterRecoveryAssessment"
                                    onChange={getContent}
                                    defaultValue={planContent.disasterRecoveryAssessment}
                    />
                </Grid>
                <Grid item xs={3}>
                    <MultiLineInput fullWidth disabled
                                    InputLabelName="生产影响性评估"
                                    nameIn="productEnvAssessment"
                                    onChange={getContent}
                                    defaultValue={planContent.productEnvAssessment}
                    />
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12}>
            <Grid container spacing={8}>
                <Grid item xs={3}>
                    <MultiLineInput fullWidth disabled
                                    InputLabelName="外部系统配套改造"
                                    nameIn="outerSysChange"
                                    onChange={getContent}
                                    defaultValue={planContent.outerSysChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <MultiLineInput fullWidth disabled
                                    InputLabelName="模块上线顺序要求"
                                    nameIn="moduleDeploySequence"
                                    onChange={getContent}
                                    defaultValue={planContent.moduleDeploySequence}
                    />
                </Grid>
                <Grid item xs={3}>
                    <MultiLineInput fullWidth disabled
                                    InputLabelName="内部子系统间接口调整"
                                    nameIn="innerSysInterfaceChange"
                                    onChange={getContent}
                                    defaultValue={planContent.innerSysInterfaceChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <MultiLineInput fullWidth disabled
                                    InputLabelName="安全相关"
                                    nameIn="safety"
                                    onChange={getContent}
                                    defaultValue={planContent.safety}
                    />
                </Grid>
                <Grid item xs={3}>
                    <MultiLineInput fullWidth disabled
                                    InputLabelName="数据库修改点"
                                    nameIn="dbChange"
                                    onChange={getContent}
                                    defaultValue={planContent.dbChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <MultiLineInput fullWidth disabled
                                    InputLabelName="参数配置要求"
                                    nameIn="config"
                                    onChange={getContent}
                                    defaultValue={planContent.config}
                    />
                </Grid>
                <Grid item xs={3}>
                    <MultiLineInput fullWidth disabled
                                    InputLabelName="接口规范变更"
                                    nameIn="interfaceChange"
                                    onChange={getContent}
                                    defaultValue={planContent.interfaceChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <MultiLineInput fullWidth disabled
                                    InputLabelName="运维信息变更"
                                    nameIn="operationChange"
                                    onChange={getContent}
                                    defaultValue={planContent.operationChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <MultiLineInput fullWidth disabled
                                    InputLabelName="部署需求调整"
                                    nameIn="deploymentChange"
                                    onChange={getContent}
                                    defaultValue={planContent.deploymentChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <MultiLineInput fullWidth disabled
                                    InputLabelName="五高影响性"
                                    nameIn="high5Assessment"
                                    onChange={getContent}
                                    defaultValue={planContent.high5Assessment}
                    />
                </Grid>
            </Grid>
        </Grid>
    </Grid>
);

export const devPlan=(classes,Content,getContent)=>{
    console.log("在devPlan裏面");
    console.log(Content.planContent);
        return (
            <Grid container spacing={8}>
                <Grid item xs={12} className={classes.quillWrapper}>
                    <EditQuill
                        classStyle={classes.quillIn}
                        nameIn="overallPlan"
                        placeholder="请输入整体方案描述"
                        onChange={getContent}
                        defaultValue={!!Content?Content.planContent:""}
                    />
                </Grid>
            </Grid>
        )
    };


