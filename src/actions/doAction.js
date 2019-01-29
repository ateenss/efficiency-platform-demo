/*这个是引入后台取数据的服务
import fetchInfo from '../services/fetchInfo'*/

//下面可以写相关的获取数据服务
//这个文件对应于actions文件夹中的user文件
export const editChange=(value)=>({
    type:"edit_change",
    value
});
export const getInitial=()=>({
    type:"get_initial",
});
/*export const get=(value)=>({
    type:"edit_change",
    value
});*/

