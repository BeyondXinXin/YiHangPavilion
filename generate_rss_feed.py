import os
import yaml
from xml.etree.ElementTree import Element, SubElement, ElementTree
from datetime import datetime, date
import markdown

# 固定的配置参数
MD_DIRECTORY = "content/blog"  # Markdown 文件所在的目录
SITE_BASE_URL = "https://www.beyondxin.top"  # 站点 URL
OUTPUT_RSS_FILE = "public/rss_feed.xml"  # 输出的 RSS 文件名称


def read_metadata_from_md(file_path):
    """
    读取 Markdown 文件头部的元数据并返回一个字典，确保日期为统一字符串格式。
    """
    with open(file_path, 'r', encoding='utf-8') as file:
        metadata_lines = []
        content_lines = []
        in_metadata = False
        metadata_complete = False

        # 提取头部信息和正文内容
        for line in file:
            if line.strip() == "---":
                if in_metadata:
                    metadata_complete = True  # 标记元数据读取完成
                    in_metadata = False  # 重置 in_metadata 标志
                    continue
                in_metadata = True
                continue

            if in_metadata and not metadata_complete:
                # 读取元数据部分
                metadata_lines.append(line)
            elif metadata_complete:
                # 读取正文内容部分
                content_lines.append(line)

        # 解析头部为字典
        metadata = yaml.safe_load(
            "".join(metadata_lines)) if metadata_lines else {}

        # 将 Markdown 正文内容作为 `content` 字段
        metadata["content"] = "".join(content_lines).strip()  # 原始 Markdown 内容

        # 处理日期字段，确保其为统一字符串格式
        if metadata and "date" in metadata:
            if isinstance(metadata["date"], date) and not isinstance(metadata["date"], datetime):
                metadata["date"] = datetime.combine(
                    metadata["date"], datetime.min.time()).strftime("%Y-%m-%d 08:00:00")
            elif isinstance(metadata["date"], datetime):
                metadata["date"] = metadata["date"].strftime(
                    "%Y-%m-%d %H:%M:%S")
            elif isinstance(metadata["date"], str):
                try:
                    metadata["date"] = datetime.strptime(
                        metadata["date"], "%Y-%m-%dT%H:%M").strftime("%Y-%m-%d %H:%M:%S")
                except ValueError:
                    try:
                        metadata["date"] = datetime.strptime(
                            metadata["date"], "%Y-%m-%d").strftime("%Y-%m-%d 08:00:00")
                    except ValueError:
                        print(
                            f"Warning: Unrecognized date format in file {file_path}")
                        metadata["date"] = None
        return metadata


def convert_md_to_html(md_text):
    """
    将 Markdown 文本转换为 HTML。
    """
    return markdown.markdown(md_text)


def generate_rss_feed():
    """
    生成符合指定格式的 RSS 订阅 XML 文件。
    """
    # 创建根元素，添加命名空间
    rss = Element("rss", version="2.0", attrib={
        "xmlns:content": "http://purl.org/rss/1.0/modules/content/"
    })
    channel = SubElement(rss, "channel")

    follow_challenge = SubElement(channel, "follow_challenge")
    feedId = SubElement(follow_challenge, "feedId")
    feedId.text = "77622496639241216"
    userId = SubElement(follow_challenge, "userId")
    userId.text = "77153246427582464"

    # 设置频道信息
    title = SubElement(channel, "title")
    title.text = "易航阁"

    link = SubElement(channel, "link")
    link.text = SITE_BASE_URL

    description = SubElement(channel, "description")
    description.text = "将有限的时间和精力用在真正重要的事情上，才是真正的自由！"

    language = SubElement(channel, "language")
    language.text = "zh"

    # 设置 lastBuildDate 为当前时间
    last_build_date = SubElement(channel, "lastBuildDate")
    last_build_date.text = datetime.now().strftime("%a, %d %b %Y %H:%M:%S +0800")

    # 用于存储所有文章的元数据
    all_metadata = []

    # 遍历目录中的 Markdown 文件并读取元数据
    for filename in os.listdir(MD_DIRECTORY):
        if filename.endswith(".md"):
            file_path = os.path.join(MD_DIRECTORY, filename)
            metadata = read_metadata_from_md(file_path)

            if metadata and "title" in metadata and "date" in metadata and "_path" in metadata:
                all_metadata.append(metadata)

    # 按日期从新到旧排序
    all_metadata.sort(key=lambda x: datetime.strptime(
        x["date"], "%Y-%m-%d %H:%M:%S"), reverse=True)

    # 生成 RSS 项目
    for metadata in all_metadata:
        item = SubElement(channel, "item")

        item_title = SubElement(item, "title")
        item_title.text = metadata["title"]

        item_link = SubElement(item, "link")
        item_link.text = f"{SITE_BASE_URL}/p{metadata['_path']}"

        item_pubDate = SubElement(item, "pubDate")
        date_str = metadata["date"]

        try:
            pub_date = datetime.strptime(
                date_str, "%Y-%m-%d %H:%M:%S").strftime("%a, %d %b %Y %H:%M:%S +0800")
            item_pubDate.text = pub_date
        except ValueError:
            print(
                f"Invalid date format for metadata with title {metadata['title']}. Skipping.")
            continue

        item_guid = SubElement(item, "guid")
        item_guid.text = f"{SITE_BASE_URL}/p{metadata['_path']}"

        item_description = SubElement(item, "description")
        item_description.text = metadata.get("description", "")

        # 将 Markdown 内容转换为 HTML 并插入 content:encoded 标签中
        content_encoded = SubElement(item, "content:encoded")
        content_encoded.text = convert_md_to_html(metadata.get("content", ""))

    # 保存 XML 到文件
    tree = ElementTree(rss)
    tree.write(OUTPUT_RSS_FILE, encoding="utf-8", xml_declaration=True)
    print(f"RSS feed generated: {OUTPUT_RSS_FILE}")


# 直接调用生成函数
generate_rss_feed()
