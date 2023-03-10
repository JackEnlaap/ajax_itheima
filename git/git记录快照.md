### Git的记录快照
- Git快照是在原有文件版本的基础上重新生成一份备份文件，类似于备份。为了效率，
如果文件没有修改，Git不在重新存储该文件，而是只保留一个链接指向之前存储的文件。

缺点：占用磁盘空间较大
优点：<font color=HotPink>版本切换时非常快</font>，因为每个版本都是完整的文件快照，切换版本时直接恢复目标版本的快照即可

<table><tr><td bgcolor=DarkSeaGreen>特点：空间换时间</td></tr></table> 

在Git中的绝大多数操作都只需要<font color=HotPink>访问本地文件和资源</font>，一般不需要来自网络上其他计算机的信息

特性：
1.  断网后依旧可以在本地对项目进行版本管理
2.  联网后，把本地修改的记录同步到云端服务器即可

### Git中的三种区域

<font color=HotPink>工作区、暂存区、Git仓库</font>
![](./area.png)


### Git中的三种状态
![](./stage.png)
注意：
- 如果Git仓库中保持着特定版本的文件，就是已提交状态

### Git创建仓库
`git init`

### Git工作区中文件的4种状态
![](./git%E6%96%87%E4%BB%B6%E7%8A%B6%E6%80%81.png)
Git操作的终极结果：让工作区中的文件都处于<font color="red">“未修改”</font>的状态

### Git查看文件状态
`git status`

- 以精简的方式显示文件状态
`git status -s`
![](./Snipaste_2023-02-10_10-55-03.png)
??表示 untracked
- 将未追踪文件添加到暂存区
`git add`
`git commit -m'提交信息'`  提交更新
![](./Snipaste_2023-02-10_11-22-30.png)

### 对已提交的文件进行修改
对index.html进行修改后，运行`git status`命令
![](./modified.png)
Changes not staged for commit:
说明已跟踪文件的内容发生了变化，但还没有放到暂存区
<font color='red'>注意</font>：

- 修改过的、没有放入暂存区的文件前面有红色的<font color='red'><b>M</b></font>标记
- 修改过的、放入暂存区的文件前面有绿色的<font color='green'><b>M</b></font>标记

再次运行`git commit -m'提交信息'` 提交git仓库

### 撤销对文件的修改
`git checkout -- 文件名.后缀 `
操作的结果：所有的修改会丢失，且无法恢复！<font color='red'><b>危险性比较高，请谨慎操作!</b></font>
<font color='red'><b>撤销操作的本质：</b></font>用Git仓库中保存的文件，覆盖工作区中指定的文件

### 向暂存区中一次性添加多个文件
<table><tr><td bgcolor=DarkSeaGreen>`git add .`</td></tr></table>
<font color='red'><b>会经常使用这个命令</b></font>

### 取消暂存的文件
`git reset HEAD 文件名`
`git reset HEAD .` 移除暂存区的全部文件
### 跳过暂存区直接提交文件
`git commit -a -m'value'`

### 移除文件
![](./rm.png)

### 忽略文件
1. #开头的是注释
2. /结尾的是目录
3. /开头防止递归 （/TODO只忽略当前目录下的TODO文件,而不忽略subdir/TODO）
4. !开头表示取反
5. 可以使用glob模式进行文件和文件夹的匹配(glob模式指简化了的正则表达式)

- glob模式
  1. *匹配零个或多个任意字符
  2. [abc]表示匹配任意一个列在方括号中的支付（此案例匹配一个a或b或c）
  3. ?表示只匹配一个字符
  4. [0-9]表示匹配所有0到9的数字
  5. **表示匹配任意中间目录（比如`a/**/z`可以匹配a/z、a/b/z、a/b/c/z等）
  
### 查看提交历史
`git log`

`git log - 2 --pretty=oneline`在一行展示最近两条提交历史的信息

`git reflog --pretty=oneline` 在<font color='red'><b>旧版本</b></font>中查看完整的命令操作的历史

`git reset --hard <CommitID>` 根据指定的提交ID回退到指定版本 

`git push` 将新增代码推送到Git仓库(第二次以后提交)

`git clone 仓库地址` 将远程仓库克隆到本地

### master主分支
实际工作中，master主分支的作用是：<font color='red'>用来保存和记录整个项目已完成的功能代码。</font>
不允许程序员直接在master分支上修改代码，因为这样做风险太高，容易导致整个项目崩溃

### 功能分支
功能分支指的是专门用来开发新功能的分支，它是临时从master主分支上分叉出来的，当心功能开发且测试完毕后，最终需要合并到master主分支上

### 查看分支列表
`git branch`

分支名字前面的*号表示当前所处的分支

### 创建新分支
<font color='red'>基于当前分支，创建一个新分支</font>，此时新分支的代码和当前分支完全一样
`git branch 分支名称`
<font color='red'><b>注意：执行完创建分支的命令之后，用户当前所处的分支还是master分支</b></font>

### 切换分支
切换到指定的分支上进行开发
`git 

### 快速创建并切换分支
-b 表示创建一个新分支
`git checkout -b 分支名称`
是下面两条命令的简写形式
1. `git branch 分支名称`
2. `git checkout 分支名称`

### 合并分支
功能分支的代码开发测试完毕之后，可以使用如下命令，将完成之后的代码合并到master主分支上：
假设要把C分支的代码合并到A分支，则必须先切换到A分支上，再运行`git merge`命令,来合并C分支
<font color='red'><b>必须切换到master分支</b></font>
`git checkout master`
在master分支上运行git merge命令,将login分支的代码合并到master主分支上
`git merge login`

### 删除分支
`git branch -d login`需要在主分支上删除


### 遇到冲突时的分支合并
如果是在两个不同的分支中，对<font color='red'>同一个文件</font>进行了<font color='red'>不同的修改</font>，git就无法干净的合并它们。此时，我们需要打开这些包含冲突的文件然后<font color='red'>手动解决冲突</font>

-  打开包含冲突的文件。手动解决冲突之后，再执行
`git add .`
`git commit -m'解决了分支合并冲突的问题'`

### 将本地分支推送到远程仓库
- -u 表示把本地分支和远程分支进行关联，只在第一次推送的时候需要带 -u 参数，此后可以直接使用`git push`推送代码到远程分支
`git push -u 远程仓库的别名 本地分支名称:远程分支名称`    
简化不加分支别名

### 查看远程仓库中所有的分支列表
`git remote show 远程仓库别名`

### 跟踪分支
从远程仓库中，把远程分支下载到本地仓库中
`git checkout 远程分支的 名称`
- 把远程分支下载到本地仓库并重命名
`git checkout -b 本地分支的名称 远程仓库名称/远程分支的名称`
- 拉取远程分支的最新代码,保持当前分支的代码和远程分支代码一致
`git pull`

### 删除远程分支
- `git push 远程仓库名称 --delete 远程分支名称`
- # 示例
- `git push origin --delete register`