import path from "path";
import fs from "node:fs";

// get rand user object
export async function GET(request: Request) {
  // get query params
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");
  try {
    // 构建文件路径
    const filePath = path.resolve("src/app/api/city/data.json");
    // 读取文件
    const data = fs.readFileSync(filePath, "utf-8");
    // 解析文件
    const res = JSON.parse(data);
    // 如果有关键字，则过滤
    if (keyword) {
      const cities = res.data.filter((item: { label: string }) =>
        item.label.toLowerCase().includes(keyword.toLowerCase())
      );
      return Response.json({ data: cities });
    }
    // 返回用户
    return Response.json(res);
  } catch (error) {
    return Response.json({ message: "Server error" + error });
  }
}
