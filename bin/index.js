#!/usr/bin/env node
const path = require('path');
const fs = require("fs-extra");
const inquirer = require("inquirer");
const { cwd } = require("process");
const args = process.argv.slice(2)
console.log('__dirname', __dirname)
console.log('cwd', cwd())
console.log('args',args)
console.log('  ')
// 模板路径
const TplPath = path.resolve(__dirname, "../template")
switch (args[0]) {
  case 'list': // 查看模板列表
    listTpl()
    break;
  case 'add': // 新增模板
    addTpl()
    break;   
  default:
    // 未输参数  
    selectTpl()
    break;
}
// 读取文件
async function readTplList() {
  try {
    return await fs.readdir(TplPath)
  } catch (error) {
    console.error(error)
  }
}
// 查看模板
async function listTpl() {
  try {
    const files = await readTplList()
    if (!files.length) {
      console.log('文件模板为空');
      return
    }
    files.forEach((item, index) => console.log(`${index} ${item}`))
  } catch (error) {
    console.error(error)
  }
}
// 选择模板
async function selectTpl() {
  try {
    const files = await readTplList()
    if (!files.length) {
      console.log('文件模板为空，请先添加模板');
      return
    }
    const choices = files.map((item, index) => ({
      name: `${index} ${item}`,
      value: item
    }))

    const ans = await inquirer.prompt({
      type: 'list',
      name: 'tpl',
      message: '请选择模板',
      choices: choices
    })
    const src = path.join(TplPath, ans.tpl)
    await fs.copy(src, path.join(cwd(), ans.tpl))
    console.log('success!')
  } catch (error) {
    console.error(error)
  }
}
// 新增模板
async function addTpl() {
  console.log(args)
 
}
