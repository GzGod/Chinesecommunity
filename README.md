# Web3 中文社区网站

一个专门为Web3项目服务的中文社区聚合平台，汇聚官方推文、中文社区讨论、群聊截图和活动记录。

## 功能特性

### 核心功能
- 📱 **项目管理** - 支持多个Web3项目的创建和管理
- 📝 **内容发布** - 官方推文、社区讨论、群聊截图、活动记录
- 🔍 **搜索筛选** - 按项目、类型、标签等多维度搜索
- 💬 **评论互动** - 用户评论、点赞、回复功能
- 🔐 **管理后台** - 完整的管理员后台系统
- 🌐 **多语言** - 中英文双语支持
- 📊 **数据统计** - 项目活跃度、内容统计面板

### 额外功能
- 📂 项目目录导航
- 📅 活动日历
- 📚 资源库
- 👥 社区贡献者展示
- 📡 RSS订阅

## 技术栈

- **前端框架**: Next.js 14 (App Router) + React 18
- **样式方案**: Tailwind CSS + shadcn/ui
- **数据库**: PostgreSQL + Prisma ORM
- **认证系统**: NextAuth.js
- **图片处理**: UploadThing / Cloudinary
- **语言**: TypeScript

## 快速开始

### 1. 安装依赖

\`\`\`bash
npm install
\`\`\`

### 2. 配置环境变量

复制 `.env.example` 到 `.env` 并填写配置：

\`\`\`bash
cp .env.example .env
\`\`\`

编辑 `.env` 文件：

\`\`\`env
# 数据库连接
DATABASE_URL="postgresql://user:password@localhost:5432/web3community"

# NextAuth配置
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# 图片上传（可选）
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""
\`\`\`

### 3. 初始化数据库

\`\`\`bash
# 生成Prisma客户端
npx prisma generate

# 运行数据库迁移
npx prisma migrate dev --name init

# （可选）打开Prisma Studio查看数据
npx prisma studio
\`\`\`

### 4. 创建管理员账号

使用Prisma Studio或直接在数据库中创建管理员：

\`\`\`bash
# 使用Node.js创建管理员
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-password', 10));"
\`\`\`

然后在数据库的 `Admin` 表中插入记录：
- email: admin@example.com
- password: (上面生成的hash)
- name: 管理员
- role: admin

### 5. 启动开发服务器

\`\`\`bash
npm run dev
\`\`\`

访问 http://localhost:3000

## 项目结构

\`\`\`
web3-community/
├── app/                      # Next.js App Router
│   ├── admin/               # 管理后台
│   │   ├── dashboard/       # 数据面板
│   │   ├── projects/        # 项目管理
│   │   ├── posts/           # 内容管理
│   │   ├── comments/        # 评论审核
│   │   └── login/           # 登录页面
│   ├── api/                 # API路由
│   │   ├── projects/        # 项目API
│   │   ├── posts/           # 内容API
│   │   ├── comments/        # 评论API
│   │   └── auth/            # 认证API
│   ├── projects/            # 项目展示页
│   ├── posts/               # 内容详情页
│   └── page.tsx             # 首页
├── components/              # React组件
│   ├── ui/                  # UI基础组件
│   ├── ProjectCard.tsx      # 项目卡片
│   ├── PostCard.tsx         # 内容卡片
│   └── ...
├── lib/                     # 工具库
│   ├── db/                  # 数据库
│   │   └── prisma.ts
│   ├── auth/                # 认证配置
│   │   └── config.ts
│   └── utils/               # 工具函数
├── prisma/                  # Prisma配置
│   └── schema.prisma        # 数据库模型
└── public/                  # 静态资源
\`\`\`

## 使用指南

### 管理员操作

1. **登录后台**
   - 访问 `/admin/login`
   - 使用管理员邮箱和密码登录

2. **创建项目**
   - 进入"项目管理"
   - 填写项目信息：名称、Logo、简介、社交链接等
   - 设置项目分类和标签

3. **发布内容**
   - 进入"内容管理"
   - 选择关联项目
   - 选择内容类型：官方推文/社区推文/群聊截图/活动记录
   - 填写标题、内容、上传图片
   - 可设置为推荐或置顶

4. **审核评论**
   - 进入"评论审核"
   - 查看待审核评论
   - 批准或删除评论

### 前台功能

1. **浏览项目**
   - 首页查看热门项目
   - 项目列表查看所有项目
   - 项目详情页查看项目动态

2. **查看内容**
   - 时间线浏览最新内容
   - 按类型筛选（推文/截图/活动）
   - 搜索关键词

3. **参与互动**
   - 在内容下方发表评论
   - 回复其他用户评论
   - 点赞评论

## 数据库模型

### Project（项目）
- 项目基本信息
- 社交媒体链接
- 分类和标签
- 状态管理

### Post（内容）
- 关联项目
- 内容类型
- 多语言支持
- 图片和链接

### Comment（评论）
- 关联内容
- 评论审核
- 嵌套回复
- 点赞功能

### Admin（管理员）
- 邮箱密码登录
- 角色权限

### Event（活动）
- 活动信息
- 时间管理
- 关联项目

### Resource（资源）
- 资源分类
- 下载统计

## 部署

### Vercel部署（推荐）

1. 推送代码到GitHub
2. 在Vercel导入项目
3. 配置环境变量
4. 部署

### 数据库选择

- **Vercel Postgres** - 与Vercel集成良好
- **Supabase** - 免费额度大，功能丰富
- **Railway** - 简单易用
- **自建PostgreSQL** - 完全控制

## 开发计划

- [ ] 完善前台展示页面
- [ ] 添加图片上传功能
- [ ] 实现搜索API
- [ ] 多语言国际化
- [ ] 项目目录页
- [ ] 活动日历
- [ ] 资源库
- [ ] RSS订阅
- [ ] 邮件通知
- [ ] 数据导出

## 贡献

欢迎提交Issue和Pull Request！

## 许可证

MIT License
