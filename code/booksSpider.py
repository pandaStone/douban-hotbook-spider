#!/usr/bin/env python
# -*- encoding: utf-8 -*-
#Created on 2016-03-23 14:55
#Project: Douban-HotBooksSpider
#__author__ : 'Stone Tsang'

from pyspider.libs.base_handler import *

DIR_PATH = 'doubanSpider/'

class Handler(BaseHandler):
	crawl_config = {
		'timeout':1600
	}

	def __init__ (self):
		self.base_url = 'https://book.douban.com/tag/?view=type'
		self.deal = Deal()
		self.pri = 1
		# 每个tag下有1000个条目，借此翻页
		self.page_num = 0
		self.total_num = 980
		self.typenames = [u'文学',u'流行',u'文化',u'生活',u'经管',u'科技']
		# 六个存放标签的类别表格 【文学】【流行】【文化】【生活】【经管】【科技】


	def on_start(self):
		self.crawl(self.base_url,callback = self.type_init)


	def type_init(self,response):

		tags = response.doc('.tag').items()
		#分类爬标签
		index = 0
		count = 1
		for tag in tags:
			tagname = tag.attr.href.split('/')[-1]
			self.tag_page(tagname,index)  ############注意！！！！！！！
			count += 1
			if count == 28:   index = 1
			if count == 64:   index = 2
			if count == 97:   index = 3
			if count == 118:  index = 4
			if count == 131:  index = 5


	def tag_page(self,tag,index):

		tag_url = 'https://book.douban.com/tag/' + tag

		self.pri = 1 - 0.1*index
		s_path = self.deal.mkDir( DIR_PATH + self.typenames[index] +'/'+ tag + '/star')
		r_path = self.deal.mkDir( DIR_PATH + self.typenames[index] +'/'+ tag + '/reader')

		#对该标签1000条书目进行遍历
		while self.page_num <= self.total_num:
			url = tag_url + '?start='+ str(self.page_num) +'&type=T'
			self.crawl ( url ,callback = self.book_page,priority = self.pri,save={'s_path':s_path,'r_path':r_path} )
			self.page_num += 20

		#复原循环标记
		self.page_num = 0 

	def book_page(self, response):

		books = []
		covers = []

		#书名
		for bookname in response.doc('.info > h2 > a').items():
			books.append( bookname.attr.title )

		#封面编号存入数组   ### https://img3.doubanio.com/mpic/s1080944.jpg	
		for cover in response.doc('.nbg img').items():
			covers.append( cover.attr.src.split('/')[-1] )

	# 格式: txt = '<a href="' +url+ '">' +bookname +'</a>'+'\n' +brief +'\n'+star+reader
		one = []
		two = []
		three = []
		four = []
		txt = []

	### 文本插入开始  
		#i = 1
		for url in response.doc('.nbg').items():
			one.append('<a href="' + url.attr.href + '">') 
			#i += 1

		###索引是0-20！！！！！
		for idx in range(20):
			two.append( one[idx] + books[idx] + '</a>\n' )

		i = 0 
		for brief in response.doc('.pub').items():
			three.append ( two[i] + brief.text() + '\n' )
			i += 1

		i = 0
		for star in response.doc('.rating_nums').items():
			four.append(  three[i] + star.text() )
			i += 1

		i = 0
		for reader in response.doc('.pl').items():
			txt.append( four[i] + reader.text() )
			i += 1
	###文本插入结束

	# TypeError:  使用text()前没有用items()
	# TypeError:  text是关键字，却命名了名为text的数组

		###  以评价人数reader为名新建目录，并把书存入该目录
		k = 0
		for reader in response.doc('.pl').items():
			file_name = books[k] + '.jpg' 
			r_dir = response.save['r_path'] +'/'+ reader.text() +'/'+ books[k]
			reader_path = self.deal.mkDir( r_dir )
			self.deal.saveText( txt[k] , reader_path, books[k] )
			imgURL = 'https://img3.doubanio.com/mpic/' + covers[k]
			self.crawl( imgURL ,callback = self.save_img,save=
								{	'dir_path':reader_path,
									'file_name':file_name
								},priority = 0.4)
			k += 1

		
		###  以评星star为名新建目录，并把书存入该目录
		k = 0
		for star in response.doc('.rating_nums').items():
			file_name = books[k] + '.jpg' 
			s_dir = response.save['s_path'] +'/'+ star.text() +'/'+ books[k]
			star_path = self.deal.mkDir( s_dir )
			self.deal.saveText( txt[k] , star_path,   books[k] )
			imgURL = 'https://img3.doubanio.com/mpic/' + covers[k]
			self.crawl( imgURL ,callback = self.save_img,save=
								{	'dir_path':star_path,
									'file_name':file_name
								},priority = 0.4)
			k += 1


	def save_img(self, response):
		content = response.content
		file_name = response.save['file_name']
		dir_path = response.save['dir_path'] +'/'+ file_name
		self.deal.saveImg(content,dir_path)



import os

class Deal:
	def __init__(self):
		self.path = DIR_PATH
		if not os.path.exists(self.path):
			os.makedirs(self.path)

	def mkDir(self,path):
		dir_path = path.strip()
		exists = os.path.exists( dir_path )
		if not exists:
			os.makedirs( dir_path )
			return dir_path
		else:
			return dir_path

	def saveImg(self,content,path):
		f = open(path,'wb')
		f.write(content)
		f.close()

	def saveText(self, content, dir_path, name):
		file_name = dir_path + '/' + name + '.txt'
		f = open(file_name, 'w+')
		f.write(content.encode('utf-8'))



