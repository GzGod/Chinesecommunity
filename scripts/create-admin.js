const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('开始创建管理员账号...');

  const email = process.argv[2] || 'admin@example.com';
  const password = process.argv[3] || 'admin123';
  const name = process.argv[4] || '管理员';

  // 检查是否已存在
  const existing = await prisma.admin.findUnique({
    where: { email },
  });

  if (existing) {
    console.log(`管理员 ${email} 已存在！`);
    return;
  }

  // 加密密码
  const hashedPassword = await bcrypt.hash(password, 10);

  // 创建管理员
  const admin = await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: 'admin',
    },
  });

  console.log('管理员账号创建成功！');
  console.log('邮箱:', admin.email);
  console.log('密码:', password);
  console.log('\n请妥善保管您的密码！');
}

main()
  .catch((e) => {
    console.error('创建管理员失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
