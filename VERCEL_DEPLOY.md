# Vercel 部署指南

## 第一步：准备代码

项目已经准备好了，所有代码都在 `web3/web3-community` 目录下。

## 第二步：推送到GitHub

1. 在GitHub创建一个新仓库
2. 推送代码：

```bash
cd web3/web3-community
git init
git add .
git commit -m "Initial commit: Web3 Chinese Community"
git branch -M main
git remote add origin https://github.com/你的用户名/web3-community.git
git push -u origin main
```

## 第三步：在Vercel部署

### 3.1 导入项目

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "Add New" → "Project"
3. 导入你的GitHub仓库
4. 项目设置：
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (默认)
   - **Build Command**: `npm run build` (默认)
   - **Output Directory**: `.next` (默认)

### 3.2 配置数据库

**推荐选项1：Vercel Postgres（最简单）**

1. 在Vercel项目页面，点击 "Storage" 标签
2. 点击 "Create Database" → 选择 "Postgres"
3. 创建数据库后，Vercel会自动添加环境变量 `POSTGRES_URL`

**推荐选项2：Supabase（免费额度大）**

1. 访问 [supabase.com](https://supabase.com)
2. 创建新项目
3. 在 Settings → Database 中复制连接字符串
4. 格式：`postgresql://postgres:[密码]@[主机]:5432/postgres`

### 3.3 配置环境变量

在Vercel项目设置中添加以下环境变量：

```env
# 数据库（使用Vercel Postgres）
DATABASE_URL=$POSTGRES_URL

# 或者使用Supabase
DATABASE_URL=postgresql://postgres:密码@主机:5432/postgres

# NextAuth（必需）
NEXTAUTH_URL=https://你的域名.vercel.app
NEXTAUTH_SECRET=生成一个随机字符串

# 图片上传（可选）
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

**生成NEXTAUTH_SECRET：**
```bash
# 在本地运行
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3.4 部署

点击 "Deploy" 按钮，Vercel会自动：
- 安装依赖
- 构建项目
- 部署到全球CDN

## 第四步：初始化数据库

部署成功后，需要运行数据库迁移：

### 方法1：使用Vercel CLI（推荐）

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录
vercel login

# 链接项目
cd web3/web3-community
vercel link

# 拉取环境变量
vercel env pull

# 运行数据库迁移
npm run db:generate
npm run db:migrate
```

### 方法2：使用Prisma Studio

```bash
# 本地连接到生产数据库
DATABASE_URL="你的生产数据库URL" npx prisma migrate deploy
```

## 第五步：创建管理员账号

### 方法1：使用Vercel CLI

```bash
# 设置环境变量
vercel env pull

# 创建管理员
npm run create-admin admin@example.com yourpassword "管理员"
```

### 方法2：直接在数据库中创建

1. 生成密码哈希：
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('你的密码', 10));"
```

2. 使用Prisma Studio或数据库管理工具，在 `Admin` 表中插入：
   - email: admin@example.com
   - password: (上面生成的哈希)
   - name: 管理员
   - role: admin

### 方法3：使用Supabase SQL Editor

如果使用Supabase，可以直接在SQL Editor中运行：

```sql
INSERT INTO "Admin" (id, email, password, name, role, "createdAt")
VALUES (
  'admin_' || substr(md5(random()::text), 1, 20),
  'admin@example.com',
  '你的密码哈希',
  '管理员',
  'admin',
  datetime('now')
);
```

## 第六步：访问网站

- 前台：https://你的域名.vercel.app
- 后台：https://你的域名.vercel.app/admin/login

## 常见问题

### 1. 数据库连接失败

检查环境变量 `DATABASE_URL` 是否正确配置。

### 2. 构建失败

查看Vercel构建日志，通常是依赖问题或TypeScript错误。

### 3. 登录失败

确保 `NEXTAUTH_URL` 和 `NEXTAUTH_SECRET` 已正确配置。

### 4. 自定义域名

在Vercel项目设置 → Domains 中添加自定义域名。

## 推荐配置

### Vercel Postgres
- ✅ 与Vercel无缝集成
- ✅ 自动配置环境变量
- ✅ 简单易用
- ⚠️ 免费版有限制

### Supabase
- ✅ 免费额度大（500MB数据库）
- ✅ 提供管理界面
- ✅ 自动备份
- ✅ 支持实时功能

## 下一步

部署成功后：
1. 登录管理后台
2. 创建第一个Web3项目
3. 发布内容
4. 自定义域名（可选）

## 需要帮助？

- Vercel文档：https://vercel.com/docs
- Prisma文档：https://www.prisma.io/docs
- NextAuth文档：https://next-auth.js.org
