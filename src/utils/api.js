import axios from 'axios'
import {Message} from "element-ui";
import el from "element-ui/src/locale/lang/el";
axios.interceptors.request.use(config=>{
  return config;
},err=>{
  Message.error({message:'请求超时！'})
  })
axios.interceptors.response.use(data=>{
  if(data.status&&data.status == 200 && data.data.status == 500){
    Message.error({message:data.data.msg});
    return;
  }
  if(data.data.msg){
    Message.success({message:data.data.msg});
  }
  return data;
},err =>{
  if(err.response.status == 504||err.response.status == 404){
    Message.error({message:'服务器被吃了'});
  }else if(err.response.status == 403){
    Message.error({message:'权限不足，请联系管理员'});
  }else if(err.response.status == 401){
    Message.error({message:err.response.data.msg});
  }else {
    if(err.response.data.msg)
    {
      Message.error({message:err.response.data.msg});
    } else {
      Message.error({message:'未知错误'});
    }
  }
  })

let base = '';
export const postRequest = (url,params)=>{
  return axios({
    method:'post',
    url:`${base}${url}`,//$ 是在 Vue 所有实例中都可用的属性的一个简单约定。这样做会避免和已被定义的数据、方法、计算属性产生冲突
    data:params,
    transformRequest:[function (data) {
      let ret=''
      for (let it in data){
        ret +=encodeURIComponent(it)+'='+encodeURIComponent(data[it])+'&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
//export default命令并不是在每个文件中都是必须的。它的作用只是用于导出模块，在别的模块需要调用这个模块的时候，可以通过import命令引入使用的
export const uploadFileRequest = (url, params)=>{
  return axios({
    method:'post',
    url:`${base}${url}`,
    data:params,
    headers:{
      'Content-Type':'multipart/form-data'
    }
  });
}
export const putRequest = (url, params)=>{
  return axios({
    method:'put',
    url:`${base}${url}`,
    data:params,
    transformRequest: [function (data) {
      let ret = ''
      for(let it in data){
        ret+=encodeURIComponent(it)+'='+encodeURIComponent(data[it])+'&'
      }
      return ret
    }],
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    }
  });
}
export const deleteRequest = (url)=>{
  return axios({
    method:'delete',
    url:`${base}${url}`
  });
}
export const getRequest = (url)=>{
  return axios({
    method:'get',
    url:`${base}${url}`
  });
}
