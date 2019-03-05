//提交保存填写的项目内容
export  const editSave=(value)=>({
    type:"edit_save",
    value
});
//提交再次编辑修改的内容
export  const editReSave=(value)=>({
    type:"edit_ReSave",
    value
});