export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-bold text-gray-900">
            Web3 中文社区
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            汇聚Web3项目的官方动态、中文社区讨论、群聊精华和活动记录
          </p>
          <div className="flex justify-center gap-4 pt-8">
            <a
              href="/projects"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              浏览项目
            </a>
            <a
              href="/admin"
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              管理后台
            </a>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">📱 官方推文</h3>
            <p className="text-gray-600">
              实时展示Web3项目的官方Twitter动态和重要公告
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">💬 社区讨论</h3>
            <p className="text-gray-600">
              收录中文KOL观点、社区讨论和群聊精华内容
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">🎯 活动记录</h3>
            <p className="text-gray-600">
              归档AMA、空投活动、线上线下会议等重要事件
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
