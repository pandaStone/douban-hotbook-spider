# -*- encoding:utf-8 -*-

import os 
import os.path

typenames = ['文学','流行','文化','生活','经管','科技']

for typename in typenames:
	for searchTag in os.listdir(typename):
		stars =[]  #存放评分并排序
		readers = [] #存放阅读人数并排序

		if (os.path.isdir(typename+'/'+searchTag)):
			for switch in os.listdir(typename+'/'+searchTag):
				if switch == 'reader':
					for people in os.listdir(typename+'/'+searchTag+'/'+switch):
						if people != '.DS_Store':
							#提取阅读人数
							readers.append(int(people.split('(')[1].split('人')[0]))

				if switch == 'star':
					for star in os.listdir(typename+'/'+searchTag+'/'+switch):
						if star != '.DS_Store':
							stars.append(float(star))

			#对阅读人数降序冒泡排序
			for i in range(len(readers)-1):
				for j in range(len(readers)-1):
					if(readers[j+1]>readers[j]):
						temp = readers[j+1]
						readers[j+1] = readers[j]
						readers[j] = temp
			#对评分降序冒泡排序
			for i in range(len(stars)-1):
				for j in range(len(stars)-1):
					if(stars[j+1]>stars[j]):
						temp = stars[j+1]
						stars[j+1] = stars[j]
						stars[j] = temp

			#命令行进度提示
			print "================================="
			print typename+" 处理中"
			print "================================="
			print searchTag+" 处理中"
			print "================================="

			reader_path = typename+'/'+searchTag+'/reader/'
			star_path = typename+'/'+searchTag+'/star/'
			save_path = 'search/'+ typename +'/'+searchTag+'/'
			f = open(save_path + 'reader_show.txt','w')
			for reader in readers:
				r = str(reader)
				for each in os.listdir(reader_path+'('+r+'人评价)'):
					#mac系统下会产生.DS_Store系统文件，干扰输出 
					if each != '.DS_Store':
						f.write(reader_path+'('+r+'人评价)/'+each+'/'+each+'.txt@')
			f.close()

			f2 = open(save_path + 'star_show.txt','w')
			for star in stars:
				s = str(star)
				for each in os.listdir(star_path+s):
					if each != '.DS_Store':
						f2.write(star_path+s+'/'+each+'/'+each+'.txt@')
			f2.close()

