# Vercel 部署检查清单

## ✅ 准备工作

- [x] 项目代码已完成
- [x] package.json 配置正确
- [x] Prisma schema 配置为 PostgreSQL
- [x] .gitignore 已配置
- [x] postinstall 脚本已添加

## 📋 部署步骤

### 1. 推送到GitHub

```bash
cd E:\vibe\web3\web3-community

# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Web3 Chinese Community Platform"

# 添加远程仓库（替换为你的GitHub仓库地址）
git remote add origin https://github.com/你的用户名/web3-community.git

# 推送
git branch -M main
git push -u origin main
```

### 2. 在Vercel导入项目

1. 访问 https://vercel.com
2. 点击 "Add New" → "Project"
3. 选择你的GitHub仓库
4. 配置如下：
   - Framework: Next.js (自动检测)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. 配置数据库

**选项A：Vercel Postgres（推荐）**

1. 在Vercel项目中，点击 "Storage" 标签
2. 点击 "Create Database" → 选择 "Postgres"
3. 创建后会自动添加环境变量

**选项B：Supabase**

1. 访问 https://supabase.com
2. 创建新项目
3. 复制数据库连接字符串

### 4. 配置环境变量

在Vercel项目设置 → Environment Variables 中添加：

```env
# 数据库（Vercel Postgres会自动添加POSTGRES_URL）
DATABASE_URL=$POSTGRES_URL

# 或使用Supabase
DATABASE_URL=postgresql://postgres:[密码]@[主机]:5432/postgres

# NextAuth配置
NEXTAUTH_URL=https://你的项目名.vercel.app
NEXTAUTH_SECRET=运行下面命令生成

# 可选：图片上传
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

**生成NEXTAUTH_SECRET：**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5. 部署

点击 "Deploy" 按钮，等待部署完成。

### 6. 运行数据库迁移

**方法1：使用Vercel CLI**

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录
vercel login

# 链接项目
cd E:\vibe\web3\web3-community
vercel link

# 拉取环境变量
vercel env pull .env.local

# 运行迁移
npx prisma migrate deploy
```

**方法2：使用Prisma Studio**

```bash
# 使用生产数据库URL
DATABASE_URL="你的数据库URL" npx prisma migrate deploy
```

### 7. 创建管理员账号

**方法1：本地连接生产数据库**

```bash
# 设置环境变量
DATABASE_URL="你的数据库URL" npm run create-admin admin@example.com yourpassword "管理员"
```

**方法2：生成密码哈希后手动插入**

```bash
# 生成密码哈希
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('你的密码', 10));"
```

然后在数据库管理工具中插入到Admin表。

### 8. 测试

访问你的网站：
- 前台：https://你的项目名.vercel.app
- 后台：https://你的项目名.vercel.app/admin/login

## 🎯 部署后检查

- [ ] 网站可以正常访问
- [ ] 管理员可以登录
- [ ] 数据库连接正常
- [ ] 可以创建项目
- [ ] 可以发布内容

## 🔧 常见问题

### 构建失败

查看Vercel构建日志，通常是：
- 依赖安装失败
- TypeScript类型错误
- 环境变量缺失

### 数据库连接失败

检查：
- DATABASE_URL 是否正确
- 数据库是否允许外部连接
- 是否运行了数据库迁移

### 登录失败

检查：
- NEXTAUTH_URL 是否正确（必须是https://）
- NEXTAUTH_SECRET 是否已设置
- 管理员账号是否已创建

## 📚 相关文档

- [Vercel部署详细指南](./VERCEL_DEPLOY.md)
- [项目README](./README.md)
- [快速开始指南](./QUICKSTART.md)

## 🚀 下一步

部署成功后：
1. 自定义域名（可选）
2. 配置图片上传
3. 添加更多功能
4. 优化SEO
