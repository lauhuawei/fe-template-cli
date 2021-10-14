<!--
 * @Descripttion : 
 * @Author       : liuhuawei
 * @Date         : 2021-10-13 11:24:11
 * @LastEditors  : liuhuawei
 * @LastEditTime : 2021-10-14 16:30:50
-->
# fe-template-cli
> 模板管理cli,支持模板选择、查看、新增、删除 

### fetpl
默认读取模板库中的模板，选择获取对应模板
### fetpl pull [template name]
默认读取模板库中的模板，选择获取对应模板,可指定获取的模板

### fetpl list
查看模板库中的模板

### fetpl push [file path] --name=name
添加模板，默认当前路径文件，可指定文件路径,可通过name指定模板名称

### fetpl del [template name] 
删除模板，默认返回模板列表，选择删除的列表，可以指定删除模板