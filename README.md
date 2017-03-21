# 豆瓣热门图书标签排序系统

需求：书海无涯，人生太短，一生不可能读完所有好书，也不一定读得懂所有好书。
故在豆瓣标签分类基础上提供评价排序/阅读人数排序功能，方便用户选取易读的好书。

![](index.png)

### 1.使用Pyspider获取最新数据

* 1.命令行输入pyspider all;
* 2.浏览器输入localhost:5000;
* 3.新建项目，粘贴爬虫代码(booksSpider.py);
* 4.选择debug项或running项，点击run开始;
* 5.观察命令行，等待数据获取。

### 2.命令行进入book_data目录，运行索引器(search.py),在search目录生成索引

	* $ cd doubanSpider
	* $ python search.py

### 3.打开index.html即可使用。

