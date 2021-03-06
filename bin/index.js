#!/usr/bin/env node
const path = require('path');
const fs = require("fs-extra");
const chalk = require("chalk")
const inquirer = require("inquirer");
const parseArgs = require('minimist')

const { cwd } = require("process");
const { _: args, name } = parseArgs(process.argv.slice(2))
// 模板路径
const TplPath = path.resolve(__dirname, "../template")

switch (args[0]) {
  case undefined:
  case 'pull': // 获取模板
    pullTpl(args[1])
    break;
  case 'list': // 查看模板列表
    listTpl()
    break;
  case 'push': // 新增模板
    pushTpl(args[1])
    break;
  case 'del': // 新增模板
    delTpl(args[1])
    break;
  default:
    console.log('请输入正确的指令:', chalk.green('pull、push、del or null'))
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
// 选择模板
async function choicesTpl({ message = '请选择' }) {
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
    const ans =  await inquirer.prompt({
      type: 'list',
      name: 'result',
      message: message,
      choices: choices
    })
    return ans.result
  } catch (error) {
    console.log(error)
  }
}

// 查看模板
async function listTpl() {
  try {
    const files = await readTplList()
    if (!files.length) {
      console.error('文件模板为空');
      return
    }
    files.forEach((item, index) => console.log(`${index} ${item}`))
  } catch (error) {
    console.error(error)
  }
}
// 拉取模板
async function pullTpl(tplName) {
  try {  
    let basename = tplName || await choicesTpl({message:'请选择要获取的模板'})
    if(!basename) return
    await fs.copy(path.join(TplPath, basename), path.join(cwd(), basename))
    console.log('success!')
  } catch (error) {
    console.error(error)
  }
}
// 新增模板
async function pushTpl(filePath) {
  try {
    const addFilePath = filePath ? path.join(cwd(), filePath) : cwd();
    const targetPath = path.join(TplPath, name || path.basename(addFilePath))
    let canAdd = true
    if (!filePath) {
      const ans = await inquirer.prompt({
        type: 'confirm',
        name: 'isAdd',
        message: `是否将 [${chalk.yellow(addFilePath)}] 加入模板库`,
      })
      canAdd = ans.isAdd
    }
    if (canAdd) {
      console.log(chalk.blue('copying!'))
      await fs.copy(addFilePath, targetPath)
      console.log(chalk.green('success!'))
    }
  } catch (error) {
    console.error(error)
  }
}
// 删除模板
async function delTpl(tplName) {
  try {
    const basename = tplName || await choicesTpl({message:'请选择需要删除的模板'})
    if(!basename) return
    await fs.remove(path.join(TplPath, basename))
    console.log('success!')
  } catch (error) {
    console.error(error)
  }
}